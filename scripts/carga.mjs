/**
 * Prueba de carga del piloto (REQ-015 y REQ-019).
 *
 * Abre N sesiones concurrentes (una por cuenta de prueba), reparte entre ellas 100
 * operaciones de consultar y guardar progreso y calcula éxito y tiempos.
 *
 *   REQ-019: al menos el 99% de las operaciones termina con éxito.
 *   REQ-015: al menos el 95% responde en menos de 2 s (se excluye el inicio de sesión).
 *
 * Necesita cuentas ya creadas: `<prefijo>1` … `<prefijo>N`, todas con la misma contraseña.
 * No las crea. Contra un sitio que no sea localhost exige --confirmo, porque guarda
 * progreso de verdad (un solo nivel de sudoku por cuenta, que es idempotente).
 *
 * Uso:
 *   node scripts/carga.mjs --url=https://mi-preview.vercel.app --prefijo=carga --password=... [--sesiones=25] [--ops=100] --confirmo
 * La latencia de 100 ms y los 10 Mbps no se simulan aquí: aplícalos con el sistema
 * (ver docs/pruebas-rendimiento.md).
 */
const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=") ?? d
const url = (arg("url", "http://localhost:3000")).replace(/\/$/, "")
const prefijo = arg("prefijo", "carga")
const password = arg("password", process.env.CARGA_PASSWORD)
const sesiones = Number(arg("sesiones", 25))
const totalOps = Number(arg("ops", 100))
const limiteMs = 2000

if (!password) throw new Error("Falta --password (o CARGA_PASSWORD)")
if (!/^https?:\/\/(localhost|127\.0\.0\.1)/.test(url) && !process.argv.includes("--confirmo")) {
  throw new Error(`Esto guarda progreso en ${url}. Repite con --confirmo si es un entorno de pruebas.`)
}

const pct = (xs, p) => xs.length ? [...xs].sort((a, b) => a - b)[Math.min(xs.length - 1, Math.ceil((p / 100) * xs.length) - 1)] : 0

async function sesion(i) {
  const r = await fetch(`${url}/api/usuario/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: `${prefijo}${i}`, password }),
  })
  if (!r.ok) throw new Error(`Login de ${prefijo}${i} falló (${r.status})`)
  return (r.headers.getSetCookie?.() ?? []).map((c) => c.split(";")[0]).join("; ")
}

const OPERACIONES = [
  ["consultar progreso", (c) => fetch(`${url}/api/usuario/me`, { headers: { cookie: c } }).then(async (r) => (r.ok ? fetch(`${url}/api/progreso?userId=${(await r.json()).id}`, { headers: { cookie: c } }) : r))],
  ["consultar catálogo", (c) => fetch(`${url}/api/misiones/catalogo`, { headers: { cookie: c } })],
  ["consultar neuronas", (c) => fetch(`${url}/api/usuario/neuronas`, { headers: { cookie: c } })],
  ["guardar progreso", (c) => fetch(`${url}/api/progreso`, {
    method: "POST",
    headers: { "Content-Type": "application/json", cookie: c },
    body: JSON.stringify({ seccion: "minijuegos", nivel: "sudoku", actividad: "facil", completado: true, score: 10, tiempo: 60 }),
  })],
]

const t0 = Date.now()
console.log(`Iniciando ${sesiones} sesiones en ${url}…`)
const cookies = await Promise.all(Array.from({ length: sesiones }, (_, i) => sesion(i + 1)))

const muestras = []
await Promise.all(
  cookies.map(async (cookie, s) => {
    // Cada sesión hace su parte de las operaciones, una detrás de otra (como una persona).
    const propias = Math.floor(totalOps / sesiones) + (s < totalOps % sesiones ? 1 : 0)
    for (let k = 0; k < propias; k++) {
      const [nombre, op] = OPERACIONES[(s + k) % OPERACIONES.length]
      const ini = performance.now()
      let ok = false
      try {
        ok = (await op(cookie)).ok
      } catch {}
      muestras.push({ nombre, ok, ms: performance.now() - ini })
    }
  }),
)

const oks = muestras.filter((m) => m.ok)
const rapidas = muestras.filter((m) => m.ok && m.ms < limiteMs)
const tasaOk = (oks.length / muestras.length) * 100
const tasaRapidas = (rapidas.length / muestras.length) * 100
const tiempos = muestras.map((m) => m.ms)

console.log(`\nOperaciones: ${muestras.length} en ${((Date.now() - t0) / 1000).toFixed(1)} s con ${sesiones} sesiones`)
console.log(`Éxito: ${oks.length}/${muestras.length} (${tasaOk.toFixed(1)}%)  → REQ-019 (≥ 99%): ${tasaOk >= 99 ? "CUMPLE" : "NO CUMPLE"}`)
console.log(`< 2 s: ${rapidas.length}/${muestras.length} (${tasaRapidas.toFixed(1)}%)  → REQ-015 (≥ 95%): ${tasaRapidas >= 95 ? "CUMPLE" : "NO CUMPLE"}`)
console.log(`Tiempos: p50 ${pct(tiempos, 50).toFixed(0)} ms · p95 ${pct(tiempos, 95).toFixed(0)} ms · máx ${Math.max(...tiempos).toFixed(0)} ms`)
for (const [nombre] of OPERACIONES) {
  const t = muestras.filter((m) => m.nombre === nombre).map((m) => m.ms)
  const f = muestras.filter((m) => m.nombre === nombre && !m.ok).length
  console.log(`  ${nombre.padEnd(20)} n=${t.length}  p95 ${pct(t, 95).toFixed(0)} ms  fallos ${f}`)
}
process.exit(tasaOk >= 99 && tasaRapidas >= 95 ? 0 : 1)

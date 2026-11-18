/**
 * Crea las cuentas de prueba para la prueba de carga (REQ-015 y REQ-019): `<prefijo>1` … `<prefijo>N`,
 * todas con la misma contraseña, usando el registro normal de la API (/api/usuario).
 *
 * Es idempotente: si una cuenta ya existe (409) la cuenta como existente y sigue.
 *
 * ⚠ Crea cuentas de verdad en la base a la que apunte la URL. Úsalo solo contra un entorno con base
 * de pruebas propia (nunca producción ni un preview que comparta la base de producción). Contra un
 * sitio que no sea localhost exige --confirmo.
 *
 * Uso:
 *   node scripts/crear-cuentas-carga.mjs --url=https://mi-preview.vercel.app --password=... [--prefijo=carga] [--cuentas=100] --confirmo
 */
const arg = (n, d) => process.argv.find((a) => a.startsWith(`--${n}=`))?.split("=").slice(1).join("=") ?? d
const url = arg("url", "http://localhost:3000").replace(/\/$/, "")
const prefijo = arg("prefijo", "carga")
const password = arg("password", process.env.CARGA_PASSWORD)
const cuentas = Number(arg("cuentas", 100))
const lote = 5 // el cifrado de la contraseña es costoso: no se lanzan las 100 a la vez

if (!password || password.length < 8) throw new Error("Falta --password (o CARGA_PASSWORD), de al menos 8 caracteres")
if (!/^[a-z0-9_]{1,12}$/.test(prefijo)) throw new Error("El prefijo debe ser minúsculas, números o guion bajo (máx. 12)")
if (!/^https?:\/\/(localhost|127\.0\.0\.1)/.test(url) && !process.argv.includes("--confirmo")) {
  throw new Error(`Esto crea ${cuentas} cuentas en ${url}. Repite con --confirmo solo si es un entorno con base de pruebas propia.`)
}

async function crear(i) {
  const r = await fetch(`${url}/api/usuario`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: `${prefijo}${i}`,
      email: `${prefijo}${i}@carga.invalid`,
      password,
      aceptaTerminos: true,
    }),
  })
  if (r.ok) return "creada"
  if (r.status === 409) return "existía"
  throw new Error(`${prefijo}${i}: ${r.status} ${await r.text().catch(() => "")}`)
}

const t0 = Date.now()
const cuenta = { creada: 0, existía: 0 }
const fallos = []
console.log(`Creando ${cuentas} cuentas ${prefijo}1…${prefijo}${cuentas} en ${url}`)
for (let i = 1; i <= cuentas; i += lote) {
  const ids = Array.from({ length: Math.min(lote, cuentas - i + 1) }, (_, k) => i + k)
  const res = await Promise.allSettled(ids.map(crear))
  res.forEach((x) => (x.status === "fulfilled" ? cuenta[x.value]++ : fallos.push(x.reason.message)))
}

console.log(`Listo en ${((Date.now() - t0) / 1000).toFixed(1)} s: ${cuenta.creada} creadas, ${cuenta.existía} ya existían, ${fallos.length} con error`)
fallos.slice(0, 10).forEach((f) => console.error(" -", f))
process.exit(fallos.length ? 1 : 0)

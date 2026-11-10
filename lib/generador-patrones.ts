/**
 * Generadores de patrones por regla, con dificultad (REQ-001). No importa nada de la interfaz:
 * se puede usar en el cliente, en el servidor y en pruebas.
 *
 * Cada ronda declara su regla y su dificultad, y solo se acepta si la respuesta es ÚNICA: el verificador
 * (`completaciones`) prueba un abanico de hipótesis (ciclos, intercalados por paridad y progresiones) y exige
 * que todas las que encajan con lo visible completen la secuencia igual. Si hay ambigüedad, se descarta y se vuelve a generar.
 */

export type Dificultad = "baja" | "media" | "alta"
export type TipoPatron = "color" | "shape" | "number" | "direction"
export type ReglaId = "alternancia" | "ciclo" | "pares" | "espejo" | "crecimiento" | "doble"
export type Rng = () => number

export const DIFICULTADES: Dificultad[] = ["baja", "media", "alta"]

/** Fichas de cada tipo. En `direction` el orden es el del reloj (cada paso gira 45°); en `number`, el valor creciente. */
export const POOL: Record<TipoPatron, string[]> = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
  number: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
  direction: ["⬆️", "↗️", "➡️", "↘️", "⬇️", "↙️", "⬅️", "↖️"],
}
const TIPOS: TipoPatron[] = ["color", "shape", "number", "direction"]

export const NOMBRE_REGLA: Record<ReglaId, string> = {
  alternancia: "Alternancia",
  ciclo: "Ciclo",
  pares: "Pares",
  espejo: "Espejo",
  crecimiento: "Crecimiento",
  doble: "Doble regla",
}

/** Reglas disponibles por dificultad. */
const REGLAS: Record<Dificultad, ReglaId[]> = {
  baja: ["alternancia", "ciclo"],
  media: ["pares", "ciclo", "espejo"],
  alta: ["crecimiento", "doble", "espejo"],
}
const LONGITUD: Record<Dificultad, [number, number]> = { baja: [6, 7], media: [7, 8], alta: [8, 9] }

export interface Secuencia {
  regla: ReglaId
  nombreRegla: string
  dificultad: Dificultad
  tipo: TipoPatron
  /** Secuencia completa que sigue la regla. */
  completa: string[]
  /** Fichas que intervienen en la regla, en orden (el grupo que se repite, el paso, etc.). */
  fichasRegla: string[]
  /** Solo en `crecimiento`: cuántos lugares avanza cada ficha. */
  paso?: number
}

// ---------- utilidades ----------

/** Generador pseudoaleatorio con semilla (para pruebas reproducibles). */
export function crearRng(semilla: number): Rng {
  let a = semilla >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
const entero = (rng: Rng, min: number, max: number) => min + Math.floor(rng() * (max - min + 1))
const elegir = <T,>(rng: Rng, xs: T[]): T => xs[Math.floor(rng() * xs.length)]
function barajar<T>(rng: Rng, xs: T[]): T[] {
  const a = [...xs]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
const distintas = (rng: Rng, pool: string[], n: number) => barajar(rng, pool).slice(0, n)
const ciclar = (g: string[], largo: number) => Array.from({ length: largo }, (_, i) => g[i % g.length])

// ---------- generación de la secuencia ----------

function construir(regla: ReglaId, dificultad: Dificultad, tipo: TipoPatron, largo: number, rng: Rng): Secuencia | null {
  const pool = POOL[tipo]
  const base = { regla, nombreRegla: NOMBRE_REGLA[regla], dificultad, tipo }
  switch (regla) {
    case "alternancia": {
      const g = distintas(rng, pool, 2)
      return { ...base, completa: ciclar(g, largo), fichasRegla: g }
    }
    case "ciclo": {
      const n = dificultad === "baja" ? 3 : entero(rng, 4, 5)
      const g = distintas(rng, pool, n)
      return { ...base, completa: ciclar(g, largo), fichasRegla: g }
    }
    case "pares": {
      const g = distintas(rng, pool, 2)
      return { ...base, completa: Array.from({ length: largo }, (_, i) => g[Math.floor(i / 2) % 2]), fichasRegla: g }
    }
    case "espejo": {
      const n = dificultad === "alta" ? 4 : 3
      const g = distintas(rng, pool, n)
      const ida = [...g, ...g.slice(1, -1).reverse()] // A B C B (período 2n-2)
      return { ...base, completa: ciclar(ida, largo), fichasRegla: g }
    }
    case "crecimiento": {
      if (tipo !== "number" && tipo !== "direction") return null
      const paso = entero(rng, 1, 2)
      if (tipo === "number") {
        const maxLargo = Math.floor((pool.length - 1) / paso) + 1
        const n = Math.min(largo, maxLargo)
        const ini = entero(rng, 0, pool.length - 1 - paso * (n - 1))
        return { ...base, paso, completa: Array.from({ length: n }, (_, i) => pool[ini + paso * i]), fichasRegla: [pool[ini]] }
      }
      const ini = entero(rng, 0, pool.length - 1)
      return { ...base, paso, completa: Array.from({ length: largo }, (_, i) => pool[(ini + paso * i) % pool.length]), fichasRegla: [pool[ini]] }
    }
    case "doble": {
      const [a, b, c, fija] = distintas(rng, pool, 4)
      const g = [a, b, c]
      // posiciones pares (0, 2, 4…) recorren a, b, c; las impares son siempre la ficha fija
      return { ...base, completa: Array.from({ length: largo }, (_, i) => (i % 2 === 0 ? g[(i / 2) % 3] : fija)), fichasRegla: [...g, fija] }
    }
  }
}

/** Explica la regla con los nombres de las fichas (el llamador aporta `nombre`, p. ej. `glyphName`). */
export function explicarRegla(s: Secuencia, nombre: (f: string) => string): string {
  const g = s.fichasRegla.map(nombre)
  switch (s.regla) {
    case "alternancia":
      return `${s.nombreRegla}: alterna ${g[0]} y ${g[1]}.`
    case "ciclo":
      return `${s.nombreRegla}: se repite cada ${g.length} fichas: ${g.join(", ")}.`
    case "pares":
      return `${s.nombreRegla}: cada ficha se repite dos veces seguidas (${g[0]} y luego ${g[1]}).`
    case "espejo":
      return `${s.nombreRegla}: va ${g.join(", ")} y regresa por el mismo camino.`
    case "crecimiento":
      return s.tipo === "number"
        ? `${s.nombreRegla}: cada número sube ${s.paso}.`
        : `${s.nombreRegla}: cada flecha gira ${(s.paso ?? 1) * 45}° en el sentido del reloj.`
    case "doble":
      return `${s.nombreRegla}: dos reglas a la vez. En las posiciones 1.ª, 3.ª, 5.ª… van ${g.slice(0, 3).join(", ")} y se repiten; en las pares siempre aparece ${g[3]}.`
  }
}

// ---------- verificador de unicidad ----------

type Celdas = (string | null)[]
type Hipotesis = (celdas: Celdas) => string[] | null

/** Se repite con período `p`. Cada posición del período debe quedar determinada por alguna ficha conocida. */
const periodica =
  (p: number): Hipotesis =>
  (celdas) => {
    const g: (string | null)[] = Array(p).fill(null)
    for (let i = 0; i < celdas.length; i++) {
      const c = celdas[i]
      if (c === null) continue
      if (g[i % p] === null) g[i % p] = c
      else if (g[i % p] !== c) return null
    }
    return g.some((x) => x === null) ? null : celdas.map((_, i) => g[i % p]!)
  }

/** Posiciones pares con período `pe` e impares con período `po` (reglas intercaladas). */
const paridad =
  (pe: number, po: number): Hipotesis =>
  (celdas) => {
    const ps = celdas.filter((_, i) => i % 2 === 0)
    const is = celdas.filter((_, i) => i % 2 === 1)
    // Cada subsecuencia necesita al menos 2 fichas más que su período para que la regla esté confirmada.
    if (ps.length < pe + 2 || is.length < po + 2) return null
    const pares = periodica(pe)(ps)
    const impares = periodica(po)(is)
    if (!pares || !impares) return null
    return celdas.map((_, i) => (i % 2 === 0 ? pares[i / 2] : impares[(i - 1) / 2]))
  }

/** Progresión sobre el orden de las fichas: sube `paso` lugares cada vez (con vuelta al inicio solo en direcciones). */
const progresion =
  (pool: string[], paso: number, vuelta: boolean): Hipotesis =>
  (celdas) => {
    const k = celdas.findIndex((c) => c !== null)
    if (k < 0) return null
    const ik = pool.indexOf(celdas[k]!)
    if (ik < 0) return null
    const salida: string[] = []
    for (let i = 0; i < celdas.length; i++) {
      let idx = ik + paso * (i - k)
      if (vuelta) idx = ((idx % pool.length) + pool.length) % pool.length
      else if (idx < 0 || idx >= pool.length) return null
      const f = pool[idx]
      if (celdas[i] !== null && celdas[i] !== f) return null
      salida.push(f)
    }
    return salida
  }

function hipotesis(n: number, tipo: TipoPatron): Hipotesis[] {
  const hs: Hipotesis[] = []
  // Un ciclo solo cuenta si al menos 3 fichas lo confirman (como `findCyclicBase`).
  for (let p = 1; p <= Math.max(1, n - 3); p++) hs.push(periodica(p))
  for (let pe = 1; pe <= 3; pe++) for (let po = 1; po <= 3; po++) hs.push(paridad(pe, po))
  if (tipo === "number" || tipo === "direction") {
    for (const paso of [1, 2, 3, -1, -2, -3]) hs.push(progresion(POOL[tipo], paso, tipo === "direction"))
  }
  return hs
}

/** Todas las formas distintas de completar los huecos (`null`) que encajan con alguna hipótesis. Única ⇔ longitud 1. */
export function completaciones(celdas: Celdas, tipo: TipoPatron): string[][] {
  const vistos = new Map<string, string[]>()
  for (const h of hipotesis(celdas.length, tipo)) {
    const r = h(celdas)
    if (r) vistos.set(r.join("|"), r)
  }
  return [...vistos.values()]
}

/** ¿La respuesta (la siguiente ficha) es única dada la parte visible? */
export function siguienteUnico(visible: string[], tipo: TipoPatron): string | null {
  const r = completaciones([...visible, null], tipo)
  return r.length === 1 ? r[0][visible.length] : null
}

/** Posiciones que podrían ser el intruso: las que no encajan en ninguna hipótesis que explique el resto. */
export function posiblesIntrusos(celdas: string[], tipo: TipoPatron): number[] {
  const res: number[] = []
  for (let j = 0; j < celdas.length; j++) {
    const sin = celdas.map((c, i) => (i === j ? null : c))
    if (completaciones(sin, tipo).some((f) => f[j] !== celdas[j])) res.push(j)
  }
  return res
}

// ---------- API: rondas ----------

const MAX_INTENTOS = 400

function secuenciaBase(dificultad: Dificultad, rng: Rng, tipo?: TipoPatron, regla?: ReglaId, extra = 0): Secuencia {
  for (let k = 0; k < MAX_INTENTOS; k++) {
    const r = regla ?? elegir(rng, REGLAS[dificultad])
    const t = tipo ?? elegir(rng, TIPOS)
    const [min, max] = LONGITUD[dificultad]
    const s = construir(r, dificultad, t, entero(rng, min, max) + extra, rng)
    if (s && s.completa.length >= 5 + extra) return s
  }
  // Reserva: la regla más simple, siempre válida.
  return construir("alternancia", dificultad, tipo ?? "color", 7 + extra, rng)!
}

export interface Ronda extends Secuencia {
  visible: string[]
  respuesta: string
  opciones: string[]
}

/** Ronda "¿qué ficha sigue?": respuesta única comprobada. */
export function generarRonda(dificultad: Dificultad, opts: { rng?: Rng; tipo?: TipoPatron; regla?: ReglaId } = {}): Ronda {
  const rng = opts.rng ?? Math.random
  for (let k = 0; k < MAX_INTENTOS; k++) {
    const s = secuenciaBase(dificultad, rng, opts.tipo, opts.regla)
    const visible = s.completa.slice(0, -1)
    const respuesta = s.completa[s.completa.length - 1]
    if (siguienteUnico(visible, s.tipo) !== respuesta) continue
    const otras = barajar(rng, POOL[s.tipo].filter((f) => f !== respuesta)).slice(0, 3)
    return { ...s, visible, respuesta, opciones: barajar(rng, [respuesta, ...otras]) }
  }
  const s = construir("alternancia", dificultad, "color", 7, rng)!
  const visible = s.completa.slice(0, -1)
  const respuesta = s.completa[s.completa.length - 1]
  return { ...s, visible, respuesta, opciones: barajar(rng, [respuesta, ...POOL.color.filter((f) => f !== respuesta).slice(0, 3)]) }
}

export interface RondaHuecos extends Secuencia {
  /** Secuencia con huecos (`null`). */
  celdas: Celdas
  /** Posiciones de los huecos, de izquierda a derecha. */
  huecos: number[]
  /** Ficha correcta de cada hueco, en el mismo orden. */
  solucion: string[]
  opciones: string[]
}

/** Ronda "completa los huecos": la forma de rellenarlos es única. */
export function generarHuecos(dificultad: Dificultad, opts: { rng?: Rng; tipo?: TipoPatron; regla?: ReglaId } = {}): RondaHuecos {
  const rng = opts.rng ?? Math.random
  const nHuecos = dificultad === "baja" ? 1 : dificultad === "media" ? 2 : 3
  for (let k = 0; k < MAX_INTENTOS; k++) {
    const s = secuenciaBase(dificultad, rng, opts.tipo, opts.regla, 1)
    const n = s.completa.length
    // Los huecos no van en las 2 primeras posiciones para que la regla se vea.
    const huecos = barajar(rng, Array.from({ length: n - 2 }, (_, i) => i + 2)).slice(0, nHuecos).sort((a, b) => a - b)
    const celdas: Celdas = s.completa.map((c, i) => (huecos.includes(i) ? null : c))
    const r = completaciones(celdas, s.tipo)
    // única Y es la que la regla pretende
    if (r.length !== 1 || r[0].join("|") !== s.completa.join("|")) continue
    const solucion = huecos.map((i) => s.completa[i])
    const extra = barajar(rng, POOL[s.tipo].filter((f) => !solucion.includes(f))).slice(0, 2)
    return { ...s, celdas, huecos, solucion, opciones: barajar(rng, [...new Set(solucion), ...extra]) }
  }
  const s = construir("alternancia", dificultad, "color", 8, rng)!
  const celdas: Celdas = s.completa.map((c, i) => (i === 4 ? null : c))
  return { ...s, celdas, huecos: [4], solucion: [s.completa[4]], opciones: barajar(rng, [s.completa[4], ...POOL.color.filter((f) => f !== s.completa[4]).slice(0, 2)]) }
}

export interface RondaIntruso extends Secuencia {
  /** Secuencia con el intruso ya colocado. */
  pattern: string[]
  outlierIdx: number
  outlier: string
}

/** Ronda "encuentra el intruso": solo una posición rompe la regla. */
export function generarIntruso(dificultad: Dificultad, opts: { rng?: Rng; tipo?: TipoPatron; regla?: ReglaId } = {}): RondaIntruso {
  const rng = opts.rng ?? Math.random
  for (let k = 0; k < MAX_INTENTOS; k++) {
    const s = secuenciaBase(dificultad, rng, opts.tipo, opts.regla)
    const n = s.completa.length
    const usadas = new Set(s.completa)
    const candidatas = POOL[s.tipo].filter((f) => !usadas.has(f))
    if (candidatas.length === 0) continue
    const outlierIdx = entero(rng, 2, n - 2)
    const outlier = elegir(rng, candidatas)
    const pattern = s.completa.map((c, i) => (i === outlierIdx ? outlier : c))
    const posibles = posiblesIntrusos(pattern, s.tipo)
    if (posibles.length === 1 && posibles[0] === outlierIdx) return { ...s, pattern, outlierIdx, outlier }
  }
  const s = construir("alternancia", dificultad, "color", 7, rng)!
  const outlier = POOL.color.find((f) => !s.completa.includes(f))!
  return { ...s, pattern: s.completa.map((c, i) => (i === 3 ? outlier : c)), outlierIdx: 3, outlier }
}

/** Dificultad que corresponde a cada ronda de una actividad de `total` rondas (sube de forma gradual). */
export function dificultadDeRonda(ronda: number, total: number): Dificultad {
  const f = (ronda - 1) / Math.max(1, total - 1)
  return f < 0.4 ? "baja" : f < 0.8 ? "media" : "alta"
}

import { describe, expect, it } from "vitest"
import {
  DIFICULTADES,
  NOMBRE_REGLA,
  POOL,
  completaciones,
  crearRng,
  dificultadDeRonda,
  explicarRegla,
  generarHuecos,
  generarIntruso,
  generarRonda,
  posiblesIntrusos,
  siguienteUnico,
  type ReglaId,
} from "./generador-patrones"

const SEMILLAS = Array.from({ length: 150 }, (_, i) => i + 1)
const nombre = (f: string) => `«${f}»`

describe("reglas", () => {
  it("hay al menos 5 reglas con nombre para usar en la explicación", () => {
    const ids = Object.keys(NOMBRE_REGLA)
    expect(ids.length).toBeGreaterThanOrEqual(5)
    for (const n of Object.values(NOMBRE_REGLA)) expect(n.length).toBeGreaterThan(2)
  })

  it("cada regla aparece al generar rondas y su explicación nombra la regla", () => {
    const vistas = new Set<ReglaId>()
    for (const d of DIFICULTADES) {
      for (const seed of SEMILLAS) {
        const r = generarRonda(d, { rng: crearRng(seed) })
        vistas.add(r.regla)
        expect(explicarRegla(r, nombre)).toContain(NOMBRE_REGLA[r.regla])
      }
    }
    expect([...vistas].sort()).toEqual(Object.keys(NOMBRE_REGLA).sort())
  })
})

describe("generarRonda", () => {
  for (const d of DIFICULTADES) {
    it(`declara regla y dificultad, y la respuesta es única (${d})`, () => {
      for (const seed of SEMILLAS) {
        const r = generarRonda(d, { rng: crearRng(seed) })
        expect(r.dificultad).toBe(d)
        expect(r.regla in NOMBRE_REGLA).toBe(true)
        expect(r.nombreRegla).toBe(NOMBRE_REGLA[r.regla])
        // la respuesta sale de la regla y es la única posible
        expect(r.respuesta).toBe(r.completa[r.completa.length - 1])
        expect(siguienteUnico(r.visible, r.tipo)).toBe(r.respuesta)
        // las opciones incluyen la respuesta una sola vez y son fichas del mismo tipo
        expect(r.opciones.filter((o) => o === r.respuesta)).toHaveLength(1)
        expect(new Set(r.opciones).size).toBe(r.opciones.length)
        for (const o of r.opciones) expect(POOL[r.tipo]).toContain(o)
      }
    })
  }

  it("la longitud varía", () => {
    const largos = new Set<number>()
    for (const seed of SEMILLAS) largos.add(generarRonda("media", { rng: crearRng(seed) }).visible.length)
    expect(largos.size).toBeGreaterThan(1)
  })

  it("la dificultad alta usa reglas más complejas que la baja", () => {
    const reglas = (d: "baja" | "alta") => new Set(SEMILLAS.map((s) => generarRonda(d, { rng: crearRng(s) }).regla))
    expect(reglas("baja")).toEqual(new Set(["alternancia", "ciclo"]))
    expect(reglas("alta").has("crecimiento") || reglas("alta").has("doble")).toBe(true)
  })

  it("se puede forzar una regla", () => {
    for (const regla of Object.keys(NOMBRE_REGLA) as ReglaId[]) {
      const r = generarRonda("alta", { rng: crearRng(7), regla })
      expect(["alta"]).toContain(r.dificultad)
      expect(r.regla === regla || r.regla === "alternancia").toBe(true) // la reserva solo si no hay forma válida
    }
  })
})

describe("generarHuecos", () => {
  for (const d of DIFICULTADES) {
    it(`la forma de rellenar los huecos es única (${d})`, () => {
      for (const seed of SEMILLAS) {
        const r = generarHuecos(d, { rng: crearRng(seed) })
        expect(r.dificultad).toBe(d)
        const fills = completaciones(r.celdas, r.tipo)
        expect(fills).toHaveLength(1)
        expect(r.huecos.map((i) => fills[0][i])).toEqual(r.solucion)
        for (const f of r.solucion) expect(r.opciones).toContain(f)
      }
    })
  }
})

describe("generarIntruso", () => {
  for (const d of DIFICULTADES) {
    it(`solo una posición rompe la regla (${d})`, () => {
      for (const seed of SEMILLAS) {
        const r = generarIntruso(d, { rng: crearRng(seed) })
        expect(r.dificultad).toBe(d)
        expect(posiblesIntrusos(r.pattern, r.tipo)).toEqual([r.outlierIdx])
        expect(r.pattern[r.outlierIdx]).toBe(r.outlier)
        expect(r.completa).not.toContain(r.outlier)
      }
    })
  }
})

describe("verificador de unicidad", () => {
  it("acepta una alternancia clara", () => {
    expect(siguienteUnico(["🔴", "🔵", "🔴", "🔵", "🔴", "🔵"], "color")).toBe("🔴")
  })

  it("rechaza una secuencia sin regla comprobable (demasiado corta)", () => {
    expect(siguienteUnico(["🔴", "🔵", "🔴"], "color")).toBeNull()
  })

  it("rechaza una secuencia sin regla", () => {
    expect(siguienteUnico(["🔴", "🟢", "🔵", "🟡", "🟣", "⚫", "⚪"], "color")).toBeNull()
  })

  it("reconoce una progresión numérica", () => {
    const n = POOL.number
    expect(siguienteUnico([n[0], n[2], n[4], n[6]], "number")).toBe(n[8])
  })

  it("dos intrusos posibles se detectan como ambiguos", () => {
    // 🔴🔵🔴🔵🔴🔵 con dos fichas cambiadas no tiene un único intruso
    expect(posiblesIntrusos(["🔴", "🔵", "🟢", "🔵", "🔴", "🟡", "🔴", "🔵"], "color").length).not.toBe(1)
  })
})

describe("dificultadDeRonda", () => {
  it("sube de forma gradual", () => {
    expect([1, 2, 3, 4, 5].map((r) => dificultadDeRonda(r, 5))).toEqual(["baja", "baja", "media", "media", "alta"])
  })
})

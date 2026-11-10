import { describe, expect, it } from "vitest"
import {
  TAREAS,
  aplicar,
  generarEjecutar,
  generarInstrucciones,
  generarOrden,
  pistasEjecutar,
  pistasInstrucciones,
  pistasOrden,
  revisarEjecutar,
  revisarInstrucciones,
  revisarOrden,
  traza,
} from "./algoritmos"
import { crearRng } from "./generador-patrones"

describe("banco de tareas", () => {
  it("cada tarea tiene una razón por cada par de pasos y pasos distintos", () => {
    for (const t of TAREAS) {
      expect(t.razones).toHaveLength(t.pasos.length - 1)
      expect(new Set(t.pasos).size).toBe(t.pasos.length)
      for (const d of t.distractores) expect(t.pasos).not.toContain(d)
    }
  })
})

describe("ordenar los pasos", () => {
  it("siempre entrega los pasos desordenados y sin repetir tarea en una partida", () => {
    const rng = crearRng(7)
    const usadas = new Set<string>()
    const ids: string[] = []
    for (let i = 0; i < 5; i++) {
      const r = generarOrden({ rng, usadas })
      ids.push(r.tareaId)
      expect([...r.mezclados].sort()).toEqual([...r.pasos].sort())
      expect(r.mezclados).not.toEqual(r.pasos)
    }
    expect(new Set(ids).size).toBe(5)
  })

  it("acepta el orden correcto y explica el primer par invertido sin dar todo el orden", () => {
    const r = generarOrden({ rng: crearRng(3) })
    expect(revisarOrden(r, r.pasos).correcto).toBe(true)
    const mal = [r.pasos[1], r.pasos[0], ...r.pasos.slice(2)]
    const res = revisarOrden(r, mal)
    expect(res.correcto).toBe(false)
    expect(res.explicacion).toContain(`«${r.pasos[0]}» tiene que hacerse antes que «${r.pasos[1]}»`)
    expect(res.explicacion).toContain(r.razones[0])
  })

  it("las pistas son graduales: la última es la única que da el orden", () => {
    const r = generarOrden({ rng: crearRng(1) })
    const p = pistasOrden(r)
    expect(p).toHaveLength(3)
    expect(p[0]).not.toContain(r.pasos[0])
    expect(p[2]).toContain(r.pasos[2])
  })
})

describe("completar instrucciones", () => {
  it("el hueco no es el primero ni el último y hay una sola opción correcta", () => {
    for (let s = 1; s <= 40; s++) {
      const r = generarInstrucciones({ rng: crearRng(s) })
      expect(r.hueco).toBeGreaterThan(0)
      expect(r.hueco).toBeLessThan(r.pasos.length - 1)
      expect(r.opciones).toHaveLength(3)
      expect(r.opciones.filter((o) => o === r.pasos[r.hueco])).toHaveLength(1)
      expect(new Set(r.opciones).size).toBe(3)
    }
  })

  it("explica por qué una opción no encaja", () => {
    const r = generarInstrucciones({ rng: crearRng(5) })
    const mala = r.opciones.find((o) => o !== r.pasos[r.hueco])!
    expect(revisarInstrucciones(r, r.pasos[r.hueco]).correcto).toBe(true)
    const res = revisarInstrucciones(r, mala)
    expect(res.correcto).toBe(false)
    expect(res.explicacion).toContain(mala)
    expect(res.explicacion).not.toContain(`es «${r.pasos[r.hueco]}»`)
    expect(pistasInstrucciones(r)[2]).toContain(r.pasos[r.hueco])
  })
})

describe("ejecutar un algoritmo", () => {
  it("el resultado coincide con la traza y las opciones son únicas con una sola correcta", () => {
    for (const d of ["baja", "media", "alta"] as const) {
      for (let s = 1; s <= 60; s++) {
        const r = generarEjecutar(d, { rng: crearRng(s * 13) })
        const t = traza(r.inicio, r.operaciones)
        expect(t[t.length - 1]).toBe(r.resultado)
        expect(r.resultado).toBeGreaterThanOrEqual(0)
        expect(r.opciones).toHaveLength(4)
        expect(new Set(r.opciones).size).toBe(4)
        expect(r.opciones.filter((o) => o === r.resultado)).toHaveLength(1)
        for (const o of r.opciones) if (o !== r.resultado) expect(r.errores[String(o)]).toBeTruthy()
      }
    }
  })

  it("la dificultad sube el largo del algoritmo", () => {
    const largo = (d: "baja" | "media" | "alta") => Math.max(...Array.from({ length: 40 }, (_, s) => generarEjecutar(d, { rng: crearRng(s + 1) }).operaciones.length))
    expect(largo("baja")).toBeLessThanOrEqual(3)
    expect(largo("alta")).toBeGreaterThanOrEqual(4)
  })

  it("aplica cada operación", () => {
    expect(aplicar(4, { id: "suma", n: 3 })).toBe(7)
    expect(aplicar(4, { id: "resta", n: 3 })).toBe(1)
    expect(aplicar(4, { id: "duplica" })).toBe(8)
    expect(aplicar(4, { id: "triplica" })).toBe(12)
  })

  it("explica el tipo de error sin revelar el resultado correcto", () => {
    const r = generarEjecutar("media", { rng: crearRng(11) })
    const mala = r.opciones.find((o) => o !== r.resultado)!
    const res = revisarEjecutar(r, mala)
    expect(res.correcto).toBe(false)
    expect(res.explicacion).not.toContain(`resultado es ${r.resultado}`)
    expect(revisarEjecutar(r, r.resultado).correcto).toBe(true)
    const p = pistasEjecutar(r)
    expect(p).toHaveLength(3)
    expect(p[2]).toContain(String(r.resultado))
  })
})

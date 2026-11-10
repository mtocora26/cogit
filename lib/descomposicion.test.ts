import { describe, expect, it } from "vitest"
import { TAREAS, aplicar } from "./algoritmos"
import {
  TAREAS_GRANDES,
  generarDepurar,
  generarError,
  generarSubtareas,
  pistasDepurar,
  pistasError,
  pistasSubtareas,
  revisarDepurar,
  revisarError,
  revisarSubtareas,
  valorPrevio,
} from "./descomposicion"
import { crearRng } from "./generador-patrones"

const DIFS = ["baja", "media", "alta"] as const

describe("dividir una tarea en subtareas", () => {
  it("ningún paso se repite entre subtareas (cada paso tiene una sola parte posible)", () => {
    const todos = TAREAS_GRANDES.flatMap((t) => t.subtareas.flatMap((s) => s.pasos))
    expect(new Set(todos).size).toBe(todos.length)
    for (const t of TAREAS_GRANDES) expect(new Set(t.subtareas.map((s) => s.nombre)).size).toBe(t.subtareas.length)
  })

  it("cada ronda reparte 2 pasos por subtarea y la dificultad sube el número de partes", () => {
    for (const d of DIFS) {
      for (let s = 1; s <= 40; s++) {
        const r = generarSubtareas(d, { rng: crearRng(s * 3) })
        expect(r.subtareas).toHaveLength(d === "baja" ? 2 : 3)
        expect(r.pasos).toHaveLength(r.subtareas.length * 2)
        for (const p of r.pasos) expect(r.subtareas.map((x) => x.nombre)).toContain(r.solucion[p])
      }
    }
  })

  it("acepta el reparto correcto y explica el primer paso mal ubicado sin dar el reparto", () => {
    const r = generarSubtareas("media", { rng: crearRng(5) })
    expect(revisarSubtareas(r, r.solucion).correcto).toBe(true)
    const p = r.pasos[0]
    const otra = r.subtareas.find((s) => s.nombre !== r.solucion[p])!.nombre
    const res = revisarSubtareas(r, { ...r.solucion, [p]: otra })
    expect(res.correcto).toBe(false)
    expect(res.explicacion).toContain(p)
    expect(res.explicacion).not.toContain(r.solucion[p])
    const pistas = pistasSubtareas(r)
    expect(pistas[2]).toContain(r.solucion[p])
  })
})

describe("encontrar el paso con error", () => {
  // Cuántos pasos habría que quitar para dejar el resto en orden relativo correcto.
  const quitables = (r: ReturnType<typeof generarError>) => {
    const t = TAREAS.find((x) => x.id === r.tareaId)!
    const orden = r.pasos.map((p) => t.pasos.indexOf(p))
    return orden.map((_, i) => ({ i, ok: orden.filter((_, k) => k !== i).every((x, k, xs) => k === 0 || xs[k - 1] < x) }))
  }

  it("en baja hay un paso ajeno; en media y alta un paso movido al menos dos lugares y único", () => {
    for (let s = 1; s <= 80; s++) {
      const b = generarError("baja", { rng: crearRng(s) })
      const t = TAREAS.find((x) => x.id === b.tareaId)!
      expect(t.pasos).not.toContain(b.pasos[b.error])
      expect(b.pasos).toHaveLength(t.pasos.length + 1)

      const m = generarError("media", { rng: crearRng(s) })
      const tm = TAREAS.find((x) => x.id === m.tareaId)!
      expect([...m.pasos].sort()).toEqual([...tm.pasos].sort())
      expect(m.pasos).not.toEqual(tm.pasos)
      // Quitar solo el paso con error deja el resto en orden, y es el único con esa propiedad.
      const buenos = quitables(m).filter((q) => q.ok).map((q) => q.i)
      expect(buenos).toEqual([m.error])
    }
  })

  it("explica por qué el paso no encaja y la última pista nombra el error", () => {
    const r = generarError("media", { rng: crearRng(8) })
    expect(revisarError(r, r.error).correcto).toBe(true)
    const otro = (r.error + 1) % r.pasos.length
    const mal = revisarError(r, otro)
    expect(mal.correcto).toBe(false)
    expect(mal.explicacion).toContain(r.pasos[otro])
    expect(pistasError(r)[1]).not.toContain(r.pasos[r.error])
    expect(pistasError(r)[2]).toContain(r.pasos[r.error])
  })
})

describe("depurar un programa", () => {
  it("solo una línea no sigue de la anterior y el error se arrastra", () => {
    for (const d of DIFS) {
      for (let s = 1; s <= 60; s++) {
        const r = generarDepurar(d, { rng: crearRng(s * 11) })
        const incoherentes = r.operaciones
          .map((o, i) => aplicar(valorPrevio(r, i), o) !== r.mostrado[i])
          .map((x, i) => (x ? i : -1))
          .filter((i) => i >= 0)
        expect(incoherentes).toEqual([r.error])
        expect(r.mostrado[r.error]).not.toBe(r.correcto[r.error])
        for (const v of r.mostrado) expect(v).toBeGreaterThanOrEqual(0)
      }
    }
  })

  it("al errar explica la cuenta de esa línea y avisa si el error se arrastra", () => {
    const r = generarDepurar("alta", { rng: crearRng(2) })
    expect(revisarDepurar(r, r.error).correcto).toBe(true)
    const buena = r.operaciones.findIndex((_, i) => i !== r.error)
    const mal = revisarDepurar(r, buena)
    expect(mal.correcto).toBe(false)
    expect(mal.explicacion).toContain(`línea ${buena + 1}`)
    const despues = r.operaciones.findIndex((_, i) => i > r.error)
    if (despues > 0) expect(revisarDepurar(r, despues).explicacion).toContain("arrastra")
    const p = pistasDepurar(r)
    expect(p).toHaveLength(3)
    expect(p[0]).not.toContain(`línea ${r.error + 1}`)
    expect(p[2]).toContain(`línea ${r.error + 1}`)
  })
})

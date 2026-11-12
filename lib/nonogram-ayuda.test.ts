import { describe, expect, it } from "vitest"
import { generateClues, getNonogramLevels } from "./nonogram"
import {
  TUTORIAL_PASOS,
  TUTORIAL_PISTAS_COLUMNAS,
  TUTORIAL_PISTAS_FILAS,
  TUTORIAL_SOLUCION,
  celdasSeguras,
  sugerirPista,
} from "./nonogram-ayuda"

const vacio = (f: number, c: number) => Array.from({ length: f }, () => Array(c).fill(0))

describe("niveles", () => {
  const niveles = getNonogramLevels()

  it("incluye al menos 4 tableros nuevos de 10×10 o más", () => {
    expect(niveles.length).toBeGreaterThanOrEqual(12)
    expect(niveles.slice(8).every((n) => n.solution.length >= 10 && n.solution[0].length >= 10)).toBe(true)
  })

  it("tienen ids únicos y pistas coherentes con la solución", () => {
    expect(new Set(niveles.map((n) => n.id)).size).toBe(niveles.length)
    for (const n of niveles) {
      const { rowClues, colClues } = generateClues(n.solution)
      expect(n.rowClues).toEqual(rowClues)
      expect(n.colClues).toEqual(colClues)
      expect(n.solution.every((f) => f.length === n.solution[0].length)).toBe(true)
    }
  })
})

describe("celdasSeguras", () => {
  it("rellena la línea entera si la pista ocupa todo", () => {
    expect(celdasSeguras([5], 5)).toEqual([0, 1, 2, 3, 4])
    expect(celdasSeguras([3, 1], 5)).toEqual([0, 1, 2, 4])
  })
  it("solo el solapamiento central", () => {
    expect(celdasSeguras([4], 5)).toEqual([1, 2, 3])
    expect(celdasSeguras([3], 5)).toEqual([2])
    expect(celdasSeguras([1], 5)).toEqual([])
    expect(celdasSeguras([0], 5)).toEqual([])
  })
})

describe("sugerirPista", () => {
  it("nunca sugiere celdas que contradigan la solución, jugando hasta que no hay más", () => {
    for (const n of getNonogramLevels()) {
      const tablero = vacio(n.solution.length, n.solution[0].length)
      let pasos = 0
      let sug = sugerirPista(tablero, n.rowClues, n.colClues)
      while (sug && pasos < 2000) {
        expect(sug.mensaje.length).toBeGreaterThan(10)
        for (const { row, col } of sug.celdas) {
          expect(tablero[row][col]).toBe(0)
          expect(n.solution[row][col]).toBe(sug.valor === 1 ? 1 : 0)
          tablero[row][col] = sug.valor
        }
        pasos++
        sug = sugerirPista(tablero, n.rowClues, n.colClues)
      }
      expect(pasos).toBeLessThan(2000)
    }
  })

  it("explica la fila o columna sugerida", () => {
    const n = getNonogramLevels()[0]
    const sug = sugerirPista(vacio(5, 5), n.rowClues, n.colClues)
    expect(sug).not.toBeNull()
    expect(sug!.mensaje).toMatch(/fila|columna/)
    expect(sug!.valor).toBe(1)
  })

  it("devuelve null si no hay nada que añadir", () => {
    const n = getNonogramLevels()[0]
    const resuelto = n.solution.map((f) => f.map((v) => (v ? 1 : 2)))
    expect(sugerirPista(resuelto, n.rowClues, n.colClues)).toBeNull()
  })
})

describe("tutorial", () => {
  it("cada paso es cierto y el último deja el corazón resuelto", () => {
    const { rowClues, colClues } = generateClues(TUTORIAL_SOLUCION)
    expect(rowClues).toEqual(TUTORIAL_PISTAS_FILAS)
    expect(colClues).toEqual(TUTORIAL_PISTAS_COLUMNAS)
    const tablero = vacio(5, 5)
    for (const paso of TUTORIAL_PASOS) {
      for (const [r, c] of paso.celdas) {
        expect(TUTORIAL_SOLUCION[r][c]).toBe(paso.valor === 1 ? 1 : 0)
        tablero[r][c] = paso.valor
      }
    }
    expect(tablero.map((f) => f.map((v) => (v === 1 ? 1 : 0)))).toEqual(TUTORIAL_SOLUCION)
  })
})

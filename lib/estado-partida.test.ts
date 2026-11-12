import { describe, expect, it } from "vitest"
import { esEstadoNonograma, esEstadoRobot, esEstadoSudoku } from "@/lib/estado-partida"

const matriz = (n: number, v = 0) => Array.from({ length: n }, () => Array(n).fill(v))

describe("esEstadoSudoku", () => {
  const ok = () => ({ board: matriz(9), initialBoard: matriz(9), solution: matriz(9, 1), notes: { "0-1": [1, 2] }, time: 30, hintsUsed: 1 })
  it("acepta una partida válida", () => expect(esEstadoSudoku(ok())).toBe(true))
  it("rechaza tableros con tamaño o valores inválidos", () => {
    expect(esEstadoSudoku({ ...ok(), board: matriz(8) })).toBe(false)
    expect(esEstadoSudoku({ ...ok(), board: matriz(9, 10) })).toBe(false)
    expect(esEstadoSudoku({ ...ok(), time: -1 })).toBe(false)
    expect(esEstadoSudoku({ ...ok(), notes: [] })).toBe(false)
    expect(esEstadoSudoku(null)).toBe(false)
  })
})

describe("esEstadoNonograma", () => {
  it("el tablero debe coincidir con el tamaño del nivel", () => {
    expect(esEstadoNonograma({ board: matriz(5, 1), time: 4 }, 5, 5)).toBe(true)
    expect(esEstadoNonograma({ board: matriz(5), time: 4 }, 10, 10)).toBe(false)
    expect(esEstadoNonograma({ board: matriz(5, 3), time: 4 }, 5, 5)).toBe(false)
  })
})

describe("esEstadoRobot", () => {
  it("acepta comandos conocidos, incluidos los bucles, dentro del límite", () => {
    expect(esEstadoRobot({ commands: ["repeat:3", "forward", "endRepeat", "light"], hintsShown: 1, time: 9 }, 5, 3)).toBe(true)
  })
  it("rechaza comandos desconocidos, exceso de comandos o pistas inexistentes", () => {
    expect(esEstadoRobot({ commands: ["salta"], hintsShown: 0, time: 0 }, 5, 3)).toBe(false)
    expect(esEstadoRobot({ commands: Array(6).fill("forward"), hintsShown: 0, time: 0 }, 5, 3)).toBe(false)
    expect(esEstadoRobot({ commands: [], hintsShown: 4, time: 0 }, 5, 3)).toBe(false)
  })
})

import { describe, expect, it } from "vitest"
import { checkSolution, countSolutions, generateSudoku } from "./sudoku"

const DIFICULTADES = [30, 45, 55]

describe("generateSudoku", () => {
  for (const vacias of DIFICULTADES) {
    it(`genera puzzles con una sola solución y ${vacias} celdas vacías`, () => {
      for (let i = 0; i < 5; i++) {
        const { puzzle, solution } = generateSudoku(vacias)
        expect(countSolutions(puzzle, 2)).toBe(1)
        expect(checkSolution(solution)).toBe(true)
        expect(puzzle.flat().filter((n) => n === 0).length).toBe(vacias)
        // Las pistas coinciden con la solución guardada
        puzzle.forEach((fila, r) =>
          fila.forEach((n, c) => {
            if (n !== 0) expect(n).toBe(solution[r][c])
          }),
        )
      }
    })
  }
})

describe("countSolutions", () => {
  it("detecta un tablero con varias soluciones", () => {
    const vacio = Array.from({ length: 9 }, () => Array(9).fill(0))
    expect(countSolutions(vacio, 2)).toBe(2)
  })

  it("no modifica el tablero recibido", () => {
    const { puzzle } = generateSudoku(30)
    const antes = JSON.stringify(puzzle)
    countSolutions(puzzle)
    expect(JSON.stringify(puzzle)).toBe(antes)
  })
})

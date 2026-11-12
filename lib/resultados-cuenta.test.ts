import { describe, expect, it } from "vitest"
import { filtrarMinijuegos, fusionarTiempos } from "@/lib/resultados-cuenta"

const fila = (o: Partial<Parameters<typeof filtrarMinijuegos>[0][number]> = {}) => ({
  seccion: "minijuegos",
  nivel: "sudoku",
  actividad: "facil",
  completado: true,
  tiempo: 100,
  score: 10,
  ...o,
})

describe("filtrarMinijuegos", () => {
  it("conserva solo resultados completados de minijuegos", () => {
    const r = filtrarMinijuegos([
      fila(),
      fila({ completado: false }),
      fila({ seccion: "mision-1", nivel: "1" }),
      fila({ nivel: "robot", actividad: "3" }),
    ])
    expect(r.map((x) => `${x.juego}:${x.actividad}`)).toEqual(["sudoku:facil", "robot:3"])
  })
  it("puede filtrar por juego", () => {
    expect(filtrarMinijuegos([fila(), fila({ nivel: "robot" })], "robot")).toHaveLength(1)
  })
})

describe("fusionarTiempos", () => {
  it("une logros de la cuenta y del navegador, con el menor tiempo de cada nivel", () => {
    expect(fusionarTiempos({ facil: 90, medio: 200 }, { facil: 120, dificil: 300 })).toEqual({
      facil: 90,
      medio: 200,
      dificil: 300,
    })
    expect(fusionarTiempos({ facil: 150 }, { facil: 80 })).toEqual({ facil: 80 })
  })
})

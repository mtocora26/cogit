import { describe, expect, it } from "vitest"
import { getLevels } from "@/lib/robot-programmer"
import { getNonogramLevels } from "@/lib/nonogram"
import { puntosMinijuego } from "@/lib/minijuegos-puntos"

describe("puntosMinijuego", () => {
  it("da puntos a cada nivel de cada juego", () => {
    for (const d of ["facil", "medio", "dificil"]) expect(puntosMinijuego("sudoku", d)).toBeGreaterThan(0)
    for (const l of getLevels()) expect(puntosMinijuego("robot", String(l.id))).toBeGreaterThan(0)
    for (const l of getNonogramLevels()) expect(puntosMinijuego("nonogramas", String(l.id))).toBeGreaterThan(0)
  })
  it("los niveles más difíciles valen más", () => {
    expect(puntosMinijuego("sudoku", "dificil")!).toBeGreaterThan(puntosMinijuego("sudoku", "facil")!)
  })
  it("devuelve null si no existe", () => {
    expect(puntosMinijuego("sudoku", "x")).toBeNull()
    expect(puntosMinijuego("robot", "999")).toBeNull()
    expect(puntosMinijuego("otro", "1")).toBeNull()
  })
})

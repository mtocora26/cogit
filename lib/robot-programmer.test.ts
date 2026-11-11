import { describe, expect, it } from "vitest"
import { explainFailure, getLevels, runProgram } from "@/lib/robot-programmer"

const F = "forward"
const R = "turnRight"
const L = "light"
const rep = (c: string, n: number) => Array<string>(n).fill(c)

// Soluciones que describen las pistas finales de cada nivel
const SOLUCIONES: Record<number, string[]> = {
  1: [...rep(F, 3), L],
  2: [...rep(F, 4), R, ...rep(F, 4), L],
  3: [...rep(F, 4), R, ...rep(F, 4), L],
  4: [F, F, "turnLeft", F, F, L, "turnRight", "turnRight", ...rep(F, 4), L, "turnRight", ...rep(F, 4), L, "turnRight", ...rep(F, 4), L],
  5: [...rep(F, 6), L, R, ...rep(F, 6), L, R, ...rep(F, 6), L],
  6: [...rep(F, 4), L],
  7: Array.from({ length: 4 }).flatMap(() => [...Array.from({ length: 4 }).flatMap(() => [L, F]), R]),
  8: [R, F, F, R, F, F, L],
}

describe("Robot Programmer: pistas", () => {
  const levels = getLevels()

  it("cada nivel tiene al menos dos pistas", () => {
    for (const l of levels) expect(l.hints.length).toBeGreaterThanOrEqual(2)
  })

  it.each(levels.map((l) => [l.id, l] as const))("la solución de la pista final resuelve el nivel %i", (id, level) => {
    expect(runProgram(SOLUCIONES[id], level).success).toBe(true)
  })

  it("no hay pistas sin solución", () => {
    expect(Object.keys(SOLUCIONES)).toHaveLength(levels.length)
  })
})

describe("Robot Programmer: por qué falla un programa", () => {
  const nivel1 = getLevels()[0]

  it("indica el paso en que choca con el borde", () => {
    const run = runProgram([F, F, F, F, F, F, L], nivel1)
    expect(run.problem).toEqual({ step: 5, command: F, reason: "pared" })
    expect(explainFailure(run)).toContain("borde del tablero en el paso 5")
  })

  it("indica el paso en que choca con un obstáculo", () => {
    const nivel3 = getLevels()[2]
    const run = runProgram([F, R, F, F], nivel3) // (1,0) → mira al Sur → (1,1) es obstáculo
    expect(run.problem?.reason).toBe("obstaculo")
    expect(run.problem?.step).toBe(3)
    expect(explainFailure(run)).toContain("obstáculo en el paso 3")
  })

  it("avisa de las casillas que faltan por encender", () => {
    const run = runProgram([F, F, F], nivel1)
    expect(run.success).toBe(false)
    expect(explainFailure(run)).toBe("Falta 1 casilla objetivo por encender.")
  })
})

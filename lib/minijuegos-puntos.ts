import { getLevels as nivelesRobot } from "@/lib/robot-programmer"
import { getNonogramLevels } from "@/lib/nonogram"

// Los resultados de los minijuegos se guardan en /api/progreso con esta sección;
// "nivel" es el juego y "actividad" el nivel dentro del juego.
export const SECCION_MINIJUEGOS = "minijuegos"
export const JUEGOS = ["sudoku", "nonogramas", "robot"] as const
export type Juego = (typeof JUEGOS)[number]

const SUDOKU: Record<string, number> = { facil: 10, medio: 20, dificil: 30 }
const ROBOT: Record<string, number> = { Fácil: 10, Medio: 20, Difícil: 30, Extra: 15, Bucles: 25 }

/**
 * Puntos fijos por nivel: repetir un nivel no suma más (el servidor conserva el máximo).
 * Devuelve null si el juego o el nivel no existen.
 */
export function puntosMinijuego(juego: string, actividad: string): number | null {
  if (juego === "sudoku") return SUDOKU[actividad] ?? null
  if (juego === "robot") {
    const n = nivelesRobot().find((l) => String(l.id) === actividad)
    return n ? (ROBOT[n.difficulty] ?? 10) : null
  }
  if (juego === "nonogramas") {
    const n = getNonogramLevels().find((l) => String(l.id) === actividad)
    if (!n) return null
    const lado = n.solution.length
    return lado <= 5 ? 10 : lado <= 10 ? 20 : 30
  }
  return null
}

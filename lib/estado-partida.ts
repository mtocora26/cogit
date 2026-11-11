import { SECCION_MINIJUEGOS, type Juego } from "@/lib/minijuegos-puntos"
import { parseRepeat } from "@/lib/robot-programmer"

// REQ-006: partida a medias de un minijuego, guardada en la cuenta con /api/progreso/parcial.

export interface EstadoSudoku {
  board: number[][]
  initialBoard: number[][]
  solution: number[][]
  notes: Record<string, number[]>
  time: number
  hintsUsed: number
}
export interface EstadoNonograma {
  board: number[][]
  time: number
}
export interface EstadoRobot {
  commands: string[]
  hintsShown: number
  time: number
}

const esMatriz = (m: unknown, filas: number, cols: number, max: number): m is number[][] =>
  Array.isArray(m) &&
  m.length === filas &&
  m.every((f) => Array.isArray(f) && f.length === cols && f.every((v) => Number.isInteger(v) && v >= 0 && v <= max))
const esTiempo = (t: unknown): t is number => typeof t === "number" && Number.isFinite(t) && t >= 0

export function esEstadoSudoku(e: unknown): e is EstadoSudoku {
  const s = e as EstadoSudoku
  return (
    !!s &&
    esMatriz(s.board, 9, 9, 9) &&
    esMatriz(s.initialBoard, 9, 9, 9) &&
    esMatriz(s.solution, 9, 9, 9) &&
    !!s.notes &&
    typeof s.notes === "object" &&
    !Array.isArray(s.notes) &&
    esTiempo(s.time) &&
    Number.isInteger(s.hintsUsed) &&
    s.hintsUsed >= 0
  )
}

/** El tablero guardado debe tener el tamaño del nivel (lado × lado). */
export function esEstadoNonograma(e: unknown, filas: number, cols: number): e is EstadoNonograma {
  const s = e as EstadoNonograma
  return !!s && esMatriz(s.board, filas, cols, 2) && esTiempo(s.time)
}

export function esEstadoRobot(e: unknown, limiteComandos: number, totalPistas: number): e is EstadoRobot {
  const s = e as EstadoRobot
  return (
    !!s &&
    Array.isArray(s.commands) &&
    s.commands.length <= limiteComandos &&
    s.commands.every(
      (c) => typeof c === "string" && (["forward", "turnRight", "turnLeft", "light", "endRepeat"].includes(c) || parseRepeat(c) !== null),
    ) &&
    Number.isInteger(s.hintsShown) &&
    s.hintsShown >= 0 &&
    s.hintsShown <= totalPistas &&
    esTiempo(s.time)
  )
}

const consulta = (juego: Juego, actividad: string) =>
  new URLSearchParams({ seccion: SECCION_MINIJUEGOS, nivel: juego, actividad })

/** Lee la partida guardada de un nivel (null si no hay o no se pudo leer). */
export async function leerPartida(juego: Juego, actividad: string): Promise<{ estado: unknown; vidas: number } | null> {
  try {
    const res = await fetch(`/api/progreso/parcial?${consulta(juego, actividad)}`)
    if (!res.ok) return null
    const p = await res.json()
    return p && p.estado ? { estado: p.estado, vidas: Number(p.vidas) } : null
  } catch {
    return null
  }
}

/** Guarda la partida en curso. Devuelve false si no se pudo. */
export async function guardarPartida(juego: Juego, actividad: string, estado: object, vidas = 0): Promise<boolean> {
  try {
    const res = await fetch("/api/progreso/parcial", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seccion: SECCION_MINIJUEGOS, nivel: juego, actividad, estado, vidas }),
    })
    return res.ok
  } catch {
    return false
  }
}

/** Descarta la partida guardada (al reiniciar o al perder). */
export async function descartarPartida(juego: Juego, actividad: string): Promise<void> {
  try {
    await fetch(`/api/progreso/parcial?${consulta(juego, actividad)}`, { method: "DELETE" })
  } catch {}
}

import { SECCION_MINIJUEGOS, type Juego } from "@/lib/minijuegos-puntos"

export interface ResultadoMinijuego {
  juego: Juego
  actividad: string
  tiempo: number
  score: number
}

interface Fila {
  seccion: string
  nivel: string
  actividad: string
  completado: boolean
  tiempo: number
  score: number
}

/** Deja solo los resultados completados de minijuegos a partir de las filas de /api/progreso. */
export function filtrarMinijuegos(filas: Fila[], juego?: Juego): ResultadoMinijuego[] {
  return filas
    .filter((f) => f.seccion === SECCION_MINIJUEGOS && f.completado && (!juego || f.nivel === juego))
    .map((f) => ({ juego: f.nivel as Juego, actividad: String(f.actividad), tiempo: f.tiempo, score: f.score }))
}

/** Une dos mapas de mejores tiempos (actividad → segundos) quedándose con el menor de cada actividad. */
export function fusionarTiempos(a: Record<string, number>, b: Record<string, number>): Record<string, number> {
  const out = { ...a }
  for (const [k, v] of Object.entries(b)) {
    out[k] = k in out ? Math.min(out[k], v) : v
  }
  return out
}

/** Pide a la cuenta los resultados de minijuegos. Lanza si no hay sesión o falla la red. */
export async function cargarResultados(): Promise<ResultadoMinijuego[]> {
  const res = await fetch("/api/progreso")
  if (!res.ok) throw new Error("No se pudieron cargar los resultados")
  return filtrarMinijuegos(await res.json())
}

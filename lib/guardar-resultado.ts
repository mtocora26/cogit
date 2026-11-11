import { SECCION_MINIJUEGOS, type Juego } from "@/lib/minijuegos-puntos"

export type EstadoGuardado = "guardando" | "guardado" | "error"

/** Envía el resultado de un nivel a la cuenta. Lanza un Error con un mensaje para el jugador si falla. */
export async function guardarResultado(juego: Juego, actividad: string, tiempo: number): Promise<void> {
  let res: Response
  try {
    res = await fetch("/api/progreso", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ seccion: SECCION_MINIJUEGOS, nivel: juego, actividad, completado: true, tiempo }),
    })
  } catch {
    throw new Error("No hay conexión.")
  }
  if (res.status === 401) throw new Error("Inicia sesión para guardar tu resultado.")
  if (!res.ok) throw new Error("No se pudo guardar tu resultado.")
}

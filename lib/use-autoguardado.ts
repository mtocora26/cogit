"use client"

import { useEffect, useRef, useState } from "react"
import { guardarPartida } from "@/lib/estado-partida"
import type { Juego } from "@/lib/minijuegos-puntos"

const ESPERA_MS = 1500

/**
 * Guarda la partida en curso en la cuenta poco después de cada cambio (REQ-006).
 * - `estado` debe estar memorizado (useMemo) y NO incluir el cronómetro, que cambia cada segundo:
 *   el tiempo se agrega al guardar con `extra`.
 * - Solo guarda mientras `activo` es true (jugando, sin terminar).
 * Devuelve si el último guardado falló.
 */
export function useAutoguardado(
  juego: Juego,
  actividad: string | null,
  estado: object | null,
  activo: boolean,
  opciones: { vidas?: number; extra?: () => object } = {},
): { errorGuardado: boolean } {
  const [errorGuardado, setErrorGuardado] = useState(false)
  const omitir = useRef(true)
  const extra = useRef(opciones.extra)
  extra.current = opciones.extra
  const vidas = opciones.vidas ?? 0

  // Al cambiar de nivel, el primer estado (recién cargado o creado) no se guarda hasta que el jugador haga algo.
  useEffect(() => {
    omitir.current = true
  }, [actividad])

  useEffect(() => {
    if (!activo || !actividad || !estado) return
    if (omitir.current) {
      omitir.current = false
      return
    }
    const t = setTimeout(async () => {
      const ok = await guardarPartida(juego, actividad, { ...estado, ...extra.current?.() }, vidas)
      setErrorGuardado(!ok)
    }, ESPERA_MS)
    return () => clearTimeout(t)
  }, [juego, actividad, estado, activo, vidas])

  return { errorGuardado }
}

"use client"

import { useEffect, useState } from "react"
import type { Juego } from "@/lib/minijuegos-puntos"
import { cargarResultados, type ResultadoMinijuego } from "@/lib/resultados-cuenta"

/**
 * Resultados de un juego guardados en la cuenta (null mientras cargan o si no se pudieron leer;
 * en ese caso las pantallas siguen usando lo guardado en el navegador).
 */
export function useResultadosCuenta(juego: Juego): ResultadoMinijuego[] | null {
  const [resultados, setResultados] = useState<ResultadoMinijuego[] | null>(null)
  useEffect(() => {
    let vivo = true
    cargarResultados()
      .then((r) => vivo && setResultados(r.filter((x) => x.juego === juego)))
      .catch(() => {})
    return () => {
      vivo = false
    }
  }, [juego])
  return resultados
}

"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { guardarResultado, type EstadoGuardado } from "@/lib/guardar-resultado"
import type { Juego } from "@/lib/minijuegos-puntos"

interface Props {
  juego: Juego
  actividad: string
  tiempo: number
}

/** Guarda el resultado al montarse (al completar el nivel) y permite reintentar si falla. */
export default function GuardadoResultado({ juego, actividad, tiempo }: Props) {
  const [estado, setEstado] = useState<EstadoGuardado>("guardando")
  const [mensaje, setMensaje] = useState("")
  const enviado = useRef(false)

  const guardar = useCallback(async () => {
    setEstado("guardando")
    try {
      await guardarResultado(juego, actividad, tiempo)
      setEstado("guardado")
    } catch (e) {
      setMensaje(e instanceof Error ? e.message : "No se pudo guardar tu resultado.")
      setEstado("error")
    }
  }, [juego, actividad, tiempo])

  useEffect(() => {
    if (enviado.current) return
    enviado.current = true
    guardar()
  }, [guardar])

  return (
    <div role="status" aria-live="polite" className="mt-3 text-center text-sm">
      {estado === "guardando" && <p className="text-gray-500">Guardando tu resultado…</p>}
      {estado === "guardado" && <p className="text-green-600">Resultado guardado en tu cuenta.</p>}
      {estado === "error" && (
        <div className="space-y-2">
          <p className="text-red-600">{mensaje} Tu resultado aún no está guardado.</p>
          <Button size="sm" variant="outline" onClick={guardar}>
            Reintentar
          </Button>
        </div>
      )}
    </div>
  )
}

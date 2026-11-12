"use client"

import { Button } from "@/components/ui/button"

interface Props {
  /** Se retomó una partida guardada en la cuenta. */
  retomada: boolean
  /** El último autoguardado falló. */
  errorGuardado: boolean
  onEmpezarDeNuevo: () => void
}

/** REQ-006: avisa que se retomó la partida y si el guardado automático está fallando. */
export default function AvisoPartida({ retomada, errorGuardado, onEmpezarDeNuevo }: Props) {
  if (!retomada && !errorGuardado) return null
  return (
    <div role="status" aria-live="polite" className="space-y-2 text-sm">
      {retomada && (
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-blue-400/40 bg-blue-400/10 px-3 py-2 text-blue-100">
          <span>Retomaste tu partida guardada.</span>
          <Button size="sm" variant="outline" onClick={onEmpezarDeNuevo}>
            Empezar de nuevo
          </Button>
        </div>
      )}
      {errorGuardado && (
        <div className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-red-200">
          No se pudo guardar tu avance. Se reintentará con tu siguiente movimiento.
        </div>
      )}
    </div>
  )
}

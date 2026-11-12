"use client"

import { useState } from "react"
import { Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Glyph, glyphName } from "@/components/misiones/glyph"

export interface Pista {
  texto: string
  /** Fichas que acompañan al texto; siempre se dicen también por su nombre (no solo por color o forma). */
  fichas?: string[]
}

/**
 * Pistas por niveles: orientar, acotar y, solo al final, mostrar la respuesta.
 * Pedir una pista no completa la ronda ni suma puntos. Se reinicia al cambiar su `key` (una por ronda).
 */
export default function Pistas({ pistas }: { pistas: Pista[] }) {
  const [usadas, setUsadas] = useState(0)
  const total = pistas.length
  const etiqueta = (i: number) => (i === total - 1 ? "Respuesta" : i === 0 ? "Orientación" : "Más cerca")

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3">
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button
          type="button"
          variant="outline"
          className="min-h-11 border-yellow-400 text-yellow-400 hover:bg-yellow-500/10"
          onClick={() => setUsadas((u) => Math.min(u + 1, total))}
          disabled={usadas >= total}
        >
          <Lightbulb aria-hidden className="mr-2 h-5 w-5" />
          {usadas === 0 ? "Pedir pista" : usadas < total ? "Otra pista" : "Sin más pistas"}
        </Button>
        <span className="text-sm text-muted-foreground">
          Pistas usadas en esta ronda: {usadas}/{total}
        </span>
      </div>
      <ol aria-live="polite" className="w-full space-y-2">
        {pistas.slice(0, usadas).map((p, i) => (
          <li key={i} className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-3 text-sm">
            <span className="font-semibold text-yellow-400">{etiqueta(i)}: </span>
            {p.texto}
            {p.fichas && (
              <span className="mt-2 flex flex-wrap items-center gap-2">
                {p.fichas.map((f, k) => (
                  <span key={k} className="inline-flex items-center gap-1 rounded-md border border-border bg-secondary px-2 py-1">
                    <Glyph token={f} className="h-5 w-5" />
                    <span>{glyphName(f)}</span>
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  )
}

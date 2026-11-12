"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import NonogramBoard from "@/components/nonogram/nonogram-board"
import {
  TUTORIAL_PASOS,
  TUTORIAL_PISTAS_COLUMNAS,
  TUTORIAL_PISTAS_FILAS,
  TUTORIAL_SOLUCION,
} from "@/lib/nonogram-ayuda"

interface Props {
  open: boolean
  onClose: () => void
}

/** Tutorial con un ejemplo resuelto paso a paso. Es local: no toca el tablero ni el progreso. */
export default function NonogramaTutorial({ open, onClose }: Props) {
  // paso = cuántos pasos del ejemplo se muestran ya aplicados (0 = tablero vacío)
  const [paso, setPaso] = useState(0)

  const tablero = Array.from({ length: 5 }, () => Array(5).fill(0))
  TUTORIAL_PASOS.slice(0, paso).forEach((p) => p.celdas.forEach(([r, c]) => (tablero[r][c] = p.valor)))
  const actual = paso > 0 ? TUTORIAL_PASOS[paso - 1] : null
  const ultimo = paso === TUTORIAL_PASOS.length

  return (
    <Dialog
      open={open}
      onOpenChange={(abierto) => {
        if (!abierto) {
          setPaso(0)
          onClose()
        }
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Cómo jugar a Nonogramas</DialogTitle>
          <DialogDescription>
            Los números de cada fila y columna dicen cuántas celdas seguidas van rellenas. Un ejemplo resuelto paso a
            paso.
          </DialogDescription>
        </DialogHeader>

        <ul className="list-disc space-y-1 pl-5 text-sm">
          <li>«3 1» significa un bloque de 3 celdas, al menos un hueco, y luego un bloque de 1.</li>
          <li>Clic izquierdo (o toque) rellena; clic derecho marca con X las celdas que quedan vacías.</li>
          <li>Empieza por las líneas con pistas grandes: tienen pocas formas de colocarse.</li>
        </ul>

        <div className="space-y-3 rounded-lg border p-3">
          <div className="flex items-center justify-between text-sm font-medium">
            <span>
              Paso {paso} de {TUTORIAL_PASOS.length}
            </span>
            <span className="text-muted-foreground">Ejemplo 5×5</span>
          </div>

          <div className="overflow-x-auto">
            <NonogramBoard
              board={tablero}
              rowClues={TUTORIAL_PISTAS_FILAS}
              colClues={TUTORIAL_PISTAS_COLUMNAS}
              onCellClick={() => {}}
              errors={[]}
              showHint={actual !== null}
              solution={TUTORIAL_SOLUCION}
              hintCells={actual ? actual.celdas.map(([row, col]) => ({ row, col })) : []}
              hintLine={actual ? { tipo: actual.tipo, indice: actual.indice } : null}
            />
          </div>

          <p className="min-h-12 text-sm" aria-live="polite">
            {actual
              ? actual.texto
              : "Pulsa «Siguiente» para empezar. En verde verás la fila o columna que se analiza y las celdas que cambian."}
          </p>

          <div className="flex justify-between gap-2">
            <Button variant="outline" size="sm" onClick={() => setPaso((p) => Math.max(0, p - 1))} disabled={paso === 0}>
              Anterior
            </Button>
            <Button
              size="sm"
              onClick={() => setPaso((p) => Math.min(TUTORIAL_PASOS.length, p + 1))}
              disabled={ultimo}
            >
              Siguiente
            </Button>
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            onClick={() => {
              setPaso(0)
              onClose()
            }}
          >
            Entendido
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

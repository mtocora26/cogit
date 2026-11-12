"use client"

import { useState } from "react"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Ejemplo en miniatura (4×4, regiones de 2×2). Es local: no toca el tablero ni el progreso.
const EJEMPLO = [
  [1, 2, 3, 4],
  [3, 4, 1, 2],
  [2, 1, 4, 0],
  [4, 3, 2, 1],
]
const RESPUESTA = 3

const REGLAS = [
  "Completa la cuadrícula de 9×9 con los números del 1 al 9.",
  "Cada fila debe tener los números del 1 al 9, sin repetir.",
  "Cada columna también.",
  "Cada región de 3×3 también.",
  "Los números que ya vienen puestos no se pueden cambiar.",
]

export function SudokuReglas({ className }: { className?: string }) {
  const [elegido, setElegido] = useState<number | null>(null)

  const mensaje =
    elegido === null
      ? "Mira la fila y la columna de la celda vacía: ¿qué número falta en las dos?"
      : elegido === RESPUESTA
        ? "¡Correcto! En su fila ya están 2, 1 y 4, y en su columna 4, 2 y 1. Solo queda el 3."
        : `El ${elegido} no sirve: ya aparece en la fila o en la columna de esa celda. Descarta los que ya están.`

  return (
    <Dialog onOpenChange={(abierto) => abierto && setElegido(null)}>
      <DialogTrigger asChild>
        <Button variant="outline" className={className}>
          <BookOpen className="mr-2 h-4 w-4" />
          Reglas y ejemplo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Cómo se juega al Sudoku</DialogTitle>
          <DialogDescription>Un número no puede repetirse en su fila, columna ni región.</DialogDescription>
        </DialogHeader>

        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {REGLAS.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>

        <div className="space-y-3">
          <h3 className="font-semibold">Ejemplo: una cuadrícula de 4×4</h3>
          <div
            className="mx-auto grid w-44 grid-cols-4 border-2 border-foreground"
            role="img"
            aria-label="Cuadrícula de 4 por 4 con una celda vacía en la fila 3, columna 4"
          >
            {EJEMPLO.flatMap((fila, r) =>
              fila.map((n, c) => {
                const vacia = n === 0
                const valor = vacia ? elegido : n
                return (
                  <div
                    key={`${r}-${c}`}
                    className={[
                      "flex h-11 items-center justify-center text-lg font-semibold",
                      "border border-border",
                      c === 1 ? "border-r-2 border-r-foreground" : "",
                      r === 1 ? "border-b-2 border-b-foreground" : "",
                      vacia ? (elegido === RESPUESTA ? "bg-green-100 text-green-700" : "bg-primary/10") : "",
                    ].join(" ")}
                  >
                    {valor ?? ""}
                  </div>
                )
              }),
            )}
          </div>
          <div className="flex justify-center gap-2" role="group" aria-label="Elige el número de la celda vacía">
            {[1, 2, 3, 4].map((n) => (
              <Button
                key={n}
                size="sm"
                variant={elegido === n ? "default" : "outline"}
                aria-pressed={elegido === n}
                onClick={() => setElegido(n)}
              >
                {n}
              </Button>
            ))}
          </div>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            {mensaje}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

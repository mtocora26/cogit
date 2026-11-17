"use client"

import { useState } from "react"
import { ArrowRight, Bug } from "lucide-react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { MarcaEstado, type EstadoVisual } from "@/components/misiones/nivel4/estado-visual"
import { textoOperacion } from "@/lib/algoritmos"
import { dificultadDeRonda, generarDepurar, pistasDepurar, revisarDepurar, valorPrevio, type RondaDepurar } from "@/lib/descomposicion"

const RONDAS = 5

// La línea se marca con una banda de color a la izquierda, como en un editor de código.
const BORDE_LINEA: Record<EstadoVisual, string> = {
  neutro: "border-l-transparent hover:bg-accent/60",
  elegido: "border-l-blue-400 bg-blue-500/10",
  correcto: "border-l-green-500 bg-green-500/10 animate-in fade-in duration-300",
  incorrecto: "border-l-red-500 bg-red-500/10 sacudir",
}

function Depurar({ ronda, responder, respondida }: { ronda: RondaDepurar; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<number | null>(null)
  const ultimo = ronda.mostrado[ronda.mostrado.length - 1]
  const esperado = ronda.correcto[ronda.correcto.length - 1]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 text-center">
        {[
          { etiqueta: "Empieza con", valor: ronda.inicio, color: "text-neuron" },
          { etiqueta: "Debería terminar", valor: esperado, color: "text-green-400" },
          { etiqueta: "Terminó en", valor: ultimo, color: "text-red-400" },
        ].map((d) => (
          <div key={d.etiqueta} className="rounded-xl border border-border bg-secondary p-2 sm:p-3">
            <p className="text-xs text-muted-foreground sm:text-sm">{d.etiqueta}</p>
            <p className={cn("text-2xl font-bold sm:text-3xl", d.color)}>{d.valor}</p>
          </div>
        ))}
      </div>
      <p className="flex items-center justify-center gap-2 text-center text-sm text-muted-foreground">
        <Bug aria-hidden className="h-4 w-4 text-red-400" /> Una línea hizo mal su cuenta. Tócala.
      </p>

      <ol role="group" aria-label="Líneas del programa" className="overflow-hidden rounded-xl border-2 border-border bg-background font-mono">
        {ronda.operaciones.map((o, i) => {
          const esError = i === ronda.error
          const estado: EstadoVisual = respondida ? (esError ? "correcto" : elegida === i ? "incorrecto" : "neutro") : elegida === i ? "elegido" : "neutro"
          return (
            <li key={i} className="border-b border-border last:border-b-0">
              <button
                type="button"
                aria-pressed={elegida === i}
                disabled={respondida}
                onClick={() => setElegida(i)}
                className={cn(
                  "flex min-h-14 w-full flex-wrap items-center gap-x-3 gap-y-1 border-l-4 px-3 py-2 text-left transition-colors motion-reduce:transition-none",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring",
                  BORDE_LINEA[estado],
                )}
              >
                <span aria-hidden className="w-6 shrink-0 select-none text-right text-sm text-muted-foreground">{i + 1}</span>
                <span className="sr-only">Línea {i + 1}: </span>
                <span className="flex-1 text-base font-semibold">{textoOperacion(o)}</span>
                <span className="flex items-center gap-1 text-sm">
                  <span className="rounded bg-secondary px-2 py-0.5">{valorPrevio(ronda, i)}</span>
                  <ArrowRight aria-hidden className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className={cn("rounded px-2 py-0.5 font-bold", respondida && esError ? "bg-red-500/20 text-red-300 line-through" : "bg-secondary")}>
                    {ronda.mostrado[i]}
                  </span>
                  {respondida && esError && <span className="rounded bg-green-500/20 px-2 py-0.5 font-bold text-green-300">{ronda.correcto[i]}</span>}
                </span>
                {estado === "elegido" && <span className="text-sm font-semibold text-blue-300">Elegida</span>}
                {respondida && esError && <MarcaEstado estado="correcto" />}
                {estado === "incorrecto" && <MarcaEstado estado="incorrecto" />}
              </button>
            </li>
          )
        })}
      </ol>
      <p className="text-center text-xs text-muted-foreground">Cada línea muestra: valor antes → valor después.</p>

      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || elegida === null}
          onClick={() => {
            const r = revisarDepurar(ronda, elegida!)
            responder(r.correcto, r.explicacion)
          }}
        >
          Esta línea tiene el error
        </Button>
      </div>
    </div>
  )
}

export default function DepuraPrograma(props: PropsActividad) {
  return (
    <RondasJuego<RondaDepurar>
      {...props}
      rondas={RONDAS}
      titulo="Depura el programa"
      instruccion="Cada línea muestra el valor antes y después de ejecutarse. Comprueba las cuentas y encuentra la que está mal."
      generar={(n) => generarDepurar(dificultadDeRonda(n, RONDAS))}
      pistas={pistasDepurar}
      render={(r, c) => <Depurar ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

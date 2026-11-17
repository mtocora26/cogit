"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { claseEstado, MarcaEstado, type EstadoVisual } from "@/components/misiones/nivel4/estado-visual"
import { dificultadDeRonda, generarError, pistasError, revisarError, type RondaError } from "@/lib/descomposicion"

const RONDAS = 5

function PasoError({ ronda, responder, respondida }: { ronda: RondaError; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegido, setElegido] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Tarea</p>
        <p className="text-xl font-bold">{ronda.titulo}</p>
      </div>
      <p className="text-center text-sm text-muted-foreground">Uno de estos pasos tiene un error. Tócalo.</p>

      {/* Línea de tiempo: los pasos van unidos para leerse en orden. */}
      <ol role="group" aria-label="Pasos" className="relative space-y-3 before:absolute before:bottom-6 before:left-[1.35rem] before:top-6 before:w-0.5 before:bg-border">
        {ronda.pasos.map((paso, i) => {
          const esError = i === ronda.error
          const estado: EstadoVisual = respondida ? (esError ? "correcto" : elegido === i ? "incorrecto" : "neutro") : elegido === i ? "elegido" : "neutro"
          return (
            <li key={`${paso}-${i}`} className="relative">
              <button
                type="button"
                aria-pressed={elegido === i}
                disabled={respondida}
                onClick={() => setElegido(i)}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-xl border-2 p-3 text-left transition-all motion-reduce:transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.99]",
                  claseEstado(estado),
                  estado === "neutro" && "hover:border-blue-400/60",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full font-bold",
                    estado === "correcto" ? "bg-green-500/30 text-green-200" : estado === "incorrecto" ? "bg-red-500/30 text-red-200" : "bg-blue-500/20 text-blue-300",
                  )}
                >
                  {i + 1}
                </span>
                <span className="sr-only">Paso {i + 1}: </span>
                <span className="flex-1 text-base">{paso}</span>
                {estado === "elegido" && <span className="text-sm font-semibold text-blue-300">Elegido</span>}
                {respondida && esError && <MarcaEstado estado="correcto" />}
                {estado === "incorrecto" && <MarcaEstado estado="incorrecto" />}
              </button>
            </li>
          )
        })}
      </ol>

      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || elegido === null}
          onClick={() => {
            const r = revisarError(ronda, elegido!)
            responder(r.correcto, r.explicacion)
          }}
        >
          Este es el error
        </Button>
      </div>
    </div>
  )
}

export default function EncuentraError(props: PropsActividad) {
  const usadas = useRef(new Set<string>())
  return (
    <RondasJuego<RondaError>
      {...props}
      rondas={RONDAS}
      titulo="Encuentra el error"
      instruccion="Depurar es buscar por qué algo no funciona. Lee los pasos en orden y señala el que está mal."
      generar={(n) => generarError(dificultadDeRonda(n, RONDAS), { usadas: usadas.current })}
      pistas={pistasError}
      render={(r, c) => <PasoError ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

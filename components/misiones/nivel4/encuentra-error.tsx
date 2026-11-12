"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { dificultadDeRonda, generarError, pistasError, revisarError, type RondaError } from "@/lib/descomposicion"

const RONDAS = 5

function PasoError({ ronda, responder, respondida }: { ronda: RondaError; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegido, setElegido] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-center text-lg font-semibold">Tarea: {ronda.titulo}</p>
      <p className="text-center text-sm text-muted-foreground">Estos pasos tienen un error. Toca el paso que está mal.</p>
      <ol role="group" aria-label="Pasos" className="space-y-2">
        {ronda.pasos.map((paso, i) => (
          <li key={`${paso}-${i}`}>
            <button
              type="button"
              aria-pressed={elegido === i}
              disabled={respondida}
              onClick={() => setElegido(i)}
              className={cn(
                "flex min-h-11 w-full items-center gap-3 rounded-lg border-2 bg-secondary p-3 text-left transition-colors",
                elegido === i ? "border-blue-400 bg-blue-500/10" : "border-blue-700/30 hover:border-blue-400/60",
              )}
            >
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 font-bold text-blue-300">{i + 1}</span>
              <span className="sr-only">Paso {i + 1}: </span>
              <span className="flex-1">{paso}</span>
              {elegido === i && <span className="text-sm font-semibold text-blue-300">Elegido</span>}
            </button>
          </li>
        ))}
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

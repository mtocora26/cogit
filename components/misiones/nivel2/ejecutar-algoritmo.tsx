"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { dificultadDeRonda, generarEjecutar, pistasEjecutar, revisarEjecutar, textoOperacion, type RondaEjecutar } from "@/lib/algoritmos"

const RONDAS = 5

function Ejecutar({ ronda, responder, respondida }: { ronda: RondaEjecutar; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-center text-lg">
        Empiezas con el número <strong className="text-2xl text-neuron">{ronda.inicio}</strong>. Ejecuta las instrucciones en orden, de arriba hacia abajo.
      </p>
      <ol className="space-y-2">
        {ronda.operaciones.map((o, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg border-2 border-blue-700/30 bg-secondary p-3">
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 font-bold text-blue-300">{i + 1}</span>
            <span className="text-base">{textoOperacion(o)}</span>
          </li>
        ))}
      </ol>
      <p className="text-center font-semibold">¿Con qué número terminas?</p>
      <div role="group" aria-label="Resultados posibles" className="grid grid-cols-2 gap-3">
        {ronda.opciones.map((o) => (
          <Button
            key={o}
            type="button"
            variant="outline"
            className={cn("min-h-14 text-2xl font-bold", elegida === o && "border-blue-400 bg-blue-500/10")}
            aria-pressed={elegida === o}
            disabled={respondida}
            onClick={() => setElegida(o)}
          >
            {o}
          </Button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || elegida === null}
          onClick={() => {
            const r = revisarEjecutar(ronda, elegida!)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function EjecutarAlgoritmo(props: PropsActividad) {
  return (
    <RondasJuego<RondaEjecutar>
      {...props}
      rondas={RONDAS}
      titulo="Ejecuta el algoritmo"
      instruccion="Un algoritmo es una lista de instrucciones. Síguelas una por una, como lo haría un ordenador, y descubre el resultado."
      generar={(n) => generarEjecutar(dificultadDeRonda(n, RONDAS))}
      pistas={pistasEjecutar}
      render={(r, c) => <Ejecutar ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

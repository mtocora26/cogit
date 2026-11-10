"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { dificultadDeRonda, generarSobra, pistasSobra, revisarSobra, type RondaSobra } from "@/lib/abstraccion"

const RONDAS = 5

function Sobra({ ronda, responder, respondida }: { ronda: RondaSobra; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<number | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-center text-lg font-semibold">Todas pertenecen a un mismo grupo menos una. ¿Cuál sobra?</p>
      <div role="group" aria-label="Palabras" className="grid grid-cols-2 gap-3">
        {ronda.palabras.map((p, i) => (
          <Button
            key={p}
            type="button"
            variant="outline"
            className={`h-auto min-h-14 whitespace-normal py-3 text-lg ${elegida === i ? "border-blue-400 bg-blue-500/10" : ""}`}
            aria-pressed={elegida === i}
            disabled={respondida}
            onClick={() => setElegida(i)}
          >
            {p}
          </Button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || elegida === null}
          onClick={() => {
            const r = revisarSobra(ronda, elegida!)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function QueSobra(props: PropsActividad) {
  return (
    <RondasJuego<RondaSobra>
      {...props}
      rondas={RONDAS}
      titulo="¿Qué sobra?"
      instruccion="Piensa en el grupo al que pertenecen casi todas las palabras y señala la que no encaja."
      generar={(n) => generarSobra(dificultadDeRonda(n, RONDAS))}
      pistas={pistasSobra}
      render={(r, c) => <Sobra ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

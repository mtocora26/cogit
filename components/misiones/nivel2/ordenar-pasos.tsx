"use client"

import { useRef, useState } from "react"
import { ArrowDown, ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { generarOrden, pistasOrden, revisarOrden, type RondaOrden } from "@/lib/algoritmos"

function Orden({ ronda, responder, respondida }: { ronda: RondaOrden; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [orden, setOrden] = useState<string[]>(ronda.mezclados)
  const [aviso, setAviso] = useState("")

  const mover = (i: number, d: -1 | 1) => {
    const j = i + d
    if (j < 0 || j >= orden.length) return
    const n = [...orden]
    ;[n[i], n[j]] = [n[j], n[i]]
    setOrden(n)
    setAviso(`«${orden[i]}» ahora es el paso ${j + 1} de ${orden.length}.`)
  }

  return (
    <div className="space-y-4">
      <p className="text-center text-lg font-semibold">Tarea: {ronda.titulo}</p>
      <ol className="space-y-2">
        {orden.map((paso, i) => (
          <li key={paso} className="flex items-center gap-2 rounded-lg border-2 border-blue-700/30 bg-secondary p-2">
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 font-bold text-blue-300">{i + 1}</span>
            <span className="flex-1 text-base">
              <span className="sr-only">Paso {i + 1}: </span>
              {paso}
            </span>
            <Button type="button" variant="outline" size="icon" className="h-11 w-11" disabled={respondida || i === 0} onClick={() => mover(i, -1)} aria-label={`Subir «${paso}»`}>
              <ArrowUp aria-hidden className="h-5 w-5" />
            </Button>
            <Button type="button" variant="outline" size="icon" className="h-11 w-11" disabled={respondida || i === orden.length - 1} onClick={() => mover(i, 1)} aria-label={`Bajar «${paso}»`}>
              <ArrowDown aria-hidden className="h-5 w-5" />
            </Button>
          </li>
        ))}
      </ol>
      <p aria-live="polite" className="sr-only">{aviso}</p>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida}
          onClick={() => {
            const r = revisarOrden(ronda, orden)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar el orden
        </Button>
      </div>
    </div>
  )
}

export default function OrdenarPasos(props: PropsActividad) {
  const usadas = useRef(new Set<string>())
  return (
    <RondasJuego<RondaOrden>
      {...props}
      titulo="Ordena los pasos"
      instruccion="Los pasos de la tarea están revueltos. Muévelos con las flechas hasta dejarlos en el orden en que se hacen."
      generar={() => generarOrden({ usadas: usadas.current })}
      pistas={pistasOrden}
      render={(r, c) => <Orden ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

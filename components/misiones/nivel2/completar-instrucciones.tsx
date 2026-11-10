"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { generarInstrucciones, pistasInstrucciones, revisarInstrucciones, type RondaInstrucciones } from "@/lib/algoritmos"

function Hueco({ ronda, responder, respondida }: { ronda: RondaInstrucciones; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<string | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-center text-lg font-semibold">Tarea: {ronda.titulo}</p>
      <ol className="space-y-2">
        {ronda.pasos.map((paso, i) => (
          <li key={i} className="flex items-center gap-2 rounded-lg border-2 border-blue-700/30 bg-secondary p-3">
            <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 font-bold text-blue-300">{i + 1}</span>
            {i === ronda.hueco ? (
              <span className={cn("flex-1 rounded-md border-2 border-dashed px-3 py-1", elegida ? "border-solid border-blue-400" : "border-muted-foreground text-muted-foreground")}>
                <span className="sr-only">Paso {i + 1} (hueco): </span>
                {elegida ?? "¿Qué paso falta aquí?"}
              </span>
            ) : (
              <span className="flex-1">{paso}</span>
            )}
          </li>
        ))}
      </ol>
      <div role="group" aria-label="Opciones para el hueco" className="grid gap-2">
        {ronda.opciones.map((o) => (
          <Button
            key={o}
            type="button"
            variant="outline"
            className={cn("h-auto min-h-11 justify-start whitespace-normal py-2 text-left text-base", elegida === o && "border-blue-400 bg-blue-500/10")}
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
          disabled={respondida || !elegida}
          onClick={() => {
            const r = revisarInstrucciones(ronda, elegida!)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function CompletarInstrucciones(props: PropsActividad) {
  const usadas = useRef(new Set<string>())
  return (
    <RondasJuego<RondaInstrucciones>
      {...props}
      titulo="Completa las instrucciones"
      instruccion="A estas instrucciones les falta un paso. Elige el que va en el hueco para que la tarea salga bien."
      generar={() => generarInstrucciones({ usadas: usadas.current })}
      pistas={pistasInstrucciones}
      render={(r, c) => <Hueco ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

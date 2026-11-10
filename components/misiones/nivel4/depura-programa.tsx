"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { textoOperacion } from "@/lib/algoritmos"
import { dificultadDeRonda, generarDepurar, pistasDepurar, revisarDepurar, valorPrevio, type RondaDepurar } from "@/lib/descomposicion"

const RONDAS = 5

function Depurar({ ronda, responder, respondida }: { ronda: RondaDepurar; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<number | null>(null)
  const ultimo = ronda.mostrado[ronda.mostrado.length - 1]
  const esperado = ronda.correcto[ronda.correcto.length - 1]

  return (
    <div className="space-y-4">
      <p className="text-center">
        El programa empieza con <strong className="text-xl text-neuron">{ronda.inicio}</strong>. Debería terminar en <strong>{esperado}</strong>, pero terminó en{" "}
        <strong className="text-red-400">{ultimo}</strong>. Una línea hizo mal su cuenta.
      </p>
      <ol role="group" aria-label="Líneas del programa" className="space-y-2">
        {ronda.operaciones.map((o, i) => (
          <li key={i}>
            <button
              type="button"
              aria-pressed={elegida === i}
              disabled={respondida}
              onClick={() => setElegida(i)}
              className={cn(
                "flex min-h-11 w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border-2 bg-secondary p-3 text-left transition-colors",
                elegida === i ? "border-blue-400 bg-blue-500/10" : "border-blue-700/30 hover:border-blue-400/60",
              )}
            >
              <span aria-hidden className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-500/20 font-bold text-blue-300">{i + 1}</span>
              <span className="sr-only">Línea {i + 1}: </span>
              <span className="flex-1">{textoOperacion(o)}</span>
              <span className="text-sm text-muted-foreground">
                valor antes: <strong className="text-foreground">{valorPrevio(ronda, i)}</strong> → valor después: <strong className="text-foreground">{ronda.mostrado[i]}</strong>
              </span>
              {elegida === i && <span className="text-sm font-semibold text-blue-300">Elegida</span>}
            </button>
          </li>
        ))}
      </ol>
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

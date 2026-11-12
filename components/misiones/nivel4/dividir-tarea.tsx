"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { dificultadDeRonda, generarSubtareas, pistasSubtareas, revisarSubtareas, type RondaSubtareas } from "@/lib/descomposicion"

const RONDAS = 5

function Dividir({ ronda, responder, respondida }: { ronda: RondaSubtareas; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [reparto, setReparto] = useState<Record<string, string>>({})
  const completo = ronda.pasos.every((p) => reparto[p])

  return (
    <div className="space-y-4">
      <p className="text-center">
        Tarea grande: <strong className="text-lg">{ronda.titulo}</strong>
      </p>
      <ul className="rounded-lg border border-border p-3 text-sm">
        {ronda.subtareas.map((s) => (
          <li key={s.nombre}>
            <strong>{s.nombre}</strong>: sirve para {s.objetivo}.
          </li>
        ))}
      </ul>
      <p className="text-center text-sm text-muted-foreground">Decide a qué parte pertenece cada paso.</p>
      <div className="space-y-3">
        {ronda.pasos.map((paso, i) => (
          <fieldset key={paso} className="rounded-lg border-2 border-blue-700/30 bg-secondary p-3">
            <legend className="px-1 text-base font-medium">{paso}</legend>
            <div className="flex flex-wrap gap-2">
              {ronda.subtareas.map((s) => {
                const activa = reparto[paso] === s.nombre
                return (
                  <label
                    key={s.nombre}
                    className={`flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-3 text-sm ${activa ? "border-blue-400 bg-blue-500/10" : "border-border"} ${respondida ? "opacity-70" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`paso-${i}`}
                      className="h-4 w-4 accent-blue-500"
                      checked={activa}
                      disabled={respondida}
                      onChange={() => setReparto((r) => ({ ...r, [paso]: s.nombre }))}
                    />
                    {s.nombre}
                  </label>
                )
              })}
            </div>
          </fieldset>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || !completo}
          onClick={() => {
            const r = revisarSubtareas(ronda, reparto)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function DividirTarea(props: PropsActividad) {
  const usadas = useRef(new Set<string>())
  return (
    <RondasJuego<RondaSubtareas>
      {...props}
      rondas={RONDAS}
      titulo="Divide la tarea"
      instruccion="Una tarea grande se vuelve fácil cuando la partes en tareas pequeñas. Reparte cada paso en la parte que le corresponde."
      generar={(n) => generarSubtareas(dificultadDeRonda(n, RONDAS), { usadas: usadas.current })}
      pistas={pistasSubtareas}
      render={(r, c) => <Dividir ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

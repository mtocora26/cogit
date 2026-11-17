"use client"

import { useRef, useState } from "react"
import { Layers } from "lucide-react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { cn } from "@/lib/utils"
import { claseEstado, MarcaEstado, type EstadoVisual } from "@/components/misiones/nivel4/estado-visual"
import { dificultadDeRonda, generarSubtareas, pistasSubtareas, revisarSubtareas, type RondaSubtareas } from "@/lib/descomposicion"

const RONDAS = 5

// Un color por parte de la tarea, para reconocerla de un vistazo en la leyenda y en los botones.
const PARTES = [
  { tarjeta: "border-blue-400/50 bg-blue-500/10", titulo: "text-blue-300", boton: "border-blue-400/50 hover:bg-blue-500/10", activo: "border-blue-400 bg-blue-500/30 text-blue-50" },
  { tarjeta: "border-violet-400/50 bg-violet-500/10", titulo: "text-violet-300", boton: "border-violet-400/50 hover:bg-violet-500/10", activo: "border-violet-400 bg-violet-500/30 text-violet-50" },
  { tarjeta: "border-amber-400/50 bg-amber-500/10", titulo: "text-amber-300", boton: "border-amber-400/50 hover:bg-amber-500/10", activo: "border-amber-400 bg-amber-500/30 text-amber-50" },
]

function Dividir({ ronda, responder, respondida }: { ronda: RondaSubtareas; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [reparto, setReparto] = useState<Record<string, string>>({})
  const asignados = ronda.pasos.filter((p) => reparto[p]).length
  const completo = asignados === ronda.pasos.length

  return (
    <div className="space-y-5">
      <div className="text-center">
        <p className="text-sm text-muted-foreground">Tarea grande</p>
        <p className="text-xl font-bold">{ronda.titulo}</p>
      </div>

      <ul aria-label="Partes de la tarea" className="grid gap-2 sm:grid-cols-3">
        {ronda.subtareas.map((s, i) => (
          <li key={s.nombre} className={cn("rounded-xl border-2 p-3", PARTES[i % PARTES.length].tarjeta)}>
            <p className={cn("flex items-center gap-2 font-bold", PARTES[i % PARTES.length].titulo)}>
              <Layers aria-hidden className="h-4 w-4" />
              {s.nombre}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">Sirve para {s.objetivo}.</p>
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>Elige la parte a la que ayuda cada paso.</span>
        <span aria-live="polite" className="rounded-full bg-secondary px-3 py-1 font-semibold text-foreground">
          {asignados}/{ronda.pasos.length}
        </span>
      </div>

      <div className="space-y-3">
        {ronda.pasos.map((paso, i) => {
          const acierto = reparto[paso] === ronda.solucion[paso]
          const estado: EstadoVisual = respondida ? (acierto ? "correcto" : "incorrecto") : reparto[paso] ? "elegido" : "neutro"
          return (
            <fieldset key={paso} className={cn("rounded-xl border-2 p-3 transition-colors", claseEstado(estado))}>
              <legend className="sr-only">{paso}</legend>
              <div className="mb-3 flex items-start justify-between gap-3">
                <p className="text-base font-medium">{paso}</p>
                <MarcaEstado estado={estado} className="shrink-0" />
              </div>
              <div className="flex flex-wrap gap-2">
                {ronda.subtareas.map((s, k) => {
                  const activa = reparto[paso] === s.nombre
                  const colores = PARTES[k % PARTES.length]
                  return (
                    <label
                      key={s.nombre}
                      className={cn(
                        "flex min-h-11 cursor-pointer items-center rounded-lg border-2 px-4 text-sm font-semibold transition-all has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring active:scale-[0.97] motion-reduce:transition-colors",
                        activa ? colores.activo : colores.boton,
                        respondida && "cursor-default opacity-80",
                        respondida && ronda.solucion[paso] === s.nombre && "ring-2 ring-green-500",
                      )}
                    >
                      <input
                        type="radio"
                        name={`paso-${i}`}
                        className="sr-only"
                        checked={activa}
                        disabled={respondida}
                        onChange={() => setReparto((r) => ({ ...r, [paso]: s.nombre }))}
                      />
                      {s.nombre}
                    </label>
                  )
                })}
              </div>
              {respondida && !acierto && (
                <p className="mt-2 text-sm text-muted-foreground">
                  Iba en: <strong className="text-green-400">{ronda.solucion[paso]}</strong>
                </p>
              )}
            </fieldset>
          )
        })}
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

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { dificultadDeRonda, generarClasificar, pistasClasificar, revisarClasificar, type RondaClasificar } from "@/lib/abstraccion"

const RONDAS = 5

function Grupo({ letra, fichas }: { letra: "A" | "B"; fichas: string[] }) {
  return (
    <section aria-label={`Grupo ${letra}`} className="rounded-xl border-2 border-blue-700/30 bg-secondary p-3">
      <h3 className="mb-2 text-center font-bold text-blue-300">Grupo {letra}</h3>
      <ul className="flex flex-wrap justify-center gap-2">
        {fichas.map((f, i) => (
          <li key={i} className="grid h-14 w-14 place-items-center rounded-lg border border-border bg-card">
            <Glyph token={f} className="h-9 w-9" />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Clasificar({ ronda, responder, respondida }: { ronda: RondaClasificar; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [elegida, setElegida] = useState<"A" | "B" | null>(null)

  return (
    <div className="space-y-4">
      <p className="text-center">Hay una regla oculta que separa las fichas en dos grupos. Descúbrela y decide dónde va la ficha nueva.</p>
      <div className="grid gap-3 sm:grid-cols-2">
        <Grupo letra="A" fichas={ronda.grupoA} />
        <Grupo letra="B" fichas={ronda.grupoB} />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="font-semibold">Ficha nueva:</p>
        <span className="grid h-20 w-20 place-items-center rounded-xl border-2 border-dashed border-blue-400 bg-card">
          <Glyph token={ronda.ficha} className="h-14 w-14" />
        </span>
        <span className="sr-only">{glyphName(ronda.ficha)}</span>
      </div>
      <div role="group" aria-label="¿A qué grupo pertenece?" className="grid grid-cols-2 gap-3">
        {(["A", "B"] as const).map((l) => (
          <Button
            key={l}
            type="button"
            variant="outline"
            className={`min-h-14 text-lg font-bold ${elegida === l ? "border-blue-400 bg-blue-500/10" : ""}`}
            aria-pressed={elegida === l}
            disabled={respondida}
            onClick={() => setElegida(l)}
          >
            Va en el grupo {l}
          </Button>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || !elegida}
          onClick={() => {
            const r = revisarClasificar(ronda, elegida!, glyphName)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function ClasificarRegla(props: PropsActividad) {
  return (
    <RondasJuego<RondaClasificar>
      {...props}
      rondas={RONDAS}
      titulo="Clasifica con la regla oculta"
      instruccion="Mira cómo están repartidas las fichas y deduce la regla. Luego clasifica una ficha nueva."
      generar={(n) => generarClasificar(dificultadDeRonda(n, RONDAS))}
      pistas={(r) => pistasClasificar(r, glyphName)}
      render={(r, c) => <Clasificar ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

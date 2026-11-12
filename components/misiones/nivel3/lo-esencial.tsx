"use client"

import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import RondasJuego, { type PropsActividad } from "@/components/misiones/rondas-juego"
import { generarEsencial, pistasEsencial, revisarEsencial, type RondaEsencial } from "@/lib/abstraccion"

function Esencial({ ronda, responder, respondida }: { ronda: RondaEsencial; responder: (ok: boolean, e: string) => void; respondida: boolean }) {
  const [marcados, setMarcados] = useState<string[]>([])
  const alternar = (d: string) => setMarcados((m) => (m.includes(d) ? m.filter((x) => x !== d) : [...m, d]))

  return (
    <div className="space-y-4">
      <p className="text-center">
        Pregunta: <strong className="text-lg">{ronda.pregunta}</strong>
      </p>
      <fieldset className="space-y-2">
        <legend className="mb-2 text-center text-sm text-muted-foreground">Marca solo los datos que necesitas para responderla.</legend>
        {ronda.datos.map((d) => (
          <label key={d} className="flex min-h-11 cursor-pointer items-center gap-3 rounded-lg border-2 border-blue-700/30 bg-secondary p-3 has-[:checked]:border-blue-400 has-[:checked]:bg-blue-500/10">
            <input type="checkbox" className="h-5 w-5 shrink-0 accent-blue-500" checked={marcados.includes(d)} disabled={respondida} onChange={() => alternar(d)} />
            <span>{d}</span>
          </label>
        ))}
      </fieldset>
      <div className="flex justify-center">
        <Button
          type="button"
          className="min-h-11"
          disabled={respondida || marcados.length === 0}
          onClick={() => {
            const r = revisarEsencial(ronda, marcados)
            responder(r.correcto, r.explicacion)
          }}
        >
          Comprobar
        </Button>
      </div>
    </div>
  )
}

export default function LoEsencial(props: PropsActividad) {
  const usados = useRef(new Set<string>())
  return (
    <RondasJuego<RondaEsencial>
      {...props}
      titulo="Quédate con lo esencial"
      instruccion="Un problema trae datos que importan y otros que son solo relleno. Abstraer es quedarse con los que cambian la respuesta."
      generar={() => generarEsencial({ usados: usados.current })}
      pistas={pistasEsencial}
      render={(r, c) => <Esencial ronda={r} responder={c.responder} respondida={c.respondida} />}
    />
  )
}

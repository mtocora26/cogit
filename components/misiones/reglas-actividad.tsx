"use client"

import { Glyph } from "@/components/misiones/glyph"
import { cn } from "@/lib/utils"
import type { ActividadCatalogo } from "@/lib/misiones-catalogo"

/** Reglas y ejemplo resuelto de una actividad. Es solo lectura: no toca rondas, vidas ni progreso. */
export default function ReglasActividad({ actividad }: { actividad: ActividadCatalogo }) {
  const { reglas, ejemplo } = actividad
  return (
    <div className="space-y-5 text-left">
      <section aria-labelledby="reglas-titulo">
        <h3 id="reglas-titulo" className="mb-2 font-semibold">Cómo se juega</h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
          {reglas.map((r) => (
            <li key={r}>{r}</li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="ejemplo-titulo" className="rounded-lg border border-border p-4">
        <h3 id="ejemplo-titulo" className="mb-3 font-semibold">Ejemplo resuelto</h3>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Secuencia de ejemplo">
          {ejemplo.secuencia.map((t, i) => (
            <span
              key={i}
              className={cn(
                "grid h-10 w-10 place-items-center rounded-md border",
                t === "❔" ? "border-dashed border-muted-foreground" : "border-border",
                ejemplo.resaltar === i && "ring-2 ring-primary",
              )}
            >
              {t === "❔" ? <span aria-label="hueco" className="text-muted-foreground">?</span> : <Glyph token={t} className="h-7 w-7" />}
            </span>
          ))}
        </div>
        <p className="mt-3 flex flex-wrap items-center gap-2 text-sm">
          <span className="font-medium">Respuesta:</span>
          {ejemplo.respuesta.map((t, i) => (
            <Glyph key={i} token={t} className="h-6 w-6" />
          ))}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">{ejemplo.explicacion}</p>
      </section>
    </div>
  )
}

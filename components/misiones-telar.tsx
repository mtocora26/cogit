"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight } from "lucide-react"
import { NIVELES, SECCION, minutosNivel } from "@/lib/misiones-catalogo"

/**
 * Los niveles de la sección como una columna de tarjetas perforadas unidas por un hilo.
 * El avance sale de /api/progreso (actividades guardadas por nivel); si no se puede leer, no se afirma nada.
 */
const CELLS = 10

/** Enlace si el nivel está disponible; si no, una tarjeta sin acción. */
const TARJETA = "grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center sm:p-6"
function Tarjeta({ href, children }: { href: string | null; children: React.ReactNode }) {
  if (!href) return <div className={`${TARJETA} opacity-80`}>{children}</div>
  return (
    <Link
      href={href}
      className={`group ${TARJETA} transition-[border-color,transform] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-neuron/60`}
    >
      {children}
    </Link>
  )
}

const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`

export default function MisionesTelar() {
  const [done, setDone] = useState<Record<string, number> | null>(null)

  useEffect(() => {
    let cancel = false
    try {
      const userId = localStorage.getItem("userId") || JSON.parse(localStorage.getItem("usuario") || "{}").id
      if (!userId) return
      fetch(`/api/progreso?userId=${userId}`)
        .then((r) => (r.ok ? r.json() : Promise.reject()))
        .then((rows: { seccion: string; nivel: string; completado: boolean }[]) => {
          if (cancel || !Array.isArray(rows)) return
          const acc: Record<string, number> = {}
          for (const row of rows) if (row.completado && String(row.seccion) === SECCION.id) acc[String(row.nivel)] = (acc[String(row.nivel)] ?? 0) + 1
          setDone(acc)
        })
        .catch(() => {})
    } catch {
      /* sin sesión legible: se muestran los niveles sin avance */
    }
    return () => {
      cancel = true
    }
  }, [])

  return (
    <section aria-labelledby="seccion-titulo">
      <div className="mb-6 flex flex-wrap items-baseline gap-x-3">
        <h2 id="seccion-titulo" className="font-display text-2xl font-semibold">
          {SECCION.title}
        </h2>
        <span className="text-muted-foreground">{SECCION.subtitle}</span>
      </div>

      <ol className="relative flex flex-col gap-4 pl-8 sm:pl-12">
        {NIVELES.map((n, i) => {
          const count = done?.[n.id] ?? 0
          const started = count > 0
          // Solo el primer nivel sin completar es la acción principal; los demás quedan en segundo plano.
          const disponible = n.actividades.length > 0
          const primero = disponible && (NIVELES.findIndex((x) => x.actividades.length > 0 && !(done?.[x.id])) === i || (done === null && i === 0))
          return (
            <li key={n.id} className="relative">
              {i < NIVELES.length - 1 && (
                <span
                  aria-hidden
                  className="absolute -left-[1.3125rem] top-10 h-[calc(100%+1rem)] w-0.5 sm:-left-[2.0625rem] sm:top-11"
                  style={{ background: `linear-gradient(180deg, ${thread(i / (NIVELES.length - 1))}, ${thread((i + 1) / (NIVELES.length - 1))})` }}
                />
              )}
              <span
                aria-hidden
                className={`absolute -left-8 top-7 grid h-6 w-6 place-items-center rounded-[4px] border-2 text-xs font-bold sm:-left-12 sm:h-8 sm:w-8 sm:text-sm ${
                  started ? "border-transparent text-[#0B0E1C]" : "border-border bg-background text-muted-foreground"
                }`}
                style={started ? { background: thread(i / (NIVELES.length - 1)) } : undefined}
              >
                {n.id}
              </span>
              <Tarjeta href={disponible ? `/misiones/${SECCION.id}/${n.id}` : null}>
                <div>
                  <h3 className="font-display text-xl font-semibold">{n.title}</h3>
                  <p className="mt-1 max-w-xl text-muted-foreground">{n.text}</p>
                  <p className="mt-2 max-w-xl text-sm">
                    <span className="font-medium">Objetivo:</span> {n.objetivo}
                  </p>
                  {disponible && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      ≈ {minutosNivel(n)} min · {n.actividades.length} actividades
                    </p>
                  )}
                  <div aria-hidden className="mt-4 flex max-w-sm gap-1.5">
                    {Array.from({ length: CELLS }, (_, k) => (
                      <span
                        key={k}
                        className="h-2.5 flex-1 rounded-[2px]"
                        style={{ background: k < count ? thread(k / (CELLS - 1)) : "hsl(var(--accent))" }}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {!disponible
                      ? "Aún sin actividades"
                      : started
                        ? `${count} ${count === 1 ? "actividad completada" : "actividades completadas"}`
                        : i === 0
                          ? "Aquí empiezas"
                          : "Sin empezar"}
                  </p>
                </div>
                {disponible ? (
                  <span
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md px-5 font-medium ${
                      primero ? "bg-primary text-primary-foreground" : "border border-border text-foreground"
                    }`}
                  >
                    {started ? "Continuar" : "Empezar"}
                    <ArrowRight aria-hidden className="h-4 w-4 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
                  </span>
                ) : (
                  <span className="inline-flex min-h-11 items-center rounded-md border border-dashed border-border px-5 font-medium text-muted-foreground">
                    Próximamente
                  </span>
                )}
              </Tarjeta>
            </li>
          )
        })}
      </ol>
    </section>
  )
}

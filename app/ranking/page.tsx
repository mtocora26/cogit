"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import NavBar from "@/components/nav-bar"

interface Fila {
  id: number
  name: string
  points: number
  rank: number
}
type Periodo = "weekly" | "alltime"

const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`
const PERIODOS: { id: Periodo; label: string }[] = [
  { id: "weekly", label: "Esta semana" },
  { id: "alltime", label: "Histórico" },
]

export default function RankingPage() {
  const [periodo, setPeriodo] = useState<Periodo>("weekly")
  const [datos, setDatos] = useState<Partial<Record<Periodo, Fila[]>>>({})
  const [error, setError] = useState("")
  const [miId, setMiId] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/usuario/me").then((r) => (r.ok ? r.json() : null)).then((u) => setMiId(u?.id ?? null)).catch(() => {})
  }, [])

  useEffect(() => {
    if (datos[periodo]) return
    setError("")
    fetch(`/api/ranking?type=${periodo}`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows: Fila[]) => setDatos((d) => ({ ...d, [periodo]: rows })))
      .catch(() => setError("No pudimos cargar el ranking. Inténtalo de nuevo en un momento."))
  }, [periodo, datos])

  const filas = datos[periodo]
  const max = Math.max(1, ...(filas ?? []).map((f) => f.points))
  const mio = filas?.find((f) => f.id === miId)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="ranking" />
      <main className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Ranking</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Se ordena por puntaje y solo muestra alias. Si prefieres no aparecer, puedes excluirte desde{" "}
          <Link href="/perfil" className="text-neuron underline underline-offset-4">tu perfil</Link>.
        </p>

        <div role="tablist" aria-label="Periodo del ranking" className="mt-8 inline-flex rounded-lg border border-border bg-card p-1">
          {PERIODOS.map((p) => (
            <button
              key={p.id}
              role="tab"
              aria-selected={periodo === p.id}
              onClick={() => setPeriodo(p.id)}
              className={`min-h-11 rounded-md px-5 text-sm font-medium transition-colors duration-150 ${
                periodo === p.id ? "bg-neuron/15 text-neuron" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-4 min-h-6 text-sm">
          {error && <p role="alert" className="text-destructive">{error}</p>}
          {!error && filas && mio && (
            <p className="text-neuron">Vas en la posición {mio.rank} con {mio.points} puntos.</p>
          )}
          {!error && filas && miId && !mio && filas.length > 0 && (
            <p className="text-muted-foreground">Todavía no apareces en esta lista. Completa una actividad para sumar puntos.</p>
          )}
        </div>

        <div className="mt-2 overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[28rem] text-left">
            <thead className="border-b border-border text-sm text-muted-foreground">
              <tr>
                <th scope="col" className="w-20 px-5 py-3 font-medium">Puesto</th>
                <th scope="col" className="px-5 py-3 font-medium">Alias</th>
                <th scope="col" className="px-5 py-3 font-medium">Puntos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {!filas && !error && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">Cargando ranking…</td></tr>
              )}
              {filas?.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-5 py-10 text-center text-muted-foreground">
                    Aún no hay puntajes {periodo === "weekly" ? "esta semana" : "registrados"}. Completa una actividad para abrir la lista.
                  </td>
                </tr>
              )}
              {filas?.map((f) => {
                const yo = f.id === miId
                return (
                  <tr key={f.id} className={yo ? "bg-neuron/10" : undefined}>
                    <td className="px-5 py-3 font-display text-lg font-semibold tabular-nums">{f.rank}</td>
                    <td className="px-5 py-3 font-medium">
                      {f.name}
                      {yo && <span className="ml-2 text-xs font-normal text-neuron">(tú)</span>}
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <span className="w-14 tabular-nums">{f.points}</span>
                        <span aria-hidden className="hidden h-2.5 w-full max-w-40 rounded-[2px] bg-accent sm:block">
                          <span className="block h-full rounded-[2px]" style={{ width: `${(f.points / max) * 100}%`, background: thread(f.rank <= 3 ? 0.1 : 0.8) }} />
                        </span>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

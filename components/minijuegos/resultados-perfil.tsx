"use client"

import { useEffect, useState } from "react"
import { formatTime } from "@/lib/utils"
import { getLevels as nivelesRobot } from "@/lib/robot-programmer"
import { getNonogramLevels } from "@/lib/nonogram"
import { cargarResultados, type ResultadoMinijuego } from "@/lib/resultados-cuenta"
import { JUEGOS, type Juego } from "@/lib/minijuegos-puntos"

const NOMBRE_JUEGO: Record<Juego, string> = { sudoku: "Sudoku", nonogramas: "Nonogramas", robot: "Robot Programmer" }
const NOMBRE_SUDOKU: Record<string, string> = { facil: "Fácil", medio: "Medio", dificil: "Difícil" }

function nombreNivel(r: ResultadoMinijuego): string {
  if (r.juego === "sudoku") return NOMBRE_SUDOKU[r.actividad] ?? r.actividad
  const lista = r.juego === "robot" ? nivelesRobot() : getNonogramLevels()
  return lista.find((l) => String(l.id) === r.actividad)?.name ?? `Nivel ${r.actividad}`
}

/** REQ-007: resultados de minijuegos de la cuenta (nivel, tiempo y puntos). */
export default function ResultadosPerfil() {
  const [resultados, setResultados] = useState<ResultadoMinijuego[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    cargarResultados().then(setResultados).catch(() => setError(true))
  }, [])

  const total = resultados?.reduce((a, r) => a + r.score, 0) ?? 0

  return (
    <section aria-labelledby="resultados" className="rounded-xl border border-border bg-card p-5">
      <h2 id="resultados" className="font-display text-xl font-semibold">Tus resultados en minijuegos</h2>
      {error && <p role="alert" className="mt-3 text-sm text-destructive">No pudimos cargar tus resultados. Inténtalo más tarde.</p>}
      {!error && !resultados && <p className="mt-3 text-sm text-muted-foreground">Cargando…</p>}
      {resultados && resultados.length === 0 && (
        <p className="mt-3 text-sm text-muted-foreground">Aún no has completado niveles de minijuegos.</p>
      )}
      {resultados && resultados.length > 0 && (
        <>
          <p className="mt-2 text-sm text-muted-foreground">
            {resultados.length} {resultados.length === 1 ? "nivel completado" : "niveles completados"} · {total} puntos en minijuegos
          </p>
          <div className="mt-4 space-y-4">
            {JUEGOS.map((j) => {
              const filas = resultados.filter((r) => r.juego === j)
              if (!filas.length) return null
              return (
                <div key={j}>
                  <h3 className="font-medium">{NOMBRE_JUEGO[j]}</h3>
                  <ul className="mt-1 divide-y divide-border text-sm">
                    {filas.map((r) => (
                      <li key={r.actividad} className="flex flex-wrap items-baseline justify-between gap-2 py-2">
                        <span>{nombreNivel(r)}</span>
                        <span className="text-muted-foreground">
                          Mejor tiempo {formatTime(r.tiempo)} · {r.score} pts
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </>
      )}
    </section>
  )
}

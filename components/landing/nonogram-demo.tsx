"use client"

import Link from "next/link"
import { useRef, useState } from "react"
import { RotateCcw, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

/** Solución del nivel de demostración: un rayo. */
const SOLUTION = [
  [0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 1, 0],
  [0, 1, 1, 0, 0],
]
const SIZE = SOLUTION.length

type Cell = 0 | 1 | 2 // vacía | rellena | marcada
type Mode = "fill" | "mark"

function runs(line: number[]): number[] {
  const out: number[] = []
  let n = 0
  for (const v of line) {
    if (v === 1) n++
    else if (n) {
      out.push(n)
      n = 0
    }
  }
  if (n) out.push(n)
  return out.length ? out : [0]
}

const column = (grid: number[][], c: number) => grid.map((row) => row[c])
const ROW_CLUES = SOLUTION.map((row) => runs(row))
const COL_CLUES = SOLUTION[0].map((_, c) => runs(column(SOLUTION, c)))
const same = (a: number[], b: number[]) => a.length === b.length && a.every((v, i) => v === b[i])

const STATE_LABEL: Record<Cell, string> = { 0: "vacía", 1: "rellena", 2: "marcada como vacía" }

export default function NonogramDemo() {
  const [cells, setCells] = useState<Cell[]>(() => Array(SIZE * SIZE).fill(0))
  const [mode, setMode] = useState<Mode>("fill")
  const refs = useRef<(HTMLButtonElement | null)[]>([])

  const asGrid = (c: Cell[]) =>
    Array.from({ length: SIZE }, (_, r) => Array.from({ length: SIZE }, (_, k) => (c[r * SIZE + k] === 1 ? 1 : 0)))
  const grid = asGrid(cells)
  const solved = grid.every((row, r) => row.every((v, c) => v === SOLUTION[r][c]))
  const rowDone = ROW_CLUES.map((clue, r) => same(runs(grid[r]), clue))
  const colDone = COL_CLUES.map((clue, c) => same(runs(column(grid, c)), clue))

  const apply = (i: number, as: Mode) => {
    if (solved) return
    setCells((prev) => {
      const next = [...prev]
      const cur = prev[i]
      if (as === "fill") next[i] = cur === 1 ? 0 : 1
      else next[i] = cur === 2 ? 0 : 2
      return next
    })
  }

  const move = (i: number, e: React.KeyboardEvent) => {
    const r = Math.floor(i / SIZE)
    const c = i % SIZE
    const target: Record<string, [number, number]> = {
      ArrowUp: [r - 1, c],
      ArrowDown: [r + 1, c],
      ArrowLeft: [r, c - 1],
      ArrowRight: [r, c + 1],
    }
    if (e.key in target) {
      const [nr, nc] = target[e.key]
      if (nr >= 0 && nr < SIZE && nc >= 0 && nc < SIZE) {
        e.preventDefault()
        refs.current[nr * SIZE + nc]?.focus()
      }
    } else if (e.key === "x" || e.key === "X") {
      e.preventDefault()
      apply(i, "mark")
    }
  }

  const reset = () => {
    setCells(Array(SIZE * SIZE).fill(0))
    refs.current[0]?.focus()
  }

  return (
    <div
      className={`bg-card bg-circuit rounded-xl border p-4 transition-colors duration-300 ease-out-strong sm:p-6 ${
        solved ? "border-signal/60" : "border-border"
      }`}
    >
      <div>
        <div className="mb-4 flex items-baseline justify-between gap-3">
          <h2 className="font-display text-xl sm:text-2xl">
            Nivel <span className="font-sans font-bold">1</span> · Nonograma <span className="font-sans font-bold">5×5</span>
          </h2>
          <span className="shrink-0 text-xs text-muted-foreground">Demostración</span>
        </div>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground sm:mb-5">
          Cada número dice cuántas celdas seguidas van rellenas en esa fila o columna. Cuando una pista se cumple, se
          tacha.
        </p>

        <div
          role="group"
          aria-label="Tablero del nonograma"
          className="mx-auto grid w-fit gap-1"
          style={
            {
              "--cell": "clamp(2.75rem, calc((100vw - 8.5rem) / 6.4), 4.25rem)",
              gridTemplateColumns: `auto repeat(${SIZE}, var(--cell))`,
            } as React.CSSProperties
          }
        >
          <div aria-hidden />
          {COL_CLUES.map((clue, c) => (
            <div
              key={c}
              className={`flex flex-col items-center justify-end pb-1 font-sans text-base font-bold leading-tight tabular-nums transition-opacity duration-200 ${
                colDone[c] ? "line-through opacity-50" : ""
              }`}
            >
              <span className="sr-only">Columna {c + 1}: </span>
              {clue.map((n, k) => (
                <span key={k}>{n}</span>
              ))}
            </div>
          ))}

          {Array.from({ length: SIZE }, (_, r) => (
            <div key={r} className="contents">
              <div
                className={`flex items-center justify-end gap-1.5 pr-2 font-sans text-base font-bold tabular-nums transition-opacity duration-200 ${
                  rowDone[r] ? "line-through opacity-50" : ""
                }`}
              >
                <span className="sr-only">Fila {r + 1}: </span>
                {ROW_CLUES[r].map((n, k) => (
                  <span key={k}>{n}</span>
                ))}
              </div>
              {Array.from({ length: SIZE }, (_, c) => {
                const i = r * SIZE + c
                const v = cells[i]
                return (
                  <button
                    key={c}
                    ref={(el) => {
                      refs.current[i] = el
                    }}
                    type="button"
                    aria-label={`Fila ${r + 1}, columna ${c + 1}: ${STATE_LABEL[v]}`}
                    onClick={() => apply(i, mode)}
                    onContextMenu={(e) => {
                      e.preventDefault()
                      apply(i, "mark")
                    }}
                    onKeyDown={(e) => move(i, e)}
                    style={solved && v === 1 ? { transitionDelay: `${(r + c) * 60}ms` } : undefined}
                    className={`relative grid h-[var(--cell)] touch-manipulation place-items-center rounded-[3px] border transition-[background-color,border-color,box-shadow,transform] duration-150 ease-out-strong active:scale-[0.94] motion-reduce:transition-colors ${
                      v === 1
                        ? solved
                          ? "border-signal bg-signal shadow-[0_2px_10px_hsl(var(--signal)/0.45)]"
                          : "border-neuron bg-neuron"
                        : "border-border bg-background [@media(hover:hover)]:hover:border-signal/70"
                    } ${solved ? "cursor-default" : ""}`}
                  >
                    {v === 2 && <X aria-hidden className="h-5 w-5 text-muted-foreground" strokeWidth={2.5} />}
                  </button>
                )
              })}
            </div>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <div role="radiogroup" aria-label="Qué hace al tocar una celda" className="inline-flex rounded-md border border-border p-0.5">
            {(
              [
                ["fill", "Rellenar"],
                ["mark", "Marcar"],
              ] as const
            ).map(([m, label]) => (
              <button
                key={m}
                type="button"
                role="radio"
                aria-checked={mode === m}
                onClick={() => setMode(m)}
                className={`inline-flex min-h-11 items-center gap-1.5 rounded px-4 text-sm font-medium transition-colors duration-150 ${
                  mode === m ? "bg-secondary text-foreground" : "text-muted-foreground"
                }`}
              >
                {m === "mark" && <X aria-hidden className="h-4 w-4" />}
                {label}
              </button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={reset}
            className="min-h-11 gap-1.5 text-muted-foreground transition-[background-color,color,transform] duration-150 active:scale-[0.97]"
          >
            <RotateCcw aria-hidden />
            Reiniciar
          </Button>
        </div>

        <div role="status" aria-live="polite" className="mt-4 min-h-[3.5rem]">
          {solved ? (
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-2 font-display text-lg text-signal">
                <Check aria-hidden className="h-5 w-5" strokeWidth={3} />
                Nivel 1 completado
              </p>
              <Button
                asChild
                className="min-h-11 transition-[background-color,transform] duration-150 active:scale-[0.97]"
              >
                <Link href="/registro">Crear cuenta y guardar mi avance</Link>
              </Button>
            </div>
          ) : (
            <p className="text-sm leading-snug text-muted-foreground">
              Teclado: flechas para moverte, Enter para usar la celda, X para marcarla. En computador, clic derecho
              también marca.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { RefreshCw } from "lucide-react"

/**
 * El telar: una banda de tarjetas perforadas arriba y la tela que se teje debajo.
 * Cada perforación de la banda decide una celda de hilo; cambiar una perforación cambia la tela.
 * Es una demostración del mecanismo (instrucciones -> resultado), no datos del producto.
 * Teclado: las perforaciones son una cuadrícula con una sola parada de tabulación; flechas para
 * moverse, Enter o Espacio para perforar.
 */
const PUNCH_ROWS = 6
const CELL = 30
const WEAVE_H = 26

function basePattern(cols: number, shift: number): boolean[][] {
  return Array.from({ length: PUNCH_ROWS }, (_, r) =>
    Array.from({ length: cols }, (_, c0) => {
      const c = Math.min(c0, cols - 1 - c0) + shift
      return (c + r * 2) % 8 < 3 || ((c * 3 + r) % 7 === 0 && r % 2 === 0)
    }),
  )
}

function useColumns() {
  const [cols, setCols] = useState(48)
  useEffect(() => {
    const set = () => setCols(window.innerWidth >= 1024 ? 48 : window.innerWidth >= 640 ? 28 : 12)
    set()
    window.addEventListener("resize", set)
    return () => window.removeEventListener("resize", set)
  }, [])
  return cols
}

const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`

export default function Loom() {
  const cols = useColumns()
  const compacto = cols <= 12
  const punchH = compacto ? 28 : 22
  const weaveRows = compacto ? 6 : 8
  const [shift, setShift] = useState(0)
  const [edits, setEdits] = useState<Record<string, boolean>>({})
  const [weaveKey, setWeaveKey] = useState(0)
  const [focus, setFocus] = useState({ r: 0, c: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const pattern = useMemo(() => {
    const p = basePattern(cols, shift)
    for (const [k, v] of Object.entries(edits)) {
      const [r, c] = k.split("-").map(Number)
      if (r < PUNCH_ROWS && c < cols) p[r][c] = v
    }
    return p
  }, [cols, shift, edits])

  const toggle = (r: number, c: number) => setEdits((e) => ({ ...e, [`${r}-${c}`]: !pattern[r][c] }))
  const another = () => {
    setEdits({})
    setShift((s) => (s + 1) % 8)
    setWeaveKey((k) => k + 1)
  }

  const move = (r: number, c: number) => {
    const next = { r: Math.max(0, Math.min(PUNCH_ROWS - 1, r)), c: Math.max(0, Math.min(cols - 1, c)) }
    setFocus(next)
    requestAnimationFrame(() => svgRef.current?.querySelector<SVGElement>(`[data-pos="${next.r}-${next.c}"]`)?.focus())
  }
  const onKey = (e: React.KeyboardEvent, r: number, c: number) => {
    const keys: Record<string, [number, number]> = { ArrowUp: [-1, 0], ArrowDown: [1, 0], ArrowLeft: [0, -1], ArrowRight: [0, 1] }
    if (keys[e.key]) {
      e.preventDefault()
      move(r + keys[e.key][0], c + keys[e.key][1])
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle(r, c)
    }
  }

  const w = cols * CELL
  const stripH = PUNCH_ROWS * punchH + 28
  return (
    <div>
      {/* Tarjetas perforadas */}
      <svg
        ref={svgRef}
        viewBox={`0 0 ${w} ${stripH}`}
        className="block w-full select-none bg-[hsl(var(--punch))]"
        role="group"
        aria-label="Tarjetas perforadas. Cada perforación decide una celda de la tela de abajo. Usa las flechas para moverte y Enter para perforar."
      >
        {pattern.map((row, r) =>
          row.map((on, c) => (
            <g
              key={`${r}-${c}`}
              role="button"
              aria-pressed={on}
              aria-label={`Fila ${r + 1}, columna ${c + 1}: ${on ? "perforada" : "sin perforar"}`}
              tabIndex={focus.r === r && focus.c === c ? 0 : -1}
              data-pos={`${r}-${c}`}
              onClick={() => {
                setFocus({ r, c })
                toggle(r, c)
              }}
              onKeyDown={(e) => onKey(e, r, c)}
              className="cursor-pointer outline-none [&:focus-visible>rect:last-child]:stroke-[hsl(277_100%_45%)] [&:focus-visible>rect:last-child]:stroke-[3]"
            >
              <rect x={c * CELL} y={14 + r * punchH} width={CELL} height={punchH} fill="transparent" />
              <rect
                x={c * CELL + 7}
                y={14 + r * punchH + (punchH - (compacto ? 14 : 12)) / 2}
                width={CELL - 14}
                height={compacto ? 14 : 12}
                rx={2}
                fill={on ? "#0B0E1C" : "hsl(245 55% 84%)"}
                stroke="transparent"
                className="transition-[fill] duration-150"
              />
            </g>
          )),
        )}
        {Array.from({ length: Math.floor(cols / 8) }, (_, i) => (
          <rect key={i} x={(i + 1) * 8 * CELL - 1} y={0} width={2} height={stripH} fill="hsl(245 100% 75% / 0.5)" pointerEvents="none" />
        ))}
      </svg>

      {/* Tela */}
      <svg viewBox={`0 0 ${w} ${weaveRows * WEAVE_H + 8}`} aria-hidden className="block w-full" key={weaveKey}>
        {Array.from({ length: weaveRows }, (_, r) => {
          const src = pattern[r % PUNCH_ROWS]
          return (
            <g key={r} className="loom-row" style={{ animationDelay: `${r * 70}ms` }}>
              {src.map((on, c) => (
                <rect
                  key={c}
                  x={c * CELL + 1}
                  y={4 + r * WEAVE_H + 1}
                  width={CELL - 2}
                  height={WEAVE_H - 2}
                  rx={4}
                  style={{ fill: on ? thread(r / (weaveRows - 1)) : "hsl(var(--accent))" }}
                />
              ))}
            </g>
          )
        })}
      </svg>

      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <p className="text-sm text-muted-foreground">Toca una perforación y mira cómo cambia la tela.</p>
        <button
          type="button"
          onClick={another}
          className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm font-medium text-neuron transition-[background-color,transform] duration-150 ease-out-strong hover:bg-accent active:scale-[0.97]"
        >
          <RefreshCw aria-hidden className="h-4 w-4" />
          Tejer otro patrón
        </button>
      </div>
    </div>
  )
}

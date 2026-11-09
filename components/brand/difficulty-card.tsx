import type React from "react"
import { Button } from "@/components/ui/button"

const thread = (t: number) => `hsl(${Math.round(186 + 91 * t)} 100% calc(var(--tl0) - var(--tld) * ${t}))`

/** Dificultad como una fila de celdas de hilo: más celdas encendidas, más difícil. */
export function DifficultyCells({ level, of = 3 }: { level: number; of?: number }) {
  return (
    <span role="img" aria-label={`Dificultad ${level} de ${of}`} className="flex gap-1">
      {Array.from({ length: of }, (_, i) => (
        <span
          key={i}
          className="h-3 w-6 rounded-[3px]"
          style={{ background: i < level ? thread(i / Math.max(1, of - 1)) : "hsl(var(--accent))" }}
        />
      ))}
    </span>
  )
}

interface DifficultyCardProps {
  title: string
  description: string
  level: number
  facts: string[]
  bestTime?: string
  cta: string
  onStart: () => void
  preview?: React.ReactNode
}

export function DifficultyCard({ title, description, level, facts, bestTime, cta, onStart, preview }: DifficultyCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,transform] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-neuron/60">
      {preview && <div aria-hidden className="grid h-36 place-items-center bg-loom bg-muted/40">{preview}</div>}
      <div className="flex flex-1 flex-col p-6">
        <DifficultyCells level={level} />
        <h3 className="mt-4 font-display text-2xl font-semibold">{title}</h3>
        <p className="mb-4 mt-2 text-sm text-muted-foreground">{description}</p>
        <ul className="mb-6 space-y-2 text-sm text-muted-foreground">
          {facts.map((f) => (
            <li key={f} className="flex items-center gap-2">
              <span aria-hidden className="h-1.5 w-1.5 rounded-[2px] bg-neuron" />
              {f}
            </li>
          ))}
        </ul>
        {bestTime && (
          <div className="mb-4 flex items-center justify-between rounded-md bg-neuron/15 px-3 py-1 text-sm text-neuron">
            <span>Mejor tiempo:</span>
            <span>{bestTime}</span>
          </div>
        )}
        <Button className="mt-auto min-h-11 w-full" onClick={onStart}>
          {cta}
        </Button>
      </div>
    </div>
  )
}

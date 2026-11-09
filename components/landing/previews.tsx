import { ArrowRight, ArrowUp, Bot, Flag } from "lucide-react"

/** Vistas previas dibujadas de los juegos reales. Son decorativas: el texto de cada tarjeta dice lo mismo. */

const SUDOKU = [
  "534678912",
  "672195348",
  "198342567",
  "859761423",
  "426853791",
  "713924856",
  "961537284",
  "287419635",
  "345286179",
]

export function SudokuPreview() {
  return (
    <div aria-hidden className="grid w-full max-w-[19rem] grid-cols-9 border-2 border-neuron/60">
      {SUDOKU.flatMap((row, r) =>
        row.split("").map((digit, c) => {
          const live = r === 4 && c === 4
          const given = !live && GIVEN[r][c] === "x"
          return (
            <div
              key={`${r}-${c}`}
              className={`grid aspect-square place-items-center font-sans text-xs font-bold leading-none sm:text-sm ${
                c % 3 === 0 && c !== 0 ? "border-l-2 border-l-neuron/60" : "border-l border-l-border"
              } ${r % 3 === 0 && r !== 0 ? "border-t-2 border-t-neuron/60" : "border-t border-t-border"} ${
                live ? "bg-neuron/25 outline outline-1 -outline-offset-1 outline-neuron" : ""
              } ${c === 0 ? "border-l-0" : ""} ${r === 0 ? "border-t-0" : ""}`}
            >
              {given ? <span className="text-neuron">{digit}</span> : null}
            </div>
          )
        }),
      )}
    </div>
  )
}

/** Casillas que se muestran como dadas (x). La casilla activa (4,4) queda siempre vacía. */
const GIVEN = [
  "x..x.x..x",
  ".xx..x.x.",
  "x..xx..x.",
  "..x.x.x..",
  "x.x..x.x.",
  ".x..x.x.x",
  "x...xx..x",
  ".x.x..xx.",
  "x..x.x..x",
]

const PATH = new Set(["4-0", "4-1", "4-2", "3-2", "2-2", "2-3", "2-4"])

export function RobotPreview() {
  return (
    <div aria-hidden className="flex flex-col gap-4">
      <div className="grid w-full max-w-[15rem] grid-cols-5 gap-1">
        {Array.from({ length: 25 }, (_, i) => {
          const r = Math.floor(i / 5)
          const c = i % 5
          const key = `${r}-${c}`
          const onPath = PATH.has(key)
          return (
            <div
              key={key}
              className={`grid aspect-square place-items-center rounded-[3px] border ${
                onPath ? "border-neuron/50 bg-neuron/15" : "border-border bg-background"
              }`}
            >
              {key === "4-0" && <Bot className="h-5 w-5 text-foreground" />}
              {key === "2-4" && <Flag className="h-5 w-5 text-signal" />}
            </div>
          )
        })}
      </div>
      <div className="flex gap-1.5">
        {[ArrowRight, ArrowRight, ArrowUp, ArrowUp, ArrowRight, ArrowRight].map((Icon, i) => (
          <span key={i} className="grid h-8 w-8 place-items-center rounded-[3px] border border-border bg-secondary">
            <Icon className="h-4 w-4 text-foreground" />
          </span>
        ))}
      </div>
    </div>
  )
}

const STAGES = [
  { title: "Explora tu lógica", subtitle: "Fundamentos" },
  { title: "Reconocimiento de patrones", subtitle: "Nivel 1" },
  { title: "Secuencias y Series", subtitle: "Nivel 2" },
  { title: "Lógica de Secuencias", subtitle: "Nivel 3" },
]

/** El mapa de misiones como circuito: la traza se enciende en cian hasta donde llegas. */
export function MissionTrace() {
  return (
    <ol className="relative flex flex-col gap-6 sm:flex-row sm:gap-0">
      {STAGES.map((s, i) => {
        const lit = i === 0
        return (
          <li key={s.title} className="relative flex gap-4 sm:flex-1 sm:flex-col sm:gap-3">
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                className={`absolute left-[0.6875rem] top-6 h-[calc(100%+0.5rem)] w-0.5 sm:left-6 sm:top-[0.6875rem] sm:h-0.5 sm:w-[calc(100%-1.5rem)] ${
                  lit ? "bg-signal" : "bg-border"
                }`}
              />
            )}
            <span
              aria-hidden
              className={`relative z-10 mt-0.5 h-6 w-6 shrink-0 border-2 bg-card ${
                lit ? "border-signal shadow-[0_2px_10px_hsl(var(--signal)/0.45)]" : "border-border"
              }`}
            />
            <div>
              <p className={`font-display text-lg leading-tight ${lit ? "text-foreground" : "text-foreground/80"}`}>
                {s.title}
              </p>
              <p className="text-sm text-muted-foreground">{lit ? "Aquí empiezas" : s.subtitle}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

/** Nonograma resuelto (el rayo del nivel de demostración), dibujado en celdas. */
export function NonogramPreview() {
  const rows = ["00110", "01100", "11111", "00110", "01100"]
  return (
    <div className="grid w-40 grid-cols-5 gap-1">
      {rows.flatMap((row, r) =>
        row.split("").map((v, c) => (
          <div
            key={`${r}-${c}`}
            className={`aspect-square rounded-[3px] ${v === "1" ? "bg-signal" : "border border-border bg-background"}`}
          />
        )),
      )}
    </div>
  )
}

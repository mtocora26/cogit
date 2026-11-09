import type React from "react"
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUp, ArrowUpLeft, ArrowUpRight, MoveHorizontal } from "lucide-react"

/**
 * Fichas de las actividades de patrones. Cada ficha sigue identificándose internamente con su "token"
 * (el valor que se compara para saber si la respuesta es correcta), pero nunca se muestra como emoji:
 * se dibuja en vectores con los colores de la marca, y su nombre sirve de texto accesible y de explicación.
 */

const COLORES: Record<string, { nombre: string; fill: string }> = {
  "🔴": { nombre: "círculo rojo", fill: "#EF4444" },
  "🟠": { nombre: "círculo naranja", fill: "#F97316" },
  "🟡": { nombre: "círculo amarillo", fill: "#FACC15" },
  "🟢": { nombre: "círculo verde", fill: "#22C55E" },
  "🔵": { nombre: "círculo azul", fill: "#3B82F6" },
  "🟣": { nombre: "círculo violeta", fill: "#A815FF" },
  "⚫": { nombre: "círculo negro", fill: "#0B0E1C" },
  "⚪": { nombre: "círculo blanco", fill: "#FFFFFF" },
  "🟤": { nombre: "círculo marrón", fill: "#92400E" },
}

const CUADRADOS: Record<string, { nombre: string; fill: string }> = {
  "🟦": { nombre: "cuadrado azul", fill: "#3B82F6" },
  "🟩": { nombre: "cuadrado verde", fill: "#22C55E" },
  "🟥": { nombre: "cuadrado rojo", fill: "#EF4444" },
}

const FORMAS: Record<string, { nombre: string; el: (c: string) => React.ReactNode }> = {
  "⭐": { nombre: "estrella", el: (c) => <polygon fill={c} points="12,2.5 14.9,8.7 21.5,9.5 16.6,14.1 17.9,20.7 12,17.4 6.1,20.7 7.4,14.1 2.5,9.5 9.1,8.7" /> },
  "🔶": { nombre: "rombo relleno", el: (c) => <polygon fill={c} points="12,2 22,12 12,22 2,12" /> },
  "🔷": { nombre: "rombo vacío", el: (c) => <polygon fill="none" stroke={c} strokeWidth="2.5" points="12,3.5 20.5,12 12,20.5 3.5,12" /> },
  "⬛": { nombre: "cuadrado relleno", el: (c) => <rect fill={c} x="3.5" y="3.5" width="17" height="17" rx="2" /> },
  "⬜": { nombre: "cuadrado vacío", el: (c) => <rect fill="none" stroke={c} strokeWidth="2.5" x="4.5" y="4.5" width="15" height="15" rx="2" /> },
  "🔺": { nombre: "triángulo hacia arriba", el: (c) => <polygon fill={c} points="12,3 22,20 2,20" /> },
  "🔻": { nombre: "triángulo hacia abajo", el: (c) => <polygon fill={c} points="2,4 22,4 12,21" /> },
  "⭕": { nombre: "anillo", el: (c) => <circle fill="none" stroke={c} strokeWidth="2.5" cx="12" cy="12" r="8.5" /> },
  "🔘": {
    nombre: "anillo con punto",
    el: (c) => (
      <>
        <circle fill="none" stroke={c} strokeWidth="2.5" cx="12" cy="12" r="8.5" />
        <circle fill={c} cx="12" cy="12" r="3.5" />
      </>
    ),
  },
}

const FLECHAS: Record<string, { nombre: string; Icon: React.ComponentType<{ className?: string; "aria-hidden"?: boolean }> }> = {
  "⬆️": { nombre: "flecha arriba", Icon: ArrowUp },
  "➡️": { nombre: "flecha derecha", Icon: ArrowRight },
  "⬇️": { nombre: "flecha abajo", Icon: ArrowDown },
  "⬅️": { nombre: "flecha izquierda", Icon: ArrowLeft },
  "↗️": { nombre: "flecha arriba a la derecha", Icon: ArrowUpRight },
  "↘️": { nombre: "flecha abajo a la derecha", Icon: ArrowDownRight },
  "↙️": { nombre: "flecha abajo a la izquierda", Icon: ArrowDownLeft },
  "↖️": { nombre: "flecha arriba a la izquierda", Icon: ArrowUpLeft },
  "↔️": { nombre: "flecha doble horizontal", Icon: MoveHorizontal },
}

const NUMERO = /^([1-9])️?⃣$/

/** Nombre en español de una ficha: sirve para explicaciones, pistas y lectores de pantalla. */
export function glyphName(token: string): string {
  if (COLORES[token]) return COLORES[token].nombre
  if (CUADRADOS[token]) return CUADRADOS[token].nombre
  if (token === "❔") return "casilla vacía"
  if (FORMAS[token]) return FORMAS[token].nombre
  if (FLECHAS[token]) return FLECHAS[token].nombre
  const n = NUMERO.exec(token)
  if (n) return `número ${n[1]}`
  return token
}

export function Glyph({ token, className = "h-7 w-7" }: { token: string; className?: string }) {
  const label = glyphName(token)

  if (COLORES[token]) {
    const { fill } = COLORES[token]
    return (
      <svg role="img" aria-label={label} viewBox="0 0 24 24" className={className}>
        <circle cx="12" cy="12" r="9.5" fill={fill} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </svg>
    )
  }
  if (CUADRADOS[token]) {
    return (
      <svg role="img" aria-label={label} viewBox="0 0 24 24" className={className}>
        <rect x="3" y="3" width="18" height="18" rx="3" fill={CUADRADOS[token].fill} stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" />
      </svg>
    )
  }
  if (token === "❔") {
    return (
      <span role="img" aria-label={label} className="font-display text-[1.4em] font-bold leading-none text-neuron">
        ?
      </span>
    )
  }
  if (FORMAS[token]) {
    return (
      <svg role="img" aria-label={label} viewBox="0 0 24 24" className={`${className} text-neuron`}>
        {FORMAS[token].el("currentColor")}
      </svg>
    )
  }
  if (FLECHAS[token]) {
    const { Icon } = FLECHAS[token]
    return (
      <span role="img" aria-label={label} className="inline-flex">
        <Icon aria-hidden className={`${className} text-neuron`} />
      </span>
    )
  }
  const n = NUMERO.exec(token)
  if (n) {
    return (
      <span role="img" aria-label={label} className="font-display text-[1.6em] font-bold leading-none text-neuron">
        {n[1]}
      </span>
    )
  }
  return <span>{token}</span>
}

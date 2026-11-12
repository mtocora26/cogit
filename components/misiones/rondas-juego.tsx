"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Pistas from "@/components/misiones/pistas"
import type { EstadoJuego } from "@/lib/patrones"

/**
 * Armazón común de las actividades por rondas de los niveles 2 en adelante: rondas, vidas, puntuación, pistas
 * graduales, explicación tras cada respuesta, repaso de las rondas falladas y foto del estado para retomarla (REQ-006).
 * Cada actividad solo aporta cómo se genera una ronda y cómo se responde; todo lo demás es igual en todas.
 *
 * La puntuación cuenta solo los aciertos de la primera pasada (el repaso no suma), como en el nivel 1.
 */

export interface PropsActividad {
  onComplete: (
    success: boolean,
    time: number,
    score?: number,
    erroresDetalle?: { ronda: number; explicacion: string }[],
    erroresRepetidos?: number[],
  ) => void
  onRondaError?: () => void
  estadoInicial?: EstadoJuego | null
  onEstado?: (estado: EstadoJuego) => void
}

export interface ControlRonda {
  /** Registra la respuesta de la ronda con su explicación. Solo cuenta la primera vez. */
  responder: (correcta: boolean, explicacion: string) => void
  /** Ya se respondió: la ronda queda de solo lectura hasta continuar. */
  respondida: boolean
}

interface Props<R> extends PropsActividad {
  titulo: string
  instruccion: string
  rondas?: number
  vidas?: number
  /** Crea la ronda `n` (1…). Debe ser serializable: las falladas se guardan para el repaso. */
  generar: (n: number) => R
  /** Pistas graduales de la ronda: orientar, acotar y, solo al final, la respuesta. */
  pistas: (r: R) => string[]
  render: (r: R, control: ControlRonda) => ReactNode
}

interface Fallida<R> {
  ronda: R
  explicacion: string
}

export default function RondasJuego<R>({
  titulo,
  instruccion,
  rondas = 5,
  vidas: vidasIniciales = 3,
  generar,
  pistas,
  render,
  onComplete,
  onRondaError,
  estadoInicial,
  onEstado,
}: Props<R>) {
  const ini = (estadoInicial ?? {}) as Record<string, any>
  const [round, setRound] = useState<number>(ini.round ?? 1)
  const [score, setScore] = useState<number>(ini.score ?? 0)
  const [lives, setLives] = useState<number>(ini.lives ?? vidasIniciales)
  const [fallidas, setFallidas] = useState<Fallida<R>[]>(ini.fallidas ?? [])
  const [reviewMode, setReviewMode] = useState<boolean>(ini.reviewMode ?? false)
  const [reviewIndex, setReviewIndex] = useState<number>(ini.reviewIndex ?? 0)
  const [erroresDetalle, setErroresDetalle] = useState<{ ronda: number; explicacion: string }[]>(ini.erroresDetalle ?? [])
  const [erroresRepetidos, setErroresRepetidos] = useState<number[]>(ini.erroresRepetidos ?? [])
  const [actual, setActual] = useState<R | null>(null)
  const [resultado, setResultado] = useState<{ correcta: boolean; explicacion: string } | null>(null)
  const [tiempo, setTiempo] = useState<number>(Number(ini.tiempo) || 0)
  const inicio = useRef<number>(0)
  const montado = useRef(false)

  // La ronda en curso se genera en el cliente (aleatoria); el repaso reusa la ronda fallada guardada.
  useEffect(() => {
    inicio.current = Date.now() - tiempo * 1000
    setActual(reviewMode && fallidas[reviewIndex] ? fallidas[reviewIndex].ronda : generar(round))
    montado.current = true
    const t = setInterval(() => setTiempo(Math.floor((Date.now() - inicio.current) / 1000)), 1000)
    return () => clearInterval(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Foto del estado al cambiar de ronda (no en la primera, para no guardar algo sin avance).
  useEffect(() => {
    if (!montado.current || !onEstado) return
    if (round === 1 && !reviewMode && score === 0 && erroresDetalle.length === 0) return
    onEstado({ round, score, lives, fallidas, reviewMode, reviewIndex, erroresDetalle, erroresRepetidos, tiempo })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round, reviewMode, reviewIndex, score])

  if (!actual) return null

  const responder = (correcta: boolean, explicacion: string) => {
    if (resultado) return
    setResultado({ correcta, explicacion })
    if (correcta) {
      if (!reviewMode) setScore((s) => s + 1)
      return
    }
    if (!reviewMode) {
      setFallidas((f) => [...f, { ronda: actual, explicacion }])
      setErroresDetalle((e) => [...e, { ronda: round - 1, explicacion }])
    } else {
      setErroresRepetidos((e) => [...e, reviewIndex])
    }
    onRondaError?.()
    setLives((l) => l - 1)
  }

  const terminar = () => onComplete(score >= 3, tiempo, score, erroresDetalle, erroresRepetidos)

  const continuar = () => {
    setResultado(null)
    if (!reviewMode) {
      if (lives <= 0) return terminar()
      if (round < rondas) {
        setRound(round + 1)
        setActual(generar(round + 1))
      } else if (fallidas.length > 0) {
        setReviewMode(true)
        setReviewIndex(0)
        setActual(fallidas[0].ronda)
      } else terminar()
    } else if (reviewIndex < fallidas.length - 1) {
      setReviewIndex(reviewIndex + 1)
      setActual(fallidas[reviewIndex + 1].ronda)
    } else terminar()
  }

  const claveRonda = `${reviewMode ? "r" : "n"}-${reviewMode ? reviewIndex : round}`

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 rounded-2xl border-2 border-blue-700/30 bg-card p-4 shadow-lg md:p-8">
      <div className="text-center">
        <h2 className="mb-2 text-3xl font-extrabold text-neuron">{titulo}</h2>
        <p className="mx-auto max-w-lg text-lg text-gray-300">{instruccion}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">{reviewMode ? "Repaso" : "Ronda"}</span>
          <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm font-bold text-blue-400">
            {reviewMode ? `${reviewIndex + 1}/${fallidas.length}` : `${round}/${rondas}`}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Aciertos</span>
          <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm font-bold text-green-400">
            {score}/{rondas}
          </span>
        </div>
        <div className="flex items-center gap-2" role="img" aria-label={`Vidas: ${Math.max(lives, 0)} de ${vidasIniciales}`}>
          <span className="text-sm text-gray-400">Vidas</span>
          <div className="flex gap-1">
            {Array.from({ length: vidasIniciales }, (_, i) => (
              <Heart key={i} aria-hidden className={`h-5 w-5 ${i < lives ? "fill-red-500 text-red-500" : "text-gray-500"}`} />
            ))}
          </div>
        </div>
      </div>

      <div key={claveRonda}>{render(actual, { responder, respondida: resultado !== null })}</div>

      {resultado && (
        <div role="status" className={`rounded-lg border p-4 text-center ${resultado.correcta ? "border-green-500/40 bg-green-500/10" : "border-red-500/40 bg-red-500/10"}`}>
          <p className="text-lg font-bold">{resultado.correcta ? "✔ Bien hecho" : "✘ Todavía no"}</p>
          <p className="mt-1 text-base">{resultado.explicacion}</p>
          <Button autoFocus className="mt-4 min-h-11 bg-blue-600 hover:bg-blue-700" onClick={continuar}>
            Continuar
          </Button>
        </div>
      )}

      {!resultado && (
        <div className="flex justify-center">
          <Pistas key={claveRonda} pistas={pistas(actual).map((texto) => ({ texto }))} />
        </div>
      )}
    </div>
  )
}

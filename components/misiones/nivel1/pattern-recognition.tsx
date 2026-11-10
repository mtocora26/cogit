"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Pistas from "@/components/misiones/pistas"
import type { EstadoJuego } from "@/lib/patrones"
import { dificultadDeRonda, explicarRegla, generarRonda, type Dificultad, type Ronda, type TipoPatron } from "@/lib/generador-patrones"

interface PatternRecognitionProps {
  onComplete: (
    success: boolean,
    time: number,
    score?: number,
    erroresDetalle?: { ronda: number; explicacion: string }[],
    erroresRepetidos?: number[]
  ) => void
  onRondaError?: () => void // NUEVO: callback para error de ronda
  /** Estado guardado para retomar la actividad a mitad. */
  estadoInicial?: EstadoJuego | null
  /** Se llama al cambiar de ronda con la foto del estado, para guardarla. */
  onEstado?: (estado: EstadoJuego) => void
}

const CELEBRATION_SCORE = 4

export default function PatternRecognition({ onComplete, onRondaError, estadoInicial, onEstado }: PatternRecognitionProps) {
  const ini = (estadoInicial ?? {}) as Record<string, any>
  const [patternType, setPatternType] = useState<TipoPatron>("color")
  const [ronda, setRonda] = useState<Ronda | null>(null)
  const [pattern, setPattern] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [mounted, setMounted] = useState(false)
  const [round, setRound] = useState<number>(ini.round ?? 1)
  const [incorrectRounds, setIncorrectRounds] = useState<number[]>(ini.incorrectRounds ?? [])
  const [reviewMode, setReviewMode] = useState<boolean>(ini.reviewMode ?? false)
  const [reviewIndex, setReviewIndex] = useState<number>(ini.reviewIndex ?? 0)
  const [score, setScore] = useState<number>(ini.score ?? 0)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [erroresDetalle, setErroresDetalle] = useState<{ ronda: number; explicacion: string }[]>(ini.erroresDetalle ?? [])
  const [erroresRepetidos, setErroresRepetidos] = useState<number[]>(ini.erroresRepetidos ?? [])
  const [mensajeError, setMensajeError] = useState<string | null>(null)
  const maxRounds = 5

  // Solo generar patrones cuando el componente está montado en el cliente
  useEffect(() => {
    setMounted(true)
    setStartTime(Date.now() - (Number(ini.tiempo) || 0) * 1000)
  }, [])

  useEffect(() => {
    if (!startTime) return
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime])

  useEffect(() => {
    if (mounted) {
      startNewRound(Boolean(ini.reviewMode), round)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  // Foto del estado al cambiar de ronda (no en la primera, para no guardar algo sin avance).
  useEffect(() => {
    if (!mounted || !onEstado) return
    if (round === 1 && !reviewMode && score === 0 && erroresDetalle.length === 0) return
    onEstado({ round, score, incorrectRounds, reviewMode, reviewIndex, erroresDetalle, erroresRepetidos, tiempo: timeElapsed })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, round, reviewMode, reviewIndex, score])

  if (!mounted) return null

  // Iniciar una nueva ronda: la regla y la dificultad salen del generador (la respuesta es única).
  const startNewRound = (isReview = false, numRonda = round) => {
    const dificultad: Dificultad = isReview ? "media" : dificultadDeRonda(numRonda, maxRounds)
    const r = generarRonda(dificultad)
    setRonda(r)
    setPatternType(r.tipo)
    setPattern(r.visible)
    setOptions(r.opciones)
    setSelectedOption(null)
    setIsCorrect(null)
    setMensajeError(null)
  }

  // Explica la regla y distingue el tipo de error, sin dar por completada la actividad.
  const explicarError = (option: string) => {
    if (!ronda) return ""
    const tipo = ronda.completa.includes(option)
      ? `${glyphName(option)} sí aparece en el patrón, pero no es la que toca en este punto.`
      : `${glyphName(option)} no aparece en el patrón.`
    return `${tipo} ${explicarRegla(ronda, glyphName)}`
  }

  // Cuando el usuario falla una ronda:
  function handleErrorRonda() {
    if (onRondaError) onRondaError();
    // ...lógica de error de ronda...
  }

  // Avanzar de ronda después de responder
  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return
    setSelectedOption(option)
    const correctAnswer = ronda?.respuesta ?? ""
    const correct = option === correctAnswer
    setIsCorrect(correct)
    const explicacion = correct ? null : explicarError(option)
    setMensajeError(explicacion)
    setTimeout(() => {
      if (!reviewMode) {
        if (!correct) {
          setIncorrectRounds(prev => [...prev, round - 1])
          setErroresDetalle(prev => [...prev, { ronda: round - 1, explicacion: explicacion ?? "" }])
          handleErrorRonda()
        } else {
          setScore(s => s + 1)
        }
        if (round < maxRounds) {
          setRound(round + 1)
          startNewRound(false, round + 1)
        } else if (incorrectRounds.length > 0) {
          setReviewMode(true)
          setReviewIndex(0)
          setTimeout(() => startNewRound(true), 300)
        } else {
          onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
        }
      } else {
        // Repaso: solo avanza por las fallidas
        if (!correct) {
          setErroresRepetidos(prev => [...prev, reviewIndex])
        }
        if (reviewIndex < incorrectRounds.length - 1) {
          setReviewIndex(reviewIndex + 1)
          setTimeout(() => startNewRound(true), 300)
        } else {
          onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
        }
      }
    }, correct ? 1200 : 4500)
  }

  // Obtener el título según el tipo de patrón
  const getPatternTitle = () => {
    switch (patternType) {
      case "color":
        return "Patrón de Colores"
      case "shape":
        return "Patrón de Formas"
      case "number":
        return "Patrón de Números"
      case "direction":
        return "Patrón de Direcciones"
      default:
        return "Reconoce el Patrón"
    }
  }

  return (
    <div className="bg-card rounded-2xl p-4 md:p-8 border border-border max-w-xl mx-auto flex flex-col gap-6 overflow-y-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-purple-400">{getPatternTitle()}</h2>
        <p className="text-gray-300 mt-2 text-lg">{reviewMode ? "Repaso de rondas fallidas: corrige tus errores (sin penalización)" : "¿Cuál es el siguiente elemento en la secuencia?"}</p>
        <div className="mt-2 text-purple-300 font-semibold text-base">
          {reviewMode ? `Repaso: ${reviewIndex + 1}/${incorrectRounds.length}` : `Ronda: ${round}/${maxRounds}`}
          {ronda && <span className="ml-3 text-sm font-normal text-muted-foreground">Dificultad: {ronda.dificultad}</span>}
        </div>
      </div>
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-10 w-full py-4 min-h-[80px]">
          {pattern.map((item, index) => (
            <div
              key={index}
              className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-2xl bg-secondary rounded-xl border-2 border-purple-700 shadow-lg min-w-0 transition-all duration-200"
            >
              <Glyph token={item} />
            </div>
          ))}
          <div
            className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-2xl bg-secondary rounded-xl border-2 border-dashed border-signal min-w-0 transition-all duration-200"
          >
            <motion.span
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{ scale: [0.9, 1.15, 1], opacity: [0.7, 1, 0.85] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatType: 'loop', ease: [0.68, -0.55, 0.27, 1.55] }}
              className="block"
            >
              ?
            </motion.span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-md">
          {options.map((option, index) => (
            <div key={index} className="relative">
              <Button
                className={cn(
                  "h-16 md:h-20 text-3xl md:text-4xl w-full rounded-xl border-2 border-transparent transition-all duration-200 py-2 md:py-4",
                  selectedOption === option && isCorrect === true
                    ? "bg-green-600/90 border-green-400 text-white"
                    : selectedOption === option && isCorrect === false
                      ? "bg-red-600/90 border-red-400 text-white"
                      : "bg-secondary hover:bg-purple-900/40 text-purple-200",
                )}
                onClick={() => handleOptionSelect(option)}
                disabled={isCorrect !== null}
              >
                <Glyph token={option} className="!h-9 !w-9 md:!h-10 md:!w-10" />
                {selectedOption === option && isCorrect !== null && (
                  <div className="absolute -top-2 -right-2">
                    {isCorrect ? (
                      <CheckCircle className="h-7 w-7 text-green-300" />
                    ) : (
                      <XCircle className="h-7 w-7 text-red-300" />
                    )}
                  </div>
                )}
              </Button>
            </div>
          ))}
        </div>
        <div role="status" aria-live="polite" className="w-full max-w-md text-center">
          {mensajeError && (
            <p className="mt-6 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">{mensajeError}</p>
          )}
        </div>
        <div className="mt-8 w-full flex justify-center">
          <Pistas
            key={`${reviewMode ? "r" : "n"}-${reviewMode ? reviewIndex : round}-${pattern.join("")}`}
            pistas={
              ronda
                ? [
                    { texto: "Busca qué se repite o cómo cambian las fichas de una a otra: ahí está la regla." },
                    { texto: explicarRegla(ronda, glyphName) },
                    { texto: "La ficha que sigue es:", fichas: [ronda.respuesta] },
                  ]
                : []
            }
          />
        </div>
      </div>
    </div>
  )
}

/* En tu CSS global (globals.css):
@keyframes bounce-scale {
  0%, 100% { transform: scale(1) translateY(0); }
  30% { transform: scale(1.15) translateY(-10%); }
  50% { transform: scale(1.08) translateY(-18%); }
  70% { transform: scale(1.12) translateY(-10%); }
}
.animate-bounce-scale {
  animation: bounce-scale 1.6s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
}
*/

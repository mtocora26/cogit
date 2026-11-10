"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Pistas from "@/components/misiones/pistas"
import { describirRegla, findCyclicBase, type EstadoJuego } from "@/lib/patrones"

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

// Definición de los tipos de patrones
type PatternType = "color" | "shape" | "number" | "direction"

// Definición de los elementos para cada tipo de patrón
const patternElements = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
  number: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
  direction: ["⬆️", "➡️", "⬇️", "⬅️", "↗️", "↘️", "↙️", "↖️", "↔️"],
}

// Función para generar un patrón aleatorio
const generatePattern = (type: PatternType, length: number) => {
  const elements = patternElements[type]
  const pattern: string[] = []

  // Patrones posibles:
  // 1. Alternancia (A,B,A,B,...)
  // 2. Repetición (A,A,B,B,A,A,...)
  // 3. Incremento (A,B,C,A,B,C,...)

  const patternType = Math.floor(Math.random() * 3)

  if (patternType === 0) {
    // Alternancia
    const elemA = elements[Math.floor(Math.random() * elements.length)]
    const elemB = elements.filter((e) => e !== elemA)[Math.floor(Math.random() * (elements.length - 1))]

    for (let i = 0; i < length; i++) {
      pattern.push(i % 2 === 0 ? elemA : elemB)
    }
  } else if (patternType === 1) {
    // Repetición
    const elemA = elements[Math.floor(Math.random() * elements.length)]
    const elemB = elements.filter((e) => e !== elemA)[Math.floor(Math.random() * (elements.length - 1))]

    for (let i = 0; i < length; i++) {
      pattern.push(Math.floor(i / 2) % 2 === 0 ? elemA : elemB)
    }
  } else {
    // Incremento
    const startIdx = Math.floor(Math.random() * (elements.length - 3))
    const patternLength = 3

    for (let i = 0; i < length; i++) {
      pattern.push(elements[(startIdx + (i % patternLength)) % elements.length])
    }
  }

  return pattern
}

const CELEBRATION_SCORE = 4

export default function PatternRecognition({ onComplete, onRondaError, estadoInicial, onEstado }: PatternRecognitionProps) {
  const ini = (estadoInicial ?? {}) as Record<string, any>
  const [patternType, setPatternType] = useState<PatternType>("color")
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
      startNewRound(Boolean(ini.reviewMode))
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

  const getNextInPattern = (pat: string[]): string => {
    if (pat[0] === pat[2] && pat[1] === pat[3]) {
      // Alternancia (A,B,A,B)
      return pat[pat.length % 2];
    } else if (pat[0] === pat[1] && pat[2] === pat[3]) {
      // Repetición (A,A,B,B)
      return pat[pat.length % 4 < 2 ? 0 : 2];
    } else {
      // Secuencia cíclica robusta
      const base = findCyclicBase(pat);
      // Buscar la posición del último elemento mostrado dentro del ciclo base
      const last = pat[pat.length - 1];
      const idx = base.findIndex((v) => v === last);
      if (idx === -1) return base[0];
      return base[(idx + 1) % base.length];
    }
  };

  // Generar opciones (incluye la respuesta correcta y evita duplicados)
  const generateOptions = (correctAnswer: string, elements: string[], count = 4) => {
    const filtered = elements.filter(e => e !== correctAnswer)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    const options = [correctAnswer, ...shuffled].slice(0, count)
    // Barajar para que la respuesta no siempre esté en la misma posición
    return options.sort(() => Math.random() - 0.5)
  }

  // Iniciar una nueva ronda
  const startNewRound = (isReview = false) => {
    let type: PatternType
    let newPattern: string[]
    if (isReview && incorrectRounds.length > 0) {
      const idx = incorrectRounds[reviewIndex]
      type = patternType
      newPattern = generatePattern(type, 6)
      setPatternType(type)
      setPattern(newPattern)
      const correctAnswer = getNextInPattern(newPattern)
      setOptions(generateOptions(correctAnswer, patternElements[type]))
    } else {
      const types: PatternType[] = ["color", "shape", "number", "direction"]
      type = types[Math.floor(Math.random() * types.length)]
      newPattern = generatePattern(type, 6)
      setPatternType(type)
      setPattern(newPattern)
      const correctAnswer = getNextInPattern(newPattern)
      setOptions(generateOptions(correctAnswer, patternElements[type]))
    }
    setSelectedOption(null)
    setIsCorrect(null)
    setMensajeError(null)
  }

  // Explica la regla y distingue el tipo de error, sin dar por completada la actividad.
  const explicarError = (option: string, correctAnswer: string) => {
    const regla = describirRegla([...pattern, correctAnswer], glyphName, patternType)
    const grupo = findCyclicBase([...pattern, correctAnswer])
    const tipo = grupo.includes(option)
      ? `${glyphName(option)} sí forma parte del patrón, pero no es la que toca en este punto.`
      : `${glyphName(option)} no aparece en el patrón.`
    return `${tipo} ${regla} Mira dónde vas dentro del grupo que se repite.`
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
    const correctAnswer = getNextInPattern(pattern)
    const correct = option === correctAnswer
    setIsCorrect(correct)
    const explicacion = correct ? null : explicarError(option, correctAnswer)
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
          startNewRound()
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
            pistas={[
              { texto: "Fíjate en cómo se repiten las fichas: hay un grupo que vuelve a empezar una y otra vez." },
              { texto: `El grupo que se repite tiene ${findCyclicBase([...pattern, getNextInPattern(pattern)]).length} fichas:`, fichas: findCyclicBase([...pattern, getNextInPattern(pattern)]) },
              { texto: "La ficha que sigue es:", fichas: [getNextInPattern(pattern)] },
            ]}
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

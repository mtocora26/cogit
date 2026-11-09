"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Heart, Lightbulb } from "lucide-react"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

interface OutlierPatternProps {
  onComplete: (
    success: boolean,
    time: number,
    score?: number,
    erroresDetalle?: { ronda: number; explicacion: string }[],
    erroresRepetidos?: number[]
  ) => void
  onRondaError?: () => void // NUEVO: callback para error de ronda
}

type PatternType = "color" | "shape" | "number" | "direction"

const patternElements = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
  number: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
  direction: ["⬆️", "➡️", "⬇️", "⬅️", "↗️", "↘️", "↙️", "↖️", "↔️"],
}

const maxRounds = 5
const initialLives = 3

function generateOutlierPattern(type: PatternType, length: number) {
  const elements = patternElements[type]
  // Elegir un subconjunto de 3 elementos para el patrón base
  const base = [] as string[]
  while (base.length < 3) {
    const e = elements[Math.floor(Math.random() * elements.length)]
    if (!base.includes(e)) base.push(e)
  }
  // Generar el patrón base repetido
  const pattern = Array.from({ length }, (_, i) => base[i % base.length])
  // Elegir una posición aleatoria para el intruso
  const outlierIdx = Math.floor(Math.random() * length)
  // Elegir un elemento que no esté en el patrón base
  const outlier = elements.filter(e => !base.includes(e))[Math.floor(Math.random() * (elements.length - 3))]
  pattern[outlierIdx] = outlier
  return { pattern, outlierIdx, outlier, base }
}

export default function OutlierPattern({ onComplete, onRondaError }: OutlierPatternProps) {
  const [patternType, setPatternType] = useState<PatternType>("color")
  const [pattern, setPattern] = useState<string[]>([])
  const [outlierIdx, setOutlierIdx] = useState<number>(-1)
  const [outlier, setOutlier] = useState<string>("")
  const [base, setBase] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [lives, setLives] = useState(initialLives)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [incorrectRounds, setIncorrectRounds] = useState<any[]>([])
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [hint, setHint] = useState<string | null>(null)
  const [hintUsed, setHintUsed] = useState(false)
  const [showPaywall, setShowPaywall] = useState(false)
  const [hintsLeft, setHintsLeft] = useState(3)
  const [erroresDetalle, setErroresDetalle] = useState<{ ronda: number; explicacion: string }[]>([])
  const [erroresRepetidos, setErroresRepetidos] = useState<number[]>([])

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (mounted) {
      setStartTime(Date.now())
      startNewRound()
    }
    // eslint-disable-next-line
  }, [mounted])
  useEffect(() => {
    if (!startTime) return
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime])
  if (!mounted) return null

  const startNewRound = (isReview = false) => {
    let type: PatternType
    let pat: string[]
    let idx: number
    let out: string
    let basePat: string[]
    if (isReview && incorrectRounds.length > 0) {
      const review = incorrectRounds[reviewIndex]
      type = review.type
      pat = review.pattern
      idx = review.outlierIdx
      out = review.outlier
      basePat = review.base
    } else {
      const types: PatternType[] = ["color", "shape", "number", "direction"]
      type = types[Math.floor(Math.random() * types.length)]
      const { pattern, outlierIdx, outlier, base } = generateOutlierPattern(type, 7)
      pat = pattern
      idx = outlierIdx
      out = outlier
      basePat = base
      setPatternType(type)
    }
    setPattern(pat)
    setOutlierIdx(idx)
    setOutlier(out)
    setBase(basePat)
    setSelectedIdx(null)
    setIsCorrect(null)
    setShowExplanation(false)
    setExplanation("")
    setHint(null)
    setHintUsed(false)
    setShowPaywall(false)
  }

  const handleOptionSelect = (idx: number) => {
    if (isCorrect !== null) return
    setSelectedIdx(idx)
    const correct = idx === outlierIdx
    setIsCorrect(correct)
    setShowExplanation(true)
    setExplanation(
      correct
        ? "¡Correcto! Has encontrado el elemento que no pertenece al patrón."
        : `El elemento correcto era: ${glyphName(pattern[outlierIdx])}. El patrón base era: ${base.map(glyphName).join(", ")}.`
    )
    if (correct) {
      setScore(score + 1)
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } }), 500)
      setTimeout(() => handleContinue(), 1200)
    } else {
      if (!reviewMode) {
        setIncorrectRounds([...incorrectRounds, { pattern, type: patternType, outlierIdx, outlier, base, ronda: round - 1, explicacion: `El elemento correcto era: ${glyphName(pattern[outlierIdx])}. El patrón base era: ${base.map(glyphName).join(", ")}.`}])
        setErroresDetalle(prev => [...prev, { ronda: round - 1, explicacion: `El elemento correcto era: ${glyphName(pattern[outlierIdx])}. El patrón base era: ${base.map(glyphName).join(", ")}.`}])
      } else {
        setErroresRepetidos(prev => [...prev, reviewIndex])
      }
      handleErrorRonda()
    }
  }

  const handleErrorRonda = () => {
    if (onRondaError) onRondaError()
    setLives(l => l - 1)
  }

  const handleShowHint = () => {
    if (!hintUsed) {
      setHint(`El patrón base es: ${base.map(glyphName).join(", ")}`)
      setHintUsed(true)
      setHintsLeft(hintsLeft - 1)
    } else {
      setShowPaywall(true)
    }
  }

  const handleContinue = () => {
    setShowExplanation(false)
    if (!reviewMode) {
      if (lives <= 0) {
        onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
        return
      }
      if (round < maxRounds) {
        setRound(round + 1)
        startNewRound()
      } else if (incorrectRounds.length > 0 && lives > 0) {
        setReviewMode(true)
        setReviewIndex(0)
        setTimeout(() => startNewRound(true), 300)
      } else {
        onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
      }
    } else {
      if (reviewIndex < incorrectRounds.length - 1) {
        setReviewIndex(reviewIndex + 1)
        setTimeout(() => startNewRound(true), 300)
      } else {
        onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
      }
    }
  }

  return (
    <motion.div
      className="bg-card rounded-2xl p-4 md:p-8 border-2 border-blue-700/30 shadow-lg max-w-2xl mx-auto min-h-[70vh] flex flex-col justify-between overflow-y-auto animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-neuron mb-2">Encuentra el intruso</h2>
        <p className="text-lg text-gray-300 text-center max-w-lg">Observa la secuencia y selecciona el elemento que no pertenece al patrón. ¡Pon a prueba tu lógica!</p>
      </div>
      {/* Barra de progreso gamificada */}
      <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Ronda</span>
          <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-bold shadow">{round}/{maxRounds}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Puntuación</span>
          <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-sm font-bold shadow">{score}/{maxRounds}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Vidas</span>
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <Heart key={i} className={`h-5 w-5 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Pistas</span>
          <div className="flex gap-1">
            {[...Array(hintsLeft)].map((_, i) => (
              <Lightbulb key={i} className="h-5 w-5 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      {/* Secuencia y opciones */}
      <div className="flex flex-col items-center gap-6 md:gap-8 flex-1 justify-center">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-4">
          {pattern.map((el, idx) => (
            <div key={idx} className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center text-3xl bg-secondary rounded-lg border-2 border-blue-700/30 shadow-md">
              <Glyph token={el} />
            </div>
          ))}
        </div>
        {/* Mensaje de pista */}
        <AnimatePresence>
          {hint && (
            <motion.div
              className="bg-yellow-500/10 text-yellow-400 p-4 rounded-lg mb-4 text-center font-semibold shadow animate-fade-in"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Lightbulb className="inline h-5 w-5 mr-1" /> {hint}
            </motion.div>
          )}
        </AnimatePresence>
        {/* Paywall simulado */}
        <AnimatePresence>
          {showPaywall && (
            <motion.div
              className="bg-purple-900/90 border-2 border-yellow-400 text-yellow-200 p-6 rounded-xl mb-4 text-center shadow-xl max-w-xs animate-fade-in z-20"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="mb-2">
                <Lightbulb className="inline h-6 w-6 mr-2 text-yellow-400" />
                <span className="font-bold">¡Pista extra!</span>
              </div>
              <div className="mb-3 text-sm text-yellow-100">Solo puedes usar una pista por ronda.<br />Se renuevan en cada ronda.</div>
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold mt-2" onClick={() => setShowPaywall(false)}>
                Cerrar
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-md">
          {pattern.map((option, index) => (
            <Button
              key={index}
              className={cn(
                "h-16 md:h-20 text-3xl md:text-4xl relative font-bold transition-all duration-200 py-2 md:py-4",
                selectedIdx === index && isCorrect === true
                  ? "bg-green-600 text-white scale-105 shadow-lg"
                  : selectedIdx === index && isCorrect === false
                    ? "bg-red-600 text-white scale-105 shadow-lg animate-shake"
                    : "bg-secondary text-foreground hover:scale-105 hover:shadow-lg",
              )}
              onClick={() => handleOptionSelect(index)}
              disabled={isCorrect !== null}
            >
              <Glyph token={option} className="!h-8 !w-8" />
              {selectedIdx === index && isCorrect !== null && (
                <div className="absolute -top-2 -right-2">
                  {isCorrect ? (
                    <CheckCircle className="h-6 w-6 text-green-400" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-400" />
                  )}
                </div>
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* Feedback visual animado y explicación */}
      <AnimatePresence>
        {isCorrect !== null && showExplanation && (
          <motion.div
            className={cn(
              "mt-8 text-xl font-bold text-center transition-all animate-fade-in",
              isCorrect ? "text-green-400" : "text-red-400",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {explanation}
            {!isCorrect && (
              <div className="mt-4">
                <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700">Continuar</Button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Botón de pista animado */}
      <div className="flex justify-center mt-8">
        <Button
          variant="outline"
          className="border-yellow-400 text-yellow-400 hover:bg-yellow-500/10"
          onClick={handleShowHint}
          disabled={hintsLeft === 0}
        >
          <Lightbulb className="h-5 w-5 mr-2" />
          {hintsLeft > 0 ? "Usar pista" : "Sin pistas"}
        </Button>
      </div>
    </motion.div>
  )
}

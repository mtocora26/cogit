"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Heart } from "lucide-react"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import Pistas from "@/components/misiones/pistas"
import type { EstadoJuego } from "@/lib/patrones"
import { dificultadDeRonda, explicarRegla, generarIntruso, type RondaIntruso, type TipoPatron } from "@/lib/generador-patrones"

interface OutlierPatternProps {
  onComplete: (
    success: boolean,
    time: number,
    score?: number,
    erroresDetalle?: { ronda: number; explicacion: string }[],
    erroresRepetidos?: number[]
  ) => void
  onRondaError?: () => void // NUEVO: callback para error de ronda
  estadoInicial?: EstadoJuego | null
  onEstado?: (estado: EstadoJuego) => void
}

const maxRounds = 5
const initialLives = 3

export default function OutlierPattern({ onComplete, onRondaError, estadoInicial, onEstado }: OutlierPatternProps) {
  const ini = (estadoInicial ?? {}) as Record<string, any>
  const [patternType, setPatternType] = useState<TipoPatron>("color")
  const [ronda, setRonda] = useState<RondaIntruso | null>(null)
  const [pattern, setPattern] = useState<string[]>([])
  const [outlierIdx, setOutlierIdx] = useState<number>(-1)
  const [outlier, setOutlier] = useState<string>("")
  const [base, setBase] = useState<string[]>([])
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState<number>(ini.score ?? 0)
  const [round, setRound] = useState<number>(ini.round ?? 1)
  const [lives, setLives] = useState<number>(ini.lives ?? initialLives)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [explanation, setExplanation] = useState("")
  const [incorrectRounds, setIncorrectRounds] = useState<any[]>(ini.incorrectRounds ?? [])
  const [reviewMode, setReviewMode] = useState<boolean>(ini.reviewMode ?? false)
  const [reviewIndex, setReviewIndex] = useState<number>(ini.reviewIndex ?? 0)
  const [mounted, setMounted] = useState(false)
  const [erroresDetalle, setErroresDetalle] = useState<{ ronda: number; explicacion: string }[]>(ini.erroresDetalle ?? [])
  const [erroresRepetidos, setErroresRepetidos] = useState<number[]>(ini.erroresRepetidos ?? [])

  useEffect(() => { setMounted(true) }, [])
  useEffect(() => {
    if (mounted) {
      setStartTime(Date.now() - (Number(ini.tiempo) || 0) * 1000)
      startNewRound(Boolean(ini.reviewMode), round)
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
  // Foto del estado al cambiar de ronda (no en la primera, para no guardar algo sin avance).
  useEffect(() => {
    if (!mounted || !onEstado) return
    if (round === 1 && !reviewMode && score === 0 && erroresDetalle.length === 0) return
    onEstado({ round, score, lives, incorrectRounds, reviewMode, reviewIndex, erroresDetalle, erroresRepetidos, tiempo: timeElapsed })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, round, reviewMode, reviewIndex, score])

  if (!mounted) return null

  const startNewRound = (isReview = false, numRonda = round) => {
    let pat: string[]
    let idx: number
    let out: string
    let basePat: string[]
    let r: RondaIntruso
    if (isReview && incorrectRounds.length > 0) {
      const review = incorrectRounds[reviewIndex]
      r = review.ronda
      pat = review.pattern
      idx = review.outlierIdx
      out = review.outlier
      basePat = review.base
    } else {
      r = generarIntruso(dificultadDeRonda(numRonda, maxRounds))
      pat = r.pattern
      idx = r.outlierIdx
      out = r.outlier
      basePat = r.fichasRegla
      setPatternType(r.tipo)
    }
    setRonda(r)
    setPattern(pat)
    setOutlierIdx(idx)
    setOutlier(out)
    setBase(basePat)
    setSelectedIdx(null)
    setIsCorrect(null)
    setShowExplanation(false)
    setExplanation("")
  }

  const handleOptionSelect = (idx: number) => {
    if (isCorrect !== null) return
    setSelectedIdx(idx)
    const correct = idx === outlierIdx
    setIsCorrect(correct)
    setShowExplanation(true)
    const regla = ronda ? explicarRegla(ronda, glyphName) : ""
    const explicacion = correct
      ? `¡Correcto! Esa ficha rompe la regla. ${regla}`
      : `${glyphName(pattern[idx])} sí sigue el patrón: no es el intruso. ${regla} Busca la ficha que no encaja en esa repetición.`
    setExplanation(explicacion)
    if (correct) {
      setScore(score + 1)
      setTimeout(() => confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 } }), 500)
      setTimeout(() => handleContinue(), 1200)
    } else {
      if (!reviewMode) {
        setIncorrectRounds([...incorrectRounds, { pattern, type: patternType, outlierIdx, outlier, base, ronda: ronda, rondaNum: round - 1, explicacion }])
        setErroresDetalle(prev => [...prev, { ronda: round - 1, explicacion }])
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

  const handleContinue = () => {
    setShowExplanation(false)
    if (!reviewMode) {
      if (lives <= 0) {
        onComplete(score >= 3, timeElapsed, score, erroresDetalle, erroresRepetidos)
        return
      }
      if (round < maxRounds) {
        setRound(round + 1)
        startNewRound(false, round + 1)
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
      <div className="flex justify-center mt-8">
        <Pistas
          key={`${reviewMode ? "r" : "n"}-${reviewMode ? reviewIndex : round}-${pattern.join("")}`}
          pistas={
            ronda
              ? [
                  { texto: "Casi todas las fichas siguen una misma regla. Busca la que no la cumple." },
                  { texto: explicarRegla(ronda, glyphName) },
                  { texto: `El intruso es la ficha número ${outlierIdx + 1}, contando desde la izquierda:`, fichas: pattern[outlierIdx] ? [pattern[outlierIdx]] : [] },
                ]
              : []
          }
        />
      </div>
    </motion.div>
  )
}

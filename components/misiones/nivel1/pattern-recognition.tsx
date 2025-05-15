"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"

interface PatternRecognitionProps {
  onComplete: (success: boolean, time: number, score?: number) => void
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

// Detecta el ciclo base considerando cualquier desplazamiento
function findCyclicBase(pat: string[]): string[] {
  for (let size = 1; size <= Math.floor(pat.length / 2); size++) {
    const base = pat.slice(0, size);
    let isCycle = true;
    for (let shift = 0; shift < size; shift++) {
      isCycle = true;
      for (let i = 0; i < pat.length; i++) {
        if (pat[i] !== base[(i + shift) % size]) {
          isCycle = false;
          break;
        }
      }
      if (isCycle) return base;
    }
  }
  return pat;
}

// Valida si un patrón es perfectamente cíclico
function isPerfectCycle(pat: string[]): boolean {
  const base = findCyclicBase(pat);
  for (let i = 0; i < pat.length; i++) {
    if (pat[i] !== base[i % base.length]) return false;
  }
  return true;
}

const CELEBRATION_SCORE = 4

export default function PatternRecognition({ onComplete }: PatternRecognitionProps) {
  const [patternType, setPatternType] = useState<PatternType>("color")
  const [pattern, setPattern] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [startTime, setStartTime] = useState<number | null>(null)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [showExplanation, setShowExplanation] = useState(false)
  const [patternExplanation, setPatternExplanation] = useState("")
  const [mounted, setMounted] = useState(false)
  const [incorrectRounds, setIncorrectRounds] = useState<{pattern: string[], type: PatternType, answer: string, userAnswer: string}[]>([])
  const [reviewMode, setReviewMode] = useState(false)
  const [reviewIndex, setReviewIndex] = useState(0)
  const [lives, setLives] = useState(3)
  const [cycleDebug, setCycleDebug] = useState<{base: string[], answer: string, error?: string}|null>(null)
  const maxRounds = 5

  // Solo generar patrones y tiempo cuando el componente está montado en el cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setStartTime(Date.now())
      startNewRound()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted])

  useEffect(() => {
    if (!startTime) return
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [startTime])

  if (!mounted) return null

  // Explicación del patrón
  const explainPattern = (pat: string[]): string => {
    if (pat[0] === pat[2] && pat[1] === pat[3]) {
      return "Alternancia: el patrón alterna entre dos elementos (A, B, A, B, ...)."
    } else if (pat[0] === pat[1] && pat[2] === pat[3]) {
      return "Repetición: dos elementos se repiten en bloques (A, A, B, B, ...)."
    } else {
      return "Secuencia cíclica: los elementos avanzan en orden y se repiten (A, B, C, A, ...)."
    }
  }

  // Generar opciones (incluye la respuesta correcta y evita duplicados)
  const generateOptions = (correctAnswer: string, elements: string[], count = 4) => {
    const filtered = elements.filter(e => e !== correctAnswer)
    const shuffled = [...filtered].sort(() => Math.random() - 0.5)
    const options = [correctAnswer, ...shuffled].slice(0, count)
    // Barajar para que la respuesta no siempre esté en la misma posición
    return options.sort(() => Math.random() - 0.5)
  }

  // Iniciar una nueva ronda (normal o de repaso)
  const startNewRound = (isReview = false) => {
    let newType: PatternType;
    let newPattern: string[];
    if (isReview && incorrectRounds.length > 0) {
      const review = incorrectRounds[reviewIndex]
      newType = review.type
      newPattern = review.pattern
      setPatternType(newType)
      setPattern(newPattern)
      const correctAnswer = getNextInPattern(newPattern)
      setOptions(generateOptions(correctAnswer, patternElements[newType]))
    } else {
      const types: PatternType[] = ["color", "shape", "number", "direction"]
      newType = types[Math.floor(Math.random() * types.length)]
      setPatternType(newType)
      const patternLength = 4 + Math.min(round, 3)
      newPattern = generatePattern(newType, patternLength)
      setPattern(newPattern)
      const correctAnswer = getNextInPattern(newPattern)
      setOptions(generateOptions(correctAnswer, patternElements[newType]))
    }
    setSelectedOption(null)
    setIsCorrect(null)
    setShowExplanation(false)
    setPatternExplanation("")

    // Validación y logs de depuración
    let debugBase: string[] = [];
    let debugAnswer = "";
    let debugError = undefined;
    if (newType && newPattern && newPattern.length > 0) {
      if (isReview && incorrectRounds.length > 0) {
        debugBase = findCyclicBase(newPattern);
        debugAnswer = getNextInPattern(newPattern);
        if (!isPerfectCycle(newPattern)) debugError = "¡Advertencia: el patrón mostrado no es perfectamente cíclico!";
      } else {
        debugBase = findCyclicBase(newPattern);
        debugAnswer = getNextInPattern(newPattern);
        if (!isPerfectCycle(newPattern)) debugError = "¡Advertencia: el patrón mostrado no es perfectamente cíclico!";
      }
      setCycleDebug({base: debugBase, answer: debugAnswer, error: debugError});
      // Log para desarrollador
      if (typeof window !== 'undefined') {
        console.log("[Pattern Debug] Base:", debugBase, "Pattern:", newPattern, "Expected:", debugAnswer, debugError ? debugError : "");
      }
    }
  }

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

  // Manejar la selección de una opción
  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return // Ya se ha respondido

    setSelectedOption(option)
    const correctAnswer = getNextInPattern(pattern)
    const correct = option === correctAnswer
    setIsCorrect(correct)
    setPatternExplanation(explainPattern(pattern))
    setShowExplanation(true)

    if (correct) {
      setScore(score + 1)
      if (score + 1 >= CELEBRATION_SCORE) {
        setTimeout(() => confetti({ particleCount: 100, spread: 70, origin: { y: 0.7 } }), 500)
      }
      // Avance automático tras acierto
      setTimeout(() => handleContinue(), 1200)
    } else {
      // Guardar ronda incorrecta para repaso
      if (!reviewMode) {
        setIncorrectRounds([...incorrectRounds, {pattern, type: patternType, answer: correctAnswer, userAnswer: option}])
        setLives(l => l - 1)
      }
      // No avanzar automáticamente, mostrar botón
    }
  }

  // Avanzar a la siguiente ronda o repaso al presionar 'Continuar'
  const handleContinue = () => {
    setShowExplanation(false)
    if (!reviewMode) {
      if (lives <= 0) {
        // Sin vidas, termina la actividad
        onComplete(score >= 3, timeElapsed, score)
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
        // Juego completado sin errores o sin vidas
        onComplete(score >= 3, timeElapsed, score)
      }
    } else {
      // Repaso
      if (reviewIndex < incorrectRounds.length - 1) {
        setReviewIndex(reviewIndex + 1)
        setTimeout(() => startNewRound(true), 300)
      } else {
        // Fin del repaso
        onComplete(score >= 3, timeElapsed, score)
      }
    }
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
    <motion.div
      className="bg-gradient-to-br from-[#232946] to-[#16161a] rounded-2xl p-4 md:p-8 border-2 border-purple-700 shadow-2xl max-w-xl mx-auto min-h-[70vh] flex flex-col justify-between overflow-y-auto"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-purple-400 drop-shadow-lg animate-pulse">{getPatternTitle()}</h2>
        <p className="text-gray-300 mt-2 text-lg">¿Cuál es el siguiente elemento en la secuencia?</p>
      </div>
      <div className="flex justify-center items-center mb-8 gap-6">
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">Ronda</span>
          <div className="bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full text-lg font-bold">
            {round}/{maxRounds}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">Puntos</span>
          <div className="bg-green-600/30 text-green-300 px-3 py-1 rounded-full text-lg font-bold">
            {score}
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">Tiempo</span>
          <div className="bg-purple-600/30 text-purple-300 px-3 py-1 rounded-full text-lg font-bold">
            {timeElapsed}s
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-400 mb-1">Vidas</span>
          <div className={cn(
            "bg-red-600/30 text-red-300 px-3 py-1 rounded-full text-lg font-bold flex gap-1 items-center",
            lives === 1 && "animate-pulse"
          )}>
            {Array.from({length: lives}).map((_, i) => <span key={i}>❤️</span>)}
            <span className="ml-2">{lives}</span>
          </div>
        </div>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full mb-8 overflow-hidden">
        <motion.div
          className="h-3 bg-gradient-to-r from-purple-500 to-blue-400 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(round / maxRounds) * 100}%` }}
          transition={{ duration: 0.7 }}
        />
      </div>
      <div className="flex flex-col items-center flex-1 justify-center">
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 w-full overflow-x-auto scrollbar-thin scrollbar-thumb-purple-700/60 scrollbar-track-transparent">
          {pattern.map((item, index) => (
            <motion.div
              key={index}
              className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center text-2xl md:text-4xl bg-[#232946] rounded-xl border-2 border-purple-700 shadow-lg min-w-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.08 }}
            >
              {item}
            </motion.div>
          ))}
          <motion.div
            className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center text-2xl md:text-4xl bg-[#232946] rounded-xl border-2 border-dashed border-purple-400 animate-bounce min-w-0"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: pattern.length * 0.08 }}
          >
            ?
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 w-full max-w-md">
          {options.map((option, index) => (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.08 }}
              className="relative"
            >
              <Button
                className={cn(
                  "h-16 md:h-20 text-3xl md:text-4xl w-full rounded-xl border-2 border-transparent transition-all duration-200 py-2 md:py-4",
                  selectedOption === option && isCorrect === true
                    ? "bg-green-600/90 border-green-400 text-white shadow-xl"
                    : selectedOption === option && isCorrect === false
                      ? "bg-red-600/90 border-red-400 text-white shadow-xl"
                      : "bg-[#232946] hover:bg-purple-900/40 text-purple-200",
                )}
                onClick={() => handleOptionSelect(option)}
                disabled={isCorrect !== null}
              >
                {option}
                <AnimatePresence>
                  {selectedOption === option && isCorrect !== null && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      {isCorrect ? (
                        <CheckCircle className="h-7 w-7 text-green-300 drop-shadow-lg" />
                      ) : (
                        <XCircle className="h-7 w-7 text-red-300 drop-shadow-lg" />
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              className="mt-8 text-center text-lg text-purple-300 bg-[#232946] rounded-xl p-4 border border-purple-700 shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <span className="font-bold">Explicación:</span> {patternExplanation}
              {/* Solo mostrar botón si la respuesta es incorrecta */}
              {!isCorrect && (
                <div className="mt-4">
                  <Button onClick={handleContinue} className="bg-blue-600 hover:bg-blue-700">Continuar</Button>
                </div>
              )}
              {reviewMode && selectedOption !== getNextInPattern(pattern) && (
                <div className="mt-2 text-sm text-red-300">Tu respuesta: {selectedOption} | Correcta: {getNextInPattern(pattern)}</div>
              )}
              {cycleDebug && cycleDebug.error && (
                <div className="mt-2 text-sm text-yellow-400 font-bold">{cycleDebug.error}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

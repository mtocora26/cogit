"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface ComplexPatternsProps {
  onComplete: (success: boolean, time: number, score: number) => void
}

// Definición de los tipos de patrones
type PatternType = "color" | "shape" | "direction" | "mixed"

// Definición de los elementos para cada tipo de patrón
const patternElements = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
  direction: ["⬆️", "➡️", "⬇️", "⬅️", "↗️", "↘️", "↙️", "↖️", "↔️"],
  mixed: ["🎯", "🎮", "🎲", "🎪", "🎭", "🎨", "🎬", "🎤", "🎧"],
}

// Función para generar un patrón complejo
const generateComplexPattern = (length: number) => {
  const types = Object.keys(patternElements) as PatternType[]
  const selectedType = types[Math.floor(Math.random() * types.length)]
  const elements = patternElements[selectedType]
  const pattern: string[] = []

  // Patrones complejos:
  // 1. Fibonacci (1,1,2,3,5,...)
  // 2. Alternancia con salto (A,B,C,A,B,C,...)
  // 3. Patrón con regla matemática (x^2, x+3, etc.)

  const patternType = Math.floor(Math.random() * 3)

  if (patternType === 0) {
    // Patrón tipo Fibonacci (usamos índices en lugar de valores reales de Fibonacci)
    const selectedElements = elements.slice(0, Math.min(5, elements.length))
    let a = 0
    let b = 1

    for (let i = 0; i < length; i++) {
      pattern.push(selectedElements[a % selectedElements.length])
      const temp = a
      a = b
      b = (temp + b) % selectedElements.length
    }
  } else if (patternType === 1) {
    // Alternancia con salto
    const step = 1 + Math.floor(Math.random() * 2) // 1 o 2
    const start = Math.floor(Math.random() * 3)
    const selectedElements = elements.slice(0, Math.min(6, elements.length))

    for (let i = 0; i < length; i++) {
      const index = (start + i * step) % selectedElements.length
      pattern.push(selectedElements[index])
    }
  } else {
    // Patrón con regla matemática (usamos módulo para mantener índices válidos)
    const selectedElements = elements.slice(0, Math.min(6, elements.length))

    for (let i = 0; i < length; i++) {
      // Usamos i^2 % length como regla
      const index = (i * i) % selectedElements.length
      pattern.push(selectedElements[index])
    }
  }

  return { pattern, type: selectedType }
}

// Función para determinar el siguiente elemento en un patrón complejo
const getNextInComplexPattern = (pattern: string[], type: PatternType): string => {
  const elements = patternElements[type]

  // Intentamos detectar el patrón
  if (pattern.length >= 6) {
    // Verificar si es un patrón cíclico
    const cycleLength = detectCycleLength(pattern)
    if (cycleLength > 0 && cycleLength < pattern.length / 2) {
      return pattern[pattern.length % cycleLength]
    }
  }

  // Si no podemos detectar un patrón claro, usamos el último elemento como fallback
  return pattern[pattern.length - 1]
}

// Función para detectar la longitud de un ciclo en un patrón
const detectCycleLength = (pattern: string[]): number => {
  for (let cycleLength = 1; cycleLength <= pattern.length / 2; cycleLength++) {
    let isCycle = true

    for (let i = 0; i < cycleLength; i++) {
      if (pattern[i] !== pattern[i + cycleLength]) {
        isCycle = false
        break
      }
    }

    if (isCycle) return cycleLength
  }

  return 0 // No se detectó un ciclo claro
}

export default function ComplexPatterns({ onComplete }: ComplexPatternsProps) {
  const [patternInfo, setPatternInfo] = useState<{ pattern: string[]; type: PatternType }>({
    pattern: [],
    type: "color",
  })
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [lives, setLives] = useState(3)
  const [hint, setHint] = useState<string | null>(null)
  const maxRounds = 5

  // Inicializar el juego
  useEffect(() => {
    startNewRound()
  }, [])

  // Actualizar el tiempo transcurrido
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime])

  // Iniciar una nueva ronda
  const startNewRound = () => {
    // Generar un nuevo patrón complejo
    const patternLength = 5 + Math.min(round, 3) // Aumenta la dificultad con cada ronda
    const newPatternInfo = generateComplexPattern(patternLength)
    setPatternInfo(newPatternInfo)
    setHint(null)

    // Generar opciones (incluye la respuesta correcta)
    const correctAnswer = getNextInComplexPattern(newPatternInfo.pattern, newPatternInfo.type)
    const elements = patternElements[newPatternInfo.type].filter((e) => e !== correctAnswer)
    const shuffledElements = [...elements].sort(() => Math.random() - 0.5)
    const newOptions = [correctAnswer, ...shuffledElements.slice(0, 3)]
    setOptions(newOptions.sort(() => Math.random() - 0.5))

    setSelectedOption(null)
    setIsCorrect(null)
  }

  // Mostrar una pista
  const showHint = () => {
    const patternType = detectPatternType(patternInfo.pattern)
    setHint(patternType)
  }

  // Detectar el tipo de patrón para dar pistas
  const detectPatternType = (pattern: string[]): string => {
    // Simplificación para dar pistas generales
    if (pattern.length >= 6) {
      const cycleLength = detectCycleLength(pattern)
      if (cycleLength > 0) {
        return `Este patrón parece repetirse cada ${cycleLength} elementos.`
      }
    }

    return "Observa cuidadosamente cómo cambian los elementos."
  }

  // Manejar la selección de una opción
  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return // Ya se ha respondido

    setSelectedOption(option)
    const correctAnswer = getNextInComplexPattern(patternInfo.pattern, patternInfo.type)
    const correct = option === correctAnswer
    setIsCorrect(correct)

    if (correct) {
      setScore(score + 1)
    } else {
      // Reducir vidas si la respuesta es incorrecta
      setLives(lives - 1)
    }

    // Esperar un momento para mostrar el feedback y luego pasar a la siguiente ronda
    setTimeout(() => {
      // Si se quedó sin vidas, terminar el juego
      if (!correct && lives <= 1) {
        onComplete(score >= 3, timeElapsed, score)
        return
      }

      if (round < maxRounds) {
        setRound(round + 1)
        startNewRound()
      } else {
        // Juego completado
        onComplete(score >= 3, timeElapsed, score)
      }
    }, 1500)
  }

  // Obtener el título según el tipo de patrón
  const getPatternTitle = () => {
    switch (patternInfo.type) {
      case "color":
        return "Patrón Complejo de Colores"
      case "shape":
        return "Patrón Complejo de Formas"
      case "direction":
        return "Patrón Complejo de Direcciones"
      case "mixed":
        return "Patrón Complejo Mixto"
      default:
        return "Patrón Complejo"
    }
  }

  // Renderizar las vidas
  const renderLives = () => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(3)].map((_, i) => (
          <Heart key={i} className={`h-5 w-5 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-500"}`} />
        ))}
      </div>
    )
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{getPatternTitle()}</h2>
        <p className="text-gray-400 mt-1">Observa el patrón complejo y selecciona el siguiente elemento</p>
      </div>

      <div className="flex justify-center items-center mb-8 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Ronda:</div>
          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
            {round}/{maxRounds}
          </div>
        </div>
        <div className="mx-2 text-gray-500 hidden md:block">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Puntuación:</div>
          <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
            {score}/{maxRounds}
          </div>
        </div>
        <div className="mx-2 text-gray-500 hidden md:block">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Vidas:</div>
          <div>{renderLives()}</div>
        </div>
        <div className="mx-2 text-gray-500 hidden md:block">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Tiempo:</div>
          <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">{timeElapsed}s</div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {/* Patrón */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {patternInfo.pattern.map((item, index) => (
            <div
              key={index}
              className="w-14 h-14 flex items-center justify-center text-2xl bg-[#1a1d23] rounded-lg border border-gray-700"
            >
              {item}
            </div>
          ))}
          <div className="w-14 h-14 flex items-center justify-center text-2xl bg-[#1a1d23] rounded-lg border border-gray-700 border-dashed">
            ?
          </div>
        </div>

        {/* Pista */}
        {hint && (
          <div className="bg-blue-500/10 text-blue-300 p-3 rounded-lg mb-6 text-center">
            <p>{hint}</p>
          </div>
        )}

        {/* Opciones */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md mb-4">
          {options.map((option, index) => (
            <Button
              key={index}
              className={cn(
                "h-20 text-3xl relative",
                selectedOption === option && isCorrect === true
                  ? "bg-green-600 hover:bg-green-700"
                  : selectedOption === option && isCorrect === false
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
              )}
              onClick={() => handleOptionSelect(option)}
              disabled={isCorrect !== null}
            >
              {option}
              {selectedOption === option && isCorrect !== null && (
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

        {/* Botón de pista */}
        <Button
          variant="outline"
          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
          onClick={showHint}
          disabled={hint !== null || isCorrect !== null}
        >
          Mostrar pista
        </Button>
      </div>
    </div>
  )
}

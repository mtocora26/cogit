"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatternEvaluationProps {
  onComplete: (success: boolean, time: number, score: number) => void
}

// Tipos de patrones para la evaluación
type PatternType = "repetition" | "alternation" | "increment" | "fibonacci" | "random"

// Función para generar un patrón según el tipo
const generatePattern = (type: PatternType, length: number): string[] => {
  const elements = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "⭐", "🔶", "🔷"]
  const pattern: string[] = []

  switch (type) {
    case "repetition":
      // Patrón de repetición (A,A,B,B,A,A,...)
      const elemA = elements[Math.floor(Math.random() * elements.length)]
      const elemB = elements.filter((e) => e !== elemA)[Math.floor(Math.random() * (elements.length - 1))]

      for (let i = 0; i < length; i++) {
        pattern.push(Math.floor(i / 2) % 2 === 0 ? elemA : elemB)
      }
      break

    case "alternation":
      // Patrón de alternancia (A,B,A,B,...)
      const elemC = elements[Math.floor(Math.random() * elements.length)]
      const elemD = elements.filter((e) => e !== elemC)[Math.floor(Math.random() * (elements.length - 1))]

      for (let i = 0; i < length; i++) {
        pattern.push(i % 2 === 0 ? elemC : elemD)
      }
      break

    case "increment":
      // Patrón de incremento (A,B,C,A,B,C,...)
      const startIdx = Math.floor(Math.random() * (elements.length - 3))
      const patternLength = 3

      for (let i = 0; i < length; i++) {
        pattern.push(elements[(startIdx + (i % patternLength)) % elements.length])
      }
      break

    case "fibonacci":
      // Patrón tipo Fibonacci (usando índices)
      const selectedElements = elements.slice(0, Math.min(5, elements.length))
      let a = 0
      let b = 1

      for (let i = 0; i < length; i++) {
        pattern.push(selectedElements[a % selectedElements.length])
        const temp = a
        a = b
        b = (temp + b) % selectedElements.length
      }
      break

    case "random":
      // Patrón aleatorio (sin patrón real)
      for (let i = 0; i < length; i++) {
        pattern.push(elements[Math.floor(Math.random() * elements.length)])
      }
      break
  }

  return pattern
}

// Función para crear un patrón con un error
const createPatternWithError = (pattern: string[]): { patternWithError: string[]; errorIndex: number } => {
  const patternWithError = [...pattern]
  const errorIndex = 1 + Math.floor(Math.random() * (pattern.length - 2)) // Evitamos el primer y último elemento

  // Reemplazar el elemento en el índice de error con uno diferente
  const currentElement = patternWithError[errorIndex]
  const otherElements = ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤", "⭐", "🔶", "🔷"].filter(
    (e) => e !== currentElement,
  )
  patternWithError[errorIndex] = otherElements[Math.floor(Math.random() * otherElements.length)]

  return { patternWithError, errorIndex }
}

export default function PatternEvaluation({ onComplete }: PatternEvaluationProps) {
  const [patternType, setPatternType] = useState<PatternType>("repetition")
  const [originalPattern, setOriginalPattern] = useState<string[]>([])
  const [displayedPattern, setDisplayedPattern] = useState<string[]>([])
  const [hasError, setHasError] = useState(false)
  const [errorIndex, setErrorIndex] = useState<number | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(1)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [lives, setLives] = useState(3)
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
    // Elegir un tipo de patrón aleatorio
    const types: PatternType[] = ["repetition", "alternation", "increment", "fibonacci"]
    const newType = types[Math.floor(Math.random() * types.length)]
    setPatternType(newType)

    // Generar un nuevo patrón
    const patternLength = 6 + Math.min(round, 3) // Aumenta la dificultad con cada ronda
    const newPattern = generatePattern(newType, patternLength)
    setOriginalPattern(newPattern)

    // Decidir si este patrón tendrá un error (50% de probabilidad)
    const includeError = Math.random() < 0.5
    setHasError(includeError)

    if (includeError) {
      const { patternWithError, errorIndex } = createPatternWithError(newPattern)
      setDisplayedPattern(patternWithError)
      setErrorIndex(errorIndex)
    } else {
      setDisplayedPattern(newPattern)
      setErrorIndex(null)
    }

    setSelectedIndex(null)
    setIsCorrect(null)
  }

  // Manejar la selección de un elemento
  const handleElementSelect = (index: number) => {
    if (isCorrect !== null) return // Ya se ha respondido

    setSelectedIndex(index)

    // Verificar si la respuesta es correcta
    let correct = false

    if (hasError) {
      // Si hay un error, la respuesta es correcta si selecciona el índice del error
      correct = index === errorIndex
    } else {
      // Si no hay error, la respuesta es correcta si selecciona "No hay error"
      correct = index === -1
    }

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
    }, 2000)
  }

  // Obtener el título según el tipo de patrón
  const getPatternTitle = () => {
    switch (patternType) {
      case "repetition":
        return "Patrón de Repetición"
      case "alternation":
        return "Patrón de Alternancia"
      case "increment":
        return "Patrón de Incremento"
      case "fibonacci":
        return "Patrón de Fibonacci"
      case "random":
        return "Patrón Aleatorio"
      default:
        return "Evaluación de Patrones"
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
        <h2 className="text-2xl font-bold">Evaluación de Patrones</h2>
        <p className="text-gray-400 mt-1">
          Identifica si hay un error en el patrón. Si lo hay, selecciona el elemento incorrecto.
        </p>
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
        {/* Tipo de patrón */}
        <div className="bg-[#1a1d23] px-4 py-2 rounded-full text-sm text-gray-300 mb-4">{getPatternTitle()}</div>

        {/* Patrón */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {displayedPattern.map((item, index) => (
            <button
              key={index}
              className={cn(
                "w-14 h-14 flex items-center justify-center text-2xl rounded-lg transition-all",
                selectedIndex === index && isCorrect === true
                  ? "bg-green-600 border-2 border-green-400"
                  : selectedIndex === index && isCorrect === false
                    ? "bg-red-600 border-2 border-red-400"
                    : isCorrect !== null && index === errorIndex && hasError
                      ? "bg-green-600 border-2 border-green-400"
                      : "bg-[#1a1d23] border border-gray-700 hover:bg-[#2a2f3a]",
              )}
              onClick={() => handleElementSelect(index)}
              disabled={isCorrect !== null}
            >
              {item}
              {selectedIndex === index && isCorrect !== null && (
                <div className="absolute -top-2 -right-2">
                  {isCorrect ? (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-400" />
                  )}
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Opción "No hay error" */}
        <Button
          className={cn(
            "mb-4",
            selectedIndex === -1 && isCorrect === true
              ? "bg-green-600 hover:bg-green-700"
              : selectedIndex === -1 && isCorrect === false
                ? "bg-red-600 hover:bg-red-700"
                : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
          )}
          onClick={() => handleElementSelect(-1)}
          disabled={isCorrect !== null}
        >
          No hay error en el patrón
          {selectedIndex === -1 && isCorrect !== null && (
            <span className="ml-2">
              {isCorrect ? (
                <CheckCircle className="h-5 w-5 text-green-400 inline" />
              ) : (
                <XCircle className="h-5 w-5 text-red-400 inline" />
              )}
            </span>
          )}
        </Button>

        {/* Feedback */}
        {isCorrect !== null && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${isCorrect ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"}`}
          >
            {isCorrect ? (
              <p>
                ¡Correcto!{" "}
                {hasError
                  ? `Has identificado el error en la posición ${errorIndex! + 1}.`
                  : "No había ningún error en el patrón."}
              </p>
            ) : (
              <p>
                {hasError
                  ? `Incorrecto. Había un error en la posición ${errorIndex! + 1}.`
                  : "Incorrecto. No había ningún error en el patrón."}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

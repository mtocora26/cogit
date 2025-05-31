"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatternRecognitionProps {
  onComplete: (success: boolean, time: number, score: number) => void
}

// Definición de los tipos de patrones
type PatternType = "color" | "shape" | "direction"

// Definición de los elementos para cada tipo de patrón
const patternElements = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
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

export default function PatternRecognition({ onComplete }: PatternRecognitionProps) {
  const [patternType, setPatternType] = useState<PatternType>("color")
  const [pattern, setPattern] = useState<string[]>([])
  const [options, setOptions] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)

  // Inicializar el juego
  useEffect(() => {
    startNewRound()
  }, [])

  // Iniciar una nueva ronda
  const startNewRound = () => {
    // Elegir un tipo de patrón aleatorio
    const types: PatternType[] = ["color", "shape", "direction"]
    const newType = types[Math.floor(Math.random() * types.length)]
    setPatternType(newType)

    // Generar un nuevo patrón
    const patternLength = 5 // Fijo, sin dificultad progresiva
    const newPattern = generatePattern(newType, patternLength)
    setPattern(newPattern)

    // Generar opciones (incluye la respuesta correcta)
    const correctAnswer = getNextInPattern(newPattern)
    const elements = patternElements[newType].filter((e) => e !== correctAnswer)
    const shuffledElements = [...elements].sort(() => Math.random() - 0.5)
    const newOptions = [correctAnswer, ...shuffledElements.slice(0, 3)]
    setOptions(newOptions.sort(() => Math.random() - 0.5))

    setSelectedOption(null)
    setIsCorrect(null)
  }

  // Determinar el siguiente elemento en el patrón
  const getNextInPattern = (pat: string[]): string => {
    if (pat[0] === pat[2] && pat[1] === pat[3]) {
      return pat[pat.length % 2]
    } else if (pat[0] === pat[1] && pat[2] === pat[3]) {
      return pat[pat.length % 4 < 2 ? 0 : 2]
    } else {
      return pat[pat.length % pat.length]
    }
  }

  // Manejar la selección de una opción
  const handleOptionSelect = (option: string) => {
    if (isCorrect !== null) return
    setSelectedOption(option)
    const correctAnswer = getNextInPattern(pattern)
    const correct = option === correctAnswer
    setIsCorrect(correct)
    setTimeout(() => {
      startNewRound()
    }, 1200)
  }

  // Obtener el título según el tipo de patrón
  const getPatternTitle = () => {
    switch (patternType) {
      case "color":
        return "Patrón de Colores"
      case "shape":
        return "Patrón de Formas"
      case "direction":
        return "Patrón de Direcciones"
      default:
        return "Reconoce el Patrón"
    }
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{getPatternTitle()}</h2>
        <p className="text-gray-400 mt-1">¿Cuál es el siguiente elemento en la secuencia?</p>
      </div>
      <div className="flex flex-col items-center">
        {/* Patrón */}
        <div className="flex items-center justify-center gap-4 mb-8">
          {pattern.map((item, index) => (
            <div
              key={index}
              className="w-16 h-16 flex items-center justify-center text-3xl bg-[#1a1d23] rounded-lg border border-gray-700"
            >
              {item}
            </div>
          ))}
          <div className="w-16 h-16 flex items-center justify-center text-3xl bg-[#1a1d23] rounded-lg border border-gray-700 border-dashed">
            ?
          </div>
        </div>
        {/* Opciones */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
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
      </div>
    </div>
  )
}

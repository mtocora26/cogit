"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, RefreshCw, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorFinderProps {
  onComplete: (success: boolean, time: number) => void
}

// Definición de los escenarios con errores
interface Scenario {
  id: string
  title: string
  description: string
  steps: {
    id: string
    content: string
    hasError: boolean
    errorDescription?: string
  }[]
}

// Escenarios predefinidos
const scenarios: Scenario[] = [
  {
    id: "robot-path",
    title: "Ruta del Robot",
    description:
      "El robot debe llegar desde el punto A hasta el punto B. Identifica el paso incorrecto en la secuencia.",
    steps: [
      { id: "robot-1", content: "Avanzar 3 casillas hacia adelante", hasError: false },
      { id: "robot-2", content: "Girar 90° a la derecha", hasError: false },
      { id: "robot-3", content: "Avanzar 2 casillas hacia adelante", hasError: false },
      {
        id: "robot-4",
        content: "Girar 90° a la izquierda",
        hasError: true,
        errorDescription: "Debería girar a la derecha para evitar el obstáculo",
      },
      { id: "robot-5", content: "Avanzar 4 casillas hacia adelante", hasError: false },
      { id: "robot-6", content: "Girar 90° a la derecha", hasError: false },
      { id: "robot-7", content: "Avanzar 1 casilla hacia adelante", hasError: false },
    ],
  },
  {
    id: "recipe",
    title: "Receta de Pastel",
    description: "Identifica el paso incorrecto en la receta para preparar un pastel.",
    steps: [
      { id: "recipe-1", content: "Precalentar el horno a 180°C", hasError: false },
      { id: "recipe-2", content: "Mezclar harina, azúcar y polvo de hornear", hasError: false },
      { id: "recipe-3", content: "Añadir huevos y mantequilla derretida", hasError: false },
      {
        id: "recipe-4",
        content: "Agregar sal y pimienta al gusto",
        hasError: true,
        errorDescription: "La pimienta no se usa en un pastel dulce",
      },
      { id: "recipe-5", content: "Verter la mezcla en un molde", hasError: false },
      { id: "recipe-6", content: "Hornear durante 30-35 minutos", hasError: false },
      { id: "recipe-7", content: "Dejar enfriar antes de decorar", hasError: false },
    ],
  },
  {
    id: "math",
    title: "Resolución de Ecuación",
    description: "Identifica el paso incorrecto en la resolución de esta ecuación matemática: 2x + 6 = 14",
    steps: [
      { id: "math-1", content: "2x + 6 = 14", hasError: false },
      { id: "math-2", content: "2x = 14 - 6", hasError: false },
      { id: "math-3", content: "2x = 8", hasError: false },
      { id: "math-4", content: "x = 8 + 2", hasError: true, errorDescription: "Debería ser x = 8 ÷ 2" },
      { id: "math-5", content: "x = 10", hasError: false },
    ],
  },
  {
    id: "email-workflow",
    title: "Envío de Correo Electrónico",
    description: "Identifica el paso incorrecto en el proceso de enviar un correo electrónico importante.",
    steps: [
      { id: "email-1", content: "Abrir el programa de correo electrónico", hasError: false },
      { id: "email-2", content: "Hacer clic en 'Nuevo mensaje'", hasError: false },
      { id: "email-3", content: "Escribir el asunto del correo", hasError: false },
      { id: "email-4", content: "Redactar el mensaje", hasError: false },
      {
        id: "email-5",
        content: "Hacer clic en 'Enviar'",
        hasError: true,
        errorDescription: "Falta añadir la dirección del destinatario",
      },
      { id: "email-6", content: "Verificar que el mensaje aparezca en 'Enviados'", hasError: false },
    ],
  },
]

export default function ErrorFinder({ onComplete }: ErrorFinderProps) {
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null)
  const [selectedStep, setSelectedStep] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const [showErrorDescription, setShowErrorDescription] = useState(false)
  const maxAttempts = 2

  // Inicializar el juego
  useEffect(() => {
    startNewGame()
  }, [])

  // Actualizar el tiempo transcurrido
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isComplete) {
        setTimeElapsed(Math.floor((Date.now() - startTime) / 1000))
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [startTime, isComplete])

  // Iniciar un nuevo juego
  const startNewGame = () => {
    // Seleccionar un escenario aleatorio
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    setCurrentScenario(randomScenario)

    setSelectedStep(null)
    setIsComplete(false)
    setIsCorrect(false)
    setStartTime(Date.now())
    setTimeElapsed(0)
    setAttempts(0)
    setShowErrorDescription(false)
  }

  // Manejar la selección de un paso
  const handleStepSelect = (stepId: string) => {
    if (isComplete) return

    setSelectedStep(stepId)
  }

  // Verificar si el paso seleccionado tiene el error
  const checkSelection = () => {
    if (!currentScenario || !selectedStep) return

    const selectedStepObj = currentScenario.steps.find((step) => step.id === selectedStep)

    if (selectedStepObj) {
      const correct = selectedStepObj.hasError
      setIsComplete(true)
      setIsCorrect(correct)

      // Incrementar el número de intentos
      const newAttempts = attempts + 1
      setAttempts(newAttempts)

      // Si es correcto o se han agotado los intentos, mostrar la descripción del error
      if (correct || newAttempts >= maxAttempts) {
        setShowErrorDescription(true)

        // Completar el nivel después de un tiempo
        setTimeout(() => {
          onComplete(correct, timeElapsed)
        }, 3000)
      }
    }
  }

  // Reintentar con el mismo escenario
  const retry = () => {
    setSelectedStep(null)
    setIsComplete(false)
    setIsCorrect(false)
    setShowErrorDescription(false)
  }

  // Encontrar el paso con error
  const getErrorStep = () => {
    if (!currentScenario) return null
    return currentScenario.steps.find((step) => step.hasError)
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{currentScenario?.title || "Encuentra el Error"}</h2>
        <p className="text-gray-400 mt-1">
          {currentScenario?.description || "Identifica el paso incorrecto en la secuencia"}
        </p>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Intentos:</div>
          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
            {attempts}/{maxAttempts}
          </div>
        </div>
        <div className="mx-4 text-gray-500">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Tiempo:</div>
          <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">{timeElapsed}s</div>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {currentScenario?.steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "p-4 rounded-lg border cursor-pointer transition-all",
              selectedStep === step.id
                ? "bg-blue-500/20 border-blue-500"
                : "bg-[#1a1d23] border-gray-700 hover:bg-[#2a2f3a]",
              isComplete && step.hasError && "bg-green-500/20 border-green-500",
              isComplete && selectedStep === step.id && !step.hasError && "bg-red-500/20 border-red-500",
            )}
            onClick={() => handleStepSelect(step.id)}
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-[#2a2f3a] flex items-center justify-center mr-4">{index + 1}</div>
              <div>{step.content}</div>
              {isComplete && step.hasError && (
                <div className="ml-auto">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
              )}
            </div>

            {showErrorDescription && step.hasError && (
              <div className="mt-2 p-2 bg-red-500/10 rounded-md text-sm text-red-400">
                Error: {step.errorDescription}
              </div>
            )}
          </div>
        ))}
      </div>

      {!isComplete ? (
        <Button onClick={checkSelection} className="w-full bg-blue-600 hover:bg-blue-700" disabled={!selectedStep}>
          Verificar selección
        </Button>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
            )}
          >
            {isCorrect ? <CheckCircle className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
          </div>
          <h3 className="text-xl font-bold mb-2">{isCorrect ? "¡Error encontrado!" : "Selección incorrecta"}</h3>
          <p className="text-gray-400 mb-4">
            {isCorrect
              ? `¡Buen trabajo! Has identificado correctamente el error en ${timeElapsed} segundos.`
              : attempts >= maxAttempts
                ? `El error estaba en el paso: "${getErrorStep()?.content}"`
                : "Ese paso es correcto. Intenta de nuevo."}
          </p>
          {isCorrect || attempts >= maxAttempts ? (
            <Button onClick={startNewGame} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Nuevo escenario
            </Button>
          ) : (
            <Button onClick={retry} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Intentar de nuevo
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, RefreshCw, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface SequenceOrderingProps {
  onComplete: (success: boolean, time: number) => void
}

// Definición de las secuencias
interface Sequence {
  id: string
  title: string
  description: string
  steps: {
    id: string
    content: string
    order: number
  }[]
}

// Secuencias predefinidas (3 rondas, dificultad progresiva)
const sequences: Sequence[] = [
  {
    id: "lemonade",
    title: "Preparar una limonada",
    description: "Ordena los pasos para preparar una refrescante limonada",
    steps: [
      { id: "lemonade-1", content: "Cortar los limones por la mitad", order: 1 },
      { id: "lemonade-2", content: "Exprimir los limones", order: 2 },
      { id: "lemonade-3", content: "Añadir agua", order: 3 },
      { id: "lemonade-4", content: "Agregar azúcar al gusto", order: 4 },
      { id: "lemonade-5", content: "Mezclar bien todos los ingredientes", order: 5 },
      { id: "lemonade-6", content: "Servir con hielo", order: 6 },
    ],
  },
  {
    id: "morning",
    title: "Rutina matutina",
    description: "Ordena los pasos de una rutina matutina típica",
    steps: [
      { id: "morning-1", content: "Despertar y apagar la alarma", order: 1 },
      { id: "morning-2", content: "Levantarse de la cama", order: 2 },
      { id: "morning-3", content: "Lavarse la cara y los dientes", order: 3 },
      { id: "morning-4", content: "Vestirse", order: 4 },
      { id: "morning-5", content: "Desayunar", order: 5 },
      { id: "morning-6", content: "Salir de casa", order: 6 },
    ],
  },
  {
    id: "email",
    title: "Enviar un correo electrónico",
    description: "Ordena los pasos para enviar un correo electrónico",
    steps: [
      { id: "email-1", content: "Abrir el programa de correo", order: 1 },
      { id: "email-2", content: "Hacer clic en 'Nuevo mensaje'", order: 2 },
      { id: "email-3", content: "Escribir la dirección del destinatario", order: 3 },
      { id: "email-4", content: "Escribir el asunto del correo", order: 4 },
      { id: "email-5", content: "Redactar el mensaje", order: 5 },
      { id: "email-6", content: "Enviar el correo", order: 6 },
    ],
  },
]
const MAX_ROUNDS = sequences.length

export default function SequenceOrdering({ onComplete }: SequenceOrderingProps) {
  const [round, setRound] = useState(1)
  const [steps, setSteps] = useState(() => shuffle([...sequences[0].steps]))
  const [completed, setCompleted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [startTime] = useState(Date.now())

  const currentSequence = sequences[round - 1]

  // Al finalizar ronda, pasar a la siguiente
  const handleCheck = () => {
    const ok = steps.every((step, idx) => step.order === idx + 1)
    setCompleted(true)
    setSuccess(ok)
    setFeedback(ok ? "¡Secuencia correcta!" : "Hay pasos fuera de orden.")
    setTimeout(() => {
      if (ok && round < MAX_ROUNDS) {
        setRound(round + 1)
        setSteps(shuffle([...sequences[round].steps]))
        setCompleted(false)
        setSuccess(false)
        setFeedback(null)
      } else if (ok && round === MAX_ROUNDS) {
        onComplete(true, Math.floor((Date.now() - startTime) / 1000))
      }
    }, 2000)
  }

  // Mezclar el arreglo
  function shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{currentSequence?.title || "Ordena la secuencia"}</h2>
        <p className="text-gray-400 mt-1">
          {currentSequence?.description || "Arrastra los pasos para ordenarlos correctamente"}
        </p>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Ronda:</div>
          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
            {round}/{MAX_ROUNDS}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-8">
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={cn(
              "p-4 rounded-lg border flex items-center",
              completed &&
                currentSequence?.steps.find((s) => s.id === step.id)?.order ===
                  index + 1
                ? "bg-green-500/20 border-green-500"
                : completed
                ? "bg-red-500/20 border-red-500"
                : "bg-[#1a1d23] border-gray-700"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-[#2a2f3a] flex items-center justify-center mr-4">
              {index + 1}
            </div>
            <div>{step.content}</div>
          </div>
        ))}
      </div>
      {!completed ? (
        <Button onClick={handleCheck} className="w-full bg-blue-600 hover:bg-blue-700" disabled={steps.length === 0}>
          Verificar orden
        </Button>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              success ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
            )}
          >
            {success ? <CheckCircle className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
          </div>
          <h3 className="text-xl font-bold mb-2">{success ? "¡Secuencia correcta!" : "Secuencia incorrecta"}</h3>
          <p className="text-gray-400 mb-4">
            {success
              ? `¡Excelente trabajo! Has ordenado la secuencia correctamente.`
              : "Intenta reorganizar los pasos y vuelve a verificar."}
          </p>
          {!success && (
            <Button onClick={() => {
              setSteps(shuffle([...currentSequence.steps]))
              setCompleted(false)
              setSuccess(false)
              setFeedback(null)
            }} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Reintentar ronda
            </Button>
          )}
        </div>
      )}
    </div>
  )
}

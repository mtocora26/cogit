import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Step {
  id: number
  text: string
}

interface SequenceOrderingProps {
  steps: Step[]
  onComplete: (success: boolean, time: number) => void
  maxAttempts?: number
  maxRounds?: number // NUEVO
}

// --- NUEVO: Banco de ejercicios variados para cada ronda ---
const EXERCISE_BANK: Step[][] = [
  [
    { id: 1, text: "Lávate las manos" },
    { id: 2, text: "Pon agua en la olla" },
    { id: 3, text: "Enciende la estufa" },
    { id: 4, text: "Coloca la olla en la estufa" },
  ],
  [
    { id: 1, text: "Coloca la pasta en la olla" },
    { id: 2, text: "Agrega sal al agua" },
    { id: 3, text: "Espera a que hierva" },
    { id: 4, text: "Revuelve la pasta" },
  ],
  [
    { id: 1, text: "Abre la puerta" },
    { id: 2, text: "Entra a la casa" },
    { id: 3, text: "Cierra la puerta" },
    { id: 4, text: "Saluda a la familia" },
  ],
  [
    { id: 1, text: "Coloca la ropa en la lavadora" },
    { id: 2, text: "Agrega detergente" },
    { id: 3, text: "Selecciona el ciclo" },
    { id: 4, text: "Enciende la lavadora" },
  ],
  [
    { id: 1, text: "Saca el cepillo de dientes" },
    { id: 2, text: "Pon pasta dental" },
    { id: 3, text: "Cepilla los dientes" },
    { id: 4, text: "Enjuaga la boca" },
  ],
]

export default function SequenceOrdering({ steps, onComplete, maxAttempts = 2, maxRounds = 5 }: SequenceOrderingProps) {
  const [order, setOrder] = useState(steps.map((s) => s.id))
  const [completed, setCompleted] = useState(false)
  const [success, setSuccess] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [startTime] = useState(Date.now())
  const [feedback, setFeedback] = useState<string | null>(null)
  const [round, setRound] = useState(1)
  const [exerciseIndex, setExerciseIndex] = useState(0)

  // Al iniciar, usar el primer ejercicio
  useEffect(() => {
    setOrder(EXERCISE_BANK[0].map((s) => s.id))
  }, [])

  const handleMove = (from: number, to: number) => {
    if (completed) return
    const newOrder = [...order]
    const [removed] = newOrder.splice(from, 1)
    newOrder.splice(to, 0, removed)
    setOrder(newOrder)
  }

  const checkOrder = () => {
    const currentSteps = EXERCISE_BANK[exerciseIndex]
    const isCorrect = order.every((id, idx) => id === currentSteps[idx].id)
    setCompleted(true)
    setSuccess(isCorrect)
    setAttempts((a) => a + 1)
    setFeedback(isCorrect ? "¡Correcto! Has ordenado los pasos correctamente." : "Revisa el orden e inténtalo de nuevo.")
    setTimeout(() => {
      if (round < maxRounds) {
        const nextIndex = (exerciseIndex + 1) % EXERCISE_BANK.length
        setExerciseIndex(nextIndex)
        setOrder(EXERCISE_BANK[nextIndex].map((s) => s.id))
        setCompleted(false)
        setSuccess(false)
        setFeedback(null)
        setAttempts(0)
        setRound(round + 1)
      } else {
        onComplete(isCorrect, Math.floor((Date.now() - startTime) / 1000))
      }
    }, 2000)
  }

  const reset = () => {
    setOrder(EXERCISE_BANK[exerciseIndex].map((s) => s.id))
    setCompleted(false)
    setSuccess(false)
    setFeedback(null)
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Ordena los pasos</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-400">Ronda:</span>
        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
          {round}/{maxRounds}
        </span>
      </div>
      <div className="space-y-2 mb-6">
        {order.map((id, idx) => {
          const step = EXERCISE_BANK[exerciseIndex].find((s) => s.id === id)!
          return (
            <div
              key={step.id}
              className={cn(
                "bg-[#23283a] rounded p-3 flex items-center gap-2 border border-gray-700 shadow-sm",
                completed && !success && "opacity-70"
              )}
            >
              <span className="font-bold text-lg">{idx + 1}.</span>
              <span className="flex-1">{step.text}</span>
              {!completed && idx > 0 && (
                <Button size="sm" variant="outline" onClick={() => handleMove(idx, idx - 1)}>
                  ↑
                </Button>
              )}
              {!completed && idx < order.length - 1 && (
                <Button size="sm" variant="outline" onClick={() => handleMove(idx, idx + 1)}>
                  ↓
                </Button>
              )}
            </div>
          )
        })}
      </div>
      {feedback && <div className={cn("mb-4 font-semibold", success ? "text-green-400" : "text-yellow-400")}>{feedback}</div>}
      {!completed && (
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={checkOrder}>
          Comprobar orden
        </Button>
      )}
      {completed && !success && attempts < maxAttempts && (
        <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700" onClick={reset}>
          Intentar de nuevo
        </Button>
      )}
      {completed && !success && attempts >= maxAttempts && (
        <div className="mt-4 text-red-400 font-semibold">Has alcanzado el número máximo de intentos.</div>
      )}
    </div>
  )
}

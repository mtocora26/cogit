"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
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

// Secuencias predefinidas
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
      { id: "email-6", content: "Hacer clic en 'Enviar'", order: 6 },
    ],
  },
  {
    id: "plant",
    title: "Plantar una semilla",
    description: "Ordena los pasos para plantar una semilla correctamente",
    steps: [
      { id: "plant-1", content: "Preparar la maceta con tierra", order: 1 },
      { id: "plant-2", content: "Hacer un pequeño agujero en la tierra", order: 2 },
      { id: "plant-3", content: "Colocar la semilla en el agujero", order: 3 },
      { id: "plant-4", content: "Cubrir la semilla con tierra", order: 4 },
      { id: "plant-5", content: "Regar con agua", order: 5 },
      { id: "plant-6", content: "Colocar en un lugar con luz solar", order: 6 },
    ],
  },
]

export default function SequenceOrdering({ onComplete }: SequenceOrderingProps) {
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null)
  const [steps, setSteps] = useState<{ id: string; content: string; order: number }[]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const maxAttempts = 3

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
    // Seleccionar una secuencia aleatoria
    const randomSequence = sequences[Math.floor(Math.random() * sequences.length)]
    setCurrentSequence(randomSequence)

    // Mezclar los pasos
    const shuffledSteps = [...randomSequence.steps].sort(() => Math.random() - 0.5)
    setSteps(shuffledSteps)

    setIsComplete(false)
    setIsCorrect(false)
    setStartTime(Date.now())
    setTimeElapsed(0)
    setAttempts(0)
  }

  // Manejar el arrastre y soltar
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Si no hay destino, el elemento fue soltado fuera de un área válida
    if (!destination) return

    // Reordenar los pasos
    const reorderedSteps = Array.from(steps)
    const [removed] = reorderedSteps.splice(source.index, 1)
    reorderedSteps.splice(destination.index, 0, removed)

    setSteps(reorderedSteps)
  }

  // Verificar el orden de los pasos
  const checkOrder = () => {
    if (!currentSequence) return

    // Comparar el orden actual con el orden correcto
    const isOrderCorrect = steps.every((step, index) => {
      const correctStep = currentSequence.steps.find((s) => s.id === step.id)
      return correctStep && correctStep.order === index + 1
    })

    setIsComplete(true)
    setIsCorrect(isOrderCorrect)

    // Incrementar el número de intentos
    const newAttempts = attempts + 1
    setAttempts(newAttempts)

    // Si es correcto o se han agotado los intentos, completar el nivel
    if (isOrderCorrect || newAttempts >= maxAttempts) {
      setTimeout(() => {
        onComplete(isOrderCorrect, timeElapsed)
      }, 2000)
    }
  }

  // Reintentar con el mismo orden
  const retry = () => {
    setIsComplete(false)
    setIsCorrect(false)
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

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="steps">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="space-y-2 mb-8">
              {steps.map((step, index) => (
                <Draggable key={step.id} draggableId={step.id} index={index} isDragDisabled={isComplete}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "p-4 rounded-lg border flex items-center",
                        snapshot.isDragging ? "bg-blue-500/20 border-blue-500" : "bg-[#1a1d23] border-gray-700",
                        isComplete && currentSequence?.steps.find((s) => s.id === step.id)?.order === index + 1
                          ? "bg-green-500/20 border-green-500"
                          : isComplete
                            ? "bg-red-500/20 border-red-500"
                            : "",
                      )}
                    >
                      <div className="w-8 h-8 rounded-full bg-[#2a2f3a] flex items-center justify-center mr-4">
                        {index + 1}
                      </div>
                      <div>{step.content}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {!isComplete ? (
        <Button onClick={checkOrder} className="w-full bg-blue-600 hover:bg-blue-700" disabled={steps.length === 0}>
          Verificar orden
        </Button>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500",
            )}
          >
            {isCorrect ? <CheckCircle className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
          </div>
          <h3 className="text-xl font-bold mb-2">{isCorrect ? "¡Secuencia correcta!" : "Secuencia incorrecta"}</h3>
          <p className="text-gray-400 mb-4">
            {isCorrect
              ? `¡Excelente trabajo! Has ordenado la secuencia correctamente en ${timeElapsed} segundos.`
              : attempts >= maxAttempts
                ? "Has agotado todos tus intentos."
                : "Intenta reorganizar los pasos y vuelve a verificar."}
          </p>
          {isCorrect || attempts >= maxAttempts ? (
            <Button onClick={startNewGame} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              Nueva secuencia
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

"use client"

import { useState, useEffect } from "react"
import { DndContext, useDroppable, useDraggable } from "@dnd-kit/core"
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers"
import { Button } from "@/components/ui/button"
import { CheckCircle, RefreshCw } from "lucide-react"
import { cn } from "@/lib/utils"

interface ClassificationGameProps {
  onComplete: (success: boolean, time: number) => void
}

// Definición de los tipos de categorías
type CategoryType = "fruits" | "tools" | "shapes" | "animals" | "vehicles"

// Definición de los elementos para cada categoría
const categoryItems = {
  fruits: [
    { id: "apple", content: "🍎", category: "fruits" as CategoryType },
    { id: "banana", content: "🍌", category: "fruits" as CategoryType },
    { id: "orange", content: "🍊", category: "fruits" as CategoryType },
    { id: "grapes", content: "🍇", category: "fruits" as CategoryType },
    { id: "watermelon", content: "🍉", category: "fruits" as CategoryType },
    { id: "strawberry", content: "🍓", category: "fruits" as CategoryType },
  ],
  tools: [
    { id: "hammer", content: "🔨", category: "tools" as CategoryType },
    { id: "wrench", content: "🔧", category: "tools" as CategoryType },
    { id: "screwdriver", content: "🪛", category: "tools" as CategoryType },
    { id: "saw", content: "🪚", category: "tools" as CategoryType },
    { id: "axe", content: "🪓", category: "tools" as CategoryType },
    { id: "pliers", content: "🗜️", category: "tools" as CategoryType },
  ],
  shapes: [
    { id: "circle", content: "⭕", category: "shapes" as CategoryType },
    { id: "square", content: "⬛", category: "shapes" as CategoryType },
    { id: "triangle", content: "🔺", category: "shapes" as CategoryType },
    { id: "diamond", content: "🔷", category: "shapes" as CategoryType },
    { id: "rectangle", content: "▬", category: "shapes" as CategoryType },
    { id: "star", content: "⭐", category: "shapes" as CategoryType },
  ],
  animals: [
    { id: "dog", content: "🐕", category: "animals" as CategoryType },
    { id: "cat", content: "🐈", category: "animals" as CategoryType },
    { id: "rabbit", content: "🐇", category: "animals" as CategoryType },
    { id: "horse", content: "🐎", category: "animals" as CategoryType },
    { id: "elephant", content: "🐘", category: "animals" as CategoryType },
    { id: "lion", content: "🦁", category: "animals" as CategoryType },
  ],
  vehicles: [
    { id: "car", content: "🚗", category: "vehicles" as CategoryType },
    { id: "bus", content: "🚌", category: "vehicles" as CategoryType },
    { id: "train", content: "🚂", category: "vehicles" as CategoryType },
    { id: "airplane", content: "✈️", category: "vehicles" as CategoryType },
    { id: "ship", content: "🚢", category: "vehicles" as CategoryType },
    { id: "motorcycle", content: "🏍️", category: "vehicles" as CategoryType },
  ],
}

// Nombres de las categorías en español
const categoryNames = {
  fruits: "Frutas",
  tools: "Herramientas",
  shapes: "Formas",
  animals: "Animales",
  vehicles: "Vehículos",
}

interface Item {
  id: string
  content: string
  category: CategoryType
}

export default function ClassificationGame({ onComplete }: ClassificationGameProps) {
  const [categories, setCategories] = useState<CategoryType[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [itemsInCategories, setItemsInCategories] = useState<Record<string, Item[]>>({})
  const [isComplete, setIsComplete] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [score, setScore] = useState(0)
  const [maxScore, setMaxScore] = useState(0)
  // --- RONDAS PARA NIVEL 2 ---
  const MAX_ROUNDS = 5
  const [round, setRound] = useState(1)

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
    // Seleccionar 2 categorías aleatorias
    const allCategories: CategoryType[] = ["fruits", "tools", "shapes", "animals", "vehicles"]
    const shuffledCategories = [...allCategories].sort(() => Math.random() - 0.5)
    const selectedCategories = shuffledCategories.slice(0, 2) as CategoryType[]
    setCategories(selectedCategories)

    // Seleccionar 4 elementos de cada categoría
    let allItems: Item[] = []
    selectedCategories.forEach((category) => {
      const categoryItemsList = [...categoryItems[category]].sort(() => Math.random() - 0.5).slice(0, 4)
      allItems = [...allItems, ...categoryItemsList]
    })

    // Mezclar los elementos
    const shuffledItems = [...allItems].sort(() => Math.random() - 0.5)
    setItems(shuffledItems)

    // Inicializar las categorías vacías
    const initialCategories: Record<string, Item[]> = {}
    selectedCategories.forEach((category) => {
      initialCategories[category] = []
    })
    setItemsInCategories(initialCategories)

    setIsComplete(false)
    setStartTime(Date.now())
    setTimeElapsed(0)
    setScore(0)
    setMaxScore(allItems.length)
    setRound(1)
  }

  // Manejar el arrastre y soltar
  const handleDragEnd = (event: any) => {
    const { active, over } = event

    // Si no hay destino, el elemento fue soltado fuera de un área válida
    if (!over) return

    // Si el origen es "items" y el destino es una categoría
    if (active.data.current.droppableId === "items" && over.id !== "items") {
      const category = over.id as CategoryType
      const itemIndex = active.data.current.index
      const item = items[itemIndex]

      // Eliminar el elemento de la lista de items
      const newItems = [...items]
      newItems.splice(itemIndex, 1)
      setItems(newItems)

      // Añadir el elemento a la categoría
      const newItemsInCategories = { ...itemsInCategories }
      newItemsInCategories[category] = [...newItemsInCategories[category], item]
      setItemsInCategories(newItemsInCategories)

      // Verificar si el elemento está en la categoría correcta
      if (item.category === category) {
        setScore(score + 1)
      }

      // Verificar si se han clasificado todos los elementos
      if (newItems.length === 0) {
        setIsComplete(true)
        setTimeout(() => {
          if (round < MAX_ROUNDS) {
            setRound(round + 1)
            startNewGame()
          } else {
            onComplete(score + (item.category === category ? 1 : 0) >= maxScore * 0.75, timeElapsed)
          }
        }, 2000)
      }
    }
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Clasifica y Agrupa</h2>
        <p className="text-gray-400 mt-1">Arrastra cada elemento a su categoría correspondiente</p>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Ronda:</div>
          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
            {round}/{MAX_ROUNDS}
          </div>
        </div>
        <div className="mx-4 text-gray-500">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Puntuación:</div>
          <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full text-sm">
            {score}/{maxScore}
          </div>
        </div>
        <div className="mx-4 text-gray-500">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Tiempo:</div>
          <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">{timeElapsed}s</div>
        </div>
      </div>

      <DndContext onDragEnd={handleDragEnd} modifiers={[restrictToHorizontalAxis]}>
        {/* Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => {
            const { setNodeRef: setDroppableRef } = useDroppable({
              id: category,
            })
            return (
              <div
                key={category}
                ref={setDroppableRef}
                className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700"
              >
                <h3 className="text-lg font-bold mb-4 text-center">{categoryNames[category]}</h3>
                <div className="min-h-[100px] flex flex-wrap gap-2 p-2 rounded-lg border border-dashed">
                  {itemsInCategories[category]?.map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        "w-12 h-12 flex items-center justify-center text-2xl rounded-lg",
                        item.category === category ? "bg-green-500/20" : "bg-red-500/20",
                      )}
                    >
                      {item.content}
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Elementos para clasificar */}
        <div className="min-h-[100px] flex flex-wrap gap-4 p-4 rounded-lg border border-dashed">
          {items.map((item) => {
            const { attributes, listeners, setNodeRef: setDraggableRef } = useDraggable({
              id: item.id,
            })
            return (
              <div
                key={item.id}
                ref={setDraggableRef}
                {...listeners}
                {...attributes}
                className={cn(
                  "w-16 h-16 flex items-center justify-center text-3xl bg-[#2a2f3a] rounded-lg border border-gray-700",
                )}
              >
                {item.content}
              </div>
            )
          })}
        </div>
      </DndContext>

      {isComplete && (
        <div className="mt-8 flex flex-col items-center">
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4",
              score >= maxScore * 0.75 ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500",
            )}
          >
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">
            {score >= maxScore * 0.75 ? "¡Excelente trabajo!" : "¡Buen intento!"}
          </h3>
          <p className="text-gray-400 mb-4">
            Has clasificado correctamente {score} de {maxScore} elementos.
          </p>
          <Button onClick={startNewGame} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Jugar de nuevo
          </Button>
        </div>
      )}
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { DragDropContext, Droppable, Draggable, type DropResult } from "react-beautiful-dnd"
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
    { id: "apple", content: "🍎", category: "fruits" },
    { id: "banana", content: "🍌", category: "fruits" },
    { id: "orange", content: "🍊", category: "fruits" },
    { id: "grapes", content: "🍇", category: "fruits" },
    { id: "watermelon", content: "🍉", category: "fruits" },
    { id: "strawberry", content: "🍓", category: "fruits" },
  ],
  tools: [
    { id: "hammer", content: "🔨", category: "tools" },
    { id: "wrench", content: "🔧", category: "tools" },
    { id: "screwdriver", content: "🪛", category: "tools" },
    { id: "saw", content: "🪚", category: "tools" },
    { id: "axe", content: "🪓", category: "tools" },
    { id: "pliers", content: "🗜️", category: "tools" },
  ],
  shapes: [
    { id: "circle", content: "⭕", category: "shapes" },
    { id: "square", content: "⬛", category: "shapes" },
    { id: "triangle", content: "🔺", category: "shapes" },
    { id: "diamond", content: "🔷", category: "shapes" },
    { id: "rectangle", content: "▬", category: "shapes" },
    { id: "star", content: "⭐", category: "shapes" },
  ],
  animals: [
    { id: "dog", content: "🐕", category: "animals" },
    { id: "cat", content: "🐈", category: "animals" },
    { id: "rabbit", content: "🐇", category: "animals" },
    { id: "horse", content: "🐎", category: "animals" },
    { id: "elephant", content: "🐘", category: "animals" },
    { id: "lion", content: "🦁", category: "animals" },
  ],
  vehicles: [
    { id: "car", content: "🚗", category: "vehicles" },
    { id: "bus", content: "🚌", category: "vehicles" },
    { id: "train", content: "🚂", category: "vehicles" },
    { id: "airplane", content: "✈️", category: "vehicles" },
    { id: "ship", content: "🚢", category: "vehicles" },
    { id: "motorcycle", content: "🏍️", category: "vehicles" },
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
  }

  // Manejar el arrastre y soltar
  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result

    // Si no hay destino, el elemento fue soltado fuera de un área válida
    if (!destination) return

    // Si el origen es "items" y el destino es una categoría
    if (source.droppableId === "items" && destination.droppableId !== "items") {
      const category = destination.droppableId as CategoryType
      const itemIndex = source.index
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
        // Esperar un momento y luego completar el nivel
        setTimeout(() => {
          onComplete(score + (item.category === category ? 1 : 0) >= maxScore * 0.75, timeElapsed)
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

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {categories.map((category) => (
            <div key={category} className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-center">{categoryNames[category]}</h3>
              <Droppable droppableId={category} direction="horizontal">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={cn(
                      "min-h-[100px] flex flex-wrap gap-2 p-2 rounded-lg border border-dashed",
                      snapshot.isDraggingOver ? "border-blue-500 bg-blue-500/10" : "border-gray-600",
                    )}
                  >
                    {itemsInCategories[category]?.map((item, index) => (
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
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>

        {/* Elementos para clasificar */}
        <Droppable droppableId="items" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "min-h-[100px] flex flex-wrap gap-4 p-4 rounded-lg border border-dashed",
                snapshot.isDraggingOver ? "border-purple-500 bg-purple-500/10" : "border-gray-600",
              )}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={cn(
                        "w-16 h-16 flex items-center justify-center text-3xl bg-[#2a2f3a] rounded-lg border border-gray-700",
                        snapshot.isDragging && "border-purple-500 shadow-lg",
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

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

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle, RefreshCw, Save, Play, Pause } from "lucide-react"
import { cn } from "@/lib/utils"

interface PatternCreatorProps {
  onComplete: (success: boolean, time: number) => void
}

// Tipos de elementos para crear patrones
type ElementType = "color" | "shape" | "direction" | "number"

// Elementos disponibles para cada tipo
const elements = {
  color: ["🔴", "🟠", "🟡", "🟢", "🔵", "🟣", "⚫", "⚪", "🟤"],
  shape: ["⭐", "🔶", "🔷", "⬛", "⬜", "🔺", "🔻", "⭕", "🔘"],
  direction: ["⬆️", "➡️", "⬇️", "⬅️", "↗️", "↘️", "↙️", "↖️", "↔️"],
  number: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
}

export default function PatternCreator({ onComplete }: PatternCreatorProps) {
  const [elementType, setElementType] = useState<ElementType>("color")
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [pattern, setPattern] = useState<string[]>([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewIndex, setPreviewIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)

  const minPatternLength = 4
  const maxPatternLength = 8

  // Inicializar
  useEffect(() => {
    setStartTime(Date.now())
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

  // Manejar la reproducción automática del patrón
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying && pattern.length > 0) {
      interval = setInterval(() => {
        setPreviewIndex((prevIndex) => (prevIndex + 1) % pattern.length)
      }, 800)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, pattern])

  // Seleccionar un elemento
  const selectElement = (element: string) => {
    if (selectedElements.includes(element)) {
      setSelectedElements(selectedElements.filter((e) => e !== element))
    } else {
      setSelectedElements([...selectedElements, element])
    }
  }

  // Añadir un elemento al patrón
  const addToPattern = (element: string) => {
    if (pattern.length < maxPatternLength) {
      setPattern([...pattern, element])
    }
  }

  // Eliminar el último elemento del patrón
  const removeLastFromPattern = () => {
    if (pattern.length > 0) {
      setPattern(pattern.slice(0, -1))
    }
  }

  // Limpiar el patrón
  const clearPattern = () => {
    setPattern([])
  }

  // Alternar entre modo de edición y vista previa
  const togglePreviewMode = () => {
    setIsPreviewMode(!isPreviewMode)
    setPreviewIndex(0)
    setIsPlaying(false)
  }

  // Iniciar/pausar la reproducción automática
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  // Verificar si el patrón es válido
  const validatePattern = () => {
    // Verificar longitud mínima
    if (pattern.length < minPatternLength) {
      setFeedback(`El patrón debe tener al menos ${minPatternLength} elementos`)
      return false
    }

    // Verificar si hay un patrón reconocible
    // Un patrón válido debe tener alguna repetición o secuencia lógica

    // Verificar repetición simple (A,B,A,B,...)
    let hasPattern = false

    // Verificar repetición de 2 elementos
    if (pattern.length >= 4) {
      const isAlternating = pattern.every((elem, i) => (i % 2 === 0 ? elem === pattern[0] : elem === pattern[1]))
      if (isAlternating) hasPattern = true
    }

    // Verificar repetición de 3 elementos
    if (pattern.length >= 6) {
      const isRepeatingThree = pattern.every((elem, i) => elem === pattern[i % 3])
      if (isRepeatingThree) hasPattern = true
    }

    // Verificar secuencia creciente/decreciente (para números)
    if (elementType === "number" && pattern.length >= 4) {
      const numericValues = pattern.map((p) => Number.parseInt(p.charAt(0)))
      const isIncreasing = numericValues.every((num, i) => i === 0 || num > numericValues[i - 1])
      const isDecreasing = numericValues.every((num, i) => i === 0 || num < numericValues[i - 1])
      if (isIncreasing || isDecreasing) hasPattern = true
    }

    // Si no se detectó un patrón claro, verificar si hay al menos 2 elementos diferentes
    // y si hay alguna repetición de elementos
    if (!hasPattern) {
      const uniqueElements = new Set(pattern)
      if (uniqueElements.size >= 2 && uniqueElements.size < pattern.length) {
        hasPattern = true
      }
    }

    if (!hasPattern) {
      setFeedback("No se detecta un patrón claro. Intenta crear una secuencia con alguna lógica reconocible.")
      return false
    }

    return true
  }

  // Guardar el patrón
  const savePattern = () => {
    if (validatePattern()) {
      setIsComplete(true)
      setFeedback("¡Patrón creado con éxito!")

      // Completar el nivel después de un tiempo
      setTimeout(() => {
        onComplete(true, timeElapsed)
      }, 2000)
    }
  }

  // Reiniciar
  const resetActivity = () => {
    setSelectedElements([])
    setPattern([])
    setIsPreviewMode(false)
    setPreviewIndex(0)
    setIsPlaying(false)
    setStartTime(Date.now())
    setTimeElapsed(0)
    setIsComplete(false)
    setFeedback(null)
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Crea tu Propio Patrón</h2>
        <p className="text-gray-400 mt-1">Selecciona elementos y crea un patrón lógico que otros puedan reconocer</p>
      </div>

      <div className="flex justify-center items-center mb-8">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Tiempo:</div>
          <div className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full text-sm">{timeElapsed}s</div>
        </div>
        <div className="mx-4 text-gray-500">|</div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-400">Elementos:</div>
          <div className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
            {pattern.length}/{maxPatternLength}
          </div>
        </div>
      </div>

      {/* Selector de tipo de elemento */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Tipo de elementos:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            className={cn(
              "h-12",
              elementType === "color" ? "bg-blue-600 hover:bg-blue-700" : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
            )}
            onClick={() => setElementType("color")}
            disabled={isComplete}
          >
            Colores
          </Button>
          <Button
            className={cn(
              "h-12",
              elementType === "shape" ? "bg-blue-600 hover:bg-blue-700" : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
            )}
            onClick={() => setElementType("shape")}
            disabled={isComplete}
          >
            Formas
          </Button>
          <Button
            className={cn(
              "h-12",
              elementType === "direction" ? "bg-blue-600 hover:bg-blue-700" : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
            )}
            onClick={() => setElementType("direction")}
            disabled={isComplete}
          >
            Direcciones
          </Button>
          <Button
            className={cn(
              "h-12",
              elementType === "number" ? "bg-blue-600 hover:bg-blue-700" : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
            )}
            onClick={() => setElementType("number")}
            disabled={isComplete}
          >
            Números
          </Button>
        </div>
      </div>

      {/* Elementos disponibles */}
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-3">Elementos disponibles:</h3>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
          {elements[elementType].map((element, index) => (
            <Button
              key={index}
              className={cn(
                "h-12 text-2xl",
                selectedElements.includes(element)
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "bg-[#1a1d23] hover:bg-[#2a2f3a]",
              )}
              onClick={() => selectElement(element)}
              disabled={isComplete}
            >
              {element}
            </Button>
          ))}
        </div>
      </div>

      {/* Patrón actual */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold">Tu patrón:</h3>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400 hover:text-white"
              onClick={togglePreviewMode}
              disabled={pattern.length === 0 || isComplete}
            >
              {isPreviewMode ? "Editar" : "Vista previa"}
            </Button>
            {isPreviewMode && (
              <Button
                variant="outline"
                size="sm"
                className="border-gray-700 text-gray-400 hover:text-white"
                onClick={togglePlayPause}
                disabled={pattern.length === 0 || isComplete}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {isPreviewMode ? (
          <div className="bg-[#1a1d23] rounded-lg p-6 border border-gray-700 flex justify-center items-center min-h-[100px]">
            {pattern.length > 0 ? (
              <div className="text-6xl animate-pulse">{pattern[previewIndex]}</div>
            ) : (
              <div className="text-gray-500">No hay elementos en el patrón</div>
            )}
          </div>
        ) : (
          <div className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700 min-h-[100px]">
            <div className="flex flex-wrap gap-2">
              {pattern.map((element, index) => (
                <div
                  key={index}
                  className="w-12 h-12 flex items-center justify-center text-2xl bg-[#2a2f3a] rounded-lg border border-gray-700"
                >
                  {element}
                </div>
              ))}
              {pattern.length === 0 && (
                <div className="w-full text-center text-gray-500 py-4">
                  Haz clic en los elementos de arriba para añadirlos a tu patrón
                </div>
              )}
            </div>
          </div>
        )}

        {!isPreviewMode && !isComplete && (
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              className="flex-1 border-gray-700 hover:bg-gray-800"
              onClick={() => clearPattern()}
              disabled={pattern.length === 0}
            >
              Limpiar todo
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-gray-700 hover:bg-gray-800"
              onClick={() => removeLastFromPattern()}
              disabled={pattern.length === 0}
            >
              Eliminar último
            </Button>
          </div>
        )}
      </div>

      {/* Añadir al patrón */}
      {!isPreviewMode && !isComplete && (
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3">Añadir al patrón:</h3>
          <div className="grid grid-cols-3 md:grid-cols-9 gap-2">
            {selectedElements.map((element, index) => (
              <Button
                key={index}
                className="h-12 text-2xl bg-purple-600 hover:bg-purple-700"
                onClick={() => addToPattern(element)}
                disabled={pattern.length >= maxPatternLength}
              >
                {element}
              </Button>
            ))}
            {selectedElements.length === 0 && (
              <div className="col-span-full text-center text-gray-500 py-4">
                Selecciona elementos arriba para añadirlos a tu patrón
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          className={cn(
            "p-4 rounded-lg mb-6",
            feedback.includes("éxito") ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400",
          )}
        >
          {feedback}
        </div>
      )}

      {/* Botones de acción */}
      {!isComplete ? (
        <Button
          className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
          onClick={savePattern}
          disabled={pattern.length < minPatternLength}
        >
          <Save className="h-4 w-4" />
          Guardar patrón
        </Button>
      ) : (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-500 flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-bold mb-2">¡Patrón creado con éxito!</h3>
          <p className="text-gray-400 mb-4">Has creado un patrón lógico en {timeElapsed} segundos.</p>
          <Button onClick={resetActivity} className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Crear otro patrón
          </Button>
        </div>
      )}
    </div>
  )
}

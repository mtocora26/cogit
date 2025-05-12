"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, XCircle, Lightbulb } from "lucide-react"
import { cn } from "@/lib/utils"

const ELEMENTS = ["🔴", "🟢", "🔵", "🟡", "🟣", "🟠", "⬛", "⬜"]

export default function PatternCreator({ onComplete }: { onComplete: (success: boolean, time: number, score?: number) => void }) {
  const [pattern, setPattern] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [startTime] = useState(Date.now())
  const [showHint, setShowHint] = useState(false)

  // Drag and drop handlers (simplified for demo)
  const handleElementClick = (el: string) => {
    setPattern([...pattern, el])
    setSelected(null)
  }

  const handleRemove = (idx: number) => {
    setPattern(pattern.filter((_, i) => i !== idx))
  }

  const handleFinish = () => {
    if (pattern.length < 4) {
      setFeedback("Crea un patrón de al menos 4 elementos.")
      return
    }
    // Simple logic: check if there's a visible pattern (repetition, alternation, etc.)
    const unique = new Set(pattern)
    if (unique.size === 1) {
      setFeedback("¡Intenta crear un patrón con más variedad!")
      return
    }
    setIsComplete(true)
    setFeedback("¡Patrón creado con éxito! Has ejercitado tu creatividad lógica y pensamiento algorítmico.")
    setTimeout(() => {
      onComplete(true, Math.floor((Date.now() - startTime) / 1000), 5)
    }, 2000)
  }

  const handleShowHint = () => {
    setShowHint(true)
    setTimeout(() => setShowHint(false), 3500)
  }

  return (
    <motion.div
      className="bg-gradient-to-br from-[#23294a] via-[#1a1d23] to-[#181c2a] rounded-2xl p-4 md:p-8 border-2 border-purple-700/30 shadow-2xl max-w-2xl mx-auto min-h-[70vh] flex flex-col justify-between overflow-y-auto animate-fade-in"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
    >
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-purple-400 animate-gradient-x mb-2">Crea tu propio patrón</h2>
        <p className="text-lg text-gray-300 text-center max-w-lg">Arrastra o haz clic en los elementos para formar una secuencia lógica. ¡Pon a prueba tu creatividad y lógica computacional!</p>
      </div>
      {/* Barra de progreso y badge */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Elementos</span>
          <span className="bg-pink-500/20 text-pink-400 px-3 py-1 rounded-full text-sm font-bold shadow">{pattern.length}/8</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Pista</span>
          <Button variant="outline" className="border-yellow-400 text-yellow-400 hover:bg-yellow-500/10 animate-bounce" onClick={handleShowHint}>
            <Lightbulb className="h-5 w-5 mr-2" />
            Sugerencia
          </Button>
        </div>
      </div>
      {/* Elementos para arrastrar/agregar */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {ELEMENTS.map((el, idx) => (
          <Button
            key={idx}
            className={cn(
              "w-12 h-12 text-2xl font-bold bg-[#23294a] rounded-lg border-2 border-purple-700/30 shadow-md hover:scale-110 transition-all",
              selected === el && "ring-2 ring-yellow-400"
            )}
            onClick={() => handleElementClick(el)}
            disabled={isComplete || pattern.length >= 8}
          >
            {el}
          </Button>
        ))}
      </div>
      {/* Secuencia creada */}
      <div className="flex flex-wrap gap-2 justify-center min-h-[56px] mb-4">
        {pattern.map((el, idx) => (
          <div key={idx} className="relative group">
            <div className="w-12 h-12 flex items-center justify-center text-2xl bg-gradient-to-br from-pink-400 via-yellow-400 to-purple-400 rounded-lg shadow-lg animate-pop cursor-pointer">
              {el}
            </div>
            {!isComplete && (
              <button
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow group-hover:scale-110"
                onClick={() => handleRemove(idx)}
                aria-label="Eliminar"
              >
                <XCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
      {/* Feedback y sugerencia */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            className="bg-yellow-500/10 text-yellow-400 p-4 rounded-lg mb-4 text-center font-semibold shadow animate-fade-in"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <Lightbulb className="inline h-5 w-5 mr-1" />
            Intenta alternar colores o formas, o crear una secuencia que se repita. ¡Sé creativo!
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {feedback && (
          <motion.div
            className={cn(
              "mt-6 text-lg font-bold text-center transition-all animate-fade-in",
              isComplete ? "text-green-400" : "text-yellow-400",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {feedback}
            {isComplete && (
              <div className="mt-2 text-base text-pink-300 font-semibold animate-pulse">
                ¡Has ejercitado tu pensamiento computacional creando reglas y secuencias como un programador!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Botón finalizar */}
      <div className="flex justify-center mt-8">
        <Button
          className="bg-gradient-to-r from-pink-500 via-yellow-400 to-purple-500 text-black font-bold animate-bounce"
          onClick={handleFinish}
          disabled={isComplete || pattern.length < 4}
        >
          Finalizar patrón
        </Button>
      </div>
    </motion.div>
  )
}

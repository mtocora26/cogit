"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, PartyPopper, XCircle } from "lucide-react"
import { Glyph, glyphName } from "@/components/misiones/glyph"
import { motion, AnimatePresence } from "framer-motion"
import Pistas from "@/components/misiones/pistas"
import type { EstadoJuego } from "@/lib/patrones"
import { dificultadDeRonda, explicarRegla, generarHuecos, type RondaHuecos } from "@/lib/generador-patrones"

const TOTAL = 5 // patrones por actividad; la dificultad sube de forma gradual

interface CompletaPatronProps {
  onComplete: (success: boolean, time: number, score?: number) => void
  estadoInicial?: EstadoJuego | null
  onEstado?: (estado: EstadoJuego) => void
}

export default function CompletaPatron({ onComplete, estadoInicial, onEstado }: CompletaPatronProps) {
  const [current, setCurrent] = useState<number>(Math.min(Math.max(Number(estadoInicial?.current) || 0, 0), TOTAL - 1))
  const [userInput, setUserInput] = useState<string[]>([])
  const [feedback, setFeedback] = useState<null | boolean>(null)
  const [completed, setCompleted] = useState(false)
  const [showNext, setShowNext] = useState(false)
  const [startTime] = useState(Date.now())
  // Los patrones se generan en el cliente (con respuesta única comprobada); no al renderizar en el servidor.
  const [rondas, setRondas] = useState<RondaHuecos[] | null>(null)
  useEffect(() => {
    setRondas(Array.from({ length: TOTAL }, (_, i) => generarHuecos(dificultadDeRonda(i + 1, TOTAL))))
  }, [])
  const [mensajeError, setMensajeError] = useState<string | null>(null)

  // Foto del estado al pasar de patrón (no en el primero, para no guardar algo sin avance).
  useEffect(() => {
    if (onEstado && current > 0) onEstado({ current })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current])

  if (!rondas) return null
  const ronda = rondas[current]
  const seq = { pattern: ronda.celdas.map((c) => c ?? ""), options: ronda.opciones, answer: ronda.huecos, solution: ronda.solucion }
  const patternWithInput = seq.pattern.map((el, i) =>
    el === "" ? (userInput[seq.answer.indexOf(i)] || "❔") : el
  )

  function handleOptionClick(option: string) {
    if (userInput.length < seq.answer.length && feedback === null) {
      setUserInput([...userInput, option])
    }
  }

  function handleCheck() {
    if (userInput.length !== seq.answer.length) return
    const isCorrect = userInput.every((v, i) => v === seq.solution[i])
    setFeedback(isCorrect)
    setShowNext(isCorrect)
    if (isCorrect) setMensajeError(null)
    else {
      // Distingue cuántos huecos están bien y nombra la regla, sin dar por completada la actividad ni revelar la solución.
      const bien = userInput.filter((v, i) => v === seq.solution[i]).length
      const total = seq.answer.length
      const estado =
        bien === 0
          ? "Ningún hueco coincide con la regla."
          : `${bien} de ${total} huecos coinciden con la regla; revisa los demás.`
      setMensajeError(`${estado} ${explicarRegla(ronda, glyphName)}`)
    }
    if (isCorrect && current === TOTAL - 1) {
      setTimeout(() => {
        setCompleted(true)
        if (onComplete) {
          const time = Math.round((Date.now() - startTime) / 1000)
          onComplete(true, time, TOTAL)
        }
      }, 1200)
    }
  }

  function handleNext() {
    setCurrent(current + 1)
    setUserInput([])
    setFeedback(null)
    setMensajeError(null)
    setShowNext(false)
  }

  function handleReset() {
    setUserInput([])
    setFeedback(null)
    setMensajeError(null)
    setShowNext(false)
  }

  function handleRestart() {
    setCurrent(0)
    setUserInput([])
    setFeedback(null)
    setMensajeError(null)
    setShowNext(false)
    setCompleted(false)
  }

  // Barra de progreso
  const progress = Math.round(((current) / TOTAL) * 100)

  if (completed) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center gap-6 p-8">
        <PartyPopper aria-hidden className="h-14 w-14 text-neuron" />
        <div className="text-2xl font-bold text-green-400 text-center">¡Completaste todos los patrones!</div>
        <Button onClick={handleRestart} className="bg-blue-600 hover:bg-blue-700 mt-2">Jugar de nuevo</Button>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-xl mx-auto p-6 bg-card border border-border rounded-2xl flex flex-col items-center gap-6">
      <div className="w-full flex flex-col gap-2">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-bold">Patrón {current + 1} de {TOTAL}</h2>
          <span className="text-sm text-muted-foreground">Dificultad: {ronda.dificultad}</span>
          <div className="text-xs text-gray-400">Progreso</div>
        </div>
        <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
          <motion.div className="h-2 bg-primary rounded-full" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="text-gray-300 text-center max-w-md mb-2">
        Observa la secuencia. Haz clic en las opciones para completar los espacios vacíos.
      </p>
      <div className="flex gap-2 text-4xl mb-2">
        {patternWithInput.map((el, i) => (
          <motion.span
            key={i}
            className={seq.pattern[i] === "" ? "border-b-4 border-blue-400 px-2 min-w-[2.5rem] bg-blue-900/30 rounded-lg" : "px-2 min-w-[2.5rem]"}
            animate={seq.pattern[i] === "" && el === "❔" ? { scale: [1, 1.1, 1] } : {}}
            transition={{ repeat: Infinity, duration: 1.2 }}
          >
            <Glyph token={el} className="h-9 w-9" />
          </motion.span>
        ))}
      </div>
      <div className="flex gap-3 mb-2 flex-wrap justify-center">
        {seq.options.map((opt, i) => (
          <Button key={i} variant="outline" className="text-2xl px-4 py-2" onClick={() => handleOptionClick(opt)} disabled={userInput.length >= seq.answer.length || feedback !== null}>
            <Glyph token={opt} className="!h-8 !w-8" />
          </Button>
        ))}
      </div>
      <Pistas
        key={current}
        pistas={[
          { texto: "Mira las fichas que ya están colocadas: busca el grupo que se repite una y otra vez." },
          { texto: explicarRegla(ronda, glyphName) },
          { texto: "Los huecos, de izquierda a derecha, llevan:", fichas: seq.solution },
        ]}
      />
      <div className="flex gap-2">
        <Button onClick={handleCheck} disabled={userInput.length !== seq.answer.length || feedback !== null} className="bg-blue-600 hover:bg-blue-700 text-white">
          Comprobar
        </Button>
        <Button onClick={handleReset} variant="ghost" className="text-gray-400 border border-gray-700">
          Limpiar
        </Button>
      </div>
      <AnimatePresence>
        {feedback === true && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2 text-green-400 font-bold mt-2">
            <Check aria-hidden className="h-6 w-6" />
            ¡Correcto!
            {showNext && current < TOTAL - 1 && (
              <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700 mt-2">Siguiente patrón</Button>
            )}
          </motion.div>
        )}
        {feedback === false && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col items-center gap-2 text-red-400 font-bold mt-2">
            <XCircle className="h-6 w-6 animate-shake" />
            Aún no es correcto. Puedes intentarlo de nuevo.
            {mensajeError && <p role="status" className="max-w-md text-center text-sm font-normal text-red-200">{mensajeError}</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

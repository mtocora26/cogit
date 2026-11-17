"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useNeuronas } from "./neuronas-context"
import { Sparkle, Brain } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function NeuronasIndicator({ className = "" }: { className?: string }) {
  const { neuronas: lives, maxNeuronas: maxLives, recargando: isRecharging, segundosRecarga: rechargeTime, modoPruebas } = useNeuronas()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  // Estado local para forzar refresco visual cada segundo
  const [, setTick] = useState(0)

  // Utilidad para formatear segundos a mm:ss
  function formatTimeMMSS(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  // Refrescar cada segundo si está en recarga o el popover está abierto
  useEffect(() => {
    if (isRecharging || open) {
      const interval = setInterval(() => setTick(t => t + 1), 1000)
      return () => clearInterval(interval)
    }
  }, [isRecharging, open])

  // Cierra el popover al hacer click fuera
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  return (
    <div className={`relative ${className}`} ref={ref}>
      {/* Botón compacto */}
      <button
        className="flex min-h-11 min-w-11 items-center justify-center gap-1 px-3 rounded-full bg-secondary border border-neuron/50 hover:bg-accent transition-colors"
        onClick={() => setOpen((v) => !v)}
        aria-label="Mostrar detalles de neuronas"
        type="button"
      >
        <Brain aria-hidden className="h-5 w-5 text-neuron" />
        <span className="font-bold text-foreground text-base">{lives}</span>
      </button>
      {/* Popover */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-popover border border-border rounded-xl p-5 shadow-lg z-50 flex flex-col items-center animate-fade-in"
        >
          <div className="flex gap-2 mb-3">
            {[...Array(maxLives)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: lives > i ? 1.15 : 0.85, opacity: lives > i ? 1 : 0.3, rotate: lives > i ? [0, 10] : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, repeat: lives > i ? Infinity : 0, duration: 2 }}
                className={`w-7 h-7 flex items-center justify-center ${lives > i ? "text-neuron" : "text-muted-foreground"}`}
              >
                <Brain aria-hidden />
              </motion.div>
            ))}
          </div>
          <div className="text-sm text-foreground mb-2 font-semibold">
            {modoPruebas
              ? "Modo pruebas: no pierdes neuronas"
              : lives === maxLives
              ? "¡Neuronas completas!"
              : isRecharging
                ? `Recuperando una neurona en ${formatTimeMMSS(rechargeTime)}`
                : lives === 0
                  ? "Sin neuronas disponibles"
                  : "Puedes seguir jugando"}
          </div>
          {lives === 0 && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Espera la recarga automática: recuperas una neurona cada 30 minutos.
            </p>
          )}
        </motion.div>
      )}
    </div>
  )
}

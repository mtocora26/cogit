"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useLives } from "./lives-context"
import { Sparkle, Brain } from "lucide-react"
import { useState, useRef, useEffect } from "react"

export default function LivesIndicator({ className = "" }: { className?: string }) {
  const { lives, maxLives, isRecharging, rechargeTime } = useLives()
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
        className="flex items-center gap-1 px-2 py-1 rounded-full bg-[#23283a] border border-purple-700 hover:bg-[#2d3142] transition-all shadow-md"
        onClick={() => setOpen((v) => !v)}
        aria-label="Mostrar detalles de vidas"
        type="button"
      >
        <Brain className="h-5 w-5 text-purple-400 animate-pulse" />
        <span className="font-bold text-purple-200 text-base">{lives}</span>
      </button>
      {/* Popover */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute right-0 mt-2 w-64 bg-[#181c2a] border border-purple-700 rounded-xl shadow-2xl p-5 z-50 flex flex-col items-center animate-fade-in"
        >
          <div className="flex gap-2 mb-3">
            {[...Array(maxLives)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: lives > i ? 1.15 : 0.85, opacity: lives > i ? 1 : 0.3, rotate: lives > i ? [0, 10] : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, repeat: lives > i ? Infinity : 0, duration: 2 }}
                className={`w-7 h-7 flex items-center justify-center ${lives > i ? "text-purple-400 drop-shadow-lg" : "text-gray-600"}`}
              >
                <Brain className={lives > i ? "animate-pulse" : ""} />
              </motion.div>
            ))}
          </div>
          <div className="text-sm text-purple-200 mb-2 font-semibold">
            {lives === maxLives
              ? "¡Vidas completas!"
              : isRecharging
                ? `Recuperando vida en ${formatTimeMMSS(rechargeTime)}`
                : lives === 0
                  ? "Sin vidas disponibles"
                  : "Puedes seguir jugando"}
          </div>
          {/* Si no hay vidas, mostrar opciones */}
          {lives === 0 && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <button
                className="w-full py-2 rounded-lg bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-bold shadow hover:scale-105 transition-all"
                onClick={() => { window.location.href = "/tienda"; }}
              >
                Ir a la Tienda para recargar
              </button>
              <div className="text-xs text-gray-300 text-center mt-1">
                O espera la recarga automática para obtener una vida
              </div>
            </div>
          )}
          {/* Si hay vidas, mostrar botones normales */}
          {lives > 0 && (
            <div className="flex flex-col gap-2 w-full mt-2">
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 text-white font-bold shadow hover:scale-105 transition-all">
                Vidas Ilimitadas
              </button>
              <button className="w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-400 text-white font-bold shadow hover:scale-105 transition-all">
                Recuperar Vidas
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}

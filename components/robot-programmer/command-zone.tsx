"use client"

import { ArrowLeft, ArrowRight, ArrowUp, Lightbulb, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface CommandZoneProps {
  commands: string[]
  onRemoveCommand: (index: number) => void
  isExecuting: boolean
  currentStep: number
  vertical?: boolean // Nuevo prop para layout vertical
}

export default function CommandZone({ commands, onRemoveCommand, isExecuting, currentStep, vertical = false }: CommandZoneProps) {
  // Función para obtener el nombre y el color del comando
  const getCommandInfo = (command: string) => {
    switch (command) {
      case "forward":
        return { name: "Avanzar", color: "bg-blue-500", icon: <ArrowUp aria-hidden className="h-4 w-4" /> }
      case "turnRight":
        return { name: "Girar Derecha", color: "bg-purple-500", icon: <ArrowRight aria-hidden className="h-4 w-4" /> }
      case "turnLeft":
        return { name: "Girar Izquierda", color: "bg-purple-500", icon: <ArrowLeft aria-hidden className="h-4 w-4" /> }
      case "light":
        return { name: "Encender", color: "bg-green-500", icon: <Lightbulb aria-hidden className="h-4 w-4" /> }
      default:
        return { name: command, color: "bg-gray-500", icon: "?" }
    }
  }

  const [isDragOver, setIsDragOver] = React.useState(false)

  return (
    <div
      className={cn(
        vertical ? "flex flex-col gap-2" : "grid grid-cols-1 gap-2",
        isDragOver && "ring-2 ring-blue-400 bg-blue-400/10"
      )}
      onDragOver={e => {
        e.preventDefault()
        setIsDragOver(true)
      }}
      onDragLeave={e => {
        setIsDragOver(false)
      }}
      onDrop={e => {
        e.preventDefault()
        setIsDragOver(false)
        const command = e.dataTransfer.getData("text/plain")
        if (command && !isExecuting) {
          onRemoveCommand(-1) // No hace nada, pero mantiene la firma
          // Usar el método correcto para agregar el comando
          if (typeof window !== "undefined") {
            const event = new CustomEvent("add-command", { detail: command })
            window.dispatchEvent(event)
          }
        }
      }}
    >
      {/* Header eliminado, el título lo pone el layout principal */}
      {commands.length === 0 ? (
        <div className={cn(
          "bg-background rounded-lg p-8 sm:p-6 text-center border border-dashed border-gray-700 min-h-[64px] flex items-center justify-center text-base sm:text-sm",
          isDragOver && "border-blue-400 bg-blue-400/10"
        )}>
          <p className="text-gray-400">Haz clic o arrastra comandos aquí para programar al robot</p>
        </div>
      ) : (
        <div className={cn(vertical ? "flex flex-col gap-3" : "grid grid-cols-1 gap-2")}> 
          <AnimatePresence initial={false}>
            {commands.map((command, index) => {
              const { name, color, icon } = getCommandInfo(command)
              // Animación: pop al agregar, glow/bounce al ejecutar
              const isCurrent = isExecuting && index === currentStep - 1
              const isPast = isExecuting && index < currentStep - 1
              return (
                <motion.div
                  key={index}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.7, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-xl border border-gray-700 relative overflow-visible",
                    isCurrent ? "bg-primary/20 ring-2 ring-ring z-10" :
                    isPast ? "opacity-50" : "bg-background",
                  )}
                  style={{ minHeight: 56 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={cn(color, "w-9 h-9 rounded-full flex items-center justify-center text-foreground font-bold text-xl shadow-lg")}
                      animate={isCurrent ? { scale: [1, 1.18, 0.95, 1], boxShadow: [
                        "0 0 0px #fff0", "0 0 16px #facc15,0 0 32px #818cf8", "0 0 0px #fff0", "0 0 0px #fff0"
                      ] } : {}}
                      transition={isCurrent ? { duration: 0.7, repeat: 2 } : {}}
                    >
                      {icon}
                    </motion.div>
                    <span className="text-base sm:text-sm font-semibold">{name}</span>
                  </div>
                  {!isExecuting && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 text-gray-400 hover:text-red-400 hover:bg-transparent"
                      onClick={() => onRemoveCommand(index)}
                      aria-label="Eliminar comando"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                  {/* Efecto shake si es el comando actual */}
                  {isCurrent && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      initial={{ scale: 0.7, opacity: 0 }}
                      animate={{ scale: 1.2, opacity: 1, rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <Star aria-hidden className="inline-block h-6 w-6 fill-current text-signal" />
                    </motion.div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

// (No debe haber ningún <style jsx global> aquí. Si se requiere animación global, debe ir en styles/globals.css o en el layout principal)

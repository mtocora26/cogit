"use client"

import { cn } from "@/lib/utils"

interface InstructionPanelProps {
  onAddCommand: (command: string) => void
  availableCommands: string[]
  disabled: boolean
}

export default function InstructionPanel({ onAddCommand, availableCommands, disabled }: InstructionPanelProps) {
  // Función para obtener el nombre y el color del comando
  const getCommandInfo = (command: string) => {
    switch (command) {
      case "forward":
        return {
          name: "Avanzar",
          color: "bg-blue-500",
          icon: "↑",
          description: "Mueve el robot una casilla hacia adelante",
        }
      case "turnRight":
        return {
          name: "Girar Derecha",
          color: "bg-purple-500",
          icon: "→",
          description: "Gira el robot 90° a la derecha",
        }
      case "turnLeft":
        return {
          name: "Girar Izquierda",
          color: "bg-indigo-500",
          icon: "←",
          description: "Gira el robot 90° a la izquierda",
        }
      case "light":
        return { name: "Encender", color: "bg-green-500", icon: "💡", description: "Enciende la casilla actual" }
      default:
        return { name: command, color: "bg-gray-500", icon: "?", description: "Comando desconocido" }
    }
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-3 border border-gray-800">
      <h2 className="text-lg font-bold mb-2">Comandos Disponibles</h2>
      <div className="grid grid-cols-1 gap-2 sm:gap-1">
        {availableCommands.map((command, index) => {
          const { name, color, icon, description } = getCommandInfo(command)
          return (
            <button
              key={index}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl border border-gray-700 bg-[#1a1d23] hover:bg-gray-800 focus-visible:ring-2 focus-visible:ring-blue-400 transition-colors text-left text-base sm:text-sm",
                disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              style={{ minHeight: 56 }}
              onClick={() => !disabled && onAddCommand(command)}
              disabled={disabled}
              draggable={!disabled}
              onDragStart={e => {
                if (disabled) return
                e.dataTransfer.setData("text/plain", command)
              }}
            >
              <div className={cn(color, "w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xl")}>{icon}</div>
              <div>
                <div className="font-medium leading-tight">{name}</div>
                <div className="text-xs text-gray-400 leading-tight">{description}</div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

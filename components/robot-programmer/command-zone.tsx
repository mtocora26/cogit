"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import * as React from "react"

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
        return { name: "Avanzar", color: "bg-blue-500", icon: "↑" }
      case "turnRight":
        return { name: "Girar Derecha", color: "bg-purple-500", icon: "→" }
      case "turnLeft":
        return { name: "Girar Izquierda", color: "bg-indigo-500", icon: "←" }
      case "light":
        return { name: "Encender", color: "bg-green-500", icon: "💡" }
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
          "bg-[#1a1d23] rounded-lg p-8 text-center border border-dashed border-gray-700",
          isDragOver && "border-blue-400 bg-blue-400/10"
        )}>
          <p className="text-gray-400">Haz clic o arrastra comandos aquí para programar al robot</p>
        </div>
      ) : (
        <div className={cn(vertical ? "flex flex-col gap-2" : "grid grid-cols-1 gap-2")}> 
          {commands.map((command, index) => {
            const { name, color, icon } = getCommandInfo(command)

            return (
              <div
                key={index}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg border border-gray-700",
                  isExecuting && index === currentStep - 1 ? "bg-gray-700" : "bg-[#1a1d23]",
                  isExecuting && index < currentStep - 1 ? "opacity-50" : "",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`${color} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold`}
                  >
                    {icon}
                  </div>
                  <span>{name}</span>
                </div>

                {!isExecuting && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-gray-400 hover:text-red-400 hover:bg-transparent"
                    onClick={() => onRemoveCommand(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

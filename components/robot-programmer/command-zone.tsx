"use client"

import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface CommandZoneProps {
  commands: string[]
  onRemoveCommand: (index: number) => void
  isExecuting: boolean
  currentStep: number
}

export default function CommandZone({ commands, onRemoveCommand, isExecuting, currentStep }: CommandZoneProps) {
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

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-4">Secuencia de Comandos</h2>

      {commands.length === 0 ? (
        <div className="bg-[#1a1d23] rounded-lg p-8 text-center border border-dashed border-gray-700">
          <p className="text-gray-400">Arrastra comandos aquí para programar al robot</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-2">
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

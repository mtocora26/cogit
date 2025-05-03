"use client"

import { Star, Brain, Zap, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatTime } from "@/lib/utils"
import NonogramBoard from "@/components/nonogram/nonogram-board"

interface Level {
  id: number
  name: string
  difficulty: string
  description: string
  solution: number[][]
  rowClues: number[][]
  colClues: number[][]
  imagePreview: string
}

interface LevelSelectorProps {
  levels: Level[]
  onSelectLevel: (levelIndex: number) => void
  completedLevels: number[]
  bestTimes: { [key: number]: number }
}

export default function LevelSelector({ levels, onSelectLevel, completedLevels, bestTimes }: LevelSelectorProps) {
  // Función para obtener el icono según la dificultad
  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "fácil":
        return <Star className="h-6 w-6 text-green-400" />
      case "medio":
        return <Zap className="h-6 w-6 text-yellow-400" />
      case "difícil":
        return <Brain className="h-6 w-6 text-red-400" />
      default:
        return <Star className="h-6 w-6 text-green-400" />
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Elige un nivel</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Resuelve nonogramas para revelar imágenes ocultas. Cada nivel presenta un desafío diferente con imágenes cada
          vez más complejas.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {levels.map((level, index) => {
          const isCompleted = completedLevels.includes(index)
          const isLocked = index > 0 && !completedLevels.includes(index - 1) && !isCompleted

          return (
            <div
              key={level.id}
              className={`bg-[#1e2330] rounded-lg overflow-hidden border ${
                isLocked
                  ? "border-gray-700 opacity-70"
                  : isCompleted
                    ? "border-green-500/30 hover:border-green-500/60"
                    : "border-purple-500/30 hover:border-purple-500/60"
              } transition-all group`}
            >
              <div className="h-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent z-10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {isLocked ? (
                    <Lock className="h-20 w-20 text-gray-700" />
                  ) : isCompleted ? (
                    <div className="w-full h-full p-2">
                      <NonogramBoard
                        board={level.solution}
                        rowClues={[]}
                        colClues={[]}
                        onCellClick={() => {}}
                        errors={[]}
                        showHint={false}
                        solution={level.solution}
                        isPreview={true}
                      />
                    </div>
                  ) : (
                    <img
                      src={level.imagePreview || "/placeholder.svg"}
                      alt={level.name}
                      className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
                    />
                  )}
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{level.name}</h3>
                  <div className="bg-[#1a1d23] p-2 rounded-full">
                    {isLocked ? <Lock className="h-6 w-6 text-gray-500" /> : getDifficultyIcon(level.difficulty)}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                  {isLocked ? "Completa los niveles anteriores para desbloquear" : level.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <span>Nivel {level.id}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <span>
                      Tamaño: {level.solution.length}x{level.solution[0].length}
                    </span>
                  </div>
                </div>

                {isCompleted && bestTimes[index] && (
                  <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-md text-sm mb-4 flex items-center justify-between">
                    <span>Mejor tiempo:</span>
                    <span>{formatTime(bestTimes[index])}</span>
                  </div>
                )}

                <Button
                  className={`w-full ${
                    isLocked
                      ? "bg-gray-700 cursor-not-allowed"
                      : isCompleted
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-purple-600 hover:bg-purple-700"
                  }`}
                  onClick={() => !isLocked && onSelectLevel(index)}
                  disabled={isLocked}
                >
                  {isLocked ? "Bloqueado" : isCompleted ? "Jugar de nuevo" : "Jugar ahora"}
                </Button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

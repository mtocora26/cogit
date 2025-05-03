"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, RotateCcw, Info, Trophy, Clock, Brain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import GameBoard from "@/components/robot-programmer/game-board"
import CommandZone from "@/components/robot-programmer/command-zone"
import InstructionPanel from "@/components/robot-programmer/instruction-panel"
import LevelSelector from "@/components/robot-programmer/level-selector"
import { getLevels, validateSolution } from "@/lib/robot-programmer"
import { formatTime } from "@/lib/utils"
import Image from "next/image"

export default function RobotProgrammerPage() {
  const router = useRouter()
  const [showLevelSelector, setShowLevelSelector] = useState(true)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [commands, setCommands] = useState<string[]>([])
  const [isExecuting, setIsExecuting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [robotPosition, setRobotPosition] = useState({ x: 0, y: 0, direction: 0 })
  const [litCells, setLitCells] = useState<{ x: number; y: number }[]>([])
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [executionSpeed, setExecutionSpeed] = useState(500) // ms por paso
  const [levels] = useState(getLevels())
  const [commandLimit, setCommandLimit] = useState(10)
  const [steps, setSteps] = useState(0)
  const [lives, setLives] = useState(3)
  const [bestTimes, setBestTimes] = useState<{ [key: number]: number }>({})

  // Iniciar el juego con un nivel seleccionado
  const startLevel = (levelIndex: number) => {
    const level = levels[levelIndex]
    setCurrentLevel(levelIndex)
    setCommands([])
    setIsExecuting(false)
    setIsComplete(false)
    setIsSuccess(false)
    setRobotPosition({ ...level.startPosition })
    setLitCells([])
    setTime(0)
    setIsActive(true)
    setShowLevelSelector(false)
    setCommandLimit(level.commandLimit || 10)
    setSteps(0)
    setLives(3)
  }

  // Manejar el temporizador
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isActive && !isComplete) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1)
      }, 1000)
    } else if (interval) {
      clearInterval(interval)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isActive, isComplete])

  // Cargar mejores tiempos desde localStorage
  useEffect(() => {
    const savedTimes = localStorage.getItem("robotProgrammerBestTimes")
    if (savedTimes) {
      setBestTimes(JSON.parse(savedTimes))
    }
  }, [])

  // Guardar mejor tiempo cuando se completa un nivel
  useEffect(() => {
    if (isComplete && isSuccess) {
      const currentBest = bestTimes[currentLevel] || Number.POSITIVE_INFINITY
      if (time < currentBest) {
        const newBestTimes = { ...bestTimes, [currentLevel]: time }
        setBestTimes(newBestTimes)
        localStorage.setItem("robotProgrammerBestTimes", JSON.stringify(newBestTimes))
      }
    }
  }, [isComplete, isSuccess, currentLevel, time, bestTimes])

  // Añadir un comando a la lista
  const addCommand = (command: string) => {
    if (commands.length < commandLimit && !isExecuting) {
      setCommands([...commands, command])
    }
  }

  // Eliminar un comando de la lista
  const removeCommand = (index: number) => {
    if (!isExecuting) {
      const newCommands = [...commands]
      newCommands.splice(index, 1)
      setCommands(newCommands)
    }
  }

  // Ejecutar los comandos
  const executeCommands = async () => {
    if (isExecuting || commands.length === 0) return

    setIsExecuting(true)
    setSteps(0)

    // Reiniciar el estado del robot
    const level = levels[currentLevel]
    setRobotPosition({ ...level.startPosition })
    setLitCells([])

    // Ejecutar cada comando secuencialmente
    let currentPosition = { ...level.startPosition }
    let currentLitCells: { x: number; y: number }[] = []

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i]

      // Actualizar el estado para mostrar la animación
      setSteps(i + 1)

      // Ejecutar el comando
      const result = executeCommand(command, currentPosition, currentLitCells, level.board)
      currentPosition = result.position
      currentLitCells = result.litCells

      // Actualizar el estado del juego
      setRobotPosition({ ...currentPosition })
      setLitCells([...currentLitCells])

      // Esperar para el siguiente paso
      await new Promise((resolve) => setTimeout(resolve, executionSpeed))
    }

    // Verificar si se completó el nivel
    const success = validateSolution(currentLitCells, level.targetCells)

    if (success) {
      setIsSuccess(true)
      setIsComplete(true)
      setIsActive(false)
    } else {
      // Si no se completó correctamente, reducir vidas
      setLives((prev) => Math.max(0, prev - 1))

      if (lives <= 1) {
        setIsComplete(true)
        setIsSuccess(false)
        setIsActive(false)
      }
    }

    setIsExecuting(false)
  }

  // Ejecutar un comando individual
  const executeCommand = (
    command: string,
    position: { x: number; y: number; direction: number },
    litCells: { x: number; y: number }[],
    board: number[][],
  ) => {
    const newPosition = { ...position }
    const newLitCells = [...litCells]

    switch (command) {
      case "forward":
        // Calcular nueva posición basada en la dirección
        const directionVectors = [
          { x: 0, y: -1 }, // Norte
          { x: 1, y: 0 }, // Este
          { x: 0, y: 1 }, // Sur
          { x: -1, y: 0 }, // Oeste
        ]

        const vector = directionVectors[position.direction]
        const newX = position.x + vector.x
        const newY = position.y + vector.y

        // Verificar si la nueva posición está dentro del tablero y no es un obstáculo
        if (
          newX >= 0 &&
          newX < board[0].length &&
          newY >= 0 &&
          newY < board.length &&
          board[newY][newX] !== 1 // 1 representa un obstáculo
        ) {
          newPosition.x = newX
          newPosition.y = newY
        }
        break

      case "turnRight":
        newPosition.direction = (position.direction + 1) % 4
        break

      case "turnLeft":
        newPosition.direction = (position.direction + 3) % 4 // +3 es equivalente a -1 en módulo 4
        break

      case "light":
        // Verificar si la celda ya está encendida
        const alreadyLit = newLitCells.some((cell) => cell.x === position.x && cell.y === position.y)

        if (!alreadyLit) {
          newLitCells.push({ x: position.x, y: position.y })
        }
        break

      // Aquí se pueden añadir más comandos como bucles o funciones
    }

    return { position: newPosition, litCells: newLitCells }
  }

  // Reiniciar el nivel actual
  const resetLevel = () => {
    const level = levels[currentLevel]
    setCommands([])
    setIsExecuting(false)
    setIsComplete(false)
    setIsSuccess(false)
    setRobotPosition({ ...level.startPosition })
    setLitCells([])
    setSteps(0)
    setLives(3)
    setTime(0)
    setIsActive(true)
  }

  // Volver al selector de niveles
  const handleBackToLevels = () => {
    setShowLevelSelector(true)
    setIsActive(false)
  }

  // Ir al siguiente nivel
  const goToNextLevel = () => {
    if (currentLevel < levels.length - 1) {
      startLevel(currentLevel + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="minijuegos" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => router.push("/minijuegos")}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Volver a Minijuegos
          </Button>
          <h1 className="text-2xl font-bold">Robot Programmer</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {showLevelSelector ? (
          <div className="relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1200&auto=format&fit=crop"
                alt="Robot Programmer Background"
                fill
                className="object-cover opacity-10"
              />
            </div>
            <div className="relative z-10">
              <LevelSelector
                levels={levels}
                onSelectLevel={startLevel}
                completedLevels={Object.keys(bestTimes).map(Number)}
                bestTimes={bestTimes}
              />
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left Column - Game Info */}
            <div className="md:col-span-1 space-y-6">
              <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Información</h2>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-yellow-500" />
                      <span>Nivel:</span>
                    </div>
                    <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-bold">
                      {currentLevel + 1}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-400" />
                      <span>Tiempo:</span>
                    </div>
                    <span className="font-mono">{formatTime(time)}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <span>Comandos:</span>
                    </div>
                    <span>
                      {commands.length}/{commandLimit}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span>Vidas:</span>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(3)].map((_, i) => (
                        <Heart
                          key={i}
                          className={`h-5 w-5 ${i < lives ? "text-red-500 fill-red-500" : "text-gray-600"}`}
                        />
                      ))}
                    </div>
                  </div>

                  {bestTimes[currentLevel] && (
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-400" />
                        <span>Mejor tiempo:</span>
                      </div>
                      <span className="font-mono">{formatTime(bestTimes[currentLevel])}</span>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800"
                    onClick={handleBackToLevels}
                  >
                    Cambiar nivel
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-gray-700 hover:bg-gray-800"
                    onClick={resetLevel}
                    disabled={isExecuting}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>

                  <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={executeCommands}
                    disabled={isExecuting || commands.length === 0 || isComplete}
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Ejecutar
                  </Button>
                </div>
              </div>

              <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
                <div className="flex items-center gap-2 mb-4">
                  <Info className="h-5 w-5 text-blue-400" />
                  <h2 className="text-xl font-bold">Instrucciones</h2>
                </div>

                <p className="text-gray-300 text-sm mb-4">{levels[currentLevel].description}</p>

                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-blue-400">•</div>
                    <div>Arrastra comandos desde el panel de instrucciones a la zona de comandos.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-blue-400">•</div>
                    <div>Haz clic en "Ejecutar" para ver cómo el robot sigue tus instrucciones.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-blue-400">•</div>
                    <div>El objetivo es encender todas las casillas marcadas.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-blue-400">•</div>
                    <div>Tienes 3 vidas. Pierdes una vida si tu solución no es correcta.</div>
                  </li>
                </ul>
              </div>

              {/* Instruction Panel */}
              <InstructionPanel
                onAddCommand={addCommand}
                availableCommands={levels[currentLevel].availableCommands}
                disabled={isExecuting || commands.length >= commandLimit || isComplete}
              />
            </div>

            {/* Center and Right Columns - Game Board and Command Zone */}
            <div className="md:col-span-2">
              {isComplete ? (
                <div className="bg-[#1e2330] rounded-lg p-8 text-center border border-gray-800 h-full flex flex-col items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                      isSuccess ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"
                    }`}
                  >
                    {isSuccess ? <Trophy className="h-10 w-10" /> : <RotateCcw className="h-10 w-10" />}
                  </div>

                  <h2 className="text-3xl font-bold mb-4">
                    {isSuccess ? "¡Nivel Completado!" : "¡Se acabaron las vidas!"}
                  </h2>

                  <p className="text-xl text-gray-300 mb-6">
                    {isSuccess
                      ? `Has completado el nivel ${currentLevel + 1} en ${formatTime(time)} con ${commands.length} comandos.`
                      : "No has logrado encender todas las casillas objetivo. ¡Revisa tu algoritmo!"}
                  </p>

                  <div className="flex gap-4">
                    {isSuccess && currentLevel < levels.length - 1 ? (
                      <Button className="bg-green-600 hover:bg-green-700" onClick={goToNextLevel}>
                        Siguiente Nivel
                      </Button>
                    ) : (
                      <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetLevel}>
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Intentar de nuevo
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="border-gray-700 hover:bg-gray-800"
                      onClick={handleBackToLevels}
                    >
                      Cambiar nivel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <GameBoard
                    board={levels[currentLevel].board}
                    robotPosition={robotPosition}
                    targetCells={levels[currentLevel].targetCells}
                    litCells={litCells}
                  />

                  <CommandZone
                    commands={commands}
                    onRemoveCommand={removeCommand}
                    isExecuting={isExecuting}
                    currentStep={steps}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

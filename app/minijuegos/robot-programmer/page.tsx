"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, RotateCcw, Info, Trophy, Clock, Brain, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import GameBoard from "@/components/robot-programmer/game-board"
import CommandZone from "@/components/robot-programmer/command-zone"
import LevelSelector from "@/components/robot-programmer/level-selector"
import { getLevels, validateSolution } from "@/lib/robot-programmer"
import { formatTime } from "@/lib/utils"
import Image from "next/image"
import RobotSVG from "@/components/robot-programmer/robot-svg"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import InstructionPanel from "@/components/robot-programmer/instruction-panel"
import * as React from "react"

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
  const [robot3D, setRobot3D] = useState(false)
  const isMobile = useIsMobile()

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

  // Soporte para arrastrar y soltar comandos
  React.useEffect(() => {
    const handler = (e: any) => {
      if (e.detail) addCommand(e.detail)
    }
    window.addEventListener("add-command", handler)
    return () => window.removeEventListener("add-command", handler)
  }, [commands, isExecuting, commandLimit])

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
    if (isExecuting || commands.length === 0) return;

    setIsExecuting(true);
    setSteps(0);

    // Reiniciar el estado del robot
    const level = levels[currentLevel];
    setRobotPosition({ ...level.startPosition });
    setLitCells([]);

    // Ejecutar cada comando secuencialmente
    let currentPosition = { ...level.startPosition };
    let currentLitCells: { x: number; y: number }[] = [];

    for (let i = 0; i < commands.length; i++) {
      const command = commands[i];
      setSteps(i + 1);
      const result = executeCommand(command, currentPosition, currentLitCells, level.board);
      currentPosition = result.position;
      currentLitCells = result.litCells;
      setRobotPosition({ ...currentPosition });
      setLitCells([...currentLitCells]);
      await new Promise((resolve) => setTimeout(resolve, executionSpeed));
    }

    // Verificar si se completó el nivel
    const success = validateSolution(currentLitCells, level.targetCells);

    if (success) {
      setIsSuccess(true);
      setIsComplete(true);
      setIsActive(false);
    } else {
      // Si no se completó correctamente, reducir vidas de forma segura
      setLives((prev) => {
        const newLives = Math.max(0, prev - 1);
        if (newLives <= 0) {
          setIsComplete(true);
          setIsSuccess(false);
          setIsActive(false);
        }
        return newLives;
      });
    }

    setIsExecuting(false);
  };

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

  // Determinar el estado de ánimo del robot
  let robotMood: "happy" | "sad" | "neutral" = "neutral"
  if (isComplete) robotMood = isSuccess ? "happy" : "sad"

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="minijuegos" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-400 hover:text-white"
            onClick={() => router.push("/minijuegos")}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Volver a Minijuegos
          </Button>
          <h1 className="text-2xl font-bold">Robot Programmer</h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-gray-400">Robot 3D</span>
            <input
              type="checkbox"
              checked={robot3D}
              onChange={() => setRobot3D((v) => !v)}
              className="accent-purple-500 w-5 h-5"
              aria-label="Alternar robot 3D"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-1 sm:px-2 py-4">
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
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-start justify-center w-full max-w-5xl mx-auto">
            {/* Panel de comandos disponibles a la izquierda */}
            <div className="w-full md:w-[300px] flex-shrink-0 flex flex-col gap-2 items-stretch order-1 md:order-none">
              <div className="flex w-full justify-between items-center mb-1">
                <h3 className="text-lg font-bold text-center flex-1">Comandos</h3>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="ml-2"
                      title="Ver instrucciones"
                    >
                      <Info className="h-5 w-5 text-blue-400" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="max-w-xs text-sm">
                    <div className="font-bold mb-2">Instrucciones</div>
                    <div className="mb-2 text-gray-300">{levels[currentLevel].description}</div>
                    <ul className="space-y-1 text-gray-400">
                      <li>Arrastra comandos desde el panel de instrucciones a la zona de comandos.</li>
                      <li>Haz clic en "Ejecutar" para ver cómo el robot sigue tus instrucciones.</li>
                      <li>El objetivo es encender todas las casillas marcadas.</li>
                      <li>Tienes 3 vidas. Pierdes una vida si tu solución no es correcta.</li>
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="w-full">
                <InstructionPanel
                  onAddCommand={addCommand}
                  availableCommands={levels[currentLevel].availableCommands}
                  disabled={isExecuting || commands.length >= commandLimit || isComplete}
                />
              </div>
            </div>
            {/* Main game area: tablero y robot */}
            <div className="flex-1 flex flex-col items-center order-2 md:order-none min-w-0">
              <div className="relative w-full max-w-[480px] aspect-square mx-auto min-h-[320px] sm:min-h-[400px]">
                <GameBoard
                  board={levels[currentLevel].board}
                  robotPosition={robotPosition}
                  targetCells={levels[currentLevel].targetCells}
                  litCells={litCells}
                  robot3D={robot3D}
                  compact
                />
                {/* Robot SVG perfectamente centrado en la celda, sin flecha ni círculo de seguimiento, solo sombra/glow */}
                {!robot3D && (
                  <div
                    className="absolute z-10 pointer-events-none"
                    style={{
                      left: `calc((100% / ${levels[currentLevel].board[0].length}) * ${robotPosition.x})`,
                      top: `calc((100% / ${levels[currentLevel].board.length}) * ${robotPosition.y})`,
                      width: `calc(100% / ${levels[currentLevel].board[0].length})`,
                      height: `calc(100% / ${levels[currentLevel].board.length})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "left 0.4s cubic-bezier(.4,2,.6,1), top 0.4s cubic-bezier(.4,2,.6,1)"
                    }}
                  >
                    <div style={{ filter: 'drop-shadow(0 8px 24px #818cf8cc) drop-shadow(0 0px 8px #38d9a9cc)' }}>
                      <RobotSVG direction={robotPosition.direction} size={56} mood={robotMood} animate={!isComplete} />
                    </div>
                  </div>
                )}
                {robot3D && (
                  <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/10 rounded-lg">
                    <span className="text-purple-300 text-lg font-bold">[Robot 3D experimental aquí]</span>
                  </div>
                )}
              </div>
              {/* Botón para avanzar al siguiente nivel */}
              {isComplete && isSuccess && currentLevel < levels.length - 1 && (
                <Button
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => startLevel(currentLevel + 1)}
                >
                  Siguiente nivel
                </Button>
              )}
            </div>
            {/* Panel de secuencia de comandos a la derecha */}
            <div className="w-full md:w-[320px] flex-shrink-0 flex flex-col gap-2 items-stretch order-3 md:order-none">
              <div className="bg-[#1e2330] rounded-lg p-4 border border-gray-800 w-full">
                <CommandZone
                  commands={commands}
                  onRemoveCommand={removeCommand}
                  isExecuting={isExecuting}
                  currentStep={steps}
                  vertical
                />
              </div>
              {/* Botones principales debajo de comandos */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <Button
                  className="bg-green-600 hover:bg-green-700 w-full text-base py-3"
                  onClick={executeCommands}
                  disabled={isExecuting || commands.length === 0 || isComplete}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Ejecutar
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 w-full text-base py-3"
                  onClick={resetLevel}
                  disabled={isExecuting}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reiniciar
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 w-full text-base py-3"
                  onClick={handleBackToLevels}
                >
                  Cambiar nivel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

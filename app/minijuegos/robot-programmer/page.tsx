"use client"

import { useState, useEffect, useMemo, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Play, RotateCcw, Info, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import GameBoard from "@/components/robot-programmer/game-board"
import CommandZone from "@/components/robot-programmer/command-zone"
import LevelSelector from "@/components/robot-programmer/level-selector"
import { getLevels, runProgram, explainFailure } from "@/lib/robot-programmer"
import { formatTime } from "@/lib/utils"
import { useResultadosCuenta } from "@/lib/use-resultados"
import { fusionarTiempos } from "@/lib/resultados-cuenta"
import GuardadoResultado from "@/components/minijuegos/guardado-resultado"
import AvisoPartida from "@/components/minijuegos/aviso-partida"
import { descartarPartida, esEstadoRobot, leerPartida } from "@/lib/estado-partida"
import { useAutoguardado } from "@/lib/use-autoguardado"
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
  const [hintsShown, setHintsShown] = useState(0) // pistas reveladas del nivel actual
  const [retomada, setRetomada] = useState(false)
  const tiempoRef = useRef(0)
  const [introClosed, setIntroClosed] = useState<number[]>([]) // niveles cuya explicación se cerró
  const [failureMessage, setFailureMessage] = useState<string | null>(null)
  const isMobile = useIsMobile()

  // Iniciar el juego con un nivel seleccionado (retomando la partida guardada de la cuenta si existe)
  const startLevel = async (levelIndex: number) => {
    const level = levels[levelIndex]
    const guardada = await leerPartida("robot", String(level.id))
    const retoma =
      guardada && esEstadoRobot(guardada.estado, level.commandLimit || 10, level.hints.length) ? guardada : null
    setCurrentLevel(levelIndex)
    setCommands(retoma ? (retoma.estado as { commands: string[] }).commands : [])
    setIsExecuting(false)
    setIsComplete(false)
    setIsSuccess(false)
    setRobotPosition({ ...level.startPosition })
    setLitCells([])
    setTime(retoma ? (retoma.estado as { time: number }).time : 0)
    setIsActive(true)
    setShowLevelSelector(false)
    setCommandLimit(level.commandLimit || 10)
    setSteps(0)
    setLives(retoma && Number.isInteger(retoma.vidas) && retoma.vidas >= 1 && retoma.vidas <= 3 ? retoma.vidas : 3)
    setHintsShown(retoma ? (retoma.estado as { hintsShown: number }).hintsShown : 0)
    setRetomada(Boolean(retoma))
    setFailureMessage(null)
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

  tiempoRef.current = time
  // REQ-006: el programa en curso se guarda en la cuenta (sin el cronómetro, que se agrega al guardar)
  const estadoPartida = useMemo(
    () => (showLevelSelector ? null : { commands, hintsShown }),
    [showLevelSelector, commands, hintsShown],
  )
  const { errorGuardado } = useAutoguardado(
    "robot",
    showLevelSelector ? null : String(levels[currentLevel].id),
    estadoPartida,
    isActive && !isComplete,
    { vidas: lives, extra: () => ({ time: tiempoRef.current }) },
  )
  // Si se pierde el nivel no queda nada que retomar
  useEffect(() => {
    if (isComplete && !isSuccess && !showLevelSelector) descartarPartida("robot", String(levels[currentLevel].id))
  }, [isComplete, isSuccess, showLevelSelector, currentLevel, levels])

  // Los logros de la cuenta se suman a lo guardado en este navegador (REQ-002)
  const resultadosCuenta = useResultadosCuenta("robot")
  useEffect(() => {
    if (!resultadosCuenta) return
    const deCuenta: Record<string, number> = {}
    resultadosCuenta.forEach((r) => {
      const i = levels.findIndex((l) => String(l.id) === r.actividad)
      if (i >= 0) deCuenta[String(i)] = r.tiempo
    })
    setBestTimes((prev) => {
      const fusion = fusionarTiempos(Object.fromEntries(Object.entries(prev)), deCuenta)
      return Object.fromEntries(Object.entries(fusion).map(([k, v]) => [Number(k), v]))
    })
  }, [resultadosCuenta, levels])

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
    if (isExecuting || commands.length === 0) return

    setIsExecuting(true)
    setSteps(0)
    setFailureMessage(null)

    // Reiniciar el estado del robot
    const level = levels[currentLevel]
    setRobotPosition({ ...level.startPosition })
    setLitCells([])

    // Simular el programa completo y animar cada paso
    const run = runProgram(commands, level)
    if (run.error) {
      // Bucle mal formado: no se ejecuta ni resta vidas
      setFailureMessage(run.error)
      setIsExecuting(false)
      return
    }
    for (let i = 0; i < run.frames.length; i++) {
      setSteps(run.frames[i].source + 1)
      setRobotPosition({ ...run.frames[i].position })
      setLitCells([...run.frames[i].litCells])
      await new Promise((resolve) => setTimeout(resolve, executionSpeed))
    }

    if (run.success) {
      setIsSuccess(true)
      setIsComplete(true)
      setIsActive(false)
    } else {
      // Explicar en qué paso y por qué falló, y restar una vida
      setFailureMessage(explainFailure(run))
      setLives((prev) => {
        const newLives = Math.max(0, prev - 1)
        if (newLives <= 0) {
          setIsComplete(true)
          setIsSuccess(false)
          setIsActive(false)
        }
        return newLives
      })
    }

    setIsExecuting(false)
  }

  // Revelar la siguiente pista (no completa el nivel ni resta vidas)
  const showNextHint = () => {
    const total = levels[currentLevel].hints.length
    setHintsShown((n) => Math.min(n + 1, total))
  }

  // Reiniciar el nivel actual
  const resetLevel = () => {
    const level = levels[currentLevel]
    setRetomada(false)
    descartarPartida("robot", String(level.id))
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
    setHintsShown(0)
    setFailureMessage(null)
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

  // Estados para datos de usuario
  const [userId, setUserId] = useState<string | null>(null);
  const [userRol, setUserRol] = useState<string>("estudiante");
  const [userNeuronas, setUserNeuronas] = useState<number>(3);

  // Cargar datos de usuario al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const usuario = localStorage.getItem("usuario");
      if (usuario) {
        try {
          const user = JSON.parse(usuario);
          setUserId(user.id?.toString() || null);
          setUserRol(user.rol || "estudiante");
          setUserNeuronas(user.neuronas ?? 3);
        } catch {}
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <NavBar activePage="minijuegos" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-400 hover:text-foreground"
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
                    <div>
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
              {isComplete && isSuccess && (
                <GuardadoResultado juego="robot" actividad={String(levels[currentLevel].id)} tiempo={time} />
              )}
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
              <div className="bg-card rounded-lg p-4 border border-gray-800 w-full">
                <CommandZone
                  commands={commands}
                  onRemoveCommand={removeCommand}
                  isExecuting={isExecuting}
                  currentStep={steps}
                  vertical
                />
              </div>
              {/* Reglas y ejemplo antes de usar un concepto nuevo */}
              {levels[currentLevel].intro && !introClosed.includes(currentLevel) && (
                <div className="rounded-lg border border-blue-400/40 bg-blue-400/10 p-3 text-sm text-blue-100 space-y-2">
                  <div className="font-bold">{levels[currentLevel].intro!.title}</div>
                  <ul className="list-disc list-inside space-y-1">
                    {levels[currentLevel].intro!.rules.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                  <p className="italic">{levels[currentLevel].intro!.example}</p>
                  <Button size="sm" variant="outline" onClick={() => setIntroClosed((c) => [...c, currentLevel])}>
                    Entendido
                  </Button>
                </div>
              )}
              <AvisoPartida retomada={retomada} errorGuardado={errorGuardado} onEmpezarDeNuevo={resetLevel} />
              {/* Por qué falló el último programa */}
              {failureMessage && (
                <div role="alert" className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                  {failureMessage}
                </div>
              )}
              {/* Pistas graduales */}
              {hintsShown > 0 && (
                <ol aria-live="polite" className="rounded-lg border border-amber-400/40 bg-amber-400/10 p-3 text-sm text-amber-100 space-y-2 list-decimal list-inside">
                  {levels[currentLevel].hints.slice(0, hintsShown).map((hint, i) => (
                    <li key={i}>{hint}</li>
                  ))}
                </ol>
              )}
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
                  className="border-amber-400/50 text-amber-200 hover:bg-amber-400/10 w-full text-base py-3"
                  onClick={showNextHint}
                  disabled={isExecuting || isComplete || hintsShown >= levels[currentLevel].hints.length}
                >
                  <Lightbulb className="h-4 w-4 mr-2" />
                  {hintsShown === 0
                    ? "Pedir pista"
                    : hintsShown >= levels[currentLevel].hints.length
                      ? "Sin más pistas"
                      : `Otra pista (${hintsShown}/${levels[currentLevel].hints.length})`}
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

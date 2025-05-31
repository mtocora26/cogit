import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Configuraciones de rondas con dificultad progresiva
const roundsConfig = [
  {
    gridSize: 3,
    initialRobot: { x: 0, y: 2, dir: 0 },
    goal: { x: 2, y: 0 },
    instructionsList: ["Avanzar", "Girar derecha", "Girar izquierda"],
  },
  {
    gridSize: 4,
    initialRobot: { x: 0, y: 3, dir: 1 },
    goal: { x: 3, y: 0 },
    instructionsList: ["Avanzar", "Girar derecha", "Girar izquierda"],
  },
  {
    gridSize: 4,
    initialRobot: { x: 3, y: 3, dir: 0 },
    goal: { x: 0, y: 0 },
    instructionsList: ["Avanzar", "Girar derecha", "Girar izquierda"],
  },
  {
    gridSize: 5,
    initialRobot: { x: 2, y: 4, dir: 2 },
    goal: { x: 4, y: 0 },
    instructionsList: ["Avanzar", "Girar derecha", "Girar izquierda", "Saltar"], // "Saltar" es opcional
  },
  {
    gridSize: 5,
    initialRobot: { x: 0, y: 0, dir: 1 },
    goal: { x: 4, y: 4 },
    instructionsList: ["Avanzar", "Girar derecha", "Girar izquierda", "Saltar"],
  },
]
const MAX_ROUNDS = roundsConfig.length;

function move(robot: any, instruction: string, gridSize: number) {
  let { x, y, dir } = robot
  if (instruction === "Avanzar") {
    if (dir === 0 && y > 0) y--
    if (dir === 1 && x < gridSize - 1) x++
    if (dir === 2 && y < gridSize - 1) y++
    if (dir === 3 && x > 0) x--
  } else if (instruction === "Girar derecha") {
    dir = (dir + 1) % 4
  } else if (instruction === "Girar izquierda") {
    dir = (dir + 3) % 4
  } else if (instruction === "Saltar") {
    // Salta dos casillas hacia adelante si es posible
    if (dir === 0 && y > 1) y -= 2
    if (dir === 1 && x < gridSize - 2) x += 2
    if (dir === 2 && y < gridSize - 2) y += 2
    if (dir === 3 && x > 1) x -= 2
  }
  return { x, y, dir }
}

export default function RobotProgrammer({ onComplete }: { onComplete: (success: boolean, time: number) => void }) {
  const [round, setRound] = useState(1)
  const [instructions, setInstructions] = useState<string[]>([])
  const [robot, setRobot] = useState(roundsConfig[0].initialRobot)
  const [isRunning, setIsRunning] = useState(false)
  const [success, setSuccess] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [startTime, setStartTime] = useState<number | null>(null)

  // Configuración de la ronda actual
  const config = roundsConfig[round - 1]
  const { gridSize, initialRobot, goal, instructionsList } = config

  // Reset robot e instrucciones al cambiar de ronda
  function resetToRound() {
    setInstructions([])
    setRobot(initialRobot)
    setSuccess(false)
    setFeedback(null)
    setStartTime(null)
  }

  // Si cambia la ronda, resetea el estado
  // (useEffect no es necesario porque el botón de siguiente ronda ya lo hace)

  const handleAdd = (inst: string) => {
    if (isRunning) return
    setInstructions([...instructions, inst])
  }
  const handleRemove = (idx: number) => {
    if (isRunning) return
    setInstructions(instructions.filter((_, i) => i !== idx))
  }
  const handleRun = () => {
    setIsRunning(true)
    setStartTime(Date.now())
    let r = { ...initialRobot }
    for (let i = 0; i < instructions.length; i++) {
      r = move(r, instructions[i], gridSize)
    }
    setRobot(r)
    const ok = r.x === goal.x && r.y === goal.y
    setSuccess(ok)
    setFeedback(ok ? "¡El robot llegó al objetivo!" : "El robot no llegó. Analiza y corrige la secuencia.")
    setTimeout(() => {
      setIsRunning(false)
      if (round < MAX_ROUNDS) {
        setRound(round + 1)
        setInstructions([])
        setRobot(roundsConfig[round].initialRobot)
        setSuccess(false)
        setFeedback(null)
        setStartTime(null)
      } else {
        onComplete(ok, startTime ? Math.floor((Date.now() - startTime) / 1000) : 0)
      }
    }, 2000)
  }
  const handleReset = () => {
    resetToRound()
  }
  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Programa al robot</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-400">Ronda:</span>
        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">{round}/{MAX_ROUNDS}</span>
      </div>
      <div className="mb-4 grid" style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`, width: `${gridSize * 3}rem` }}>
        {[...Array(gridSize * gridSize)].map((_, i) => {
          const x = i % gridSize
          const y = Math.floor(i / gridSize)
          const isRobot = robot.x === x && robot.y === y
          const isGoal = goal.x === x && goal.y === y
          return (
            <div
              key={i}
              className={cn(
                "w-12 h-12 border flex items-center justify-center rounded text-3xl",
                isGoal ? "bg-green-400/40 border-green-400" : "bg-[#23283a] border-gray-700"
              )}
            >
              {isRobot ? "🤖" : isGoal ? "🎯" : null}
            </div>
          )
        })}
      </div>
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {instructionsList.map((inst) => (
          <Button key={inst} size="sm" variant="outline" onClick={() => handleAdd(inst)} disabled={isRunning}>{inst}</Button>
        ))}
      </div>
      <div className="mb-4 flex flex-wrap gap-2 justify-center">
        {instructions.map((inst, idx) => (
          <div key={idx} className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded flex items-center gap-1">
            <span>{inst}</span>
            <Button size="sm" variant="ghost" onClick={() => handleRemove(idx)} disabled={isRunning}>✕</Button>
          </div>
        ))}
      </div>
      {feedback && <div className={cn("mb-4 font-semibold", success ? "text-green-400" : "text-yellow-400")}>{feedback}</div>}
      <div className="flex gap-2 justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleRun} disabled={isRunning || instructions.length === 0}>Ejecutar</Button>
        <Button className="bg-gray-600 hover:bg-gray-700" onClick={handleReset} disabled={isRunning}>Reiniciar</Button>
      </div>
    </div>
  )
}

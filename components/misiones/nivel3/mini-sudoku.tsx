import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Banco de 3 tableros de mini-sudoku
const rounds = [
  {
    initialBoard: [
      [1, 0, 3],
      [0, 2, 0],
      [0, 0, 0],
    ],
    solution: [
      [1, 2, 3],
      [3, 2, 1],
      [2, 1, 3],
    ],
    hint: "Recuerda: no se repiten números en filas ni columnas.",
  },
  {
    initialBoard: [
      [0, 2, 0],
      [1, 0, 3],
      [0, 0, 0],
    ],
    solution: [
      [3, 2, 1],
      [1, 3, 2],
      [2, 1, 3],
    ],
    hint: "Empieza por las filas con más números dados.",
  },
  {
    initialBoard: [
      [0, 0, 2],
      [0, 1, 0],
      [3, 0, 0],
    ],
    solution: [
      [1, 3, 2],
      [2, 1, 3],
      [3, 2, 1],
    ],
    hint: "Fíjate en las columnas para deducir los números que faltan.",
  },
]
const MAX_ROUNDS = rounds.length

export default function MiniSudoku({ onComplete }: { onComplete: (success: boolean, time: number) => void }) {
  const [round, setRound] = useState(1)
  const [board, setBoard] = useState(rounds[0].initialBoard.map((row) => [...row]))
  const [selected, setSelected] = useState<[number, number] | null>(null)
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState<string | null>(null)
  const [startTime] = useState(Date.now())
  const [attempts, setAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)

  const current = rounds[round - 1]

  const handleCellClick = (row: number, col: number) => {
    if (completed || current.initialBoard[row][col] !== 0) return
    setSelected([row, col])
  }
  const handleNumber = (num: number) => {
    if (!selected) return
    const [row, col] = selected
    const newBoard = board.map((r) => [...r])
    newBoard[row][col] = num
    setBoard(newBoard)
    setSelected(null)
  }
  const checkSolution = () => {
    let ok = true
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] !== current.solution[i][j]) ok = false
      }
    }
    setCompleted(true)
    setFeedback(ok ? "¡Correcto! Sudoku resuelto." : "Hay errores. Revisa las filas y columnas.")
    setAttempts((a) => a + 1)
    setTimeout(() => {
      if (ok && round < MAX_ROUNDS) {
        setRound(round + 1)
        setBoard(rounds[round].initialBoard.map((row) => [...row]))
        setCompleted(false)
        setFeedback(null)
        setSelected(null)
        setShowHint(false)
        setAttempts(0)
      } else if (ok && round === MAX_ROUNDS) {
        onComplete(true, Math.floor((Date.now() - startTime) / 1000))
      }
    }, 2000)
  }
  const reset = () => {
    setBoard(current.initialBoard.map((row) => [...row]))
    setCompleted(false)
    setFeedback(null)
    setSelected(null)
    setShowHint(false)
    setAttempts(0)
  }
  const giveHint = () => {
    setShowHint(true)
  }
  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Rompecabezas lógico (Mini Sudoku)</h2>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-sm text-gray-400">Ronda:</span>
        <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-sm">
          {round}/{MAX_ROUNDS}
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-2 w-40 mx-auto">
        {board.map((row, i) =>
          row.map((cell, j) => (
            <button
              key={i + "-" + j}
              className={cn(
                "w-12 h-12 border flex items-center justify-center rounded text-xl font-bold",
                current.initialBoard[i][j] !== 0
                  ? "bg-gray-700 text-gray-400"
                  : selected && selected[0] === i && selected[1] === j
                  ? "bg-blue-500/30 border-blue-400"
                  : "bg-[#23283a] border-gray-700"
              )}
              onClick={() => handleCellClick(i, j)}
              disabled={completed || current.initialBoard[i][j] !== 0}
            >
              {cell !== 0 ? cell : ""}
            </button>
          ))
        )}
      </div>
      <div className="mb-4 flex gap-2 justify-center">
        {[1, 2, 3].map((num) => (
          <Button key={num} size="sm" variant="outline" onClick={() => handleNumber(num)} disabled={!selected || completed}>
            {num}
          </Button>
        ))}
      </div>
      {feedback && (
        <div className={cn("mb-4 font-semibold", feedback.includes("Correcto") ? "text-green-400" : "text-yellow-400")}>
          {feedback}
        </div>
      )}
      {!completed && (
        <Button className="bg-blue-600 hover:bg-blue-700" onClick={checkSolution}>
          Verificar
        </Button>
      )}
      {completed && (
        <Button className="mt-4 bg-gray-600 hover:bg-gray-700" onClick={reset}>
          {round < MAX_ROUNDS ? "Siguiente ronda" : "Intentar otro"}
        </Button>
      )}
      {!completed && attempts >= 2 && (
        <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700" onClick={giveHint}>
          Pista
        </Button>
      )}
      {showHint && <div className="mt-2 text-blue-300">Pista: {current.hint}</div>}
    </div>
  )
}

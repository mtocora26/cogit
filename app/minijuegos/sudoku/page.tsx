"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Lightbulb, RotateCcw, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import SudokuBoard from "@/components/sudoku/sudoku-board"
import SudokuControls from "@/components/sudoku/sudoku-controls"
import LevelSelector from "@/components/sudoku/level-selector"
import { generateSudoku, checkSolution } from "@/lib/sudoku"
import { formatTime } from "@/lib/utils"

export default function SudokuPage() {
  const router = useRouter()
  const [difficulty, setDifficulty] = useState<"facil" | "medio" | "dificil">("facil")
  const [board, setBoard] = useState<number[][]>([])
  const [initialBoard, setInitialBoard] = useState<number[][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null)
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [errors, setErrors] = useState<[number, number][]>([])
  const [notes, setNotes] = useState<Record<string, number[]>>({})
  const [isNotesMode, setIsNotesMode] = useState(false)
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [showLevelSelector, setShowLevelSelector] = useState(true)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [solution, setSolution] = useState<number[][]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [bestTimes, setBestTimes] = useState<{ [key in "facil" | "medio" | "dificil"]?: number }>({})

  // Cargar datos de usuario al montar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const usuario = localStorage.getItem("usuario")
      if (usuario) {
        try {
          const user = JSON.parse(usuario)
          // setUserId(user.id?.toString() || null)
          // setUserRol(user.rol || "user")
          // setUserNeuronas(user.neuronas ?? 3)
          // setUserCreditos(user.creditos ?? 0)
        } catch {}
      }
    }
  }, [])

  // Iniciar el juego con un nivel seleccionado
  const startGame = (level: "facil" | "medio" | "dificil") => {
    setDifficulty(level)
    const emptyCells = level === "facil" ? 30 : level === "medio" ? 45 : 55
    const { puzzle, solution: solvedPuzzle } = generateSudoku(emptyCells)
    setBoard(JSON.parse(JSON.stringify(puzzle)))
    setInitialBoard(JSON.parse(JSON.stringify(puzzle)))
    setSolution(solvedPuzzle)
    setSelectedCell(null)
    setIsComplete(false)
    setIsCorrect(false)
    setErrors([])
    setNotes({})
    setIsNotesMode(false)
    setTime(0)
    setIsActive(true)
    setShowLevelSelector(false)
    setHintsUsed(0)
    setGameStarted(true)
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
    const savedTimes = localStorage.getItem("sudokuBestTimes")
    if (savedTimes) {
      setBestTimes(JSON.parse(savedTimes))
    }
  }, [])

  // Guardar mejor tiempo cuando se completa un nivel
  useEffect(() => {
    if (isComplete && isCorrect) {
      const currentBest = bestTimes[difficulty] || Number.POSITIVE_INFINITY
      if (time < currentBest) {
        const newBestTimes = { ...bestTimes, [difficulty]: time }
        setBestTimes(newBestTimes)
        localStorage.setItem("sudokuBestTimes", JSON.stringify(newBestTimes))
      }
    }
  }, [isComplete, isCorrect, difficulty, time, bestTimes])

  // Verificar si el tablero está completo
  useEffect(() => {
    if (!board.length) return

    const isBoardFilled = board.every((row) => row.every((cell) => cell !== 0))

    if (isBoardFilled) {
      setIsComplete(true)
      setIsActive(false)

      const isValid = checkSolution(board)
      setIsCorrect(isValid)

      if (!isValid) {
        // Encontrar errores
        const newErrors: [number, number][] = []
        for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
            if (board[i][j] !== solution[i][j]) {
              newErrors.push([i, j])
            }
          }
        }
        setErrors(newErrors)
      }
    }
  }, [board, solution])

  // Manejar la selección de una celda
  const handleCellSelect = (row: number, col: number) => {
    if (initialBoard[row][col] === 0) {
      setSelectedCell([row, col])
    }
  }

  // Manejar la entrada de un número
  const handleNumberInput = (num: number) => {
    if (!selectedCell) return

    const [row, col] = selectedCell

    if (initialBoard[row][col] !== 0) return

    const newBoard = [...board]

    if (isNotesMode) {
      // Modo de notas
      const cellKey = `${row}-${col}`
      const currentNotes = notes[cellKey] || []

      if (currentNotes.includes(num)) {
        // Eliminar la nota si ya existe
        setNotes({
          ...notes,
          [cellKey]: currentNotes.filter((n) => n !== num),
        })
      } else {
        // Agregar la nota
        setNotes({
          ...notes,
          [cellKey]: [...currentNotes, num].sort(),
        })
      }
    } else {
      // Modo normal - colocar número
      // Verificar si el número es correcto
      if (solution[row][col] !== num) {
        // Número incorrecto, reducir vidas
        // setLives((prev) => Math.max(0, prev - 1))

        // Mostrar error brevemente
        setErrors([[row, col]])
        setTimeout(() => {
          setErrors([])
        }, 1000)

        // Si se quedan sin vidas, mostrar la solución
        // if (lives <= 1) {
        //   setIsComplete(true)
        //   setIsCorrect(false)
        //   setIsActive(false)
        //   return
        // }

        // No colocar el número incorrecto
        return
      }

      newBoard[row][col] = num
      setBoard(newBoard)

      // Limpiar notas para esta celda
      const cellKey = `${row}-${col}`
      if (notes[cellKey]) {
        const newNotes = { ...notes }
        delete newNotes[cellKey]
        setNotes(newNotes)
      }
    }
  }

  // Borrar el número de la celda seleccionada
  const handleClearCell = () => {
    if (!selectedCell) return

    const [row, col] = selectedCell

    if (initialBoard[row][col] !== 0) return

    const newBoard = [...board]
    newBoard[row][col] = 0
    setBoard(newBoard)

    // También limpiar las notas
    const cellKey = `${row}-${col}`
    if (notes[cellKey]) {
      const newNotes = { ...notes }
      delete newNotes[cellKey]
      setNotes(newNotes)
    }
  }

  // Reiniciar el juego actual
  const handleReset = () => {
    setBoard(JSON.parse(JSON.stringify(initialBoard)))
    setSelectedCell(null)
    setIsComplete(false)
    setIsCorrect(false)
    setErrors([])
    setNotes({})
    setIsNotesMode(false)
    setTime(0)
    setIsActive(true)
    setHintsUsed(0)
  }

  // Volver al selector de niveles
  const handleBackToLevels = () => {
    setShowLevelSelector(true)
    setIsActive(false)
    setGameStarted(false)
  }

  // Dar una pista (revelar una celda)
  const handleHint = () => {
    if (!selectedCell || hintsUsed >= 3) return

    const [row, col] = selectedCell

    if (initialBoard[row][col] !== 0) return

    const newBoard = [...board]
    newBoard[row][col] = solution[row][col]
    setBoard(newBoard)
    setHintsUsed((prevHints) => prevHints + 1)
  }

  return (
    <>
      <NavBar />
      {showLevelSelector ? (
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 md:top-8 md:left-8 z-10"
            onClick={() => router.push("/minijuegos")}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <div className="max-h-[calc(100vh-120px)] overflow-y-auto">
            <LevelSelector onStartGame={startGame} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 left-4 md:top-8 md:left-8 z-10"
            onClick={handleBackToLevels}
          >
            <ArrowLeft className="h-6 w-6" />
          </Button>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="order-2 md:order-1">
              <SudokuBoard
                board={board}
                initialBoard={initialBoard}
                selectedCell={selectedCell}
                errors={errors}
                notes={notes}
                onCellSelect={handleCellSelect}
              />
            </div>

            <div className="order-1 md:order-2 flex flex-col gap-4 min-w-[250px]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-500" />
                  <span>{formatTime(time)}</span>
                </div>
              </div>
              <SudokuControls
                onNumberInput={handleNumberInput}
                onClearCell={handleClearCell}
                onNotesModeToggle={() => setIsNotesMode(!isNotesMode)}
                isNotesMode={isNotesMode}
              />
              <div className="flex flex-col gap-2">
                <Button variant="outline" onClick={handleHint} disabled={hintsUsed >= 3 || !selectedCell}>
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Pista ({3 - hintsUsed} restantes)
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reiniciar
                </Button>
                <Button variant="destructive" onClick={handleBackToLevels}>
                  <XCircle className="mr-2 h-4 w-4" />
                  Volver a niveles
                </Button>
              </div>
            </div>
          </div>

          {isComplete && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                {isCorrect ? (
                  <>
                    <CheckCircle className="text-green-500 mx-auto h-12 w-12" />
                    <h2 className="text-2xl font-semibold text-center">¡Sudoku Resuelto!</h2>
                    {bestTimes[difficulty] === time && (
                      <p className="text-lg text-center text-green-600">¡Nuevo mejor tiempo para {difficulty}!</p>
                    )}
                    <p className="text-gray-600 text-center">Tiempo: {formatTime(time)}</p>
                    <Button className="w-full mt-4" onClick={handleBackToLevels}>
                      Volver a niveles
                    </Button>
                  </>
                ) : (
                  <>
                    <XCircle className="text-red-500 mx-auto h-12 w-12" />
                    <h2 className="text-2xl font-semibold text-center">¡Incorrecto!</h2>
                    <p className="text-gray-600 text-center">Has cometido errores.</p>
                    <Button className="w-full mt-4" onClick={handleReset}>
                      Reintentar
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  )
}

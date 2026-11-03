"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Heart, Clock, Trophy, RotateCcw, HelpCircle, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import NonogramBoard from "@/components/nonogram/nonogram-board"
import NonogramControls from "@/components/nonogram/nonogram-controls"
import LevelSelector from "@/components/nonogram/level-selector"
import { getNonogramLevels, checkNonogramSolution } from "@/lib/nonogram"
import { formatTime } from "@/lib/utils"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function NonogramasPage() {
  const router = useRouter()
  const [showLevelSelector, setShowLevelSelector] = useState(true)
  const [currentLevel, setCurrentLevel] = useState(0)
  const [board, setBoard] = useState<number[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [rowClues, setRowClues] = useState<number[][]>([])
  const [colClues, setColClues] = useState<number[][]>([])
  const [isComplete, setIsComplete] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [time, setTime] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [levels] = useState(getNonogramLevels())
  const [errors, setErrors] = useState<{ row: number; col: number }[]>([])
  const [showTutorial, setShowTutorial] = useState(false)
  const [bestTimes, setBestTimes] = useState<{ [key: number]: number }>({})
  const [completedImages, setCompletedImages] = useState<{ [key: number]: boolean }>({})
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)

  // Iniciar el juego con un nivel seleccionado
  const startLevel = (levelIndex: number) => {
    const level = levels[levelIndex]
    setCurrentLevel(levelIndex)
    setSolution(level.solution)

    // Crear un tablero vacío del mismo tamaño que la solución
    const emptyBoard = Array(level.solution.length)
      .fill(0)
      .map(() => Array(level.solution[0].length).fill(0))

    setBoard(emptyBoard)
    setRowClues(level.rowClues)
    setColClues(level.colClues)
    setIsComplete(false)
    setIsCorrect(false)
    setTime(0)
    setIsActive(true)
    setShowLevelSelector(false)
    setErrors([])
    setShowHint(false)
    setShowCompletionAnimation(false)

    // Mostrar tutorial solo para el primer nivel y solo la primera vez
    setShowTutorial(levelIndex === 0 && !localStorage.getItem("nonogramTutorialSeen"))
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

  // Cargar mejores tiempos y nonogramas completados desde localStorage
  useEffect(() => {
    const savedTimes = localStorage.getItem("nonogramBestTimes")
    if (savedTimes) {
      setBestTimes(JSON.parse(savedTimes))
    }

    const savedCompletedImages = localStorage.getItem("nonogramCompletedImages")
    if (savedCompletedImages) {
      setCompletedImages(JSON.parse(savedCompletedImages))
    }
  }, [])

  // Guardar mejor tiempo cuando se completa un nivel
  useEffect(() => {
    if (isComplete && isCorrect) {
      const currentBest = bestTimes[currentLevel] || Number.POSITIVE_INFINITY
      if (time < currentBest) {
        const newBestTimes = { ...bestTimes, [currentLevel]: time }
        setBestTimes(newBestTimes)
        localStorage.setItem("nonogramBestTimes", JSON.stringify(newBestTimes))
      }

      // Guardar la imagen completada
      const newCompletedImages = { ...completedImages, [currentLevel]: true }
      setCompletedImages(newCompletedImages)
      localStorage.setItem("nonogramCompletedImages", JSON.stringify(newCompletedImages))
    }
  }, [isComplete, isCorrect, currentLevel, time, bestTimes, completedImages])

  // Marcar tutorial como visto
  useEffect(() => {
    if (!showTutorial && currentLevel === 0) {
      localStorage.setItem("nonogramTutorialSeen", "true")
    }
  }, [showTutorial, currentLevel])

  // Manejar clic en una celda
  const handleCellClick = (row: number, col: number, rightClick = false) => {
    if (isComplete) return

    const newBoard = [...board.map((row) => [...row])]

    // Clic derecho marca con X (2), clic izquierdo marca como lleno (1)
    const newValue = rightClick
      ? newBoard[row][col] === 2
        ? 0
        : 2 // Toggle X
      : newBoard[row][col] === 1
        ? 0
        : 1 // Toggle filled

    newBoard[row][col] = newValue
    setBoard(newBoard)

    // Verificar si el tablero está completo (todas las celdas que deberían estar llenas lo están)
    const filledCells = newBoard.flat().filter((cell) => cell === 1).length
    const solutionFilledCells = solution.flat().filter((cell) => cell === 1).length

    // Solo verificamos la solución cuando el número de celdas marcadas coincide con la solución
    if (filledCells === solutionFilledCells) {
      const result = checkNonogramSolution(newBoard, solution)

      if (result.isCorrect) {
        setIsComplete(true)
        setIsCorrect(true)
        setIsActive(false)
        // Mostrar animación de completado
        setShowCompletionAnimation(true)
        setTimeout(() => {
          setShowCompletionAnimation(false)
        }, 3000) // Mostrar la animación por 3 segundos
      } else if (result.errors.length > 0) {
        // Si hay errores, reducir vidas
        setErrors(result.errors)

        // Si se quedan sin vidas, mostrar la solución
        if (errors.length <= 1) {
          setIsComplete(true)
          setIsCorrect(false)
          setIsActive(false)
        } else {
          // Limpiar errores después de un tiempo
          setTimeout(() => {
            setErrors([])
          }, 2000)
        }
      }
    }
  }

  // Reiniciar el nivel actual
  const resetLevel = () => {
    const emptyBoard = Array(solution.length)
      .fill(0)
      .map(() => Array(solution[0].length).fill(0))

    setBoard(emptyBoard)
    setIsComplete(false)
    setIsCorrect(false)
    setTime(0)
    setIsActive(true)
    setErrors([])
    setShowHint(false)
    setShowCompletionAnimation(false)
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

  // Mostrar pista
  const handleShowHint = () => {
    setShowHint(true)
    setTimeout(() => {
      setShowHint(false)
    }, 3000)
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
          <h1 className="text-2xl font-bold">Nonogramas</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-4">
        {showLevelSelector ? (
          <div className="relative">
            <div className="absolute inset-0 z-0">
              <Image
                src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=1200&auto=format&fit=crop"
                alt="Nonogramas Background"
                fill
                className="object-cover opacity-10"
              />
            </div>
            <div className="relative z-10">
              <LevelSelector
                levels={levels}
                onSelectLevel={startLevel}
                completedLevels={Object.keys(completedImages).map(Number)}
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
                    <span
                      className={cn(
                        "px-2 py-1 rounded text-xs font-bold",
                        currentLevel < 3
                          ? "bg-green-500/20 text-green-400"
                          : currentLevel < 6
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-red-500/20 text-red-400",
                      )}
                    >
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
                    disabled={isComplete}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reiniciar
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500/10"
                    onClick={handleShowHint}
                    disabled={isComplete || showHint}
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Pista
                  </Button>
                </div>
              </div>

              <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
                <h2 className="text-xl font-bold mb-4">Instrucciones</h2>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-purple-400">•</div>
                    <div>Rellena las celdas según los números de cada fila y columna.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-purple-400">•</div>
                    <div>Los números indican bloques consecutivos de celdas rellenas.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-purple-400">•</div>
                    <div>Clic izquierdo para rellenar, clic derecho para marcar con X.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="min-w-4 text-purple-400">•</div>
                    <div>Tienes 3 vidas. Pierdes una vida por cada error.</div>
                  </li>
                </ul>
                <Button
                  variant="link"
                  className="text-purple-400 p-0 h-auto mt-4"
                  onClick={() => setShowTutorial(true)}
                >
                  Ver tutorial completo
                </Button>
              </div>
            </div>

            {/* Center Column - Game Board */}
            <div className="md:col-span-2">
              {isComplete ? (
                <div className="bg-[#1e2330] rounded-lg p-8 text-center border border-gray-800 h-full flex flex-col items-center justify-center">
                  <div
                    className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isCorrect ? "bg-green-500/20 text-green-500" : "bg-red-500/20 text-red-500"}`}
                  >
                    {isCorrect ? <CheckCircle className="h-10 w-10" /> : <AlertCircle className="h-10 w-10" />}
                  </div>

                  <h2 className="text-3xl font-bold mb-4">{isCorrect ? "¡Felicidades!" : "¡Se acabaron las vidas!"}</h2>

                  <p className="text-xl text-gray-300 mb-6">
                    {isCorrect
                      ? `Has completado el nonograma en ${formatTime(time)}.`
                      : "No has podido completar el nonograma. ¡Inténtalo de nuevo!"}
                  </p>

                  {/* Mostrar la imagen completada */}
                  {isCorrect && (
                    <div className="mb-6 p-4 bg-[#1a1d23] rounded-lg border border-gray-700">
                      <h3 className="text-lg font-medium mb-3">¡Has creado esta imagen!</h3>
                      <div className="relative w-48 h-48 mx-auto">
                        <NonogramBoard
                          board={solution}
                          rowClues={[]}
                          colClues={[]}
                          onCellClick={() => {}}
                          errors={[]}
                          showHint={false}
                          solution={solution}
                          isPreview={true}
                        />
                      </div>
                      <p className="text-sm text-gray-400 mt-3">
                        Esta imagen se guardará en tu colección de nonogramas completados.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {isCorrect && currentLevel < levels.length - 1 ? (
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
                <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
                  {/* Animación de completado */}
                  {showCompletionAnimation && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/70 rounded-lg animate-fade-in">
                      <div className="text-center">
                        <div className="w-48 h-48 mx-auto mb-4 relative">
                          <NonogramBoard
                            board={solution}
                            rowClues={[]}
                            colClues={[]}
                            onCellClick={() => {}}
                            errors={[]}
                            showHint={false}
                            solution={solution}
                            isPreview={true}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        </div>
                        <h3 className="text-2xl font-bold mb-2 text-white">¡Imagen completada!</h3>
                        <p className="text-gray-300">Has descubierto la imagen oculta</p>
                      </div>
                    </div>
                  )}

                  <NonogramBoard
                    board={board}
                    rowClues={rowClues}
                    colClues={colClues}
                    onCellClick={handleCellClick}
                    errors={errors}
                    showHint={showHint}
                    solution={solution}
                    isPreview={false}
                  />

                  <NonogramControls />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Tutorial Modal */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e2330] rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto p-6 border border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Cómo jugar a Nonogramas</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2 text-purple-400">¿Qué son los nonogramas?</h3>
                <p className="text-gray-300">
                  Los nonogramas son puzzles lógicos donde debes rellenar celdas en una cuadrícula para revelar una
                  imagen oculta. Las pistas numéricas en cada fila y columna te indican cómo rellenar las celdas.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-purple-400">Reglas básicas</h3>
                <ul className="space-y-2 text-gray-300 list-disc pl-5">
                  <li>Los números al lado de cada fila indican bloques consecutivos de celdas que deben rellenarse.</li>
                  <li>
                    Por ejemplo, "3 1" significa que hay un bloque de 3 celdas seguido de al menos una celda vacía y
                    luego un bloque de 1 celda.
                  </li>
                  <li>Lo mismo aplica para las columnas con los números en la parte superior.</li>
                  <li>
                    Usa el clic izquierdo para rellenar una celda y el clic derecho para marcarla con una X (indicando
                    que debe quedar vacía).
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-purple-400">Ejemplo</h3>
                <div className="bg-[#1a1d23] p-4 rounded-lg">
                  <p className="text-gray-300 mb-2">
                    En una fila con la pista "3 1" y 5 celdas, la solución podría ser:
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="text-right w-10">3 1</div>
                    <div className="flex">
                      {["■", "■", "■", "□", "■"].map((cell, i) => (
                        <div key={i} className="w-6 h-6 border border-gray-600 flex items-center justify-center">
                          {cell}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2 text-purple-400">Consejos</h3>
                <ul className="space-y-2 text-gray-300 list-disc pl-5">
                  <li>
                    Comienza con las filas y columnas que tienen números grandes o muchos bloques, ya que tienen menos
                    posibilidades.
                  </li>
                  <li>Usa las X para marcar celdas que sabes que deben estar vacías.</li>
                  <li>
                    Busca superposiciones: si un bloque solo puede estar en cierta posición, puedes rellenar esas
                    celdas.
                  </li>
                  <li>
                    Revisa constantemente las filas y columnas para asegurarte de que tus marcas son consistentes.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <Button onClick={() => setShowTutorial(false)}>Entendido</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

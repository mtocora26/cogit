"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface NonogramBoardProps {
  board: number[][]
  rowClues: number[][]
  colClues: number[][]
  onCellClick: (row: number, col: number, rightClick?: boolean) => void
  errors: { row: number; col: number }[]
  showHint: boolean
  solution: number[][]
  isPreview?: boolean
}

export default function NonogramBoard({
  board,
  rowClues,
  colClues,
  onCellClick,
  errors,
  showHint,
  solution,
  isPreview = false,
}: NonogramBoardProps) {
  const boardRef = useRef<HTMLDivElement>(null)

  // Calcular el tamaño máximo de pistas para filas y columnas
  const maxRowClueLength = Math.max(...rowClues.map((clue) => clue.length), 1)
  const maxColClueLength = Math.max(...colClues.map((clue) => clue.length), 1)

  // Prevenir el menú contextual en clic derecho
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if (boardRef.current?.contains(e.target as Node)) {
        e.preventDefault()
      }
    }

    document.addEventListener("contextmenu", handleContextMenu)
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  // Verificar si una celda tiene error
  const hasError = (row: number, col: number) => {
    return errors.some((err) => err.row === row && err.col === col)
  }

  // Verificar si una celda debe mostrarse como pista
  const shouldShowHint = (row: number, col: number) => {
    if (!showHint) return false

    // Mostrar una pista aleatoria (una celda que debería estar rellena)
    const filledCells = []
    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution[0].length; c++) {
        if (solution[r][c] === 1 && board[r][c] !== 1) {
          filledCells.push({ row: r, col: c })
        }
      }
    }

    if (filledCells.length === 0) return false

    // Elegir una celda aleatoria para mostrar como pista
    const randomIndex = Math.floor(Math.random() * filledCells.length)
    const hintCell = filledCells[randomIndex]

    return row === hintCell.row && col === hintCell.col
  }

  // Si es una vista previa, mostrar solo el tablero completado sin pistas
  if (isPreview) {
    return (
      <div className="grid grid-cols-1 place-items-center">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${board.length}, 1fr)`,
            gap: "1px",
            width: "100%",
            height: "100%",
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn("aspect-square", cell === 1 ? "bg-purple-600" : "bg-background")}
              />
            )),
          )}
        </div>
      </div>
    )
  }

  return (
    <div ref={boardRef} className="flex flex-col items-center justify-center">
      <div className="relative">
        {/* Columnas de pistas */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: `${maxRowClueLength * 2}rem repeat(${board[0].length}, 2.5rem)`,
            gridTemplateRows: `repeat(${maxColClueLength}, 1.8rem) repeat(${board.length}, 2.5rem)`,
          }}
        >
          {/* Esquina superior izquierda vacía */}
          <div className="col-span-1 row-span-1"></div>

          {/* Pistas de columnas */}
          {colClues.map((clues, colIndex) => (
            <div
              key={`col-${colIndex}`}
              className="flex flex-col items-center justify-end"
              style={{ gridColumn: maxRowClueLength + colIndex + 1, gridRow: `1 / span ${maxColClueLength}` }}
            >
              {clues.map((clue, i) => (
                <div
                  key={`col-${colIndex}-clue-${i}`}
                  className="text-sm font-medium text-gray-300 h-6 flex items-center justify-center"
                >
                  {clue}
                </div>
              ))}
            </div>
          ))}

          {/* Pistas de filas */}
          {rowClues.map((clues, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex items-center justify-end pr-2"
              style={{ gridColumn: `1 / span ${maxRowClueLength}`, gridRow: maxColClueLength + rowIndex + 1 }}
            >
              {clues.map((clue, i) => (
                <div key={`row-${rowIndex}-clue-${i}`} className="text-sm font-medium text-gray-300 px-1">
                  {clue}
                </div>
              ))}
            </div>
          ))}

          {/* Celdas del tablero */}
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(
                  "border border-gray-700 cursor-pointer transition-all",
                  "w-10 h-10 flex items-center justify-center",
                  cell === 1 ? "bg-purple-600" : "bg-background",
                  hasError(rowIndex, colIndex) && "bg-red-500",
                  shouldShowHint(rowIndex, colIndex) && "bg-green-500",
                )}
                style={{
                  gridColumn: maxRowClueLength + colIndex + 1,
                  gridRow: maxColClueLength + rowIndex + 1,
                }}
                onClick={() => onCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  onCellClick(rowIndex, colIndex, true)
                }}
              >
                {cell === 2 && <span className="text-gray-400 font-bold">X</span>}
              </div>
            )),
          )}
        </div>
      </div>
    </div>
  )
}

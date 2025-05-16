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
      <div className="w-full max-w-xs aspect-square flex items-center justify-center">
        <div
          className="grid w-full h-full aspect-square border-2 border-gray-700 bg-[#181b22]"
          style={{
            gridTemplateColumns: `repeat(${board[0].length}, 1fr)`,
            gridTemplateRows: `repeat(${board.length}, 1fr)`,
            gap: 0,
            boxSizing: 'border-box',
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square w-full h-full min-w-0 min-h-0 overflow-hidden flex items-center justify-center border border-gray-700",
                  cell === 1 ? "bg-purple-600" : "bg-[#1a1d23]"
                )}
                style={{ boxSizing: 'border-box' }}
              />
            ))
          )}
        </div>
      </div>
    )
  }

  // Tablero interactivo con pistas
  return (
    <div ref={boardRef} className="w-full max-w-2xl aspect-square flex flex-col items-center justify-center">
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="grid w-full h-full aspect-square border-2 border-gray-700 bg-[#181b22]"
          style={{
            gridTemplateColumns: `${'repeat(' + maxRowClueLength + ', minmax(0, 1.5fr))'} repeat(${board[0].length}, 1fr)`,
            gridTemplateRows: `${'repeat(' + maxColClueLength + ', minmax(0, 1.5fr))'} repeat(${board.length}, 1fr)`,
            gap: 0,
            boxSizing: 'border-box',
          }}
        >
          {/* Esquina superior izquierda vacía */}
          {Array.from({ length: maxRowClueLength * maxColClueLength }).map((_, i) => (
            <div key={`corner-${i}`} className="bg-[#181b22]" />
          ))}

          {/* Pistas de columnas */}
          {colClues.map((clues, colIndex) =>
            Array.from({ length: maxColClueLength }).map((_, clueRow) => (
              <div
                key={`col-clue-${colIndex}-${clueRow}`}
                className="flex items-end justify-center text-xs md:text-sm font-medium text-gray-300 select-none"
                style={{
                  gridColumn: maxRowClueLength + colIndex + 1,
                  gridRow: clueRow + 1,
                  boxSizing: 'border-box',
                  border: 0,
                  padding: 0,
                  margin: 0,
                }}
              >
                {clues[clues.length - maxColClueLength + clueRow] ?? ''}
              </div>
            ))
          )}

          {/* Pistas de filas */}
          {rowClues.map((clues, rowIndex) =>
            Array.from({ length: maxRowClueLength }).map((_, clueCol) => (
              <div
                key={`row-clue-${rowIndex}-${clueCol}`}
                className="flex items-center justify-end text-xs md:text-sm font-medium text-gray-300 select-none"
                style={{
                  gridColumn: clueCol + 1,
                  gridRow: maxColClueLength + rowIndex + 1,
                  boxSizing: 'border-box',
                  border: 0,
                  padding: 0,
                  margin: 0,
                }}
              >
                {clues[clues.length - maxRowClueLength + clueCol] ?? ''}
              </div>
            ))
          )}

          {/* Celdas del tablero */}
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <div
                key={`cell-${rowIndex}-${colIndex}`}
                className={cn(
                  "aspect-square w-full h-full min-w-0 min-h-0 overflow-hidden flex items-center justify-center border border-gray-700 cursor-pointer transition-all text-xl md:text-2xl select-none",
                  cell === 1 ? "bg-purple-600" : "bg-[#1a1d23]",
                  cell === 2 ? "bg-yellow-100 border-yellow-400" : "",
                  hasError(rowIndex, colIndex) && "bg-red-500 border-red-400",
                  shouldShowHint(rowIndex, colIndex) && "bg-green-500 animate-pulse"
                )}
                style={{
                  gridColumn: maxRowClueLength + colIndex + 1,
                  gridRow: maxColClueLength + rowIndex + 1,
                  boxSizing: 'border-box',
                  borderWidth: 1,
                  borderStyle: 'solid',
                  borderColor: hasError(rowIndex, colIndex) ? '#f87171' : cell === 2 ? '#facc15' : '#374151',
                  padding: 0,
                  margin: 0,
                }}
                onClick={() => onCellClick(rowIndex, colIndex)}
                onContextMenu={e => {
                  e.preventDefault()
                  onCellClick(rowIndex, colIndex, true)
                }}
              >
                {cell === 2 && <span className="text-yellow-600 font-extrabold text-xl md:text-2xl select-none">X</span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

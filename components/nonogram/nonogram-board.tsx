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
  /** Celdas sugeridas por la pista (se resaltan mientras showHint sea true). */
  hintCells?: { row: number; col: number }[]
  /** Fila o columna sugerida: se resaltan sus números. */
  hintLine?: { tipo: "fila" | "columna"; indice: number } | null
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
  hintCells = [],
  hintLine = null,
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
    return hintCells.some((h) => h.row === row && h.col === col)
  }

  const lineaResaltada = (tipo: "fila" | "columna", indice: number) =>
    showHint && hintLine?.tipo === tipo && hintLine.indice === indice

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
              className={cn("flex flex-col items-center justify-end rounded-t", lineaResaltada("columna", colIndex) && "bg-green-500/30")}
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
              className={cn("flex items-center justify-end pr-2 rounded-l", lineaResaltada("fila", rowIndex) && "bg-green-500/30")}
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

"use client"
import { cn } from "@/lib/utils"

interface SudokuBoardProps {
  board: number[][]
  initialBoard: number[][]
  selectedCell: [number, number] | null
  errors: [number, number][]
  notes: Record<string, number[]>
  onCellSelect: (row: number, col: number) => void
}

export default function SudokuBoard({
  board,
  initialBoard,
  selectedCell,
  errors,
  notes,
  onCellSelect,
}: SudokuBoardProps) {
  const isCellInvalid = (row: number, col: number) => {
    return errors.some((error) => error[0] === row && error[1] === col)
  }

  const getNotesForCell = (row: number, col: number) => {
    return notes[`${row}-${col}`] || []
  }

  return (
    <div className="bg-[#1e2330] rounded-lg p-4 border border-gray-800">
      <div className="grid grid-cols-9 gap-0 border-2 border-gray-600">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isSelected = selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex
            const isInitial = initialBoard[rowIndex][colIndex] !== 0
            const isInvalid = isCellInvalid(rowIndex, colIndex)
            const cellNotes = getNotesForCell(rowIndex, colIndex)

            // Añadir bordes para un aspecto más clásico
            const borderRight = colIndex < 8 ? "border-r border-gray-700" : ""
            const borderBottom = rowIndex < 8 ? "border-b border-gray-700" : ""
            const thickBorderRight =
              (colIndex + 1) % 3 === 0 && colIndex < 8 ? "border-r-2 border-r-gray-500" : borderRight
            const thickBorderBottom =
              (rowIndex + 1) % 3 === 0 && rowIndex < 8 ? "border-b-2 border-b-gray-500" : borderBottom

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                className={cn(
                  "w-14 h-14 flex items-center justify-center text-2xl font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isInitial ? "text-gray-300" : "text-white",
                  isSelected && "bg-blue-500/20",
                  isInvalid && "bg-red-500/20",
                  "hover:bg-gray-800",
                  "disabled:cursor-not-allowed disabled:opacity-50",
                  "relative", // For notes positioning
                  thickBorderRight,
                  thickBorderBottom,
                )}
                onClick={() => onCellSelect(rowIndex, colIndex)}
                disabled={isInitial}
              >
                {cell !== 0 ? cell : null}
                {cell === 0 && cellNotes.length > 0 && (
                  <div className="absolute top-1 left-1 grid grid-cols-3 gap-0.5 w-full h-full pointer-events-none">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <span
                        key={num}
                        className={cn(
                          "text-xs text-gray-400 flex items-center justify-center",
                          cellNotes.includes(num) ? "" : "opacity-0",
                        )}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}

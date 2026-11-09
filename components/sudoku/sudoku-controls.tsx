"use client"

import { Button } from "@/components/ui/button"
import { Pencil, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface SudokuControlsProps {
  onNumberInput: (num: number) => void
  onClearCell: () => void
  isNotesMode: boolean
  onNotesModeToggle: () => void
}

export default function SudokuControls({
  onNumberInput,
  onClearCell,
  isNotesMode,
  onNotesModeToggle,
}: SudokuControlsProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "border-gray-700 hover:bg-gray-800",
            isNotesMode && "bg-purple-500/20 border-purple-500 text-purple-400",
          )}
          onClick={onNotesModeToggle}
        >
          <Pencil className="h-4 w-4 mr-2" />
          Modo notas
        </Button>

        <Button variant="outline" size="sm" className="border-gray-700 hover:bg-gray-800" onClick={onClearCell}>
          <X className="h-4 w-4 mr-2" />
          Borrar
        </Button>
      </div>

      <div className="grid grid-cols-9 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <Button
            key={num}
            variant="outline"
            className="h-12 md:h-14 p-0 border-gray-700 hover:bg-gray-800 hover:text-foreground text-lg"
            onClick={() => onNumberInput(num)}
          >
            {num}
          </Button>
        ))}
      </div>
    </div>
  )
}

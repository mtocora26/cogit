"use client"
import { MousePointer, X } from "lucide-react"

export default function NonogramControls() {
  return (
    <div className="mt-6">
      <div className="flex justify-center gap-4">
        <div className="bg-background p-3 rounded-lg border border-gray-700 flex items-center gap-2">
          <MousePointer className="h-4 w-4 text-purple-400" />
          <span className="text-sm">Clic izquierdo: Rellenar celda</span>
        </div>
        <div className="bg-background p-3 rounded-lg border border-gray-700 flex items-center gap-2">
          <X className="h-4 w-4 text-gray-400" />
          <span className="text-sm">Clic derecho: Marcar con X</span>
        </div>
      </div>
    </div>
  )
}

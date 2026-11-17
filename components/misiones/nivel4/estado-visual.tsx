import { CheckCircle2, XCircle } from "lucide-react"
import { cn } from "@/lib/utils"

/** Estados visuales comunes de las actividades de descomposición y depuración. */
export type EstadoVisual = "neutro" | "elegido" | "correcto" | "incorrecto"

const CLASES: Record<EstadoVisual, string> = {
  neutro: "border-border bg-secondary",
  elegido: "border-blue-400 bg-blue-500/10 shadow-[0_0_0_1px_hsl(217_91%_60%/0.5)]",
  correcto: "border-green-500 bg-green-500/10 animate-in fade-in zoom-in-95 duration-300",
  incorrecto: "border-red-500 bg-red-500/10 sacudir",
}

export const claseEstado = (e: EstadoVisual) => CLASES[e]

/** Marca con icono y texto (no solo color) para que el resultado se entienda sin ver los colores. */
export function MarcaEstado({ estado, className }: { estado: EstadoVisual; className?: string }) {
  if (estado === "correcto")
    return (
      <span className={cn("inline-flex items-center gap-1 text-sm font-semibold text-green-400", className)}>
        <CheckCircle2 aria-hidden className="h-4 w-4" /> Correcto
      </span>
    )
  if (estado === "incorrecto")
    return (
      <span className={cn("inline-flex items-center gap-1 text-sm font-semibold text-red-400", className)}>
        <XCircle aria-hidden className="h-4 w-4" /> Incorrecto
      </span>
    )
  return null
}

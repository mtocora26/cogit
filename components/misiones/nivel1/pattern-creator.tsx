import CompletaPatron from "./completa-patron"
import type { EstadoJuego } from "@/lib/patrones"

interface PatternCreatorProps {
  onComplete: (success: boolean, time: number, score?: number, detalleErrores?: { ronda: number; explicacion: string }[], repetidos?: number[]) => void;
  onRondaError?: () => void; // NUEVO: callback para error de ronda
  estadoInicial?: EstadoJuego | null;
  onEstado?: (estado: EstadoJuego) => void;
}

// Permitir pasar la prop onComplete
export default function PatternCreatorActivity({ onComplete, onRondaError, estadoInicial, onEstado }: PatternCreatorProps) {
  // Cuando el usuario falla una ronda:
  function handleErrorRonda() {
    if (onRondaError) onRondaError();
    // ...lógica de error de ronda...
  }

  return <CompletaPatron onComplete={onComplete} estadoInicial={estadoInicial} onEstado={onEstado} />
}

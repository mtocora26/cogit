import { Grid, PuzzleIcon as PuzzlePiece, BotIcon as Robot } from "lucide-react"
import NavBar from "@/components/nav-bar"
import GameCard from "@/components/game-card"
import { NonogramPreview, RobotPreview, SudokuPreview } from "@/components/landing/previews"

export default function MinijuegosPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <NavBar activePage="minijuegos" />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">Minijuegos</h1>
            <p className="text-gray-400 mt-1">
              Ejercita tu mente y desarrolla habilidades de pensamiento computacional
            </p>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sudoku */}
          <GameCard
            title="Sudoku Lógico"
            description="Resuelve puzzles numéricos que ejercitan tu pensamiento lógico y deductivo. Aprende a identificar patrones y desarrolla estrategias de resolución."
            icon={<Grid className="h-8 w-8" />}
            preview={<SudokuPreview />}
            href="/minijuegos/sudoku"
            stats={{
              difficulty: "Medio",
              skillsImproved: ["Lógica", "Patrones", "Deducción"],
              timeEstimate: "5-15 min",
            }}
          />

          {/* Nonogramas */}
          <GameCard
            title="Nonogramas"
            description="Descubre imágenes ocultas resolviendo puzzles basados en cuadrículas. Mejora tu capacidad de análisis y razonamiento espacial."
            icon={<PuzzlePiece className="h-8 w-8" />}
            preview={<NonogramPreview />}
            href="/minijuegos/nonogramas"
            stats={{
              difficulty: "Variable",
              skillsImproved: ["Análisis", "Visualización", "Inferencia"],
              timeEstimate: "10-20 min",
            }}
          />

          {/* Robot Programmer */}
          <GameCard
            title="Robot Programmer"
            description="Programa un robot para que complete misiones usando comandos secuenciales. Aprende conceptos básicos de programación y algoritmos."
            icon={<Robot className="h-8 w-8" />}
            preview={<RobotPreview />}
            href="/minijuegos/robot-programmer"
            stats={{
              difficulty: "Progresivo",
              skillsImproved: ["Algoritmos", "Secuencias", "Depuración"],
              timeEstimate: "5-30 min",
            }}
          />
        </div>
      </div>
    </div>
  )
}

import Image from "next/image"
import { Grid, PuzzleIcon as PuzzlePiece, BotIcon as Robot, Trophy, Brain, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import GameCard from "@/components/game-card"

export default function MinijuegosPage() {
  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="minijuegos" />

      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Minijuegos</h1>
            <p className="text-gray-400 mt-1">
              Ejercita tu mente y desarrolla habilidades de pensamiento computacional
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="text-sm text-gray-300">Mejor puntuación: 850</span>
          </div>
        </div>
      </div>

      {/* Featured Game */}
      <div className="container mx-auto px-4 py-4">
        <div className="relative rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-purple-900/80 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=1200&auto=format&fit=crop"
            alt="Featured Game"
            width={1200}
            height={400}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 md:px-12">
            <div className="max-w-lg">
              <div className="inline-block bg-blue-500 text-xs font-bold px-2 py-1 rounded mb-4">DESTACADO</div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Desafío Semanal</h2>
              <p className="text-gray-200 mb-6">
                Completa los tres minijuegos esta semana y gana una insignia especial de "Maestro del Pensamiento
                Computacional".
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">Comenzar Desafío</Button>
            </div>
          </div>
        </div>
      </div>

      {/* Games Grid */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8">Elige tu Minijuego</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sudoku */}
          <GameCard
            title="Sudoku Lógico"
            description="Resuelve puzzles numéricos que ejercitan tu pensamiento lógico y deductivo. Aprende a identificar patrones y desarrolla estrategias de resolución."
            icon={<Grid className="h-8 w-8" />}
            image="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=400&auto=format&fit=crop"
            color="blue"
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
            image="https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400&auto=format&fit=crop"
            color="purple"
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
            image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop"
            color="green"
            href="/minijuegos/robot-programmer"
            stats={{
              difficulty: "Progresivo",
              skillsImproved: ["Algoritmos", "Secuencias", "Depuración"],
              timeEstimate: "5-30 min",
            }}
          />
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#1e2330] py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">Beneficios del Juego Cognitivo</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#1a1d23] p-6 rounded-lg border border-blue-500/20 flex flex-col items-center text-center">
              <div className="bg-blue-500/10 p-3 rounded-full mb-4">
                <Brain className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pensamiento Lógico</h3>
              <p className="text-gray-400">
                Desarrolla tu capacidad para resolver problemas de manera estructurada y metódica.
              </p>
            </div>

            <div className="bg-[#1a1d23] p-6 rounded-lg border border-purple-500/20 flex flex-col items-center text-center">
              <div className="bg-purple-500/10 p-3 rounded-full mb-4">
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Agilidad Mental</h3>
              <p className="text-gray-400">
                Mejora tu velocidad de procesamiento y capacidad para tomar decisiones rápidas.
              </p>
            </div>

            <div className="bg-[#1a1d23] p-6 rounded-lg border border-green-500/20 flex flex-col items-center text-center">
              <div className="bg-green-500/10 p-3 rounded-full mb-4">
                <Robot className="h-8 w-8 text-green-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Pensamiento Algorítmico</h3>
              <p className="text-gray-400">
                Aprende a descomponer problemas complejos en pasos simples y secuenciales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Tracking */}
      <div className="container mx-auto px-4 py-12">
        <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-6">Tu Progreso en Minijuegos</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#1a1d23] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Sudoku</span>
                <span className="text-sm text-gray-400">3 completados</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full rounded-full" style={{ width: "30%" }}></div>
              </div>
            </div>

            <div className="bg-[#1a1d23] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Nonogramas</span>
                <span className="text-sm text-gray-400">5 completados</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: "50%" }}></div>
              </div>
            </div>

            <div className="bg-[#1a1d23] p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Robot Programmer</span>
                <span className="text-sm text-gray-400">2 completados</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-green-500 h-full rounded-full" style={{ width: "20%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

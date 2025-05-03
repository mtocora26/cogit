"use client"

import Link from "next/link"
import { ChevronRight, Lock, Star, Trophy, Zap, Brain, GitBranch, Search, Puzzle, Database, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MisionesMap from "@/components/misiones-map"
import NavBar from "@/components/nav-bar"
import { useRouter } from "next/navigation"

export default function MisionesPage() {
  const router = useRouter()
  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="misiones" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Misiones</h1>
            <p className="text-gray-400 mt-1">Completa desafíos y avanza en tu ruta de aprendizaje</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Progress
                value={35}
                className="w-48 h-2 bg-gray-700"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-500"
              />
              <span className="text-sm text-gray-300">35% completado</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-300">1250 puntos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-4 md:p-6 relative overflow-hidden">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2">Mapa de Progresión</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Explora tu camino de aprendizaje a través de conceptos interconectados. Completa cada misión para
              desbloquear nuevos desafíos.
              <span className="block mt-1 text-sm">Pasa el cursor sobre cada nivel para ver más detalles.</span>
            </p>
          </div>

          {/* Misiones Map Component */}
          <MisionesMap />

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 transform rotate-45 bg-green-500"></div>
              <span className="text-sm">Completado</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 transform rotate-45 bg-blue-500"></div>
              <span className="text-sm">Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 transform rotate-45 bg-gray-600"></div>
              <span className="text-sm">Bloqueado</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sección Actual: Explora tu lógica */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-full">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">Explora tu lógica</h2>
            <p className="text-gray-400">Fundamentos del pensamiento computacional</p>
          </div>
        </div>

        <p className="text-gray-300 mb-6">
          En esta sección aprenderás los conceptos básicos del pensamiento computacional a través de desafíos visuales e
          interactivos. Desarrollarás habilidades fundamentales como el reconocimiento de patrones, la descomposición de
          problemas y la clasificación lógica.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Nivel Actual */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 rounded-lg border border-blue-500/50 p-6 relative group hover:border-blue-400 transition-all">
            <div className="absolute top-3 right-3">
              <div className="bg-blue-500 text-xs font-bold px-2 py-1 rounded">ACTUAL</div>
            </div>
            <div className="mb-4">
              <Puzzle className="h-10 w-10 text-yellow-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Desafío: Secuencias lógicas</h3>
            <p className="text-gray-300 text-sm mb-4">
              Ordena instrucciones para completar tareas siguiendo una secuencia lógica correcta.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm">150 pts</span>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700" onClick={() => router.push("/misiones/1/4")}>
                Continuar
              </Button>
            </div>
          </div>

          {/* Nivel Bloqueado 1 */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6 relative group opacity-80 hover:opacity-100 transition-all">
            <div className="absolute top-3 right-3">
              <div className="bg-gray-700 text-xs font-bold px-2 py-1 rounded">BLOQUEADO</div>
            </div>
            <div className="mb-4">
              <Database className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Clasificación y agrupamiento</h3>
            <p className="text-gray-400 text-sm mb-4">
              Aprende a organizar elementos según sus características comunes y a crear categorías lógicas.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-gray-500" />
                <span className="text-sm">200 pts</span>
              </div>
              <Button size="sm" variant="outline" disabled className="border-gray-700 text-gray-400">
                Bloqueado
              </Button>
            </div>
          </div>

          {/* Nivel Bloqueado 2 */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6 relative group opacity-80 hover:opacity-100 transition-all">
            <div className="absolute top-3 right-3">
              <div className="bg-gray-700 text-xs font-bold px-2 py-1 rounded">BLOQUEADO</div>
            </div>
            <div className="mb-4">
              <Code className="h-10 w-10 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Proyecto: Detector de errores</h3>
            <p className="text-gray-400 text-sm mb-4">
              Encuentra y corrige errores en secuencias lógicas aplicando todo lo aprendido en esta sección.
            </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-gray-500" />
                <span className="text-sm">250 pts</span>
              </div>
              <Button size="sm" variant="outline" disabled className="border-gray-700 text-gray-400">
                Bloqueado
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Próximas Secciones */}
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-2xl font-bold mb-6">Próximas Secciones</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Sección 2 */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6 relative group">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-700 p-3 rounded-full">
                <GitBranch className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Algoritmos en acción</h3>
                <p className="text-gray-400 text-sm">Estructuras de control</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Aprende a crear algoritmos utilizando estructuras de control como condicionales y bucles para resolver
              problemas más complejos.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Disponible al completar la sección actual</div>
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Sección 3 */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6 relative group">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gray-700 p-3 rounded-full">
                <Zap className="h-6 w-6 text-gray-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Construye soluciones</h3>
                <p className="text-gray-400 text-sm">Proyectos integrados</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Aplica todo lo aprendido para diseñar y construir soluciones completas a problemas computacionales
              complejos.
            </p>
            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">Disponible al completar las secciones anteriores</div>
              <Lock className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Logros y Estadísticas */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Logros */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Tus Logros</h2>
              <Link href="/logros" className="text-sm text-purple-400 hover:text-purple-300 flex items-center">
                Ver todos <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-3 bg-[#1a1d23] rounded-lg border border-green-500/20">
                <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
                <span className="text-sm font-medium text-center">Primer Patrón</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#1a1d23] rounded-lg border border-green-500/20">
                <Search className="h-8 w-8 text-blue-500 mb-2" />
                <span className="text-sm font-medium text-center">Observador</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-[#1a1d23] rounded-lg border border-purple-500/20">
                <Star className="h-8 w-8 text-purple-500 mb-2" />
                <span className="text-sm font-medium text-center">500 puntos</span>
              </div>
            </div>
          </div>

          {/* Estadísticas */}
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Tu Progreso</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Sección actual</span>
                  <span className="text-sm font-medium">40%</span>
                </div>
                <Progress value={40} className="h-2 bg-gray-700" indicatorClassName="bg-blue-500" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Desafíos resueltos</span>
                  <span className="text-sm font-medium">3/6</span>
                </div>
                <Progress value={50} className="h-2 bg-gray-700" indicatorClassName="bg-yellow-500" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Progreso total</span>
                  <span className="text-sm font-medium">Principiante</span>
                </div>
                <Progress value={20} className="h-2 bg-gray-700" indicatorClassName="bg-purple-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

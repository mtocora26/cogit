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
    <div className="min-h-screen bg-gradient-to-br from-[#181c2a] via-[#23294a] to-[#1a1d23] text-white relative overflow-x-hidden">
      {/* Navbar */}
      <NavBar activePage="misiones" />

      {/* Header principal con animación y gradiente */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">Misiones</h1>
          <p className="text-lg text-gray-300 mt-2 max-w-xl">Explora tu camino de aprendizaje a través de desafíos gamificados, gana logros y desbloquea nuevas habilidades. ¡Cada misión te acerca a convertirte en un maestro del pensamiento computacional!</p>
          <div className="flex items-center gap-4 mt-4">
            <Progress value={35} className="w-56 h-3 bg-gray-700 rounded-full shadow-inner" indicatorClassName="bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 animate-pulse" />
            <span className="text-base text-gray-200 font-semibold">35% completado</span>
            <div className="flex items-center gap-1 ml-4">
              <Star className="h-5 w-5 text-yellow-400 fill-yellow-400 animate-bounce" />
              <span className="text-base text-yellow-300 font-bold">1250 pts</span>
            </div>
          </div>
        </div>
        {/* Logros destacados */}
        <div className="flex flex-col items-center gap-2 bg-gradient-to-br from-[#23294a]/80 to-[#1a1d23]/80 rounded-2xl p-6 border-2 border-purple-700/30 shadow-xl animate-fade-in">
          <span className="text-lg font-bold text-purple-300 mb-2">Logros recientes</span>
          <div className="flex gap-3">
            <div className="flex flex-col items-center p-2 bg-[#1a1d23] rounded-lg border border-green-500/30 shadow-md">
              <Trophy className="h-7 w-7 text-yellow-400 mb-1 animate-pop" />
              <span className="text-xs font-medium text-center text-green-300">Primer Patrón</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-[#1a1d23] rounded-lg border border-blue-500/30 shadow-md">
              <Search className="h-7 w-7 text-blue-400 mb-1 animate-pop" />
              <span className="text-xs font-medium text-center text-blue-300">Observador</span>
            </div>
            <div className="flex flex-col items-center p-2 bg-[#1a1d23] rounded-lg border border-purple-500/30 shadow-md">
              <Star className="h-7 w-7 text-purple-400 mb-1 animate-pop" />
              <span className="text-xs font-medium text-center text-purple-300">500 puntos</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mapa de Progresión y Cards de Niveles */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#23294a]/80 rounded-2xl border-2 border-blue-700/20 p-8 shadow-2xl relative overflow-hidden animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-300">Mapa de Progresión</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-center mb-8">Avanza por los niveles, desbloquea desafíos y observa tu progreso en tiempo real. ¡Cada nivel superado te otorga recompensas y nuevas insignias!</p>
          <MisionesMap />
        </div>
      </div>

      {/* Sección de Niveles con Cards animadas */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-300">Secciones y Niveles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card de nivel actual */}
          <div className="bg-gradient-to-br from-blue-900/60 to-purple-900/60 rounded-2xl border-2 border-blue-500/50 p-8 relative group hover:scale-105 hover:shadow-2xl transition-all duration-300 animate-pop">
            <div className="absolute top-3 right-3">
              <div className="bg-blue-500 text-xs font-bold px-3 py-1 rounded shadow">ACTUAL</div>
            </div>
            <div className="mb-4">
              <Puzzle className="h-12 w-12 text-yellow-400 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">Desafío: Secuencias lógicas</h3>
            <p className="text-gray-300 text-base mb-4">Ordena instrucciones para completar tareas siguiendo una secuencia lógica correcta.</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                <span className="text-base font-semibold text-yellow-200">150 pts</span>
              </div>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg animate-pop" onClick={() => router.push("/misiones/1/4")}>Continuar</Button>
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

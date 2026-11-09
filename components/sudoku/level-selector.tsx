"use client"

import { Grid, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useState, useEffect } from "react"
import { formatTime } from "@/lib/utils"

interface LevelSelectorProps {
  onStartGame: (level: "facil" | "medio" | "dificil") => void
}

export default function LevelSelector({ onStartGame }: LevelSelectorProps) {
  const [bestTimes, setBestTimes] = useState<{
    facil?: number
    medio?: number
    dificil?: number
  }>({})

  // Cargar mejores tiempos desde localStorage
  useEffect(() => {
    const savedTimes = localStorage.getItem("sudokuBestTimes")
    if (savedTimes) {
      setBestTimes(JSON.parse(savedTimes))
    }
  }, [])

  return (
    <div className="w-full py-8 px-4 overflow-y-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-4">Elige un nivel de dificultad</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Selecciona el nivel que mejor se adapte a tu experiencia. Cada nivel ofrece un desafío diferente para
          ejercitar tu pensamiento lógico.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {/* Nivel Fácil */}
        <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-green-500/30 hover:border-green-500/60 transition-all group">
          <div className="h-40 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?q=80&w=400&auto=format&fit=crop"
              alt="Nivel Fácil"
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="bg-green-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Grid className="h-6 w-6 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Fácil</h3>
            <p className="text-gray-300 text-sm mb-4">
              Perfecto para principiantes. Aprende las reglas básicas y desarrolla estrategias iniciales.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                <span>30 celdas vacías</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                <span>Estrategias básicas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-green-500"></div>
                <span>Tiempo estimado: 5-10 min</span>
              </li>
            </ul>

            {bestTimes.facil && (
              <div className="bg-green-500/10 text-green-400 px-3 py-1 rounded-md text-sm mb-4 flex items-center justify-between">
                <span>Mejor tiempo:</span>
                <span>{formatTime(bestTimes.facil)}</span>
              </div>
            )}

            <Button className="w-full bg-green-600 hover:bg-green-700" onClick={() => onStartGame("facil")}>
              Comenzar nivel fácil
            </Button>
          </div>
        </div>

        {/* Nivel Medio */}
        <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-yellow-500/30 hover:border-yellow-500/60 transition-all group">
          <div className="h-40 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=400&auto=format&fit=crop"
              alt="Nivel Medio"
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="bg-yellow-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Medio</h3>
            <p className="text-gray-300 text-sm mb-4">
              Para jugadores con experiencia. Requiere análisis más profundo y técnicas intermedias.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                <span>45 celdas vacías</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                <span>Técnicas intermedias</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-yellow-500"></div>
                <span>Tiempo estimado: 10-20 min</span>
              </li>
            </ul>

            {bestTimes.medio && (
              <div className="bg-yellow-500/10 text-yellow-400 px-3 py-1 rounded-md text-sm mb-4 flex items-center justify-between">
                <span>Mejor tiempo:</span>
                <span>{formatTime(bestTimes.medio)}</span>
              </div>
            )}

            <Button className="w-full bg-yellow-600 hover:bg-yellow-700" onClick={() => onStartGame("medio")}>
              Comenzar nivel medio
            </Button>
          </div>
        </div>

        {/* Nivel Difícil */}
        <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500/60 transition-all group">
          <div className="h-40 relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=400&auto=format&fit=crop"
              alt="Nivel Difícil"
              fill
              className="object-cover opacity-50 group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
          </div>
          <div className="p-6">
            <div className="bg-red-500/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Brain className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Difícil</h3>
            <p className="text-gray-300 text-sm mb-4">
              Un verdadero desafío para expertos. Requiere técnicas avanzadas y pensamiento profundo.
            </p>
            <ul className="space-y-2 text-sm text-gray-400 mb-6">
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                <span>55 celdas vacías</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                <span>Técnicas avanzadas</span>
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500"></div>
                <span>Tiempo estimado: 20-30 min</span>
              </li>
            </ul>

            {bestTimes.dificil && (
              <div className="bg-red-500/10 text-red-400 px-3 py-1 rounded-md text-sm mb-4 flex items-center justify-between">
                <span>Mejor tiempo:</span>
                <span>{formatTime(bestTimes.dificil)}</span>
              </div>
            )}

            <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => onStartGame("dificil")}>
              Comenzar nivel difícil
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { formatTime } from "@/lib/utils"
import { DifficultyCard } from "@/components/brand/difficulty-card"

interface LevelSelectorProps {
  onStartGame: (level: "facil" | "medio" | "dificil") => void
}

const LEVELS = [
  {
    id: "facil" as const,
    title: "Fácil",
    level: 1,
    description: "Perfecto para principiantes. Aprende las reglas básicas y desarrolla estrategias iniciales.",
    facts: ["30 celdas vacías", "Estrategias básicas", "Tiempo estimado: 5-10 min"],
    cta: "Comenzar nivel fácil",
  },
  {
    id: "medio" as const,
    title: "Medio",
    level: 2,
    description: "Para jugadores con experiencia. Requiere análisis más profundo y técnicas intermedias.",
    facts: ["45 celdas vacías", "Técnicas intermedias", "Tiempo estimado: 10-20 min"],
    cta: "Comenzar nivel medio",
  },
  {
    id: "dificil" as const,
    title: "Difícil",
    level: 3,
    description: "Un verdadero desafío para expertos. Requiere técnicas avanzadas y pensamiento profundo.",
    facts: ["55 celdas vacías", "Técnicas avanzadas", "Tiempo estimado: 20-30 min"],
    cta: "Comenzar nivel difícil",
  },
]

export default function LevelSelector({ onStartGame }: LevelSelectorProps) {
  const [bestTimes, setBestTimes] = useState<{ facil?: number; medio?: number; dificil?: number }>({})

  // Cargar mejores tiempos desde localStorage
  useEffect(() => {
    const savedTimes = localStorage.getItem("sudokuBestTimes")
    if (savedTimes) {
      setBestTimes(JSON.parse(savedTimes))
    }
  }, [])

  return (
    <div className="w-full overflow-y-auto px-4 py-8">
      <div className="mb-10 text-center">
        <h2 className="mb-4 font-display text-3xl font-semibold">Elige un nivel de dificultad</h2>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Selecciona el nivel que mejor se adapte a tu experiencia. Cada nivel ofrece un desafío diferente para
          ejercitar tu pensamiento lógico.
        </p>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
        {LEVELS.map((l) => (
          <DifficultyCard
            key={l.id}
            title={l.title}
            description={l.description}
            level={l.level}
            facts={l.facts}
            bestTime={bestTimes[l.id] ? formatTime(bestTimes[l.id]!) : undefined}
            cta={l.cta}
            onStart={() => onStartGame(l.id)}
          />
        ))}
      </div>
    </div>
  )
}

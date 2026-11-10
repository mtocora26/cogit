"use client"

import { useState, useEffect } from "react"
import { formatTime } from "@/lib/utils"
import { DifficultyCard } from "@/components/brand/difficulty-card"
import { SudokuReglas } from "@/components/sudoku/sudoku-reglas"

interface LevelSelectorProps {
  onStartGame: (level: "facil" | "medio" | "dificil") => void
}

const LEVELS = [
  {
    id: "facil" as const,
    title: "Fácil",
    level: 1,
    description: "Para empezar. Practicas el único candidato: la celda en la que solo cabe un número.",
    facts: ["30 celdas vacías", "Técnica: único candidato", "Tiempo estimado: 5-10 min"],
    cta: "Comenzar nivel fácil",
  },
  {
    id: "medio" as const,
    title: "Medio",
    level: 2,
    description: "Practicas el candidato oculto: el número que en una fila, columna o región solo cabe en un sitio.",
    facts: ["45 celdas vacías", "Técnica: candidato oculto", "Tiempo estimado: 10-20 min"],
    cta: "Comenzar nivel medio",
  },
  {
    id: "dificil" as const,
    title: "Difícil",
    level: 3,
    description: "Practicas las notas y los pares: anotar candidatos y descartar los que otra celda ya ocupa.",
    facts: ["55 celdas vacías", "Técnica: notas y pares", "Tiempo estimado: 20-30 min"],
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
        <SudokuReglas className="mt-4" />
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

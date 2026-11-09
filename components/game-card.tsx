import type React from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface GameStats {
  difficulty: string
  skillsImproved: string[]
  timeEstimate: string
}

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  /** Vista dibujada del juego real (en lugar de una foto de stock). */
  preview: React.ReactNode
  href: string
  stats: GameStats
}

export default function GameCard({ title, description, icon, preview, href, stats }: GameCardProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-[border-color,transform] duration-200 ease-out-strong hover:-translate-y-0.5 hover:border-neuron/60">
      <div className="relative grid h-64 place-items-center overflow-hidden bg-loom bg-muted/40">
        <div aria-hidden className="scale-[0.8]">{preview}</div>
        <div className="absolute left-4 top-4 rounded-lg bg-neuron/15 p-2 text-neuron">{icon}</div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-xl font-semibold">{title}</h3>
        <p className="mb-4 text-sm text-muted-foreground">{description}</p>

        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Dificultad:</span>
            <span className="text-neuron">{stats.difficulty}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Tiempo estimado:</span>
            <span>{stats.timeEstimate}</span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            {stats.skillsImproved.map((skill) => (
              <span key={skill} className="rounded-full bg-neuron/15 px-2 py-1 text-xs text-neuron">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Link href={href} className="mt-auto w-full">
          <Button className="group min-h-11 w-full">
            Jugar Ahora
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

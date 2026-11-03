"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface GameStats {
  difficulty: string
  skillsImproved: string[]
  timeEstimate: string
}

interface GameCardProps {
  title: string
  description: string
  icon: React.ReactNode
  image: string
  color: "blue" | "purple" | "green" | "yellow"
  href: string
  stats: GameStats
}

export default function GameCard({ title, description, icon, image, color, href, stats }: GameCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  const colorStyles = {
    blue: {
      border: "border-blue-500/30",
      hoverBorder: "border-blue-500/60",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      shadow: "shadow-[0_0_15px_rgba(59,130,246,0.2)]",
      hoverShadow: "shadow-[0_0_20px_rgba(59,130,246,0.4)]",
      button: "bg-blue-600 hover:bg-blue-700",
    },
    purple: {
      border: "border-purple-500/30",
      hoverBorder: "border-purple-500/60",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      shadow: "shadow-[0_0_15px_rgba(168,85,247,0.2)]",
      hoverShadow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",
      button: "bg-purple-600 hover:bg-purple-700",
    },
    green: {
      border: "border-green-500/30",
      hoverBorder: "border-green-500/60",
      bg: "bg-green-500/10",
      text: "text-green-400",
      shadow: "shadow-[0_0_15px_rgba(34,197,94,0.2)]",
      hoverShadow: "shadow-[0_0_20px_rgba(34,197,94,0.4)]",
      button: "bg-green-600 hover:bg-green-700",
    },
    yellow: {
      border: "border-yellow-500/30",
      hoverBorder: "border-yellow-500/60",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400",
      shadow: "shadow-[0_0_15px_rgba(234,179,8,0.2)]",
      hoverShadow: "shadow-[0_0_20px_rgba(234,179,8,0.4)]",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
  }

  const styles = colorStyles[color]

  return (
    <div
      className={`bg-[#1e2330] rounded-lg overflow-hidden border ${isHovered ? styles.hoverBorder : styles.border} ${isHovered ? styles.hoverShadow : styles.shadow} transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] via-transparent to-transparent"></div>
        <div className={`absolute top-4 left-4 ${styles.bg} p-2 rounded-lg`}>
          <div className={styles.text}>{icon}</div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300 text-sm mb-4">{description}</p>

        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Dificultad:</span>
            <span className={styles.text}>{stats.difficulty}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Tiempo estimado:</span>
            <span>{stats.timeEstimate}</span>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {stats.skillsImproved.map((skill, index) => (
              <span key={index} className={`text-xs ${styles.bg} ${styles.text} px-2 py-1 rounded-full`}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <Link href={href} className="w-full">
          <Button className={`w-full ${styles.button} group`}>
            Jugar Ahora
            <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

"use client"

import Link from "next/link"
import { ChevronRight, Trophy, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import MisionesMap from "@/components/misiones-map"
import NavBar from "@/components/nav-bar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MisionesPage() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const usuario = localStorage.getItem("usuario")
      if (!usuario) {
        setIsAuth(false)
        router.replace("/login")
      } else {
        setIsAuth(true)
      }
    }
  }, [router])
  if (isAuth === false) return null
  if (isAuth === null) return null // Evita parpadeo inicial

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#181c2a] via-[#23294a] to-[#1a1d23] text-white relative overflow-x-hidden">
      {/* Navbar */}
      <NavBar activePage="misiones" />

      {/* Header principal con animación y gradiente */}
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-400 via-blue-400 to-green-400 bg-clip-text text-transparent animate-gradient-x">Misiones</h1>
          <p className="text-lg text-gray-300 mt-2 max-w-xl">Explora tu camino de aprendizaje a través de desafíos gamificados, gana logros y desbloquea nuevas habilidades. ¡Cada misión te acerca a convertirte en un maestro del pensamiento computacional!</p>
        </div>
      </div>

      {/* Mapa de Progresión y Cards de Niveles */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#23294a]/80 rounded-2xl border-2 border-blue-700/20 p-8 shadow-2xl relative overflow-hidden animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-300">Mapa de Progresión</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-center mb-8">Resuelve desafíos, activa nuevas conexiones y sigue tu avance en tiempo real. ¡Cada logro fortalece tu pensamiento computacional!</p>
          <MisionesMap />
        </div>
      </div>
    </div>
  )
}

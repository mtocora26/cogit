"use client"

import Link from "next/link"
import { Brain, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface NavBarProps {
  activePage?: string
}

export default function NavBar({ activePage }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const getNavLinkClass = (page: string) => {
    return activePage === page
      ? "text-sm font-medium text-purple-400 border-b-2 border-purple-400 pb-1"
      : "text-sm font-medium hover:text-purple-400 transition-colors"
  }

  const getMobileNavLinkClass = (page: string) => {
    return activePage === page
      ? "py-2 text-sm font-medium text-purple-400"
      : "py-2 text-sm font-medium hover:text-purple-400 transition-colors"
  }

  return (
    <header className="border-b border-gray-800 bg-[#1a1d23]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold tracking-tight">COGIT</span>
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className={getNavLinkClass("inicio")}>
            Inicio
          </Link>
          <Link href="/misiones" className={getNavLinkClass("misiones")}>
            Misiones
          </Link>
          <Link href="/minijuegos" className={getNavLinkClass("minijuegos")}>
            MiniJuegos
          </Link>
          <Link href="/ranking" className={getNavLinkClass("ranking")}>
            Ranking
          </Link>
          <Link href="/comunidad" className={getNavLinkClass("comunidad")}>
            Comunidad
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/login">
            <Button variant="default" className="bg-blue-600 hover:bg-blue-700">
              Ingresar
            </Button>
          </Link>
          <Link href="/registro">
            <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">
              Regístrate
            </Button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1d23] border-b border-gray-800">
          <nav className="flex flex-col py-4 px-4">
            <Link href="/" className={getMobileNavLinkClass("inicio")} onClick={() => setIsMenuOpen(false)}>
              Inicio
            </Link>
            <Link href="/misiones" className={getMobileNavLinkClass("misiones")} onClick={() => setIsMenuOpen(false)}>
              Misiones
            </Link>
            <Link
              href="/minijuegos"
              className={getMobileNavLinkClass("minijuegos")}
              onClick={() => setIsMenuOpen(false)}
            >
              MiniJuegos
            </Link>
            <Link href="/ranking" className={getMobileNavLinkClass("ranking")} onClick={() => setIsMenuOpen(false)}>
              Ranking
            </Link>
            <Link href="/comunidad" className={getMobileNavLinkClass("comunidad")} onClick={() => setIsMenuOpen(false)}>
              Comunidad
            </Link>
            <div className="flex flex-col gap-2 mt-4">
              <Link href="/login">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700 w-full">
                  Ingresar
                </Button>
              </Link>
              <Link href="/registro">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 w-full">
                  Regístrate
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}

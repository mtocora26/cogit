"use client"

import Link from "next/link"
import { Brain, Menu, X, User, ChevronDown, LogOut, Settings, Shield, Zap, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import LivesIndicator from "@/components/misiones/lives-indicator"

interface NavBarProps {
  activePage?: string
}

export default function NavBar({ activePage }: NavBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true);
  // Obtener datos de usuario
  const [userName, setUserName] = useState("");
  const [userRol, setUserRol] = useState("");
  const [userNeuronas, setUserNeuronas] = useState(5);
  const [userMaxNeuronas, setUserMaxNeuronas] = useState(5);
  const [userCreditos, setUserCreditos] = useState(0);
  const [showMenu, setShowMenu] = useState(true); // Estado para forzar cierre visual del menú
  // Sparkz sincronizados con la tienda
  const [sparkz, setSparkz] = useState(0);

  // Ensure client-side check for localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    // Solo ejecuta una vez al montar
    const usuario = localStorage.getItem("usuario");
    setIsAuthenticated(Boolean(usuario));
    if (usuario) {
      try {
        const parsedUser = JSON.parse(usuario);
        setUserName(parsedUser.nombre || parsedUser.name || "Usuario");
        setUserRol(parsedUser.rol || "user");
        setUserNeuronas(parsedUser.neuronas ?? 5);
        setUserMaxNeuronas(parsedUser.maxNeuronas ?? 5);
        setUserCreditos(parsedUser.creditos ?? 0);
      } catch {}
    }
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Leer Sparkz de localStorage
    const s = localStorage.getItem("sparkz");
    setSparkz(s ? parseInt(s) : 0);
    // Escuchar cambios de Sparkz en otras pestañas/ventanas
    const onStorage = (e: StorageEvent) => {
      if (e.key === "sparkz") {
        setSparkz(e.newValue ? parseInt(e.newValue) : 0);
      }
    };
    window.addEventListener("storage", onStorage);
    // Escuchar cambios locales (cuando la tienda actualiza)
    const interval = setInterval(() => {
      const s2 = localStorage.getItem("sparkz");
      setSparkz(s2 ? parseInt(s2) : 0);
    }, 1000);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  if (loading) return null
  if (!isAuthenticated) return null

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

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("usuario");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRol");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <header className="border-b border-gray-800 bg-[#1a1d23]/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Brain className="h-8 w-8 text-purple-400" />
          <span className="text-xl font-bold tracking-tight">COGIT</span>
        </Link>

        {/* Mobile menu button: only show if authenticated */}
        {isAuthenticated && (
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        )}

        {/* Desktop Navigation */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/misiones" className={getNavLinkClass("misiones")}>Misiones</Link>
            <Link href="/minijuegos" className={getNavLinkClass("minijuegos")}>Minijuegos</Link>
            <Link href="/ranking" className={getNavLinkClass("ranking")}>Ranking</Link>
            <Link href="/comunidad" className={getNavLinkClass("comunidad")}>Comunidad</Link>
            <Link href="/tienda" className={getNavLinkClass("tienda") + " flex items-center justify-center group relative"} aria-label="Tienda">
              <ShoppingBag className="h-6 w-6 text-yellow-400 group-hover:scale-125 transition-transform duration-200 drop-shadow-glow" />
            </Link>
            <div className="flex items-center gap-4 ml-4">
              {/* Solo LivesIndicator visual y funcional */}
              <LivesIndicator className="ml-2" />
              {/* Sparkz sincronizados */}
              <div className="flex items-center gap-1">
                <Zap className="h-5 w-5 text-yellow-400" />
                <span className="font-bold">{sparkz}</span>
              </div>
            </div>
          </nav>
        )}

        <div className="hidden md:flex items-center gap-3">
          {/* MENÚ LATERAL TIPO SIDEBAR DROPDOWN, ROBUSTO Y VISUAL */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#23283a] hover:bg-[#2d3142] border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                onClick={() => setIsMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
              >
                <User className="h-5 w-5 text-purple-400" />
                <span className="font-medium text-sm text-white max-w-[100px] truncate">{userName || ""}</span>
                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-lg bg-[#23283a] border border-gray-700 shadow-2xl z-50 animate-fade-in flex flex-col divide-y divide-gray-800">
                  <div className="px-4 py-3 flex flex-col gap-1">
                    <span className="font-semibold text-lg text-purple-400 flex items-center gap-2">
                      <User className="h-5 w-5" /> {userName}
                    </span>
                    <span className="text-xs text-gray-400 capitalize">{userRol}</span>
                  </div>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#2d3142] transition-colors text-left"
                    onClick={() => { setIsMenuOpen(false); window.location.href = '/perfil'; }}
                  >
                    <Settings className="h-4 w-4 mr-2 text-gray-400" /> Configuración de perfil
                  </button>
                  {userRol === "admin" && (
                    <button
                      className="w-full flex items-center gap-2 px-4 py-3 text-sm hover:bg-[#2d3142] transition-colors text-left"
                      onClick={() => { setIsMenuOpen(false); window.location.href = '/admin'; }}
                    >
                      <Shield className="h-4 w-4 mr-2 text-purple-400" /> Ir al Dashboard Admin
                    </button>
                  )}
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 transition-colors text-left"
                    onClick={() => { setIsMenuOpen(false); handleLogout(); }}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="default" className="bg-blue-600 hover:bg-blue-700">Ingresar</Button>
              </Link>
              <Link href="/registro">
                <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10">Regístrate</Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isAuthenticated && isMenuOpen && (
        <div className="md:hidden bg-[#1a1d23] border-b border-gray-800">
          <nav className="flex flex-col py-4 px-4">
            <Link href="/misiones" className={getMobileNavLinkClass("misiones")} onClick={() => setIsMenuOpen(false)}>
              Misiones
            </Link>
            <Link href="/minijuegos" className={getMobileNavLinkClass("minijuegos")} onClick={() => setIsMenuOpen(false)}>
              MiniJuegos
            </Link>
            <Link href="/ranking" className={getMobileNavLinkClass("ranking")} onClick={() => setIsMenuOpen(false)}>
              Ranking
            </Link>
            <Link href="/comunidad" className={getMobileNavLinkClass("comunidad")} onClick={() => setIsMenuOpen(false)}>
              Comunidad
            </Link>
            <Link href="/tienda" className={getMobileNavLinkClass("tienda") + " flex items-center justify-center group relative"} onClick={() => setIsMenuOpen(false)} aria-label="Tienda">
              <ShoppingBag className="h-6 w-6 text-yellow-400 group-hover:scale-125 transition-transform duration-200 drop-shadow-glow" />
            </Link>
            <Button variant="outline" className="border-red-500 text-red-400 hover:bg-red-500/10 mt-4 w-full" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </nav>
        </div>
      )}
    </header>
  )
}

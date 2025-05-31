"use client"
import Image from "next/image"
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Home() {
  // Estado de autenticación
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = Boolean(localStorage.getItem("usuario"));
      setIsAuthenticated(isAuth);
      // Redirigir si ya está autenticado
      if (isAuth) {
        window.location.replace("/misiones");
      }
    }
    // Listen for storage changes (login/logout in other tabs)
    const handler = () => setIsAuthenticated(Boolean(localStorage.getItem("usuario")));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [])

  // Si está autenticado, no renderizar nada de la landing ni navegación
  if (isAuthenticated) {
    return null;
  }

  // Logout handler (no se usa en landing, pero se deja por si acaso)
  const handleLogout = () => {
    localStorage.removeItem("usuario")
    localStorage.removeItem("userId")
    localStorage.removeItem("userRol")
    // Remove auth cookie for middleware
    document.cookie = "userId=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAuthenticated(false)
    window.location.href = "/"
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navigation solo para usuarios NO autenticados */}
      <header className="border-b border-gray-800 bg-[#1a1d23]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold tracking-tight">COGIT</span>
          </Link>
          {/* Solo muestra navegación si está autenticado */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/misiones" className="hover:text-purple-400 transition-colors font-medium">Misiones</Link>
              <Link href="/minijuegos" className="hover:text-blue-400 transition-colors font-medium">Minijuegos</Link>
              <Link href="/comunidad" className="hover:text-green-400 transition-colors font-medium">Comunidad</Link>
              <Link href="/ranking" className="hover:text-yellow-400 transition-colors font-medium">Ranking</Link>
            </nav>
          )}
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="default" className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg transition-transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-fade-in">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 12l-6-6m0 0l6 6m-6-6v12" />
                  </svg>
                  Ingresar
                </span>
              </Button>
            </Link>
            <Link href="/registro">
              <Button variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10 shadow-md transition-transform hover:scale-105">
                <span className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 animate-fade-in">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Regístrate
                </span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Desbloquea tu <span className="text-purple-400">potencial</span>
          </h1>
          <p className="text-lg text-gray-300">Aprender a pensar como un programador nunca fue tan divertido.</p>
          <div className="flex flex-wrap gap-3 mt-4 mb-6">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400/20 text-yellow-300 font-semibold text-xs shadow-sm border border-yellow-400/30">+1000 estudiantes</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-pink-400/20 text-pink-200 font-semibold text-xs shadow-sm border border-pink-400/30">Aprende jugando</span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-400/20 text-blue-200 font-semibold text-xs shadow-sm border border-blue-400/30">Gratis para siempre</span>
          </div>
          <div className="h-2 md:h-4" />
          <Link href="/registro">
            <div className="flex flex-col items-start">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg flex items-center gap-3 shadow-lg transition-transform hover:scale-105 focus:ring-4 focus:ring-purple-400/40"
              >
                <span>Inicia Tu Aventura</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 animate-pulse">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
              <span className="text-sm text-purple-200 mt-2 ml-1 animate-fade-in">¡Es gratis y para todos los niveles!</span>
            </div>
          </Link>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden border border-blue-500/30 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
          <Image
            src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop"
            alt="Código de programación en pantalla"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20"></div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-16 bg-[#1a1d23]/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-gradient-to-br from-purple-900/80 via-blue-900/80 to-[#1e2330] p-10 rounded-lg border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.15)] relative overflow-hidden">
            {/* Ícono decorativo */}
            <div className="w-20 h-20 mx-auto flex items-center justify-center relative z-10 overflow-visible">
              <Brain className="w-16 h-16 text-purple-400 drop-shadow-lg animate-bounce-slow" />
            </div>
            <h2 className="text-3xl font-bold text-center text-purple-400 mb-6 relative z-20 flex flex-col items-center gap-2">
              Nuestra Visión
              <span className="block text-base text-purple-200 font-normal mt-1">Transformando la educación a través del juego y la creatividad</span>
            </h2>
            <blockquote className="text-xl text-center text-gray-300 leading-relaxed italic mb-6 relative z-20">
              “El pensamiento computacional no es solo para programadores, es una habilidad para la vida.”
            </blockquote>
            <p className="text-lg text-center text-gray-200 leading-relaxed relative z-20">
              Empoderamos a los estudiantes para dominar el pensamiento computacional a través de desafíos atractivos, trabajo en equipo y experiencias lúdicas. Creemos que aprender puede ser divertido, inclusivo y transformador para todos.
            </p>
            {/* Fondo decorativo sutil */}
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400/20 rounded-full blur-2xl z-0" />
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl z-0" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Conoce nuestra plataforma</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Aprende mientras juegas a través de nuestras emocionantes secciones.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Misiones */}
          {isAuthenticated && (
            <>
              <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-yellow-500/20 hover:border-yellow-500/40 transition-all group">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=800&auto=format&fit=crop"
                    alt="Misiones"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-center mb-3">Misiones</h3>
                  <p className="text-gray-300 text-center">Aprende superando niveles</p>
                </div>
              </div>

              {/* Minijuegos */}
              <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-blue-500/20 hover:border-blue-500/40 transition-all group">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1580541832626-2a7131ee809f?q=80&w=800&auto=format&fit=crop"
                    alt="Minijuegos"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-center mb-3">Minijuegos</h3>
                  <p className="text-gray-300 text-center">Ejercita tu mente y sé más ágil</p>
                </div>
              </div>

              {/* Comunidad */}
              <div className="bg-[#1e2330] rounded-lg overflow-hidden border border-green-500/20 hover:border-green-500/40 transition-all group">
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop"
                    alt="Comunidad"
                    width={400}
                    height={300}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e2330] to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-center mb-3">Comunidad</h3>
                  <p className="text-gray-300 text-center">Comparte tus logros y adquiere insignias de progreso</p>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 py-16 relative">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
            alt="Background Pattern"
            fill
            className="object-cover"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">¿Listo para comenzar tu aventura?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de aprendizaje y desarrolla habilidades de pensamiento computacional de forma
            divertida.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registro">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8">
                Regístrate Ahora
              </Button>
            </Link>
            {isAuthenticated && (
              <Link href="/misiones">
                <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  Conoce Más
                </Button>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Brain className="h-6 w-6 text-purple-400" />
              <span className="text-lg font-bold">COGIT</span>
            </div>
            <div className="flex gap-6">
              <Link href="/about" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Sobre Nosotros
              </Link>
              <Link href="/contact" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Contacto
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Privacidad
              </Link>
              <Link href="/terms" className="text-sm text-gray-400 hover:text-purple-400 transition-colors">
                Términos
              </Link>
            </div>
          </div>
          <div className="mt-6 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} COGIT. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

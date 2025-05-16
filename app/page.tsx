import Image from "next/image"
import Link from "next/link"
import { Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navigation */}
      <header className="border-b border-gray-800 bg-[#1a1d23]/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold tracking-tight">COGIT</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Inicio
            </Link>
            <Link href="/misiones" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Misiones
            </Link>
            <Link href="/minijuegos" className="text-sm font-medium hover:text-purple-400 transition-colors">
              MiniJuegos
            </Link>
            <Link href="/ranking" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Ranking
            </Link>
            <Link href="/comunidad" className="text-sm font-medium hover:text-purple-400 transition-colors">
              Comunidad
            </Link>
          </nav>
          <div className="flex items-center gap-3">
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
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-10">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" className="drop-shadow-lg animate-bounce-slow">
                <circle cx="32" cy="32" r="28" fill="#a78bfa" fillOpacity="0.15" />
                <path d="M32 16v32M16 32h32" stroke="#a78bfa" strokeWidth="4" strokeLinecap="round" />
              </svg>
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
            <Link href="/misiones">
              <Button size="lg" variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-500/10">
                Conoce Más
              </Button>
            </Link>
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

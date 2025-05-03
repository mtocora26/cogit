"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Brain, ArrowRight, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import LoginForm from "@/components/login-form"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleDemoLogin = () => {
    setIsLoading(true)
    // Simulación de inicio de sesión
    setTimeout(() => {
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#1a1d23]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center gap-2">
            <Brain className="h-8 w-8 text-purple-400" />
            <span className="text-xl font-bold tracking-tight">COGIT</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Left Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Bienvenido de nuevo</h1>
              <p className="text-gray-400">Inicia sesión para continuar tu aventura</p>
            </div>

            <LoginForm />

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1a1d23] text-gray-400">O continúa con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={handleDemoLogin}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                ¿No tienes una cuenta?{" "}
                <Link href="/registro" className="text-purple-400 hover:text-purple-300">
                  Regístrate
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-[#1e2330] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-purple-900/40 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1920&auto=format&fit=crop"
            alt="Login Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold mb-4">Potencia tu pensamiento computacional</h2>
              <p className="text-xl text-gray-300 mb-6">
                Desbloquea tu potencial con desafíos, juegos y una comunidad de aprendizaje.
              </p>
              <div className="flex justify-center">
                <Button className="bg-purple-600 hover:bg-purple-700 group" onClick={() => router.push("/registro")}>
                  Comenzar ahora
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Circuit Pattern Overlay */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <path
                    d="M0 50 H100 M50 0 V100 M25 25 L75 75 M75 25 L25 75"
                    stroke="white"
                    strokeWidth="1"
                    fill="none"
                  />
                  <circle cx="50" cy="50" r="8" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="25" cy="25" r="5" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="75" cy="75" r="5" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="75" cy="25" r="5" fill="none" stroke="white" strokeWidth="1" />
                  <circle cx="25" cy="75" r="5" fill="none" stroke="white" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}

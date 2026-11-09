"use client"

import { useState } from "react"
import { Logo } from "@/components/brand/logo"
import { AuthPanel } from "@/components/brand/auth-panel"
import { PasswordInput } from "@/components/brand/password-input"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({ username: "", password: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)
    try {
      // Lógica real de login
      const res = await fetch("/api/usuario/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      })
      const data = await res.json()
      if (!res.ok || !data.id) {
        setError(data.error || "Usuario o contraseña incorrectos")
        setIsLoading(false)
        return
      }
      // La sesión vive en una cookie httpOnly firmada por el servidor. Esto solo guarda datos para mostrar en pantalla.
      localStorage.setItem("userId", String(data.id))
      localStorage.setItem("userRol", data.rol)
      localStorage.setItem("usuario", JSON.stringify(data))
      // Redirigir al home o dashboard
      if (data.rol === "admin") {
        router.push("/admin")
      } else {
        router.push("/misiones")
      }
    } catch (err) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <Link href="/" aria-label="COGIT, inicio" className="flex min-h-11 items-center"><Logo className="h-8 w-auto" /></Link>
          <ThemeToggle />
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

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="username">
                  Usuario
                </label>
                <input
                  type="text"
                  id="username"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full p-3 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2" htmlFor="password">
                  Contraseña
                </label>
                <PasswordInput
                  id="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-3 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>
              {error && (
                <p role="alert" className="text-red-400 text-sm mb-4">
                  {error}
                </p>
              )}
              <Button
                type="submit"
                className="min-h-11 w-full"
                disabled={isLoading}
              >
                {isLoading ? "Cargando..." : "Iniciar sesión"}
              </Button>
            </form>

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

        <AuthPanel title="Potencia tu pensamiento computacional" text="Desbloquea tu potencial con desafíos, juegos y una comunidad de aprendizaje.">
          <Button className="group min-h-11" onClick={() => router.push("/registro")}>
            Comenzar ahora
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AuthPanel>
      </div>
    </div>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Logo } from "@/components/brand/logo"
import { AuthPanel } from "@/components/brand/auth-panel"
import { ThemeToggle } from "@/components/theme-toggle"
import Link from "next/link"
import { ArrowRight, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    aceptarTerminos: false,
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      aceptarTerminos: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validación básica
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("Por favor completa todos los campos")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!formData.aceptarTerminos) {
      setError("Debes aceptar los términos y condiciones")
      return
    }

    setIsLoading(true)

    try {
      // Llamar al endpoint real de registro
      const res = await fetch("/api/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || "Error al crear la cuenta")
        setIsLoading(false)
        return
      }
      // Registro exitoso
      router.push("/login")
    } catch (err) {
      setError("Error al crear la cuenta. Inténtalo de nuevo.")
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
        <AuthPanel title="Únete a la comunidad COGIT" text="Desarrolla habilidades de pensamiento computacional mientras te diviertes.">
          <Button className="group min-h-11" onClick={() => router.push("/login")}>
            Ya tengo una cuenta
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </AuthPanel>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Crea tu cuenta</h1>
              <p className="text-gray-400">Comienza tu aventura de aprendizaje</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium block">
                  Usuario
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  placeholder="tu_usuario"
                  value={formData.username}
                  onChange={handleChange}
                  className="bg-card border-input focus:border-purple-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium block">
                  Correo electrónico
                </label>
                <p id="email-ayuda" className="text-xs text-muted-foreground">Solo lo usamos para recuperar tu acceso. Con tu usuario inicias sesión.</p>
                <Input
                  aria-describedby="email-ayuda"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-card border-input focus:border-purple-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium block">
                  Contraseña
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="bg-card border-input focus:border-purple-500 pr-10"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium block">
                  Confirmar contraseña
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="bg-card border-input focus:border-purple-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terminos"
                  checked={formData.aceptarTerminos}
                  onCheckedChange={handleCheckboxChange}
                  disabled={isLoading}
                />
                <label
                  htmlFor="terminos"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Acepto los{" "}
                  <Link href="/terminos" className="text-purple-400 hover:text-purple-300">
                    términos y condiciones
                  </Link>
                </label>
              </div>

              <Button type="submit" className="min-h-11 w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creando cuenta...
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </Button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                ¿Ya tienes una cuenta?{" "}
                <Link href="/login" className="text-purple-400 hover:text-purple-300">
                  Inicia sesión
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

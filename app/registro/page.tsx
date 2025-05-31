"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Brain, ArrowRight, Github, Mail, Loader2, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { useRouter } from "next/navigation"

export default function RegistroPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
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
    if (!formData.nombre || !formData.email || !formData.password || !formData.confirmPassword) {
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
          nombre: formData.nombre,
          email: formData.email,
          password: formData.password, // En producción, hashear
          rol: "estudiante",
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

  const handleDemoRegister = () => {
    setIsLoading(true)
    // Simulación de registro
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
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 bg-[#1e2330] relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-blue-900/40 z-10"></div>
          <Image
            src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1920&auto=format&fit=crop"
            alt="Registro Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center p-12">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold mb-4">Únete a la comunidad COGIT</h2>
              <p className="text-xl text-gray-300 mb-6">
                Desarrolla habilidades de pensamiento computacional mientras te diviertes.
              </p>
              <div className="flex justify-center">
                <Button className="bg-blue-600 hover:bg-blue-700 group" onClick={() => router.push("/login")}>
                  Ya tengo una cuenta
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
                <label htmlFor="nombre" className="text-sm font-medium block">
                  Nombre de usuario
                </label>
                <Input
                  id="nombre"
                  name="nombre"
                  type="text"
                  placeholder="TuNombreDeUsuario"
                  value={formData.nombre}
                  onChange={handleChange}
                  className="bg-[#1e2330] border-gray-700 focus:border-purple-500"
                  disabled={isLoading}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium block">
                  Correo electrónico
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#1e2330] border-gray-700 focus:border-purple-500"
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
                    className="bg-[#1e2330] border-gray-700 focus:border-purple-500 pr-10"
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
                  className="bg-[#1e2330] border-gray-700 focus:border-purple-500"
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

              <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
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

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#1a1d23] text-gray-400">O regístrate con</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={handleDemoRegister}
                  disabled={isLoading}
                >
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Button>
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                  onClick={handleDemoRegister}
                  disabled={isLoading}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </div>

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

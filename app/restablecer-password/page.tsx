"use client"

import type React from "react"
import { Suspense, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { PasswordInput } from "@/components/brand/password-input"
import { Button } from "@/components/ui/button"

function Formulario() {
  const router = useRouter()
  const token = useSearchParams().get("token") ?? ""
  const [password, setPassword] = useState("")
  const [confirmar, setConfirmar] = useState("")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState("")
  const [cargando, setCargando] = useState(false)
  const [listo, setListo] = useState(false)

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (password.length < 8) return setError("La contraseña debe tener al menos 8 caracteres")
    if (password !== confirmar) return setError("Las contraseñas no coinciden")
    setCargando(true)
    try {
      const res = await fetch("/api/usuario/restablecer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(data.error || "No pudimos cambiar la contraseña. Inténtalo de nuevo.")
      setListo(true)
    } catch {
      setError("No hay conexión. Inténtalo de nuevo.")
    } finally {
      setCargando(false)
    }
  }

  if (!token) {
    return (
      <div className="text-center py-6">
        <h1 className="text-2xl font-bold mb-2">Enlace no válido</h1>
        <p className="text-gray-400 mb-6">Falta el enlace de recuperación. Solicita uno nuevo.</p>
        <Button asChild>
          <Link href="/recuperar-password">Solicitar un enlace</Link>
        </Button>
      </div>
    )
  }

  if (listo) {
    return (
      <div className="text-center py-6">
        <CheckCircle aria-hidden className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Contraseña actualizada</h1>
        <p className="text-gray-300 mb-6">Ya puedes iniciar sesión con tu nueva contraseña.</p>
        <Button onClick={() => router.push("/login")}>Ir a iniciar sesión</Button>
      </div>
    )
  }

  const campo =
    "flex h-10 w-full rounded-md border border-input bg-card px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Crea una contraseña nueva</h1>
        <p className="text-gray-400">Mínimo 8 caracteres.</p>
      </div>
      <form onSubmit={enviar} className="space-y-6">
        {error && (
          <div role="alert" className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-md text-sm">
            {error}{" "}
            {error.includes("enlace") && (
              <Link href="/recuperar-password" className="underline">
                Solicitar uno nuevo
              </Link>
            )}
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium block">
            Contraseña nueva
          </label>
          <PasswordInput
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={campo}
            disabled={cargando}
            required
            visible={visible}
            onVisibleChange={setVisible}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirmar" className="text-sm font-medium block">
            Repite la contraseña
          </label>
          <PasswordInput
            id="confirmar"
            autoComplete="new-password"
            value={confirmar}
            onChange={(e) => setConfirmar(e.target.value)}
            className={campo}
            disabled={cargando}
            required
            visible={visible}
            showToggle={false}
          />
        </div>
        <Button type="submit" className="min-h-11 w-full" disabled={cargando}>
          {cargando ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Guardando...
            </>
          ) : (
            "Cambiar contraseña"
          )}
        </Button>
      </form>
    </>
  )
}

export default function RestablecerPasswordPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <Link href="/" aria-label="COGIT, inicio" className="flex min-h-11 items-center">
            <Logo className="h-8 w-auto" />
          </Link>
        </div>
      </header>
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-card p-8 rounded-lg border border-border shadow-lg">
          <Link href="/login" className="flex min-h-11 items-center gap-1 text-sm text-gray-400 hover:text-gray-300 mb-4">
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Volver al inicio de sesión
          </Link>
          <Suspense fallback={null}>
            <Formulario />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

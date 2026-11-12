"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { PasswordInput } from "@/components/brand/password-input"
import { Button } from "@/components/ui/button"

const CAMPO =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"

/** Cambio de contraseña desde el perfil, pidiendo la actual. */
export default function CambiarPassword() {
  const [actual, setActual] = useState("")
  const [nueva, setNueva] = useState("")
  const [repetir, setRepetir] = useState("")
  const [visible, setVisible] = useState(false)
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [guardando, setGuardando] = useState(false)

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setAviso("")
    if (nueva.length < 8) return setError("La contraseña nueva debe tener al menos 8 caracteres")
    if (nueva !== repetir) return setError("Las contraseñas nuevas no coinciden")
    setGuardando(true)
    try {
      const res = await fetch("/api/usuario/cambiar-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ actual, nueva }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) return setError(data.error || "No pudimos cambiar la contraseña. Inténtalo de nuevo.")
      setActual("")
      setNueva("")
      setRepetir("")
      setAviso("Contraseña actualizada.")
    } catch {
      setError("No hay conexión. Inténtalo de nuevo.")
    } finally {
      setGuardando(false)
    }
  }

  return (
    <section aria-labelledby="password" className="rounded-xl border border-border bg-card p-5">
      <h2 id="password" className="font-display text-xl font-semibold">Contraseña</h2>
      <form onSubmit={enviar} className="mt-4 space-y-4">
        <div className="space-y-2">
          <label htmlFor="pw-actual" className="block text-sm font-medium">Contraseña actual</label>
          <PasswordInput
            id="pw-actual"
            autoComplete="current-password"
            value={actual}
            onChange={(e) => setActual(e.target.value)}
            className={CAMPO}
            disabled={guardando}
            required
            visible={visible}
            onVisibleChange={setVisible}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="pw-nueva" className="block text-sm font-medium">Contraseña nueva (mínimo 8 caracteres)</label>
          <PasswordInput
            id="pw-nueva"
            autoComplete="new-password"
            value={nueva}
            onChange={(e) => setNueva(e.target.value)}
            className={CAMPO}
            disabled={guardando}
            required
            visible={visible}
            showToggle={false}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="pw-repetir" className="block text-sm font-medium">Repite la contraseña nueva</label>
          <PasswordInput
            id="pw-repetir"
            autoComplete="new-password"
            value={repetir}
            onChange={(e) => setRepetir(e.target.value)}
            className={CAMPO}
            disabled={guardando}
            required
            visible={visible}
            showToggle={false}
          />
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <p aria-live="polite" className="min-h-5 text-sm text-neuron">{aviso}</p>
        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" className="min-h-11" disabled={guardando}>
            {guardando ? "Guardando..." : "Cambiar contraseña"}
          </Button>
          <Link href="/recuperar-password" className="inline-flex min-h-11 items-center text-sm text-purple-400 hover:text-purple-300">
            ¿No recuerdas la actual? Recupérala por correo
          </Link>
        </div>
      </form>
    </section>
  )
}

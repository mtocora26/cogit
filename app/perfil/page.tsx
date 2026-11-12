"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import NavBar from "@/components/nav-bar"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import CambiarPassword from "@/components/perfil/cambiar-password"
import ResultadosPerfil from "@/components/minijuegos/resultados-perfil"

interface Cuenta {
  username: string
  email: string
  rol: "estudiante" | "admin"
  visibleEnRanking: boolean
}

export default function PerfilPage() {
  const router = useRouter()
  const [cuenta, setCuenta] = useState<Cuenta | null>(null)
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [guardando, setGuardando] = useState(false)

  useEffect(() => {
    fetch("/api/usuario/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setCuenta)
      .catch(() => setError("No pudimos cargar tu perfil. Vuelve a iniciar sesión."))
  }, [])

  const cambiarVisibilidad = async (visible: boolean) => {
    if (!cuenta) return
    setGuardando(true)
    setError("")
    setAviso("")
    try {
      const res = await fetch("/api/usuario/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visibleEnRanking: visible }),
      })
      if (!res.ok) throw new Error()
      setCuenta({ ...cuenta, visibleEnRanking: visible })
      setAviso(visible ? "Volverás a aparecer en el ranking con tu alias." : "Ya no apareces en el ranking.")
    } catch {
      setError("No pudimos guardar el cambio. Inténtalo de nuevo.")
    } finally {
      setGuardando(false)
    }
  }

  const cerrarSesion = async () => {
    try {
      await fetch("/api/usuario/logout", { method: "POST" })
    } catch {}
    try {
      localStorage.removeItem("usuario")
      localStorage.removeItem("userId")
      localStorage.removeItem("userRol")
    } catch {}
    router.replace("/login")
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar />
      <main className="container mx-auto max-w-2xl px-4 py-10">
        <h1 className="font-display text-4xl font-bold">Tu perfil</h1>

        {error && <p role="alert" className="mt-6 text-destructive">{error}</p>}

        {cuenta && (
          <div className="mt-8 space-y-8">
            <dl className="divide-y divide-border rounded-xl border border-border bg-card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <dt className="text-muted-foreground">Usuario (tu alias público)</dt>
                <dd className="font-medium">{cuenta.username}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <dt className="text-muted-foreground">Correo (solo lo ves tú)</dt>
                <dd className="font-medium">{cuenta.email}</dd>
              </div>
              <div className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <dt className="text-muted-foreground">Rol</dt>
                <dd className="font-medium">{cuenta.rol === "admin" ? "Administrador" : "Estudiante"}</dd>
              </div>
            </dl>

            {cuenta.rol === "estudiante" && <ResultadosPerfil />}

            {cuenta.rol === "estudiante" && (
              <section aria-labelledby="privacidad" className="rounded-xl border border-border bg-card p-5">
                <h2 id="privacidad" className="font-display text-xl font-semibold">Privacidad</h2>
                <div className="mt-4 flex items-start justify-between gap-4">
                  <div>
                    <label htmlFor="ranking" className="font-medium">Aparecer en el ranking</label>
                    <p id="ranking-ayuda" className="mt-1 text-sm text-muted-foreground">
                      El ranking muestra solo tu alias y tu puntaje, nunca tu correo. Apágalo si prefieres no aparecer.
                    </p>
                  </div>
                  <Switch
                    id="ranking"
                    aria-describedby="ranking-ayuda"
                    checked={cuenta.visibleEnRanking}
                    disabled={guardando}
                    onCheckedChange={cambiarVisibilidad}
                  />
                </div>
                <p aria-live="polite" className="mt-3 min-h-5 text-sm text-neuron">{aviso}</p>
              </section>
            )}

            <CambiarPassword />

            <Button variant="outline" className="min-h-11" onClick={cerrarSesion}>
              Cerrar sesión
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}

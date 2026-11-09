"use client"

import MisionesTelar from "@/components/misiones-telar"
import NavBar from "@/components/nav-bar"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function MisionesPage() {
  const router = useRouter()
  const [isAuth, setIsAuth] = useState<boolean | null>(null)
  useEffect(() => {
    // La sesión real es la cookie del servidor; localStorage es solo una copia para mostrar datos.
    fetch("/api/usuario/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((u) => {
        if (u?.id) {
          try {
            localStorage.setItem("usuario", JSON.stringify(u))
            localStorage.setItem("userId", String(u.id))
            localStorage.setItem("userRol", u.rol)
          } catch {}
          setIsAuth(true)
        } else {
          setIsAuth(false)
          router.replace("/login")
        }
      })
      .catch(() => {
        setIsAuth(false)
        router.replace("/login")
      })
  }, [router])
  if (isAuth === false) return null
  if (isAuth === null) return null // Evita parpadeo inicial

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <NavBar activePage="misiones" />

      <main className="container mx-auto px-4 py-10">
        <h1 className="font-display text-4xl font-bold md:text-5xl">Misiones</h1>
        <p className="mt-3 max-w-xl text-lg text-muted-foreground">
          Cada misión es una serie de retos cortos. Resuélvelos en orden y tu avance queda guardado en tu cuenta.
        </p>
        <div className="mt-10">
          <MisionesTelar />
        </div>
      </main>
    </div>
  )
}

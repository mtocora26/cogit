"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LogOut } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { ThemeToggle } from "@/components/theme-toggle"

const LINKS = [
  { href: "/admin", label: "Resumen" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/admin/estadisticas", label: "Estadísticas" },
  { href: "/admin/contenido", label: "Contenido" },
]

export default function AdminNav({ username }: { username: string }) {
  const pathname = usePathname()
  const logout = async () => {
    try {
      await fetch("/api/usuario/logout", { method: "POST" })
    } catch {}
    try {
      localStorage.removeItem("usuario")
      localStorage.removeItem("userId")
      localStorage.removeItem("userRol")
    } catch {}
    window.location.href = "/login"
  }
  return (
    <header className="border-b border-border bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6">
        <Link href="/admin" aria-label="COGIT, administración" className="flex min-h-11 items-center gap-3">
          <Logo className="h-8 w-auto" />
          <span className="rounded-md bg-neuron/15 px-2 py-0.5 text-xs font-semibold text-neuron">Administración</span>
        </Link>
        <nav aria-label="Administración" className="order-last flex w-full gap-1 overflow-x-auto sm:order-none sm:w-auto">
          {LINKS.map((l) => {
            const active = l.href === "/admin" ? pathname === "/admin" : pathname.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`inline-flex min-h-11 items-center whitespace-nowrap rounded-md px-3 text-sm font-medium transition-colors duration-150 ${
                  active ? "bg-neuron/15 text-neuron" : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            )
          })}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/misiones" className="inline-flex min-h-11 items-center rounded-md px-3 text-sm text-muted-foreground hover:bg-accent hover:text-foreground">
            Ver como estudiante
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={logout}
            aria-label={`Cerrar sesión de ${username}`}
            className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <LogOut aria-hidden className="h-4 w-4" />
            <span className="hidden sm:inline">{username}</span>
          </button>
        </div>
      </div>
    </header>
  )
}

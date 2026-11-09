"use client"

import { useCallback, useEffect, useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type Rol = "estudiante" | "admin"
interface Fila {
  id: number
  username: string
  email: string
  rol: Rol
  creadoEn: string
  completadas: number
}

const ROL_LABEL: Record<Rol, string> = { estudiante: "Estudiante", admin: "Administrador" }
const fecha = (iso: string) => new Intl.DateTimeFormat("es-CO", { dateStyle: "medium" }).format(new Date(iso))

export default function UsuariosTabla() {
  const [filas, setFilas] = useState<Fila[] | null>(null)
  const [q, setQ] = useState("")
  const [rol, setRol] = useState<"" | Rol>("")
  const [error, setError] = useState("")
  const [aviso, setAviso] = useState("")
  const [pendiente, setPendiente] = useState<{ fila: Fila; nuevo: Rol } | null>(null)
  const [miId, setMiId] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/usuario/me").then((r) => (r.ok ? r.json() : null)).then((u) => setMiId(u?.id ?? null)).catch(() => {})
  }, [])

  const cargar = useCallback(async () => {
    setError("")
    try {
      const params = new URLSearchParams()
      if (q.trim()) params.set("q", q.trim())
      if (rol) params.set("rol", rol)
      const res = await fetch(`/api/admin/usuarios?${params}`)
      if (!res.ok) throw new Error()
      setFilas(await res.json())
    } catch {
      setError("No pudimos cargar los usuarios. Revisa la conexión e inténtalo de nuevo.")
    }
  }, [q, rol])

  useEffect(() => {
    const t = setTimeout(cargar, 250)
    return () => clearTimeout(t)
  }, [cargar])

  const confirmar = async () => {
    if (!pendiente) return
    const { fila, nuevo } = pendiente
    setPendiente(null)
    setAviso("")
    const res = await fetch(`/api/admin/usuarios/${fila.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ rol: nuevo }),
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      setError(data.error || "No pudimos cambiar el rol")
      return
    }
    setError("")
    setAviso(`${fila.username} ahora es ${ROL_LABEL[nuevo].toLowerCase()}.`)
    cargar()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end gap-3">
        <div className="min-w-56 flex-1">
          <label htmlFor="buscar" className="mb-1 block text-sm font-medium">Buscar por usuario o correo</label>
          <input
            id="buscar"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="min-h-11 w-full rounded-md border border-border bg-card px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="filtro-rol" className="mb-1 block text-sm font-medium">Rol</label>
          <select
            id="filtro-rol"
            value={rol}
            onChange={(e) => setRol(e.target.value as "" | Rol)}
            className="min-h-11 rounded-md border border-border bg-card px-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">Todos</option>
            <option value="estudiante">Estudiantes</option>
            <option value="admin">Administradores</option>
          </select>
        </div>
      </div>

      <div aria-live="polite" className="min-h-5 text-sm">
        {error && <p role="alert" className="text-destructive">{error}</p>}
        {aviso && !error && <p className="text-neuron">{aviso}</p>}
      </div>

      <ul className="space-y-3 md:hidden">
        {filas === null && !error && <li className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">Cargando usuarios…</li>}
        {filas?.length === 0 && <li className="rounded-xl border border-border bg-card px-5 py-8 text-center text-muted-foreground">Ningún usuario coincide con la búsqueda.</li>}
        {filas?.map((f) => {
          const yo = f.id === miId
          return (
            <li key={f.id} className="rounded-xl border border-border bg-card p-4">
              <p className="font-medium">{f.username}{yo && <span className="ml-2 text-xs font-normal text-muted-foreground">(tú)</span>}</p>
              <p className="mt-1 break-all text-sm text-muted-foreground">{f.email}</p>
              <p className="mt-1 text-sm text-muted-foreground">Registro {fecha(f.creadoEn)} · {f.completadas} actividades completadas</p>
              <label className="mt-3 block text-sm font-medium" htmlFor={`rol-m-${f.id}`}>Rol</label>
              <select
                id={`rol-m-${f.id}`}
                value={f.rol}
                disabled={yo}
                title={yo ? "No puedes cambiar tu propio rol" : undefined}
                onChange={(e) => setPendiente({ fila: f, nuevo: e.target.value as Rol })}
                className="mt-1 min-h-11 w-full rounded-md border border-border bg-background px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
              >
                <option value="estudiante">Estudiante</option>
                <option value="admin">Administrador</option>
              </select>
            </li>
          )
        })}
      </ul>

      <div className="hidden overflow-x-auto rounded-xl border border-border bg-card md:block">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-border text-muted-foreground">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">Usuario</th>
              <th scope="col" className="px-5 py-3 font-medium">Correo</th>
              <th scope="col" className="px-5 py-3 font-medium">Rol</th>
              <th scope="col" className="px-5 py-3 font-medium">Registro</th>
              <th scope="col" className="px-5 py-3 text-right font-medium">Actividades completadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filas === null && !error && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Cargando usuarios…</td></tr>
            )}
            {filas?.length === 0 && (
              <tr><td colSpan={5} className="px-5 py-8 text-center text-muted-foreground">Ningún usuario coincide con la búsqueda.</td></tr>
            )}
            {filas?.map((f) => {
              const yo = f.id === miId
              return (
                <tr key={f.id}>
                  <td className="px-5 py-3 font-medium">{f.username}{yo && <span className="ml-2 text-xs font-normal text-muted-foreground">(tú)</span>}</td>
                  <td className="px-5 py-3 text-muted-foreground">{f.email}</td>
                  <td className="px-5 py-2">
                    <label className="sr-only" htmlFor={`rol-${f.id}`}>Rol de {f.username}</label>
                    <select
                      id={`rol-${f.id}`}
                      value={f.rol}
                      disabled={yo}
                      title={yo ? "No puedes cambiar tu propio rol" : undefined}
                      onChange={(e) => setPendiente({ fila: f, nuevo: e.target.value as Rol })}
                      className="min-h-11 rounded-md border border-border bg-background px-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-60"
                    >
                      <option value="estudiante">Estudiante</option>
                      <option value="admin">Administrador</option>
                    </select>
                  </td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{fecha(f.creadoEn)}</td>
                  <td className="px-5 py-3 text-right tabular-nums">{f.completadas}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <AlertDialog open={!!pendiente} onOpenChange={(o) => !o && setPendiente(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cambiar el rol de {pendiente?.fila.username}?</AlertDialogTitle>
            <AlertDialogDescription>
              Pasará a ser {pendiente ? ROL_LABEL[pendiente.nuevo].toLowerCase() : ""}.
              {pendiente?.nuevo === "admin" && " Podrá consultar usuarios y administrar contenido."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmar}>Cambiar rol</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

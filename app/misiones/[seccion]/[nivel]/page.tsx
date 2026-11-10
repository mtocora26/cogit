"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Star, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import NavBar from "@/components/nav-bar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLives } from "@/components/misiones/lives-context"
import { useCatalogo } from "@/components/misiones/use-catalogo"
import { buscarNivel, minutosNivel, siguienteNivel, type ActividadCatalogo } from "@/lib/misiones-catalogo"

type ActivityStatus = "completed" | "current" | "locked"
type Activity = ActividadCatalogo & { status: ActivityStatus }

export default function NivelPage({ params }: { params: Promise<{ seccion: string; nivel: string }> }) {
  const { seccion, nivel } = use(params)
  const router = useRouter()
  const catalogo = useCatalogo()
  const [activeTab, setActiveTab] = useState<"actividades" | "progreso">("actividades")
  const [activities, setActivities] = useState<Activity[]>([])
  const [progress, setProgress] = useState(0)
  const { lives, isRecharging, rechargeTime } = useLives()
  const [showNoLives, setShowNoLives] = useState(false)

  // Detectar si el usuario es admin
  const [isAdmin, setIsAdmin] = useState(false)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const usuario = localStorage.getItem("usuario")
      if (usuario) {
        try {
          const user = JSON.parse(usuario)
          setIsAdmin(user.rol === "admin")
        } catch {}
      }
    }
  }, [])

  const seccionId = decodeURIComponent(seccion)
  const nivelId = decodeURIComponent(nivel)
  const nivelCat = catalogo ? buscarNivel(catalogo, seccionId, nivelId) : undefined
  const siguiente = catalogo ? siguienteNivel(catalogo, nivelId) : undefined

  // Estado y porcentaje a partir del progreso guardado en la cuenta (REQ-006/007).
  // Mientras no se conozca el progreso (cargando o error) no se afirma nada: todo queda pendiente.
  const [completadas, setCompletadas] = useState<Set<string>>(new Set())
  useEffect(() => {
    let cancel = false
    fetch("/api/progreso")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((rows: { seccion: string; nivel: string; actividad: string; completado: boolean }[]) => {
        if (cancel || !Array.isArray(rows)) return
        setCompletadas(
          new Set(
            rows
              .filter((r) => r.completado && String(r.seccion) === seccionId && String(r.nivel) === nivelId)
              .map((r) => String(r.actividad)),
          ),
        )
      })
      .catch(() => {})
    return () => {
      cancel = true
    }
  }, [seccionId, nivelId])

  useEffect(() => {
    const base = nivelCat?.actividades ?? []
    const hechas = base.map((a) => completadas.has(`${seccionId}-${nivelId}-${a.id}`))
    // Un estudiante desbloquea cada actividad al completar la anterior; el administrador accede a todas.
    const updated: Activity[] = base.map((a, i) => ({
      ...a,
      status: hechas[i] ? "completed" : isAdmin || i === 0 || hechas[i - 1] ? "current" : "locked",
    }))
    setActivities(updated)
    setProgress(updated.length > 0 ? Math.round((hechas.filter(Boolean).length / updated.length) * 100) : 0)
  }, [nivelCat, seccionId, nivelId, isAdmin, completadas])

  // Mostrar el panel si no hay vidas y actualizarlo cuando se recarga una vida y luego vuelve a 0
  useEffect(() => {
    setShowNoLives(lives === 0)
  }, [lives, isRecharging, rechargeTime])

  const handleBack = () => router.push("/misiones")

  const handleGoToActivity = (activityId: string, status: ActivityStatus) => {
    if (lives === 0) {
      setShowNoLives(true)
      return
    }
    if (status !== "locked") {
      // Ejemplo: seccion "1", nivel "1", actividad "1" => ruta de actividad "1-1-1"
      router.push(`/misiones/${seccionId}/${nivelId}/actividad/${seccionId}-${nivelId}-${activityId}`)
    }
  }

  function formatTimeMMSS(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  if (!catalogo) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <NavBar activePage="misiones" />
        <p role="status" className="container mx-auto px-4 py-10 text-muted-foreground">Cargando nivel…</p>
      </div>
    )
  }

  if (!nivelCat) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center">
        <NavBar activePage="misiones" />
        <div className="text-2xl font-bold mb-4">Nivel no encontrado</div>
        <p className="text-gray-400 mb-8">El nivel solicitado no existe o no está disponible.</p>
        <Button onClick={() => router.push("/misiones")}>Volver a Misiones</Button>
      </div>
    )
  }

  // Nivel sin actividades jugables: se explica en vez de mostrar actividades que no se pueden abrir.
  if (nivelCat.actividades.length === 0) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-3 px-4 text-center">
        <NavBar activePage="misiones" />
        <h1 className="text-2xl font-bold">{nivelCat.title}</h1>
        <p className="text-muted-foreground max-w-md">Este nivel aún no está disponible. Estamos preparando sus actividades; mientras tanto, practica en el nivel 1.</p>
        <Button onClick={() => router.push("/misiones")}>Volver a Misiones</Button>
      </div>
    )
  }

  const getActivityIcon = (index: number) =>
    index === 0 ? <HelpCircle className="h-5 w-5" /> : index === 1 ? <Trophy className="h-5 w-5" /> : <Star className="h-5 w-5" />

  const renderActividad = (activity: Activity, index: number) => (
    <div
      key={activity.id}
      className={cn(
        "bg-card rounded-lg border p-4 transition-all",
        activity.status === "completed" ? "border-green-500/30" : activity.status === "current" ? "border-blue-500/30" : "border-gray-700 opacity-70",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 shrink-0 rounded-full flex items-center justify-center bg-green-500/20 text-green-400">{getActivityIcon(index)}</div>
          <div>
            <h3 className="font-medium">{activity.title}</h3>
            <p className="text-sm text-gray-400">{activity.descripcion}</p>
            <p className="text-sm mt-1">
              <span className="font-medium">Objetivo:</span> {activity.objetivo} <span className="text-gray-400">· ≈ {activity.minutos} min</span>
            </p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={() => handleGoToActivity(activity.id, activity.status)}
          disabled={activity.status === "locked"}
          className={cn(
            "min-h-11",
            activity.status === "completed" ? "bg-green-600 hover:bg-green-700" : activity.status === "current" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-700",
          )}
        >
          {activity.status === "completed" ? "Repasar" : activity.status === "current" ? "Continuar" : "Bloqueado"}
        </Button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="misiones" />
      {/* Panel de bloqueo si no hay vidas */}
      {showNoLives && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-card rounded-2xl p-8 shadow-lg flex flex-col items-center max-w-xs w-full border border-border">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">¡Sin vidas!</h2>
            <p className="text-gray-200 mb-4 text-center">No tienes vidas para seguir jugando misiones.<br />
              {isRecharging ? `Recuperarás una vida en ${formatTimeMMSS(rechargeTime)}.` : "Debes esperar la recarga automática."}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button className="font-semibold" onClick={() => { window.location.href = "/minijuegos" }}>Ir a Minijuegos</Button>
              <Button variant="outline" className="border-gray-500 text-gray-300 mt-2" disabled>
                Esperar recarga automática
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <button onClick={handleBack} className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Misiones</span>
          </button>
          <span>/</span>
          <span>{catalogo.seccion.title}</span>
          <span>/</span>
          <span className="text-white">Nivel {nivelCat.id}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Nivel {nivelCat.id}: {nivelCat.title}</h1>
            <p className="text-gray-400 mt-1">{nivelCat.text}</p>
            <p className="text-sm mt-2">
              <span className="font-medium">Objetivo:</span> {nivelCat.objetivo}
              <span className="text-gray-400"> · ≈ {minutosNivel(nivelCat)} min</span>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Progress value={progress} className="w-48 h-2 bg-gray-700" indicatorClassName="bg-primary" />
            <span className="text-sm text-gray-300">{progress}% completado</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 border-b border-gray-800">
        <div className="flex space-x-8">
          {(["actividades", "progreso"] as const).map((tab) => (
            <button
              key={tab}
              className={cn(
                "py-4 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab ? "border-purple-500 text-white" : "border-transparent text-gray-400 hover:text-gray-300",
              )}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "actividades" ? "Actividades" : "Progreso"}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "actividades" && (
          <div className={`space-y-6 ${lives === 0 ? "pointer-events-none opacity-50 select-none" : ""}`}>
            <div className="bg-card rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Actividades del nivel</h2>
              <p className="text-gray-300 mb-6">Completa las actividades en orden: cada una se desbloquea al terminar la anterior.</p>
              <div className="space-y-4">{activities.map(renderActividad)}</div>
            </div>

            {/* Próximo nivel */}
            {siguiente && (
              <div className="bg-card rounded-lg border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Próximo nivel</h2>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{siguiente.title}</h3>
                    <p className="text-sm text-gray-400">{siguiente.text}</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-400"
                    disabled={!isAdmin}
                    onClick={() => {
                      if (isAdmin) router.push(`/misiones/${seccionId}/${siguiente.id}`)
                    }}
                  >
                    {isAdmin ? "Ir al siguiente nivel" : "Desbloquea completando este nivel"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
        {activeTab === "progreso" && (
          <div className="bg-card rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Progreso del nivel</h2>
            <p className="text-gray-400 mb-6">Aquí puedes ver tu progreso en las actividades de este nivel.</p>
            <div className="space-y-4">{activities.map(renderActividad)}</div>
          </div>
        )}
      </div>
    </div>
  )
}

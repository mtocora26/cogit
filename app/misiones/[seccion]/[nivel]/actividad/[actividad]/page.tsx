"use client"

import { Fragment, useEffect, useRef, useState, type ComponentType } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, RotateCcw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import PatternRecognition from "@/components/misiones/nivel1/pattern-recognition"
import OutlierPattern from "@/components/misiones/nivel1/outlier-pattern"
import PatternCreator from "@/components/misiones/nivel1/pattern-creator"
import { useLives } from "@/components/misiones/lives-context"
import { buscarActividad, buscarNivel } from "@/lib/misiones-catalogo"
import { useCatalogo } from "@/components/misiones/use-catalogo"
import type { Juego } from "@/lib/contenido-schema"
import ReglasActividad from "@/components/misiones/reglas-actividad"
import type { EstadoJuego } from "@/lib/patrones"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

// --- Configuración de rondas y puntos por nivel ---
const nivelConfig: Record<string, { rondas: number; puntos: number; penalizacion: number; bonus: number }> = {
  "1": { rondas: 5, puntos: 5, penalizacion: 2, bonus: 10 },
  "2": { rondas: 5, puntos: 8, penalizacion: 2, bonus: 15 },
  "3": { rondas: 3, puntos: 12, penalizacion: 2, bonus: 20 },
}

// --- NUEVO: Función robusta para descontar vidas por error de ronda ---
// Cada actividad del catálogo elige su juego por clave: agregar una actividad no exige tocar esta página.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JUEGOS_UI: Record<Juego, ComponentType<any>> = {
  reconocer: PatternRecognition,
  intruso: OutlierPattern,
  completa: PatternCreator,
}

function descontarVidaPorError(loseLife: () => void) {
  if (typeof loseLife === "function") {
    loseLife();
  }
}

export default function ActividadPage({ params }: { params: Promise<{ seccion: string; nivel: string; actividad: string }> }) {
  const [routeParams, setRouteParams] = useState<{ seccion: string; nivel: string; actividad: string } | null>(null)
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [activityScore, setActivityScore] = useState(0)
  const { loseLife, lives, setLives } = useLives()
  const livesRef = useRef(lives)
  livesRef.current = lives
  // Cada intento monta el juego desde cero (clave nueva); lo ya guardado en la cuenta no se toca.
  const [intento, setIntento] = useState(0)
  const [confirmarReinicio, setConfirmarReinicio] = useState(false)
  const [erroresDetalle, setErroresDetalle] = useState<{ ronda: number; explicacion: string }[]>([])
  const [feedbackFinal, setFeedbackFinal] = useState("")
  // Reglas y ejemplo: pantalla previa (omitible) y diálogo para reabrirlas sin desmontar el juego.
  const [introVista, setIntroVista] = useState(false)
  const [reglasAbiertas, setReglasAbiertas] = useState(false)

  useEffect(() => {
    params.then(setRouteParams)
  }, [params])

  // Avance a medias guardado en la cuenta (REQ-006): undefined = cargando, null = no hay.
  const [parcial, setParcial] = useState<{ estado: EstadoJuego; vidas: number } | null | undefined>(undefined)
  const [errorGuardado, setErrorGuardado] = useState(false)
  const catalogo = useCatalogo()
  const ultimoEstado = useRef<EstadoJuego | null>(null)
  const terminado = useRef(false)

  useEffect(() => {
    if (!routeParams) return
    let cancel = false
    const q = new URLSearchParams({ seccion: routeParams.seccion, nivel: routeParams.nivel, actividad: routeParams.actividad })
    fetch(`/api/progreso/parcial?${q}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((p) => {
        if (cancel) return
        if (p && p.estado) {
          setParcial({ estado: p.estado, vidas: Number(p.vidas) })
          // Retomar con las vidas guardadas, sin devolver las que ya se gastaron en este dispositivo.
          if (Number.isInteger(p.vidas)) setLives(Math.min(p.vidas, livesRef.current))
          setIntroVista(true)
        } else setParcial(null)
      })
      .catch(() => !cancel && setParcial(null))
    return () => {
      cancel = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams])

  async function guardarEstado(estado: EstadoJuego) {
    if (!routeParams) return
    try {
      const res = await fetch("/api/progreso/parcial", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...routeParams, estado, vidas: livesRef.current }),
      })
      if (!res.ok) throw new Error("no guardado")
      setErrorGuardado(false)
    } catch {
      setErrorGuardado(true)
    }
  }

  // Los juegos avisan al cambiar de ronda; tras terminar la actividad ya no se guarda nada a medias.
  function handleEstado(estado: EstadoJuego) {
    if (terminado.current) return
    ultimoEstado.current = estado
    guardarEstado(estado)
  }

  function descartarParcial() {
    if (!routeParams) return
    const q = new URLSearchParams({ seccion: routeParams.seccion, nivel: routeParams.nivel, actividad: routeParams.actividad })
    fetch(`/api/progreso/parcial?${q}`, { method: "DELETE" }).catch(() => {})
  }

  if (!routeParams) return null
  const { seccion, nivel, actividad } = routeParams
  const nivelCat = catalogo ? buscarNivel(catalogo, seccion, nivel) : undefined
  const datos = catalogo ? buscarActividad(catalogo, seccion, nivel, actividad.split("-").pop() ?? "") : undefined
  const actividadInfo = { nivelTitle: nivelCat?.title ?? "Nivel", title: datos?.title ?? "Actividad", description: datos?.descripcion ?? "" }
  // Reinicia solo el intento actual. No cuesta vidas (las ya perdidas no se recuperan) y no borra lo completado.
  const reiniciar = () => {
    terminado.current = false
    ultimoEstado.current = null
    descartarParcial()
    setParcial(null)
    setErrorGuardado(false)
    setIsCompleted(false)
    setActivityScore(0)
    setErroresDetalle([])
    setFeedbackFinal("")
    setConfirmarReinicio(false)
    setIntento((i) => i + 1)
  }

  // Función para volver al nivel
  const handleBack = () => {
    router.push(`/misiones/${seccion}/${nivel}`)
  }

  // --- NUEVO: Lógica de control de errores por ronda ---
  function handleRondaError() {
    descontarVidaPorError(loseLife);
  }

  // --- Sistema de puntos y repaso para juegos reales ---
  async function handleGameComplete(success: boolean, time: number, score?: number, detalleErrores?: { ronda: number; explicacion: string }[], repetidos?: number[]) {
    terminado.current = true
    // Lógica de sumatoria detallada
    let total = 0
    let bonus = 0
    let errores = detalleErrores || []
    let erroresRe = repetidos || []
    const nivelActual = nivelConfig[routeParams?.nivel || "1"] || nivelConfig["1"]
    const puntosRonda = nivelActual.puntos
    const penalizacion = nivelActual.penalizacion
    const bonusPerfecto = nivelActual.bonus

    // Simulación: score = cantidad de aciertos en primera pasada
    // errores = [{ronda, explicacion}] de las fallidas
    // erroresRe = índices de las que se repitieron y fallaron de nuevo

    // Sumar puntos por aciertos en primera pasada
    total += (score || 0) * puntosRonda
    // Restar penalización por cada error en primera pasada
    total -= (errores.length) * penalizacion
    // Sumar puntos por aciertos en repaso (solo si acertó en el repaso)
    if (erroresRe && erroresRe.length > 0) {
      // Si el usuario acertó en el repaso, suma puntos por esas rondas
      total += (errores.length - erroresRe.length) * puntosRonda
    } else {
      total += errores.length * puntosRonda
    }
    // No penalizar si vuelve a fallar en el repaso, solo feedback
    // Bonus solo si no hubo errores en la primera pasada
    if (errores.length === 0) {
      bonus = bonusPerfecto
      total += bonus
    }
    // Lo que se muestra es exactamente lo que se guarda en /api/progreso.
    const puntosGuardados = Math.max(0, total)
    setActivityScore(puntosGuardados)
    setErroresDetalle(errores)
    setIsCompleted(true)

    // Feedback final
    let feedback = `¡Actividad completada! Obtuviste ${puntosGuardados} puntos.`
    if (bonus > 0) feedback += `\n¡Bonus perfecto +${bonus}!`
    if (errores.length > 0) {
      const fallos = erroresRe && erroresRe.length > 0 ? erroresRe : []
      const fallosMsg = fallos.length > 0
        ? `\nRevisa la explicación de la Ronda ${fallos.map(i => i + 1).join(", ")} para mejorar la próxima vez.`
        : `\n¡Repasaste y corregiste todos tus errores!`
      feedback += fallosMsg
    }
    setFeedbackFinal(feedback)

    // Guardar el avance en la cuenta (REQ-006/007): alimenta Misiones, el ranking y las estadísticas.
    try {
      const res = await fetch("/api/progreso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seccion,
          nivel,
          actividad,
          completado: success,
          score: puntosGuardados,
          tiempo: Math.max(0, Math.round(time || 0)),
        }),
      })
      if (!res.ok) throw new Error("no guardado")
    } catch {
      setFeedbackFinal((f) => f + "\nNo pudimos guardar tu progreso. Revisa tu conexión y vuelve a intentarlo.")
    }
  }

  function renderJuego() {
    if (!datos) return <div className="p-8 text-center">Actividad no encontrada</div>
    const Juego = JUEGOS_UI[datos.juego]
    return <Juego onComplete={handleGameComplete} onRondaError={handleRondaError} estadoInicial={parcial?.estado} onEstado={handleEstado} />
  }

  // Render principal
  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavBar activePage="misiones" />
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <button onClick={handleBack} className="hover:text-foreground transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al nivel</span>
          </button>
          <span>/</span>
          <span>{actividadInfo.nivelTitle}</span>
          <span>/</span>
          <span className="text-foreground">{actividadInfo.title}</span>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{actividadInfo.title}</h1>
            <p className="text-gray-400 mt-1">{actividadInfo.description}</p>
            {datos && (
              <p className="text-sm mt-2">
                <span className="font-medium">Objetivo:</span> {datos.objetivo}
                <span className="text-gray-400"> · ≈ {datos.minutos} min</span>
              </p>
            )}
          </div>
          {isCompleted && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-300">{activityScore} pts</span>
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        {isCompleted ? (
          <div className="bg-card rounded-lg p-8 text-center border border-gray-800 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-2 text-blue-300">¡Actividad completada!</h2>
            <p className="text-lg text-gray-200 mb-4 whitespace-pre-line">{feedbackFinal}</p>
            {erroresDetalle.length > 0 && (
              <div className="mb-4 text-left">
                <h3 className="text-lg font-bold text-red-400 mb-2">Rondas con error:</h3>
                <ul className="list-disc ml-6 text-sm text-red-300">
                  {erroresDetalle.map((err, i) => (
                    <li key={i}>Ronda {err.ronda + 1}: {err.explicacion}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 min-h-11" onClick={handleBack}>Volver al nivel</Button>
              <Button variant="outline" className="min-h-11" onClick={reiniciar} disabled={lives === 0}>
                <RotateCcw aria-hidden className="mr-2 h-4 w-4" />
                Reintentar la actividad
              </Button>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {lives === 0
                ? "No tienes vidas para reintentar ahora. Se recargan solas."
                : "Reintentar no cuesta vidas. Cada error durante el intento sí cuesta 1. Lo que ya completaste se conserva."}
            </p>
          </div>
        ) : parcial === undefined || !catalogo ? (
          <p role="status" className="text-center text-muted-foreground">Cargando tu avance…</p>
        ) : datos && !introVista ? (
          <div className="bg-card rounded-lg p-6 border border-gray-800 max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">Antes de empezar</h2>
            <ReglasActividad actividad={datos} />
            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <Button className="min-h-11" autoFocus onClick={() => setIntroVista(true)}>Empezar la actividad</Button>
              <Button variant="ghost" className="min-h-11" onClick={() => setIntroVista(true)}>Omitir</Button>
            </div>
          </div>
        ) : (
          <>
            {parcial && (
              <p role="status" className="mb-3 rounded-lg border border-border bg-secondary p-3 text-sm">
                Retomaste tu actividad donde la dejaste. Si prefieres, usa «Reiniciar actividad» para empezar de cero.
              </p>
            )}
            {errorGuardado && (
              <div role="alert" className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                <span>No pudimos guardar tu avance. Si sales ahora, podrías perderlo.</span>
                <Button size="sm" variant="outline" className="min-h-11" onClick={() => ultimoEstado.current && guardarEstado(ultimoEstado.current)}>
                  Reintentar guardado
                </Button>
              </div>
            )}
            {datos && (
              <div className="mb-4 flex flex-wrap justify-end gap-2">
                <Button variant="outline" size="sm" className="min-h-11" onClick={() => setConfirmarReinicio(true)}>
                  <RotateCcw aria-hidden className="mr-2 h-4 w-4" />
                  Reiniciar actividad
                </Button>
                <Button variant="outline" size="sm" className="min-h-11" onClick={() => setReglasAbiertas(true)}>
                  <HelpCircle aria-hidden className="mr-2 h-4 w-4" />
                  Ver reglas
                </Button>
              </div>
            )}
            <Fragment key={intento}>{renderJuego()}</Fragment>
          </>
        )}
        <Dialog open={confirmarReinicio} onOpenChange={setConfirmarReinicio}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>¿Reiniciar la actividad?</DialogTitle>
              <DialogDescription>
                Empiezas de nuevo desde la primera ronda. Reiniciar no cuesta vidas, pero las que ya perdiste no se recuperan. Lo que tienes completado se conserva.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button variant="ghost" className="min-h-11" onClick={() => setConfirmarReinicio(false)}>Cancelar</Button>
              <Button className="min-h-11" onClick={reiniciar}>Reiniciar</Button>
            </div>
          </DialogContent>
        </Dialog>
        {datos && (
          <Dialog open={reglasAbiertas} onOpenChange={setReglasAbiertas}>
            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Reglas y ejemplo</DialogTitle>
                <DialogDescription>Es solo una guía: tu ronda sigue donde la dejaste y no cuenta como intento.</DialogDescription>
              </DialogHeader>
              <ReglasActividad actividad={datos} />
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

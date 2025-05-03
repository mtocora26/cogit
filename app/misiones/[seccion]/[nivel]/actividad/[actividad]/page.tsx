"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/nav-bar"
import { cn } from "@/lib/utils"
import PatternRecognition from "@/components/misiones/seccion1/nivel1/pattern-recognition"
import ComplexPatterns from "@/components/misiones/seccion1/nivel1/complex-patterns"
import PatternEvaluation from "@/components/misiones/seccion1/nivel1/pattern-evaluation"

export default function ActividadPage({
  params,
}: {
  params: { seccion: string; nivel: string; actividad: string }
}) {
  const router = useRouter()
  const [isCompleted, setIsCompleted] = useState(false)
  const [activitySuccess, setActivitySuccess] = useState(false)
  const [activityTime, setActivityTime] = useState(0)
  const [activityScore, setActivityScore] = useState(0)
  const [remainingLives, setRemainingLives] = useState(0)

  // Decodificar los parámetros de la URL
  const seccionId = decodeURIComponent(params.seccion)
  const nivelId = decodeURIComponent(params.nivel)
  const actividadId = decodeURIComponent(params.actividad)

  // Obtener información de la actividad según los parámetros
  const actividadInfo = getActividadInfo(seccionId, nivelId, actividadId)

  // Función para volver al nivel
  const handleBack = () => {
    router.push(`/misiones/${seccionId}/${nivelId}`)
  }

  // Función para completar la actividad
  const handleActivityComplete = (success: boolean, time: number, score: number) => {
    setIsCompleted(true)
    setActivitySuccess(success)
    setActivityTime(time)
    setActivityScore(score)

    // Guardar el progreso en localStorage
    const activityKey = `activity_${seccionId}_${nivelId}_${actividadId}`
    const activityData = {
      completed: success,
      time,
      score,
      date: new Date().toISOString(),
    }
    localStorage.setItem(activityKey, JSON.stringify(activityData))

    // Aquí se podría enviar una petición para guardar el progreso
    // Por ahora, solo simulamos un retraso
    setTimeout(() => {
      router.push(`/misiones/${seccionId}/${nivelId}`)
    }, 3000)
  }

  // Renderizar el componente de actividad según el ID
  const renderActivity = () => {
    // Sección 1: Explora tu lógica
    if (seccionId === "1") {
      // Nivel 1: Reconocimiento de patrones
      if (nivelId === "1") {
        if (actividadId === "1-1-1") {
          return <PatternRecognition onComplete={handleActivityComplete} />
        } else if (actividadId === "1-1-2") {
          return <ComplexPatterns onComplete={handleActivityComplete} />
        } else if (actividadId === "1-1-3") {
          return <PatternEvaluation onComplete={handleActivityComplete} />
        }
      }
    }

    // Si no hay coincidencia, mostrar mensaje de error
    return (
      <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800 text-center">
        <h2 className="text-xl font-bold mb-4">Actividad no encontrada</h2>
        <p className="text-gray-400">La actividad que buscas no está disponible.</p>
        <Button onClick={handleBack} className="mt-4">
          Volver al nivel
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      {/* Navbar */}
      <NavBar activePage="misiones" />

      {/* Header */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center gap-2 text-gray-400 mb-4">
          <button onClick={handleBack} className="hover:text-white transition-colors flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al nivel</span>
          </button>
          <span>/</span>
          <span>{actividadInfo.nivelTitle}</span>
          <span>/</span>
          <span className="text-white">{actividadInfo.title}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{actividadInfo.title}</h1>
            <p className="text-gray-400 mt-1">{actividadInfo.description}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-gray-300">{actividadInfo.duration} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="text-sm text-gray-300">{actividadInfo.points} pts</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {isCompleted ? (
          <div className="bg-[#1e2330] rounded-lg p-8 text-center border border-gray-800">
            <div
              className={cn(
                "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6",
                activitySuccess ? "bg-green-500/20 text-green-500" : "bg-yellow-500/20 text-yellow-500",
              )}
            >
              <CheckCircle className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              {activitySuccess ? "¡Actividad completada!" : "Actividad finalizada"}
            </h2>
            <p className="text-gray-300 mb-4 max-w-md mx-auto">
              {activitySuccess
                ? `¡Excelente trabajo! Has completado la actividad en ${activityTime} segundos.`
                : "Has completado la actividad, pero puedes mejorar tu puntuación."}
            </p>
            <div className="flex justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-sm text-gray-400">Puntuación</p>
                <p className="text-2xl font-bold text-green-400">{activityScore} / 5</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-400">Tiempo</p>
                <p className="text-2xl font-bold text-blue-400">{activityTime}s</p>
              </div>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleBack}>
              Volver al nivel
            </Button>
          </div>
        ) : (
          renderActivity()
        )}
      </div>
    </div>
  )
}

// Función para obtener la información de la actividad según los parámetros
function getActividadInfo(seccionId: string, nivelId: string, actividadId: string) {
  // Para la actividad de reconocimiento de patrones
  if (seccionId === "1" && nivelId === "1" && actividadId === "1-1-1") {
    return {
      nivelTitle: "Reconocimiento de patrones",
      title: "Observa y Reconoce",
      description: "Identifica patrones visuales y selecciona el siguiente elemento en la secuencia.",
      duration: 5,
      points: 50,
    }
  }

  // Para la actividad de patrones complejos
  if (seccionId === "1" && nivelId === "1" && actividadId === "1-1-2") {
    return {
      nivelTitle: "Reconocimiento de patrones",
      title: "Patrones Complejos",
      description: "Enfrenta patrones más complejos con múltiples variables y reglas.",
      duration: 10,
      points: 75,
    }
  }

  // Para la actividad de evaluación de patrones
  if (seccionId === "1" && nivelId === "1" && actividadId === "1-1-3") {
    return {
      nivelTitle: "Reconocimiento de patrones",
      title: "Evaluación de Patrones",
      description: "Pon a prueba tu comprensión de patrones identificando errores en secuencias.",
      duration: 15,
      points: 100,
    }
  }

  // Datos por defecto si no coincide con ninguna actividad específica
  return {
    nivelTitle: "Nivel",
    title: "Actividad",
    description: "Descripción de la actividad",
    duration: 0,
    points: 0,
  }
}

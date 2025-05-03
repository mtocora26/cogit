"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Clock, HelpCircle, Star, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import NavBar from "@/components/nav-bar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Tipos para las actividades
type ActivityType = "teoria" | "ejercicio" | "desafio" | "quiz"
type ActivityStatus = "completed" | "current" | "locked"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  status: ActivityStatus
  duration: number // en minutos
  points: number
}

export default function NivelPage({ params }: { params: { seccion: string; nivel: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"actividades" | "recursos" | "progreso">("actividades")
  const [activities, setActivities] = useState<Activity[]>([])
  const [progress, setProgress] = useState(0)
  const initialRenderRef = useRef(true)

  // Decodificar los parámetros de la URL
  const seccionId = decodeURIComponent(params.seccion)
  const nivelId = decodeURIComponent(params.nivel)

  // Obtener información del nivel según los parámetros
  const nivelInfo = getNivelInfo(seccionId, nivelId)

  // Cargar el progreso guardado
  useEffect(() => {
    // Solo ejecutar este efecto en el primer renderizado o cuando cambien los IDs
    if (initialRenderRef.current) {
      initialRenderRef.current = false

      // Inicializar actividades
      const updatedActivities = [...nivelInfo.activities]
      let completedCount = 0

      // Verificar el progreso guardado para cada actividad
      updatedActivities.forEach((activity, index) => {
        const activityKey = `activity_${seccionId}_${nivelId}_${activity.id}`
        const savedData = localStorage.getItem(activityKey)

        if (savedData) {
          const data = JSON.parse(savedData)
          if (data.completed) {
            updatedActivities[index].status = "completed"
            completedCount++
          }
        }
      })

      // Actualizar el estado de las actividades basado en el progreso
      // La primera actividad siempre está disponible
      if (updatedActivities.length > 0 && updatedActivities[0].status !== "completed") {
        updatedActivities[0].status = "current"
      }

      // Desbloquear la segunda actividad si la primera está completada
      if (updatedActivities.length > 1 && updatedActivities[0].status === "completed") {
        if (updatedActivities[1].status !== "completed") {
          updatedActivities[1].status = "current"
        }
      }

      // Desbloquear la tercera actividad si la segunda está completada
      if (updatedActivities.length > 2 && updatedActivities[1].status === "completed") {
        if (updatedActivities[2].status !== "completed") {
          updatedActivities[2].status = "current"
        }
      }

      // Calcular el progreso
      const calculatedProgress = Math.round((completedCount / updatedActivities.length) * 100)

      setActivities(updatedActivities)
      setProgress(calculatedProgress)
    }
  }, [seccionId, nivelId]) // Eliminamos nivelInfo.activities de las dependencias

  // Función para volver a la página de misiones
  const handleBack = () => {
    router.push("/misiones")
  }

  // Función para ir a una actividad específica
  const handleGoToActivity = (activityId: string, status: ActivityStatus) => {
    if (status !== "locked") {
      router.push(`/misiones/${seccionId}/${nivelId}/actividad/${activityId}`)
    }
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
            <span>Volver a Misiones</span>
          </button>
          <span>/</span>
          <span>{nivelInfo.seccionTitle}</span>
          <span>/</span>
          <span className="text-white">{nivelInfo.title}</span>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">{nivelInfo.title}</h1>
            <p className="text-gray-400 mt-1">{nivelInfo.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Progress
                value={progress}
                className="w-48 h-2 bg-gray-700"
                indicatorClassName="bg-gradient-to-r from-purple-600 to-blue-500"
              />
              <span className="text-sm text-gray-300">{progress}% completado</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-gray-300">{nivelInfo.duration} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                <span className="text-sm text-gray-300">{nivelInfo.totalPoints} pts</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="container mx-auto px-4 border-b border-gray-800">
        <div className="flex space-x-8">
          <button
            className={cn(
              "py-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === "actividades"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setActiveTab("actividades")}
          >
            Actividades
          </button>
          <button
            className={cn(
              "py-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === "recursos"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setActiveTab("recursos")}
          >
            Recursos
          </button>
          <button
            className={cn(
              "py-4 text-sm font-medium border-b-2 transition-colors",
              activeTab === "progreso"
                ? "border-purple-500 text-white"
                : "border-transparent text-gray-400 hover:text-gray-300",
            )}
            onClick={() => setActiveTab("progreso")}
          >
            Progreso
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "actividades" && (
          <div className="space-y-6">
            <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Actividades del nivel</h2>
              <p className="text-gray-300 mb-6">{nivelInfo.activityDescription}</p>

              <div className="space-y-4">
                {activities.length > 0
                  ? activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={cn(
                          "bg-[#1a1d23] rounded-lg border p-4 transition-all",
                          activity.status === "completed"
                            ? "border-green-500/30"
                            : activity.status === "current"
                              ? "border-blue-500/30"
                              : "border-gray-700 opacity-70",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                activity.type === "teoria"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : activity.type === "ejercicio"
                                    ? "bg-green-500/20 text-green-400"
                                    : activity.type === "desafio"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-purple-500/20 text-purple-400",
                              )}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{activity.title}</h3>
                              <p className="text-sm text-gray-400">{activity.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                              <div className="flex items-center gap-1 justify-end">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-400">{activity.duration} min</span>
                              </div>
                              <div className="flex items-center gap-1 justify-end">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-xs text-gray-400">{activity.points} pts</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleGoToActivity(activity.id, activity.status)}
                              disabled={activity.status === "locked"}
                              className={cn(
                                activity.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : activity.status === "current"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-700",
                              )}
                            >
                              {activity.status === "completed"
                                ? "Repasar"
                                : activity.status === "current"
                                  ? "Continuar"
                                  : "Bloqueado"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  : // Mostrar las actividades de nivelInfo si activities está vacío
                    nivelInfo.activities.map((activity) => (
                      <div
                        key={activity.id}
                        className={cn(
                          "bg-[#1a1d23] rounded-lg border p-4 transition-all",
                          activity.status === "completed"
                            ? "border-green-500/30"
                            : activity.status === "current"
                              ? "border-blue-500/30"
                              : "border-gray-700 opacity-70",
                        )}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center",
                                activity.type === "teoria"
                                  ? "bg-blue-500/20 text-blue-400"
                                  : activity.type === "ejercicio"
                                    ? "bg-green-500/20 text-green-400"
                                    : activity.type === "desafio"
                                      ? "bg-yellow-500/20 text-yellow-400"
                                      : "bg-purple-500/20 text-purple-400",
                              )}
                            >
                              {getActivityIcon(activity.type)}
                            </div>
                            <div>
                              <h3 className="font-medium">{activity.title}</h3>
                              <p className="text-sm text-gray-400">{activity.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right hidden md:block">
                              <div className="flex items-center gap-1 justify-end">
                                <Clock className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-400">{activity.duration} min</span>
                              </div>
                              <div className="flex items-center gap-1 justify-end">
                                <Star className="h-3 w-3 text-yellow-500" />
                                <span className="text-xs text-gray-400">{activity.points} pts</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              onClick={() => handleGoToActivity(activity.id, activity.status)}
                              disabled={activity.status === "locked"}
                              className={cn(
                                activity.status === "completed"
                                  ? "bg-green-600 hover:bg-green-700"
                                  : activity.status === "current"
                                    ? "bg-blue-600 hover:bg-blue-700"
                                    : "bg-gray-700",
                              )}
                            >
                              {activity.status === "completed"
                                ? "Repasar"
                                : activity.status === "current"
                                  ? "Continuar"
                                  : "Bloqueado"}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>

            {/* Próximo nivel */}
            <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Próximo nivel</h2>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{nivelInfo.nextLevel.title}</h3>
                  <p className="text-sm text-gray-400">{nivelInfo.nextLevel.description}</p>
                </div>
                <Button variant="outline" className="border-gray-700 text-gray-400" disabled={true}>
                  Completar nivel actual
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "recursos" && (
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Recursos adicionales</h2>
            <p className="text-gray-300 mb-6">
              Estos recursos te ayudarán a profundizar en los conceptos de este nivel.
            </p>

            <div className="space-y-4">
              {nivelInfo.recursos.map((recurso, index) => (
                <div key={index} className="bg-[#1a1d23] rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-500/20 text-blue-400 p-2 rounded-full">{recurso.icon}</div>
                    <div>
                      <h3 className="font-medium">{recurso.title}</h3>
                      <p className="text-sm text-gray-400">{recurso.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "progreso" && (
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Tu progreso en este nivel</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Estadísticas</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Actividades completadas</div>
                    <div className="text-2xl font-bold">
                      {activities.filter((a) => a.status === "completed").length || 0} /{" "}
                      {activities.length || nivelInfo.activities.length}
                    </div>
                  </div>
                  <div className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Tiempo invertido</div>
                    <div className="text-2xl font-bold">
                      {activities.length > 0
                        ? activities
                            .filter((a) => a.status === "completed")
                            .reduce((acc, curr) => acc + curr.duration, 0)
                        : 0}{" "}
                      min
                    </div>
                  </div>
                  <div className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700">
                    <div className="text-sm text-gray-400 mb-1">Puntos ganados</div>
                    <div className="text-2xl font-bold">
                      {activities.length > 0
                        ? activities.filter((a) => a.status === "completed").reduce((acc, curr) => acc + curr.points, 0)
                        : 0}{" "}
                      pts
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Logros desbloqueados</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {nivelInfo.logros.map((logro, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1d23] rounded-lg p-4 border border-gray-700 flex flex-col items-center text-center"
                    >
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${logro.color}`}>
                        {logro.icon}
                      </div>
                      <h4 className="font-medium">{logro.title}</h4>
                      <p className="text-xs text-gray-400 mt-1">{logro.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Función para obtener el icono según el tipo de actividad
function getActivityIcon(type: ActivityType) {
  switch (type) {
    case "teoria":
      return <HelpCircle className="h-5 w-5" />
    case "ejercicio":
      return <Star className="h-5 w-5" />
    case "desafio":
      return <Trophy className="h-5 w-5" />
    case "quiz":
      return <HelpCircle className="h-5 w-5" />
  }
}

// Función para obtener la información del nivel según los parámetros
function getNivelInfo(seccionId: string, nivelId: string) {
  // Sección 1: Explora tu lógica
  if (seccionId === "1") {
    // Nivel 1: Reconocimiento de patrones
    if (nivelId === "1") {
      return {
        seccionTitle: "Explora tu lógica",
        title: "Reconocimiento de patrones",
        description: "Aprende a identificar patrones y secuencias en diferentes contextos.",
        progress: 25,
        duration: 30, // minutos
        totalPoints: 150,
        activityDescription:
          "En este nivel aprenderás a identificar patrones visuales y secuencias lógicas. Desarrollarás tu capacidad de observación y análisis para reconocer regularidades en diferentes elementos.",
        activities: [
          {
            id: "1-1-1",
            type: "ejercicio",
            title: "Observa y Reconoce",
            description: "Identifica patrones visuales y selecciona el siguiente elemento en la secuencia.",
            status: "current",
            duration: 5,
            points: 50,
          },
          {
            id: "1-1-2",
            type: "desafio",
            title: "Patrones Complejos",
            description: "Enfrenta patrones más complejos con múltiples variables.",
            status: "locked",
            duration: 10,
            points: 75,
          },
          {
            id: "1-1-3",
            type: "quiz",
            title: "Evaluación de Patrones",
            description: "Pon a prueba tu comprensión de patrones con este cuestionario.",
            status: "locked",
            duration: 15,
            points: 100,
          },
        ],
        nextLevel: {
          title: "Clasificación de información",
          description: "Aprende a organizar y clasificar elementos según sus características.",
        },
        recursos: [
          {
            title: "Guía de patrones visuales",
            description: "Un documento con explicaciones sobre cómo identificar patrones visuales.",
            icon: <HelpCircle className="h-5 w-5" />,
            url: "#",
          },
          {
            title: "Video: Reconocimiento de patrones",
            description: "Un video tutorial sobre técnicas para reconocer patrones.",
            icon: <HelpCircle className="h-5 w-5" />,
            url: "#",
          },
        ],
        logros: [
          {
            title: "Observador",
            description: "Completaste tu primera actividad de reconocimiento de patrones",
            icon: <Star className="h-6 w-6 text-yellow-400" />,
            color: "bg-yellow-500/20 text-yellow-400",
          },
          {
            title: "Analista",
            description: "Identificaste correctamente 10 patrones diferentes",
            icon: <Trophy className="h-6 w-6 text-green-400" />,
            color: "bg-green-500/20 text-green-400",
          },
        ],
      }
    }
  }

  // Datos por defecto si no coincide con ningún nivel específico
  return {
    seccionTitle: "Sección",
    title: "Nivel no encontrado",
    description: "La información de este nivel no está disponible.",
    progress: 0,
    duration: 0,
    totalPoints: 0,
    activityDescription: "No hay actividades disponibles para este nivel.",
    activities: [],
    nextLevel: {
      title: "No disponible",
      description: "No hay información sobre el siguiente nivel.",
    },
    recursos: [],
    logros: [],
  }
}

"use client"

import { useState, useEffect, useRef, JSX } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Star, Trophy } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import NavBar from "@/components/nav-bar"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { use } from "react"
import { useLives } from "@/components/misiones/lives-context"

// Tipos para las actividades
type ActivityType = "teoria" | "ejercicio" | "desafio" | "quiz"
type ActivityStatus = "completed" | "current" | "locked"

interface Activity {
  id: string
  type: ActivityType
  title: string
  description: string
  status: ActivityStatus
  badge?: {
    text: string
    color: string
    icon: string
  }
  highlight?: boolean
}

// Definir un tipo más completo para nivelInfo
interface NivelInfo {
  seccionTitle: string;
  title: string;
  description: string;
  activityDescription: string;
  nextLevel: {
    title: string;
    description: string;
  };
  recursos: { id: string; name: string; url: string; icon: JSX.Element; description: string }[];
  activities: Activity[];
  logros: { title: string; description: string; icon: JSX.Element; color: string }[];
}

export default function NivelPage({ params }: { params: Promise<{ seccion: string; nivel: string }> }) {
  const { seccion, nivel } = use(params)
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"actividades" | "recursos" | "progreso">("actividades")
  const [activities, setActivities] = useState<Activity[]>([])
  const [progress, setProgress] = useState(0)
  const initialRenderRef = useRef(true)
  const { lives, isRecharging, rechargeTime } = useLives();
  const [showNoLives, setShowNoLives] = useState(false);

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

  // Decodificar los parámetros de la URL
  const seccionId = decodeURIComponent(seccion)
  const nivelId = decodeURIComponent(nivel)

  // Obtener información del nivel según los parámetros
  const nivelInfo: NivelInfo | null = getNivelInfo(seccionId, nivelId)

  if (!nivelInfo) {
    return (
      <div className="min-h-screen bg-[#1a1d23] text-white flex flex-col items-center justify-center">
        <NavBar activePage="misiones" />
        <div className="text-2xl font-bold mb-4">Nivel no encontrado</div>
        <p className="text-gray-400 mb-8">El nivel solicitado no existe o no está disponible.</p>
        <Button onClick={() => router.push('/misiones')}>Volver a Misiones</Button>
      </div>
    )
  }

  // Cargar el progreso guardado
  useEffect(() => {
    if (!nivelInfo) return;
    const activitiesArr = Array.isArray(nivelInfo.activities) ? nivelInfo.activities : [];
    let updatedActivities: Activity[] = activitiesArr.map((activity) => {
      let status: ActivityStatus = activity.status as ActivityStatus;
      // Si es admin, todo desbloqueado excepto los completados
      if (isAdmin && status !== "completed") {
        status = "current";
      }
      return {
        ...activity,
        type: activity.type as ActivityType,
        status,
      };
    });
    let completedCount = updatedActivities.filter((a) => a.status === "completed").length;
    // Lógica de desbloqueo de actividades (solo si no es admin)
    if (!isAdmin) {
      if (updatedActivities.length > 0 && updatedActivities[0].status !== "completed") {
        updatedActivities[0].status = "current"
      }
      if (updatedActivities.length > 1 && updatedActivities[0].status === "completed") {
        if (updatedActivities[1].status !== "completed") {
          updatedActivities[1].status = "current"
        }
      }
      if (updatedActivities.length > 2 && updatedActivities[1].status === "completed") {
        if (updatedActivities[2].status !== "completed") {
          updatedActivities[2].status = "current"
        }
      }
    }
    // Calcular el progreso
    const calculatedProgress = updatedActivities.length > 0 ? Math.round((completedCount / updatedActivities.length) * 100) : 0;
    setActivities(updatedActivities);
    setProgress(calculatedProgress)
  }, [seccionId, nivelId, isAdmin]); // Dependencias SIEMPRE del mismo tamaño y orden

  // Función para volver a la página de misiones
  const handleBack = () => {
    router.push("/misiones")
  }

  // En handleGoToActivity, bloquear si no hay vidas
  const handleGoToActivity = (activityId: string, status: ActivityStatus) => {
    if (lives === 0) {
      setShowNoLives(true);
      return;
    }
    if (status !== "locked") {
      // Normaliza los parámetros para que coincidan con los IDs de la ruta de actividad
      // Ejemplo: seccionId = "1", nivelId = "1", activityId = "1" => actividad = "1-1-1"
      const actividadParam = `${seccionId}-${nivelId}-${activityId}`;
      router.push(`/misiones/${seccionId}/${nivelId}/actividad/${actividadParam}`)
    }
  }

  // Mostrar panel si no hay vidas y actualizarlo si se recarga una vida y luego vuelve a 0
  useEffect(() => {
    if (lives === 0) setShowNoLives(true);
    else setShowNoLives(false);
  }, [lives, isRecharging, rechargeTime]);

  // Utilidad para formatear segundos a mm:ss
  function formatTimeMMSS(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-[#1a1d23] text-white">
      <NavBar activePage="misiones" />
      {/* Panel de bloqueo si no hay vidas */}
      {showNoLives && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#23263a] rounded-2xl p-8 shadow-2xl flex flex-col items-center max-w-xs w-full border-2 border-purple-600 animate-pop">
            <h2 className="text-2xl font-bold text-purple-400 mb-2">¡Sin vidas!</h2>
            <p className="text-gray-200 mb-4 text-center">No tienes vidas para seguir jugando misiones.<br />
              {isRecharging
                ? `Recuperarás una vida en ${formatTimeMMSS(rechargeTime)}.`
                : "Debes esperar la recarga automática o recargar en la tienda."}
            </p>
            <div className="flex flex-col gap-2 w-full">
              <Button className="bg-yellow-400 text-black font-bold hover:bg-yellow-300" onClick={() => { window.location.href = "/tienda" }}>Ir a la Tienda</Button>
              <Button className="bg-blue-600 text-white font-bold hover:bg-blue-700" onClick={() => { window.location.href = "/minijuegos" }}>Ir a Minijuegos</Button>
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
          {/* Eliminar pestaña Recursos para todos los niveles */}
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
          <div className={`space-y-6 ${lives === 0 ? "pointer-events-none opacity-50 select-none" : ""}`}>
            <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-4">Actividades del nivel</h2>
              <p className="text-gray-300 mb-6">{nivelInfo.activityDescription}</p>

              <div className="space-y-4">
                {activities.length > 0 && activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={cn(
                      "bg-[#1d23] rounded-lg border p-4 transition-all relative overflow-hidden group",
                      activity.status === "completed"
                        ? "border-green-500/30"
                        : activity.status === "current"
                          ? "border-blue-500/30"
                          : "border-gray-700 opacity-70",
                      activity.highlight && "hover:scale-[1.03] hover:shadow-2xl hover:bg-gradient-to-r hover:from-yellow-400 hover:via-pink-500 hover:to-purple-500 focus-within:scale-[1.03] focus-within:shadow-2xl focus-within:bg-gradient-to-r focus-within:from-yellow-400 focus-within:via-pink-500 focus-within:to-purple-500 animate-pop"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                            activity.type === "teoria"
                              ? "bg-blue-500/20 text-blue-400"
                              : activity.type === "ejercicio"
                                ? "bg-green-500/20 text-green-400"
                                : activity.type === "desafio"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-purple-500/20 text-purple-400",
                            activity.highlight && "group-hover:ring-4 group-hover:ring-pink-400/30 group-hover:animate-bounce group-focus:ring-4 group-focus:ring-pink-400/30 group-focus:animate-bounce"
                          )}
                        >
                          {activity.type === "desafio" && activity.highlight ? <Star className="h-6 w-6 text-yellow-400 drop-shadow-lg" /> : getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <h3 className={cn("font-medium transition-all duration-300", activity.highlight && "group-hover:text-white group-hover:drop-shadow-lg group-hover:animate-pulse group-focus:text-white group-focus:drop-shadow-lg group-focus:animate-pulse")}>{activity.title}</h3>
                          <p className={cn("text-sm text-gray-400 transition-all duration-300", activity.highlight && "group-hover:text-white/90 group-focus:text-white/90")}>{activity.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
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
                            activity.highlight && "group-hover:shadow-lg group-hover:scale-105 group-focus:shadow-lg group-focus:scale-105 animate-pop"
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
                    {activity.badge && (
                      <div className={`mt-2 text-xs font-semibold text-white bg-gradient-to-r ${activity.badge.color} p-1 rounded-full inline-flex items-center shadow-lg animate-bounce`}> <span className="mr-1">✨</span> {activity.badge.text} </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Próximo nivel */}
            {nivelId === "1" && (
              <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
                <h2 className="text-xl font-bold mb-4">Próximo nivel</h2>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Secuencias y Algoritmos Básicos</h3>
                    <p className="text-sm text-gray-400">Aprende a ordenar pasos y construir instrucciones lógicas para resolver problemas cotidianos y retos de programación básica.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-gray-700 text-gray-400"
                    disabled={!isAdmin}
                    onClick={() => {
                      if (isAdmin) router.push("/misiones/1/2");
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
          <div className="bg-[#1e2330] rounded-lg border border-gray-800 p-6">
            <h2 className="text-xl font-bold mb-4">Progreso del nivel</h2>
            <p className="text-gray-400 mb-6">Aquí puedes ver tu progreso en las actividades de este nivel.</p>

            {/* Contenido de progreso (puede ser un gráfico, lista de actividades completadas, etc.) */}
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className={cn(
                      "bg-[#1d23] rounded-lg border p-4 transition-all",
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
              ) : (
                <p className="text-gray-400 text-center py-4">No hay actividades disponibles para mostrar el progreso.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// --- CORRECCIÓN: Permitir que nivel 2 se muestre para ambas secciones ---
function getNivelInfo(seccion: string, nivel: string): NivelInfo | null {
  // Mapas robustos para evitar errores de coincidencia
  const seccionMap: Record<string, string> = {
    "1": "Introducción",
    "introduccion": "Introducción",
    "2": "Estructuras",
    "estructuras": "Estructuras",
  };
  const nivelMap: Record<string, string> = {
    "1": "Nivel 1: Patrones y Lógica",
    "nivel 1": "Nivel 1: Patrones y Lógica",
    "2": "Nivel 2: Secuencias y Algoritmos Básicos",
    "nivel 2": "Nivel 2: Secuencias y Algoritmos Básicos",
  };
  const seccionId = decodeURIComponent(seccion).toLowerCase();
  const nivelId = decodeURIComponent(nivel).toLowerCase();
  const seccionTitle = seccionMap[seccionId] || seccionId;
  const nivelTitle = nivelMap[nivelId] || nivelId;

  // Datos restaurados para nivel 1 y nivel 2 (puedes agregar más niveles aquí)
  const data: NivelInfo[] = [
    {
      seccionTitle: "Introducción",
      title: "Nivel 1: Patrones y Lógica",
      description: "Desarrolla tu capacidad para reconocer, crear y completar patrones visuales y lógicos. Este nivel sienta las bases del pensamiento lógico y la resolución de problemas.",
      activityDescription: "En este nivel trabajarás con actividades de reconocimiento de patrones, identificación del elemento intruso y creación de tus propios patrones. ¡Pon a prueba tu lógica y creatividad!",
      nextLevel: {
        title: "Nivel 2: Secuencias y Algoritmos Básicos",
        description: "Aprende a ordenar pasos y construir instrucciones lógicas para resolver problemas cotidianos y retos de programación básica.",
      },
      recursos: [
        {
          id: "1",
          name: "¿Qué es un patrón?",
          url: "https://es.wikipedia.org/wiki/Patr%C3%B3n_(matem%C3%A1ticas)",
          icon: <HelpCircle className="h-4 w-4" />,
          description: "Breve introducción a los patrones en matemáticas y lógica.",
        },
        {
          id: "2",
          name: "Ejercicios de patrones visuales",
          url: "https://www.mundoprimaria.com/juegos-educativos/juegos-de-patrones",
          icon: <Trophy className="h-4 w-4" />,
          description: "Practica con juegos interactivos para reconocer patrones.",
        },
      ],
      activities: [
        {
          id: "1",
          type: "teoria",
          title: "Reconociendo patrones",
          description: "Aprende a identificar patrones en secuencias de figuras, colores o números.",
          status: "completed",
        },
        {
          id: "2",
          type: "ejercicio",
          title: "Encuentra el intruso",
          description: "Observa una serie de elementos y detecta cuál no sigue el patrón.",
          status: "current",
        },
        {
          id: "3",
          type: "ejercicio",
          title: "Completa la secuencia",
          description: "Elige el elemento que continúa correctamente la secuencia lógica o visual.",
          status: "locked",
        }
      ],
      logros: [
        {
          title: "Cazador de patrones",
          description: "Reconoce correctamente 3 patrones diferentes.",
          icon: <Trophy className="h-4 w-4" />,
          color: "bg-gradient-to-r from-green-400 to-blue-500",
        },
        {
          title: "Maestro creativo",
          description: "Crea y comparte tu propio patrón.",
          icon: <Star className="h-4 w-4" />,
          color: "bg-gradient-to-r from-pink-400 to-purple-500",
        },
      ],
    },
    {
      seccionTitle: "Estructuras",
      title: "Nivel 2: Secuencias y Algoritmos Básicos",
      description: "Aprende a ordenar pasos y construir instrucciones lógicas para resolver problemas cotidianos y retos de programación básica.",
      activityDescription: "En este nivel, aprenderás sobre secuencias, instrucciones paso a paso y la lógica detrás de los algoritmos básicos.",
      nextLevel: {
        title: "Nivel 3: Algoritmos",
        description: "Descubre los algoritmos más comunes y su implementación.",
      },
      recursos: [
        {
          id: "1",
          name: "¿Qué es un algoritmo?",
          url: "https://es.wikipedia.org/wiki/Algoritmo",
          icon: <HelpCircle className="h-4 w-4" />,
          description: "Concepto básico de algoritmo y ejemplos cotidianos.",
        },
        {
          id: "2",
          name: "Juegos de secuencias",
          url: "https://www.mundoprimaria.com/juegos-educativos/juegos-de-secuencias",
          icon: <Trophy className="h-4 w-4" />,
          description: "Practica la lógica de secuencias con juegos interactivos.",
        },
      ],
      activities: [
        {
          id: "1",
          type: "teoria",
          title: "¿Qué es una secuencia?",
          description: "Descubre cómo se construyen las secuencias y su importancia en la resolución de problemas.",
          status: "locked",
        },
        {
          id: "2",
          type: "ejercicio",
          title: "Ordena los pasos",
          description: "Coloca en orden correcto los pasos para resolver un problema sencillo.",
          status: "locked",
        },
        {
          id: "3",
          type: "desafio",
          title: "Desafío de instrucciones",
          description: "Crea un conjunto de instrucciones para que otro usuario resuelva un reto.",
          status: "locked",
          badge: {
            text: "Lógico",
            color: "from-yellow-400 to-blue-500",
            icon: "star",
          },
        },
      ],
      logros: [
        {
          title: "Secuenciador",
          description: "Completa una actividad de secuencias.",
          icon: <Trophy className="h-4 w-4" />,
          color: "bg-gradient-to-r from-green-400 to-blue-500",
        },
        {
          title: "Lógico",
          description: "Supera un desafío de instrucciones.",
          icon: <Star className="h-4 w-4" />,
          color: "bg-gradient-to-r from-yellow-400 to-blue-500",
        },
      ],
    },
    // ...puedes agregar más niveles aquí...
  ];

  // Buscar el nivel por título, sin exigir coincidencia exacta de sección
  return data.find((nivelInfo) => nivelInfo.title.toLowerCase() === nivelTitle.toLowerCase()) || null;
}

// Función para obtener el ícono de la actividad (robusta y sin errores)
function getActivityIcon(type: ActivityType) {
  if (type === "teoria") return <HelpCircle className="h-5 w-5" />;
  if (type === "ejercicio") return <Trophy className="h-5 w-5" />;
  if (type === "desafio") return <Star className="h-5 w-5" />;
  return <HelpCircle className="h-5 w-5 text-gray-500" />; // fallback seguro
}

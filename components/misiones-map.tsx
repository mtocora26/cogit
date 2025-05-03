"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Lock, Zap, Star, Brain, Code, Database, Layers, Search, GitBranch, Puzzle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

// Definición de tipos
type NodeStatus = "completed" | "current" | "locked"
type NodeType = "basic" | "challenge" | "project" | "quiz"

interface Node {
  id: number
  x: number
  y: number
  status: NodeStatus
  type: NodeType
  title: string
  description: string
  icon: string
  section: number
  level: number
}

interface Connection {
  from: number
  to: number
  isAlternative?: boolean
}

interface Section {
  id: number
  title: string
  subtitle: string
  color: string
  completed: boolean
  progress: number
}

export default function MisionesMap() {
  // Estado para manejar el tamaño del contenedor
  const [dimensions, setDimensions] = useState({ width: 1000, height: 600 })
  const [hoveredNode, setHoveredNode] = useState<number | null>(null)
  const [showBlockedMessage, setShowBlockedMessage] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeSection, setActiveSection] = useState<number>(1)
  const router = useRouter()

  // Secciones de aprendizaje
  const sections: Section[] = [
    {
      id: 1,
      title: "Explora tu lógica",
      subtitle: "Fundamentos",
      color: "from-blue-500 to-purple-500",
      completed: false,
      progress: 40,
    },
    {
      id: 2,
      title: "Algoritmos en acción",
      subtitle: "Estructuras de control",
      color: "from-green-500 to-teal-500",
      completed: false,
      progress: 0,
    },
    {
      id: 3,
      title: "Construye soluciones",
      subtitle: "Proyectos integrados",
      color: "from-orange-500 to-red-500",
      completed: false,
      progress: 0,
    },
  ]

  // Nodos del mapa (misiones)
  const nodes: Node[] = [
    // Sección 1: Explora tu lógica (Fundamentos)
    {
      id: 1,
      x: 10,
      y: 30,
      status: "completed",
      type: "basic",
      title: "Reconocimiento de patrones",
      description: "Aprende a identificar patrones y secuencias en diferentes contextos.",
      icon: "Search",
      section: 1,
      level: 1,
    },
    {
      id: 2,
      x: 25,
      y: 20,
      status: "completed",
      type: "challenge",
      title: "Desafío: Patrones visuales",
      description: "Identifica y completa patrones visuales con diferentes formas y colores.",
      icon: "Puzzle",
      section: 1,
      level: 2,
    },
    {
      id: 3,
      x: 40,
      y: 30,
      status: "completed",
      type: "basic",
      title: "Descomposición de problemas",
      description: "Aprende a dividir problemas complejos en partes más pequeñas y manejables.",
      icon: "GitBranch",
      section: 1,
      level: 3,
    },
    {
      id: 4,
      x: 55,
      y: 20,
      status: "current",
      type: "challenge",
      title: "Desafío: Secuencias lógicas",
      description: "Ordena instrucciones para completar tareas siguiendo una secuencia lógica.",
      icon: "Layers",
      section: 1,
      level: 4,
    },
    {
      id: 5,
      x: 70,
      y: 30,
      status: "locked",
      type: "basic",
      title: "Clasificación y agrupamiento",
      description: "Aprende a organizar elementos según sus características comunes.",
      icon: "Database",
      section: 1,
      level: 5,
    },
    {
      id: 6,
      x: 85,
      y: 20,
      status: "locked",
      type: "project",
      title: "Proyecto: Detector de errores",
      description: "Encuentra y corrige errores en secuencias lógicas aplicando todo lo aprendido.",
      icon: "Code",
      section: 1,
      level: 6,
    },

    // Sección 2: Algoritmos en acción (placeholder para mostrar estructura)
    {
      id: 7,
      x: 10,
      y: 30,
      status: "locked",
      type: "basic",
      title: "Introducción a algoritmos",
      description: "Aprende qué son los algoritmos y cómo se utilizan para resolver problemas.",
      icon: "Code",
      section: 2,
      level: 1,
    },
    {
      id: 8,
      x: 25,
      y: 20,
      status: "locked",
      type: "challenge",
      title: "Desafío: Algoritmos simples",
      description: "Crea algoritmos sencillos para resolver problemas cotidianos.",
      icon: "Puzzle",
      section: 2,
      level: 2,
    },

    // Sección 3: Construye soluciones (placeholder para mostrar estructura)
    {
      id: 9,
      x: 10,
      y: 30,
      status: "locked",
      type: "basic",
      title: "Diseño de soluciones",
      description: "Aprende a diseñar soluciones completas para problemas complejos.",
      icon: "Brain",
      section: 3,
      level: 1,
    },
  ]

  // Conexiones entre nodos
  const connections: Connection[] = [
    // Sección 1: Explora tu lógica
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
    { from: 5, to: 6 },

    // Sección 2: Algoritmos en acción
    { from: 7, to: 8 },
  ]

  // Actualizar dimensiones al cambiar el tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: Math.max(400, container.clientWidth * 0.35),
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Función para obtener el color del nodo según su tipo y estado
  const getNodeColor = (type: NodeType, status: NodeStatus, isHovered: boolean) => {
    if (status === "locked") {
      return isHovered ? "from-gray-500 to-gray-700 border-gray-400" : "from-gray-600 to-gray-800 border-gray-500"
    }

    switch (type) {
      case "basic":
        return isHovered
          ? "from-blue-400 to-indigo-600 border-blue-300 shadow-[0_0_15px_rgba(59,130,246,0.7)]"
          : "from-blue-500 to-indigo-700 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      case "challenge":
        return isHovered
          ? "from-yellow-400 to-amber-600 border-yellow-300 shadow-[0_0_15px_rgba(245,158,11,0.7)]"
          : "from-yellow-500 to-amber-700 border-yellow-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
      case "quiz":
        return isHovered
          ? "from-purple-400 to-violet-600 border-purple-300 shadow-[0_0_15px_rgba(139,92,246,0.7)]"
          : "from-purple-500 to-violet-700 border-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.5)]"
      case "project":
        return isHovered
          ? "from-green-400 to-emerald-600 border-green-300 shadow-[0_0_15px_rgba(16,185,129,0.7)]"
          : "from-green-500 to-emerald-700 border-green-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
    }
  }

  // Función para obtener el icono del nodo
  const getNodeIcon = (iconName: string, status: NodeStatus) => {
    const iconProps = { className: status === "locked" ? "h-5 w-5 text-gray-400" : "h-5 w-5 text-white" }

    switch (iconName) {
      case "Brain":
        return <Brain {...iconProps} />
      case "Zap":
        return <Zap {...iconProps} />
      case "Code":
        return <Code {...iconProps} />
      case "Database":
        return <Database {...iconProps} />
      case "Layers":
        return <Layers {...iconProps} />
      case "Search":
        return <Search {...iconProps} />
      case "GitBranch":
        return <GitBranch {...iconProps} />
      case "Puzzle":
        return <Puzzle {...iconProps} />
      default:
        return <Star {...iconProps} />
    }
  }

  // Función para obtener el icono de estado
  const getStatusIcon = (status: NodeStatus) => {
    switch (status) {
      case "completed":
        return <Check className="h-4 w-4 text-white" />
      case "current":
        return <Zap className="h-4 w-4 text-white" />
      case "locked":
        return <Lock className="h-4 w-4 text-gray-400" />
    }
  }

  // Modificar la función handleLockedNodeClick para incluir la navegación a los niveles no bloqueados
  const handleNodeClick = (node: Node) => {
    if (node.status === "locked") {
      setShowBlockedMessage(node.id)
      setTimeout(() => setShowBlockedMessage(null), 3000) // Ocultar después de 3 segundos
    } else {
      // Navegar al nivel correspondiente
      router.push(`/misiones/${node.section}/${node.level}`)
    }
  }

  // Filtrar nodos por sección activa
  const filteredNodes = nodes.filter((node) => node.section === activeSection)
  const visibleConnections = connections.filter(
    (conn) =>
      nodes.find((n) => n.id === conn.from)?.section === activeSection &&
      nodes.find((n) => n.id === conn.to)?.section === activeSection,
  )

  return (
    <div className="space-y-4">
      {/* Selector de secciones */}
      <div className="flex flex-wrap gap-3 justify-center">
        {sections.map((section) => (
          <motion.button
            key={section.id}
            className={cn(
              "px-4 py-2 rounded-full text-white font-medium text-sm transition-all relative",
              activeSection === section.id ? "bg-gradient-to-r shadow-lg scale-105" : "bg-gray-700 hover:bg-gray-600",
            )}
            style={{
              backgroundImage:
                activeSection === section.id
                  ? `linear-gradient(to right, ${section.color.split(" ")[1]}, ${section.color.split(" ")[3]})`
                  : undefined,
            }}
            onClick={() => setActiveSection(section.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex flex-col items-center">
              <span>{section.title}</span>
              <span className="text-xs opacity-80">{section.subtitle}</span>
            </div>
            {section.completed && (
              <span className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5">
                <Check className="h-3 w-3 text-white" />
              </span>
            )}
            {section.progress > 0 && !section.completed && (
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gray-600 rounded-full overflow-hidden">
                <span
                  className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                  style={{ width: `${section.progress}%` }}
                ></span>
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Mapa de misiones */}
      <div
        ref={containerRef}
        className="w-full relative bg-[#1a1d23]/50 rounded-xl border border-gray-800 p-4 overflow-hidden"
        style={{ height: `${dimensions.height}px` }}
      >
        {/* Líneas de conexión */}
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <linearGradient id="completedPath" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {visibleConnections.map((connection) => {
            const fromNode = nodes.find((n) => n.id === connection.from)!
            const toNode = nodes.find((n) => n.id === connection.to)!

            const fromX = (fromNode.x / 100) * dimensions.width
            const fromY = (fromNode.y / 100) * dimensions.height
            const toX = (toNode.x / 100) * dimensions.width
            const toY = (toNode.y / 100) * dimensions.height

            // Calcular punto de control para curva
            const midX = (fromX + toX) / 2
            const midY = (fromY + toY) / 2
            const controlX = midX
            const controlY = midY - 20 // Ajustar para crear una curva suave

            // Determinar estilo de la conexión
            const isActive = fromNode.status !== "locked" && toNode.status !== "locked"
            const isCompleted = fromNode.status === "completed" && toNode.status === "completed"

            return (
              <g key={`${connection.from}-${connection.to}`}>
                <path
                  d={`M ${fromX} ${fromY} Q ${controlX} ${controlY} ${toX} ${toY}`}
                  className={cn(
                    "transition-all duration-300",
                    isActive
                      ? isCompleted
                        ? "stroke-[url(#completedPath)] stroke-[4]"
                        : "stroke-blue-500 stroke-[3]"
                      : "stroke-gray-700 stroke-[2]",
                  )}
                  fill="none"
                  strokeLinecap="round"
                  strokeDasharray={!isActive ? "5,5" : "none"}
                  filter={isCompleted ? "url(#glow)" : "none"}
                />
              </g>
            )
          })}
        </svg>

        {/* Nodos (misiones) */}
        {filteredNodes.map((node) => {
          const nodeX = (node.x / 100) * dimensions.width
          const nodeY = (node.y / 100) * dimensions.height
          const isHovered = hoveredNode === node.id
          const nodeClass = getNodeColor(node.type, node.status, isHovered)

          return (
            <motion.div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                left: `${nodeX}px`,
                top: `${nodeY}px`,
                zIndex: isHovered ? 10 : 1,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: node.id * 0.1 }}
              whileHover={{ scale: 1.1 }}
            >
              {/* Nodo principal (círculo) */}
              <motion.div
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br border-2",
                  nodeClass,
                  "transition-all duration-300",
                )}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => handleNodeClick(node)}
                animate={
                  node.status === "current"
                    ? {
                        boxShadow: [
                          "0 0 10px rgba(59,130,246,0.5)",
                          "0 0 20px rgba(59,130,246,0.7)",
                          "0 0 10px rgba(59,130,246,0.5)",
                        ],
                        transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                      }
                    : {}
                }
              >
                {getNodeIcon(node.icon, node.status)}
              </motion.div>

              {/* Indicador de estado */}
              <div
                className={cn(
                  "absolute -top-1 -right-1 rounded-full p-1",
                  node.status === "completed"
                    ? "bg-green-500"
                    : node.status === "current"
                      ? "bg-blue-500"
                      : "bg-gray-600",
                )}
              >
                {getStatusIcon(node.status)}
              </div>

              {/* Número de nivel */}
              <div className="absolute -top-1 -left-1 bg-gray-800 rounded-full w-5 h-5 flex items-center justify-center">
                <span className="text-xs font-bold">{node.level}</span>
              </div>

              {/* Título del nodo */}
              <div
                className={cn(
                  "absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-center whitespace-nowrap",
                  node.status === "locked" ? "text-gray-500" : "text-gray-300",
                )}
              >
                <span className="text-xs font-medium">{node.title}</span>
              </div>

              {/* Tooltip */}
              {isHovered && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-4 w-64 z-20 pointer-events-none"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="bg-gray-900/90 backdrop-blur-sm text-white rounded-lg p-3 shadow-lg border border-gray-700">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={cn(
                          "w-6 h-6 rounded-full flex items-center justify-center",
                          node.type === "basic"
                            ? "bg-blue-500"
                            : node.type === "challenge"
                              ? "bg-yellow-500"
                              : node.type === "quiz"
                                ? "bg-purple-500"
                                : "bg-green-500",
                        )}
                      >
                        {getNodeIcon(node.icon, "completed")}
                      </div>
                      <h3 className="font-bold text-sm">{node.title}</h3>
                    </div>
                    <p className="text-xs text-gray-300">{node.description}</p>
                    {node.status === "current" && (
                      <div className="mt-2 bg-blue-900/50 p-1 rounded text-xs text-center">
                        ¡Nivel actual! Haz clic para continuar
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Mensaje de nivel bloqueado */}
              {showBlockedMessage === node.id && node.status === "locked" && (
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-4 w-64 z-30 pointer-events-none"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="bg-red-900/80 text-white rounded-lg p-3 shadow-lg border border-red-700">
                    <p className="text-xs text-center">Debes completar el nivel anterior para desbloquear este.</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Leyenda */}
      <div className="flex flex-wrap gap-6 justify-center mt-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"></div>
          <span className="text-sm">Lección</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-yellow-500 to-amber-700"></div>
          <span className="text-sm">Desafío</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-purple-500 to-violet-700"></div>
          <span className="text-sm">Quiz</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-700"></div>
          <span className="text-sm">Proyecto</span>
        </div>
      </div>
    </div>
  )
}

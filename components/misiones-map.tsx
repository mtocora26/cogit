"use client"

import { useState, useEffect, useRef } from "react"
import { Check, Lock, Zap, Star, Brain, Code, Database, Layers, Search, GitBranch, Puzzle } from "lucide-react"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import LivesIndicator from "@/components/misiones/lives-indicator"

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
      title: "Secuencias y Series",
      description: "Descubre cómo se forman las secuencias y series, y resuelve desafíos para encontrar el siguiente elemento.",
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
      title: "Lógica de Secuencias",
      description: "Pon a prueba tu lógica completando secuencias y deduciendo reglas ocultas detrás de los patrones.",
      icon: "GitBranch",
      section: 1,
      level: 3,
    },
  ]

  // Conexiones entre nodos
  const connections: Connection[] = [
    { from: 1, to: 2 },
    { from: 2, to: 3 },
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
    <div className="relative w-full h-full">
      <div className="space-y-4 relative">
        {/* Fondo decorativo */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#232946] via-[#1a1d23] to-[#3b2f63] opacity-80 blur-sm" />
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

        {/* Mapa de misiones centrado */}
        <div
          ref={containerRef}
          className="w-full flex items-center justify-center relative bg-[#1a1d23]/70 rounded-2xl border border-gray-800 p-8 shadow-2xl overflow-hidden min-h-[500px]"
          style={{ height: `${dimensions.height}px` }}
        >
          <div className="relative mx-auto" style={{ width: Math.min(dimensions.width, 600), height: Math.max(400, Math.min(dimensions.height, 400)) }}>
            {/* Líneas de conexión */}
            <svg width="100%" height="100%" className="absolute inset-0 pointer-events-none">
              <defs>
                <linearGradient id="completedPath" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
                <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {visibleConnections.map((connection) => {
                const fromNode = nodes.find((n) => n.id === connection.from)!
                const toNode = nodes.find((n) => n.id === connection.to)!

                // Centramos el mapa en el SVG
                const svgW = Math.min(dimensions.width, 600)
                const svgH = Math.max(400, Math.min(dimensions.height, 400))
                const fromX = (fromNode.x / 60) * svgW // 60 en vez de 100 para centrar
                const fromY = (fromNode.y / 60) * svgH // 60 en vez de 100 para centrar
                const toX = (toNode.x / 60) * svgW
                const toY = (toNode.y / 60) * svgH

                // Calcular punto de control para curva
                const midX = (fromX + toX) / 2
                const midY = (fromY + toY) / 2
                const controlX = midX
                const controlY = midY - 30

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
                            ? "stroke-[url(#completedPath)] stroke-[6]"
                            : "stroke-blue-400 stroke-[4]"
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
              // Centramos el mapa en el SVG
              const svgW = Math.min(dimensions.width, 600)
              const svgH = Math.max(400, Math.min(dimensions.height, 400))
              const nodeX = (node.x / 60) * svgW
              const nodeY = (node.y / 60) * svgH
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
                  whileHover={{ scale: 1.13 }}
                >
                  {/* Nodo principal (círculo) */}
                  <motion.div
                    className={cn(
                      "w-20 h-20 rounded-full flex items-center justify-center cursor-pointer bg-gradient-to-br border-4",
                      nodeClass,
                      "transition-all duration-300 relative",
                      node.status === "current" ? "ring-4 ring-blue-400/60 animate-pulse" : ""
                    )}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    onClick={() => handleNodeClick(node)}
                    animate={
                      node.status === "current"
                        ? {
                            boxShadow: [
                              "0 0 30px 10px #6366f1cc",
                              "0 0 40px 20px #818cf8cc",
                              "0 0 30px 10px #6366f1cc",
                            ],
                            transition: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                          }
                        : {}
                    }
                  >
                    <div className="drop-shadow-[0_4px_16px_rgba(59,130,246,0.7)]">
                      {getNodeIcon(node.icon, node.status)}
                    </div>
                  </motion.div>

                  {/* Indicador de estado */}
                  <div
                    className={cn(
                      "absolute -top-2 -right-2 rounded-full p-1 border-2 border-[#1a1d23]",
                      node.status === "completed"
                        ? "bg-green-500"
                        : node.status === "current"
                          ? "bg-blue-500"
                          : "bg-gray-600",
                    )}
                  >
                    {getStatusIcon(node.status)}
                  </div>

                  {/* Título del nodo SIEMPRE visible */}
                  <div
                    className={cn(
                      "absolute left-1/2 top-full mt-2 -translate-x-1/2 text-center whitespace-nowrap font-semibold",
                      node.status === "locked" ? "text-gray-500" : "text-blue-100 drop-shadow",
                    )}
                  >
                    <span className="text-base">{node.title}</span>
                  </div>

                  {/* Tooltip con flecha */}
                  {isHovered && (
                    <motion.div
                      className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full -top-8 w-72 z-20 pointer-events-none"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="relative">
                        <div className="bg-gray-900/95 backdrop-blur-sm text-white rounded-xl p-4 shadow-2xl border border-blue-700">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center",
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
                            <h3 className="font-bold text-lg">{node.title}</h3>
                          </div>
                          <p className="text-sm text-gray-300">{node.description}</p>
                          {node.status === "current" && (
                            <div className="mt-3 bg-blue-900/60 p-2 rounded text-sm text-center">
                              ¡Nivel actual! Haz clic para continuar
                            </div>
                          )}
                        </div>
                        {/* Flecha del tooltip */}
                        <div className="absolute left-1/2 -bottom-3 -translate-x-1/2 w-6 h-6 overflow-visible">
                          <svg width="24" height="12" viewBox="0 0 24 12">
                            <polygon points="12,12 0,0 24,0" fill="#1e293b" />
                          </svg>
                        </div>
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
        </div>

        {/* Leyenda compacta con iconos */}
        {/* Leyenda eliminada para limpiar la UI */}
      </div>
    </div>
  )
}

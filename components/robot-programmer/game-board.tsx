"use client"

import { useEffect, useRef, useState } from "react"

interface GameBoardProps {
  board: number[][]
  robotPosition: { x: number; y: number; direction: number }
  targetCells: { x: number; y: number }[]
  litCells: { x: number; y: number }[]
  robot3D?: boolean
  compact?: boolean // Nuevo prop para modo compacto
}

export default function GameBoard({ board, robotPosition, targetCells, litCells, robot3D, compact = false }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  // Animación flash para celdas recién encendidas
  const [lastLit, setLastLit] = useState<{ x: number; y: number } | null>(null)
  useEffect(() => {
    if (litCells.length > 0) {
      setLastLit(litCells[litCells.length - 1])
      const t = setTimeout(() => setLastLit(null), 400)
      return () => clearTimeout(t)
    }
  }, [litCells])

  // Dibujar el tablero cuando cambian las props
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Tamaño más grande y responsivo
    const cellSize = Math.min(canvas.width / board[0].length, canvas.height / board.length)
    const offsetX = (canvas.width - cellSize * board[0].length) / 2
    const offsetY = (canvas.height - cellSize * board.length) / 2

    // Fondo con gradiente sutil
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, "#23283a")
    gradient.addColorStop(1, "#1a1d23")
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar el tablero
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const cellX = offsetX + x * cellSize
        const cellY = offsetY + y * cellSize

        // Obstáculo
        if (board[y][x] === 1) {
          ctx.fillStyle = "#2a3142"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)
          ctx.strokeStyle = "#3b4252"
          ctx.lineWidth = 2
          ctx.strokeRect(cellX, cellY, cellSize, cellSize)
        } else {
          // Celda normal
          ctx.save()
          ctx.shadowColor = "#818cf8aa"
          ctx.shadowBlur = 8
          ctx.fillStyle = "#23283a"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)
          ctx.restore()
          // Borde
          ctx.strokeStyle = "#2a3142"
          ctx.lineWidth = 1.5
          ctx.strokeRect(cellX, cellY, cellSize, cellSize)
        }

        // Celda objetivo con glow y SVG
        const isTarget = targetCells.some((cell) => cell.x === x && cell.y === y)
        if (isTarget) {
          ctx.save()
          ctx.shadowColor = "#a855f7"
          ctx.shadowBlur = 18
          ctx.fillStyle = "rgba(168, 85, 247, 0.18)"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)
          ctx.restore()
          // Dibujar icono SVG (estrella) en el centro
          const iconSize = cellSize * 0.45
          const cx = cellX + cellSize / 2
          const cy = cellY + cellSize / 2
          ctx.save()
          ctx.translate(cx, cy)
          ctx.scale(iconSize / 24, iconSize / 24)
          ctx.beginPath()
          ctx.moveTo(12,2)
          ctx.lineTo(15,9)
          ctx.lineTo(22.5,9.5)
          ctx.lineTo(16.5,14.5)
          ctx.lineTo(18.5,22)
          ctx.lineTo(12,18)
          ctx.lineTo(5.5,22)
          ctx.lineTo(7.5,14.5)
          ctx.lineTo(1.5,9.5)
          ctx.lineTo(9,9)
          ctx.closePath()
          ctx.fillStyle = "#a855f7"
          ctx.globalAlpha = 0.85
          ctx.shadowColor = "#c084fc"
          ctx.shadowBlur = 10
          ctx.fill()
          ctx.globalAlpha = 1
          ctx.restore()
        }

        // Celda encendida con efecto de luz
        const isLit = litCells.some((cell) => cell.x === x && cell.y === y)
        if (isLit) {
          ctx.save()
          ctx.shadowColor = "#34d399"
          ctx.shadowBlur = 16
          ctx.fillStyle = "rgba(52, 211, 153, 0.25)"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)
          ctx.restore()
          // Luz central
          ctx.beginPath()
          ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 3, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(52, 211, 153, 0.7)"
          ctx.shadowColor = "#6ee7b7"
          ctx.shadowBlur = 12
          ctx.fill()
          // Flash extra si es la última encendida
          if (lastLit && lastLit.x === x && lastLit.y === y) {
            ctx.save()
            ctx.globalAlpha = 0.7
            ctx.shadowColor = "#faffb0"
            ctx.shadowBlur = 32
            ctx.beginPath()
            ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 2, 0, Math.PI * 2)
            ctx.fillStyle = "#faffb0"
            ctx.fill()
            ctx.restore()
          }
        }
      }
    }

    // Robot (solo si no es 3D)
    if (!robot3D) {
      // El robot visual se muestra con el componente RobotSVG, no dibujar círculo aquí
      // (Eliminado ctx.arc y ctx.fill para el cuerpo del robot)
      // Flecha de dirección solo si no es compacto
      if (!compact) {
        ctx.fillStyle = "#fff"
        ctx.beginPath()
        const centerX = offsetX + robotPosition.x * cellSize + cellSize / 2
        const centerY = offsetY + robotPosition.y * cellSize + cellSize / 2
        const radius = cellSize / 3
        const angles = [
          -Math.PI / 2, 0, Math.PI / 2, Math.PI
        ]
        const angle = angles[robotPosition.direction]
        const tipX = centerX + radius * Math.cos(angle)
        const tipY = centerY + radius * Math.sin(angle)
        const leftX = centerX + (radius / 2) * Math.cos(angle + 2.5)
        const leftY = centerY + (radius / 2) * Math.sin(angle + 2.5)
        const rightX = centerX + (radius / 2) * Math.cos(angle - 2.5)
        const rightY = centerY + (radius / 2) * Math.sin(angle - 2.5)
        ctx.moveTo(tipX, tipY)
        ctx.lineTo(leftX, leftY)
        ctx.lineTo(rightX, rightY)
        ctx.closePath()
        ctx.fill()
      }
    }
  }, [board, robotPosition, targetCells, litCells, robot3D, compact, lastLit])

  return (
    <div className={compact ? "bg-[#1e2330] rounded-lg p-2 border border-gray-800" : "bg-[#1e2330] rounded-lg p-6 border border-gray-800"}>
      {/* Header solo si no es compacto */}
      {!compact && <h2 className="text-xl font-bold mb-4">Tablero</h2>}
      <div className={compact ? "relative aspect-square w-full max-w-[480px] mx-auto" : "relative aspect-square w-full max-w-[700px] mx-auto"}>
        <canvas ref={canvasRef} width={compact ? 480 : 700} height={compact ? 480 : 700} className="w-full h-full rounded-lg" />
      </div>
    </div>
  )
}

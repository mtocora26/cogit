"use client"

import { useEffect, useRef } from "react"

interface GameBoardProps {
  board: number[][]
  robotPosition: { x: number; y: number; direction: number }
  targetCells: { x: number; y: number }[]
  litCells: { x: number; y: number }[]
}

export default function GameBoard({ board, robotPosition, targetCells, litCells }: GameBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Dibujar el tablero cuando cambian las props
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cellSize = Math.min(canvas.width / board[0].length, canvas.height / board.length)
    const offsetX = (canvas.width - cellSize * board[0].length) / 2
    const offsetY = (canvas.height - cellSize * board.length) / 2

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Dibujar el fondo
    ctx.fillStyle = "#1a1d23"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Dibujar el tablero
    for (let y = 0; y < board.length; y++) {
      for (let x = 0; x < board[y].length; x++) {
        const cellX = offsetX + x * cellSize
        const cellY = offsetY + y * cellSize

        // Dibujar celda
        if (board[y][x] === 1) {
          // Obstáculo
          ctx.fillStyle = "#2a3142"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)
        } else {
          // Celda normal
          ctx.fillStyle = "#1e2330"
          ctx.fillRect(cellX, cellY, cellSize, cellSize)

          // Borde de la celda
          ctx.strokeStyle = "#2a3142"
          ctx.lineWidth = 1
          ctx.strokeRect(cellX, cellY, cellSize, cellSize)
        }

        // Dibujar celda objetivo
        const isTarget = targetCells.some((cell) => cell.x === x && cell.y === y)
        if (isTarget) {
          ctx.fillStyle = "rgba(168, 85, 247, 0.2)" // Morado con transparencia
          ctx.fillRect(cellX, cellY, cellSize, cellSize)

          // Dibujar un círculo en el centro
          ctx.beginPath()
          ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 6, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(168, 85, 247, 0.5)"
          ctx.fill()
        }

        // Dibujar celda encendida
        const isLit = litCells.some((cell) => cell.x === x && cell.y === y)
        if (isLit) {
          ctx.fillStyle = "rgba(52, 211, 153, 0.3)" // Verde con transparencia
          ctx.fillRect(cellX, cellY, cellSize, cellSize)

          // Dibujar un círculo en el centro
          ctx.beginPath()
          ctx.arc(cellX + cellSize / 2, cellY + cellSize / 2, cellSize / 4, 0, Math.PI * 2)
          ctx.fillStyle = "rgba(52, 211, 153, 0.8)"
          ctx.fill()
        }
      }
    }

    // Dibujar el robot
    const robotX = offsetX + robotPosition.x * cellSize
    const robotY = offsetY + robotPosition.y * cellSize

    // Cuerpo del robot
    ctx.fillStyle = "#3b82f6" // Azul
    ctx.beginPath()
    ctx.arc(robotX + cellSize / 2, robotY + cellSize / 2, cellSize / 2.5, 0, Math.PI * 2)
    ctx.fill()

    // Dirección del robot (triángulo)
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()

    // Calcular los puntos del triángulo según la dirección
    const centerX = robotX + cellSize / 2
    const centerY = robotY + cellSize / 2
    const radius = cellSize / 3

    // Ángulos para las direcciones (en radianes)
    const angles = [
      -Math.PI / 2, // Norte (0)
      0, // Este (1)
      Math.PI / 2, // Sur (2)
      Math.PI, // Oeste (3)
    ]

    const angle = angles[robotPosition.direction]

    // Puntos del triángulo
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
  }, [board, robotPosition, targetCells, litCells])

  return (
    <div className="bg-[#1e2330] rounded-lg p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-4">Tablero</h2>
      <div className="relative aspect-square w-full max-w-[600px] mx-auto">
        <canvas ref={canvasRef} width={600} height={600} className="w-full h-full rounded-lg" />
      </div>
    </div>
  )
}

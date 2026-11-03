import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// GET /api/ranking?type=weekly|alltime
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') || 'alltime'
    let users = []

    if (type === 'weekly') {
      // Ranking semanal: sumar score de la semana actual
      const startOfWeek = new Date()
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
      startOfWeek.setHours(0, 0, 0, 0)
      users = await prisma.usuario.findMany({
        where: {
          progreso: {
            some: {
              fecha: { gte: startOfWeek },
            },
          },
        },
        select: {
          id: true,
          nombre: true,
          rol: true,
          progreso: {
            where: { fecha: { gte: startOfWeek } },
            select: { score: true },
          },
        },
      })
      users = users.map(u => ({
        id: u.id,
        name: u.nombre,
        points: u.progreso.reduce((acc, p) => acc + (p.score || 0), 0),
        role: u.rol,
      }))
    } else {
      // Ranking global: sumar score total
      users = await prisma.usuario.findMany({
        select: {
          id: true,
          nombre: true,
          rol: true,
          progreso: {
            select: { score: true },
          },
        },
      })
      users = users.map(u => ({
        id: u.id,
        name: u.nombre,
        points: u.progreso.reduce((acc, p) => acc + (p.score || 0), 0),
        role: u.rol,
      }))
    }
    // Ordenar y asignar ranking
    users = users
      .filter(u => u.role !== 'admin')
      .sort((a, b) => b.points - a.points)
      .map((u, i) => ({ ...u, rank: i + 1 }))
    return NextResponse.json(users)
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener ranking', details: error }, { status: 500 })
  }
}

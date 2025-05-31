import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@/lib/generated/prisma'

const prisma = new PrismaClient()

// POST: Guardar progreso
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { userId, seccion, nivel, actividad, completado, score, tiempo } = body
    if (!userId || !seccion || !nivel || !actividad) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }
    // Si ya existe un progreso para esa actividad y usuario, actualiza
    const progreso = await prisma.progreso.upsert({
      where: {
        userId_seccion_nivel_actividad: {
          userId,
          seccion,
          nivel,
          actividad,
        },
      },
      update: {
        completado,
        score,
        tiempo,
        fecha: new Date(),
      },
      create: {
        userId,
        seccion,
        nivel,
        actividad,
        completado,
        score,
        tiempo,
      },
    })
    return NextResponse.json(progreso)
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar progreso', details: error }, { status: 500 })
  }
}

// GET: Consultar progreso de un usuario (por query params)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    if (!userId) {
      return NextResponse.json({ error: 'Falta userId' }, { status: 400 })
    }
    const progreso = await prisma.progreso.findMany({
      where: { userId: Number(userId) },
      orderBy: { fecha: 'desc' },
    })
    return NextResponse.json(progreso)
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar progreso', details: error }, { status: 500 })
  }
}

// Nota: Para que upsert funcione con múltiples campos, debes definir un índice único compuesto en el modelo Progreso en schema.prisma:
// @@unique([userId, seccion, nivel, actividad])

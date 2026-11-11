import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { forbidden, getSession, unauthorized } from '@/lib/auth'
import { SECCION_MINIJUEGOS, puntosMinijuego } from '@/lib/minijuegos-puntos'

// POST: Guardar progreso
export async function POST(req: NextRequest) {
  try {
    const session = await getSession(req)
    if (!session) return unauthorized()
    const body = await req.json()
    const { seccion, nivel, actividad, completado, tiempo } = body
    let score: number = body.score
    const userId = session.uid // el progreso se guarda siempre en la cuenta de la sesión
    if (!userId || !seccion || !nivel || !actividad) {
      return NextResponse.json({ error: 'Faltan datos requeridos' }, { status: 400 })
    }
    if (seccion === SECCION_MINIJUEGOS) {
      // Los minijuegos puntúan por nivel en el servidor: el cliente no decide los puntos y repetir no suma más.
      const puntos = puntosMinijuego(String(nivel), String(actividad))
      if (puntos === null) return NextResponse.json({ error: 'Minijuego o nivel desconocido' }, { status: 400 })
      if (!completado) return NextResponse.json({ error: 'Solo se guardan niveles completados' }, { status: 400 })
      if (!Number.isFinite(tiempo) || tiempo < 0) return NextResponse.json({ error: 'Tiempo no válido' }, { status: 400 })
      score = puntos
    }
    // Reintentar nunca deshace lo ya logrado: una actividad completada sigue completada y se conserva la mejor puntuación.
    const previo = await prisma.progreso.findUnique({
      where: { userId_seccion_nivel_actividad: { userId, seccion, nivel, actividad } },
    })
    const mejor = previo?.completado ? previo : null
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
        completado: Boolean(completado) || Boolean(mejor),
        score: mejor ? Math.max(mejor.score, score) : score,
        tiempo: mejor && mejor.score >= score ? (mejor.score === score ? Math.min(mejor.tiempo, tiempo) : mejor.tiempo) : tiempo,
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
    // Al terminar la actividad (completada o no) ya no hay nada que retomar a medias.
    await prisma.progresoParcial.deleteMany({ where: { userId, seccion, nivel, actividad } })
    return NextResponse.json(progreso)
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar progreso', details: error }, { status: 500 })
  }
}

// GET: Consultar progreso de un usuario (por query params)
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const session = await getSession(req)
    if (!session) return unauthorized()
    const pedido = searchParams.get('userId') ? Number(searchParams.get('userId')) : session.uid
    // Un estudiante solo ve su propio progreso; un administrador puede consultar el de cualquiera.
    if (pedido !== session.uid && session.rol !== 'admin') return forbidden()
    const progreso = await prisma.progreso.findMany({
      where: { userId: pedido },
      orderBy: { fecha: 'desc' },
    })
    return NextResponse.json(progreso)
  } catch (error) {
    return NextResponse.json({ error: 'Error al consultar progreso', details: error }, { status: 500 })
  }
}

// Nota: Para que upsert funcione con múltiples campos, debes definir un índice único compuesto en el modelo Progreso en schema.prisma:
// @@unique([userId, seccion, nivel, actividad])

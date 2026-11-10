import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession, unauthorized } from "@/lib/auth"

/**
 * Actividad a medias de la cuenta de la sesión (REQ-006). Nunca se acepta un userId: cada cuenta solo ve y escribe lo suyo.
 */
const MAX_BYTES = 50_000
const clave = (s: unknown) => (typeof s === "string" && s.length > 0 && s.length <= 64 ? s : null)

export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const q = new URL(req.url).searchParams
  const seccion = clave(q.get("seccion"))
  const nivel = clave(q.get("nivel"))
  const actividad = clave(q.get("actividad"))
  if (!seccion || !nivel || !actividad) return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
  try {
    const fila = await prisma.progresoParcial.findUnique({
      where: { userId_seccion_nivel_actividad: { userId: session.uid, seccion, nivel, actividad } },
    })
    return NextResponse.json(fila ? { estado: fila.estado, vidas: fila.vidas } : null)
  } catch {
    return NextResponse.json({ error: "Error al consultar el avance guardado" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  try {
    const body = await req.json()
    const seccion = clave(body?.seccion)
    const nivel = clave(body?.nivel)
    const actividad = clave(body?.actividad)
    const vidas = Number(body?.vidas)
    const estado = body?.estado
    if (!seccion || !nivel || !actividad || !estado || typeof estado !== "object" || Array.isArray(estado) || !Number.isInteger(vidas) || vidas < 0 || vidas > 10) {
      return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
    }
    if (JSON.stringify(estado).length > MAX_BYTES) return NextResponse.json({ error: "Estado demasiado grande" }, { status: 413 })
    const userId = session.uid
    // Si la actividad ya está completada no se guarda un avance a medias (evita resucitar un intento terminado).
    const hecha = await prisma.progreso.findUnique({
      where: { userId_seccion_nivel_actividad: { userId, seccion, nivel, actividad } },
      select: { completado: true },
    })
    if (hecha?.completado) return NextResponse.json({ ok: true, omitido: true })
    await prisma.progresoParcial.upsert({
      where: { userId_seccion_nivel_actividad: { userId, seccion, nivel, actividad } },
      update: { estado, vidas },
      create: { userId, seccion, nivel, actividad, estado, vidas },
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Error al guardar el avance" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const q = new URL(req.url).searchParams
  const seccion = clave(q.get("seccion"))
  const nivel = clave(q.get("nivel"))
  const actividad = clave(q.get("actividad"))
  if (!seccion || !nivel || !actividad) return NextResponse.json({ error: "Faltan datos requeridos" }, { status: 400 })
  try {
    await prisma.progresoParcial.deleteMany({ where: { userId: session.uid, seccion, nivel, actividad } })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "Error al descartar el avance" }, { status: 500 })
  }
}

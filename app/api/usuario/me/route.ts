import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { clearSessionCookie, getSession, unauthorized } from "@/lib/auth"

// GET: la cuenta de la sesión actual. Sirve para saber si hay sesión válida sin confiar en el navegador.
export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const u = await prisma.usuario.findUnique({ where: { id: session.uid } })
  if (!u) {
    const res = unauthorized()
    clearSessionCookie(res)
    return res
  }
  return NextResponse.json({
    id: u.id,
    username: u.username,
    nombre: u.username,
    email: u.email,
    rol: u.rol,
    neuronas: u.neuronas,
    maxNeuronas: u.maxNeuronas,
    ultimaRecarga: u.ultimaRecarga,
    visibleEnRanking: u.visibleEnRanking,
  })
}

// PATCH: preferencias de la propia cuenta. Hoy solo la exclusión del ranking (REQ-008).
export async function PATCH(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const { visibleEnRanking } = await req.json().catch(() => ({}))
  if (typeof visibleEnRanking !== "boolean") {
    return NextResponse.json({ error: "Dato no válido" }, { status: 400 })
  }
  const u = await prisma.usuario.update({ where: { id: session.uid }, data: { visibleEnRanking }, select: { visibleEnRanking: true } })
  return NextResponse.json(u)
}

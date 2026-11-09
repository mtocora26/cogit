import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { forbidden, getSession, unauthorized } from "@/lib/auth"

/**
 * Exige un administrador. El rol se vuelve a leer en la base de datos: si un administrador pierde el rol,
 * una cookie que aún no vence no le da acceso.
 */
export async function requireAdmin(req: NextRequest): Promise<{ id: number } | NextResponse> {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const u = await prisma.usuario.findUnique({ where: { id: session.uid }, select: { id: true, rol: true } })
  if (!u || u.rol !== "admin") return forbidden()
  return { id: u.id }
}

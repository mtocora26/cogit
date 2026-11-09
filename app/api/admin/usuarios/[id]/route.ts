import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-guard"

// PATCH: cambiar el rol de un usuario. Reglas: no puedes cambiar tu propio rol y siempre queda un administrador.
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const guard = await requireAdmin(req)
  if (guard instanceof NextResponse) return guard

  const { id: idParam } = await params
  const id = Number(idParam)
  const { rol } = await req.json()
  if (!Number.isInteger(id) || (rol !== "admin" && rol !== "estudiante")) {
    return NextResponse.json({ error: "Datos no válidos" }, { status: 400 })
  }
  if (id === guard.id) {
    return NextResponse.json({ error: "No puedes cambiar tu propio rol" }, { status: 400 })
  }
  const objetivo = await prisma.usuario.findUnique({ where: { id }, select: { id: true, rol: true } })
  if (!objetivo) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 })

  if (objetivo.rol === "admin" && rol === "estudiante") {
    const admins = await prisma.usuario.count({ where: { rol: "admin" } })
    if (admins <= 1) return NextResponse.json({ error: "Debe quedar al menos un administrador" }, { status: 400 })
  }
  const u = await prisma.usuario.update({ where: { id }, data: { rol }, select: { id: true, username: true, rol: true } })
  return NextResponse.json(u)
}

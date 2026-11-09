import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { requireAdmin } from "@/lib/admin-guard"

// GET: lista de usuarios para el panel. Solo administradores (REQ-011).
export async function GET(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (guard instanceof NextResponse) return guard

  const { searchParams } = new URL(req.url)
  const q = (searchParams.get("q") || "").trim().toLowerCase()
  const rol = searchParams.get("rol")

  const usuarios = await prisma.usuario.findMany({
    where: {
      ...(rol === "admin" || rol === "estudiante" ? { rol } : {}),
      ...(q ? { OR: [{ username: { contains: q } }, { email: { contains: q, mode: "insensitive" as const } }] } : {}),
    },
    orderBy: { creadoEn: "desc" },
    take: 200,
    select: {
      id: true,
      username: true,
      email: true,
      rol: true,
      creadoEn: true,
      _count: { select: { progreso: { where: { completado: true } } } },
    },
  })
  return NextResponse.json(
    usuarios.map((u) => ({
      id: u.id,
      username: u.username,
      email: u.email,
      rol: u.rol,
      creadoEn: u.creadoEn,
      completadas: u._count.progreso,
    })),
  )
}

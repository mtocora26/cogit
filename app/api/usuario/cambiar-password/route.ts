import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession, hashPassword, huellaPassword, setSessionCookie, signSession, unauthorized, verifyPassword } from "@/lib/auth"

// POST { actual, nueva }: cambia la contraseña de la cuenta de la sesión, pidiendo la contraseña actual.
export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()

  const body = await req.json().catch(() => ({}))
  const actual = typeof body.actual === "string" ? body.actual : ""
  const nueva = typeof body.nueva === "string" ? body.nueva : ""

  if (!actual) return NextResponse.json({ error: "Escribe tu contraseña actual" }, { status: 400 })
  if (nueva.length < 8) {
    return NextResponse.json({ error: "La contraseña nueva debe tener al menos 8 caracteres" }, { status: 400 })
  }
  if (nueva === actual) {
    return NextResponse.json({ error: "La contraseña nueva debe ser distinta de la actual" }, { status: 400 })
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: session.uid } })
    if (!usuario || !(await verifyPassword(usuario.password, actual)).ok) {
      return NextResponse.json({ error: "La contraseña actual no es correcta" }, { status: 400 })
    }
    const hash = await hashPassword(nueva)
    await prisma.usuario.update({ where: { id: usuario.id }, data: { password: hash } })
    // Cualquier enlace de recuperación pendiente deja de servir.
    await prisma.recuperacionPassword.deleteMany({ where: { userId: usuario.id } })
    // Las demás sesiones quedan cerradas; esta se renueva para que quien cambió la clave siga dentro.
    const res = NextResponse.json({ ok: true })
    setSessionCookie(res, await signSession(usuario.id, session.rol, await huellaPassword(hash)))
    return res
  } catch {
    return NextResponse.json({ error: "No pudimos cambiar la contraseña. Inténtalo de nuevo." }, { status: 500 })
  }
}

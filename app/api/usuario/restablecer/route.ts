import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword } from "@/lib/auth"
import { hashToken } from "@/lib/recuperacion"

// POST { token, password }: cambia la contraseña con un enlace vigente y no usado. El enlace sirve una sola vez.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const token = typeof body.token === "string" ? body.token : ""
  const password = typeof body.password === "string" ? body.password : ""

  if (password.length < 8) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 })
  }
  const invalido = () =>
    NextResponse.json({ error: "El enlace no es válido o ya venció. Solicita uno nuevo." }, { status: 400 })
  if (!token) return invalido()

  try {
    const registro = await prisma.recuperacionPassword.findUnique({ where: { tokenHash: hashToken(token) } })
    if (!registro || registro.usadoEn || registro.expiraEn < new Date()) return invalido()

    const nueva = await hashPassword(password)
    // updateMany con usadoEn: null evita que dos peticiones simultáneas usen el mismo enlace.
    const gastado = await prisma.recuperacionPassword.updateMany({
      where: { id: registro.id, usadoEn: null },
      data: { usadoEn: new Date() },
    })
    if (gastado.count !== 1) return invalido()
    await prisma.usuario.update({ where: { id: registro.userId }, data: { password: nueva } })
    await prisma.recuperacionPassword.deleteMany({ where: { userId: registro.userId } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error("[restablecer] error", e)
    return NextResponse.json({ error: "No pudimos cambiar la contraseña. Inténtalo de nuevo." }, { status: 500 })
  }
}

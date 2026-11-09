import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { EMAIL_RE, USERNAME_RE, hashPassword, normalizeUsername } from "@/lib/auth"

// POST: crear una cuenta. El rol NO viene del cliente: toda cuenta nueva es de estudiante.
// Las cuentas de administrador las asigna otro administrador desde el panel.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = typeof body.username === "string" ? normalizeUsername(body.username) : ""
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
    const password = typeof body.password === "string" ? body.password : ""

    if (!USERNAME_RE.test(username)) {
      return NextResponse.json(
        { error: "El usuario debe tener entre 3 y 20 caracteres: letras minúsculas, números o guion bajo" },
        { status: 400 },
      )
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Escribe un correo válido (solo lo usamos para recuperar tu acceso)" }, { status: 400 })
    }
    if (password.length < 8) {
      return NextResponse.json({ error: "La contraseña debe tener al menos 8 caracteres" }, { status: 400 })
    }

    const [porUsuario, porCorreo] = await Promise.all([
      prisma.usuario.findUnique({ where: { username } }),
      prisma.usuario.findUnique({ where: { email } }),
    ])
    if (porUsuario) return NextResponse.json({ error: "Ese nombre de usuario ya está en uso" }, { status: 409 })
    if (porCorreo) return NextResponse.json({ error: "Ese correo ya está registrado" }, { status: 409 })

    const u = await prisma.usuario.create({
      data: {
        username,
        email,
        password: await hashPassword(password),
        rol: "estudiante",
        neuronas: 5,
        maxNeuronas: 5,
        ultimaRecarga: new Date(),
      },
    })
    return NextResponse.json({
      id: u.id,
      username: u.username,
      nombre: u.username,
      email: u.email,
      rol: u.rol,
      neuronas: u.neuronas,
      maxNeuronas: u.maxNeuronas,
      ultimaRecarga: u.ultimaRecarga,
    })
  } catch {
    return NextResponse.json({ error: "No pudimos crear la cuenta. Inténtalo de nuevo." }, { status: 500 })
  }
}

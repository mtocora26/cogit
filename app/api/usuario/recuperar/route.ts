import { NextRequest, NextResponse, after } from "next/server"
import { prisma } from "@/lib/prisma"
import { EMAIL_RE } from "@/lib/auth"
import { enviarCorreo } from "@/lib/correo"
import {
  ESPERA_SEGUNDOS,
  MENSAJE_RECUPERACION,
  VIGENCIA_MINUTOS,
  correoRecuperacion,
  hashToken,
  nuevoToken,
  urlBase,
} from "@/lib/recuperacion"

// POST { email }: envía un enlace de un solo uso. La respuesta es siempre la misma exista o no la cuenta
// (REQ-010: no revelar si un tercero tiene cuenta), y el correo se envía después de responder para que
// el tiempo de respuesta tampoco lo delate.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : ""
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Escribe un correo válido" }, { status: 400 })
  }

  const respuesta = () => NextResponse.json({ mensaje: MENSAJE_RECUPERACION })
  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } })
    if (!usuario) return respuesta()

    // Freno de abuso: no más de un enlace por cuenta cada ESPERA_SEGUNDOS.
    const reciente = await prisma.recuperacionPassword.findFirst({
      where: { userId: usuario.id, creadoEn: { gt: new Date(Date.now() - ESPERA_SEGUNDOS * 1000) } },
    })
    if (reciente) return respuesta()

    const token = nuevoToken()
    // Un solo enlace vigente por cuenta: los anteriores dejan de servir.
    await prisma.$transaction([
      prisma.recuperacionPassword.deleteMany({ where: { userId: usuario.id } }),
      prisma.recuperacionPassword.create({
        data: {
          userId: usuario.id,
          tokenHash: hashToken(token),
          expiraEn: new Date(Date.now() + VIGENCIA_MINUTOS * 60 * 1000),
        },
      }),
    ])

    const enlace = `${urlBase(req.nextUrl.origin)}/restablecer-password?token=${token}`
    const correo = correoRecuperacion(usuario.username, enlace)
    after(async () => {
      await enviarCorreo({ to: usuario.email, ...correo })
    })
  } catch (e) {
    console.error("[recuperar] error", e)
  }
  return respuesta()
}

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sincronizarNeuronas } from "@/lib/neuronas"
import { claveIp, claveUsuario, ipDe, limpiarFallos, MAX_POR_IP, MAX_POR_USUARIO, registrarFallo, segundosBloqueado } from "@/lib/limite-login"
import { hashPassword, huellaPassword, normalizeUsername, setSessionCookie, signSession, verifyPassword } from "@/lib/auth"

// POST: inicio de sesión con nombre de usuario. Las credenciales viajan en el cuerpo, no en la URL.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = typeof body.username === "string" ? normalizeUsername(body.username) : ""
    const password = typeof body.password === "string" ? body.password : ""
    if (!username || !password) {
      return NextResponse.json({ error: "Escribe tu usuario y tu contraseña" }, { status: 400 })
    }
    // REQ-017: demasiados fallos seguidos bloquean el acceso un rato (antes de calcular el hash, que es costoso).
    const ip = claveIp(ipDe(req))
    const espera = Math.max(await segundosBloqueado(claveUsuario(username), MAX_POR_USUARIO), await segundosBloqueado(ip, MAX_POR_IP))
    if (espera > 0) {
      return NextResponse.json(
        { error: `Demasiados intentos. Vuelve a intentarlo en ${Math.ceil(espera / 60)} min.` },
        { status: 429, headers: { "Retry-After": String(espera) } },
      )
    }
    const usuario = await prisma.usuario.findUnique({ where: { username } })
    const check = usuario ? await verifyPassword(usuario.password, password) : { ok: false, needsRehash: false }
    // Mismo mensaje si falla el usuario o la contraseña: no revela qué cuentas existen.
    if (!usuario || !check.ok) {
      await registrarFallo(claveUsuario(username))
      await registrarFallo(ip)
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    await limpiarFallos(claveUsuario(username))

    // Cuentas antiguas con la contraseña en texto plano: se guarda el hash al entrar.
    const data: { password?: string } = {}
    if (check.needsRehash) data.password = await hashPassword(password)
    if (Object.keys(data).length) await prisma.usuario.update({ where: { id: usuario.id }, data })

    // La recarga de neuronas es única y vive en el servidor (lib/neuronas).
    await sincronizarNeuronas(usuario.id)
    const actual = (await prisma.usuario.findUnique({ where: { id: usuario.id } })) ?? usuario

    const res = NextResponse.json({
      id: actual.id,
      username: actual.username,
      nombre: actual.username,
      email: actual.email,
      rol: actual.rol,
      modoPruebas: actual.modoPruebas,
      neuronas: actual.neuronas,
      maxNeuronas: actual.maxNeuronas,
      ultimaRecarga: actual.ultimaRecarga,
    })
    setSessionCookie(res, await signSession(actual.id, actual.rol, await huellaPassword(actual.password)))
    return res
  } catch {
    return NextResponse.json({ error: "No pudimos iniciar sesión. Inténtalo de nuevo." }, { status: 500 })
  }
}

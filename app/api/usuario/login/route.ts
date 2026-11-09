import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { hashPassword, normalizeUsername, setSessionCookie, signSession, verifyPassword } from "@/lib/auth"

// POST: inicio de sesión con nombre de usuario. Las credenciales viajan en el cuerpo, no en la URL.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const username = typeof body.username === "string" ? normalizeUsername(body.username) : ""
    const password = typeof body.password === "string" ? body.password : ""
    if (!username || !password) {
      return NextResponse.json({ error: "Escribe tu usuario y tu contraseña" }, { status: 400 })
    }
    const usuario = await prisma.usuario.findUnique({ where: { username } })
    const check = usuario ? await verifyPassword(usuario.password, password) : { ok: false, needsRehash: false }
    // Mismo mensaje si falla el usuario o la contraseña: no revela qué cuentas existen.
    if (!usuario || !check.ok) {
      return NextResponse.json({ error: "Usuario o contraseña incorrectos" }, { status: 401 })
    }

    // Cuentas antiguas con la contraseña en texto plano: se guarda el hash al entrar.
    const data: { password?: string; neuronas?: number; ultimaRecarga?: Date } = {}
    if (check.needsRehash) data.password = await hashPassword(password)

    // Recarga automática de neuronas: una cada 30 minutos.
    let neuronas = usuario.neuronas
    let ultimaRecarga = usuario.ultimaRecarga || new Date()
    const maxNeuronas = usuario.maxNeuronas || 5
    if (neuronas < maxNeuronas) {
      const recargas = Math.floor((Date.now() - new Date(ultimaRecarga).getTime()) / (30 * 60 * 1000))
      if (recargas > 0) {
        neuronas = Math.min(maxNeuronas, neuronas + recargas)
        ultimaRecarga = new Date(new Date(ultimaRecarga).getTime() + recargas * 30 * 60 * 1000)
        data.neuronas = neuronas
        data.ultimaRecarga = ultimaRecarga
      }
    }
    const actual = Object.keys(data).length ? await prisma.usuario.update({ where: { id: usuario.id }, data }) : usuario

    const res = NextResponse.json({
      id: actual.id,
      username: actual.username,
      nombre: actual.username,
      email: actual.email,
      rol: actual.rol,
      neuronas: actual.neuronas,
      maxNeuronas: actual.maxNeuronas,
      ultimaRecarga: actual.ultimaRecarga,
    })
    setSessionCookie(res, await signSession(actual.id, actual.rol))
    return res
  } catch {
    return NextResponse.json({ error: "No pudimos iniciar sesión. Inténtalo de nuevo." }, { status: 500 })
  }
}

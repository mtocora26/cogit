import { randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto"
import { promisify } from "node:util"
import type { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { SESSION_COOKIE, huellaPassword, readSession, type Session } from "@/lib/session"

/**
 * Contraseñas y validación de cuentas (solo Node: no importar desde el middleware).
 * Hash scrypt con sal. Las cuentas antiguas en texto plano se migran al iniciar sesión.
 */
export * from "@/lib/session"

/**
 * Sesión de la petición. Además de la firma, comprueba que la contraseña no haya cambiado desde que
 * se abrió la sesión (huella `pv`): cambiar o restablecer la contraseña cierra las demás sesiones.
 * Las cookies anteriores a este control no llevan `pv` y valen hasta que expiren (máx. 7 días).
 */
export async function getSession(req: NextRequest): Promise<Session | null> {
  const s = await readSession(req.cookies.get(SESSION_COOKIE)?.value)
  if (!s || !s.pv) return s
  const u = await prisma.usuario.findUnique({ where: { id: s.uid }, select: { password: true } })
  if (!u || (await huellaPassword(u.password)) !== s.pv) return null
  return s
}

// ---------- Contraseñas (solo Node) ----------
const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16)
  const hash = await scrypt(password, salt, 32)
  return `scrypt$${salt.toString("base64")}$${hash.toString("base64")}`
}

/** needsRehash es true cuando la contraseña guardada aún está en texto plano. */
export async function verifyPassword(stored: string, password: string): Promise<{ ok: boolean; needsRehash: boolean }> {
  if (stored.startsWith("scrypt$")) {
    const [, saltB64, hashB64] = stored.split("$")
    const expected = Buffer.from(hashB64, "base64")
    const actual = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length)
    return { ok: timingSafeEqual(actual, expected), needsRehash: false }
  }
  const a = Buffer.from(stored)
  const b = Buffer.from(password)
  return { ok: a.length === b.length && timingSafeEqual(a, b), needsRehash: true }
}

// ---------- Validación de datos de cuenta ----------
export const USERNAME_RE = /^[a-z0-9_]{3,20}$/
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const normalizeUsername = (u: string) => u.trim().toLowerCase()

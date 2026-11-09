/**
 * Sesión de COGIT. Usa solo Web Crypto para poder ejecutarse también en el middleware (runtime edge).
 * Cookie httpOnly firmada (HMAC-SHA256) con el id y el rol: el navegador no puede fabricarla.
 * Las rutas de administración vuelven a leer el rol en la base, no se fían del valor de la cookie.
 */
import { NextRequest, NextResponse } from "next/server"
import type { Rol } from "@/lib/generated/prisma"

export const SESSION_COOKIE = "cogit_session"
const SESSION_SECONDS = 60 * 60 * 24 * 7

export interface Session {
  uid: number
  rol: Rol
  exp: number
}

function secret(): string {
  const s = process.env.SESSION_SECRET
  if (s && s.length >= 32) return s
  if (process.env.NODE_ENV === "production") throw new Error("Falta SESSION_SECRET (mínimo 32 caracteres)")
  return "cogit-dev-secret-no-usar-en-produccion-0000"
}

const enc = new TextEncoder()
const b64url = (buf: ArrayBuffer | Uint8Array) =>
  btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")
const fromB64url = (s: string) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0))

async function hmacKey(usage: "sign" | "verify") {
  return crypto.subtle.importKey("raw", enc.encode(secret()), { name: "HMAC", hash: "SHA-256" }, false, [usage])
}

export async function signSession(uid: number, rol: Rol): Promise<string> {
  const payload = b64url(enc.encode(JSON.stringify({ uid, rol, exp: Math.floor(Date.now() / 1000) + SESSION_SECONDS })))
  const sig = await crypto.subtle.sign("HMAC", await hmacKey("sign"), enc.encode(payload))
  return `${payload}.${b64url(sig)}`
}

export async function readSession(token: string | undefined): Promise<Session | null> {
  if (!token) return null
  const [payload, sig] = token.split(".")
  if (!payload || !sig) return null
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey("verify"), fromB64url(sig), enc.encode(payload))
    if (!ok) return null
    const s = JSON.parse(new TextDecoder().decode(fromB64url(payload))) as Session
    if (typeof s.uid !== "number" || s.exp < Date.now() / 1000) return null
    return s
  } catch {
    return null
  }
}

export function setSessionCookie(res: NextResponse, token: string) {
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_SECONDS,
  })
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { httpOnly: true, sameSite: "lax", path: "/", maxAge: 0 })
}

export const getSession = (req: NextRequest) => readSession(req.cookies.get(SESSION_COOKIE)?.value)

export const unauthorized = () => NextResponse.json({ error: "Inicia sesión para continuar" }, { status: 401 })
export const forbidden = () => NextResponse.json({ error: "No tienes permiso para esta acción" }, { status: 403 })


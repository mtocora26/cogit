import { NextResponse } from "next/server"
import { clearSessionCookie } from "@/lib/auth"

// POST: cierra la sesión borrando la cookie.
export async function POST() {
  const res = NextResponse.json({ ok: true })
  clearSessionCookie(res)
  return res
}

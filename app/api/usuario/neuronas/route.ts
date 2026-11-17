import { NextRequest, NextResponse } from "next/server"
import { getSession, unauthorized } from "@/lib/auth"
import { perderNeurona, sincronizarNeuronas } from "@/lib/neuronas"

// GET: neuronas de la cuenta de la sesión, con la recarga ya aplicada.
export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const e = await sincronizarNeuronas(session.uid)
  return e ? NextResponse.json(e) : unauthorized()
}

// POST: descuenta una neurona por un error en una actividad o minijuego.
export async function POST(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  const e = await perderNeurona(session.uid)
  return e ? NextResponse.json(e) : unauthorized()
}

import { NextRequest, NextResponse } from "next/server"
import { getSession, unauthorized } from "@/lib/auth"
import { leerCatalogo } from "@/lib/contenido"

export const dynamic = "force-dynamic"

/** Catálogo validado de misiones, para cualquier cuenta con sesión. */
export async function GET(req: NextRequest) {
  const session = await getSession(req)
  if (!session) return unauthorized()
  return NextResponse.json(await leerCatalogo(), { headers: { "Cache-Control": "no-store" } })
}

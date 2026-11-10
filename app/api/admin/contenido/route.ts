import { NextRequest, NextResponse } from "next/server"
import { requireAdmin } from "@/lib/admin-guard"
import { NivelSchema } from "@/lib/contenido-schema"
import { NivelNoEncontrado, guardarNivel, leerCatalogo } from "@/lib/contenido"

export const dynamic = "force-dynamic"

/**
 * PUT: guarda un nivel con sus actividades (objetivo, duración, reglas, ejemplo...). Solo administradores (REQ-011):
 * un estudiante recibe 403. Todo se valida con el esquema compartido antes de tocar la base.
 */
export async function PUT(req: NextRequest) {
  const guard = await requireAdmin(req)
  if (guard instanceof NextResponse) return guard

  let cuerpo: unknown
  try {
    cuerpo = await req.json()
  } catch {
    return NextResponse.json({ error: "El cuerpo no es JSON válido" }, { status: 400 })
  }
  const r = NivelSchema.safeParse((cuerpo as { nivel?: unknown } | null)?.nivel)
  if (!r.success) {
    return NextResponse.json(
      { error: "El contenido no es válido", detalles: r.error.issues.map((i) => ({ campo: i.path.join("."), mensaje: i.message })) },
      { status: 400 },
    )
  }
  try {
    await guardarNivel(r.data)
  } catch (e) {
    if (e instanceof NivelNoEncontrado) {
      return NextResponse.json({ error: "Ese nivel aún no está en la base. Aplica la migración del contenido y vuelve a intentarlo." }, { status: 409 })
    }
    return NextResponse.json({ error: "No se pudo guardar el contenido" }, { status: 500 })
  }
  return NextResponse.json(await leerCatalogo())
}

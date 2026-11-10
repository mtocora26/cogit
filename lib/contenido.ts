import { prisma } from "@/lib/prisma"
import { CatalogoSchema, type Catalogo } from "@/lib/contenido-schema"
import { CATALOGO_INICIAL } from "@/lib/misiones-catalogo"

/** Sección de las misiones. Hoy hay una sola; sus niveles y actividades viven en la base. */
const SECCION = CATALOGO_INICIAL.seccion

/**
 * Lee el catálogo de la base y lo valida. Si la base no tiene contenido (aún sin migrar, p. ej. en un preview)
 * o el contenido guardado no cumple el esquema, devuelve el contenido inicial en lugar de romper la app.
 */
export async function leerCatalogo(): Promise<Catalogo> {
  try {
    const niveles = await prisma.nivel.findMany({
      where: { seccion: SECCION.id },
      orderBy: { orden: "asc" },
      include: { actividades: { orderBy: { orden: "asc" } } },
    })
    if (niveles.length === 0) return CATALOGO_INICIAL
    const candidato = {
      seccion: SECCION,
      niveles: niveles.map((n) => ({
        id: n.clave,
        title: n.titulo,
        text: n.texto,
        objetivo: n.objetivo,
        actividades: n.actividades.map((a) => ({
          id: a.clave,
          title: a.titulo,
          descripcion: a.descripcion,
          objetivo: a.objetivo,
          minutos: a.minutos,
          juego: a.juego,
          reglas: a.reglas,
          ejemplo: a.ejemplo,
        })),
      })),
    }
    const r = CatalogoSchema.safeParse(candidato)
    if (!r.success) {
      console.error("Contenido de misiones inválido en la base; se usa el inicial", r.error.flatten())
      return CATALOGO_INICIAL
    }
    return r.data
  } catch (e) {
    console.error("No se pudo leer el contenido de misiones; se usa el inicial", e)
    return CATALOGO_INICIAL
  }
}

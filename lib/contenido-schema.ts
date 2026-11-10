import { z } from "zod"

/**
 * Esquema único y validado del contenido de misiones (REQ-011). Lo comparten el servidor (lectura y edición)
 * y el cliente (validar lo recibido), así que nada inválido llega a la interfaz ni a la base.
 */

/** Juegos disponibles. Una actividad elige uno por clave; agregar una actividad no exige tocar la presentación. */
export const JUEGOS = ["reconocer", "intruso", "completa", "ordenar", "instrucciones", "ejecutar", "clasificar", "sobra", "esencial", "subtareas", "error", "depurar"] as const
export type Juego = (typeof JUEGOS)[number]
export const NOMBRE_JUEGO: Record<Juego, string> = {
  reconocer: "¿Qué ficha sigue?",
  intruso: "Encuentra el intruso",
  completa: "Completa los huecos",
  ordenar: "Ordena los pasos",
  instrucciones: "Completa las instrucciones",
  ejecutar: "Ejecuta el algoritmo",
  clasificar: "Clasifica con la regla oculta",
  sobra: "¿Qué sobra?",
  esencial: "Quédate con lo esencial",
  subtareas: "Divide la tarea",
  error: "Encuentra el error",
  depurar: "Depura el programa",
}

const texto = (max: number) => z.string().trim().min(1, "No puede estar vacío").max(max, `Máximo ${max} caracteres`)
const clave = z.string().regex(/^[a-z0-9]{1,20}$/, "Solo minúsculas y números")

export const EjemploSchema = z
  .object({
    /** Fichas (o pasos, en frases cortas) del ejemplo; "❔" marca un hueco. */
    secuencia: z.array(texto(80)).min(3).max(12),
    resaltar: z.number().int().min(0).optional(),
    respuesta: z.array(texto(80)).min(1).max(4),
    explicacion: texto(400),
  })
  .refine((e) => e.resaltar === undefined || e.resaltar < e.secuencia.length, {
    message: "La ficha resaltada debe estar en la secuencia",
    path: ["resaltar"],
  })

export const ActividadSchema = z.object({
  id: clave,
  title: texto(80),
  descripcion: texto(600),
  /** Una frase: qué sabrá hacer el estudiante al terminar. */
  objetivo: texto(200),
  /** Duración estimada en minutos. */
  minutos: z.number().int().min(1).max(60),
  juego: z.enum(JUEGOS),
  reglas: z.array(texto(240)).min(1).max(6),
  ejemplo: EjemploSchema,
})

export const NivelSchema = z
  .object({
    id: clave,
    title: texto(80),
    text: texto(300),
    objetivo: texto(200),
    /** Vacío = "Próximamente"; al agregar una actividad el nivel se activa solo. */
    actividades: z.array(ActividadSchema).max(12),
  })
  .refine((n) => new Set(n.actividades.map((a) => a.id)).size === n.actividades.length, {
    message: "Hay actividades con el mismo id",
    path: ["actividades"],
  })

export const SeccionSchema = z.object({ id: clave, title: texto(80), subtitle: texto(80) })

export const CatalogoSchema = z
  .object({ seccion: SeccionSchema, niveles: z.array(NivelSchema).min(1).max(20) })
  .refine((c) => new Set(c.niveles.map((n) => n.id)).size === c.niveles.length, {
    message: "Hay niveles con el mismo id",
    path: ["niveles"],
  })

export type Ejemplo = z.infer<typeof EjemploSchema>
export type ActividadCatalogo = z.infer<typeof ActividadSchema>
export type NivelCatalogo = z.infer<typeof NivelSchema>
export type Catalogo = z.infer<typeof CatalogoSchema>

import type { ActividadCatalogo, Catalogo, NivelCatalogo } from "@/lib/contenido-schema"

export type { ActividadCatalogo, Catalogo, NivelCatalogo, Ejemplo, Juego } from "@/lib/contenido-schema"

/**
 * Contenido inicial de las misiones. La fuente de verdad en ejecución es la base de datos (`lib/contenido.ts`):
 * esto es la carga inicial (la migración `20261110010000_contenido_misiones` inserta lo mismo) y la reserva si la
 * base no está disponible. Una prueba comprueba que cumple el esquema y que la migración no se desvía.
 */
export const CATALOGO_INICIAL: Catalogo = {
  seccion: { id: "1", title: "Explora tu lógica", subtitle: "Fundamentos" },
  niveles: [
    {
      id: "1",
      title: "Reconocimiento de patrones",
      text: "Aprende a identificar patrones y secuencias en diferentes contextos.",
      objetivo: "Reconocer la regla de un patrón y usarla para continuarlo o encontrar lo que no encaja.",
      actividades: [
        {
          id: "1",
          title: "Observa y reconoce",
          descripcion: "Identifica la regla de un patrón visual y elige el elemento que sigue en la secuencia.",
          objetivo: "Identificar la regla de una secuencia y elegir el elemento que sigue.",
          minutos: 3,
          juego: "reconocer",
          reglas: [
            "Observa la secuencia: se repite siguiendo una regla.",
            "Elige, entre las opciones, la ficha que continúa la secuencia.",
            "Si te equivocas pierdes una vida; al final repasas las rondas falladas.",
            "Puedes pedir hasta 3 pistas por ronda; las pistas no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["🔴", "🔵", "🔴", "🔵", "🔴", "❔"],
            respuesta: ["🔵"],
            explicacion: "La regla es alternar rojo y azul. Después del círculo rojo viene el azul.",
          },
        },
        {
          id: "2",
          title: "Encuentra el intruso",
          descripcion: "Observa la secuencia y detecta el elemento que no pertenece al patrón.",
          objetivo: "Detectar el elemento que rompe la regla del patrón.",
          minutos: 3,
          juego: "intruso",
          reglas: [
            "Casi todas las fichas siguen la misma regla; una no encaja.",
            "Toca la ficha que no pertenece al patrón.",
            "Si te equivocas pierdes una vida; al final repasas las rondas falladas.",
            "Puedes pedir hasta 3 pistas por ronda; las pistas no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["🔺", "🔺", "⭐", "🔺", "🔺"],
            resaltar: 2,
            respuesta: ["⭐"],
            explicacion: "Todas son triángulos menos la estrella: ella es el intruso.",
          },
        },
        {
          id: "3",
          title: "Completa el patrón",
          descripcion: "Algunos espacios están en blanco: elige las fichas que completan el patrón.",
          objetivo: "Completar los huecos de un patrón aplicando su regla.",
          minutos: 3,
          juego: "completa",
          reglas: [
            "Observa la secuencia: algunos espacios están vacíos.",
            "Haz clic en las opciones para colocar la ficha correcta en cada hueco.",
            "Comprueba tu respuesta cuando hayas llenado todos los huecos.",
            "Puedes pedir hasta 3 pistas por patrón; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["🟢", "🟡", "🟢", "❔", "🟢", "❔"],
            respuesta: ["🟡", "🟡"],
            explicacion: "La regla es alternar verde y amarillo, así que cada hueco lleva un círculo amarillo.",
          },
        },
      ],
    },
    {
      id: "2",
      title: "Secuencias y Series",
      text: "Descubre cómo se forman las secuencias y encuentra el siguiente elemento.",
      objetivo: "Ordenar pasos y construir secuencias de instrucciones.",
      actividades: [],
    },
    {
      id: "3",
      title: "Lógica de Secuencias",
      text: "Completa secuencias y deduce las reglas ocultas detrás de los patrones.",
      objetivo: "Deducir la regla oculta detrás de una secuencia.",
      actividades: [],
    },
  ],
}

// ---------- consultas sobre un catálogo (puro: sirve en cliente y servidor) ----------

/** Duración estimada de un nivel: suma de la de sus actividades. */
export const minutosNivel = (n: NivelCatalogo) => n.actividades.reduce((t, a) => t + a.minutos, 0)

export const buscarNivel = (cat: Catalogo, seccionId: string, nivelId: string): NivelCatalogo | undefined =>
  seccionId === cat.seccion.id ? cat.niveles.find((n) => n.id === nivelId) : undefined

export const buscarActividad = (cat: Catalogo, seccionId: string, nivelId: string, actividadId: string): ActividadCatalogo | undefined =>
  buscarNivel(cat, seccionId, nivelId)?.actividades.find((a) => a.id === actividadId)

/** El nivel que sigue al indicado, si existe. */
export const siguienteNivel = (cat: Catalogo, nivelId: string): NivelCatalogo | undefined => {
  const i = cat.niveles.findIndex((n) => n.id === nivelId)
  return i >= 0 ? cat.niveles[i + 1] : undefined
}

/** Catálogo de misiones visible en la app y en el panel de administración. Fuente única de objetivo y duración. */
export const SECCION = { id: "1", title: "Explora tu lógica", subtitle: "Fundamentos" }

/** Ejemplo resuelto que se muestra antes de jugar. Es estático: no cuenta como intento ni toca el progreso. */
export interface EjemploCatalogo {
  /** Fichas (tokens de `Glyph`); "❔" marca un hueco. */
  secuencia: string[]
  /** Posición de la ficha que se destaca (p. ej. el intruso). */
  resaltar?: number
  /** Fichas de la respuesta correcta. */
  respuesta: string[]
  explicacion: string
}

export interface ActividadCatalogo {
  id: string
  /** Una frase: qué sabrá hacer el estudiante al terminar. */
  objetivo: string
  /** Duración estimada en minutos. Provisional hasta acordarla con el equipo (P7: la mayoría prefiere 5-10 min). */
  minutos: number
  /** Cómo se juega, en pasos cortos. */
  reglas: string[]
  ejemplo: EjemploCatalogo
}

export interface NivelCatalogo {
  id: string
  title: string
  text: string
  objetivo: string
  /** Actividades jugables del nivel. Vacío = "Próximamente"; al agregar una, el nivel se activa solo. */
  actividades: ActividadCatalogo[]
}

export const NIVELES: NivelCatalogo[] = [
  {
    id: "1",
    title: "Reconocimiento de patrones",
    text: "Aprende a identificar patrones y secuencias en diferentes contextos.",
    objetivo: "Reconocer la regla de un patrón y usarla para continuarlo o encontrar lo que no encaja.",
    actividades: [
      {
        id: "1",
        objetivo: "Identificar la regla de una secuencia y elegir el elemento que sigue.",
        minutos: 3,
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
        objetivo: "Detectar el elemento que rompe la regla del patrón.",
        minutos: 3,
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
        objetivo: "Completar los huecos de un patrón aplicando su regla.",
        minutos: 3,
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
]

/** Duración estimada de un nivel: suma de la de sus actividades. */
export const minutosNivel = (n: NivelCatalogo) => n.actividades.reduce((t, a) => t + a.minutos, 0)

export const buscarNivel = (seccionId: string, nivelId: string) =>
  seccionId === SECCION.id ? NIVELES.find((n) => n.id === nivelId) : undefined

export const buscarActividad = (seccionId: string, nivelId: string, actividadId: string) =>
  buscarNivel(seccionId, nivelId)?.actividades.find((a) => a.id === actividadId)

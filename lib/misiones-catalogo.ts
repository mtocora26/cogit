/** Catálogo de misiones visible en la app y en el panel de administración. Fuente única de objetivo y duración. */
export const SECCION = { id: "1", title: "Explora tu lógica", subtitle: "Fundamentos" }

export interface ActividadCatalogo {
  id: string
  /** Una frase: qué sabrá hacer el estudiante al terminar. */
  objetivo: string
  /** Duración estimada en minutos. Provisional hasta acordarla con el equipo (P7: la mayoría prefiere 5-10 min). */
  minutos: number
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
      { id: "1", objetivo: "Identificar la regla de una secuencia y elegir el elemento que sigue.", minutos: 3 },
      { id: "2", objetivo: "Detectar el elemento que rompe la regla del patrón.", minutos: 3 },
      { id: "3", objetivo: "Completar los huecos de un patrón aplicando su regla.", minutos: 3 },
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

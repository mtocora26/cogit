/**
 * Ejercicios del nivel 4 (descomposición y depuración): dividir una tarea en subtareas, encontrar el paso con error
 * en una secuencia y depurar la ejecución de un programa. Sin imports de interfaz; cada ronda es JSON serializable.
 */
import { TAREAS, aplicar, generarEjecutar, textoOperacion, traza, type Operacion } from "@/lib/algoritmos"
import { barajar, elegir, entero, type Dificultad, type Rng } from "@/lib/generador-patrones"

export { dificultadDeRonda } from "@/lib/generador-patrones"

export interface Resultado {
  correcto: boolean
  explicacion: string
}

// ---------- 1. Dividir una tarea en subtareas ----------

interface Subtarea {
  nombre: string
  /** Para qué sirve esa parte de la tarea. */
  objetivo: string
  pasos: [string, string]
}

interface TareaGrande {
  id: string
  titulo: string
  subtareas: Subtarea[]
}

export const TAREAS_GRANDES: TareaGrande[] = [
  {
    id: "fiesta",
    titulo: "Organizar una fiesta de cumpleaños",
    subtareas: [
      { nombre: "Invitaciones", objetivo: "avisar a las personas que vendrán", pasos: ["Hacer la lista de invitados", "Enviar los mensajes de invitación"] },
      { nombre: "Comida", objetivo: "tener qué comer y beber", pasos: ["Elegir el menú", "Comprar los ingredientes"] },
      { nombre: "Decoración", objetivo: "preparar el lugar", pasos: ["Inflar los globos", "Colgar la guirnalda"] },
    ],
  },
  {
    id: "exposicion",
    titulo: "Preparar una exposición en clase",
    subtareas: [
      { nombre: "Investigar", objetivo: "reunir la información del tema", pasos: ["Buscar información en dos libros", "Anotar las ideas principales"] },
      { nombre: "Diapositivas", objetivo: "armar el material que se muestra", pasos: ["Crear las diapositivas", "Añadir una imagen a cada una"] },
      { nombre: "Práctica", objetivo: "llegar seguro al momento de hablar", pasos: ["Ensayar frente al espejo", "Cronometrar el tiempo de la charla"] },
    ],
  },
  {
    id: "excursion",
    titulo: "Hacer una excursión",
    subtareas: [
      { nombre: "Equipaje", objetivo: "llevar lo necesario", pasos: ["Guardar el agua y la comida", "Poner ropa de abrigo en la mochila"] },
      { nombre: "Ruta", objetivo: "saber por dónde y cuánto se camina", pasos: ["Elegir el camino en el mapa", "Calcular cuánto dura el recorrido"] },
      { nombre: "Permisos", objetivo: "contar con la autorización de los adultos", pasos: ["Pedir autorización a los padres", "Avisar al profesor de la hora de salida"] },
    ],
  },
  {
    id: "limpieza",
    titulo: "Limpiar la casa",
    subtareas: [
      { nombre: "Cocina", objetivo: "dejar limpia la zona de comer", pasos: ["Lavar los platos", "Limpiar la mesa de la cocina"] },
      { nombre: "Baño", objetivo: "dejar limpia la zona de aseo", pasos: ["Fregar el lavabo", "Limpiar el espejo del baño"] },
      { nombre: "Habitación", objetivo: "dejar ordenado el lugar de dormir", pasos: ["Hacer la cama", "Guardar la ropa en el armario"] },
    ],
  },
  {
    id: "videojuego",
    titulo: "Crear un videojuego sencillo",
    subtareas: [
      { nombre: "Diseño", objetivo: "decidir cómo se ve el juego", pasos: ["Dibujar los personajes", "Elegir los colores del escenario"] },
      { nombre: "Programación", objetivo: "hacer que el juego funcione", pasos: ["Programar el movimiento del jugador", "Programar el puntaje"] },
      { nombre: "Pruebas", objetivo: "asegurar que no falle", pasos: ["Jugar para buscar fallos", "Corregir los fallos encontrados"] },
    ],
  },
  {
    id: "mascota",
    titulo: "Cuidar una mascota",
    subtareas: [
      { nombre: "Alimentación", objetivo: "que coma y beba bien", pasos: ["Servir la comida en su plato", "Rellenar el agua"] },
      { nombre: "Higiene", objetivo: "mantenerla limpia", pasos: ["Cepillar su pelo", "Bañarla cuando esté sucia"] },
      { nombre: "Salud", objetivo: "cuidar que no enferme", pasos: ["Llevarla al veterinario", "Anotar la fecha de las vacunas"] },
    ],
  },
]

export interface RondaSubtareas {
  tareaId: string
  titulo: string
  subtareas: { nombre: string; objetivo: string }[]
  /** Pasos mezclados que hay que repartir. */
  pasos: string[]
  /** Subtarea correcta de cada paso. */
  solucion: Record<string, string>
}

export function generarSubtareas(dificultad: Dificultad, opts: { rng?: Rng; usadas?: Set<string> } = {}): RondaSubtareas {
  const rng = opts.rng ?? Math.random
  const usadas = opts.usadas ?? new Set<string>()
  const libres = TAREAS_GRANDES.filter((t) => !usadas.has(t.id))
  const t = elegir(rng, libres.length ? libres : TAREAS_GRANDES)
  usadas.add(t.id)
  const partes = barajar(rng, t.subtareas).slice(0, dificultad === "baja" ? 2 : 3)
  const solucion: Record<string, string> = {}
  for (const p of partes) for (const paso of p.pasos) solucion[paso] = p.nombre
  return {
    tareaId: t.id,
    titulo: t.titulo,
    subtareas: partes.map((p) => ({ nombre: p.nombre, objetivo: p.objetivo })),
    pasos: barajar(rng, Object.keys(solucion)),
    solucion,
  }
}

/** `reparto` asigna a cada paso el nombre de una subtarea. */
export function revisarSubtareas(r: RondaSubtareas, reparto: Record<string, string>): Resultado {
  const mal = r.pasos.filter((p) => reparto[p] !== r.solucion[p])
  if (mal.length === 0) {
    return { correcto: true, explicacion: "¡Correcto! Cada paso quedó en la parte de la tarea a la que ayuda: así una tarea grande se vuelve varias pequeñas." }
  }
  const p = mal[0]
  const elegida = r.subtareas.find((s) => s.nombre === reparto[p])
  const aciertos = r.pasos.length - mal.length
  return {
    correcto: false,
    explicacion: `Acertaste ${aciertos} de ${r.pasos.length}. Por ejemplo, «${p}» no va en «${elegida?.nombre ?? "—"}»${elegida ? ` (que sirve para ${elegida.objetivo})` : ""}. Piensa a qué parte de la tarea ayuda ese paso.`,
  }
}

export function pistasSubtareas(r: RondaSubtareas): string[] {
  const porParte = r.subtareas.map((s) => `${s.nombre}: ${Object.keys(r.solucion).filter((p) => r.solucion[p] === s.nombre).map((p) => `«${p}»`).join(" y ")}`)
  return [
    "Descomponer es partir una tarea grande en partes pequeñas. Lee cada parte y para qué sirve.",
    `Cada parte tiene su objetivo: ${r.subtareas.map((s) => `${s.nombre} sirve para ${s.objetivo}`).join("; ")}.`,
    `El reparto correcto es — ${porParte.join(" — ")}.`,
  ]
}

// ---------- 2. Encontrar el paso con error ----------

export type TipoError = "ajeno" | "fuera-de-lugar"

export interface RondaError {
  tareaId: string
  titulo: string
  /** Pasos tal como se muestran (con el error). */
  pasos: string[]
  /** Índice del paso con error. */
  error: number
  tipo: TipoError
  /** Por qué el paso erróneo no puede estar donde está. */
  razon: string
}

export function generarError(dificultad: Dificultad, opts: { rng?: Rng; usadas?: Set<string> } = {}): RondaError {
  const rng = opts.rng ?? Math.random
  const usadas = opts.usadas ?? new Set<string>()
  const libres = TAREAS.filter((t) => !usadas.has(t.id))
  const t = elegir(rng, libres.length ? libres : TAREAS)
  usadas.add(t.id)
  const n = t.pasos.length

  if (dificultad === "baja") {
    // Un paso que no pertenece a la tarea, colgado en medio.
    const extra = elegir(rng, t.distractores)
    const pos = entero(rng, 1, n - 1)
    const pasos = [...t.pasos.slice(0, pos), extra, ...t.pasos.slice(pos)]
    return { tareaId: t.id, titulo: t.titulo, pasos, error: pos, tipo: "ajeno", razon: `«${extra}» no forma parte de «${t.titulo}».` }
  }

  // Un paso movido al menos dos lugares: así es el único que explica el desorden (mover solo uno sería ambiguo).
  for (let i = 0; i < 200; i++) {
    const de = entero(rng, 0, n - 1)
    const a = entero(rng, 0, n - 1)
    if (Math.abs(de - a) < 2) continue
    const resto = t.pasos.filter((_, k) => k !== de)
    const pasos = [...resto.slice(0, a), t.pasos[de], ...resto.slice(a)]
    const razon = de > 0 ? t.razones[de - 1] : t.razones[0]
    return { tareaId: t.id, titulo: t.titulo, pasos, error: a, tipo: "fuera-de-lugar", razon }
  }
  // Reserva (no debería usarse): el último paso al principio.
  const pasos = [t.pasos[n - 1], ...t.pasos.slice(0, n - 1)]
  return { tareaId: t.id, titulo: t.titulo, pasos, error: 0, tipo: "fuera-de-lugar", razon: t.razones[n - 2] }
}

export function revisarError(r: RondaError, elegido: number): Resultado {
  if (elegido === r.error) {
    return { correcto: true, explicacion: `¡Correcto! ${r.razon}` }
  }
  return {
    correcto: false,
    explicacion: `«${r.pasos[elegido]}» está bien donde está: lo que necesita ya se hizo antes. Busca el paso que ${r.tipo === "ajeno" ? "no tiene nada que ver con la tarea" : "depende de algo que todavía no se hizo, o que debería ir en otro momento"}.`,
  }
}

export function pistasError(r: RondaError): string[] {
  return [
    "Lee los pasos en orden y, en cada uno, pregúntate: ¿ya se hizo todo lo que este paso necesita?",
    r.tipo === "ajeno" ? "Hay un paso que no pertenece a esta tarea." : "Todos los pasos son de la tarea, pero uno está en un momento que no le toca.",
    `El paso con error es el número ${r.error + 1}: «${r.pasos[r.error]}».`,
  ]
}

// ---------- 3. Depurar la ejecución de un programa ----------

export interface RondaDepurar {
  inicio: number
  operaciones: Operacion[]
  /** Valor que muestra cada línea tras ejecutarse (en una sola hay un valor equivocado; las siguientes lo arrastran). */
  mostrado: number[]
  /** Valor correcto tras cada línea. */
  correcto: number[]
  /** Línea (0…) donde se cometió el error. */
  error: number
  dificultad: Dificultad
}

export function generarDepurar(dificultad: Dificultad, opts: { rng?: Rng } = {}): RondaDepurar {
  const rng = opts.rng ?? Math.random
  for (let intento = 0; intento < 300; intento++) {
    const base = generarEjecutar(dificultad, { rng })
    const t = traza(base.inicio, base.operaciones)
    const n = base.operaciones.length
    const error = entero(rng, 0, n - 1)
    const delta = elegir(rng, [-3, -2, -1, 1, 2, 3])
    const mostrado: number[] = []
    let ok = true
    for (let i = 0; i < n; i++) {
      const prev = i === 0 ? base.inicio : mostrado[i - 1]
      const v = i < error ? t[i + 1] : i === error ? t[i + 1] + delta : aplicar(prev, base.operaciones[i])
      if (v < 0 || v > 999) ok = false
      mostrado.push(v)
    }
    if (!ok) continue
    return { inicio: base.inicio, operaciones: base.operaciones, mostrado, correcto: t.slice(1), error, dificultad }
  }
  // Reserva (no debería usarse).
  return {
    inicio: 2,
    operaciones: [{ id: "suma", n: 3 }, { id: "duplica" }, { id: "resta", n: 2 }],
    mostrado: [5, 11, 9],
    correcto: [5, 10, 8],
    error: 1,
    dificultad,
  }
}

export const valorPrevio = (r: RondaDepurar, linea: number) => (linea === 0 ? r.inicio : r.mostrado[linea - 1])

export function revisarDepurar(r: RondaDepurar, elegida: number): Resultado {
  const op = (i: number) => textoOperacion(r.operaciones[i]).toLowerCase()
  if (elegida === r.error) {
    return {
      correcto: true,
      explicacion: `¡Correcto! En la línea ${r.error + 1}, partiendo de ${valorPrevio(r, r.error)}, «${op(r.error)}» da ${r.correcto[r.error]}, no ${r.mostrado[r.error]}. Las líneas siguientes parecen bien porque siguen desde el valor equivocado.`,
    }
  }
  const comprobacion = `En la línea ${elegida + 1}, partiendo de ${valorPrevio(r, elegida)}, «${op(elegida)}» sí da ${r.mostrado[elegida]}: esa cuenta está bien.`
  const arrastre = elegida > r.error ? " Ojo: un error se arrastra, así que las líneas siguientes pueden parecer bien aunque partan de un valor equivocado." : ""
  return { correcto: false, explicacion: `${comprobacion}${arrastre} Comprueba cada línea con el valor de la anterior.` }
}

export function pistasDepurar(r: RondaDepurar): string[] {
  const n = r.operaciones.length
  return [
    "Comprueba cada línea por separado: toma el valor de la línea anterior, aplica la instrucción y compara con lo que dice la línea.",
    r.error === 0
      ? "El error está al principio del programa, en una de las dos primeras líneas."
      : `${r.error === 1 ? "La línea 1 está bien" : `Las líneas 1 a ${r.error} están bien`}: el error está entre las líneas ${r.error + 1} y ${n}.`,
    `El error está en la línea ${r.error + 1}: ${textoOperacion(r.operaciones[r.error])} a partir de ${valorPrevio(r, r.error)} da ${r.correcto[r.error]}, no ${r.mostrado[r.error]}.`,
  ]
}

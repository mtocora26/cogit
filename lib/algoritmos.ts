/**
 * Ejercicios del nivel 2 (algoritmos): ordenar los pasos de una tarea, completar una secuencia de instrucciones
 * y ejecutar a mano un algoritmo corto. No importa nada de la interfaz: sirve en el cliente, el servidor y las pruebas.
 * Todo es texto (sin emojis ni color como única señal) y cada ronda se puede guardar como JSON para retomarla.
 */
import { barajar, elegir, entero, type Dificultad, type Rng } from "@/lib/generador-patrones"

export { dificultadDeRonda } from "@/lib/generador-patrones"

// ---------- tareas cotidianas ----------

export interface Tarea {
  id: string
  titulo: string
  /** Pasos en el orden correcto. */
  pasos: string[]
  /** `razones[i]` explica por qué el paso `i` va antes que el paso `i + 1`. */
  razones: string[]
  /** Pasos plausibles que NO pertenecen a la tarea. */
  distractores: [string, string]
}

export const TAREAS: Tarea[] = [
  {
    id: "dientes",
    titulo: "Lavarse los dientes",
    pasos: ["Poner pasta en el cepillo", "Cepillar todos los dientes", "Enjuagar la boca con agua", "Guardar el cepillo"],
    razones: [
      "Sin pasta en el cepillo, cepillar no limpia lo mismo.",
      "El enjuague se hace al terminar de cepillar, para quitar la espuma.",
      "El cepillo se guarda cuando ya terminaste de usarlo.",
    ],
    distractores: ["Peinarse frente al espejo", "Secar el cepillo con el secador de pelo"],
  },
  {
    id: "sandwich",
    titulo: "Preparar un sándwich",
    pasos: ["Lavarse las manos", "Poner el jamón sobre el pan", "Tapar con la otra rebanada", "Cortar el sándwich por la mitad"],
    razones: [
      "Primero se limpian las manos, antes de tocar la comida.",
      "El jamón se coloca antes de tapar, o quedaría fuera.",
      "Solo se puede cortar un sándwich que ya está armado.",
    ],
    distractores: ["Meter el pan al refrigerador una hora", "Servir la sopa en un plato"],
  },
  {
    id: "mochila",
    titulo: "Preparar la mochila para el colegio",
    pasos: ["Revisar el horario de clases", "Sacar los cuadernos de hoy", "Guardar los cuadernos en la mochila", "Cerrar la mochila"],
    razones: [
      "El horario dice qué materias hay; sin él no sabes qué cuadernos necesitas.",
      "Antes de guardar los cuadernos hay que tenerlos en la mano.",
      "La mochila se cierra cuando ya tiene todo adentro.",
    ],
    distractores: ["Lavar la mochila en la lavadora", "Regalar los cuadernos viejos"],
  },
  {
    id: "planta",
    titulo: "Plantar una semilla",
    pasos: ["Llenar la maceta con tierra", "Hacer un hoyo pequeño", "Poner la semilla en el hoyo", "Regar con un poco de agua"],
    razones: [
      "Sin tierra en la maceta no hay dónde hacer el hoyo.",
      "La semilla necesita un hoyo ya hecho donde quedar.",
      "Se riega al final, cuando la semilla ya está en su lugar.",
    ],
    distractores: ["Arrancar las hojas de la planta", "Pintar la maceta de azul y dejarla secar"],
  },
  {
    id: "bicicleta",
    titulo: "Salir en bicicleta",
    pasos: ["Ponerse el casco", "Revisar que las llantas tengan aire", "Subirse a la bicicleta", "Empezar a pedalear"],
    razones: [
      "La protección va primero, antes de cualquier otra cosa.",
      "Las llantas se revisan antes de subirte, mientras la bicicleta está quieta.",
      "No se puede pedalear sin estar sobre la bicicleta.",
    ],
    distractores: ["Guardar la bicicleta en el garaje", "Inflar el balón de fútbol"],
  },
  {
    id: "lavar-ropa",
    titulo: "Lavar la ropa",
    pasos: ["Separar la ropa blanca de la de color", "Meter la ropa en la lavadora", "Poner el jabón y encender la lavadora", "Tender la ropa para que se seque"],
    razones: [
      "Se separa antes de meter la ropa, para no mezclar colores.",
      "El jabón y el encendido se hacen con la ropa ya adentro.",
      "Solo se tiende la ropa cuando el lavado terminó.",
    ],
    distractores: ["Planchar la ropa sucia", "Comprar una camisa nueva"],
  },
  {
    id: "mensaje",
    titulo: "Enviar un mensaje a un amigo",
    pasos: ["Abrir la aplicación de mensajes", "Elegir el chat del amigo", "Escribir el mensaje", "Pulsar el botón de enviar"],
    razones: [
      "Hay que abrir la aplicación antes de usar sus chats.",
      "Primero se decide a quién va, y luego se escribe.",
      "Solo se puede enviar un mensaje que ya está escrito.",
    ],
    distractores: ["Apagar el teléfono", "Borrar todos los chats"],
  },
  {
    id: "te",
    titulo: "Preparar un té",
    pasos: ["Hervir agua", "Poner la bolsita de té en la taza", "Verter el agua caliente en la taza", "Esperar tres minutos y retirar la bolsita"],
    razones: [
      "El agua tarda en hervir, así que se pone primero.",
      "La bolsita debe estar en la taza antes de verter el agua sobre ella.",
      "El té se infusiona con el agua ya servida; por eso se espera después.",
    ],
    distractores: ["Congelar la taza toda la noche", "Añadir sal a la bolsita"],
  },
]

/** Mezcla los pasos asegurando que el resultado NO sea el orden correcto. */
function mezclarPasos(rng: Rng, pasos: string[]): string[] {
  for (let i = 0; i < 20; i++) {
    const m = barajar(rng, pasos)
    if (m.some((p, k) => p !== pasos[k])) return m
  }
  return [...pasos.slice(1), pasos[0]]
}

/** Elige una tarea; mientras queden libres, las rondas de una misma partida no la repiten. */
function tareaDeRonda(rng: Rng, usadas: Set<string>): Tarea {
  const libres = TAREAS.filter((t) => !usadas.has(t.id))
  const t = elegir(rng, libres.length ? libres : TAREAS)
  usadas.add(t.id)
  return t
}

// ---------- 1. Ordenar los pasos ----------

export interface RondaOrden {
  tareaId: string
  titulo: string
  /** Orden correcto, para verificar y para la última pista. */
  pasos: string[]
  razones: string[]
  /** Lo que se le muestra al estudiante, desordenado. */
  mezclados: string[]
}

export function generarOrden(opts: { rng?: Rng; usadas?: Set<string> } = {}): RondaOrden {
  const rng = opts.rng ?? Math.random
  const t = tareaDeRonda(rng, opts.usadas ?? new Set())
  return { tareaId: t.id, titulo: t.titulo, pasos: t.pasos, razones: t.razones, mezclados: mezclarPasos(rng, t.pasos) }
}

export interface ResultadoOrden {
  correcto: boolean
  /** Explicación que enseña la dependencia entre pasos, sin dar el orden completo. */
  explicacion: string
}

export function revisarOrden(r: RondaOrden, respuesta: string[]): ResultadoOrden {
  const pos = (p: string) => r.pasos.indexOf(p)
  if (respuesta.length === r.pasos.length && respuesta.every((p, i) => p === r.pasos[i])) {
    return { correcto: true, explicacion: `¡Correcto! ${r.razones.join(" ")}` }
  }
  // Primer par contiguo que está al revés: se nombra y se explica la dependencia.
  for (let k = 0; k < respuesta.length - 1; k++) {
    const a = respuesta[k]
    const b = respuesta[k + 1]
    if (pos(a) > pos(b)) {
      const razon = r.razones[pos(b)] ?? ""
      return {
        correcto: false,
        explicacion: `«${b}» tiene que hacerse antes que «${a}». ${razon}`.trim(),
      }
    }
  }
  // Orden relativo correcto entre vecinos pero faltan o sobran pasos (no debería ocurrir con la interfaz).
  return { correcto: false, explicacion: "Revisa el orden: cada paso depende de que el anterior ya esté hecho." }
}

export function pistasOrden(r: RondaOrden): string[] {
  return [
    "Piensa qué paso NO se puede hacer si antes no se hizo otro. Empieza buscando el primero de todos.",
    `El primer paso es «${r.pasos[0]}» y el último es «${r.pasos[r.pasos.length - 1]}».`,
    `El orden completo es: ${r.pasos.map((p, i) => `${i + 1}. ${p}`).join("; ")}.`,
  ]
}

// ---------- 2. Completar una secuencia de instrucciones ----------

export interface RondaInstrucciones {
  tareaId: string
  titulo: string
  pasos: string[]
  /** Índice del paso oculto (nunca el primero ni el último, para que haya vecinos que lo delimiten). */
  hueco: number
  /** Opciones en el orden mostrado; exactamente una es el paso oculto. */
  opciones: string[]
  razonAntes: string
  razonDespues: string
}

export function generarInstrucciones(opts: { rng?: Rng; usadas?: Set<string> } = {}): RondaInstrucciones {
  const rng = opts.rng ?? Math.random
  const t = tareaDeRonda(rng, opts.usadas ?? new Set())
  const hueco = entero(rng, 1, t.pasos.length - 2)
  return {
    tareaId: t.id,
    titulo: t.titulo,
    pasos: t.pasos,
    hueco,
    opciones: barajar(rng, [t.pasos[hueco], ...t.distractores]),
    razonAntes: t.razones[hueco - 1],
    razonDespues: t.razones[hueco],
  }
}

export function revisarInstrucciones(r: RondaInstrucciones, elegida: string): ResultadoOrden {
  const correcto = r.pasos[r.hueco]
  if (elegida === correcto) {
    return { correcto: true, explicacion: `¡Correcto! ${r.razonAntes} ${r.razonDespues}` }
  }
  const esDeLaTarea = r.pasos.includes(elegida)
  const previo = r.pasos[r.hueco - 1]
  const siguiente = r.pasos[r.hueco + 1]
  return {
    correcto: false,
    explicacion: esDeLaTarea
      ? `«${elegida}» ya aparece en la secuencia, en otro lugar. Aquí falta el paso que va justo después de «${previo}» y antes de «${siguiente}». ${r.razonAntes}`
      : `«${elegida}» no forma parte de «${r.titulo}». Aquí falta el paso que va justo después de «${previo}» y antes de «${siguiente}». ${r.razonAntes}`,
  }
}

export function pistasInstrucciones(r: RondaInstrucciones): string[] {
  const previo = r.pasos[r.hueco - 1]
  const siguiente = r.pasos[r.hueco + 1]
  return [
    "Lee la secuencia completa y fíjate en lo que se hace justo antes y justo después del hueco.",
    `Descarta lo que no pertenece a la tarea. El paso que falta va entre «${previo}» y «${siguiente}». ${r.razonAntes}`,
    `El paso que falta es «${r.pasos[r.hueco]}».`,
  ]
}

// ---------- 3. Ejecutar a mano un algoritmo ----------

export type OperacionId = "suma" | "resta" | "duplica" | "triplica"
export interface Operacion {
  id: OperacionId
  n?: number
}

export const textoOperacion = (o: Operacion): string =>
  o.id === "suma" ? `Suma ${o.n}` : o.id === "resta" ? `Resta ${o.n}` : o.id === "duplica" ? "Duplica el valor" : "Triplica el valor"

export function aplicar(valor: number, o: Operacion): number {
  switch (o.id) {
    case "suma":
      return valor + (o.n ?? 0)
    case "resta":
      return valor - (o.n ?? 0)
    case "duplica":
      return valor * 2
    case "triplica":
      return valor * 3
  }
}

/** Valores tras cada instrucción, incluido el inicial: tiene `operaciones.length + 1` elementos. */
export function traza(inicio: number, operaciones: Operacion[]): number[] {
  const t = [inicio]
  for (const o of operaciones) t.push(aplicar(t[t.length - 1], o))
  return t
}

export interface RondaEjecutar {
  inicio: number
  operaciones: Operacion[]
  resultado: number
  /** Opciones numéricas mostradas; exactamente una es el resultado. */
  opciones: number[]
  /** Por cada opción incorrecta, el error que la produce (para explicar en vez de solo decir «mal»). */
  errores: Record<string, string>
  dificultad: Dificultad
}

const LARGO: Record<Dificultad, [number, number]> = { baja: [2, 3], media: [3, 4], alta: [4, 5] }
const TOPE = 99

function operacionAleatoria(rng: Rng, dificultad: Dificultad, valor: number): Operacion {
  const opciones: Operacion[] = []
  const max = dificultad === "baja" ? 5 : dificultad === "media" ? 8 : 9
  opciones.push({ id: "suma", n: entero(rng, 1, max) })
  if (valor > 1) opciones.push({ id: "resta", n: entero(rng, 1, Math.min(max, valor - 1)) })
  if (valor * 2 <= TOPE) opciones.push({ id: "duplica" })
  if (dificultad === "alta" && valor * 3 <= TOPE) opciones.push({ id: "triplica" })
  return elegir(rng, opciones)
}

const final = (inicio: number, ops: Operacion[]) => {
  const t = traza(inicio, ops)
  return t[t.length - 1]
}

/** Posibles resultados equivocados y la causa de cada uno; se descartan los que coinciden con el correcto. */
function distractoresEjecutar(inicio: number, ops: Operacion[], resultado: number): Map<number, string> {
  const out = new Map<number, string>()
  const poner = (v: number, causa: string) => {
    if (v !== resultado && v >= 0 && !out.has(v)) out.set(v, causa)
  }
  // Saltarse una instrucción.
  ops.forEach((o, i) => poner(final(inicio, ops.filter((_, k) => k !== i)), `Parece que te saltaste la instrucción ${i + 1} («${textoOperacion(o)}»).`))
  // Ejecutarlas en otro orden (de abajo hacia arriba).
  poner(final(inicio, [...ops].reverse()), "Parece que ejecutaste las instrucciones en otro orden: se hacen de arriba hacia abajo.")
  // Equivocarse en una cuenta (por uno): error típico al sumar o restar.
  poner(resultado + 1, "Parece que te equivocaste por uno en alguna cuenta.")
  poner(resultado - 1, "Parece que te equivocaste por uno en alguna cuenta.")
  poner(resultado + 2, "Parece que algún cálculo se desvió: comprueba el valor tras cada instrucción.")
  return out
}

export function generarEjecutar(dificultad: Dificultad, opts: { rng?: Rng } = {}): RondaEjecutar {
  const rng = opts.rng ?? Math.random
  const [min, max] = LARGO[dificultad]
  for (let intento = 0; intento < 200; intento++) {
    const inicio = entero(rng, 1, dificultad === "baja" ? 6 : 9)
    const largo = entero(rng, min, max)
    const operaciones: Operacion[] = []
    let valor = inicio
    for (let i = 0; i < largo; i++) {
      const o = operacionAleatoria(rng, dificultad, valor)
      operaciones.push(o)
      valor = aplicar(valor, o)
    }
    // Sin operaciones repetidas seguidas (se vería como un patrón, no como un algoritmo) ni valores fuera de rango.
    if (valor < 0 || valor > TOPE) continue
    if (operaciones.some((o, i) => i > 0 && o.id === operaciones[i - 1].id && o.n === operaciones[i - 1].n)) continue
    const candidatos = distractoresEjecutar(inicio, operaciones, valor)
    if (candidatos.size < 3) continue
    const elegidos = barajar(rng, [...candidatos.entries()]).slice(0, 3)
    const errores: Record<string, string> = {}
    for (const [v, causa] of elegidos) errores[String(v)] = causa
    return {
      inicio,
      operaciones,
      resultado: valor,
      opciones: barajar(rng, [valor, ...elegidos.map(([v]) => v)]),
      errores,
      dificultad,
    }
  }
  // Reserva determinista (no debería usarse): un algoritmo fijo y válido.
  const operaciones: Operacion[] = [{ id: "suma", n: 3 }, { id: "duplica" }, { id: "resta", n: 2 }]
  return {
    inicio: 2,
    operaciones,
    resultado: 8,
    opciones: [8, 7, 9, 5],
    errores: { "7": "Parece que te equivocaste por uno en alguna cuenta.", "9": "Parece que te equivocaste por uno en alguna cuenta.", "5": "Parece que te saltaste la instrucción 2 («Duplica el valor»)." },
    dificultad,
  }
}

export function revisarEjecutar(r: RondaEjecutar, elegida: number): ResultadoOrden {
  if (elegida === r.resultado) {
    return { correcto: true, explicacion: `¡Correcto! ${describirTraza(r)}` }
  }
  const causa = r.errores[String(elegida)] ?? "Ese valor no sale de ejecutar las instrucciones."
  return { correcto: false, explicacion: `${causa} Vuelve a ejecutarlas una por una y anota el valor después de cada una.` }
}

export function describirTraza(r: RondaEjecutar): string {
  const t = traza(r.inicio, r.operaciones)
  return `Empiezas con ${t[0]}. ${r.operaciones.map((o, i) => `${i + 1}) ${textoOperacion(o)} → ${t[i + 1]}`).join("; ")}.`
}

export function pistasEjecutar(r: RondaEjecutar): string[] {
  const t = traza(r.inicio, r.operaciones)
  return [
    `Ejecuta una instrucción a la vez, de arriba hacia abajo, y anota el valor después de cada una. Empiezas con ${r.inicio}.`,
    `Después de la primera instrucción («${textoOperacion(r.operaciones[0])}») el valor es ${t[1]}.`,
    `${describirTraza(r)} El resultado final es ${r.resultado}.`,
  ]
}

/**
 * Ejercicios del nivel 3 (abstracción): clasificar según una regla oculta, «qué sobra» y reducir un problema a lo
 * esencial. Sin imports de interfaz: sirve en el cliente, el servidor y las pruebas. Cada ronda es JSON serializable.
 */
import { barajar, elegir, type Dificultad, type Rng } from "@/lib/generador-patrones"

export { dificultadDeRonda } from "@/lib/generador-patrones"

export interface Resultado {
  correcto: boolean
  /** Explica la regla o la categoría; no se limita a decir «mal». */
  explicacion: string
}

// ---------- 1. Clasificar según una regla oculta ----------

interface ReglaClasificar {
  id: string
  /** Descripción de cada grupo (se muestra al explicar, nunca antes de responder). */
  si: string
  no: string
  /** Sobre qué se fija la regla, para la segunda pista (sin darla). */
  tema: string
  universo: string[]
  test: (ficha: string) => boolean
  /** Reglas que se confunden con ésta en el mismo universo: los ejemplos deben descartarlas. */
  rivales?: string[]
}

const DIGITOS = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"]
const valor = (f: string) => DIGITOS.indexOf(f) + 1
const CALIDOS = ["🔴", "🟠", "🟡"]
const FRIOS = ["🔵", "🟢", "🟣"]
const RELLENAS = ["⭐", "🔶", "⬛", "🔺", "🔻"]
const CONTORNO = ["🔷", "⬜", "⭕"]

export const REGLAS_CLASIFICAR: ReglaClasificar[] = [
  {
    id: "calido",
    si: "colores cálidos (rojo, naranja y amarillo)",
    no: "colores fríos (verde, azul y violeta)",
    tema: "el color de la ficha",
    universo: [...CALIDOS, ...FRIOS],
    test: (f) => CALIDOS.includes(f),
  },
  {
    id: "relleno",
    si: "figuras rellenas",
    no: "figuras que solo tienen contorno",
    tema: "cómo está dibujada la figura",
    universo: [...RELLENAS, ...CONTORNO],
    test: (f) => RELLENAS.includes(f),
  },
  {
    id: "par",
    si: "números pares",
    no: "números impares",
    tema: "el valor del número",
    universo: DIGITOS,
    test: (f) => valor(f) % 2 === 0,
    rivales: ["mayor5"],
  },
  {
    id: "mayor5",
    si: "números mayores que 5",
    no: "números de 5 o menos",
    tema: "el valor del número",
    universo: DIGITOS,
    test: (f) => valor(f) > 5,
    rivales: ["par"],
  },
]

const POR_DIFICULTAD: Record<Dificultad, string[]> = {
  baja: ["calido", "relleno"],
  media: ["par", "mayor5"],
  alta: ["par", "mayor5"],
}

export interface RondaClasificar {
  regla: string
  tema: string
  /** Ejemplos ya clasificados en cada grupo. */
  grupoA: string[]
  grupoB: string[]
  descA: string
  descB: string
  /** Ficha nueva que hay que clasificar. */
  ficha: string
  respuesta: "A" | "B"
  dificultad: Dificultad
}

export function generarClasificar(dificultad: Dificultad, opts: { rng?: Rng } = {}): RondaClasificar {
  const rng = opts.rng ?? Math.random
  for (let intento = 0; intento < 500; intento++) {
    const id = elegir(rng, POR_DIFICULTAD[dificultad])
    const r = REGLAS_CLASIFICAR.find((x) => x.id === id)!
    const dentro = r.universo.filter(r.test)
    const fuera = r.universo.filter((f) => !r.test(f))
    const ejSi = barajar(rng, dentro).slice(0, dificultad === "baja" ? 2 : 3)
    const ejNo = barajar(rng, fuera).slice(0, dificultad === "baja" ? 2 : 3)
    const candidatas = [...dentro.filter((f) => !ejSi.includes(f)), ...fuera.filter((f) => !ejNo.includes(f))]
    if (candidatas.length === 0) continue
    // Los ejemplos deben descartar a las reglas rivales: o separan mal los grupos, o no los separan.
    const rivalValida = (id: string) => {
      const h = REGLAS_CLASIFICAR.find((x) => x.id === id)!
      const a = ejSi.map(h.test)
      const b = ejNo.map(h.test)
      const todoIgual = (xs: boolean[]) => xs.every((x) => x === xs[0])
      return todoIgual(a) && todoIgual(b) && a[0] !== b[0]
    }
    if ((r.rivales ?? []).some(rivalValida)) continue
    const ficha = elegir(rng, candidatas)
    // Con las reglas rivales descartadas, la ficha nueva solo tiene una lectura posible.
    const aEsSi = rng() < 0.5
    const [grupoA, grupoB] = aEsSi ? [ejSi, ejNo] : [ejNo, ejSi]
    return {
      regla: r.id,
      tema: r.tema,
      grupoA,
      grupoB,
      descA: aEsSi ? r.si : r.no,
      descB: aEsSi ? r.no : r.si,
      ficha,
      respuesta: r.test(ficha) === aEsSi ? "A" : "B",
      dificultad,
    }
  }
  // Reserva (no debería usarse).
  return {
    regla: "calido",
    tema: "el color de la ficha",
    grupoA: ["🔴", "🟠"],
    grupoB: ["🔵", "🟣"],
    descA: "colores cálidos (rojo, naranja y amarillo)",
    descB: "colores fríos (verde, azul y violeta)",
    ficha: "🟡",
    respuesta: "A",
    dificultad,
  }
}

export function revisarClasificar(r: RondaClasificar, elegida: "A" | "B", nombre: (f: string) => string): Resultado {
  const regla = `El grupo A reúne ${r.descA}; el grupo B, ${r.descB}.`
  if (elegida === r.respuesta) {
    return { correcto: true, explicacion: `¡Correcto! ${regla} La ficha «${nombre(r.ficha)}» encaja con el grupo ${r.respuesta}.` }
  }
  return {
    correcto: false,
    explicacion: `Esa no era. ${regla} Fíjate en la ficha «${nombre(r.ficha)}» y pregúntate a cuál de las dos descripciones corresponde.`,
  }
}

export function pistasClasificar(r: RondaClasificar, nombre: (f: string) => string): string[] {
  return [
    "Compara las fichas de un mismo grupo entre sí. ¿Qué tienen en común que no tengan las del otro grupo?",
    `La regla depende de ${r.tema}.`,
    `La regla es: grupo A = ${r.descA}; grupo B = ${r.descB}. Ahora decide dónde va «${nombre(r.ficha)}».`,
  ]
}

// ---------- 2. ¿Qué sobra? ----------

interface Categoria {
  id: string
  nombre: string
  miembros: string[]
  /** Categoría parecida: en dificultad media y alta el intruso sale de ella, así que cuesta más separarlos. */
  cercana: string
}

export const CATEGORIAS: Categoria[] = [
  { id: "frutas", nombre: "frutas", miembros: ["Manzana", "Pera", "Uva", "Fresa", "Mango", "Sandía"], cercana: "verduras" },
  { id: "verduras", nombre: "verduras", miembros: ["Zanahoria", "Lechuga", "Brócoli", "Cebolla", "Pepino", "Espinaca"], cercana: "frutas" },
  { id: "mamiferos", nombre: "mamíferos", miembros: ["Perro", "Gato", "Caballo", "Delfín", "Vaca", "Ballena"], cercana: "aves" },
  { id: "aves", nombre: "aves", miembros: ["Águila", "Loro", "Pingüino", "Gallina", "Búho", "Pato"], cercana: "mamiferos" },
  { id: "tierra", nombre: "vehículos que van por tierra", miembros: ["Bicicleta", "Autobús", "Camión", "Tren", "Moto", "Taxi"], cercana: "aire" },
  { id: "aire", nombre: "vehículos que van por el aire", miembros: ["Avión", "Helicóptero", "Globo aerostático", "Dron", "Planeador", "Parapente"], cercana: "tierra" },
  { id: "escolar", nombre: "útiles escolares", miembros: ["Lápiz", "Regla", "Borrador", "Cuaderno", "Compás", "Sacapuntas"], cercana: "cocina" },
  { id: "cocina", nombre: "utensilios de cocina", miembros: ["Cuchara", "Sartén", "Olla", "Tenedor", "Colador", "Cuchillo"], cercana: "escolar" },
]

const categoria = (id: string) => CATEGORIAS.find((c) => c.id === id)!

export interface RondaSobra {
  palabras: string[]
  /** Índice de la palabra que no pertenece. */
  impar: number
  categoria: string
  categoriaImpar: string
  dificultad: Dificultad
}

export function generarSobra(dificultad: Dificultad, opts: { rng?: Rng } = {}): RondaSobra {
  const rng = opts.rng ?? Math.random
  const c = elegir(rng, CATEGORIAS)
  const otra = dificultad === "baja" ? elegir(rng, CATEGORIAS.filter((x) => x.id !== c.id && x.id !== c.cercana)) : categoria(c.cercana)
  const n = dificultad === "alta" ? 4 : 3
  const mayoria = barajar(rng, c.miembros).slice(0, n)
  const intruso = elegir(rng, otra.miembros)
  const palabras = barajar(rng, [...mayoria, intruso])
  return { palabras, impar: palabras.indexOf(intruso), categoria: c.nombre, categoriaImpar: otra.nombre, dificultad }
}

export function revisarSobra(r: RondaSobra, elegida: number): Resultado {
  if (elegida === r.impar) {
    return { correcto: true, explicacion: `¡Correcto! Todas son ${r.categoria} menos «${r.palabras[r.impar]}», que pertenece a ${r.categoriaImpar}.` }
  }
  return {
    correcto: false,
    explicacion: `«${r.palabras[elegida]}» pertenece al mismo grupo que la mayoría: ${r.categoria}. Busca la palabra que habría que clasificar en otra categoría.`,
  }
}

export function pistasSobra(r: RondaSobra): string[] {
  return [
    "Piensa en un nombre de grupo que describa a casi todas las palabras. Después busca la que no entra en ese grupo.",
    `La mayoría de las palabras son ${r.categoria}.`,
    `Sobra «${r.palabras[r.impar]}»: es de ${r.categoriaImpar}.`,
  ]
}

// ---------- 3. Reducir el problema a lo esencial ----------

interface Problema {
  id: string
  pregunta: string
  esenciales: string[]
  irrelevantes: string[]
}

export const PROBLEMAS: Problema[] = [
  {
    id: "manzanas",
    pregunta: "¿Cuántas manzanas hay en total?",
    esenciales: ["Hay 3 cajas", "Cada caja tiene 4 manzanas"],
    irrelevantes: ["Las cajas son de color azul", "Las compraron el sábado", "Al lado de las cajas hay un perro"],
  },
  {
    id: "viaje",
    pregunta: "¿Cuántas horas tarda el autobús en llegar al pueblo?",
    esenciales: ["El pueblo está a 120 km", "El autobús avanza a 60 km por hora"],
    irrelevantes: ["El autobús es de color rojo", "El conductor se llama Luis", "Viajan 30 pasajeros"],
  },
  {
    id: "pizza",
    pregunta: "¿Cuánto paga cada amigo si dividen la cuenta en partes iguales?",
    esenciales: ["La cuenta es de 24 dólares", "Son 4 amigos"],
    irrelevantes: ["La pizza es de pepperoni", "Era el cumpleaños de Sara", "Afuera estaba lloviendo"],
  },
  {
    id: "galletas",
    pregunta: "¿Cuántas galletas salen en total?",
    esenciales: ["Cada bandeja lleva 12 galletas", "Se hornean 2 bandejas"],
    irrelevantes: ["El horno es nuevo", "Las galletas son de chocolate", "La receta es de la abuela"],
  },
  {
    id: "bicicleta",
    pregunta: "¿Cuánto dinero le falta a Leo para comprar la bicicleta?",
    esenciales: ["La bicicleta cuesta 90 dólares", "Leo ya ahorró 55 dólares"],
    irrelevantes: ["La bicicleta es verde", "Leo tiene 10 años", "La tienda queda frente al parque"],
  },
  {
    id: "libro",
    pregunta: "¿En cuántos días termina el libro?",
    esenciales: ["El libro tiene 120 páginas", "Lee 20 páginas al día"],
    irrelevantes: ["El libro trata de dragones", "Lo compró en una feria", "Tiene la tapa dura"],
  },
  {
    id: "pelicula",
    pregunta: "¿A qué hora termina la película?",
    esenciales: ["Empieza a las 4:00", "Dura 2 horas"],
    irrelevantes: ["Es una película animada", "Fueron con sus primos", "Compraron palomitas"],
  },
  {
    id: "pintura",
    pregunta: "¿Cuántos litros de pintura se necesitan?",
    esenciales: ["Hay 4 paredes por pintar", "Cada pared necesita 2 litros"],
    irrelevantes: ["El color elegido es amarillo", "La habitación es de Marta", "Las ventanas son grandes"],
  },
]

export interface RondaEsencial {
  problemaId: string
  pregunta: string
  /** Datos mostrados, mezclados. */
  datos: string[]
  esenciales: string[]
}

export function generarEsencial(opts: { rng?: Rng; usados?: Set<string> } = {}): RondaEsencial {
  const rng = opts.rng ?? Math.random
  const usados = opts.usados ?? new Set<string>()
  const libres = PROBLEMAS.filter((p) => !usados.has(p.id))
  const p = elegir(rng, libres.length ? libres : PROBLEMAS)
  usados.add(p.id)
  const sobrantes = barajar(rng, p.irrelevantes).slice(0, 3)
  return { problemaId: p.id, pregunta: p.pregunta, datos: barajar(rng, [...p.esenciales, ...sobrantes]), esenciales: p.esenciales }
}

export function revisarEsencial(r: RondaEsencial, marcados: string[]): Resultado {
  const sobran = marcados.filter((m) => !r.esenciales.includes(m))
  const faltan = r.esenciales.filter((e) => !marcados.includes(e))
  if (sobran.length === 0 && faltan.length === 0) {
    return { correcto: true, explicacion: "¡Correcto! Solo esos datos cambian la respuesta. El resto es contexto que se puede ignorar: eso es abstraer." }
  }
  const partes: string[] = []
  if (sobran.length > 0) {
    partes.push(
      `Marcaste ${sobran.length === 1 ? "un dato" : `${sobran.length} datos`} que no cambia${sobran.length === 1 ? "" : "n"} la respuesta, por ejemplo «${sobran[0]}»: si lo quitas, igual puedes resolver el problema.`,
    )
  }
  if (faltan.length > 0) {
    partes.push(`Te ${faltan.length === 1 ? "falta un dato que sí se necesita" : `faltan ${faltan.length} datos que sí se necesitan`} para llegar a la respuesta.`)
  }
  return { correcto: false, explicacion: partes.join(" ") }
}

export function pistasEsencial(r: RondaEsencial): string[] {
  return [
    "Por cada dato, pregúntate: si lo borro, ¿todavía puedo responder la pregunta? Si sí, es un detalle de relleno.",
    `Hacen falta exactamente ${r.esenciales.length} datos.`,
    `Los datos esenciales son: ${r.esenciales.map((e) => `«${e}»`).join(" y ")}.`,
  ]
}

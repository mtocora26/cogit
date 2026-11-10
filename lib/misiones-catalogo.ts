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
      title: "Secuencias y algoritmos",
      text: "Ordena pasos, completa instrucciones y ejecuta algoritmos cortos, sin escribir código.",
      objetivo: "Ordenar pasos y seguir instrucciones para llegar a un resultado.",
      actividades: [
        {
          id: "1",
          title: "Ordena los pasos",
          descripcion: "Una tarea de todos los días tiene sus pasos revueltos: déjalos en el orden en que se hacen.",
          objetivo: "Ordenar los pasos de una tarea según lo que depende de qué.",
          minutos: 3,
          juego: "ordenar",
          reglas: [
            "Verás los pasos de una tarea cotidiana en desorden.",
            "Usa las flechas de cada paso para subirlo o bajarlo hasta dejar el orden correcto.",
            "Pulsa «Comprobar el orden». Si te equivocas pierdes una vida y se te explica qué paso depende de cuál.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["Hablar con la persona", "Marcar el número", "Tomar el teléfono"],
            respuesta: ["Tomar el teléfono", "Marcar el número", "Hablar con la persona"],
            explicacion: "No puedes marcar sin tener el teléfono en la mano, ni hablar sin haber marcado: cada paso necesita el anterior.",
          },
        },
        {
          id: "2",
          title: "Completa las instrucciones",
          descripcion: "A una lista de instrucciones le falta un paso: elige el que encaja entre el anterior y el siguiente.",
          objetivo: "Deducir el paso que falta en una secuencia de instrucciones.",
          minutos: 3,
          juego: "instrucciones",
          reglas: [
            "Verás las instrucciones de una tarea con un hueco en el medio.",
            "Elige, entre las opciones, el paso que va en el hueco; ojo, no todas pertenecen a la tarea.",
            "Pulsa «Comprobar». Si te equivocas pierdes una vida y se te explica por qué ese paso no encaja.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["Tomar el teléfono", "❔", "Hablar con la persona"],
            resaltar: 1,
            respuesta: ["Marcar el número"],
            explicacion: "Entre tomar el teléfono y hablar hace falta marcar el número: sin él nadie contesta.",
          },
        },
        {
          id: "3",
          title: "Ejecuta el algoritmo",
          descripcion: "Sigue una lista corta de instrucciones, una por una, y averigua con qué número terminas.",
          objetivo: "Ejecutar a mano un algoritmo corto y obtener su resultado.",
          minutos: 4,
          juego: "ejecutar",
          reglas: [
            "Empiezas con un número y una lista de instrucciones.",
            "Aplícalas de arriba hacia abajo, una a la vez, y fíjate en el valor después de cada una.",
            "Elige con qué número terminas y pulsa «Comprobar». Si te equivocas pierdes una vida y se te dice qué error parece haber pasado.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["Empieza con 3", "Suma 2", "Duplica el valor"],
            respuesta: ["10"],
            explicacion: "3 y suma 2 es 5; duplicar 5 da 10. Si cambias el orden, el resultado cambia.",
          },
        },
      ],
    },
    {
      id: "3",
      title: "Abstracción",
      text: "Descubre reglas ocultas, agrupa por lo que tienen en común y quédate solo con lo que importa.",
      objetivo: "Quedarse con lo esencial: deducir reglas, agrupar por categorías e ignorar los detalles de relleno.",
      actividades: [
        {
          id: "1",
          title: "Clasifica con la regla oculta",
          descripcion: "Dos grupos de fichas siguen una regla que no se dice: descúbrela y clasifica una ficha nueva.",
          objetivo: "Deducir la regla que separa dos grupos y aplicarla a un caso nuevo.",
          minutos: 3,
          juego: "clasificar",
          reglas: [
            "Verás dos grupos, A y B, con fichas ya clasificadas por una regla que no se muestra.",
            "Compara las fichas de cada grupo para descubrir qué las separa.",
            "Elige a qué grupo va la ficha nueva y pulsa «Comprobar». Si te equivocas pierdes una vida y se te explica la regla.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["🔴", "🟠", "🔵", "🟣", "🟡"],
            resaltar: 4,
            respuesta: ["Grupo A"],
            explicacion: "A (rojo, naranja) tiene colores cálidos y B (azul, violeta) colores fríos. El amarillo es cálido, así que va con A.",
          },
        },
        {
          id: "2",
          title: "¿Qué sobra?",
          descripcion: "Casi todas las palabras pertenecen a un mismo grupo: encuentra la que no encaja.",
          objetivo: "Nombrar la categoría de un conjunto y detectar lo que no pertenece a ella.",
          minutos: 3,
          juego: "sobra",
          reglas: [
            "Verás varias palabras; todas son de la misma categoría menos una.",
            "Piensa qué nombre de grupo describe a la mayoría y toca la palabra que sobra.",
            "Pulsa «Comprobar». Si te equivocas pierdes una vida y se te dice cuál es la categoría.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["Manzana", "Pera", "Silla", "Uva"],
            resaltar: 2,
            respuesta: ["Silla"],
            explicacion: "Manzana, pera y uva son frutas. La silla es un mueble: pertenece a otra categoría.",
          },
        },
        {
          id: "3",
          title: "Quédate con lo esencial",
          descripcion: "Un problema trae datos útiles y otros de relleno: marca solo los que necesitas para resolverlo.",
          objetivo: "Reducir un problema a los datos que cambian su respuesta.",
          minutos: 4,
          juego: "esencial",
          reglas: [
            "Verás una pregunta y una lista de datos, algunos necesarios y otros de relleno.",
            "Por cada dato pregúntate: si lo borro, ¿todavía puedo responder?",
            "Marca solo los esenciales y pulsa «Comprobar». Si te equivocas pierdes una vida y se te dice qué sobra o qué falta.",
            "Puedes pedir hasta 3 pistas por ronda; no cuentan como error ni dan puntos.",
          ],
          ejemplo: {
            secuencia: ["Hay 2 cestas", "Cada cesta tiene 5 peras", "Las cestas son rojas"],
            resaltar: 2,
            respuesta: ["Hay 2 cestas", "Cada cesta tiene 5 peras"],
            explicacion: "Para saber cuántas peras hay basta con el número de cestas y las peras de cada una. El color no cambia la cuenta.",
          },
        },
      ],
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

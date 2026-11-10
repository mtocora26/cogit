// Ayuda de los nonogramas: pista que explica una fila o columna y tutorial paso a paso.

export interface SugerenciaNonograma {
  tipo: "fila" | "columna"
  /** Posición de la línea (empieza en 0). */
  indice: number
  /** Celdas de la línea que conviene marcar. */
  celdas: { row: number; col: number }[]
  /** 1 = rellenar, 2 = marcar con X. */
  valor: 1 | 2
  mensaje: string
}

/** Posiciones (0-based) que quedan rellenas en cualquier forma de colocar los bloques. */
export function celdasSeguras(pistas: number[], largo: number): number[] {
  if (pistas.length === 1 && pistas[0] === 0) return []
  const holgura = largo - (pistas.reduce((a, b) => a + b, 0) + pistas.length - 1)
  if (holgura < 0) return []
  const seguras: number[] = []
  let inicio = 0
  for (const bloque of pistas) {
    for (let k = holgura; k < bloque; k++) seguras.push(inicio + k)
    inicio += bloque + 1
  }
  return seguras
}

interface Analisis {
  posiciones: number[]
  valor: 1 | 2
  mensaje: string
}

function analizarLinea(tipo: "fila" | "columna", indice: number, estado: number[], pistas: number[]): Analisis | null {
  const numero = indice + 1
  const largo = estado.length
  const lista = pistas.join(" ")
  const total = pistas.reduce((a, b) => a + b, 0)
  const sinMarcar = estado.map((_, i) => i).filter((i) => estado[i] === 0)

  // 1) Línea vacía: todo va con X
  if (total === 0) {
    if (sinMarcar.length === 0) return null
    return {
      posiciones: sinMarcar,
      valor: 2,
      mensaje: `La ${tipo} ${numero} tiene la pista 0: no lleva ninguna celda rellena. Márcala con X.`,
    }
  }

  // 2) Solapamiento: celdas que se rellenan sí o sí
  const seguras = celdasSeguras(pistas, largo).filter((i) => estado[i] !== 1)
  if (seguras.length > 0) {
    const minimo = total + pistas.length - 1
    const motivo =
      minimo === largo
        ? `la pista ${lista} ocupa justo las ${largo} celdas (${total} rellenas y ${pistas.length - 1} separadores), así que no hay otra forma de colocarla`
        : `la pista ${lista} necesita ${minimo} de ${largo} celdas; sobran ${largo - minimo}, y los bloques grandes se solapan sea cual sea su posición`
    return {
      posiciones: seguras,
      valor: 1,
      mensaje: `En la ${tipo} ${numero}: ${motivo}. Rellena las celdas resaltadas.`,
    }
  }

  // 3) Línea completa: lo que queda va con X
  const llenas = estado.filter((c) => c === 1).length
  if (llenas === total && sinMarcar.length > 0) {
    return {
      posiciones: sinMarcar,
      valor: 2,
      mensaje: `La ${tipo} ${numero} ya tiene sus ${total} celdas rellenas (pista ${lista}). El resto queda vacío: márcalo con X.`,
    }
  }
  return null
}

/**
 * Busca una fila o columna donde se pueda avanzar con seguridad y explica la regla.
 * Si no encuentra nada seguro, devuelve null.
 */
export function sugerirPista(
  tablero: number[][],
  rowClues: number[][],
  colClues: number[][],
): SugerenciaNonograma | null {
  const candidatos: SugerenciaNonograma[] = []
  for (let r = 0; r < tablero.length; r++) {
    const a = analizarLinea("fila", r, tablero[r], rowClues[r])
    if (a) {
      candidatos.push({
        tipo: "fila",
        indice: r,
        celdas: a.posiciones.map((c) => ({ row: r, col: c })),
        valor: a.valor,
        mensaje: a.mensaje,
      })
    }
  }
  for (let c = 0; c < tablero[0].length; c++) {
    const a = analizarLinea("columna", c, tablero.map((fila) => fila[c]), colClues[c])
    if (a) {
      candidatos.push({
        tipo: "columna",
        indice: c,
        celdas: a.posiciones.map((r) => ({ row: r, col: c })),
        valor: a.valor,
        mensaje: a.mensaje,
      })
    }
  }
  if (candidatos.length === 0) return null
  // Primero rellenar y, dentro de eso, la línea con más celdas nuevas
  candidatos.sort((x, y) => (x.valor === y.valor ? y.celdas.length - x.celdas.length : x.valor - y.valor))
  return candidatos[0]
}

// ---------------------------------------------------------------------------
// Tutorial paso a paso (corazón 5x5)
// ---------------------------------------------------------------------------

export interface PasoTutorial {
  tipo: "fila" | "columna"
  indice: number
  /** 1 = rellenar, 2 = marcar con X. */
  valor: 1 | 2
  celdas: [number, number][]
  texto: string
}

export const TUTORIAL_SOLUCION = [
  [0, 1, 0, 1, 0],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1],
  [0, 1, 1, 1, 0],
  [0, 0, 1, 0, 0],
]

export const TUTORIAL_PISTAS_FILAS = [[1, 1], [5], [5], [3], [1]]
export const TUTORIAL_PISTAS_COLUMNAS = [[2], [4], [4], [4], [2]]

export const TUTORIAL_PASOS: PasoTutorial[] = [
  { tipo: "fila", indice: 1, valor: 1, celdas: [[1, 0], [1, 1], [1, 2], [1, 3], [1, 4]], texto: "La fila 2 dice 5 y mide 5 celdas: cabe un solo bloque que la ocupa entera. Rellénala." },
  { tipo: "fila", indice: 2, valor: 1, celdas: [[2, 0], [2, 1], [2, 2], [2, 3], [2, 4]], texto: "La fila 3 también dice 5: se rellena completa." },
  { tipo: "columna", indice: 1, valor: 1, celdas: [[3, 1]], texto: "La columna 2 dice 4 en 5 celdas. Sobra 1, así que las filas 2, 3 y 4 son seguras. Las dos primeras ya están; falta la fila 4." },
  { tipo: "columna", indice: 2, valor: 1, celdas: [[3, 2]], texto: "La columna 3 también dice 4: mismo razonamiento, la celda de la fila 4 es segura." },
  { tipo: "columna", indice: 3, valor: 1, celdas: [[3, 3]], texto: "Y la columna 4, igual: rellena la fila 4." },
  { tipo: "fila", indice: 3, valor: 2, celdas: [[3, 0], [3, 4]], texto: "La fila 4 dice 3 y ya tiene 3 celdas rellenas. Lo demás queda vacío: márcalo con X." },
  { tipo: "columna", indice: 0, valor: 2, celdas: [[0, 0], [4, 0]], texto: "La columna 1 dice 2 y ya tiene 2 rellenas. El resto va con X." },
  { tipo: "columna", indice: 4, valor: 2, celdas: [[0, 4], [4, 4]], texto: "La columna 5 dice 2 y ya las tiene. El resto va con X." },
  { tipo: "fila", indice: 0, valor: 1, celdas: [[0, 1], [0, 3]], texto: "La fila 1 dice 1 1 (dos bloques separados). Con los extremos tachados, solo caben en las columnas 2 y 4." },
  { tipo: "columna", indice: 1, valor: 2, celdas: [[4, 1]], texto: "La columna 2 dice 4 y ya tiene las filas 1 a 4. La fila 5 queda vacía." },
  { tipo: "columna", indice: 3, valor: 2, celdas: [[4, 3]], texto: "La columna 4 también está completa: la fila 5 queda vacía." },
  { tipo: "fila", indice: 4, valor: 1, celdas: [[4, 2]], texto: "La fila 5 dice 1 y solo queda libre la columna 3. ¡Imagen completa: un corazón!" },
]

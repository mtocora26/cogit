/** Grupo mínimo de fichas que se repite para formar la secuencia completa (o la propia secuencia si no hay ciclo). */
export function findCyclicBase(pat: string[]): string[] {
  // Un ciclo cuenta si al menos 3 fichas lo confirman (por eso admite ciclos de 4 en secuencias de 7).
  const max = Math.max(Math.floor(pat.length / 2), pat.length - 3)
  for (let size = 1; size <= max; size++) {
    const base = pat.slice(0, size)
    if (pat.every((p, i) => p === base[i % size])) return base
  }
  return pat
}

export type TipoPatron = "color" | "shape" | "number" | "direction"

const DE_TIPO: Record<TipoPatron, string> = {
  color: "de colores",
  shape: "de formas",
  number: "de números",
  direction: "de direcciones",
}

/** Frase corta que nombra la regla de una secuencia completa, con los nombres de las fichas. */
export function describirRegla(completa: string[], nombre: (ficha: string) => string, tipo?: TipoPatron): string {
  const base = findCyclicBase(completa)
  const n = base.length
  const de = tipo ? `Es un patrón ${DE_TIPO[tipo]}: ` : ""
  if (n === 1) return `${de}todas las fichas son iguales (${nombre(base[0])}).`
  if (n === 2) return `${de}alterna ${nombre(base[0])} y ${nombre(base[1])}.`
  if (n === 4 && base[0] === base[1] && base[2] === base[3] && base[0] !== base[2]) {
    return `${de}cada ficha se repite dos veces seguidas (${nombre(base[0])} y luego ${nombre(base[2])}).`
  }
  return `${de}se repite cada ${n} fichas: ${base.map(nombre).join(", ")}.`
}

/** Foto serializable del estado de un juego, para guardarla y retomarla (REQ-006). */
export type EstadoJuego = Record<string, unknown>

/** Grupo mínimo de fichas que se repite para formar la secuencia completa (o la propia secuencia si no hay ciclo). */
export function findCyclicBase(pat: string[]): string[] {
  for (let size = 1; size <= Math.floor(pat.length / 2); size++) {
    const base = pat.slice(0, size)
    if (pat.every((p, i) => p === base[i % size])) return base
  }
  return pat
}

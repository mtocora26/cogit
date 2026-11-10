// Tableros adicionales de 10x10 y 15x15 dibujados con texto ("#" lleno, "." vacío).

function dibujo(filas: string[]): number[][] {
  return filas.map((f) => [...f].map((c) => (c === "#" ? 1 : 0)))
}

/** Recibe la mitad izquierda (con la columna central) y la refleja. */
function dibujoSimetrico(mitades: string[]): number[][] {
  return dibujo(mitades.map((f) => f + [...f.slice(0, -1)].reverse().join("")))
}

export interface DibujoExtra {
  id: number
  name: string
  difficulty: string
  description: string
  solution: number[][]
}

export const DIBUJOS_EXTRA: DibujoExtra[] = [
  {
    id: 9,
    name: "Casa",
    difficulty: "Difícil",
    description: "Una casa con ventanas. Hay filas casi llenas: empieza por ellas.",
    solution: dibujo([
      "....##....",
      "...####...",
      "..######..",
      ".########.",
      "##########",
      "##..##..##",
      "##..##..##",
      "##########",
      "####..####",
      "####..####",
    ]),
  },
  {
    id: 10,
    name: "Pez",
    difficulty: "Difícil",
    description: "Un pez con burbujas. Las filas vacías también cuentan: márcalas con X.",
    solution: dibujo([
      "...####...",
      "..######.#",
      ".#########",
      "####.#####",
      "##########",
      ".#########",
      "..######.#",
      "...####...",
      ".#......#.",
      "#........#",
    ]),
  },
  {
    id: 11,
    name: "Árbol",
    difficulty: "Experto",
    description: "Un pino de 15×15. Tres pisos de copa y un tronco.",
    solution: dibujoSimetrico([
      ".......#",
      "......##",
      ".....###",
      "....####",
      ".....###",
      "....####",
      "...#####",
      "..######",
      ".#######",
      "########",
      "......##",
      "......##",
      "......##",
      "......##",
      "...#####",
    ]),
  },
  {
    id: 12,
    name: "Mariposa",
    difficulty: "Experto",
    description: "Una mariposa simétrica de 15×15. La simetría te ayuda a comprobar.",
    solution: dibujoSimetrico([
      "###....#",
      "####...#",
      "#####..#",
      "######.#",
      "########",
      ".#######",
      "..######",
      "...#####",
      "..######",
      ".#######",
      "########",
      "#####..#",
      "####...#",
      "###....#",
      "##.....#",
    ]),
  },
]

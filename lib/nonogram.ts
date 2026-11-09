// Definición de tipos
export interface NonogramLevel {
  id: number
  name: string
  difficulty: string
  description: string
  solution: number[][]
  rowClues: number[][]
  colClues: number[][]
}

// Función para generar las pistas de filas y columnas a partir de una solución
export function generateClues(solution: number[][]): { rowClues: number[][]; colClues: number[][] } {
  const rows = solution.length
  const cols = solution[0].length

  const rowClues: number[][] = []
  const colClues: number[][] = []

  // Generar pistas para filas
  for (let i = 0; i < rows; i++) {
    const clues: number[] = []
    let count = 0

    for (let j = 0; j < cols; j++) {
      if (solution[i][j] === 1) {
        count++
      } else if (count > 0) {
        clues.push(count)
        count = 0
      }
    }

    if (count > 0) {
      clues.push(count)
    }

    rowClues.push(clues.length > 0 ? clues : [0])
  }

  // Generar pistas para columnas
  for (let j = 0; j < cols; j++) {
    const clues: number[] = []
    let count = 0

    for (let i = 0; i < rows; i++) {
      if (solution[i][j] === 1) {
        count++
      } else if (count > 0) {
        clues.push(count)
        count = 0
      }
    }

    if (count > 0) {
      clues.push(count)
    }

    colClues.push(clues.length > 0 ? clues : [0])
  }

  return { rowClues, colClues }
}

// Función para verificar si la solución del usuario es correcta
export function checkNonogramSolution(
  userBoard: number[][],
  solution: number[][],
): { isCorrect: boolean; errors: { row: number; col: number }[] } {
  const errors: { row: number; col: number }[] = []

  // Verificar cada celda
  for (let i = 0; i < solution.length; i++) {
    for (let j = 0; j < solution[0].length; j++) {
      // Solo nos importan las celdas que deberían estar rellenas (1)
      if (solution[i][j] === 1 && userBoard[i][j] !== 1) {
        errors.push({ row: i, col: j })
      }
    }
  }

  return {
    isCorrect: errors.length === 0,
    errors,
  }
}

// Función para obtener los niveles de nonogramas
export function getNonogramLevels(): NonogramLevel[] {
  // Nivel 1: Corazón (5x5)
  const heart = [
    [0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
  ]
  const heartClues = generateClues(heart)

  // Nivel 2: Estrella (5x5)
  const star = [
    [0, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0],
    [1, 0, 1, 0, 1],
  ]
  const starClues = generateClues(star)

  // Nivel 3: Gato (8x8)
  const cat = [
    [0, 1, 1, 0, 0, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 1, 0],
    [1, 0, 0, 0, 0, 0, 0, 1],
  ]
  const catClues = generateClues(cat)

  // Nivel 4: Barco (8x8)
  const ship = [
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 0],
  ]
  const shipClues = generateClues(ship)

  // Nivel 5: Robot (10x10)
  const robot = [
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 1, 1, 0],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  ]
  const robotClues = generateClues(robot)

  // Nivel 6: Castillo (10x10)
  const castle = [
    [0, 1, 0, 1, 0, 0, 1, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 0, 1, 1, 1, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]
  const castleClues = generateClues(castle)

  // Nivel 7: Computadora (12x12)
  const computer = [
    [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
  ]
  const computerClues = generateClues(computer)

  // Nivel 8: Cerebro (15x15)
  const brain = [
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1],
    [0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 1, 0],
    [0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
  ]
  const brainClues = generateClues(brain)

  return [
    {
      id: 1,
      name: "Corazón",
      difficulty: "Fácil",
      description: "Un simple corazón para empezar. Perfecto para aprender las reglas básicas.",
      solution: heart,
      rowClues: heartClues.rowClues,
      colClues: heartClues.colClues,
    },
    {
      id: 2,
      name: "Estrella",
      difficulty: "Fácil",
      description: "Una estrella de cinco puntas. Un poco más desafiante que el corazón.",
      solution: star,
      rowClues: starClues.rowClues,
      colClues: starClues.colClues,
    },
    {
      id: 3,
      name: "Gato",
      difficulty: "Medio",
      description: "Un gato estilizado. Aumenta el tamaño y la complejidad.",
      solution: cat,
      rowClues: catClues.rowClues,
      colClues: catClues.colClues,
    },
    {
      id: 4,
      name: "Barco",
      difficulty: "Medio",
      description: "Un barco navegando. Practica con formas más complejas.",
      solution: ship,
      rowClues: shipClues.rowClues,
      colClues: shipClues.colClues,
    },
    {
      id: 5,
      name: "Robot",
      difficulty: "Difícil",
      description: "Un robot amigable. Mayor tamaño y detalles más finos.",
      solution: robot,
      rowClues: robotClues.rowClues,
      colClues: robotClues.colClues,
    },
    {
      id: 6,
      name: "Castillo",
      difficulty: "Difícil",
      description: "Un castillo medieval. Requiere atención al detalle.",
      solution: castle,
      rowClues: castleClues.rowClues,
      colClues: castleClues.colClues,
    },
    {
      id: 7,
      name: "Computadora",
      difficulty: "Experto",
      description: "Una computadora clásica. Un desafío para jugadores experimentados.",
      solution: computer,
      rowClues: computerClues.rowClues,
      colClues: computerClues.colClues,
    },
    {
      id: 8,
      name: "Cerebro",
      difficulty: "Experto",
      description: "Un cerebro detallado. El mayor desafío para verdaderos maestros del nonograma.",
      solution: brain,
      rowClues: brainClues.rowClues,
      colClues: brainClues.colClues,
    },
  ]
}

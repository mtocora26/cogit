// Definición de tipos
export interface Level {
  id: number
  name: string
  difficulty: string
  description: string
  board: number[][]
  startPosition: { x: number; y: number; direction: number }
  targetCells: { x: number; y: number }[]
  availableCommands: string[]
  commandLimit?: number
  // Pistas graduales, de la más vaga a la más concreta (mínimo dos por nivel)
  hints: string[]
}

// Función para obtener los niveles del juego
export function getLevels(): Level[] {
  return [
    // Nivel 1: Introducción
    {
      id: 1,
      name: "Primeros Pasos",
      difficulty: "Fácil",
      description:
        "Aprende a mover el robot. Usa el comando 'Avanzar' para llegar a la casilla objetivo y 'Encender' para activarla.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 0, y: 2, direction: 1 }, // Este
      targetCells: [{ x: 3, y: 2 }],
      availableCommands: ["forward", "light"],
      commandLimit: 5,
      hints: [
        "Mira dónde está el robot y dónde está la estrella: ¿cuántas casillas hay entre las dos?",
        "El robot ya mira al Este, hacia la estrella: solo necesitas avanzar en línea recta.",
        "Usa \"Avanzar\" 3 veces y termina con \"Encender\".",
      ],
    },

    // Nivel 2: Giros
    {
      id: 2,
      name: "Aprendiendo a Girar",
      difficulty: "Fácil",
      description:
        "Ahora aprenderás a girar. Usa los comandos 'Girar Derecha' y 'Girar Izquierda' para cambiar la dirección del robot.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 0, y: 0, direction: 1 }, // Este
      targetCells: [{ x: 4, y: 4 }],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 10,
      hints: [
        "El robot empieza arriba a la izquierda y la meta está en la esquina opuesta. Un giro cambia el rumbo.",
        "Avanza hasta el borde derecho, gira a la derecha (hacia el Sur) y avanza hasta el borde inferior.",
        "Avanzar ×4, Girar Derecha, Avanzar ×4, Encender.",
      ],
    },

    // Nivel 3: Obstáculos
    {
      id: 3,
      name: "Esquivando Obstáculos",
      difficulty: "Medio",
      description:
        "Ahora hay obstáculos en el camino. Planifica una ruta para llegar a la casilla objetivo evitando los obstáculos.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 0, y: 0, direction: 1 }, // Este
      targetCells: [{ x: 4, y: 4 }],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 12,
      hints: [
        "Las filas con bloques te cierran el paso: busca la columna que está libre.",
        "El borde derecho no tiene bloques: baja por ahí.",
        "Avanzar ×4, Girar Derecha, Avanzar ×4, Encender.",
      ],
    },

    // Nivel 4: Múltiples Objetivos
    {
      id: 4,
      name: "Múltiples Objetivos",
      difficulty: "Medio",
      description: "Ahora hay varias casillas objetivo. Debes encender todas para completar el nivel.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 2, y: 2, direction: 0 }, // Norte
      targetCells: [
        { x: 0, y: 0 },
        { x: 4, y: 0 },
        { x: 0, y: 4 },
        { x: 4, y: 4 },
      ],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 20,
      hints: [
        "Hay cuatro estrellas, una por esquina. Piensa un recorrido que las visite una tras otra.",
        "Los bloques dejan libres la cruz central y el borde: sal del centro, ve a una esquina y sigue por el borde.",
        "Acuérdate de usar \"Encender\" al llegar a cada esquina; si no, la estrella no cuenta.",
      ],
    },

    // Nivel 5: Laberinto
    {
      id: 5,
      name: "El Laberinto",
      difficulty: "Difícil",
      description: "Un desafío más complejo. Navega por este laberinto para encender todas las casillas objetivo.",
      board: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 0, 0, 0],
      ],
      startPosition: { x: 0, y: 0, direction: 1 }, // Este
      targetCells: [
        { x: 6, y: 0 },
        { x: 6, y: 6 },
        { x: 0, y: 6 },
      ],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 30,
      hints: [
        "Cada fila con bloques tiene un borde libre. Aprovecha el borde derecho.",
        "Recorre la fila de arriba hasta la derecha, baja por el borde derecho y vuelve por la fila de abajo.",
        "Avanzar ×6, Encender, Girar Derecha, Avanzar ×6, Encender, Girar Derecha, Avanzar ×6, Encender.",
      ],
    },

    // Nivel 6: Zigzag
    {
      id: 6,
      name: "Zigzag Difícil",
      difficulty: "Difícil",
      description: "Un nivel zigzag para poner a prueba tu lógica. Llega a la meta esquivando obstáculos.",
      board: [
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
      ],
      startPosition: { x: 0, y: 2, direction: 1 },
      targetCells: [{ x: 4, y: 2 }],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 18,
      hints: [
        "La meta está en la misma fila que el robot, y esa fila no tiene bloques.",
        "No necesitas girar: el camino es recto.",
        "Avanzar ×4 y Encender.",
      ],
    },
    // Nivel 7: Recorrido Completo
    {
      id: 7,
      name: "Recorrido Completo",
      difficulty: "Difícil",
      description: "Debes encender todas las casillas del borde del tablero.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 1, 1, 1, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 0, y: 0, direction: 1 },
      targetCells: [
        { x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 },
        { x: 4, y: 1 }, { x: 4, y: 2 }, { x: 4, y: 3 }, { x: 4, y: 4 },
        { x: 3, y: 4 }, { x: 2, y: 4 }, { x: 1, y: 4 }, { x: 0, y: 4 },
        { x: 0, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }
      ],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 40,
      hints: [
        "Debes encender todo el borde: son 16 casillas, así que \"Encender\" y \"Avanzar\" se alternan mucho.",
        "Cada lado del borde sigue el mismo patrón: (Encender, Avanzar) ×4 y luego Girar Derecha.",
        "Repite ese patrón cuatro veces, una por cada lado.",
      ],
    },
    // Nivel 8: Plantilla Libre
    {
      id: 8,
      name: "Desafío Libre",
      difficulty: "Extra",
      description: "Crea tu propio reto o usa este nivel para experimentar.",
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ],
      startPosition: { x: 2, y: 2, direction: 0 },
      targetCells: [{ x: 4, y: 4 }],
      availableCommands: ["forward", "turnRight", "turnLeft", "light"],
      commandLimit: 20,
      hints: [
        "La meta está en la esquina inferior derecha y el robot empieza en el centro mirando al Norte.",
        "Primero gira hacia el Este, avanza 2, gira hacia el Sur y avanza 2.",
        "Girar Derecha, Avanzar ×2, Girar Derecha, Avanzar ×2, Encender.",
      ],
    },
  ]
}

// Función para validar si la solución es correcta
export function validateSolution(
  litCells: { x: number; y: number }[],
  targetCells: { x: number; y: number }[],
): boolean {
  // Verificar que todas las casillas objetivo estén encendidas
  return targetCells.every((target) => litCells.some((lit) => lit.x === target.x && lit.y === target.y))
}

export interface RobotState {
  x: number
  y: number
  direction: number
}

export interface Cell {
  x: number
  y: number
}

// Por qué no se pudo mover el robot en un paso
export type BlockReason = "pared" | "obstaculo"

export interface ProgramProblem {
  step: number // paso (empieza en 1) en el que ocurrió
  command: string
  reason: BlockReason
}

export interface ProgramRun {
  // Estado del robot tras cada comando (frames[i] corresponde al paso i + 1)
  frames: { position: RobotState; litCells: Cell[] }[]
  success: boolean
  // Primer choque (si lo hubo)
  problem: ProgramProblem | null
  // Casillas objetivo que quedaron sin encender
  missing: Cell[]
}

const DIRECTION_VECTORS = [
  { x: 0, y: -1 }, // Norte
  { x: 1, y: 0 }, // Este
  { x: 0, y: 1 }, // Sur
  { x: -1, y: 0 }, // Oeste
]

export const COMMAND_NAMES: Record<string, string> = {
  forward: "Avanzar",
  turnRight: "Girar Derecha",
  turnLeft: "Girar Izquierda",
  light: "Encender",
}

// Ejecuta un comando y dice si el robot chocó
export function stepCommand(
  command: string,
  position: RobotState,
  litCells: Cell[],
  board: number[][],
): { position: RobotState; litCells: Cell[]; blocked: BlockReason | null } {
  const next = { ...position }
  const lit = [...litCells]
  let blocked: BlockReason | null = null

  if (command === "forward") {
    const v = DIRECTION_VECTORS[position.direction]
    const nx = position.x + v.x
    const ny = position.y + v.y
    if (nx < 0 || ny < 0 || ny >= board.length || nx >= board[0].length) {
      blocked = "pared"
    } else if (board[ny][nx] === 1) {
      blocked = "obstaculo"
    } else {
      next.x = nx
      next.y = ny
    }
  } else if (command === "turnRight") {
    next.direction = (position.direction + 1) % 4
  } else if (command === "turnLeft") {
    next.direction = (position.direction + 3) % 4
  } else if (command === "light") {
    if (!lit.some((c) => c.x === position.x && c.y === position.y)) lit.push({ x: position.x, y: position.y })
  }

  return { position: next, litCells: lit, blocked }
}

// Ejecuta el programa completo sin animar: devuelve cada paso y por qué falló
export function runProgram(commands: string[], level: Level): ProgramRun {
  let position: RobotState = { ...level.startPosition }
  let litCells: Cell[] = []
  let problem: ProgramProblem | null = null
  const frames: ProgramRun["frames"] = []

  commands.forEach((command, i) => {
    const r = stepCommand(command, position, litCells, level.board)
    position = r.position
    litCells = r.litCells
    if (r.blocked && !problem) problem = { step: i + 1, command, reason: r.blocked }
    frames.push({ position: { ...position }, litCells: [...litCells] })
  })

  const missing = level.targetCells.filter((t) => !litCells.some((l) => l.x === t.x && l.y === t.y))
  return { frames, success: missing.length === 0, problem, missing }
}

// Mensaje que explica en qué paso y por qué falló el programa
export function explainFailure(run: ProgramRun): string {
  const parts: string[] = []
  if (run.problem) {
    const cause = run.problem.reason === "pared" ? "chocó con el borde del tablero" : "chocó con un obstáculo"
    parts.push(`El robot ${cause} en el paso ${run.problem.step} (${COMMAND_NAMES[run.problem.command] ?? run.problem.command}).`)
  }
  if (run.missing.length > 0) {
    const n = run.missing.length
    parts.push(n === 1 ? "Falta 1 casilla objetivo por encender." : `Faltan ${n} casillas objetivo por encender.`)
  }
  return parts.join(" ")
}

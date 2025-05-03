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

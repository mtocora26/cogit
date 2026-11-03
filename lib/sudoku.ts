// Función para generar un tablero de Sudoku válido
export function generateSudoku(emptyCells = 40) {
  // Crear un tablero vacío
  const board: number[][] = Array(9)
    .fill(0)
    .map(() => Array(9).fill(0))

  // Llenar el tablero con una solución válida
  solveSudoku(board)

  // Guardar la solución completa
  const solution = JSON.parse(JSON.stringify(board))

  // Eliminar números para crear el puzzle
  const positions = []
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      positions.push([i, j])
    }
  }

  // Mezclar las posiciones para eliminar números aleatoriamente
  shuffleArray(positions)

  // Eliminar números hasta alcanzar el número deseado de celdas vacías
  for (let i = 0; i < emptyCells; i++) {
    const [row, col] = positions[i]
    board[row][col] = 0
  }

  return { puzzle: board, solution }
}

// Función para resolver un tablero de Sudoku usando backtracking
export function solveSudoku(board: number[][]) {
  const emptyCell = findEmptyCell(board)

  // Si no hay celdas vacías, el tablero está resuelto
  if (!emptyCell) {
    return true
  }

  const [row, col] = emptyCell
  const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  // Mezclar los números para generar diferentes soluciones
  shuffleArray(nums)

  for (const num of nums) {
    if (isValidPlacement(board, row, col, num)) {
      board[row][col] = num

      if (solveSudoku(board)) {
        return true
      }

      // Si no lleva a una solución, deshacer
      board[row][col] = 0
    }
  }

  return false
}

// Función para encontrar una celda vacía
function findEmptyCell(board: number[][]) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0) {
        return [i, j]
      }
    }
  }
  return null
}

// Función para verificar si un número se puede colocar en una posición
function isValidPlacement(board: number[][], row: number, col: number, num: number) {
  // Verificar fila
  for (let j = 0; j < 9; j++) {
    if (board[row][j] === num) {
      return false
    }
  }

  // Verificar columna
  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false
    }
  }

  // Verificar región 3x3
  const boxRow = Math.floor(row / 3) * 3
  const boxCol = Math.floor(col / 3) * 3

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[boxRow + i][boxCol + j] === num) {
        return false
      }
    }
  }

  return true
}

// Función para mezclar un array (algoritmo Fisher-Yates)
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

// Función para verificar si una solución es válida
export function checkSolution(board: number[][]) {
  // Verificar filas
  for (let i = 0; i < 9; i++) {
    const row = new Set()
    for (let j = 0; j < 9; j++) {
      if (board[i][j] === 0 || row.has(board[i][j])) {
        return false
      }
      row.add(board[i][j])
    }
  }

  // Verificar columnas
  for (let j = 0; j < 9; j++) {
    const col = new Set()
    for (let i = 0; i < 9; i++) {
      if (board[i][j] === 0 || col.has(board[i][j])) {
        return false
      }
      col.add(board[i][j])
    }
  }

  // Verificar regiones 3x3
  for (let boxRow = 0; boxRow < 9; boxRow += 3) {
    for (let boxCol = 0; boxCol < 9; boxCol += 3) {
      const box = new Set()
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          const value = board[boxRow + i][boxCol + j]
          if (value === 0 || box.has(value)) {
            return false
          }
          box.add(value)
        }
      }
    }
  }

  return true
}

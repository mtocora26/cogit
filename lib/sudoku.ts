// Genera un puzzle con exactamente una solución.
// Se quitan celdas una a una y solo se mantiene la que deja la solución única,
// comprobándolo con el solucionador. Si no alcanza las celdas vacías pedidas,
// se reintenta con otro tablero; como último recurso devuelve el que más se acercó.
export function generateSudoku(emptyCells = 40) {
  const objetivo = Math.max(0, Math.min(emptyCells, 64))
  let mejor: { puzzle: number[][]; solution: number[][]; vacias: number } | null = null

  for (let intento = 0; intento < 30; intento++) {
    const solution: number[][] = Array.from({ length: 9 }, () => Array(9).fill(0))
    solveSudoku(solution)

    const puzzle = solution.map((fila) => [...fila])
    const positions: number[][] = []
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) positions.push([i, j])
    shuffleArray(positions)

    let vacias = 0
    for (const [row, col] of positions) {
      if (vacias >= objetivo) break
      const valor = puzzle[row][col]
      puzzle[row][col] = 0
      if (countSolutions(puzzle, 2) === 1) {
        vacias++
      } else {
        puzzle[row][col] = valor
      }
    }

    if (!mejor || vacias > mejor.vacias) mejor = { puzzle, solution, vacias }
    if (vacias >= objetivo) break
  }

  return { puzzle: mejor!.puzzle, solution: mejor!.solution }
}

// Cuenta las soluciones de un tablero (se detiene al llegar a `limit`).
// No modifica el tablero recibido.
export function countSolutions(board: number[][], limit = 2) {
  const copia = board.map((fila) => [...fila])
  let total = 0

  const buscar = () => {
    // Celda vacía con menos candidatos: poda mucho el árbol de búsqueda
    let mejorFila = -1
    let mejorCol = -1
    let mejorCandidatos: number[] = []
    let minimo = 10
    for (let i = 0; i < 9 && minimo > 0; i++) {
      for (let j = 0; j < 9; j++) {
        if (copia[i][j] !== 0) continue
        const candidatos: number[] = []
        for (let n = 1; n <= 9; n++) if (isValidPlacement(copia, i, j, n)) candidatos.push(n)
        if (candidatos.length < minimo) {
          minimo = candidatos.length
          mejorFila = i
          mejorCol = j
          mejorCandidatos = candidatos
          if (minimo === 0) break
        }
      }
    }

    if (mejorFila === -1) {
      total++
      return
    }
    for (const n of mejorCandidatos) {
      copia[mejorFila][mejorCol] = n
      buscar()
      copia[mejorFila][mejorCol] = 0
      if (total >= limit) return
    }
  }

  buscar()
  return total
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

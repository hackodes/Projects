class SudokuSolver {
  constructor() {
    this.SIZE = 9
    this.BOX_SIZE = 3
    this.EMPTY = "."
  }

  isValid(board, row, col, num) {
    for (let x = 0; x < this.SIZE; x++) {
      if (board[row][x] == num) return false
      if (board[x][col] == num) return false
      const startRow = row - (row % this.BOX_SIZE)
      const startCol = col - (col % this.BOX_SIZE)
      if (board[startRow + Math.floor(x / this.BOX_SIZE)][startCol + (x % this.BOX_SIZE)] == num) return false
    }
    return true
  }

  getRowNumber(row) {
    const letters = "ABCDEFGHI"
    return letters.indexOf(row.toUpperCase()) + 1
  }

  transform(puzzleString) {
    const board = []
    for (let i = 0; i < this.SIZE; i++) {
      const row = []
      for (let j = 0; j < this.SIZE; j++) {
        row.push(puzzleString[i * this.SIZE + j])
      }
      board.push(row)
    }
    return board
  }

  transformBack(grid) {
    let sudokuString = ""
    for (let i = 0; i < this.SIZE; i++) {
      for (let j = 0; j < this.SIZE; j++) {
        sudokuString += grid[i][j]
      }
    }
    return sudokuString
  }

  solvePuzzle(board, row = 0, col = 0) {
    if (row == this.SIZE - 1 && col == this.SIZE) return board
    if (col == this.SIZE) {
      row++
      col = 0
    }
    if (board[row][col] != this.EMPTY) return this.solvePuzzle(board, row, col + 1)
    for (let num = 1; num <= this.SIZE; num++) {
      if (this.isValid(board, row, col, num.toString())) {
        board[row][col] = num.toString()
        if (this.solvePuzzle(board, row, col + 1)) return board
        board[row][col] = this.EMPTY
      }
    }
    return false
  }

  validate(puzzleString) {
    if (puzzleString.length !== 81) {
      return false
    }
    if (/[^0-9.]/.test(puzzleString)) {
      return false
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString)
    row = this.getRowNumber(row) - 1
    column = parseInt(column) - 1
    for (let col = 0; col < this.SIZE; col++) {
      if (board[row][col] == value) {
        return false
      }
    }
    return true
  }

  checkColPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString)
    row = this.getRowNumber(row) - 1
    column = parseInt(column) - 1
    for (let r = 0; r < this.SIZE; r++) {
      if (board[r][column] == value) {
        return false
      }
    }
    return true
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const board = this.transform(puzzleString)
    row = this.getRowNumber(row) - 1
    column = parseInt(column) - 1
    const startRow = row - (row % this.BOX_SIZE)
    const startCol = column - (column % this.BOX_SIZE)
    for (let r = 0; r < this.BOX_SIZE; r++) {
      for (let c = 0; c < this.BOX_SIZE; c++) {
        if (board[r + startRow][c + startCol] == value) {
          return false
        }
      }
    }
    return true
  }

  solve(puzzleString) {
    if (!this.validate(puzzleString)) {
      return false
    }
    let board = this.transform(puzzleString)
    let solvedBoard = this.solvePuzzle(board)
    if (!solvedBoard) {
      return false
    }
    let solvedString = this.transformBack(solvedBoard)
    return solvedString
  }
}

module.exports = SudokuSolver

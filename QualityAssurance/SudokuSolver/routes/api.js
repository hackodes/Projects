"use strict"

const SudokuSolver = require("../controllers/sudoku-solver.js")

const validatePuzzleString = require("../validators/validatePuzzleString")
const { validateCheckFields, validateSolveFields } = require("../validators/validateFields")
const validateCoordinateFormat = require("../validators/validateCoordinateFormat")
const validateValue = require("../validators/validateValue")

module.exports = function (app) {
  let solver = new SudokuSolver()

  app.route("/api/check").post((request, response) => {
    const { puzzle, coordinate, value } = request.body

    const row = coordinate ? coordinate.split("")[0] : null
    const column = coordinate ? coordinate.split("")[1] : null

    const error =
      validateCheckFields(puzzle, coordinate, value) ||
      validateCoordinateFormat(coordinate) ||
      validateValue(value) ||
      validatePuzzleString(puzzle)
    if (error) {
      return response.json(error)
    }

    const rowIndex = solver.getRowNumber(row) - 1
    const colIndex = parseInt(column) - 1

    const board = solver.transform(puzzle)
    if (board[rowIndex][colIndex] === value) {
      return response.json({ valid: true })
    }

    let validRow = solver.checkRowPlacement(puzzle, row, column, value)
    let validCol = solver.checkColPlacement(puzzle, row, column, value)
    let validReg = solver.checkRegionPlacement(puzzle, row, column, value)

    const isValid = validRow && validCol && validReg
    const conflicts = []

    if (!validRow) {
      conflicts.push("row")
    }
    if (!validCol) {
      conflicts.push("column")
    }
    if (!validReg) {
      conflicts.push("region")
    }

    response.json({ valid: isValid, conflict: isValid ? undefined : conflicts })
  })

  app.route("/api/solve").post((request, response) => {
    const { puzzle } = request.body

    const error = validateSolveFields(puzzle) || validatePuzzleString(puzzle)
    if (error) {
      return response.json(error)
    }

    let solvedString = solver.solve(puzzle)

    if (!solvedString) {
      response.json({ error: "Puzzle cannot be solved" })
    }

    response.json({ solution: solvedString })
  })
}

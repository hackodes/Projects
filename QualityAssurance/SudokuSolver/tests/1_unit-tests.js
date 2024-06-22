const assert = require("chai").assert

const Solver = require("../controllers/sudoku-solver")
let solver = new Solver()

const puzzleString = "1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37."
const solutionString = "135762984946381257728459613694517832812936745357824196473298561581673429269145378"

suite("Unit Tests", () => {
  test("Logic handles a valid puzzle string of 81 characters", function (done) {
    assert.equal(solver.solve(puzzleString), solutionString)
    done()
  })

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function (done) {
    const invalidPuzzleString = "^%$£^*?>@~{!}[]()1.5..2.84.."
    assert.equal(solver.solve(invalidPuzzleString), false)
    done()
  })

  test("Logic handles a puzzle string that is not 81 characters in length", function (done) {
    const invalidPuzzleString = "1.5..2.84..63.1"
    assert.equal(solver.solve(invalidPuzzleString), false)
    done()
  })

  test("Logic handles a valid row placement", function (done) {
    assert.equal(solver.checkRowPlacement(puzzleString, "B", "3", "4"), true)
    done()
  })

  test("Logic handles an invalid row placement", function (done) {
    assert.equal(solver.checkRowPlacement(puzzleString, "A", "1", "2"), false)
    done()
  })

  test("Logic handles a valid column placement", function (done) {
    assert.equal(solver.checkColPlacement(puzzleString, "A", "2", "8"), true)
    done()
  })

  test("Logic handles an invalid column placement", function (done) {
    assert.equal(solver.checkColPlacement(puzzleString, "A", "1", "3"), false)
    done()
  })

  test("Logic handles a valid region (3x3 grid) placement", function (done) {
    assert.equal(solver.checkRegionPlacement(puzzleString, "A", "2", "3"), true)
    done()
  })

  test("Logic handles an invalid region (3x3 grid) placement", function (done) {
    assert.equal(solver.checkRegionPlacement(puzzleString, "A", "1", "2"), false)
    done()
  })

  test("Valid puzzle strings pass the solver", function (done) {
    assert.equal(solver.solve(puzzleString), solutionString)
    done()
  })

  test("Invalid puzzle strings fail the solver", function (done) {
    const invalidPuzzleString = "55591372.3...8.5.9.9.25..8.68.47.23...95..46.7.4.....5.2.......4..8916..85.72...3"
    assert.equal(solver.solve(invalidPuzzleString), false)
    done()
  })

  test("Solver returns the expected solution for an incomplete puzzle", function (done) {
    assert.equal(
      solver.solve("1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.3.."),
      "135762984946381257728459613694517832812936745357824196473298561581673429269145378"
    )
    done()
  })
})

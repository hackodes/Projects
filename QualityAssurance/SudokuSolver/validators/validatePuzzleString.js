function validatePuzzleString(puzzle) {
  if (puzzle.length !== 81) {
    return { error: "Expected puzzle to be 81 characters long" }
  }
  if (/[^0-9.]/.test(puzzle)) {
    return { error: "Invalid characters in puzzle" }
  }
  return null
}

module.exports = validatePuzzleString

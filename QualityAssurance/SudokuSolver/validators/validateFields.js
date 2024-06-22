function validateCheckFields(puzzle, coordinate, value) {
  if (!puzzle || !coordinate || !value) {
    return { error: "Required field(s) missing" }
  }
  return null
}

function validateSolveFields(puzzle) {
  if (!puzzle) {
    return { error: "Required field missing" }
  }
  return null
}

module.exports = { validateCheckFields, validateSolveFields }

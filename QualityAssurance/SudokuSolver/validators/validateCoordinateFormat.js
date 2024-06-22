function validateCoordinateFormat(coordinate) {
  const row = coordinate.split("")[0]
  const column = coordinate.split("")[1]
  if (coordinate.length !== 2 || !/[A-I]/i.test(row) || !/[1-9]/.test(column)) {
    return { error: "Invalid coordinate" }
  }
  return null
}

module.exports = validateCoordinateFormat

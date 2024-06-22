function validateValue(value) {
  if (!/^[1-9]$/.test(value)) {
    return { error: "Invalid value" }
  }
  return null
}

module.exports = validateValue

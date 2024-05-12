function isEmpty(object) {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

module.exports = { isEmpty }

function invertDictionary(dictionary) {
  const invertDictionary = {}
  for (const key in dictionary) {
    const value = dictionary[key]
    invertDictionary[value] = key
  }
  return invertDictionary
}

module.exports = { invertDictionary }

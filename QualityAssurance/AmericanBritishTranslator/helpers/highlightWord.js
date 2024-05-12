function highlightWord(translationMappings, matchedKey) {
  const lowerCaseKey = matchedKey.toLowerCase()
  const word = translationMappings[lowerCaseKey]

  const highlightedWord = `<span class="highlight">${word}</span>`
  return highlightedWord
}

module.exports = { highlightWord }

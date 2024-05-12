function sortTitles(titles) {
  const originalTitles = Object.entries(titles)
  originalTitles.sort(([keyA], [keyB]) => keyB.localeCompare(keyA))

  const sortedTitles = {}
  originalTitles.forEach(([key, value]) => {
    sortedTitles[key] = value
  })
  return sortedTitles
}

module.exports = { sortTitles }

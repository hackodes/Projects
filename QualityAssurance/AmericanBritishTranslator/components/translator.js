const americanOnly = require("./american-only.js")
const americanToBritishSpelling = require("./american-to-british-spelling.js")
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require("./british-only.js")

const { sortTitles } = require("../helpers/sortTitles.js")
const { highlightWord } = require("../helpers/highlightWord.js")
const { invertDictionary } = require("../helpers/invertDictionary.js")
const { isEmpty } = require("../helpers/isEmpty.js")
const { capitalizeFirstLetter } = require("../helpers/capitalizeFirstLetter.js")

class Translator {
  matchTitles(input, titles, translationMappings) {
    for (const key in titles) {
      if (titles.hasOwnProperty(key)) {
        const value = titles[key]

        if (input.includes(key)) {
          translationMappings[key] = capitalizeFirstLetter(value)
        }
      }
    }
    return translationMappings
  }

  matchWordsContainSpace(input, dictionary, translationMappings) {
    const containsSpace = {}

    for (const key in dictionary) {
      if (dictionary.hasOwnProperty(key) && key.includes(" ")) {
        containsSpace[key] = dictionary[key]
      }
    }

    for (const key in containsSpace) {
      if (containsSpace.hasOwnProperty(key)) {
        const value = containsSpace[key]
        if (input.includes(key)) {
          translationMappings[key] = value
        }
      }
    }
    return translationMappings
  }

  matchWords(input, dictionary, translationMappings) {
    const regex = new RegExp("[\\w'-]+", "g")
    const words = input.match(regex)

    if (words) {
      words.forEach((word) => {
        if (dictionary[word]) {
          translationMappings[word] = dictionary[word]
        }
      })
    }
    return translationMappings
  }

  matchTimeNotation(input, timeNotationRegex, translationMappings, locale) {
    const timeNotations = input.match(timeNotationRegex)

    if (timeNotations) {
      timeNotations.forEach((separator) => {
        const replacement = locale === "britishEnglish" ? separator.replace(":", ".") : separator.replace(".", ":")
        translationMappings[separator] = replacement
      })
    }
    return translationMappings
  }

  translateText(input, translationMappings) {
    const regex = new RegExp(Object.keys(translationMappings).join("|"), "gi")

    let result = input.replace(regex, (matchedKey) => {
      const replacement = translationMappings[matchedKey.toLowerCase()]
      return replacement
    })

    return result
  }

  translateTextUsingHighlight(input, translationMappings) {
    let result = input

    for (const match in translationMappings) {
      if (translationMappings.hasOwnProperty(match)) {
        const regex = new RegExp(match, "gi")
        result = result.replace(regex, (matchedKey) => highlightWord(translationMappings, matchedKey))
      }
    }
    return result
  }

  runTranslator(input, dictionary, titles, timeNotationRegex, locale) {
    let translationMappings = {}

    translationMappings = this.matchTitles(input.toLowerCase(), titles, translationMappings)
    translationMappings = this.matchWordsContainSpace(input.toLowerCase(), dictionary, translationMappings)
    translationMappings = this.matchWords(input.toLowerCase(), dictionary, translationMappings)
    translationMappings = this.matchTimeNotation(input.toLowerCase(), timeNotationRegex, translationMappings, locale)

    if (isEmpty(translationMappings)) return null

    const translationOptions = [
      (text, mappings) => this.translateText(text, mappings),
      (text, mappings) => this.translateTextUsingHighlight(text, mappings),
    ]

    const translationResults = translationOptions.map((runTranslator) => runTranslator(input, translationMappings))
    return translationResults
  }

  translateBritishEnglish(input) {
    const sortedTitles = sortTitles(americanToBritishTitles)
    const combinedDictionary = { ...americanOnly, ...americanToBritishSpelling }
    const regex = new RegExp("(0?[1-9]|1[0-2]):[0-5][0-9]", "g")

    const result = this.runTranslator(input, combinedDictionary, sortedTitles, regex, "britishEnglish")
    return result || input
  }

  translateAmericanEnglish(input) {
    const sortedTitles = sortTitles(americanToBritishTitles)
    const combinedDictionary = { ...britishOnly, ...invertDictionary(americanToBritishSpelling) }
    const regex = new RegExp("(0?[1-9]|1[0-2]).[0-5][0-9]", "g")
    const reversedTitles = invertDictionary(sortedTitles)

    const result = this.runTranslator(input, combinedDictionary, reversedTitles, regex, "americanEnglish")
    return result || input
  }
}

module.exports = Translator

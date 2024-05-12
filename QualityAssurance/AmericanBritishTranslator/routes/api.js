"use strict"

const Translator = require("../components/translator.js")

module.exports = function (app) {
  const translator = new Translator()

  app.route("/api/translate").post(({ body: { text, locale } }, res) => {
    if (!locale || text === undefined) {
      return res.json({ error: "Required field(s) missing" })
    }

    if (text === "") {
      return res.json({ error: "No text to translate" })
    }

    let translation = ""
    switch (locale) {
      case "american-to-british":
        translation = translator.translateBritishEnglish(text)
        break
      case "british-to-american":
        translation = translator.translateAmericanEnglish(text)
        break
      default:
        return res.json({ error: "Invalid value for locale field" })
    }

    if (translation === text || !translation) {
      res.json({ text, translation: "Everything looks good to me!" })
    } else {
      res.json({ text, translation: translation[1] })
    }
  })
}

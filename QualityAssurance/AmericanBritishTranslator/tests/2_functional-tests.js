const chai = require("chai")
const chaiHttp = require("chai-http")
const assert = chai.assert
const server = require("../server.js")

chai.use(chaiHttp)

let Translator = require("../components/translator.js")

suite("Functional Tests", () => {
  test("Translation with text and locale fields: POST request to /api/translate", function (done) {
    const input = { text: "We watched the footie match for a while.", locale: "british-to-american" }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(
          response.body.translation,
          `We watched the <span class="highlight">soccer</span> match for a while.`
        )
        done()
      })
  })

  test("Translation with text and invalid locale field: POST request to /api/translate", function (done) {
    const input = { text: "We watched the footie match for a while.", locale: "invalid-locale" }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "Invalid value for locale field")
        done()
      })
  })

  test("Translation with missing text field: POST request to /api/translate", function (done) {
    const input = { locale: "british-to-american" }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "Required field(s) missing")
        done()
      })
  })

  test("Translation with missing locale field: POST request to /api/translate", function (done) {
    const input = { text: "We watched the footie match for a while." }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "Required field(s) missing")
        done()
      })
  })

  test("Translation with empty text: POST request to /api/translate", function (done) {
    const input = { text: "", locale: "british-to-american" }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "No text to translate")
        done()
      })
  })

  test("Translation with text that needs no translation: POST request to /api/translate", function (done) {
    const input = { text: "We watched the soccer match for a while.", locale: "british-to-american" }

    chai
      .request(server)
      .post("/api/translate")
      .send(input)
      .end((error, response) => {
        assert.equal(response.status, 200)
        assert.equal(response.body.translation, "Everything looks good to me!")
        done()
      })
  })
})

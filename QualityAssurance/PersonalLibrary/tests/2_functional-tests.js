/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

let bookIdentifier

suite("Functional Tests", function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  test("#example Test GET /api/books", function (done) {
    chai
      .request(server)
      .get("/api/books")
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.isArray(response.body, "response should be an array")
        if (!response.body[0]) {
          done()
        }
        assert.property(response.body[0], "commentcount", "Books in array should contain commentcount")
        assert.property(response.body[0], "title", "Books in array should contain title")
        assert.property(response.body[0], "_id", "Books in array should contain _id")
        done()
      })
  })
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite("Routing tests", function () {
    suite("POST /api/books with title => create book object/expect book object", function () {
      test("Test POST /api/books with title", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({ title: "Book One" })
          .end(function (error, response) {
            assert.equal(response.status, 200)
            bookIdentifier = response.body._id
            assert.equal(response.body.title, "Book One")
            done()
          })
      })

      test("Test POST /api/books with no title given", function (done) {
        chai
          .request(server)
          .post("/api/books")
          .send({})
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "missing required field title")
            done()
          })
      })
    })

    suite("GET /api/books => array of books", function () {
      test("Test GET /api/books", function (done) {
        chai
          .request(server)
          .get("/api/books")
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.isArray(response.body, "it is an array")
            done()
          })
      })
    })

    suite("GET /api/books/[id] => book object with [id]", function () {
      test("Test GET /api/books/[id] with id not in db", function (done) {
        chai
          .request(server)
          .get("/api/books/invalid12345689")
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "no book exists")
            done()
          })

        test("Test GET /api/books/[id] with valid id in db", function (done) {
          chai
            .request(server)
            .get("/api/books/" + bookIdentifier)
            .end(function (error, response) {
              assert.equal(response.status, 200)
              assert.equal(response.body.title, "Book One")
              done()
            })
        })
      })
    })

    suite("POST /api/books/[id] => add comment/expect book object with id", function () {
      test("Test POST /api/books/[id] with comment", function (done) {
        chai
          .request(server)
          .post("/api/books/" + bookIdentifier)
          .send({ comment: "Comment test" })
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.body.comments[0], "Comment test")
            done()
          })
      })

      test("Test POST /api/books/[id] without comment field", function (done) {
        chai
          .request(server)
          .post("/api/books/" + bookIdentifier)
          .send({})
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "missing required field comment")
            done()
          })
      })

      test("Test POST /api/books/[id] with comment, id not in db", function (done) {
        chai
          .request(server)
          .post("/api/books/" + "invalid12345689")
          .send({ comment: "Comment test" })
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "no book exists")
            done()
          })
      })
    })

    suite("DELETE /api/books/[id] => delete book object id", function () {
      test("Test DELETE /api/books/[id] with valid id in db", function (done) {
        chai
          .request(server)
          .delete("/api/books/" + bookIdentifier)
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "delete successful")
            done()
          })
      })

      test("Test DELETE /api/books/[id] with  id not in db", function (done) {
        chai
          .request(server)
          .delete("/api/books/" + "invalid12345689")
          .end(function (error, response) {
            assert.equal(response.status, 200)
            assert.equal(response.text, "no book exists")
            done()
          })
      })
    })
  })
}).timeout(10000)

const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

const mongoose = require("mongoose")
mongoose.connect(process.env.connectionUrl)

chai.use(chaiHttp)

let issueDoc1
let issueDoc2

suite("Functional Tests", function () {
  test("Create an issue with every field: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/test_endpoint")
      .set("content-type", "application/json")
      .send({
        issue_title: "First Issue",
        issue_text: "This is the first issue",
        created_by: "User_1",
        assigned_to: "User_2",
        status_text: "To Do",
      })
      .end(function (error, response) {
        issueDoc1 = response.body

        assert.equal(response.status, 200)
        assert.equal(response.body.issue_title, "First Issue")
        assert.equal(response.body.issue_text, "This is the first issue")
        assert.equal(response.body.created_by, "User_1")
        assert.equal(response.body.assigned_to, "User_2")
        assert.equal(response.body.status_text, "To Do")

        done()
      })
  }).timeout(10000)

  test("Create an issue with only required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/test_endpoint")
      .set("content-type", "application/json")
      .send({
        issue_title: "Second Issue",
        issue_text: "This is the second issue",
        created_by: "User_2",
        assigned_to: "",
        status_text: "",
      })
      .end(function (error, response) {
        issueDoc2 = response.body
        assert.equal(response.status, 200)
        assert.equal(response.body.issue_title, "Second Issue")
        assert.equal(response.body.issue_text, "This is the second issue")
        assert.equal(response.body.created_by, "User_2")
        assert.equal(response.body.assigned_to, "")
        assert.equal(response.body.status_text, "")
        done()
      })
  }).timeout(5000)

  test("Create an issue with missing required fields: POST request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .post("/api/issues/test_endpoint")
      .set("content-type", "application/json")
      .send({
        issue_title: "",
        issue_text: "",
        created_by: "User_3",
        assigned_to: "",
        status_text: "",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "required field(s) missing")
        done()
      })
  }).timeout(5000)

  test("View issues on a project: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/test_endpoint")
      .end(function (error, response) {
        assert.equal(response.status, 200)
        done()
      })
  })

  test("View issues on a project with one filter: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/test_endpoint")
      .query({
        _id: issueDoc1._id,
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.status, 200)
        assert.equal(response.body[0].issue_title, issueDoc1.issue_title)
        assert.equal(response.body[0].issue_text, issueDoc1.issue_text)
        done()
      })
  })

  test("View issues on a project with multiple filters: GET request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .get("/api/issues/test_endpoint")
      .query({
        issue_title: issueDoc1.issue_title,
        issue_text: issueDoc1.issue_text,
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body[0].issue_title, issueDoc1.issue_title)
        assert.equal(response.body[0].issue_text, issueDoc1.issue_text)
        done()
      })
  })

  test("Update one field on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/test_endpoint")
      .send({
        _id: issueDoc1._id,
        issue_title: "This is the updated title",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.result, "successfully updated")
        assert.equal(response.body._id, issueDoc1._id)
        done()
      })
  })

  test("Update multiple fields on an issue: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/test_endpoint")
      .send({
        _id: issueDoc1._id,
        issue_title: "This is the updated title",
        issue_text: "This is the updated text",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.result, "successfully updated")
        assert.equal(response.body._id, issueDoc1._id)
        done()
      })
  })

  test("Update an issue with missing _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/test_endpoint")
      .send({
        issue_title: "This is the updated title",
        issue_text: "This is the updated text",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "missing _id")
        done()
      })
  })

  test("Update an issue with no fields to update: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/test_endpoint")
      .send({
        _id: issueDoc1._id,
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "no update field(s) sent")
        done()
      })
  })

  test("Update an issue with an invalid _id: PUT request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .put("/api/issues/test_endpoint")
      .send({
        _id: "123456789",
        issue_title: "This is the updated title",
        issue_text: "This is the updated text",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "could not update")
        done()
      })
  })

  test("Delete an issue: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test_endpoint")
      .send({
        _id: issueDoc1._id,
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.result, "successfully deleted")
      })
    chai
      .request(server)
      .delete("/api/issues/test_endpoint")
      .send({
        _id: issueDoc2._id,
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.result, "successfully deleted")
      })
    done()
  })

  test("Delete an issue with an invalid _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test_endpoint")
      .send({
        _id: "123456789",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "could not delete")
        done()
      })
  })

  test("Delete an issue with missing _id: DELETE request to /api/issues/{project}", function (done) {
    chai
      .request(server)
      .delete("/api/issues/test_endpoint")
      .send({})
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.body.error, "missing _id")
        done()
      })
  })
})

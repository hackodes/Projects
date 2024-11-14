const chaiHttp = require("chai-http")
const chai = require("chai")
const assert = chai.assert
const server = require("../server")

chai.use(chaiHttp)

const { Thread, Reply } = require("../models")
const { resolveThread, resolveReply } = require("../helpers/testHelpers")
const { test_thread_data, test_reply_data } = require('../helpers/testEntitiesHelpers');

suite("Functional Tests", function () {
  test("Creating a new thread: POST request to /api/threads/{board}", function (done) {
    chai
      .request(server)
      .post(`/api/threads/${test_thread_data.board}`)
      .send(test_thread_data)
      .end(async (error, response) => {
        assert.equal(response.status, 200)
        assert.isDefined(response.body._id)
        assert.isArray(response.body.replies)
      })
    done()
  })
  test("Viewing the 10 most recent threads with 3 replies each: GET request to /api/threads/{board}", function (done) {
    chai
      .request(server)
      .get(`/api/threads/${test_thread_data.board}`)
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.isArray(response.body)
        assert.isObject(response.body[0])
        assert.isDefined(response.body[0].text)
        assert.isDefined(response.body[0].created_on)
        assert.isDefined(response.body[0].bumped_on)
        assert.isArray(response.body[0].replies)
        assert.isBelow(response.body[0].replies.length, 4)
        done()
      })
  })
  test("Deleting a thread with the incorrect password: DELETE request to /api/threads/{board} with an invalid delete_password", async function () {
    const test_thread = await resolveThread(test_thread_data.text)
    chai
      .request(server)
      .delete(`/api/threads/${test_thread_data.board}`)
      .send({
        ...test_thread_data,
        thread_id: test_thread._id.toString(),
        delete_password: "invalid",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.text, "incorrect password")
      })
  })
  test("Reporting a thread: PUT request to /api/threads/{board}", async function () {
    const test_thread = await resolveThread(test_thread_data.text, test_thread_data.delete_password)
    chai
      .request(server)
      .put(`/api/threads/${test_thread_data.board}`)
      .send({
        ...test_thread_data,
        thread_id: test_thread._id.toString(),
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.text, "reported")
      })
  })
  test("Creating a new reply: POST request to /api/replies/{board}", async function () {
    const test_thread = await resolveThread(test_reply_data.text, test_reply_data.delete_password)
    chai
      .request(server)
      .post(`/api/replies/${test_thread_data.board}`)
      .send({
        ...test_reply_data,
        thread_id: test_thread._id.toString(),
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.isDefined(response.body._id)
        assert.isArray(response.body.replies)
        assert.isObject(response.body.replies[0])
        assert.isDefined(response.body.replies[0].text)
        assert.isDefined(response.body.replies[0].created_on)
      })
  })
  test("Viewing a single thread with all replies: GET request to /api/replies/{board}", async function () {
    const test_thread = await resolveThread(test_thread_data.text)
    chai
      .request(server)
      .get(`/api/replies/${test_thread_data.board}` + "?thread_id=" + test_thread._id.toString())
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.isObject(response.body)
        assert.isDefined(response.body.text)
        assert.isDefined(response.body.created_on)
        assert.isDefined(response.body.bumped_on)
        assert.isArray(response.body.replies)
        assert.isDefined(response.body.replies[0].created_on)
      })
  })
  test("Deleting a reply with the incorrect password: DELETE request to /api/replies/{board} with an invalid delete_password", async function () {
    const test_thread = await resolveThread(test_reply_data.text)
    const test_thread_id = test_thread._id.toString()
    const test_reply = await resolveReply(test_thread_id)
    chai
      .request(server)
      .delete(`/api/replies/${test_thread_data.board}`)
      .send({
        thread_id: test_thread_id,
        reply_id: test_reply._id.toString(),
        delete_password: "invalid",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.text, "incorrect password")
      })
  })
  test("Deleting a reply with the correct password: DELETE request to /api/replies/{board} with a valid delete_password", async function () {
    const test_thread = await resolveThread(test_reply_data.text, test_reply_data.delete_password)
    const test_thread_id = test_thread._id.toString()
    const test_reply = await resolveReply(test_thread_id)
    chai
      .request(server)
      .delete(`/api/replies/${test_thread_data.board}`)
      .send({
        thread_id: test_thread_id,
        reply_id: test_reply._id.toString(),
        delete_password: test_reply.delete_password || "test",
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.text, "success")
      })
  })
  test("Reporting a reply: PUT request to /api/replies/{board}", async function () {
    const test_thread = await resolveThread(test_thread_data.text)
    const test_thread_id = test_thread._id.toString()
    const test_reply = await resolveReply(test_thread_id)
    chai
      .request(server)
      .put(`/api/replies/${test_thread_data.board}`)
      .send({
        thread_id: test_thread_id,
        reply_id: test_reply._id.toString(),
        board: "test",
      })
      .end(function (error, response) {
        assert.equal(response.text, "reported")
        assert.equal(response.status, 200)
      })
  })
  test("Deleting a thread with the correct password: DELETE request to /api/threads/{board} with a valid delete_password", async function () {
    const test_thread = await resolveThread(test_thread_data.text, test_thread_data.delete_password)
    chai
      .request(server)
      .delete(`/api/threads/${test_thread_data.board}`)
      .send({
        ...test_thread_data,
        thread_id: test_thread._id.toString(),
      })
      .end(function (error, response) {
        assert.equal(response.status, 200)
        assert.equal(response.text, "success")
      })
  })
})

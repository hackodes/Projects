"use strict"

const { Thread, Reply } = require("../models")
const { formatThread } = require("../helpers/formatHelpers")

const findThreadById = async (thread_id) => {
  const thread = await Thread.findById(thread_id).populate("replies")
  if (!thread) throw new Error("Thread not found")
  return thread
}

const createNewThread = async (board, text, delete_password) => {
  return Thread.create({
    board,
    text,
    delete_password,
    replies: [],
  })
}

const deleteThread = async (thread_id, delete_password) => {
  const thread = await findThreadById(thread_id)
  const result = await thread.deleteThread(delete_password)
  return result
}

const reportThread = async (thread_id) => {
  const thread = await findThreadById(thread_id)
  if (!thread) return null

  thread.reported = true
  await thread.save()
  return "reported"
}

const findReplyInThread = (thread, reply_id, delete_password = null) => {
  return thread.replies.find((reply) => {
    const isMatchingReply = reply._id.toString() === reply_id
    return delete_password ? isMatchingReply && reply.delete_password === delete_password : isMatchingReply
  })
}

const updateThreadBumpDate = async (thread) => {
  thread.bumped_on = new Date()
  await thread.save()
}

const createNewReply = (text, delete_password, date) => {
  return new Reply({
    text,
    delete_password,
    created_on: date,
  })
}

const markReplyAsDeleted = (reply) => {
  reply.text = "[deleted]"
}

module.exports = function (app) {
  app
    .route("/api/threads/:board")
    .post(async (request, response) => {
      try {
        const { board } = request.params
        const { text, delete_password } = request.body
        const thread = await createNewThread(board, text, delete_password)

        response.send(thread)
      } catch (error) {
        response.status(400).send("An error occurred while creating the thread")
      }
    })
    .get(async (request, response) => {
      try {
        const { board } = request.params
        const threads = await Thread.find({ board }).sort("-bumped_on").limit(10).populate("replies")

        response.send(threads.map((thread) => formatThread(thread, true)))
      } catch (error) {
        response.status(400).send("An error occurred while fetching threads")
      }
    })
    .delete(async (request, response) => {
      try {
        const { thread_id, delete_password } = request.body
        const result = await deleteThread(thread_id, delete_password)

        response.send(result)
      } catch (error) {
        response.status(400).send("An error occurred while deleting the thread")
      }
    })
    .put(async (request, response) => {
      try {
        const { thread_id } = request.body
        const result = await reportThread(thread_id)

        if (result) response.send(result)
        else response.send("incorrect thread id")
      } catch (error) {
        response.status(400).send("An error occurred while reporting the thread")
      }
    })

  app
    .route("/api/replies/:board")
    .post(async (request, response) => {
      try {
        const { text, delete_password, thread_id } = request.body
        const new_date = new Date()
        const new_reply = createNewReply(text, delete_password, new_date)

        const thread = await findThreadById(thread_id)
        thread.replies.push(new_reply)
        thread.bumped_on = new_date
        await thread.save()

        response.send(formatThread(thread))
      } catch (error) {
        response.status(400).send("An error occurred while creating the reply")
      }
    })
    .get(async (request, response) => {
      try {
        const { thread_id } = request.query
        const thread = await findThreadById(thread_id)

        response.send(formatThread(thread))
      } catch (error) {
        response.status(400).send("An error occurred while fetching the thread")
      }
    })
    .delete(async (request, response) => {
      try {
        const { thread_id, reply_id, delete_password } = request.body
        const thread = await Thread.findById(thread_id)

        if (!thread) return response.send("thread not found")

        const reply = findReplyInThread(thread, reply_id, delete_password)

        if (!reply) return response.send("incorrect password")

        markReplyAsDeleted(reply)
        await updateThreadBumpDate(thread)

        response.send("success")
      } catch (error) {
        response.status(400).send("An error while deleting reply")
      }
    })
    .put(async (request, response) => {
      try {
        const { thread_id, reply_id } = request.body
        const thread = await findThreadById(thread_id)

        const reply = findReplyInThread(thread, reply_id)

        if (!reply) return response.status(400).send("reply not found")

        reply.reported = true
        await updateThreadBumpDate(thread)

        response.send("reported")
      } catch (error) {
        response.status(400).send("An error occurred while reporting the reply")
      }
    })
}

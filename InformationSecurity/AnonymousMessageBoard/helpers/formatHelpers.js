const formatThread = (thread, limitReplies = false) => ({
  _id: thread._id,
  text: thread.text,
  created_on: thread.created_on,
  bumped_on: thread.bumped_on,
  replies: (limitReplies ? thread.replies.slice(0, 3) : thread.replies).map(formatReply),
})

const formatReply = (reply) => ({
  _id: reply._id,
  text: reply.text,
  created_on: reply.created_on,
})

module.exports = { formatThread }

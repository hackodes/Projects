const { Thread, Reply } = require("../models");

const resolveThread = async (text = "thread text", delete_password = "default_password", board = "anon-board") => {
  const existingThread = await Thread.findOne({ text, delete_password });
  return (
    existingThread ||
    Thread.create({
      board,
      text,
      delete_password,
      replies: []
    })
  );
};

const resolveReply = async (thread_id, text = "reply text", delete_password = "reply_password") => {
  const thread = await Thread.findById(thread_id);
  if (!thread) throw new Error("Thread could not be found");

  if (thread.replies.length > 0) return thread.replies[0];

  const newReply = new Reply({
    text,
    created_on: new Date(),
    reported: false,
    delete_password
  });

  thread.replies.push(newReply);
  await thread.save();

  return thread.replies[0];
};


module.exports = { resolveThread, resolveReply };


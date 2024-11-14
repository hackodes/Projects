const mongoose = require("mongoose")
const Reply = require("./replyModel")

const threadSchema = new mongoose.Schema({
  board: { type: String, required: true },
  text: { type: String, required: true },
  created_on: { type: Date, required: true, default: Date.now },
  bumped_on: { type: Date, required: true, default: Date.now },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
  replies: [Reply.schema],
})

threadSchema.methods.deleteThread = async function (password) {
  if (this.delete_password === password) {
    await this.deleteOne()
    return "success"
  } else {
    return "incorrect password"
  }
}

const Thread = mongoose.model("Thread", threadSchema)

module.exports = Thread

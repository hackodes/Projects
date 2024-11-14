const mongoose = require("mongoose");

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  created_on: { type: Date, required: true, default: Date.now },
  reported: { type: Boolean, default: false },
  delete_password: { type: String, required: true },
});

const Reply = mongoose.model("Reply", replySchema);

module.exports = Reply;

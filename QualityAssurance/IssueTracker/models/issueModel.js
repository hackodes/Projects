const mongoose = require("mongoose")
const { Schema } = mongoose

const IssueSchema = new Schema({
  project_id: { type: String, required: true },
  issue_title: { type: String, required: true },
  issue_text: { type: String, required: true },
  created_by: { type: String, required: true },
  assigned_to: { type: String },
  status_text: { type: String },
  created_on: { type: Date },
  updated_on: { type: Date },
  open: { type: Boolean },
})

const Issue = mongoose.model("Issue", IssueSchema)

module.exports = Issue

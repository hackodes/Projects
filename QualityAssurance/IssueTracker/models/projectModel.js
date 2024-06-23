const mongoose = require("mongoose")
const { Schema } = mongoose

const ProjectSchema = new Schema({
  name: { type: String, required: true },
})

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project

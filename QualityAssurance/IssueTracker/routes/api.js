"use strict"

const IssueModel = require("../models/issueModel")
const ProjectModel = require("../models/projectModel")

module.exports = function (app) {
  app
    .route("/api/issues/:project")

    .get(async (request, response) => {
      const { project: project_name } = request.params
      try {
        const project = await ProjectModel.findOne({ name: project_name })
        if (!project) {
          response.json([{ error: "project not found" }])
          return
        } else {
          const issues = await IssueModel.find({
            project_id: project._id,
            ...request.query,
          })
          if (!issues) {
            response.json([{ error: "no issues found" }])
            return
          }
          response.json(issues)
          return
        }
      } catch (err) {
        response.json({ error: "could not get", _id: _id })
        return
      }
    })

    .post(async (request, response) => {
      const { project: project_name } = request.params
      const { issue_title, issue_text, created_by, assigned_to, status_text } = request.body

      if (!issue_title || !issue_text || !created_by) {
        response.json({ error: "required field(s) missing" })
        return
      }
      try {
        let project_model = await ProjectModel.findOne({ name: project_name })
        if (!project_model) {
          project_model = new ProjectModel({ name: project_name })
          project_model = await project_model.save()
        }
        const issueModel = new IssueModel({
          project_id: project_model._id,
          issue_title: issue_title || "",
          issue_text: issue_text || "",
          created_on: new Date(),
          updated_on: new Date(),
          created_by: created_by || "",
          assigned_to: assigned_to || "",
          open: true,
          status_text: status_text || "",
        })
        const issue = await issueModel.save()
        response.json(issue)
        return
      } catch (err) {
        response.json({ error: "could not post", _id: _id })
        return
      }
    })

    .put(async (request, response) => {
      const { project: project_name } = request.params
      const { _id, issue_title, issue_text, created_by, assigned_to, status_text, open } = request.body
      if (!_id) {
        response.json({ error: "missing _id" })
        return
      }
      if (!issue_title && !issue_text && !created_by && !assigned_to && !status_text && !open) {
        response.json({ error: "no update field(s) sent", _id: _id })
        return
      }

      try {
        const project_model = await ProjectModel.findOne({ name: project_name })
        if (!project_model) {
          response.json({ error: "could not find project" })
          return
        }
        let issue = await IssueModel.findByIdAndUpdate(_id, {
          ...request.body,
          updated_on: new Date(),
        })
        await issue.save()
        response.json({ result: "successfully updated", _id: _id })
        return
      } catch (err) {
        response.json({ error: "could not update", _id: _id })
        return
      }
    })

    .delete(async (request, response) => {
      const { project: project_name } = request.params
      const { _id } = request.body
      if (!_id) {
        response.json({ error: "missing _id" })
        return
      }
      try {
        const project_model = await ProjectModel.findOne({ name: project_name })
        if (!project_model) {
          response.json({ error: "could not find project" })
          return
        }
        const result = await IssueModel.deleteOne({
          _id: _id,
          project_id: project_model._id,
        })
        if (result.deletedCount === 0) {
          response.json({ error: "could not delete", _id: _id })
          return
        }
        response.json({ result: "successfully deleted", _id: _id })
        return
      } catch (err) {
        response.json({ error: "could not delete", _id: _id })
        return
      }
    })
}

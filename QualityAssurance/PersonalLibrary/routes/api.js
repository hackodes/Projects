/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict"

const Book = require("../models/bookModel")

module.exports = function (app) {
  app
    .route("/api/books")
    .get(async function (request, response) {
      //response will be array of book objects
      //json response format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]

      try {
        const books = await Book.find({})

        if (!books) {
          return response.json([])
        }

        const booksList = books.map((book) => {
          return {
            _id: book._id,
            title: book.title,
            commentcount: book.comments.length,
          }
        })

        response.json(booksList)
        return
      } catch (error) {
        response.json([])
      }
    })

    .post(async function (request, response) {
      let title = request.body.title
      //response will contain new book object including atleast _id and title
      if (!title) {
        return response.send("missing required field title")
      }
      const book = new Book({ title, comments: [] })
      try {
        await book.save()
        response.json({ _id: book._id, title: book.title })
      } catch (error) {
        response.send("error while saving book")
      }
    })

    .delete(async function (request, response) {
      //if successful response will be 'complete delete successful'
      try {
        const result = await Book.deleteMany({})
        response.send("complete delete successful")
      } catch (error) {
        response.send("error while deleting books")
      }
    })

  app
    .route("/api/books/:id")
    .get(async function (request, response) {
      let bookid = request.params.id
      //json response format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}

      try {
        const book = await Book.findById(bookid)
        response.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length,
        })
      } catch (error) {
        response.send("no book exists")
      }
    })

    .post(async function (request, response) {
      let bookid = request.params.id
      let comment = request.body.comment
      //json response format same as .get

      if (!comment) {
        return response.send("missing required field comment")
      }

      try {
        const book = await Book.findById(bookid)
        book.comments.push(comment)
        await book.save()
        response.json({
          _id: book._id,
          title: book.title,
          comments: book.comments,
          commentcount: book.comments.length,
        })
      } catch (error) {
        response.send("no book exists")
      }
    })

    .delete(async function (request, response) {
      let bookid = request.params.id
      //if successful response will be 'delete successful'
      try {
        const result = await Book.findByIdAndDelete(bookid)
        if (!result) {
          return response.send("no book exists")
        }
        response.send("delete successful")
      } catch (error) {
        response.send("no book exists")
      }
    })
}

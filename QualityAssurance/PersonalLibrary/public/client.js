$(document).ready(function () {
  let items = []
  let itemsRaw = []

  $.getJSON("/api/books", function (data) {
    //let  items = [];
    itemsRaw = data
    $.each(data, function (i, val) {
      items.push('<li class="bookItem" id="' + i + '">' + val.title + " - " + val.commentcount + " comments</li>")
      return i !== 14
    })
    if (items.length >= 15) {
      items.push("<p>...and " + (data.length - 15) + " more!</p>")
    }
    $("<ul/>", {
      class: "listWrapper",
      html: items.join(""),
    }).appendTo("#display")
  })

  let comments = []
  $("#display").on("click", "li.bookItem", function () {
    $("#detailTitle").html("<b>" + itemsRaw[this.id].title + "</b> (id: " + itemsRaw[this.id]._id + ")")
    $.getJSON("/api/books/" + itemsRaw[this.id]._id, function (data) {
      comments = []
      $.each(data.comments, function (i, val) {
        comments.push('<li class="mb-2">' + val + "</li>")
      })
      comments.push(`
              <br>
              <form id="newCommentForm" class="flex flex-col space-y-2">
                  <input 
                      type="text" 
                      class="w-full rounded py-2 px-3 mb-3 border-4 border-double border-gray-300 focus:border-lime-400 focus:bg-lime-100 outline-none" 
                      id="commentToAdd" 
                      name="comment" 
                      placeholder="New Comment"
                  >
              </form>
          `)
      comments.push(`
              <br>
              <button 
                  class="bg-lime-600 hover:bg-lime-700 text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:shadow-outline addComment" 
                  id="${data._id}"
              >
                  Add Comment
              </button>
          `)
      comments.push(`
              <button 
                  class="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-md focus:outline-none focus:shadow-outline deleteBook" 
                  id="${data._id}"
              >
                  Delete Book
              </button>
          `)
      $("#detailComments").html(comments.join(""))
    })
  })

  $("#bookDetail").on("click", "button.deleteBook", function () {
    $.ajax({
      url: "/api/books/" + this.id,
      type: "delete",
      success: function (data) {
        //update list
        $("#detailComments").html('<p style="color: red;">' + data + "<p><p>Refresh the page</p>")
      },
    })
  })

  $("#bookDetail").on("click", "button.addComment", function () {
    let newComment = $("#commentToAdd").val()
    $.ajax({
      url: "/api/books/" + this.id,
      type: "post",
      dataType: "json",
      data: $("#newCommentForm").serialize(),
      success: function (data) {
        comments.unshift(newComment) //adds new comment to top of list
        $("#detailComments").html(comments.join(""))
      },
    })
  })

  $("#newBook").click(function () {
    $.ajax({
      url: "/api/books",
      type: "post",
      dataType: "json",
      data: $("#newBookForm").serialize(),
      success: function (data) {
        //update list
      },
    })
  })

  $("#deleteAllBooks").click(function () {
    $.ajax({
      url: "/api/books",
      type: "delete",
      dataType: "json",
      data: $("#newBookForm").serialize(),
      success: function (data) {
        //update list
      },
    })
  })
})

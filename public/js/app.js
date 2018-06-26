$(document).ready(function(){

var saveNotes = function(id){
    // When you click the savenote button
$("#noteModal").modal("hide");
$("#saveNote").on("click", function() {
    // Grab the id associated with the article from the submit button
    var thisId =  id 
    // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/makenote/" + thisId,
      data: {
        // Value taken from title input
        title: $("#noteTitle").val().trim(),
        // Value taken from note textarea
        body: $("#noteBody").val().trim()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#noteText, #noteTitle, #noteBody").empty();
      });
    // Also, remove the values entered in the input and textarea for note entry
    $("#noteTitle").val("");
    $("#noteBody").val("");
  });
}

    // var sendNote = function(element){
    //     var note = {};
    //     note.articleId = $(element).attr('data-id'),
    //     note.title = $("#noteTitle").val().trim();
    //     note.body = $("#noteBody").val().trim();
    //     if(note.title && note.body){
    //         $.ajax({
    //             url: "/makenote",
    //             method: "POST",
    //             data: note
    //         }).then(function(data){
    //             showNote(data, data.articleId);
    //             $("#noteBody, #noteTitle".val("")); 
    //         })
    //     }
    // }


    var showError = function(){
        $("#errorNote").modal("show");
        $("#errorHome").modal("show");
    }

    // var showNote = function(element,articleId){
    //     var title = $("<p>")
    //     .text(element.title)
    //     .addClass("titleNote");
    //     var deleteBtn = $("<button>")
    //     .text("X")
    //     .addClass("deleteNote");
    //     var note = $("<div>")
    //     .append($deleteButton, $title)
    //     .attr("data-note-id", element._id)
    //     .attr("data-article-id", articleId)
    //     .addClass("note")
    //     .appendTo("noteText");
    // }

    $("#alertModal").on("hide.bs.modal", function(){
        // event.preventDefault();
        window.location.href = "/";
    });
    
    $(document).on("click", "#saveArticle", function(){
        var articleId = $(this).data("id");
        $.ajax({
            url: "/save/"+articleId,
            method: "GET",
            success: function (){
                window.location.href = "/saved";
            },
            error: function(error){
                showError(error);
            }
        });
    });

    $(".addNote").on("click", function(event){
        $("#noteText, #noteTitle, #noteBody").empty();
        var id = $(this).data("id");
        $.ajax({
            url: "/getnotes/"+id,
            method: "GET",
            data: id
        }).then(function(data){
            console.log(data)
            saveNotes(data["_id"]);
        //     // The title of the article
        //     $("#notes").append("<h2>" + data.title + "</h2>");
        //     // An input to enter a new title
        //     $("#notes").append("<input id='titleinput' name='title' >");
        //     // A textarea to add a new note body
        //     $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        //     // A button to submit a new note, with the id of the article saved to it
        //     $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
        //   // If there's a note in the article
          if (data.note) {
            // Place the title of the note in the title input
            $("#noteTitle").val(data["title"]);
            // Place the body of the note in the body textarea
            $("#noteBody").val(data.note.body);
            $("#noteModal").modal("show");
          }else{
            $("#noteModal").modal("show");
            saveNotes(data["_id"]);
          }
        })
    });

    // $("#saveNote").on("click", function(event){
    //     event.preventDefault();
    //     sendNote($(this));
    // });

    // $("#noteBody").on("keypress", function(event){
    //     if(event.keyCode === 13){
    //         sendNote($(this));
    //     }
    // })
    
    $(".deleteArticle").on("click", function(event){
        event.preventDefault();
        var id = $(this).data("id");
        $.ajax({
            url:"/deleteArticle/"+id,
            method: "DELETE",
            success: function(){
                window.location.href = "/saved";
            },
            error: function(error){
                showError(error);
            }
        });
    });

    $(document).on("click", ".deleteNote", function(event){
        event.stopPropagation();
        var thisItem = $(this);
        var ids = {
            noteId: $(this).parent().data("note-id"),
            articleId: $(this).parent().data("article-id")
        };
        $ajax({
            url: "/deleteNote/"+id,
            method: "POST",
            data: ids,
            success: function(res){
                thisItem.parent().remove();
            },
            error: function(error){
                showError(error);
            }        
        });
    });

    $(document).on("click", ".note", function(event){
        event.stopPropagation();
        var id = $(this).data("note-id");
        $.ajax({
            url: "/getonenote/"+id,
            method: "GET",
            success: function(note){
                $("#noteTitle").val(note.title);
                $("#noteBody").val(note.body);
            },
            error: function(error){
                showError(error);
            }
        });
    });
})
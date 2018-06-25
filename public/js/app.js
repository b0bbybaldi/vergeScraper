$(document).ready(function(){

    var sendNote = function(element){
        var note = {};
        note.articleId = $(element).attr('data-id'),
        note.title = $("#noteTitle").val().trim();
        note.body = $("#noteBodyEntry").val().trim();
        if(note.title && note.body){
            $.ajax({
                url: "/notes-controller/makenote",
                type: "POST",
                data: note,
                success: function(res){
                    showNote(res, note.articleId);
                    $("#noteBody, #noteTitle".val(""));
                },
                error: function (error){
                    showError(error);
                }
            })
        }
    }

    var showError= function(error){
        $("#errorNote").modal("show");
        $("#errorHome").modal("show");
    }

    var showNote = function(element,articleId){
        var title = $("<p>")
        .text(element.title)
        .addClass("titleNote");
        var deleteBtn = $("<button>")
        .text("X")
        .addClass("deleteNote");
        var note = $("<div>")
        .append($deleteButton, $title)
        .attr("data-note-id", element._id)
        .attr("data-article-id", articleId)
        .addClass("note")
        .appendTo("noteText");
    }

    $("#alertModal").on("hide.bs.modal", function(event){
        // event.preventDefault();
        window.location.href = "/";
    });
    
    $(document).on("click", "#saveArticle", function(event){
        var articleId = $(this).data("id");
        $.ajax({
            url: "/unsaved-controller/save/"+articleId,
            type: "PUT",
            success: function (response){
                window.location.href = "/";
            },
            error: function(error){
                showError(error);
            }
        });
    });

    $(".addNote").on("click", function(event){
        $("#noteText").empty();
        $("#noteTitle, #noteBody").val("");
        var id = $(this).data("id");
        $("#saveNote, #noteBody").attr("data-id", id);
        $.ajax({
            url: "/notes-controller/getnotes/"+id,
            type: "GET",
            success: function (data){
                $.each(data.notes, function(i, item){
                    showNote(item, id);
                });
                $("#noteModal").modal("show");
            },
            error: function(error){
                showError(error);
            }
        });
    });

    $("#saveNote").on("click", function(event){
        event.preventDefault();
        sendNote($(this));
    });

    $("#noteBody").on("keypress", function(event){
        if(event.keyCode === 13){
            sendNote($(this));
        }
    })
    
    $(".deleteArticle").on("click", function(event){
        event.preventDefault();
        var id = $(this).data("id");
        $.ajax({
            url:"/saved-controller/deleteArticle"+id,
            type: "DELETE",
            success: function(response){
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
            url: "/notes-controller/deleteNote/"+id,
            type: "POST",
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
            url: "/notes-controller/getonenote/"+id,
            type: "GET",
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
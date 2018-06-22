
$("getarticles").on("click", function(event){
    event.preventDefault();

    $.get("/articles", function(data) {
        for (var i = 0; i < data.length; i++) {
        //   $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
        res.render("home", {articles: data})
    }
      });
    


})





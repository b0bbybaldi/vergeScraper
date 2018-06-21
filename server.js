var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 1992;

var db = require("./models");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

require("./controllers/html-routes")(app);
require("./controllers/scrape")(app);
require("./controllers/articles")(app);
require("./controllers/notes")(app);

mongoose.connect("mongodb://localhost/vergeScraper");


app.get("/scrape", function (req, res) {

    axios.get("https://www.theverge.com/").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div h2").each(function (i, element) {

            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
                console.log("this is results", result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape All Complete");
    });
});

app.get("/tech", function (req, res) {

    axios.get("https://www.theverge.com/tech").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div h2").each(function (i, element) {

            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
                console.log("this is results", result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape Tech Complete");
    });
});

app.get("/science", function (req, res) {

    axios.get("https://www.theverge.com/science").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div h2").each(function (i, element) {

            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
                console.log("this is results", result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape Tech Complete");
    });
});

app.get("/culture", function (req, res) {

    axios.get("https://www.theverge.com/culture").then(function (response) {
        var $ = cheerio.load(response.data);

        $("div h2").each(function (i, element) {

            var result = {};
            result.title = $(this)
                .children("a")
                .text();
            result.link = $(this)
                .children("a")
                .attr("href");
                console.log("this is results", result);
            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    return res.json(err);
                });
        });

        res.send("Scrape Tech Complete");
    });
});

app.get("/articles", function (req, res) {
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

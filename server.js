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
require("./controllers/articles-controller")(app);
require("./controllers/notes-controller")(app);

mongoose.connect("mongodb://localhost/vergeScraper");

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

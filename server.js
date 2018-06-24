var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");
var request = require("request");
var method = require("method-override");

var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 1992;

// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vergeScraper";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

var db = require("./models");

app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(express.static("public"));

require("./controllers/html-routes")(app);
require("./controllers/articles-controller")(app);
require("./controllers/notes-controller")(app);

var unsaved = require("./controllers/unsaved-controller")
app.use(unsaved);

var saved = require("./controllers/saved-controller")
app.use(saved);

app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});

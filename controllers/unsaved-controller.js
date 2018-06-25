var db = require("../models");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vergeScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

router.get("/unsaved", function(req,res){
    db.Article.find({saved:false}).populate("note").then(function(unsavedArticle){
        console.log("this are the articles:", unsavedArticle)
        res.render("unsaved", {articles: unsavedArticle});
    }).catch(function(err){
        res.json(err);
    })
});

router.get("/save/:id", function(req,res){
    db.Article.update({_id: req.params.id}, {saved:true}).then(function(result){
        res.redirect("/")
    }).catch(function(err){
        res.json(err);
    })
})

module.exports = router;

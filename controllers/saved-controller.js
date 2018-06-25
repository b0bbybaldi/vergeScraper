var db = require("../models");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vergeScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

router.get("/saved", function(req,res){
    db.Article.find({saved:true}).populate("note").then(function(savedArticle){
    //    console.log("this are the articles:", savedArticle)
        res.render("saved", {articles: savedArticle});
    }).catch(function(err){
        res.json(err);
    })
});

router.delete("/deleteArticle/:id", function(req,res){
    db.Article.remove({_id: req.params.id}).then(function(result){
        res.json(result);
    }).catch(function(err){
        res.json(err);
    })
})

module.exports = router;

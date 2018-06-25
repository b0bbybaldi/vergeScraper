var db = require("../models");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vergeScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

router.get("/getnotes/:id", function(req,res){
    db.Article.findOne({id:req.params.id}).populate("note").then(function(resNotes){
        console.log("this are the notes:", resNotes)
        res.json(resNotes)
    }).catch(function(err){
        res.json(err);
    })
});

router.get("/getonenote/:id", function(req,res){
    db.Note.findOne({id:req.params.id}).then(function(resNote){
        console.log("this are the notes:", resNote)
        res.json(resNote)
    }).catch(function(err){
        res.json(err);
    })
});

router.get("/makenote", function(req,res){
    req.body = {title, body, articleId}
    var note = {
        title, 
        body
    }l
    db.Note.create(note).then(function(result){
        db.Article.findOneAndUpdate(_id: articleId, {$push:{notes:result._id}},{new:true})
        .then(function(data){
            res.json(result);
        })
        .catch(function(err){
            res.json(err);
        })
    })
    .catch(function(err){
        res.json(err);
})

router.post('/deleteNote', function(req,res){
    req.body = {articleId, noteId}
    db.Note
        .remove({_id: noteId})
        .then(function(result){
            res.json(result)
        })
        .catch(function(err){
            res.json(err);
        })
})


module.exports = router;
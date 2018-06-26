var db = require("../models");
var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/vergeScraper";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI)

router.get("/getnotes/:id", function (req, res) {
    db.Article.findOne({_id: req.params.id }).populate("note").then(function (resNotes) {
    console.log("this are the notes:", resNotes)
        res.json(resNotes)
    }).catch(function (err) {
        res.json(err);
    })
});

router.get("/getonenote/:id", function (req, res) {
    db.Note.findOne({_id: req.params.id }).then(function (resNote) {
        console.log("this are the notes:", resNote)
        res.json(resNote)
    }).catch(function (err) {
        res.json(err);
    })
});

// Route for saving/updating an Article's associated Note
router.post("/makenote/:id", function(req, res) {
    // Create a new note and pass the req.body to the entry
    db.Note.create(req.body)
      .then(function(dbNote) {
        // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
        // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
        // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
        return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
      })
      .then(function(dbArticle) {
        // If we were able to successfully update an Article, send it back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

// router.post("/makenote", function (req, res) {
//     req.body = { title, body, articleId }
//     var note = {
//         title,
//         body
//     }
//     db.Note.create(note).then(function (result) {
//         db.Article.findOneAndUpdate({ _id: articleId }, { $push: { notes: result._id } }, { new: true })
//             .then(function (data) {
//                 res.json(result);
//             })
//             .catch(function (err) {
//                 res.json(err);
//             })
//     })
//         .catch(function (err) {
//             res.json(err);
//         })
//     })

    router.post('/deleteNote', function (req, res) {
        req.body = { articleId, noteId }
        db.Note
            .remove({ _id: noteId })
            .then(function (result) {
                res.json(result)
            })
            .catch(function (err) {
                res.json(err);
            })
    })


    module.exports = router;
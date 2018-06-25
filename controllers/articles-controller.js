var db = require("../models");
var axios = require("axios");
var cheerio = require("cheerio");
// var express = require("express");
// var router = express.Router();

module.exports = function (app){
    
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
   //                 console.log("this is results", result);
                db.Article.create(result)
                    .then(function (dbArticle) {
   //                     console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });     
            res.render("home");
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
                  //  console.log("this is results", result);
                db.Article.create(result)
                    .then(function (dbArticle) {
                    //    console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });
            res.render("home");
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
                  //  console.log("this is results", result);
                db.Article.create(result)
                    .then(function (dbArticle) {
                  //      console.log(dbArticle);
                    })
                    .catch(function (err) {
                        return res.json(err);
                    });
            });
            res.render("home");
        });
    });
}


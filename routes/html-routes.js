const db = require("../models");

module.exports = app => {
  app.get("/", (req, res) => {
    res.json("this is the home page");
  });

  //retrieve all of the articles
  app.get("/articles", (req, res) => {
    db.Article.find({})
      .sort({ date: -1 })
      .populate("comments")
      .then(function(dbArticle) {
        //this needs to be res.render for handle bars
        console.log(dbArticle);
        res.json(dbArticle);
      })
      .catch(function(err) {
        //doesnt necessarily need to be res.render
        res.json(err);
      });
  });
};

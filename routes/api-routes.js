const db = require("../models");

module.exports = (app, axios, cheerio) => {
  app.get("/scrape", (req, res) => {
    axios.get("http://www.reddit.com/").then(function(response) {
      let $ = cheerio.load(response.data);

      $("span.y8HYJ-y_lTUHkQIc1mdCq").each(function(i, element) {
        let result = {};
        result.link = $(element)
          .children()
          .attr("href");
        result.title = $(element)
          .children()
          .text();
        db.Article.create(result)
          .then(function(dbArticle) {
            console.log(dbArticle);
          })
          .catch(function(err) {
            return res.json(err);
          });
      });
    });
    res.status(200).render("handlebars shit");
  });

  app.get("/articles", (req, res) => {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.get("/articles/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("comment")
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  app.post("/articles/:id", (req, res) => {
    db.Comment.create(req.body)
      .then(function(dbComment) {
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { comment: dbComment._id },
          { new: true }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
};

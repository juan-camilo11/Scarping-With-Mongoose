const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//using the schema constructor, create a new ArticleSchema
//object, similar to a sequelize model
const ArticleSchema = new Schema({
  //title is required and of type string
  title: {
    type: String,
    required: true
  },

  link: {
    type: String,
    required: true
  },
  comments: [{type: Schema.Types.ObjectId, ref:'Comment'}],
  date: {
    type: Date,
    default: Date.now
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
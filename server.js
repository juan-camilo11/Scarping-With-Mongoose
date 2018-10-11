const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyParser = require("body-parser")
const path = require("path");

const db = require("./models");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
//parse application/json
app.use(bodyParser.json());

//require handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({defaultLAyout: "main"}));
app.set("view engine", "handlebars");

//server static content from the public directory
app.use(express.static(path.join(__dirname, "public")));

require("./routes/api-routes")(app,axios,cheerio);
require("./routes/html-routes")(app);

mongoose.connect("mongodb://localhost/homeworkScraper", {useNewUrlParser: true});



app.listen(PORT, () => {
    console.log("Server listening on: http://localhost" + PORT);
});
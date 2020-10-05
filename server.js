const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Article = require("./models/Article");
const methodOverride = require("method-override");
const articlesRoute = require("./routes/articles");

mongoose.connect(
  "mongodb://localhost/Ourblog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  (err) => {
    if (!err) {
      console.log(`Connected to Mongo DB`);
    } else {
      console.log(err.message);
    }
  }
);

// view engine setup
//app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Parse Url Encoded Bodies and JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
//Serving static files in Express
app.use(express.static("public"));

//Main Index Route
app.get("/", async (req, res) => {
  const articles = await Article.find().sort({
    createdAt: "desc",
  });
  res.render("articles/index", {
    articles: articles,
  });
});

//Middlware routes
app.use("/articles", articlesRoute);

//Create a Server and Listening PORT
port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

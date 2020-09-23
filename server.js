const express = require("express");
const mongoose = require("mongoose");
const app = express();

const articlesRoute = require("./routes/articles");

mongoose.connect(
  "mongodb://localhost/Ourblog",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
app.use(express.urlencoded({ extended: false }), express.json());

//Serving static files in Express
app.use(express.static("public"));

//Main Index Route
app.get("/", (req, res) => {
  const articles = [
    {
      title: "Test Article",
      createdAt: new Date(),
      description: "Test Description",
    },
    {
      title: "Test Article2",
      createdAt: new Date(),
      description: "Test Description2",
    },
  ];
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

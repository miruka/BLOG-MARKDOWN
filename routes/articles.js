const express = require("express");
const router = express.Router();

const Article = require("../models/Article");

router.get("/", (req, res) => {
  res.send("Home");
});

router.get("/new", (req, res) => {
  res.render("articles/new", { article: new Article() });
});

router.get("/:articleId", (req, res) => {
  Article.findById(req.params.articleId)
    .exec()
    .then((foundArticleId) => {
      if (foundArticleId) {
        //console.log(foundArticleId);
        res.render("articles/show", { foundArticleId: foundArticleId });
      } else {
        //console.log("No Article Found By That ID");
        res.redirect("/");
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

router.post("/", (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown,
  });

  // try {
  //   article = await article.save();
  //   // console.log(article);
  //   res.redirect(`/articles/${article.id}`);
  //   console.log(article);
  // } catch (error) {
  //   //console.error(error);
  //   res.render(`articles/new`, { article: article });
  //   console.log(error);
  // }

  article
    .save()
    .then((createdArticle) => {
      //console.log(createdArticle);
      res.redirect(`/articles/${article.id}`);
    })
    .catch((err) => {
      //console.error(err);
      res.render(`articles/new`, { article: article });
    });
});

module.exports = router;

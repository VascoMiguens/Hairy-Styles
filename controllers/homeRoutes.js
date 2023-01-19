const router = require("express").Router();

const { Hairdresser, User, Post, HairStyle, Comment, StyleTag } = require("../models");

const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const newData = await Post.findAll({
      include: [
        { model: User }
      ]
    });

    const posts = newData.map((post) => post.get({ plain: true })); 

    res.render("homepage", {
      logged_in: req.session.logged_in,

      google_api_key: process.env.GOOGLE_API_KEY,

    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {

    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get("/profile", withAuth, async (req, res) => {
  if (req.session.logged_out) {
    res.redirect('/login');
  } else {   
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] }, //delete if change password
      // include: [
      //   {
      //     model: Post,
      //   },
      //   {
      //     model: Hairdresser,
      //   },

      //   {
      //     model: HairStyle,
      //   },
      // ],

    });
    const user = userData.get({ plain: true });
    console.log(userData);
    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}});

router.get("/contact", async (req, res) => {
  res.render("contact");
});

router.get("/search", async (req, res) => {
  res.render("search");
});

router.get("/login", async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", async (req, res) => {
  res.render("signup");
});

module.exports = router;

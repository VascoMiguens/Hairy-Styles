const router = require("express").Router();
const { Hairdresser, User, Post, HairStyle, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
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
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Comment,
        },
      ],
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

router.get("/profile", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] }, //delete if change password
      include: [
        {
          model: Post,
        },
        {
          model: Hairdresser,
        },
        {
          model: HairStyle,
        },
      ],
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
});

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

const router = require("express").Router();

const {
  Hairdresser,
  User,
  Post,
  HairStyle,
  Comment,
  StyleTag,
} = require("../models");

const withAuth = require("../utils/auth");
const middlewareHairstyle = require("../utils/hairstyleMiddleware");
router.get("/", middlewareHairstyle, async (req, res) => {
  try {
    const newData = await Post.findAll({
      include: [
        {
          model: User,
          exclude: ["password"],
        },
        {
          model: Hairdresser,
        },
        {
          model: HairStyle,
        },
      ],
    });
    const posts = newData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", middlewareHairstyle, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          exclude: ["password"],
        },
        {
          model: Hairdresser,
        },
        {
          model: HairStyle,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    if (!postData) {
      res.redirect(301, "/profile");
      return;
    }
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, middlewareHairstyle, async (req, res) => {
  if (req.session.logged_out) {
    res.redirect("/login");
  } else {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            include: [
              {
                model: Hairdresser,
              },
              {
                model: HairStyle,
              },
            ],
          },
        ],
      });
      const user = userData.get({ plain: true });
      res.render("profile", {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get(
  "/post/:id/edit",
  withAuth,
  middlewareHairstyle,
  async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      const post = postData.get({ plain: true });
      res.render("edit-post", {
        ...post,
        logged_in: req.session.logged_in,
        isOwner: req.session.user_id === post.user_id,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/newpost", withAuth, middlewareHairstyle, async (req, res) => {
  try {
    const newHairstyle = await HairStyle.findAll({
      order: [["hairstyle_name", "ASC"]],
    });
    const newHairdresser = await Hairdresser.findAll({
      order: [["hairdresser_name", "ASC"]],
    });
    const hairstyle = newHairstyle.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
    const hairdresser = newHairdresser.map((hairdresser) =>
      hairdresser.get({ plain: true })
    );
    res.render("new-post", {
      hairstyle: hairstyle,
      hairdresser: hairdresser,
      user_id: req.session.user_id,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/contacts", middlewareHairstyle, async (req, res) => {
  res.render("contact", {
    logged_in: req.session.logged_in,
  });
});

router.get("/search/:id", middlewareHairstyle, async (req, res) => {
  try {
    const searchData = await Post.findAll({
      where: {
        hairstyle_id: req.params.id,
      },
      include: [
        {
          model: Hairdresser,
        },
        {
          model: HairStyle,
        },
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    if (!searchData) {
      res.status(404).json({ message: "No posts found whit that id" });
    }
    const search = searchData.map((post) => post.get({ plain: true }));
    console.log(search);
    res.render("search", {
      post: search,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", middlewareHairstyle, async (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

router.get("/signup", middlewareHairstyle, async (req, res) => {
  res.render("signup", {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;

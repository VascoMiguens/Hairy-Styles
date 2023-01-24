const router = require("express").Router();

const { Hairdresser, User, Post, HairStyle, Comment } = require("../models");

const withAuth = require("../utils/auth");
const middlewareHairstyle = require("../utils/hairstyleMiddleware");

// homepage route
router.get("/", middlewareHairstyle, async (req, res) => {
  try {
    // find all posts and include user, hairdresser and hairstyle
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
    // convert data to plain Javascript object
    const posts = newData.map((post) => post.get({ plain: true }));
    // render homepage handlebar and pass posts, logged in status, and google api key
    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Single Post Route
router.get("/post/:id", middlewareHairstyle, async (req, res) => {
  try {
    // Find post where the post's id equals the one clicked
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
    // if no post data is found move permanently to /profile
    if (!postData) {
      res.redirect(301, "/profile");
      return;
    }
    //coverte postData to plain Javascript object
    const post = postData.get({ plain: true });
    // render single-post handlebar and pass posts, logged in status, and google api key
    res.render("single-post", {
      post,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Profile Route
router.get("/profile", withAuth, middlewareHairstyle, async (req, res) => {
  // if user is looged out redirect to login page
  if (req.session.logged_out) {
    res.redirect("/login");
  } else {
    // find user by id
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
      // convert userdata to plain Javascript object
      const user = userData.get({ plain: true });
      // render profile page and pass user object and logged_in status
      res.render("profile", {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

// Edit Post Route
router.get(
  "/post/:id/edit",
  withAuth,
  middlewareHairstyle,
  async (req, res) => {
    try {
      // FInd post by id
      const postData = await Post.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: { exclude: ["password"] },
          },
        ],
      });
      // convert postData to plain Javascript object
      const post = postData.get({ plain: true });
      // render edit-post page and pass post object, logged_in status and check if user is the owner of the post
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

// New Post Route
router.get("/newpost", withAuth, middlewareHairstyle, async (req, res) => {
  try {
    // Find All Hairstyles
    const newHairstyle = await HairStyle.findAll({
      order: [["hairstyle_name", "ASC"]],
    });
    // Find All Hairdressers
    const newHairdresser = await Hairdresser.findAll({
      order: [["hairdresser_name", "ASC"]],
    });
    // convert Hairstyle to plain Javascript object
    const hairstyle = newHairstyle.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
    // convert Hairdresser to plain Javascript object
    const hairdresser = newHairdresser.map((hairdresser) =>
      hairdresser.get({ plain: true })
    );
    // render new-post page and pass hairstyle and hairdresser object, the user's id, logged_in status and google api key
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

// Contacts Route
router.get("/contacts", middlewareHairstyle, async (req, res) => {
  // render contact page
  res.render("contact", {
    logged_in: req.session.logged_in,
  });
});

// Search Hairstyle Route
router.get("/search/:id", middlewareHairstyle, async (req, res) => {
  try {
    // Find all Posts
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
    // If no Posts are found return
    if (!searchData) {
      res.status(404).json({ message: "No posts found whit that id" });
    }
    // convert searchData to plain Javascript object
    const search = searchData.map((post) => post.get({ plain: true }));
    console.log(search);
    // / render search page and search as a variable called post, logged_in status and google api key
    res.render("search", {
      post: search,
      logged_in: req.session.logged_in,
      google_api_key: process.env.GOOGLE_API_KEY,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login Page
router.get("/login", middlewareHairstyle, async (req, res) => {
  // If user is already logged in redirect to homepage
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login", {
    logged_in: req.session.logged_in,
  });
});

// Signup Route
router.get("/signup", middlewareHairstyle, async (req, res) => {
  res.render("signup", {
    logged_in: req.session.logged_in,
  });
});

module.exports = router;

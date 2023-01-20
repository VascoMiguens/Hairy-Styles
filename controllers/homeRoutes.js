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

router.get("/", async (req, res) => {
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
    const newHairstyle = await HairStyle.findAll({});
    const hairstyle = newHairstyle.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
    console.log(hairstyle);
    const posts = newData.map((post) => post.get({ plain: true }));
    console.log(posts);
    res.render("homepage", {
      posts,
      hairstyle: hairstyle,
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
    
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("single-post", {
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  if (req.session.logged_out) {
    res.redirect("/login");
  } else {
    try {
      const userData = await User.findByPk(req.session.user_id, {
        attributes: { exclude: ["password"] },
        include: [
          {
            model: Post,
            include: [{
                model: Hairdresser,
               },
               {
                model: HairStyle,
              },
              ]
          },
          
        ],
      });
      const user = userData.get({ plain: true });
      console.log(user);
      res.render("profile", {
        ...user,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
});

router.get("/post/:id/edit", withAuth, async (req, res) => {
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
    console.log(post);
    res.render("edit-post", {
      ...post,
      logged_in: req.session.logged_in,
      isOwner: req.session.user_id === post.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/newpost", withAuth, async (req, res) => {
  try {
    const newHairstyle = await HairStyle.findAll({});
    const newHairdresser = await Hairdresser.findAll({});
    const hairstyle = newHairstyle.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
    const hairdresser = newHairdresser.map((hairdresser) =>
      hairdresser.get({ plain: true })
    );
    console.log(hairstyle);
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

router.get("/contacts", async (req, res) => {
  res.render("contact", {
    logged_in: req.session.logged_in,
  });
});

router.get("/search/:id", async (req, res) => {
    try {
      const searchData = await HairStyle.findByPk(req.params.id, {
        // include: [
        //   {
        //     model: Post,
        //     include: [{
        //         model: Hairdresser,
        //        },
        //        {
        //         model: HairStyle,
        //       },
        //       ]
        //   },
          
        // ],
      });
  
      const search = searchData.get({ plain: true });
      console.log(search);
      res.render("search", {
        ...search,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
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

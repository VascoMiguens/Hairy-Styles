const router = require("express").Router();
const { Hairdresser, Post, HairStyle } = require("../../models");
const withAuth = require("../../utils/auth");
const upload = require("../../utils/createImage");

router.post(
  "/newreview",
  withAuth,
  upload.single("image"),
  async (req, res) => {
    try {
      let newHairdresserId;
      let newHairstyleId;
      // if user selects the other option
      if (req.body.hairdresser === "other") {
        // Create a new hairdresser
        const newHairdresser = await Hairdresser.create({
          hairdresser_name: req.body.hairdresserName,
          location: req.body.hairdresserLocation,
        });
        // attribute new hairdresser id the newHairdresserId
        newHairdresserId = newHairdresser.id;
      } else {
        // or give it the hairdresser selected id
        newHairdresserId = req.body.hairdresser;
      }
      // if user selects the other option
      if (req.body.hairstyle === "other") {
        // Create a new hairstyle
        const newHairstyle = await HairStyle.create({
          hairstyle_name: req.body.hairstyleName,
        });
        // attribute new hairstyle id the newHairdresserId
        newHairstyleId = newHairstyle.id;
      } else {
        // or give it the hairdresser selected id
        newHairstyleId = req.body.hairstyle;
      }

      // retrieve the image filename
      const imagePath = `${req.file.filename}`;

      // cerate new Post
      const newPost = await Post.create({
        image_name: imagePath,
        body: req.body.textInput,
        user_id: req.session.user_id,
        hairdresser_id: newHairdresserId,
        hairstyle_id: newHairstyleId,
      });

      console.log(newPost);

      res.redirect("/profile");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);


// Update Post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateData = {
      body: req.body.body,
    };
    console.log(updateData);

    // Update post where id equals the post's id
    const postData = await Post.update(updateData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // if no post is found return
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
    console.log("Post successfully updated");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Post
router.delete("/:id", withAuth, async (req, res) => {
  try {
    // Delete the post where the id equals the post's id
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    // if no post is found return
    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const router = require("express").Router();
const { Project, Post } = require("../../models");
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
      if (req.body.hairdresser === "other") {
        // Create a new hairdresser
        const newHairdresser = await Hairdresser.create({
          hairdresser_name: req.body.hairdresserName,
          location: req.body.hairdresserLocation,
        });
        newHairdresserId = newHairdresser.id;
      } else {
        newHairdresserId = req.body.hairdresser;
      }

      if (req.body.hairstyle === "other") {
        // Create a new hairstyle
        const newHairstyle = await HairStyle.create({
          hairstyle_name: req.body.hairstyleName,
        });
        newHairstyleId = newHairstyle.id;
      } else {
        newHairstyleId = req.body.hairstyle;
      }

      const imagePath = `temp/${req.file.filename}`;

      const newImage = await Post.create({
        image_name: imagePath,
        body: req.body.textInput,
        user_id: req.session.user_id,
        hairdresser_id: newHairdresserId,
        hairstyle_id: newHairstyleId,
      });

      console.log(newImage);

      res.redirect("/profile");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.put("/:id", withAuth, async (req, res) => {
  try {
    const updateData = {
      body: req.body,
    };
    console.log(updateData);
    const postData = await Post.update(updateData, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
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

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const postData = await Project.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

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

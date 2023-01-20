const router = require("express").Router();
const { Project, Post } = require("../../models");
const withAuth = require("../../utils/auth");
const upload = require("../../utils/createImage");

router.post(
  "/newreview",
  withAuth,
  upload.single("image"),
  async (req, res) => {
    console.log(req.body);
    console.log(req.session.user_id);
    try {
      console.log(req.body);
      const newImage = await Post.create({
        image_name: req.file.path,
        body: req.body.textInput,
        user_id: req.session.user_id,
        hairdresser_id: req.body.hairdresser,
        hairstyle_id: req.body.hairstyle,
      });

      console.log(newImage);

      res.status(200).json(newImage);
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

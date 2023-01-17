const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create comment
router.post("/", withAuth, async (req, res) => {
  const newData = {
    ...req.body,
    user_id: req.session.user_id,
  };
  try {
    const newComment = await Post.create(newData);
    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;

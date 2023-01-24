const router = require("express").Router();
const { User } = require("../../models");

// Create new User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create(req.body);
    // Save credentials in session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    // Find user where emails equals the inputed by the user
    const userData = await User.findOne({ where: { email: req.body.email } });

    //If no user is found return
    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    // Compare inputed password with the one stored
    const validPassword = await userData.checkPassword(req.body.password);

    // If the password is wrong return
    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }
    // Save credentials in session
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/logout", (req, res) => {
  // if user is logged in
  if (req.session.logged_in) {
    //destroy the session
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

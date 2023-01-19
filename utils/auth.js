const withAuth = (req, res, next) => {
  //if the user is not logged in, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect("/login");
    //if the user is logged in, allow the user to
  } else {
    next();
  }
};

module.exports = withAuth;

const { HairStyle } = require("../models");

// midlleware that finds all hairstyles and return them as a plain Javascript object
// this middleware can be called in all routes to feed it with hairstyles
const hairstyleMiddleware = async (req, res, next) => {
  try {
    const hairstyles = await HairStyle.findAll({
      order: [["hairstyle_name", "ASC"]],
    });
    
    res.locals.hairstyles = hairstyles.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = hairstyleMiddleware;

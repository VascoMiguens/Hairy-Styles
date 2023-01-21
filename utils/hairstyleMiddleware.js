const { HairStyle } = require("../models");

const hairstyleMiddleware = async (req, res, next) => {
  try {
    const hairstyles = await HairStyle.findAll({});
    res.locals.hairstyles = hairstyles.map((hairstyle) =>
      hairstyle.get({ plain: true })
    );
    console.log(
      (res.locals.hairstyles = hairstyles.map((hairstyle) =>
        hairstyle.get({ plain: true })
      ))
    );
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = hairstyleMiddleware;

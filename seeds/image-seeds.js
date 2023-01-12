const { Image } = require("../models");

const imageData = [
  {
    image_name: "some_image",
    type: "image/jpeg",
  },
];

const seedImages = () => Image.bulkCreate(imageData);

module.exports = seedImages;

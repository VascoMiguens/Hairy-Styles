const { Hairdresser } = require("../models");

const productData = [
  {
    hairdresser_name: "Plain T-Shirt",

    category_id: 1,
  },
  {
    hairdresser_name: "Running Sneakers",

    category_id: 5,
  },
  {
    hairdresser_name: "Branded Baseball Hat",

    category_id: 4,
  },
  {
    hairdresser_name: "Top 40 Music Compilation Vinyl Record",

    category_id: 3,
  },
  {
    hairdresser_name: "Cargo Shorts",

    category_id: 2,
  },
];

const seedHairdresser = () => Hairdresser.bulkCreate(productData);

module.exports = seedHairdresser;

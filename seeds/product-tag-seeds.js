const { ProductTag } = require("../models");

const productTagData = [
  {
    hairdresser_id: 1,
    tag_id: 6,
  },
  {
    hairdresser_id: 1,
    tag_id: 7,
  },
  {
    hairdresser_id: 1,
    tag_id: 8,
  },
  {
    hairdresser_id: 2,
    tag_id: 6,
  },
  {
    hairdresser_id: 3,
    tag_id: 1,
  },
  {
    hairdresser_id: 3,
    tag_id: 3,
  },
  {
    hairdresser_id: 3,
    tag_id: 4,
  },
  {
    hairdresser_id: 3,
    tag_id: 5,
  },
  {
    hairdresser_id: 4,
    tag_id: 1,
  },
  {
    hairdresser_id: 4,
    tag_id: 2,
  },
  {
    hairdresser_id: 4,
    tag_id: 8,
  },
  {
    hairdresser_id: 5,
    tag_id: 3,
  },
];

const seedProductTags = () => ProductTag.bulkCreate(productTagData);

module.exports = seedProductTags;

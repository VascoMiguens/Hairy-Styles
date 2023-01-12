const seedCategories = require("./category-seeds");
const seedHairdresser = require("./hairdresser-seeds");
const seedImages = require("./image-seeds");
const seedTags = require("./tag-seeds");
const seedProductTags = require("./product-tag-seeds");

const sequelize = require("../config/connection");

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log("\n----- DATABASE SYNCED -----\n");
  await seedCategories();
  console.log("\n----- CATEGORIES SEEDED -----\n");

  await seedHairdresser();
  console.log("\n----- Hairdressers SEEDED -----\n");

  await seedTags();
  console.log("\n----- TAGS SEEDED -----\n");

  await seedProductTags();
  console.log("\n----- PRODUCT TAGS SEEDED -----\n");

  await seedImages();
  console.log("\n----- Images  SEEDED -----\n");

  process.exit(0);
};

seedAll();

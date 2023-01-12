// import models
const Hairdresser = require("./Hairdresser");
const Category = require("./Category");
const Tag = require("./Tag");
const ProductTag = require("./ProductTag");
const Image = require("./Image");

Image.belongsTo(Hairdresser, {
  foreignKey: "hairdresser_id",
});

Hairdresser.hasMany(Image, {
  foreignKey: "hairdresser_id",
  onDelete: "CASCADE",
});

// Hairdresser belongsTo Category
Hairdresser.belongsTo(Category, {
  foreignKey: "category_id",
});
// Categories have many Hairdressers
Category.hasMany(Hairdresser, {
  foreignKey: "category_id",
  //When we delete a Category, make sure to also delete the associated Hairdresser
  onDelete: "CASCADE",
});
// Hairdresser belongToMany Tags (through ProductTag)
Hairdresser.belongsToMany(Tag, {
  //Associate Tag with Product through ProductTag
  //Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false,
  },
  //Alias for when data is retrieved
  as: "Product_Tag",
});
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Hairdresser, {
  //Associate Product with Tag through ProductTag
  //Define the third table needed to store the foreign keys
  through: {
    model: ProductTag,
    unique: false,
  },
  //Alias for when data is retrieved
  as: "Tag_Product",
});

module.exports = {
  Hairdresser,
  Category,
  Tag,
  ProductTag,
  Image,
};

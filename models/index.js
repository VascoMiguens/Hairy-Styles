// import models
const Hairdresser = require("./Hairdresser");
const Post = require("./Post");
const HairStyle = require("./HairStyle");
const Comment = require("./Comment");
const User = require("./User");
const StyleTag = require("./StyleTag");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasOne(HairStyle, {
  foreignKey: "id",
});

Post.hasOne(Hairdresser, {
  foreignKey: "id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Hairdresser.hasMany(Post, {
  foreignKey: "hairdresser_id",
});

HairStyle.belongsTo(Post, {
  foreignKey: "hairstyle_id",
});

Hairdresser.belongsTo(Post, {
  foreignKey: "hairdresser_id",
});

Hairdresser.belongsToMany(HairStyle, {
  through: {
    model: StyleTag,
    unique: false,
  },
  foreignKey: "hairdresser_id",
  //Alias for when data is retrieved
  as: "salon_tag",
});

HairStyle.belongsToMany(Hairdresser, {
  through: {
    model: StyleTag,
    unique: false,
  },
  foreignKey: "hairstyle_id",
  //Alias for when data is retrieved
  as: "style_tags",
});

module.exports = {
  Comment,
  Hairdresser,
  HairStyle,
  StyleTag,
  Post,
  User,
};

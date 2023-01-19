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

Post.belongsTo(StyleTag, {
  foreignKey: "styletag_id",
});

StyleTag.belongsTo(Post, {
  foreignKey: "post_id",
});

StyleTag.hasMany(Post, {
  foreignKey: "post_id",
});

Hairdresser.hasMany(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
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

// StyleTag.belongsToMany(Hairdresser, {
//   through: {
//     model: "hairdresser",
//     key: "id",
//   },
//   as: "salon_tags",
// });
Hairdresser.hasMany(StyleTag);

// StyleTag.belongsToMany(HairStyle, {
//   through: {
//     model: "hairstyle",
//     key: "id",
//   },
//   as: "style_tags",
// });

HairStyle.hasMany(StyleTag);

module.exports = {
  Comment,
  Hairdresser,
  HairStyle,
  StyleTag,
  Post,
  User,
};

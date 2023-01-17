// import models
const Hairdresser = require("./Hairdresser");
const Post = require("./Post");
const HairStyle = require("./HairStyle");
const Comment = require("./Comment");
const User = require("./User");
const StyleTag = require("./StyleTag")

User.hasMany(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
});

Post.belongsTo(Hairdresser, {
  foreignKey: "hairdresser_id",
});

Hairdresser.hasMany(Post, {
  foreignKey: "post_id",
});

Post.hasMany(Comment, {
  foreignKey: "comment_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Hairdresser.belongsToMany(HairStyle, {

  through: {
    model: StyleTag,
    unique: false,
  },
  //Alias for when data is retrieved
  as: "salon_tag",
});

HairStyle.belongsToMany(Hairdresser, {

  through: {
    model: StyleTag,
    unique: false,
  },
  //Alias for when data is retrieved
  as: "style_tags",
});


module.exports = {
  Comment,
  Hairdresser,
  HairStyle,
  StyleTag,
  Post,
  User
};

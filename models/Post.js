const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Post model (table) by extending off Sequelize's Model class
class Post extends Model {}

// set up fields and rules for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image_name: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      }
    },
    hairstyle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hairstyle',
        key: 'id',
      }
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

module.exports = Post;
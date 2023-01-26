// import important parts of sequelize library
const { Model, DataTypes } = require("sequelize");
// import our database connection from config.js
const sequelize = require("../config/connection");

// Initialize styletag model (table) by extending off Sequelize's Model class
class StyleTag extends Model {}

// set up fields and rules for styletag model
StyleTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hairdresser_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "hairdresser",
        key: "id",
      },
    },
    hairstyle_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "hairstyle",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "styletag",
  }
);
//export the model
module.exports = StyleTag;

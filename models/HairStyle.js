const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class HairStyle extends Model {}

HairStyle.init(
  {
    // define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    hairstyle_name: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "hairstyle",
  }
);

module.exports = HairStyle;

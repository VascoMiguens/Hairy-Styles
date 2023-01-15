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
    hairdresser_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "hairdresser",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id',
      }
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

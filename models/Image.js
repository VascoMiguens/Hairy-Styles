const { Model, DataTypes } = require("sequelize");

const sequelize = require("../config/connection.js");

class Image extends Model {}

Image.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    iamge_name: {
      type: DataTypes.STRING,
    },
    // hairdresser_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: "hairdresser",
    //     key: "id",
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "category",
  }
);

module.exports = Image;

const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class StyleTag extends Model {}

StyleTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    hairdresser_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'hairdresser',
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
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'style_tag',
  }
);

module.exports = StyleTag;

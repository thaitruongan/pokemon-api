"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Moves extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Moves.belongsTo(models.Type, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  Moves.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      description: { type: DataTypes.STRING, allowNull: false },
      type_id: { type: DataTypes.STRING, allowNull: false },
      category: {
        type: DataTypes.ENUM({ values: ["fast moves", "charge moves"] }),
        allowNull: false,
      },
      power: { type: DataTypes.INTEGER, allowNull: false },
      energy: { type: DataTypes.INTEGER, allowNull: false },
      weather: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Moves",
    }
  );
  return Moves;
};

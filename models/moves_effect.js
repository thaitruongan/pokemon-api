"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Moves_effect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Moves_effect.belongsTo(models.Moves, {
        foreignKey: "moves_id",
        as: "moves",
      });
      Moves_effect.belongsTo(models.Type, {
        foreignKey: "type_id",
        as: "type",
      });
    }
  }
  Moves_effect.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      moves_id: { type: DataTypes.STRING, allowNull: false },
      type_id: { type: DataTypes.STRING, allowNull: false },
      category: {
        type: DataTypes.ENUM("Super effective", "Not very effective"),
        allowNull: false,
      },
      dame: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      sequelize,
      modelName: "Moves_effect",
    }
  );
  return Moves_effect;
};

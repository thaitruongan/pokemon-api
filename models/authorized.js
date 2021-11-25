"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Authorized extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Authorized.belongsTo(models.Permission, {
        foreignKey: "permission_id",
        as: "permission",
      });

      Authorized.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
      });
    }
  }
  Authorized.init(
    {
      user_id: DataTypes.STRING,
      permission_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Authorized",
    }
  );
  return Authorized;
};

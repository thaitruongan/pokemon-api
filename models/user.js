"use strict";

const env = process.env.NODE_ENV || "development";
const config = require("../config/config.json")[env];

const jwt = require("jsonwebtoken");

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Authorized, {
        foreignKey: "user_id",
        as: "permissions",
      });
    }

    generateToken() {
      return jwt.sign(
        {
          id: this.id,
          email: this.email,
        },
        config.privateKey
      );
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      sex: {
        type: DataTypes.ENUM("Male", "Female"),
        allowNull: false,
      },
      api_key: DataTypes.STRING,
      defaultValue: "",
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

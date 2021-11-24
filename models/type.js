'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type.hasMany(models.Poke_type, {
        foreignKey: 'type_id',
        as: 'poke_type'
      })
      Type.hasMany(models.Type_effect, {
        foreignKey: 'type_id',
        as: 'type_effect'
      }) 
      Type.hasMany(models.Moves_effect, {
        foreignKey: 'type_id',
        as: 'moves_effect'
      }) 
    }
  };
  Type.init({
    id:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV1,
      primaryKey:true
    },
    name: {
      type: DataTypes.STRING,
      unique:true,
      allowNull:false
    },
    logo: {
      type:DataTypes.STRING,
      unique:true,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'Type',
  });
  return Type;
};
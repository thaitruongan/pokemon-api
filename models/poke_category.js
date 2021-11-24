'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poke_category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Poke_category.hasMany(models.Moves, {
        foreignKey: 'type_id',
        as: 'moves'
      })      
    }
  };
  Poke_category.init({
    id:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV1,
      primaryKey:true
    },
    name: {type: DataTypes.STRING,allowNull:false,unique:true}
  }, {
    sequelize,
    modelName: 'Poke_category',
  });
  return Poke_category;
};
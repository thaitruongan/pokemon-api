'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Poke_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Poke_type.belongsTo(models.Pokemon, {
        foreignKey: 'poke_id',
        as:'pokemon'
      });
      Poke_type.belongsTo(models.Type, {
        foreignKey: 'type_id',
        as:'type'
      })
    }
  };
  Poke_type.init({
    id:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV1,
      primaryKey:true
    },
    poke_id: {type:DataTypes.STRING,allowNull:false},
    type_id: {type:DataTypes.STRING,allowNull:false}
  }, {
    sequelize,
    modelName: 'Poke_type',
  });
  return Poke_type;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_effect extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Type_effect.belongsTo(models.Pokemon, {
        foreignKey: 'poke_id',
        as:'pokemon'
      });
      Type_effect.belongsTo(models.Type, {
        foreignKey: 'type_id',
        as:'type'
      })
    }
  };
  Type_effect.init({
    id:{
      type:DataTypes.STRING,
      defaultValue:DataTypes.UUIDV1,
      primaryKey:true
    },
    poke_id: {type: DataTypes.STRING,allowNull:false},
    type_id: {type: DataTypes.STRING,allowNull:false},
    category: {type: DataTypes.STRING,allowNull:false},
    dame: {type: DataTypes.FLOAT,allowNull:false}
  }, {
    sequelize,
    modelName: 'Type_effect',
  });
  return Type_effect;
};
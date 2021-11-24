'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Type_effects', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        default:Sequelize.UUIDV1,
        primaryKey:true
      },
      poke_id: {
        type: Sequelize.STRING
      },
      type_id: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.STRING
      },
      dame: {
        type: Sequelize.FLOAT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Type_effects');
  }
};
'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Pokemons', {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        default:Sequelize.UUIDV1,
        primaryKey:true
      },
      name: {
        type: Sequelize.STRING
      },
      maxcp: {
        type: Sequelize.INTEGER
      },
      attack:{
        type:Sequelize.INTEGER
      },
      def:{
        type:Sequelize.INTEGER
      },
      description:{
        type:Sequelize.STRING
      },
      generation:{
        type:Sequelize.STRING
      },
      category_id:{
        type:Sequelize.STRING
      },
      height:{
        type:Sequelize.FLOAT
      },
      weight:{
        type:Sequelize.FLOAT
      },
      img:{
        type:Sequelize.STRING
      },
      poke_id:{
        type:Sequelize.STRING
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
    await queryInterface.dropTable('Pokemons');
  }
};
"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Poke_types", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        default: Sequelize.UUIDV1,
        primaryKey: true,
      },
      poke_id: {
        type: Sequelize.STRING,
        references: {
          model: "Pokemons",
          key: "id",
        },
      },
      type_id: {
        type: Sequelize.STRING,
        references: {
          model: "Types",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Poke_types");
  },
};

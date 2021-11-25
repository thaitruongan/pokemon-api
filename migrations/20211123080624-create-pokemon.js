"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface
      .createTable("Pokemons", {
        id: {
          allowNull: false,
          type: Sequelize.STRING,
          default: Sequelize.UUIDV1,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          unique:true
        },
        maxcp: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        attack: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        def: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        stamina: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        description: {
          type: Sequelize.STRING,
          allowNull: false
        },
        generation: {
          type: Sequelize.STRING,
          allowNull: false
        },
        category_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
            model: "Poke_categories",
            key: "id",
          },
          allowNull: false
        },
        height: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        weight: {
          type: Sequelize.FLOAT,
          allowNull: false
        },
        img: {
          type: Sequelize.STRING,
          allowNull: false
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pokemons");
  },
};

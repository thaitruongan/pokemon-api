"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Moves_effects", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        default: Sequelize.UUIDV1,
        primaryKey: true,
      },
      moves_id: {
        type: Sequelize.STRING,
        references: {
          model: "Moves",
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
      category: {
        type: Sequelize.STRING,
      },
      dame: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("Moves_effects");
  },
};

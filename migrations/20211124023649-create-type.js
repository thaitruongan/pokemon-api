"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Types", {
      id: {
        allowNull: false,
        type: Sequelize.STRING,
        default: Sequelize.UUIDV1,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      logo: {
        type: Sequelize.STRING,
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
    // .then(() => {
    //   queryInterface.addConstraint("type_effects", ["type_id"], {
    //     type: "FOREIGN KEY",
    //     name: "FK_typeEffect_type",
    //     references: {
    //       table: "type",
    //       fields: "id",
    //     },
    //   });
    // });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Types");
  },
};

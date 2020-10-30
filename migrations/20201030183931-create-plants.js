'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      common_name: {
        type: Sequelize.STRING
      },
      scientific_name: {
        type: Sequelize.STRING
      },
      watering_schedule: {
        type: Sequelize.STRING
      },
      light_requirement: {
        type: Sequelize.STRING
      },
      soil_type: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Plants');
  }
};
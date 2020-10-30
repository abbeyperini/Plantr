'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Posts", "plant_id", {
      type: Sequelize.INTEGER,
      references: { model: "Plants", field: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "plant_id");
  }
};

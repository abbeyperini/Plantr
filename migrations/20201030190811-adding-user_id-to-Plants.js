'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Plants", "user_id", {
      type: Sequelize.INTEGER,
      references: { model: "Users", field: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Plants", "user_id");
  }
};

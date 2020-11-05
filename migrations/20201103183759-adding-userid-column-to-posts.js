'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Posts", "user_id", {
      type: Sequelize.INTEGER,
      references: { model: "Users", field: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Posts", "user_id");
  }
};

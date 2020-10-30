"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Posts", "user_id", {
      type: Sequelize.INTEGER,
      references: { model: "Users", field: "id" },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Posts", "user_id", {
      type: Sequelize.INTEGER,
    });
  },
};


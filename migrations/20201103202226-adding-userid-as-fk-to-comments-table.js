'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Comments", {
      fields: ["user_id"],
      type: "FOREIGN KEY",
      name: "userid-fk-in-comments",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Comments", "userid-fk-in-comments");
  }
};

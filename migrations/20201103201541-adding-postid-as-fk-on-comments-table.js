'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Comments", {
      fields: ["post_id"],
      type: "FOREIGN KEY",
      name: "postid-fk-in-comments",
      references: {
        table: "Posts",
        field: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Comments", "postid-fk-in-comments");
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Plants", "imageURL", {
      type: Sequelize.STRING,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Plants", "imageURL")
  }
};

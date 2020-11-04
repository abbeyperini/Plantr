'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint(
      'Posts', {
      fields: ['plant_id'],
      type: 'FOREIGN KEY',
      name: 'plantid-fk-in-posts',
      references: {
              table: 'Plants',
              field: 'id'
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint(
      'Posts', 
      'plantid-fk-in-posts')
  }
};

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //likes belongsTo Posts
      models.Likes.belongsTo(models.Posts, {foreignKey: 'post_id'})
      //likes belongsTo Users
      models.Likes.belongsTo(models.Users, {foreignKey: 'user_id'})
    }
  };
  Likes.init({
    post_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Likes',
  });
  return Likes;
};
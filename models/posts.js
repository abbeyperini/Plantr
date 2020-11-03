'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Posts.belongsTo(models.Plants, {as: 'post', foreignKey: 'plant_id'})
    }
  };
  Posts.init({
    common_name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    body: DataTypes.TEXT,
    plant_id: DataTypes.INTEGER,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Posts',
  });
  return Posts;
};
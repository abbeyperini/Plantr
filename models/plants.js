'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Plants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Plants.belongsTo(models.Users, { foreignKey: 'user_id'})
      models.Plants.hasMany(models.Posts, { foreignKey: 'plant_id'})
    }
  };
  Plants.init({
    common_name: DataTypes.STRING,
    scientific_name: DataTypes.STRING,
    watering_schedule: DataTypes.STRING,
    light_requirement: DataTypes.STRING,
    soil_type: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    imageURL: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Plants',
  });
  return Plants;
};
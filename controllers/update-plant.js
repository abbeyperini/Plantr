const models = require("../models");

/**
 * Updates specific plant
 */
module.exports = (req, res) => {
  const common_name = req.body.common_name;
  const scientific_name = req.body.scientific_name;
  const watering_schedule = req.body.watering_schedule;
  const light_requirement = req.body.light_requirement;
  const soil_type = req.body.soil_type;
  const plant_id = req.body.plant_id;

  //creating plant object
  models.Plants.update(
    {
      common_name: common_name,
      scientific_name: scientific_name,
      watering_schedule: watering_schedule,
      light_requirement: light_requirement,
      soil_type: soil_type,
    },
    {
      where: {
        id: plant_id,
      },
    }
  ).then((updatedPlant) => {
    res.redirect("/account");
  });
};

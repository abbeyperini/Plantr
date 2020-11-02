const models = require("../models");

//renders page with values of plant to be edited/updated

module.exports = (req, res) => {
  const plant_id = req.params.id;
  req.session.updatePlantId = req.params.id;

  models.Plants.findByPk(plant_id)
    .then((plant) => {
      res.render("update-plant", { plant: plant.dataValues });
    })
    .catch((error) => {
      console.log(error);
    });
};


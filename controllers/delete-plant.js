const models = require("../models");

module.exports = (req, res) => {
  const plant_id = req.body.plant_id;

  models.Plants.destroy({
    where: {
      id: plant_id,
    },
  }).then((deletedPlant) => {
    res.redirect("/account");
  });
};

const models = require("../models");

module.exports = (req, res) => {
  const common_name = req.body.common_name;
  const scientific_name = req.body.scientific_name;
  const watering_schedule = req.body.watering_schedule;
  const light_requirement = req.body.light_requirement;
  const soil_type = req.body.soil_type;
  const user_id = req.session.userId;
  let photoURL = '';

  if (req.session.photoURL == "" || req.session.photoURL == null) {
    photoURL = "/images/plantrLogo.jpg"
  } else {
    photoURL = req.session.photoURL
  }

  //creating plant object
  let plant = models.Plants.build({
    common_name: common_name,
    scientific_name: scientific_name,
    watering_schedule: watering_schedule,
    light_requirement: light_requirement,
    soil_type: soil_type,
    user_id: user_id,
    imageURL: photoURL
  });

  req.session.photoURL = '';

  plant.save().then((savedPlant) => {
    console.log(savedPlant);
    res.redirect("/account");
  });
};
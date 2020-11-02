const models = require("../models");

module.exports = (req, res) => {
  models.Plants.findAll().then((plants) => {
    res.render("account", { plants: plants });
  });
};

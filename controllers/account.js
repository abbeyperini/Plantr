const models = require("../models");

module.exports = (req, res) => {
  models.Plants.findAll({
    where: {
      user_id: req.session.userId
    }
  }).then((plants) => {
    res.render("account", { plants: plants });
  });
};

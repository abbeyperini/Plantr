const models = require("../models");

module.exports = (req, res) => {
    const plants = req.body.plants;
    const body = req.body.body;
    const user_id = req.session.userId;
    const plant_id= req.body.plant_id;

    let posting = models.posting.build({
    plants:plants,
    body:body,
    user_id:user_id,
    plant_id:plant_id,
    })

    posting.save().then((savedPosting)=> {
        console.log(savedPlant);
        res.redirect("/details-plants");
    })
}


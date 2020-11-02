const models = require("../models");
module.exports = (req, res) => {
    const plants = req.body.plant;
    const body = req.body.body;
    const user_id = req.session.userId;
    const plant_id = req.body.plant_id;
    
    let posting = models.Posts.build({
        plants: plants,
        body: body,
        user_id: user_id,
        plant_id: plant_id,
    })
    
    posting.save().then((savedPosting)=> {
        console.log(savedPlant);
        res.redirect(`/details-plant/${plant_id}`);
    })
}
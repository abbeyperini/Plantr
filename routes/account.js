const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;


//LAYOUT PLAN:
//----------------------------------------------------------------//
//account routers
//Routes needed for account:
// /account --see all your posts
// /account/create-post --add a post to your profile
// /account/delete-post --delete a post from your profile
// /account/edit-post --edit/update a post on your profile
// /account/profilenewsfeed -- see posts from other users

//----------------------------------------------------------------//

//see profile page that displays all posts
router.get('/', (req, res) => {
    models.Plants.findAll().then((plants) => {
        res.render("account", {plants: plants})
    })

})

//creating a plant to the plant table
router.post('/create-plant', (req, res) => {
    const common_name = req.body.common_name
    const scientific_name = req.body.scientific_name
    const watering_schedule = req.body.watering_schedule
    const light_requirement = req.body.light_requirement
    const soil_type = req.body.soil_type
    const user_id = req.session.userId

    //creating plant object
    let plant = models.Plants.build({
      common_name: common_name,
      scientific_name: scientific_name,
      watering_schedule: watering_schedule,
      light_requirement: light_requirement,
      soil_type: soil_type,
      user_id: user_id,
    });
    
    plant.save().then((savedPlant) => {
        console.log(savedPlant)
        res.redirect('/')
    })
})


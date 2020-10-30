const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();
const models = require('../models')

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
        res.redirect('/account')
    })
})

//delete route
router.post('/delete-plant', (req, res)=> {
    const plant_id = req.body.plant_id

    models.Plants.destroy({
        where: {
            id: plant_id
        }
    }).then((deletedPlant) => {
        res.redirect('/account')
    })
})

//update plant
router.get('/edit/:id', (req, res)=> {
    const plant_id = req.params.id
    console.log(plant_id)

    models.Plants.findByPk(plant_id).then((plant)=> {
        console.log(plant.toJSON())
        res.render('update-plant', {plant: plant.dataValues})
    }).catch(error => {
        console.log(error)
    })
})

router.post('/update-plant', (req, res)=> {
    const common_name = req.body.common_name;
    const scientific_name = req.body.scientific_name;
    const watering_schedule = req.body.watering_schedule;
    const light_requirement = req.body.light_requirement;
    const soil_type = req.body.soil_type;
    const plant_id = req.body.plant_id
    

    //creating plant object
    models.Plants.update({
      common_name: common_name,
      scientific_name: scientific_name,
      watering_schedule: watering_schedule,
      light_requirement: light_requirement,
      soil_type: soil_type
    }, {
        where: {
            id: plant_id
        }
    }).then(updatedPlant => {
        res.redirect('/account')
    })
})
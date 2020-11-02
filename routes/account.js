const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const router = express.Router();
const createPlantController = require("../controllers/create-plant");
const accountController = require("../controllers/account");
const deletePlantController = require("../controllers/delete-plant");
const getEditPlantPageController = require("../controllers/getEditPlantPage")

const updatePlantController = require("../controllers/update-plant");
// const { Model } = require("sequelize/types");

// const updatePlantController = require("../controllers/update-plant")
const { v1: uuidv1 } = require('uuid');
const formidable = require('formidable');
const models = require("../models");
const updatePlant = require("../controllers/update-plant");


app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
module.exports = router;


//see profile page that displays all posts
router.get("/", accountController);

router.get("/create", (req, res) => {
    res.render('create-plant')
})

router.post("/create/upload", (req, res) => {
    uploadFile(req, (photoURL) => {
        photoURL = `/uploads/${photoURL}`;
        req.session.photoURL = photoURL;
        res.render('create-plant', {photoURL: photoURL})
      })
})

router.post("/update/upload", (req, res) => {

    uploadFile(req, (photoURL) => {
        photoURL = `/uploads/${photoURL}`;
        models.Plants.update({
            imageURL: photoURL
        }, {
            where: {
                id: req.session.updatePlantId
            }
        }).then( (updatePlant) => {
            res.redirect('/account')
        })
    })
})

//creating a plant to the plant table
router.post("/create-plant", createPlantController);

//delete route
router.post("/delete-plant", deletePlantController);

//update plant
router.get("/edit/:id", getEditPlantPageController);

router.post("/update-plant", updatePlantController);


//Posting Comment
router.post('/details-plant',updatePlantController);

router.get('/details-plant', updatePlantController);

function uploadFile(req, callback) {
    new formidable.IncomingForm().parse(req)
    .on('fileBegin', (name, file) => {
        uniqueFilename = `${uuidv1()}.${file.name.split('.').pop()}`
        file.name = uniqueFilename
        file.path = __basedir + '/uploads/' + file.name
    })
    .on('file', (name, file) => {
        callback(file.name)
    })
  }

  router.get("/add-post/:id", (req, res) => {
      const plant_id = req.params.plant_id;

      models.Plants.findByPK(plant_id).then((plant) => {
          res.render("details", {plant: plant})
      })
  })


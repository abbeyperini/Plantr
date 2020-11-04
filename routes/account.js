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

router.post("/delete-post", (req, res) => {
    const post_id = req.body.post_id;

    models.Posts.destroy({
        where: {
            id: post_id
        }
    }).then((deletedPost) => {
        res.redirect('/account')
    })
})

router.post('/create/post/upload', (req, res) => {
    const plant_id = req.body.plant_id;

    uploadFile(req, (postPhotoURL) => {
        postPhotoURL = `/uploads/${postPhotoURL}`;
        req.session.postPhotoURL = postPhotoURL;
        res.redirect('/account')
      })
})


//Posting Comment
router.post('/add-post', (req, res) => {
    const common_name = req.body.common_name;
    const scientific_name = req.body.scientific_name
    const body = req.body.body;
    const plant_id = req.body.plant_id;
    const postPhotoURL = req.session.postPhotoURL;
    
    let posting = models.Posts.build({
        common_name: common_name,
        scientific_name: scientific_name,
        body: body,
        plant_id: plant_id,
        imageURL: postPhotoURL
    })
    
    posting.save().then((savedPosting)=> {
        req.session.postPhotoURL = '';
        res.redirect(`/account/details-plant/${plant_id}`);
    })
});

router.get('/details-plant/:id', (req, res) => {
    const plant_id = req.params.id;

    models.Plants.findByPk(plant_id, {
        include: [
            {
                model: models.Posts,
                as: 'plant_post'
            }
        ]
    }).then( (plant) => {
        res.render('details', {Plant: plant})
    })
});

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

      models.Plants.findByPk(plant_id).then((plant) => {
          res.render("details", {plant: plant})
      })
  })


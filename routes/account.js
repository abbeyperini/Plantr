const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const router = express.Router();
const createPlantController = require("../controllers/create-plant");
const accountController = require("../controllers/account");
const deletePlantController = require("../controllers/delete-plant");
const getEditPlantPageController = require("../controllers/getEditPlantPage")
const updatePlantController = require("../controllers/update-plant")

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

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
router.get("/", accountController);

//creating a plant to the plant table
router.post("/create-plant", createPlantController);

//delete route
router.post("/delete-plant", deletePlantController);

//update plant
router.get("/edit/:id", getEditPlantPageController);

router.post("/update-plant", updatePlantController);

const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const router = express.Router();
const models = require("../models");
const bcrypt = require("bcryptjs");

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");
module.exports = router;
app.use("/styles", express.static("styles"));


router.get('/', async (req, res) => {
    let posts =  await models.Posts.findAll(
        {order : [['createdAt', 'DESC']]}
    )
    res.render('newsfeed', {posts: posts})
})
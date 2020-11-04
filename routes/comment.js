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

router.post('/add-comment', async (req, res)=> {
    const post_id =  parseInt(req.body.post_id)
    const body = req.body.body

    let comment = await models.Comments.build({
        body: body,
        post_id: post_id
    })

   let savedComment = await comment.save()

   if(savedComment) {
       res.redirect(`/account/details-plant/${post_id}`);
   }
})

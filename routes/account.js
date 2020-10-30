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
    res.render('account')
})



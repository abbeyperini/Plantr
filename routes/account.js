const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;

router.get('/', (req, res) => {
    res.render('account');
})
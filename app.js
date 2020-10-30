const PORT = process.env.PORT || 8080
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const { dirname } = require('path');
const VIEW_PATH = path.join(__dirname, '/views');
const models = require('./models');
const { Op } = require('sequelize');
const { allowedNodeEnvironmentFlags } = require('process');
const indexRoutes = require('./routes/index');
const accountRoutes = require('./routes/account');
const secrets = require('./sessionSecret');

app.use(session({
    secret: secrets,
    resave: false,
    saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use('/styles', express.static('styles'));
app.use('/images', express.static('images'));
app.engine('mustache', mustacheExpress(VIEW_PATH + '/partials', '.mustache'));
app.set('views', VIEW_PATH);
app.set('view engine', 'mustache');
app.use('/index', indexRoutes);
app.use('/account', accountRoutes);

app.listen(3000, () => {
    console.log("Server is running...");
});

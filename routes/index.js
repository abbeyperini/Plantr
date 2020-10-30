const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express');
const router = express.Router();
const models = require('../models');
const bcrypt = require('bcryptjs')

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
module.exports = router;
app.use('/styles', express.static('styles'));

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register/user', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                
                let user = models.Users.build({
                    username: username,
                    password: hash
                })

                user.save().then((savedUser) => {
                    res.redirect('/index')
                }).catch((error) => {
                    console.log(error)
                })
            })
        })
    } else {
        res.render('register', {message: "Please provide a username and password."})
    }
})

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let userid = '';

    if (username && password) {
        models.Users.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (user) {
                let storedPassword = user.password;
                userid = user.id;
                bcrypt.compare(password, storedPassword)
                .then((result) => {
                    if (result) {
                        if (req.session) {
                            req.session.isAuthenticated = true;
                            req.session.userId = user.id;

                            res.redirect('/account');
                        } else {
                            res.render('index', {message: "Something went wrong."})
                        }
                    } else {
                        res.render('index', {message: "Incorrect username or password."})
                    }
                })
            } else {
                res.redirect('/index/register')
            }
        })
    } else {
        res.render('index', {message: "Please provide a username and password."})
    }
})

router.get('/sign-out', (req, res) => {
    req.session.isAuthenticated = false;
    res.redirect('/')
})
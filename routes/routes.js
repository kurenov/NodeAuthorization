// Simple Local and OAuth authorization App based on MEAN Stack
// by Olzhas Kurenov
// routes/routes.js 
// Handles Main Routing and Page Rendering

var app = require('express');
var router = app.Router();
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportConfig = require('../config/passport');
var secret;

// MODELS & CONFIG =============================================================

// Environment Dependent Configurations
if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
  secret = require('../config/production').secret;
}
else {
  secret = require('../config/development').secret;
}

// Config Passport
passportConfig(passport);

// Models
var User = require('../models/user');
var Company = require('../models/company');

var authorize = require('../app/authorize');


// Home Page
router.get('/', function (req, res) {
  if (!req.authorized) {
    res.render('main');
  }
  else {
    res.status(400);
    res.redirect('/authorize');
    res.json({message: 'NOT AUTHORIZED'});
  }
});

// AUTHORIZE
router.get('/authorize', function (req, res) {
  res.render('authorize', {auth_token: ''});
});

router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

// the callback after google has authenticated the user
router.get('/auth/google/callback',
        passport.authenticate('google', {
          // successRedirect: '/profile',
          failureRedirect: '/authorize'
        }),
        //if user is authenticated via Google, issue token and render authorize page
                //which saves token on local storage
                        function (req, res) {
                          var token = jwt.sign({id: req.user._id, email: req.user.google.email}, secret, {
                            expiresIn: 86400  //24 hours
                          });
                          res.render('authorize', {auth_token: token});
                        });

                module.exports = router;
// Simple Local and OAuth authorization App based on MEAN Stack
// by Olzhas Kurenov
// routes/routes.js 
// Handles RESTful API calls

var app = require('express');
var apiRouter = app.Router();
var jwt = require('jsonwebtoken');

var secret;
if (process.env.NODE_ENV && process.env.NODE_ENV == 'companyion') {
  secret = require('../config/companyion').secret;
}
else {
  secret = require('../config/development').secret;
}

var authorize = require('../app/authorize');

var User = require('../models/user');
var Company = require('../models/company');
var Log = require('../models/log');

// API HOME
apiRouter.get('/', function (req, res) {
  res.json({message: 'Home for Cool API'});
});

//LOG ==========================================================================

apiRouter.get('/log', function (req, res) {
  Log.find({}, function (err, log) {
    if (err) {
      console.log(err.toString());
      res.json({success: false, message: 'Error: ' + err.toString()});
    }
    else {
      res.json({success: true, log: log});
    }
  });
});

apiRouter.post('/log', function (req, res) {
  var log = new Log();
  log.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
  log.page = req.body.page;
  log.referer = req.headers.referer;
  log.ua = req.headers['user-agent'];
  log.language = req.headers['accept-language'];
  log.navigator = req.body.navigator;
  log.save();
  res.end('success');
});

//AUTHORIZATION ================================================================

// SIGN IN
apiRouter.post('/user/signin', function (req, res) {
  console.log("req.body.email: " + req.body.email);
  console.log("req.body: " + JSON.stringify(req.body));
  User.findOne({
    'local.email': req.body.email.toLowerCase()
  }, function (err, user) {
    if (err) {
      console.log(err.toString());
      res.json({success: false, message: 'Error: ' + err.toString()});
    }
    else if (!user) {
      res.json({success: false, message: 'Authentication failed. User not found.'});
    }
    else {
      if (!user.validPassword(req.body.password)) {
        res.json({success: false, message: 'Authentication failed. Wrong password.'});
      }
      else {
        var token = jwt.sign({id: user._id, email: user.local.email}, secret, {
          expiresIn: 86400               //24 hours
        });
        res.json({
          success: true,
          message: 'Signed In!',
          token: token
        });
      }
    }
  });
});

// SIGN UP
apiRouter.post('/user/signup', function (req, res) {
  console.log("req.body: " + JSON.stringify(req.body));
  User.findOne({
    'local.email': req.body.email.toLowerCase()
  }, function (err, user) {
    if (err) {
      res.status(500).json({success: false, message: 'Server Error'});
      //throw err;
    }
    else if (user) {
      res.json({success: false, message: 'Account with given email already in use'});
    }
    else {
      var emailRexeg = new RegExp(/^[\w\.-]+@[\w\.-]+\.[\w\.-]+$/);
      console.log("EMAIL:" + req.body.email);
      console.log("Regex:" + emailRexeg);
      if (req.body.password1 !== req.body.password2) {
        res.json({success: false, message: 'Passwords have to match.'});
      }
      else if (!req.body.agree) {
        res.json({success: false, message: 'You need to agree Terms & Condition in order to proceed'});
      }
      else if (!emailRexeg.test(req.body.email)) {
        res.json({success: false, message: 'Enter a valid email.'});
      }
      else {
        var user = new User();
        user.local.email = req.body.email.toLowerCase();
        user.profile.email = user.local.email;
        user.local.password = user.generateHash(req.body.password1);

        user.save(function (err) {
          if (err) {
            console.log(err.toString());
            res.json({
              success: false,
              message: 'Validation error'
            });
          }
          res.json({
            success: true,
            message: 'Registration successful!'
          });
        });
      }
    }
  });
});

//USER =========================================================================

// USER
apiRouter.get('/user', authorize.api, function (req, res) {
  User.findOne({_id: req.decoded.id}, {profile: 1}, function (err, user) {
    if (err) {
      res.json({success: false, message: 'DB error'});
    }
    else {
      res.json(user);
    }
  });
});

// USER INFO - UPDATE
apiRouter.put('/user', authorize.api, function (req, res) {
  User.findOne({_id: req.decoded.id}, function (err, user) {
    if (err) {
      res.json({success: false, message: 'DB error'});
    }
    if (!user) {
      res.json({success: false, message: 'No such User (id: ' + req.decoded.id + ') found to update.'});
    }
    else {
      user.profile.firstName = req.body.firstName;
      user.profile.lastName = req.body.lastName;
      user.profile.phone = req.body.phone;
      user.save(function (err) {
        if (err) {
          res.json({success: false, message: 'Error during user update'});
        }
        res.json({
          success: true,
          message: 'User info updated'
        });
      });
    }
  });
});

// USER PASSWORD - UPDATE
apiRouter.put('/user/password', authorize.api, function (req, res) {
  console.log(JSON.stringify(req.body));
  if (req.body.password == null || req.body.password1 == null || req.body.password1 != req.body.password2) {
    res.json({success: false, message: 'Please type passwords in'});
  }
  else if (req.body.password1.length < 6) {
    res.json({success: false, message: 'Password has to be at least 6 characters long'});
  }
  else {
    User.findOne({_id: req.decoded.id}, function (err, user) {
      if (err) {
        res.json({success: false, message: 'DB error'});
      }
      else if (!user) {
        res.json({success: false, message: 'No such User (id: ' + req.decoded.id + ') found to update.'});
      }
      else if (!user.validPassword(req.body.password)) {
        res.json({success: false, message: 'Operation failed. Wrong password.'});
      }
      else {
        user.local.password = user.generateHash(req.body.password1);
        user.save(function (err) {
          if (err) {
            res.json({success: false, message: 'Error during Password update'});
          }
          res.json({
            success: true,
            message: 'User Password updated'
          });
        });
      }
    });
  }
});

module.exports = apiRouter;
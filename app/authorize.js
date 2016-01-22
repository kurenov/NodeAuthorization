// Simple Local and OAuth authorization App based on MEAN Stack
// by Olzhas Kurenov
// authorize.js 
// Handles JWT based user authrization

var jwt = require('jsonwebtoken');
var secret;

//Environment Dependent Configurations
if (process.env.NODE_ENV && process.env.NODE_ENV == 'production') {
  secret = require('../config/production').secret;
}
else {
  secret = require('../config/development').secret;
}

module.exports.api = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] || req.body.token || req.query.token;

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        return res.json({success: false, message: 'Failed to authenticate token.'});
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }
};

module.exports.main = function (req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.headers['x-access-token'] || req.body.token || req.query.token;
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log('Token ERROR! ' + err.toString());
        req.authorized = false;
      } else {
        console.log('Valid Token!!!');
        req.authorized = true;
        req.decoded = decoded;
      }
      next();
    });
  } else {
    req.authorized = false;
    next();
  }
};
// Simple Local and OAuth authorization App based on MEAN Stack
// by Olzhas Kurenov
// server.js

var express = require('express');
var app = express();
var routes = require('./routes/routes');
var apiRoutes = require('./routes/api');
var authorize = require('./app/authorize');

var port;
var config;
var passport = require('passport');
var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('session');

// configuration ===============================================================

//Environment Dependent Configurations
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV && process.env.NODE_ENV == 'development') {
  port = process.env.NODE_PORT || 3000;
  config = require('./config/development');
  app.use(morgan('dev'));                                   
}
else {
  port = process.env.NODE_PORT || 80;
  config = require('./config/production');
}

mongoose.connect(config.database);

app.set('view engine', 'ejs');                            //set Templating engine as EJS
app.use(express.static(__dirname + '/public'));           //sets public folder as root for user files

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//app.use(session({ secret: config.secret }));
app.use(passport.initialize());
app.use(passport.session());
app.set('secret', config.secret);
app.locals.siteName = 'MEAN App';

// ROUTES ======================================================================
//Main Routes
app.use('/', routes);
//API
app.use('/api', apiRoutes);

//Bad Routes
app.get('*', function (req, res) {
  res.end('Bad Route!');
});

// launch ======================================================================
var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Server is running on Port ' + port);
});
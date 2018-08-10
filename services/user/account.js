const bcrypt = require('bcryptjs');
const passport = require('passport');
const request = require('request');

// Bring in HumanAPI config
let Hapi = require('../../config/humanapi');

// Bring in User Model
let User = require('../../models/user');

const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// User registration - create account
exports.user_registration = function(req, res) {
  const name = req.body.name;
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

  let errors = req.validationErrors();

  if(errors){
    res.render('register', {
      errors:errors
    });
  } else {
    let newUser = new User({
      name : name,
      username : username,
      email : email,
      password : password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
            req.flash('success','You are now registered and can log in');
            res.render('login', {message: req.flash('success')});
          }
        });
      });
    });
  }
};

// Update Human API credentials
exports.api_credentials = function(req, res) {
  var sessionTokenObject = req.body;
  // grab client secret from app settings page and `sign` `sessionTokenObject` with it.
  sessionTokenObject.clientSecret = Hapi.clientSecret;

  request({
    method: 'POST',
    uri: 'https://user.humanapi.co/v1/connect/tokens',
    json: sessionTokenObject
    }, function(err, resp, body) {
      if(err) return res.send(422);
      // at this point if request was successful body object
      // will have `accessToken`, `publicToken` and `humanId` associated in it.
      // You probably want to store these fields in your system in association to user's data.
      console.log(body);
      res.status(201).send(body);

      const accessToken = body.accessToken;
      const publicToken = body.publicToken;
      const humanId = body.humanId;
      const clientUserId = body.clientUserId;

      console.log('clientUserId is: ' + clientUserId);
      console.log('publicToken is: ' + publicToken);
      console.log('accessToken is: ' + accessToken);

      // Update the user in the database with the API credentials
      User.updateOne({ 'email': clientUserId }, {
          $set: {
            "humanapi.accessToken": accessToken,
            "humanapi.publicToken": publicToken,
            "humanapi.humanId": humanId,
            "humanapi.clientUserId": clientUserId,
          }},
          {multi:true},
       function(err, numberAffected) {
       });

    });
};

// Load the connect page if the user has no connected data sources
exports.load_connect_page = function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/user/login');
      } else {
          // expose the user to the template
          res.locals.user = user;
          email = res.locals.user.email;
          console.log('User logged in as: ', user.email);
          // render the connect page
          res.render('connect', {title: 'Connect your health data', user: user, email: email});
          }
        });
      } else {
        res.redirect('/user/login');
        }
};

// Make select user data available to the front-end client
exports.user_data_api = function(req, res) {
  if (req.user === undefined) {
      // The user is not logged in
      res.json({});
  } else {
      res.json({
          userEmail: req.user.email,
          publicToken: req.user.humanapi.publicToken
      });
  }
};

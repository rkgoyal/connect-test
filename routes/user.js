var express = require('express');
var router = express.Router();
const passport = require('passport');

// Require the user controller
var user_controller = require('../controllers/userController');

// Render account registration Form
router.get('/register', function(req, res){
  res.render('register', {title: 'Register for an account'})
});

// Complete registration process; save user to database
router.post('/register', user_controller.post_account_register);

// Render login form
router.get('/login', function(req, res){
  res.render('login', {title: 'Login'})
});

// Authenticate user upon log in
router.post('/login', user_controller.authenticate_user);

// GET Connect page
router.get('/connect', user_controller.load_connect_page);

// Post sessionTokenObject to the server
router.post('/connect/finish', user_controller.post_session_token);

// Publish user data in Json format
router.get('/userdata', user_controller.user_data_api);

// Logout
router.get('/logout', function(req, res){
  req.logOut();
  req.session = null;
  res.redirect('/user/login');
});


module.exports = router;

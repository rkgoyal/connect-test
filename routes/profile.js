var express = require('express');
var router = express.Router();

// Bring in User Model
let User = require('../models/user');

// Require our controllers.
var auth_controller = require('../controllers/authController');

// GET Connect page
router.get('/connect', function(req, res) {
  if (req.session && req.session.user) { // Check if session exists
    // lookup the user in the DB by pulling their email from the session
    User.findOne({ email: req.session.user.email }, function (err, user) {
      if (!user) {
        // if the user isn't found in the DB, reset the session info and
        // redirect the user to the login page
        req.session.reset();
        res.redirect('/auth/login');
      } else {
        // expose the user to the template
        res.locals.user = user;
        console.log('User logged in as: ', user.email);
        // render the connect page
        res.render('connect');
      }
    });
  } else {
    res.redirect('/auth/login');
  }
});

// Post sessionTokenObject to the server
router.post('/connect/finish', auth_controller.post_session_token);


// User data in Json format
router.get('/userdata', function(req, res) {

            if (req.user === undefined) {
                // The user is not logged in
                res.json({});
            } else {
                res.json({
                    userEmail: req.user.email,
                    publicToken: req.user.humanapi.publicToken
                });
            }
});

// Render the dashboard page after data source connections
router.get('/dashboard', function(req, res) {
  if (req.user) {
    res.render('dashboard');
  } else {
    res.redirect('/auth/login');
  }
});


module.exports = router;

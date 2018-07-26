var express = require('express');
var router = express.Router();

// Bring in User Model
let User = require('../models/user');

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
        console.log('In callback - User email is: ', user.email);
        userEmail = user.email;

        // render the connect page
        res.render('connect');
      }
    });
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;

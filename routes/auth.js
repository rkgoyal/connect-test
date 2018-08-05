var express = require('express');
var router = express.Router();
const passport = require('passport');

// Require our controllers.
var auth_controller = require('../controllers/authController');


// Register Form
router.get('/register', function(req, res){
  res.render('register', {title: 'Register for an account'})
});

// Register Process
router.post('/register', auth_controller.auth_register_post);

// Login Form
router.get('/login', function(req, res){
  res.render('login', {title: 'Login'})
});

// Login Form - #2 (Design Test)
router.get('/login2', function(req, res){
  res.render('login2', {title: 'Login'})
});

// Login Process
router.post('/login',
  function(req, res, next) {
      passport.authenticate('local',
        function(err, user) {
          if (err) { return next(err) }
          if (!user) { return res.redirect('/auth/login'); }

          // make passportjs setup the user object, serialize the user, ...
          req.login(user, {}, function(err) {
              if (err) { return next(err) };
              req.session.user = user;
              return res.redirect('/profile/connect');
          });
      })(req, res, next);
      return;
  }
);


// Logout
router.get('/logout', function(req, res){
  req.logOut();
  req.session = null;
  res.redirect('/auth/login');
});


module.exports = router;

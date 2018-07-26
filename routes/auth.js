var express = require('express');
var router = express.Router();
const passport = require('passport');

// Require our controllers.
var auth_controller = require('../controllers/authController');


// Register Form
router.get('/register', function(req, res){
  res.render('register')
});

// Register Process
router.post('/register', auth_controller.auth_register_post);

// Login Form
router.get('/login', function(req, res){
  res.render('login')
});

// Login Process
router.post('/login',
  function(req, res, next) {
      passport.authenticate('local', function(err, user) {
          if (err) { return next(err) }
          if (!user) {
              res.local("username", req.param('username'));
              return res.render('login', { error: true });
          }

          // make passportjs setup the user object, serialize the user, ...
          req.login(user, {}, function(err) {
              if (err) { return next(err) };
              console.log(req.user);
              req.session.user = user;
              return res.redirect('/profile/connect');
          });
      })(req, res, next);
      return;
  }
);

// User data in Json format
router.get('/userdata', function(req, res) {

            if (req.user === undefined) {
                // The user is not logged in
                res.json({});
            } else {
                res.json({
                    username: req.user
                });
            }
        });

// Logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/auth/login');
});


module.exports = router;

const passport = require('passport');

// Authenticate user on sign-in
exports.user_signin = function(req, res, next) {
    passport.authenticate('local',
      function(err, user) {
        if (err) {
          req.flash('danger', 'Invalid username or password.');
          return next(err)
        }
        if (!user) {
          return res.render('login', {message: req.flash('danger')});
        }

        // make passportjs setup the user object, serialize the user, ...
        req.login(user, {}, function(err) {
            if (err) {
              return next(err)
            }
            req.session.user = user;
            if (typeof user.humanapi.publicToken !== "undefined") {
              res.redirect('/profile/dashboard');
            } else {
              return res.render('connect');
            }
        });
    })(req, res, next);
    return;
};

var express = require('express');
var router = express.Router();

// GET dashboard page
router.get('/', function(req, res) {
  if (req.user) {
    res.render('dashboard');
  } else {
    res.redirect('/auth/login');
  }
});

module.exports = router;

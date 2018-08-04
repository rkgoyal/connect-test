var express = require('express');
var router = express.Router();

// Require our controllers.
var dataretrieval_controller = require('../controllers/dataRetrieval');

// GET dashboard page
router.get('/', function(req, res) {
  if (req.user) {
    res.render('dashboard');
  } else {
    res.redirect('/auth/login');
  }
});

// GET sources associated with the User
router.get('/sources', dataretrieval_controller.get_sources);

// GET sources associated with the User
router.get('/activitysummaries', dataretrieval_controller.get_activity_summary);

module.exports = router;

var express = require('express');
var router = express.Router();

// Require our controllers.
var dashanalytics_controller = require('../controllers/dashAnalytics');

// GET sources for dash display
router.get('/dashsources', dashanalytics_controller.get_dash_sources);


module.exports = router;

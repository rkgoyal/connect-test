var express = require('express');
var router = express.Router();

// Require our controllers.
var dashboard_controller = require('../controllers/alfred/dashboard');

// GET sources for dash display
router.get('/dashsources', dashboard_controller.dashboard);


module.exports = router;

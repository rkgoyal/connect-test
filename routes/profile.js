var express = require('express');
var router = express.Router();

// Require our controllers.
var dashboard_controller = require('../controllers/alfred/dashboard');

// Render the dashboard page after data source connections
router.get('/dashboard', dashboard_controller.dashboard);

// Refresh the user's latest connected sources
router.get('/refreshsources', dashboard_controller.refresh_sources);

// Build the user's latest connected sources list
router.get('/buildsourcelist', dashboard_controller.build_sourceList);

// Refresh the user's latest activity summaries
router.get('/refreshactivity', dashboard_controller.refresh_activity_summary);

module.exports = router;

const bluebird = require('bluebird');
var Promise = require("bluebird");

// Bring in the Sources data retrieval services
var connectedSources = require('../../services/dataretrieval/connectedSources');
var activitySummaries = require('../../services/dataretrieval/activitySummaries');
var sourcesAnalytics = require('../../services/analytics/dashboard/sources');

exports.dashboard = function(req, res) {
  // Save name variable to pass to render
  var name = req.user.name;
  sourcesAnalytics.build_sourceList(req, res)
    .then(function(result) {
      console.log('Promise result for dash is: ' + result);
      res.render('dashboard', {
          title: 'My Health Dashboard',
          name: name,
          sourceList: result
      });
    });
};

exports.refresh_sources = function(req, res) {
  connectedSources.refresh_connected_sources(req, res);
};

exports.build_sourceList = function(req, res) {
  sourcesAnalytics.build_sourceList(req, res);
};

exports.refresh_activity_summary = function(req, res) {
  activitySummaries.refresh_activity_summary(req, res);
};

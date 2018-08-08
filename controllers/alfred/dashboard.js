const bluebird = require('bluebird');
var Promise = require("bluebird");

// Bring in the Sources data retrieval services
var connectedSources = require('../../services/dataretrieval/connectedSources');
var activitySummaries = require('../../services/dataretrieval/activitySummaries');

exports.dashboard = function(req, res) {
  // Save name variable to pass to render
  var name = req.user.name;
  connectedSources.build_sourceList(req, res)
  .then(function(sourceList) {
      res.render('dashboard', {
          title: 'My Health Dashboard',
          name: name,
          sourceList: sourceList
        });
    });
};

exports.refresh_sources = function(req, res) {
  connectedSources.refresh_connected_sources(req, res);
};

exports.build_sourceList = function(req, res) {
  connectedSources.build_sourceList(req, res);
};

exports.refresh_activity_summary = function(req, res) {
  activitySummaries.refresh_activity_summary(req, res);
};

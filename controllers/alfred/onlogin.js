const bluebird = require('bluebird');
var Promise = require("bluebird");

// Bring in the Sources data retrieval services
var connectedSources = require('../../services/dataretrieval/connectedSources');
var activitySummaries = require('../../services/dataretrieval/activitySummaries');
var sourcesAnalytics = require('../../services/analytics/dashboard/sources');

exports.onlogin = function(req, res) {
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

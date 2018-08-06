// Bring in data models
let User = require('../models/user');
let Sources = require('../models/datasources');
let DashSource = require('../models/dashanalytics');
let DashAnalytics = require('../models/dashanalytics');

// Get current users humanId
var humanId = req.session.user.humanapi.humanId;

// Create dashboard analytics document for user

  var DashAnalytics = new DashAnalytics({
    humanId : humanId
  });

// Calculate number of connected data sources
exports.analytics.numberConnectSources = function (req, res) {
  Sources
    .findOne({"humanId": humanId})
    .exec(function(err, sourcesObject) {
      if (err) {
        return console.log(err);
      } else {
        numberConnectSources = sourcesObject.sources.length;
        console.log(numberConnectSources);
    }
  });
};

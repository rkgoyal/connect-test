const request = require('request');
const logger = require('morgan');

// Bring in Data Sources Model
let Sources = require('../models/datasources');

// GET sources associated with User from Utility API
exports.get_sources = function(req, res) {
    console.log("Current user is: " + req.user.humanapi.clientUserId);
    var accessToken = req.user.humanapi.accessToken;
    var userHumanId = req.user.humanapi.humanId;
    request
      .get('https://api.humanapi.co/v1/human/sources?access_token=' + accessToken)
      .on('data', function(data) {
        var sourceDoc = JSON.parse(data);
        console.log('Sources connected are: ' + sourceDoc);

// NEED IF STATEMENT TO CHECK IF RECORD EXISTS AND IF SO, UPDATE, ELSE CREATE NEW
        if (Sources.findOne({"humanId": userHumanId})) {
          Sources.updateOne({"humanId": userHumanId}, {
              $set: {
                "sources": sourceDoc
              }},
              {multi:true},
           function(err, numberAffected) {
           })
        } else {
          var newSources = new Sources({
            humanId : userHumanId,
            sources : sourceDoc
          });
          newSources.save();
        }

      });
    res.redirect('/profile/dashboard');
};

// Bring in Activity Summary Model
let ActivitySummaries = require('../models/activitysummaries');

// GET all activity summaries associated with User from Wellness API
exports.get_activity_summary = function(req, res) {
  console.log("Current user is: " + req.user.humanapi.clientUserId);
  var accessToken = req.user.humanapi.accessToken;
  var userHumanId = req.user.humanapi.humanId;

  var options = {
  url: 'https://api.humanapi.co/v1/human/activities/summaries?access_token=' + accessToken,
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
      }
  };

  request(options, function(err, res, body) {
      let activityDocs = JSON.parse(body);
      console.log(activityDocs);

      var newActivitySummaries = new ActivitySummaries({
                                      humanId : userHumanId,
                                      activitySummaries : activityDocs
                                    });
      newActivitySummaries.save();
      });

    res.redirect('/profile/dashboard');
};

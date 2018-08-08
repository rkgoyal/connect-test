const request = require('request');
var rp = require('request-promise');

// Bring in Activity Summary Model
let ActivitySummaries = require('../../models/activitysummaries');

// GET all activity summaries associated with User from Wellness API
exports.refresh_activity_summary = function(req, res) {
  console.log("Current user is: " + req.user.humanapi.clientUserId);
  var accessToken = req.user.humanapi.accessToken;
  var userHumanId = req.user.humanapi.humanId;
  // Getting latest activity summary data from API
  var options = {
    uri: 'https://api.humanapi.co/v1/human/activities/summaries',
    qs: {
        access_token: accessToken // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
    },
    json: true // Automatically parses the JSON string in the response
  };

  rp(options)
    .then(function (data) {
        console.log('User has %d daily summaries', data.length);
        ActivitySummaries.findOne({"humanId": userHumanId}, function(err, record) {
          if (err) {
            return console.log(err);
          }
          if (!record) {
            console.log("No record found. Creating new activity summary record.");
            var newActivitySummaries = new ActivitySummaries({
                                            humanId : userHumanId,
                                            activitySummaries : data
                                          });
            newActivitySummaries.save();
          }
          else {
            console.log('Activity summary record exists.');
            ActivitySummaries.updateOne({"humanId": userHumanId}, {
                $set: {
                  "activitySummaries": data
                }},
                {multi:true},
                function(err, numberAffected) {
                  console.log('Updated ' + numberAffected + ' records');
                }
              );
          }
        });
    })
    .catch(function (err) {
        console.log(err);
    });

  res.sendStatus(200);
};

const request = require('request');
var rp = require('request-promise');
const bluebird = require('bluebird');
var Promise = require("bluebird");

// Bring in Data Sources Model
let Sources = require('../../models/datasources');

// GET sources associated with User from Utility API
exports.refresh_connected_sources = function(req, res) {
  var user = req.user;
  var email = user.humanapi.clientUserId;
  console.log("Current user for get sources is: " + email);
  var accessToken = user.humanapi.accessToken;
  var userHumanId = user.humanapi.humanId;
  // Getting latest sources data from API
  var options = {
    uri: 'https://api.humanapi.co/v1/human/sources',
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
        console.log('User has %d sources', data.length);
        Sources.findOne({"humanId": userHumanId}, function(err, record) {
          if (err) {
            return console.log(err);
          }
          if (!record) {
            console.log("No record found. Creating new sources record.");
            var newSources = new Sources({
                                  humanId : userHumanId,
                                  sources : data
                                });
            newSources.save();
          }
          else {
            console.log('Sources record exists.');
            Sources.findOne({"humanId": userHumanId}, function(err, record) {
              if (err) {
                return console.log(err);
              }
              else {
                record.sources = data;
                record.save(function(err) {
                  if (err) {
                    return console.log(err);
                  }
                });
              }
            });
          }
        });
    })
    .catch(function (err) {
        console.log(err);
    });

  res.sendStatus(200);
};

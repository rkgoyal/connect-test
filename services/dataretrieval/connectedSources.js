const request = require('request');
var rp = require('request-promise');

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
            Sources.updateOne({"humanId": userHumanId}, {
                $set: {
                  "sources": data
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


// Build and format the users current source source list
exports.build_sourceList = function(req, res) {
    // Save name variable to pass to render
    var name = req.user.name;

    // Build the sourceList of users connected data sources
    var humanId = req.user.humanapi.humanId;
    console.log('ID for source list is: ' + humanId);
    var sourceList = [];

    function getSourceList(humanId) {
      Sources.findOne({"humanId": humanId}, function(err, record) {
        if (err) {
          return console.log(err);
        }
        if (!record) {
          sourceList.push('Please refresh connected data sources.');
          return res.render('dashboard', {
              title: 'My Health Dashboard',
              name: name,
              sourceList: sourceList
            });
        }
        else {
          console.log('Sources object is: ' + record);
          record.sources.forEach(function(source) {
            var sourceDetail = source.source + ' has been connected since ' + source.connectedSince;
            sourceList.push(sourceDetail);
          });
          console.log('Source list is: ' + sourceList);
          // Pass the values to the template
          res.render('dashboard', {
              title: 'My Health Dashboard',
              name: name,
              sourceList: sourceList
            });
        }
      });
    };

    getSourceList(humanId);
};

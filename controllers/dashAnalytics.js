const request = require('request');
const logger = require('morgan');

// Bring in data models
let User = require('../models/user');
let Sources = require('../models/datasources');
let DashSource = require('../models/dashanalytics');
let DashAnalytics = require('../models/dashanalytics');

// Save the users sources
exports.get_dash_sources = function(req, res) {
  var humanId = req.session.user.humanapi.humanId;
  console.log('ID for dash sources is: ' + humanId);
  var sourceList = [];
  Sources.
    findOne({"humanId": humanId}).
    exec(function(err, sourcesObject) {
          if (err) {
            return console.log(err);
          } else {
            console.log(sourcesObject);
            sourcesObject.sources.forEach(function(source) {
              console.log('%s has been connected since %s', source.source, source.connectedSince);
              var sourceDetail = source.source + ' has been connected since ' + source.connectedSince;
              sourceList.push(sourceDetail);
            });

            res.render('dashboard', {"sourceList": sourceList});

          }
    });
  };

const request = require('request');
const logger = require('morgan');

// Bring in Data Sources Model
let Sources = require('../models/datasources');

exports.dashboard = function(req, res) {
  if (req.user) {
    // Save name variable to pass to render
    var name = req.user.name;

    // Build the sourceList of users connected data sources
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

  } else {
    res.redirect('/auth/login');
  }
};

// Bring in Data Sources Model
let Sources = require('../../../models/datasources');

// Build and format the users current source source list
exports.build_sourceList = function(req, res) {
  var sourceListPromise = new Promise(function resolver(resolve, reject) {
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
          resolve(sourceList);
        }
        else {
          console.log('Sources object is: ' + record);
          record.sources.forEach(function(source) {
            var sourceDetail = source.source + ' has been connected since ' + source.connectedSince;
            sourceList.push(source.source);
          });
          console.log('Source list is: ' + sourceList);
          resolve(sourceList);
        }
      });
    };
    getSourceList(humanId);
  });
  return sourceListPromise;
};

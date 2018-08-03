const request = require('request');
const logger = require('morgan');

// Bring in Data Sources Model
let Sources = require('../models/datasources');


// GET sources associated with User from Utility API
exports.get_sources = function(req, res) {
    console.log("Current user is: " + req.user.humanapi.clientUserId);
    var accessToken = req.user.humanapi.accessToken;
    request
    .get('https://api.humanapi.co/v1/human/sources?access_token=' + accessToken)
    .on('data', function(data) {
      console.log(JSON.parse(data));
    });

    




    res.redirect('/profile/dashboard');
  };




// var headers = {
//   'Authorization': 'Bearer ' + accessToken,
//   'Accept': 'application/json'
// };
// var url = 'https://api.humanapi.co/v1/human';
//
// request({
//   method: 'GET',
//   uri : url,
//   headers : headers
//   }, function (error, res, body) {
//     var parsedResponse;
//     if (error) {
//       callback(new Error('Unable to connect to the Human API endpoint.'));
//     } else {
//       if(res.statusCode == 401) {
//         logger.debug("Unauthorized request, validate access token");
//         callback(null, { status: 'unauthorized' });
//       } else {
//         try {
//           parsedResponse = JSON.parse(body);
//         } catch (error) {
//           return callback(new Error('Error parsing JSON response from Human API.'));
//         }
//         // At this point you can use the JSON object to access the results
//         console.log("Latest blood glucose measurement");
//         console.log(parsedResponse.bloodGlucose.value);
//         return callback(null, parsedResponse);
//       }
//     }
// });

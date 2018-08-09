// Bring in the user services
var account = require('../services/user/account');
var authentication = require('../services/user/authentication');

// Register process on POST
exports.post_account_register = function(req, res) {
  account.user_registration(req, res);
};

// POST sessiontokenobject to server
exports.post_session_token = function(req, res) {
  account.api_credentials(req, res);
};

// Authenticate user upon sign in
exports.authenticate_user = function(req, res) {
  authentication.user_signin(req, res);
};

// Load connect page when user signs in with no data sources connected
exports.load_connect_page = function(req, res) {
  account.load_connect_page(req, res);
};

// Make user data available to front-end client
exports.user_data_api = function(req, res) {
  account.user_data_api(req, res);
};

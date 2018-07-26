
// Define the getjson function
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

// Use the getjson function to access userdata json
getJSON('http://localhost:3000/auth/userdata',
function(err, data) {
  if (err !== null) {
    alert('Something went wrong: ' + err);
  } else {
    alert('User email is: ' + data.username.email);
  }
});

// Human API connect launch
var connectBtn = document.getElementById('connect-health-data-btn');
connectBtn.addEventListener('click', function(e) {

    var options = {
      clientUserId: encodeURIComponent(unknown_for_now), // can be email
      clientId: 'cdf0c805007e05f0f084e1bf0da88684cfe027f7', // found in Developer Portal
      publicToken: '',
      finish: function(err, sessionTokenObject) {
        // callback that would be called after user finishes
        // connecting data.
        console.log(sessionTokenObject);

        // you need to post `sessionTokenObject` to your server



        // append `clientSecret` to it and send it to our server.
        sessionTokenObject.clientSecret  = '6db64c7d8eb1fb070c0a6294934b3d0d7bceaf4f';
        console.log(sessionTokenObject);

        request.post({
          method: 'POST',
          url: 'https://user.humanapi.co/v1/connect/tokens',
          data: sessionTokenObject
        }, function(error, response, body) {
          if(error) {
            console.log(error);
          } else {
            console.log(response.statusCode, body);
          }
        });

        // sending POST request with jQuery might look like this.

      },
      close: function() {
        // optional callback that will be called if the user
        // closes the popup without connecting any data sources.
        console.log('No data sources connected.');
      },
      error: function(err) {
        // optional callback that will be called if an error occurs while
        // loading the popup.
        // `err` is an object with the fields: `code`, `message`, `detailedMessage`
        console.log(err);
      }
    }

  HumanConnect.open(options)
});

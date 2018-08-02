// Get user email from userdata API
var xhReq = new XMLHttpRequest();
  xhReq.open("GET", 'http://localhost:3000/profile/userdata', false);
  xhReq.send(null);
var jsonObject = JSON.parse(xhReq.responseText);
console.log(jsonObject.userEmail);
// Get user publicToken from the server
console.log(jsonObject.publicToken);


// Human API connect launch
var connectBtn = document.getElementById('connect-health-data-btn');
connectBtn.addEventListener('click', function(e) {

    var options = {
      clientUserId: encodeURIComponent(jsonObject.userEmail), // can be email
      clientId: 'cdf0c805007e05f0f084e1bf0da88684cfe027f7', // found in Developer Portal
      publicToken: jsonObject.publicToken,
      finish: function(err, sessionTokenObject) {
        // callback that would be called after user finishes
        // connecting data.
        console.log(sessionTokenObject);
        // you need to post `sessionTokenObject` to your server
        var xhr = new XMLHttpRequest();
          xhr.open("POST", '/profile/connect/finish', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify(sessionTokenObject));

      },
      close: function() {
        // optional callback that will be called if the user
        // closes the popup without connecting any data sources.
        console.log('No data sources connected.');
        alert('No data sources connected.');
        location.reload();
      },
      error: function(err) {
        // optional callback that will be called if an error occurs while
        // loading the popup.
        // `err` is an object with the fields: `code`, `message`, `detailedMessage`
        console.log(err);
        location.reload();
      }
    }

  HumanConnect.open(options)
});

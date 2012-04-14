var GitIO = new (function() {

  var API_ENDPOINT  = "http://git.io/";

  this.invoke = function(command, params, response_callback) {
    switch (command) {
      case "generate":
        requestForShortenUrl(params.url, function(data) {
          response_callback(data);
        });
        break;
    }
  };

  var requestForShortenUrl = function(url, callback) {
    var xhr = new XMLHttpRequest();
    var form_data = new FormData();

    form_data.append("url", url);

    // TODO: cannot deal with error status e.g. 422 Unprocessable Entries

    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        switch (xhr.status) {
          case 201: // CREATED
            callback({
              "status": "OK",
              "shortened_url": xhr.getResponseHeader("Location")
            });
            break;

          default: // Something Went Wrong!
            callback({
              "status": "Error",
              "error": {
                "code": xhr.status
              }
            });
            break;
        }
      }
    };

    xhr.open("POST", API_ENDPOINT, true);
    xhr.send(form_data);
  };
})();

// register service for this extension
chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  GitIO.invoke(request.command, request.params, sendResponse);
});

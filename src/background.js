var GitIO = new (function() {

  var API_ENDPOINT  = "https://git.io/";
  var DOMAINS = [
    "github.com",
    "github.io",
    "githubusercontent.com"
  ];

  var DOMAINS_EXPRESSION = DOMAINS.map(function(domain) {
    return domain.replace('.', '\\.');
  }).join("|");

  var MATCH_DOMAINS = new RegExp(`(^|\\.)(${DOMAINS_EXPRESSION})$`, "i");

  this.invoke = function(command, params, response_callback) {
    switch (command) {
      case "generate":
        requestForShortenUrl(params.url, function(data) {
          response_callback(data);
        });
        break;
    }
  };

  this.isGitHubURL = function(url) {
    var url = new URL(url);
    return MATCH_DOMAINS.test(url.host);
  };

  var requestForShortenUrl = function(url, callback) {
    var xhr = new XMLHttpRequest();
    var form_data = new FormData();

    form_data.append("url", url);

    xhr.onload = function(e) {
      // note: this === xhr
      switch (this.status) {
        case 201: // CREATED
          callback({
            "status": "OK",
            "shortened_url": this.getResponseHeader("Location")
          });
          break;

        default: // Something Went Wrong!
          callback({
            "status": "Error",
            "error": {
              "code": this.status,
              "message": this.responseText
            }
          });
          break;
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

// show Page Action icon when we're on GitHub
chrome.tabs.onUpdated.addListener(function(tab_id, change_info, tab) {
  if (GitIO.isGitHubURL(tab.url)) {
    chrome.pageAction.show(tab_id);
  }
});

var GitIOPopup = new (function() {
  var text_field = document.getElementById("shortened-url");
  var message_container = document.getElementById("message");

  this.getShortenedUrl = function() {

    // XXX: tabs.getSelected is a private API.
    // dirty, but works.
    chrome.tabs.getSelected(null, function(tab) {

      var request_data = {
        "command": "generate",
        "params": {
          "url": tab.url
        }
      };

      chrome.extension.sendRequest(request_data, function(data) {
        switch (data.status) {
          case "OK":
            setTextField(data.shortened_url);
            setMessage("Generated. Click to copy.");
            bindClickToCoopy();
            break;

          case "Error":
            setMessage("Error: (" + data.error.code + ") " + data.error.message);
            break;

          default:
            setMessage("Unknown Response: " + data.status);
            break;
        }
      });
    });
  };

  var copyResultToClipboard = function() {
    text_field.select();
    document.execCommand('Copy');

    setMessage("Copied to clipboard.");
  };

  var getTextField = function() {
    return text_field.value;
  };

  var setTextField = function(text) {
    text_field.value = text;
  };

  var setMessage = function(message) {
    message_container.innerText = message;
  };

  var bindClickToCoopy = function() {
    // copy the result to clipboard when click on #result or #shortened-url
    text_field.addEventListener("click", function() {
      copyResultToClipboard();
    });
  };
})();

document.addEventListener("DOMContentLoaded", function () {
  GitIOPopup.getShortenedUrl();
});

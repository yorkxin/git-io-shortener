var GitIOPopup = new (function() {
  var text_field = document.getElementById("shortened-url");
  var message_container = document.getElementById("message");

  var setTextField = function(text) {
    text_field.value = text;
  };

  var setMessage = function(message) {
    message_container.innerText = message;
  };
})();

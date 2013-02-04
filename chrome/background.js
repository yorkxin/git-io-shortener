var GitIO = new (function () {

  var API_ENDPOINT  = 'http://git.io/'

  this.invoke = function (command, params, response_callback) {
    switch (command) {
      case 'generate':
        requestForShortenUrl(params.url, params.code, function (data) {
          response_callback(data)
        })
        break
    }
  }

  var requestForShortenUrl = function (url, code, callback) {
    var xhr = new XMLHttpRequest()
    var form_data = new FormData()

    form_data.append('url', url)
    if (code) form_data.append('code', code)

    xhr.onload = function (e) {
      switch (this.status) {
        case 201:
          callback({
            'status': 'OK'
          , 'shortened_url': this.getResponseHeader('Location')
          })
          break

        default:
          callback({
            'status': 'Error'
          , 'error': {
              'code': this.status
            , 'message': this.responseText
            }
          })
          break
      }
    }

    xhr.open('POST', API_ENDPOINT, true)
    xhr.send(form_data)
  }
})()

chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
  GitIO.invoke(request.command, request.params, sendResponse)
})

chrome.tabs.onUpdated.addListener(function (tab_id, change_info, tab) {
  if (tab.url.match(/^(http|https)?:\/\/(.+\.)?github\.com\//)) {
    chrome.browserAction.show(tab_id)
  }
})

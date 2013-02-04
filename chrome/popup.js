var text_field = document.getElementById('shortened-url')
  , notifications = document.getElementById('notifications')
  , message_field = document.getElementById('message')
  , action_button = document.getElementById('action-button')
  , show_all_recent_links = document.getElementById('show-all-recent-links')
  , clear_list = document.getElementById('clear-list')
  , recent_links = document.getElementById('recent-links')
  , lis = recent_links.getElementsByTagName('li')
  , shrtLink = function () { GitIOPopup.getShortenedUrl() }

action_button.addEventListener('click', shrtLink)

var getTextField = function () {
  return text_field.value
}

var setTextField = function (text) {
  text_field.value = text
}

var setMessage = function (message) {
  message_field.innerHTML = message
}

var copyResultToClipboard = function (field) {
  field.select()
  document.execCommand('Copy')
  notifications.classList.remove('error')
  notifications.classList.add('done')
  setMessage('Link is copied to the clipboard.')
}

var bindBtnToCoopy = function () {
  action_button.removeEventListener('click', shrtLink, false)
  action_button.addEventListener('click', function () { copyResultToClipboard(text_field) })
  action_button.innerHTML = 'cpy!'
  action_button.classList.remove('error')
  action_button.classList.add('done')
  notifications.classList.remove('error')
  notifications.classList.add('done')
  setMessage('You can now copy the link by clicking “cpy!” It will also stay in your shrt-list if you ever need it again.')
}

var createShrtLink = function (shrt, fullUrl) {
  var listElement = document.createElement('li')
    , listInput = document.createElement('input')
    , listVisit = document.createElement('a')
    , listCopy = document.createElement('a')
  
  listInput.value = shrt
  listInput.type = 'text'
  listInput.readOnly = true
    
  listVisit.href = shrt
  listVisit.target = '_new'
  listVisit.title = 'Open link in new tab'
  listVisit.appendChild(document.createTextNode(''))
  
  listCopy.href = '#copy'
  listCopy.title = 'Copy link to clipboard'
  listCopy.appendChild(document.createTextNode(''))
  listCopy.addEventListener('click', function (e) {
    copyResultToClipboard(e.currentTarget.parentNode.getElementsByTagName('input')[0])
    e.preventDefault()
  })
    
  listElement.title = fullUrl
  listElement.appendChild(listInput)
  listElement.appendChild(listVisit)
  listElement.appendChild(listCopy)

  recent_links.appendChild(listElement, recent_links.firstChild)
}

var getShortenedUrl = function () {

  chrome.tabs.getSelected(null, function (tab) {

    var request_data = {
      'command': 'generate',
      'params': {
        'url': tab.url,
        'code': text_field.value
      }
    }

    chrome.extension.sendRequest(request_data, function (data) {
      switch (data.status) {
        case 'OK':
          setTextField(data.shortened_url)
          bindBtnToCoopy()
          chrome.storage.local.get(data.shortened_url, function (arr) {
            if (!arr[data.shortened_url]) chrome.storage.local.set({data.shortened_url: tab.url})
          }
          break

        case 'Error':
          action_button.innerHTML = 'rrr!'
          action_button.classList.remove('done')
          action_button.classList.add('error')
          notifications.classList.remove('done')
          notifications.classList.add('error')
          setMessage(data.error.code + ': ' + data.error.message)
          break

        default:
          action_button.innerHTML = '??!'
          action_button.classList.remove('done')
          action_button.classList.add('error')
          notifications.classList.remove('done')
          notifications.classList.add('error')
          setMessage(data.status)
          break
      }
    })
  })
}


chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key]
    console.log('Storage key "%s" in namespace "%s" changed. Old value was "%s", new value is "%s".',
                 key, namespace, storageChange.oldValue, storageChange.newValue)
    createShrtLink(key, changes[key])
  }

  if (lis.length > 3) {
    show_all_recent_links.style.display = 'block'
    show_all_recent_links.getElementsByTagName('li')[0].innerHTML = '▾ show ' + (lis.length-3) + ' more ▾'
    show_all_recent_links.addEventListener('click', function () {
      for (var i = 3; i < lis.length; i++) { lis[i].style.display = 'block' }
      show_all_recent_links.style.display = 'none'
      clear_list.style.display = 'block'
      clear_list.addEventListener('click', function () {
        while (lis[0]) { lis[0].parentNode.removeChild(lis[0]) }
        chrome.storage.local.clear()
        clear_list.style.display = 'none'
      })
    })
  }

})
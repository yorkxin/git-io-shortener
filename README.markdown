# DEPRECATED

As of January 2022, [GitHub put `git.io` service to read-only](https://github.blog/changelog/2022-04-25-git-io-deprecation/). Therefore, this extension no longer work.

# Git.io URL Shortener (Chrome Extension)

Did you ever feel annoying when shortening a GitHub URL with Git.io, by typing `curl -i` manually?  Let's do it within our browser!

## Demo: Click the Icon, and You'll See it

When you visiting a GitHub.com page, click the **git.io** button, and a shortened URL will be popped out:

[![Git.io URL Shortener Demo](http://cl.ly/462O1f1r2n0H1j0I0b00/Git.io%20URL%20Shortener%20Demo.png)](http://cl.ly/462O1f1r2n0H1j0I0b00)

## Copy to your Clipboard: Just One More Click Away

You can also click on the shortened URL, and it will be copied to your clipboard!

## Wanna Help Me?

It's welcomed!  You may help me by:

* making a fancy new icon, or
* fixing bugs (see Issues section)

## Technical Notes

I've wrote an article about some technical things I learned when making this extension, [read it here](http://blog.yorkxin.org/2012/04/15/git-io-url-shortener/).

## Changelog

### v0.5.1:

- Support `*.github.com`, `*.github.io` and `*.githubusercontent.com`.
- Switched to https://git.io

### v0.5.0:

- Support help.github.com. Thanks to @jzjzjzj

### v0.4.0:

- Deal with error status from git.io
- Click-to-copy procedure refactored

### v0.3.0:

- Support for raw.github.com, developer.github.com and develop.github.com

### v0.2.0:

- Support for gist.github.com

### v0.1.0:

- Shorten github.com with git.io service
- Click the result text box to copy to clipboard

## License: Know your rights

This application, including the source code and images, is released under the following software license (feel free to make it available on other browsers with my code):

### The MIT License

Copyright (c) 2012 Yu-Cheng Chuang

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict'

module.exports = [
  {
    name: 'pageA',
    entry: ['./src/pageA.entry.js'],
    injectManifest: true,
    injectCommon: true,
    filename: 'pageA.html',
    template: 'pageA.html'
  },
  {
    name: 'pageB',
    entry: ['./src/pageB.entry.js'],
    injectManifest: true,
    injectCommon: true,
    filename: 'pageB.html',
    template: 'pageB.html'
  }
]

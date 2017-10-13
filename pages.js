'use strict'

module.exports = [
  {
    name: 'pageA',
    entry: 'pageA.entry.js',
    filename: 'pageA.html',
    template: 'pageA.html',
    vendor: ['vue']
  },
  {
    name: 'pageB',
    entry: 'pageB.entry.js',
    filename: 'pageB.html',
    template: 'pageB.html',
    vendor: ['fetchJsonp']
  }
]

'use strict'

module.exports = [
  {
    name: 'pageA',
    entry: ['./src/pageA.entry.js'],
    filename: 'pageA.html',
    template: 'pageA.html',
    vendor: ['vue']
  },
  {
    name: 'pageB',
    entry: ['./src/pageB.entry.js'],
    filename: 'pageB.html',
    template: 'pageB.html',
    vendor: ['fetchJsonp']
  }
]

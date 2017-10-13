# vue-webpack-multi-pages

# Get Start
`pages.js`:

```js
'use strict'

module.exports = [
  {
    name: 'pageA', // name for vendor chunk
    entry: 'pageA.entry.js', // pageA's entry file
    filename: 'pageA.html', // The file to write the HTML to. Please see "html-webpack-plugin"
    template: 'pageA.html', // Webpack require path to the template. Please see "html-webpack-plugin"
    vendor: ['vue'] // Select the source chunks by chunk names. The chunk must be a child of the commons chunk.
    // All chunks will be merged into '**-vendor.js'(eg:pageA-vendor).
  },
  {
    name: 'pageB',
    entry: 'pageB.entry.js',
    filename: 'pageB.html',
    template: 'pageB.html',
    vendor: ['fetchJsonp']
  },
  //Add your pages
]

```

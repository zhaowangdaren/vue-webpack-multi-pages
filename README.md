# vue-webpack-multi-pages

> Based on vue-cli's webpack templates

[中文](./README-CN.md)

# Get Start
1. Create `XXX.entry.js` under `src` folder, as new Page's entry
2. Create `XXX.html` under the project as template, eg. `pageA.html`
3. Write configuration in the `pages.js` file. For expample:

`pages.js`:

```js
'use strict'

module.exports = [
  {
    name: 'pageA', // name for vendor chunk
    entry: 'pageA.entry.js', // pageA's entry file
    filename: 'pageA.html', // The file to write the HTML. Please see "html-webpack-plugin"
    template: 'pageA.html', // Webpack require path to the template. Please see "html-webpack-plugin"
  },
  {
    name: 'pageB',
    entry: ['pageB.entry.js'],
    filename: 'pageB.html',
    template: 'pageB.html'
  },
  //Add your pages
]

```

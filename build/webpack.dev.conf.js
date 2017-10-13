'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const pages = require('../pages')

function addPages() {
  var multiConfig = {
    entry: {},
    plugins: []
  }
  for (let i = 0; i < pages.length; i++) {
    multiConfig.entry[pages[i].entry] = './src/' + pages[i].entry
    let chunks = [pages[i].name + '-vendor']
    chunks.push(pages[i].entry)
    multiConfig.plugins.push(new HtmlWebpackPlugin({
      chunks: chunks,
      chunksSortMode: function (a, b) {
        return  chunks.indexOf(a.names[0]) - chunks.indexOf(b.names[0])
      },
      filename: pages[i].filename,
      template: pages[i].template,
    }))

    multiConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: pages[i].name + '-vendor',
      chunks: pages[i].vendor
    }))
  }
  return multiConfig
}
baseWebpackConfig = merge(baseWebpackConfig, addPages())

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
})

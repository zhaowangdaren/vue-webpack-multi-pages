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
    plugins: []
  }
  for (var i = 0; i < pages.length; i++) {
    multiConfig.plugins.push(new HtmlWebpackPlugin({
      chunks: [pages[i].name],
      filename: pages[i].filename,
      template: pages[i].template,
      inject: true
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
      inject: false,
      template: 'all.html',
      filename: 'all.html',
      pages: pages      
    }),
    new FriendlyErrorsPlugin()
  ]
})

'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const pages = require('../pages')

const spinner = ora('building for production...')
spinner.start()

function addPages() {
  var multiConfig = {
    entry: {},
    plugins: []
  }
  for (let i = 0; i < pages.length; i++) {

    multiConfig.entry[pages[i].entry] = './src/' + pages[i].entry

    let chunks = [pages[i].name + '-vendor']
    // chunks = chunks.concat(pages[i].vendor)
    chunks.push(pages[i].entry)
    multiConfig.plugins.push(new HtmlWebpackPlugin({
      chunks: chunks,
      chunksSortMode: function (a, b) {
        return  chunks.indexOf(a.names[0]) - chunks.indexOf(b.names[0])
      },
      filename: pages[i].filename,
      template: pages[i].template,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      // chunksSortMode: 'dependency'
    }))

    multiConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
      name: pages[i].name + '-vendor',
      chunks: pages[i].vendor
    }))
  }
  return multiConfig
}

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // Add by zhaowangdaren
  webpackConfig = merge(webpackConfig, addPages(pages))
  webpack(webpackConfig, function (err, stats) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})

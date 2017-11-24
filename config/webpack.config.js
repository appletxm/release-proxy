var path = require('path')
var webpack = require('webpack')
var HtmlWebPlugin = require('html-webpack-plugin')
var CopyPlugin = require('copy-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var envConfig = require('./env')
var envKeyWord = (process.argv)[2]

var env = envConfig[envKeyWord]
var publicPath = env.publicPath
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
var vendorPath, cssPath
var sourcePath, distPath
var webpackConfig

process.env.NODE_ENV = envKeyWord
sourcePath = path.join(__dirname, env.sourcePath)
distPath = path.join(__dirname, env.distPath)

console.info('***current env***', envKeyWord, __dirname)

webpackConfig = require('./webpack.config.base')(envKeyWord, publicPath)

let envCfg
if (envKeyWord === 'development') {
  envCfg = 'envDevelopment'
} else if (envKeyWord === 'mock') {
  envCfg = 'envMock'
} else if (envKeyWord === 'test') {
  envCfg = 'envTest'
} else {
  envCfg = (process.argv)[3] && (process.argv)[3] === 'test' ? 'envTest' : 'envProduction'
}
webpackConfig['resolve']['alias']['env.cfg'] = path.join(__dirname, './' + envCfg + '.js')

if (envKeyWord === 'development' || envKeyWord === 'mock') {
  vendorPath = 'js/vendor.js'
  cssPath = 'css/[name].[hash:7].css'
  webpackConfig.entry.app = [hotMiddlewareScript, path.resolve('./src/js/index.js')]
  webpackConfig.devtool = 'source-map'
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  )
} else {
  vendorPath = 'js/vendor.min.[hash:7].js'
  cssPath = 'css/[name].min.[hash:7].css'
  webpackConfig.entry.app = [path.resolve('./src/js/index.js')]
  webpackConfig.devtool = 'cheap-source-map'
  webpackConfig.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.DedupePlugin()
  )
}

webpackConfig.plugins.push(
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: vendorPath }),
  new CopyPlugin([{ from: path.join(__dirname, '../src/assets'), to: path.join(__dirname, '../dist/assets') }]),
  new ExtractTextPlugin(cssPath),
  new HtmlWebPlugin({
    title: 'Smart Sampling',
    filename: path.join(__dirname, '../dist/', 'index.html'),
    template: path.join(__dirname, '../src/', 'index.ejs'),
    favicon: '',
    inject: 'body',
    publicPath: env.publicPath,
    libFiles: {
      css: [],
      js: env['js']
    }
  })
)

module.exports = webpackConfig

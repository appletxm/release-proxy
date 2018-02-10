const rm = require('rimraf')
const webpackConfig = require('../config/webpack.config')
const ora = require('ora')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const distOperations = require('./release-dist-operations')

function build () {
  var spinner = ora('building for production...')

  spinner.start()

  rm(path.resolve('./dist/'), function (err) {
    if (err) {
      spinner.stop()
      throw err
    }

    webpack(webpackConfig, function (err, stats) {
      if (err) {
        spinner.stop()
        throw err
      }
      distOperations.createTarFile(process.argv[3] || 'production').then((_) => {
        spinner.stop()
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
          }) + '\n\n')
        console.log(chalk.magenta('*****************build success****************'))
        console.log(chalk.cyan(`build success : $tarName(${_.versionId})`))
      })
    })
  })
}

build()

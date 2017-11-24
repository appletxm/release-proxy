const packageFile = require('./releasePackage')
const version = process.argv ? (process.argv)[2] : ''
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Releasing version: ' + version + '...')
spinner.start()

packageFile.updateVersion(version).then((file) => {
  // console.info('#####', file)
  spinner.stop()
}).catch((err) => {
  console.error(err)
})

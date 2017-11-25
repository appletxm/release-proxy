const packageOperations = require('./releasePackageOperations')
const tagOperations = require('./releaseTagOperations')
const version = process.argv ? (process.argv)[2] : ''
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Releasing version: ' + version + '...')
spinner.start()

packageOperations.updateVersion(version)
  .then((res) => {
    // console.info('#####', file)
    if (res === true) {
      console.info('#####', version)
      return tagOperations.createTag(version)
    }
  })
  .then((res) => {
    if (res === true) {
      spinner.stop()
    }
  })
  .catch((err) => {
    console.error(err)
    spinner.stop()
  })

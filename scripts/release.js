const packageOperations = require('./releasePackageOperations')
// const tagOperations = require('./releaseTagOperation')
const version = process.argv ? (process.argv)[2] : ''
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Releasing version: ' + version + '...')
spinner.start()

packageOperations.updateVersion(version)
  .then((res) => {
    // console.info('#####', file)
    if (res === true) {
      return tagOperations.createTag(version)
    }
    spinner.stop()
  })
  //   .then((res) => {
  //     if (res === true) {
  //       spinner.stop()
  //     }
  //   })
  .catch((err) => {
    console.error(err)
  })

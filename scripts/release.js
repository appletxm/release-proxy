const packageOperations = require('./releasePackageOperations')
const tagOperations = require('./releaseTagOperations')
const distOperations = require('./releaseDistOperations')
const releaseCodeOperations = require('./releaseCodeOperations')
const version = process.argv ? (process.argv)[3] : ''
const ora = require('ora')
const chalk = require('chalk')
const spinner = ora('Releasing version: ' + version)

global.branch = 'master'

spinner.start()

releaseCodeOperations.switchBranch()
  .then((res) => {
    if (res === true) {
      return releaseCodeOperations.updateCode()
    }
  })
  .then((res) => {
    if (res === true) {
      return packageOperations.updateVersion(version)
    }
  })
  .then((res) => {
    if (res === true) {
      return tagOperations.createTag(version)
    }
  })
  .then((res) => {
    if (res === true) {
      return distOperations.buildDist()
    }
  })
  .then((res) => {
    spinner.stop()
  })
  .catch((err) => {
    console.info(chalk.red(err))
    spinner.stop()
  })

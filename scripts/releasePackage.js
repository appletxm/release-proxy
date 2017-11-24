const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const filePath = path.join(__dirname, '../package.json')

const packageFile = {
  updateVersion(version) {
    let promise

    promise = new Promise((resolve) => {
      fs.readFile(filePath, {flag: 'r+', encoding: 'utf8'}, (err, data) => {
        if (err) {
          throw error('There is no package.json file')
        } else {
          this.replaceVersion(version, data).then((res) => {
            console.log(chalk.cyan('Replace version number success.\n'))

            if (res === true) {
              return this.commitChanges(version)
            }
          }).then((ren) => {
            resolve(true)
          })
        }
      })
    })

    return promise
  },

  replaceVersion(version, data) {
    var promise

    if (version) {
      data = data.replace(/"version"\:\s*(.[^,]*)/, '"version": "' + version + '"')
      promise = new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, function (err) {
          if (err) {
            throw error('Replace version number failed for package.json file')
          }else {
            resolve(true)
          }
        })
      })
    }

    return promise
  },

  commitChanges(version) {
    let promise
    let { exec } = require('child_process')

    promise = new Promise((resolve) => {
      exec('git commit -am "update version to ' + version + '"', (error, stdout, stderr) => {
        if (error) {
          throw error('commit package.json file failed')
          return
        }
        // console.log(`stdout: ${stdout}`)
        // console.log(`stderr: ${stderr}`)
        console.log(chalk.cyan('Replace version number success.\n'))

        resolve(true)
      })
    })

    return promise
  }
}

module.exports = packageFile

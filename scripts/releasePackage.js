const path = require('path')
const fs = require('fs')
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
            console.info('======replace version success=====')
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
  }
}

module.exports = packageFile

var packageFile = require('./releasePackage')
var version = process.argv ? (process.argv)[2] : ''

console.info(version)

packageFile.updateVersion(version).then((file) => {
  // console.info('#####', file)
}).catch((err) => {
  console.error(err)
})

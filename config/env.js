const envDev = require('./envDevelopment')
const envProd = require('./envProduction')
const envMock = require('./envMock')
const envTest = require('./envTest')
const envPre = require('./envPre')

module.exports = {
  development: envDev,
  production: envProd,
  test: envTest,
  mock: envMock,
  pre: envPre
}

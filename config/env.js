const envDev = require('./env-development')
const envProd = require('./env-production')
const envMock = require('./env-mock')
const envTest = require('./env-test')
const envPre = require('./env-pre')

// const cndJsFiles = [
//   'assets/js-libs/es6-promise.min.js',
//   'assets/js-libs/polyfill.min.js',
//   'assets/js-libs/vue.min.js',
//   'assets/js-libs/vuex.min.js',
//   'assets/js-libs/vue-router.min.js',
//   'assets/js-libs/moment.min.js',
//   'assets/js-libs/city-data.js',
//   'assets/js-libs/lodash.min.js',
//   'assets/js-libs/element-ui-2.0.8.min.js'
// ]

// envDev.js = envProd.js = envMock.js = envTest.js = envPre.js = cndJsFiles

module.exports = {
  development: envDev,
  production: envProd,
  test: envTest,
  mock: envMock,
  pre: envPre
}

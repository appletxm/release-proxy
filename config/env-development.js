module.exports = {
  host: '127.0.0.1',
  port: 8079,
  api: '', // http://10.60.64.132:8089/
  apiPrefix: '/smartsample',
  get publicPath() {
    return 'http://' + this.host + ':' + this.port + '/dist/'
  },
  proxy: {
    host: '192.168.69.198',
    port: '18080'
  },
  distPath: '../dist/',
  sourcePath: '../src/',
  css: [
    'assets/style/element-ui/index.css'
  ],
  js: [
    'assets/js-libs/es6-promise.min.js',
    'assets/js-libs/polyfill.min.js',
    'assets/js-libs/eventsource.min.js',
    'assets/js-libs/vue.min.js',
    'assets/js-libs/vuex.min.js',
    'assets/js-libs/vue-router.min.js',
    'assets/js-libs/moment.min.js',
    'assets/js-libs/city-data.js',
    'assets/js-libs/lodash.min.js',
    'assets/js-libs/element-ui-2.0.8.min.js'
  ]
}

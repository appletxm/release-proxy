/* global Vue */
import '../css/index.less'
// import Vue from 'vue'
import uiAdapt from 'utils/mobileAdapt'
import axioDecorate from 'common/axioDecorate'
import router from './router'
import store from './store'
import App from './app'

uiAdapt(window, document, 750)
axioDecorate.decorate()

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

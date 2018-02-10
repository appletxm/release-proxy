/* global Vue */
import '../../../css/index.less'
import html from './template.html'
import uiAdapt from 'utils/mobileAdapt'
import axioDecorate from 'common/axioDecorate'
import models from './models'

uiAdapt(window, document, 750)
axioDecorate.decorate()

const loginPage = new Vue({
  template: html,
  data() {
    return {
      password: '',
      mobile: '',
      loadingObj: null,
      msgObj: null
    }
  },
  methods: {
    $doLogin() {
      let result = models.doValidate(this)

      if (result.res === true) {
        this.$showLoading()
        models.doLogin(this)
      } else {
        this.$showMsg('warning', result.msg)
      }
    },

    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },

    $closeMsg() {
      if (this.msgObj) {
        this.msgObj.close()
      }
    },

    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },

    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    }
  },
  components: {},
  created() {},
  mounted() {}
})

loginPage.$mount('#app')

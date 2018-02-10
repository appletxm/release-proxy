/* global Vue */
import '../../../css/index.less'
import html from './template.html'
import uiAdapt from 'utils/mobileAdapt'
import models from './model'
import CountDown from 'components/count-down'
import axioDecorate from 'common/axioDecorate'

uiAdapt(window, document, 750)
axioDecorate.decorate()

const registerPage = new Vue({
  template: html,
  data() {
    return {
      mobile: '',
      verifyCode: '',
      password: '',
      confirmPwd: '',
      realName: '',
      email: '',
      loadingObj: null,
      msgObj: null,
      maxTimeLength: 120
    }
  },
  methods: {
    $doCheckMobile () {
      models.doCheckMobile(this)
    },

    $doRegister() {
      let result = models.doValidate(this)

      if (result.res === true) {
        // this.$showLoading()
        models.doRegister(this)
      } else {
        this.$showMsg('warning', result.msg)
      }
    },
    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },
    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },
    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    },

    $getUniqueId(res) {
      this.uniqueId = res.substr(0,41)
    }
  },
  components: {
    'count-down': CountDown
  },
  created() {},
  mounted() {}
})

registerPage.$mount('#app')

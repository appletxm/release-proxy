/* global Vue */
import '../../../css/index.less'
import html from './template.html'
import uiAdapt from 'utils/mobileAdapt'
import models from './models'
import countDown from 'components/count-down'
import axioDecorate from 'common/axioDecorate'

uiAdapt(window, document, 750)
axioDecorate.decorate()

const resetPassword = new Vue({
  template: html,
  data() {
    return {
      password: '',
      confirmPwd: '',
      mobile: '',
      verifyCode: '',
      maxTimeLength: 120,
      msgObj: null,
      loadingObj: null
    }
  },
  methods: {
    $doGetPassBack() {
      let result = models.doValidate(this)
      if (result.res === true) {
        this.$showLoading()
        models.doGetPassBack(this)
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
    },
    $jumpTo() {
      var t = 2

      // TODO why need this code
      setInterval(function () {
        if (t === 0) {
          window.location.href = '/login.html'
        }
        t--
      }, 1000)
    },

    $getUniqueId(res) {
      this.uniqueId = res.substr(0, 41)
    }
  },
  components: {countDown},
  computed: {},
  created() {},
  mounted() {}
}
)
resetPassword.$mount('#app')

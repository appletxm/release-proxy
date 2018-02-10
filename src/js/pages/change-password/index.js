import html from './template.html'
import models from './models'

export default {
  template: html,
  data() {
    return {
      newPwd: '',
      oldPwd: '',
      confirmPwd: '',
      msgObj: null
    }
  },
  methods: {
    $doChangePass () {
      let result = models.doValidate(this)
      if (result.res === true) {
        models.changePwd(this)
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

    $jumpTo() {
      var t = 1
      setInterval(function() {
        if (t === 0) {
          window.location.reload()
        }
        t--
      },1000)
    }
  }
}

import html from './template.html'
import models from './models'
import ResetPassWord from 'components/resetPassWord'
import UserRegister from 'components/userRegister'
import Dialog from 'components/dialog'

export default {
  template: html,
  data() {
    return {
      userName: '',
      password: '',
      validateCode: '',
      isPopShow: false,
      isShowRigister: false,
      isShowResetPW: false
    }
  },
  props: {
    loginShow: {
      type: Boolean,
      required: true,
      default: false
    },
    needRegister: {
      type: Boolean,
      required: true,
      default: false
    },
    closeCb: {
      type: Function
    },
    loginSuccessCb: {
      type: Function
    }
  },

  computed: {},

  components: {
    'reset-pass-word': ResetPassWord,
    'pop-dialog': Dialog,
    'user-register': UserRegister
  },

  methods: {
    $closePanel() {
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    },

    $doLogin() {
      let validRes = models.doValidate(this)
      if (validRes === true) {
        this.$indicator.open({
          spinnerType: 'fading-circle'
        })

        models.doLogin(this, this.$loginSuccess.bind(this), this.$loginFaild.bind(this))
      }
    },

    $loginSuccess() {
      this.$indicator.close()
      if (this.loginSuccessCb && typeof this.loginSuccessCb === 'function') {
        this.loginSuccessCb()
      }
    },

    $loginFaild() {
      this.$indicator.close()
    },

    $doRegister() {
      this.isPopShow = true
      this.isShowResetPW = false
      this.isShowRigister = true
    },

    $doGetPassBack() {
      this.isPopShow = true
      this.isShowResetPW = true
      this.isShowRigister = false
    },

    getPassSuccessCb() {
      let time,
        pageMethod

      time = 3000
      pageMethod = this.$store.state.loginMethod // 0 page 1 pop dialog
      this.closePopCb()
      this.$toast({
        message: '密码重置成功',
        iconClass: 'fr-iconfont icon-radio-check-s',
        duration: time
      })

      if (pageMethod !== 1) {
        setTimeout(() => {
          window.location.href = '/'
        }, time)
      } else {
        this.$loginSuccess()
      }
    },
    registerSuccessCb() {
      let time = 3000
      let pageMethod = this.$store.state.loginMethod // 0 page 1 pop dialog
      this.closePopCb()
      this.$toast({
        message: '注册成功',
        iconClass: 'fr-iconfont icon-radio-check-s',
        duration: time
      })
      if (pageMethod !== 1) {
        setTimeout(() => {
          window.location.href = '/'
        }, time)
      } else {
        this.$loginSuccess()
      }
    },
    closePopCb() {
      this.isPopShow = false
      this.isShowResetPW = false
      this.isShowRigister = false
    }
  }
}

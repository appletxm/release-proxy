import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'
import loginModels from 'components/userLogin/models'
import { SET_RESET_PASS_TOKEN } from 'store/mutationTypes'
import auth from 'common/auth'

export default {
  doValidate(_this) {
    let msg,
      res

    res = true

    if (formValidate.phone(_this.userName) === false) {
      msg = '请输入正确的手机号'
      res = false
    } else if (formValidate.password(_this.password, 6, 16) === false) {
      msg = '请输入您的密码'
      res = false
    } else if (formValidate.validateCode(_this.validateCode, 4, 8) === false) {
      msg = '请输入验证码'
      res = false
    }

    if (res === false) {
      _this.$toast({
        message: msg,
        duration: 3000,
        className: 'mint-toast-width'
      })
    }

    return res
  },

  doCheckCode(_this, successCb, failedCb) {
    axios.post(apiUrls.resetPassCheckCode + _this.userName, {
      captcha: _this.validateCode
    }).then((res) => {
      _this.$store.commit(SET_RESET_PASS_TOKEN, (res.data)[1]['loginToken'])
      return this.doGetPassBack(_this)
    }).then((res) => {
      loginModels.doLogin(_this, successCb, failedCb)
    }).catch((error) => {
      this.hanldError(_this, error)
    })
  },

  hanldError(_this, error, failedCb) {
    console.error(error)
    let indicator = _this.$indicator || this.$indicator
    indicator.close()
    this.showMsg(_this, JSON.stringify(error), 'fr-iconfont icon-info', 'mint-toast-width')
    if (failedCb && typeof failedCb === 'function') {
      failedCb()
    }
  },

  doGetPassBack(_this) {
    let params,
      loginToken

    loginToken = _this.$store.state.resetPassToken || auth.getTokenFromCookie()

    // TODO need uptimize
    axios.defaults.headers.loginToken = loginToken
    auth.setTokenToCookie(loginToken)

    params = {
      newPassword: _this.password,
      encrypt: false
    }

    return axios.post(apiUrls.resetPassword + _this.userName, params)
  },

  showMsg(_this, msg, icon, css) {
    let toast = _this.$toast || this.$toast

    toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  }
}

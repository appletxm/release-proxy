import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'
import loginModels from 'components/userLogin/models'

export default {
  doValidate(_this) {
    let msg,
      res

    res = true

    if (formValidate.phone(_this.userName) === false) {
      msg = '请输入正确的手机号'
      res = false
    } else if (formValidate.password(_this.password, 6, 15) === false) {
      msg = '请输入正确的密码'
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
    axios.post(apiUrls.checkCode + _this.userName, {
      captcha: _this.validateCode
    }).then((res) => {
      if (res.data[0]['userExisted'] === true) {
        this.registerFailed(_this, '该手机号已经被注册')
        if (failedCb && typeof failedCb === 'function') {
          failedCb(res)
        }
        return failedCb()
      }
      if (successCb && typeof successCb === 'function') {
        successCb(res)
      }
    }, (error) => {
      this.registerFailed(_this, error)
    }).catch((error) => {
      this.registerFailed(_this, error)
    })
  },

  doRegister(_this, successCb, failedCb) {
    let params

    params = {
      phone: _this.userName,
      userPwd: _this.password,
      encrypt: false,
      userSrc: 1
    }

    axios.post(apiUrls.userRegister, params).then((res) => {
      loginModels.doLogin(_this, successCb, failedCb)
    }, (error) => {
      this.registerFailed(_this, error, failedCb)
    }).catch((error) => {
      this.registerFailed(_this, error, failedCb)
    })
  },

  registerFailed(_this, error, failedCb) {
    console.error(error)
    let msg = typeof error === 'string' ? error : error.message

    _this.$indicator.close()

    this.showMsg(_this, msg, 'fr-iconfont icon-info', 'mint-toast-width')
    if (failedCb && typeof failedCb === 'function') {
      failedCb()
    }
  },

  showMsg(_this, msg, icon, css) {
    _this.$toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  }
}

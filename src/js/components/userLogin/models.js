import axios from 'axios'
import apiUrls from 'common/apiUrls'
import auth from 'common/auth'
import { storage } from 'common/storage'
import { SET_USER_INFO, SET_USER_LOGIN_STATUS } from 'store/mutation-types'
import formValidate from 'utils/formValidate'
import axioDecorate from 'common/axioDecorate'

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

  doLogin(_this, successCb, failedCb) {
    let params

    params = {
      userAccount: _this.userName,
      userPassword: _this.password,
      encrypt: false,
      userSrc: 1
    }

    axios.post(apiUrls.userLogin, params).then((res) => {
      let loginToken

      this.saveUserInfoToStore(_this, res.data)

      // TODO need uptimize
      loginToken = (res.data)[1]['loginToken']
      auth.setTokenToCookie(loginToken)
      axios.defaults.headers.loginToken = loginToken

      if (successCb && typeof successCb === 'function') {
        successCb()
      }
    }, (error) => {
      this.loginFailed(_this, error, failedCb)
    }).catch((error) => {
      this.loginFailed(_this, error, failedCb)
    })
  },

  loginFailed(_this, error, failedCb) {
    console.error(error)
    this.showMsg(_this, error.message || error, 'fr-iconfont icon-info', 'mint-toast-width')
    if (failedCb && typeof failedCb === 'function') {
      failedCb()
    }
  },

  saveUserInfoToStore(_this, res) {
    let newUserInfo

    newUserInfo = {
      id: res[0].id,
      userId: res[0].phone,
      name: _this.userName,
      phone: res[0].phone,
      openId: res[0].openId,
      unionId: res[0].unionId,
      userPwd: res[0].userPwd,
      loginToken: res[1].loginToken
    }

    _this.$store.commit(SET_USER_INFO, newUserInfo)
    _this.$store.commit(SET_USER_LOGIN_STATUS, true)
    auth.setTokenToCookie(res[1].loginToken)
    storage.setUserInfoToStorage(newUserInfo)
    axioDecorate.setHttpHeaderCookie()
  },

  showMsg(_this, msg, icon, css) {
    _this.$toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  },

  getListSonArea(areaCode) {}
}

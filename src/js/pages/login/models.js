import formValidate from 'utils/formValidate'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import auth from 'common/auth'
import { storage } from 'common/storage'
import Base64 from 'utils/base64'

const dtUrl = '/#/introduction'

export default {
  doLogin(_this) {
    let params

    params = {
      userCode: _this.mobile,
      userPassword: Base64.encode(_this.password)
    }

    axios.post(apiUrls.userLogin, params)
      .then((res) => {
        this.loginSuccessCb(_this, res)
        return axios.post(apiUrls.getCurrentUserInfo)
      })
      .then((res) => {
        this.getCurrentUserInfoSuccessCb(res)
        return axios.post(apiUrls.getTicket)
      })
      .then((res) => {
        this.getTicketSuccessCb(_this, res)
      })
      .catch((error) => {
        console.error(error)
        _this.$closeLoading()
        _this.$showMsg('warning', error.detailMessage || error.message || '登录失败')
      })
  },

  doValidate(_this) {
    let result = {
      res: true,
      msg: ''
    }

    if (!formValidate.phone(_this.mobile)) {
      result.res = false
      result.msg = '请输入正确的手机号码'

      return result
    }

    if (!formValidate.password(_this.password)) {
      result.res = false
      result.msg = '请输入正确的登录密码'

      return result
    }

    return result
  },

  loginSuccessCb(_this, res) {
    let lgoinToken = res.data
    auth.setTokenToCookie(lgoinToken)
    axios.defaults.headers.loginToken = res.data
  },

  getCurrentUserInfoSuccessCb(res) {
    let userInfo = res.data
    storage.setUserInfoToStorage(userInfo)
  },

  getTicketSuccessCb(_this, res) {
    let ticket = res.data

    _this.$closeLoading()
    window.location.href = dtUrl + '?access_code=' + ticket
  }
}

import formValidate from 'utils/formValidate'
import axios from 'axios'
import apiUrls from 'common/apiUrls'

export default {
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
    if (!formValidate.validateCode(_this.verifyCode,4,8)) {
      result.res = false
      result.msg = '请输入验证码'

      return result
    }
    if (!formValidate.password(_this.password,6,15)) {
      result.res = false
      result.msg = '请输入正确的密码（密码为6到15位）'

      return result
    }
    if (_this.confirmPwd !== _this.password) {
      result.res = false
      result.msg = '两次密码输入不一致'

      return result
    }
    return result
  },

  doGetPassBack(_this) {
    let params
    params = {
      mobile: _this.mobile,
      verifyCode: _this.verifyCode,
      password: _this.password,
      confirmPassword: _this.confirmPwd,
      uniqueId: _this.uniqueId
    }

    axios.post(apiUrls.resetPassword, params)
      .then((res) => {
        _this.$closeLoading()
        _this.$showMsg('success','重置密码成功，请等待跳转至登陆页面')
        _this.$jumpTo()
      })
      .catch((error) => {
        _this.$closeLoading()
        _this.$showMsg('warning',error.message)
        console.log(error)
      })
  }
}

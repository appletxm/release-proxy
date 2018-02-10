import formValidate from 'utils/formValidate'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import loginModels from 'pages/login/models'
import Base64 from 'utils/base64'

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

    if (!formValidate.validateCode(_this.verifyCode, 4, 6)) {
      result.res = false
      result.msg = '请输入正确的验证码'
      return result
    }

    if (!formValidate.password(_this.password)) {
      result.res = false
      result.msg = '请输入正确的密码'
      return result
    }

    if (_this.password !== _this.confirmPwd) {
      result.res = false
      result.msg = '两次输入的密码不一致'
      return result
    }

    if (!formValidate.normal(_this.realName, 2, 17)) {
      result.res = false
      result.msg = '请输入正确的姓名'
      return result
    }

    if (!formValidate.email(_this.email)) {
      result.res = false
      result.msg = '请输入正确的电子邮箱'
      return result
    }

    return result
  },

  doCheckMobile(_this) {
    let params
    params = {
      mobile: _this.mobile
    }
    axios.post(apiUrls.checkMobileExist, params)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        if (error.code === 'REGISTER_MOBILE_EXIST') {
          _this.$showMsg('warning', error.message)
        }
        console.log(error)
      })
  },

  doRegister(_this) {
    let params
    params = {
      avatarUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3448862866,2289363549&fm=27&gp=0.jpg',
      mobile: _this.mobile,
      verifyCode: _this.verifyCode,
      password: Base64.encode(_this.password),
      confirmPassword: Base64.encode(_this.confirmPwd),
      realName: _this.realName,
      email: _this.email,
      uniqueId: _this.uniqueId
    }

    axios.post(apiUrls.userRegister, params)
      .then((res) => {
        loginModels.doLogin(_this)
      })
      .catch((error) => {
        console.error(error)
        _this.$showMsg('warning', error === 'string' ? error : error.message)
      })
  }
}

import formValidate from 'utils/formValidate'
import {storage} from 'common/storage'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import Base64 from 'utils/base64'

export default {
  doValidate (_this) {
    let result = {
      res: true,
      msg: ''
    }
    if (_this.oldPWd === '') {
      result.res = false
      result.msg = '请输入原密码'

      return result
    }

    if (!formValidate.password(_this.newPwd,6,15)) {
      result.res = false
      result.msg = '请输入正确的新密码（密码为6到15位）'

      return result
    }

    if (_this.confirmPwd !== _this.newPwd) {
      result.res = false
      result.msg = '两次输入的密码不一致'

      return result
    }

    return result
  },

  changePwd (_this) {
    let params,
      mobile
    mobile = storage.getUserInfoFromStorage().mobile

    params = {
      mobile: mobile,
      oldPassword: Base64.encode(_this.oldPwd),
      password: _this.newPwd,
      confirmPassword: _this.confirmPwd
    }
    axios.post(apiUrls.changePassword ,params)
      .then((res) => {
        console.log(res)
        _this.$showMsg('success','修改密码成功')
        _this.$jumpTo()
      })
      .catch((error) => {
        _this.$showMsg('warning',error.detailMessage || error.message || '修改密码失败')
        console.log(error)
      })
  }
}

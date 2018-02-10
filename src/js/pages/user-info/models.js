import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'

export default {
  doValidate(_this) {
    let result = {
      res: true,
      msg: ''
    }

    if (!formValidate.email(_this.email)) {
      result.res = false
      result.msg = '请输入正确的电子邮箱'
      return result
    }

    if (!formValidate.normal(_this.realName, 2, 17)) {
      result.res = false
      result.msg = '请输入正确的姓名'
      return result
    }

    return result
  },
  getUserInfo(_this) {
    axios.post(apiUrls.getCurrentUserInfo).then((res) => {
      this.setUserInfo(_this, res.data)
    }).catch((error) => {
      // _this.$showMsg('warning', error === 'string' ? error : error.message)
      console.log(error)
    })
  },
  setUserInfo(_this, _res) {
    _this.phone = _res.mobile
    _this.email = _res.email
    _this.realName = _res.realName
    _this.nickName = _res.nickName
    _this.gender = _res.gender
    _this.provinceName = _res.provinceName
    _this.provinceCode = _res.provinceCode
    _this.cityName = _res.cityName
    _this.cityCode = _res.cityCode
    _this.areaName = _res.areaName
    _this.areaCode = _res.areaCode
    _this.address = (_res.provinceName || '') + (!_res.cityName ? '' : ('-' + _res.cityName)) + (!_res.areaName ? '' : ('-' + _res.areaName))
    _this.addressDetail = _res.address
    _this.invoiceTitle = _res.invoiceTitle
    _this.avatarUrl = _res.avatarUrl
  },
  doSubmit(_this) {
    let params

    params = {
      avatarUrl: _this.avatarUrl,
      email: _this.email,
      realName: _this.realName,
      nickName: _this.nickName,
      gender: _this.gender,
      provinceCode: _this.provinceCode,
      cityCode: _this.cityCode,
      areaCode: _this.areaCode,
      address: _this.addressDetail,
      invoiceTitle: _this.invoiceTitle
    }

    axios.post(apiUrls.saveCurrentUserInfo, params)
      .then((res) => {
        _this.$showMsg('warning', '修改成功')
        _this.$closeLoading()
      })
      .catch((error) => {
        console.error(error)
        _this.$showMsg('warning', error === 'string' ? error : error.message)
        _this.$closeLoading()
      })
  },
  setCurProvince(_this, name, code) {
    _this.provinceName = name
    _this.provinceCode = code
    _this.address = name
    this.setCurCity(_this, '', '')
  },
  setCurCity(_this, name, code) {
    _this.cityName = name
    _this.cityCode = code
    if (name !== '') {
      _this.address = _this.provinceName + '-' + name
    }
    this.setCurArea(_this, '', '')
  },
  setCurArea(_this, name, code) {
    _this.areaName = name
    _this.areaCode = code
    if (name !== '') {
      _this.address = _this.provinceName + '-' + _this.cityName + '-' + name
    }
  }
}

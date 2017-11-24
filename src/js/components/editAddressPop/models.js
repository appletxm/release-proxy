import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'
import storage from 'common/storage'

export default {
  doValidate(_this) {
    let msg,
      res,
      strPre

    res = true
    strPre = _this.addressType === 2 ? '收件人' : '寄件人'
    if (formValidate.normal(_this.name, 2, 8) === false) {
      msg = '请输入正确的' + strPre + '姓名'
      res = false
    } else if (formValidate.phone(_this.phone) === false) {
      msg = '请输入正确的' + strPre + '联系电话'
      res = false
    } else if (!_this.province || !_this.city || !_this.district) {
      msg = '请输入正确省、市、区'
      res = false
    } else if (formValidate.text(_this.address || '', 2, 50) === false) {
      msg = '请输入正确的' + strPre + '详细地址'
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

  renderAddress(_this, item) {
    _this.addressId = item.id
    _this.name = item.name
    _this.phone = item.phone
    _this.address = item.address
    _this.defaultFlag = item.defaultFlag || 0
    _this.areaCode = item.areaCode

    if (_this.addressType === 1) {
      _this.province = '广东省'
      _this.city = '广州市'
      _this.district = '花都区'
    } else {
      _this.province = item.province
      _this.city = item.city
      _this.district = item.district
    }
  },

  saveAddress(_this) {
    let params,
      url

    params = {
      userId: this.getUserId(_this),
      id: _this.addressId,
      name: _this.name,
      phone: _this.phone,
      province: _this.province,
      city: _this.city,
      district: _this.district,
      address: _this.address,
      areaCode: _this.areaCode,
      addressType: storage.getAddresTypeToStorage('addressType'),
      defaultFlag: _this.defaultFlag
    }

    url = _this.addressId ? apiUrls.modifyAddress : apiUrls.addAddress
    axios.post(url, params).then((res) => {
      _this.$indicator.close()
      _this.$closeEditPage()
      if (res) {
        this.showMsg(_this, '地址保存成功', 'fr-iconfont icon-radio-check-s', '')
        _this.$saveAddressSuccess()
      }
    }).catch((error) => {
      _this.$indicator.close()
      this.saveAddressFailed(_this, error)
    })
  },

  saveAddressFailed(_this, error) {
    console.error(error)
    this.showMsg(_this, error.message || error, 'fr-iconfont icon-info', 'mint-toast-width')
  },

  showMsg(_this, msg, icon, css) {
    _this.$toast({
      message: msg,
      duration: 3000,
      className: css || '',
      iconClass: icon
    })
  },

  getUserId(_this) {
    let userInfo

    userInfo = storage.getUserInfoFromStorage()
    return _this.$store.state.userInfo.userId || userInfo.userId
  }
}

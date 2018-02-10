import axios from 'axios'
import apiUrls from 'common/apiUrls'
import { SET_USER_DEFAULT_ADDRESS, SET_USER_RECEIVE_DEFAULT_ADDRESS } from 'store/mutation-types'
import formValidate from 'utils/formValidate'

export default {
  isInfoEdit(_this, addressInfo) {
    return _this.name !== addressInfo.name || _this.phone !== addressInfo.phone || _this.province !== addressInfo.province || _this.city !== addressInfo.city || _this.district !== addressInfo.district || _this.address !== addressInfo.address
  },

  getSourceInfo(_this) {
    let addressInfo

    if (_this.addressType === 0) {
      addressInfo = _this.defaultAddress
    } else {
      addressInfo = _this.reviceAddress
    }

    return addressInfo
  },

  setAddressInfo(_this) {
    let addressInfo

    addressInfo = this.getSourceInfo(_this)

    // console.info(_this.addressType, addressInfo)

    _this.name = addressInfo.name
    _this.phone = addressInfo.phone
    _this.province = addressInfo.province
    _this.city = addressInfo.city
    _this.district = addressInfo.district
    _this.address = addressInfo.address
    _this.areaCode = addressInfo.areaCode
    _this.addressId = addressInfo.id || null
  },

  doValidate(_this) {
    let msg,
      res,
      strPre

    res = true
    strPre = _this.addressType === 1 ? '收件人' : '寄件人'

    if (formValidate.normal(_this.name, 2, 8) === false) {
      msg = '请输入正确的' + strPre + '姓名'
      res = false
    } else if (formValidate.phone(_this.phone) === false && formValidate.telephone(_this.phone) === false) {
      msg = '请输入正确的' + strPre + '联系电话'
      res = false
    } else if (!_this.province || !_this.city || !_this.district) {
      msg = '请输入正确省、市、区'
      res = false
    } else if (formValidate.text(_this.address, 2, 50) === false) {
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

  saveAddress(_this) {
    let params,
      url

    params = {
      userId: _this.userInfo.userId,
      id: _this.addressId,
      name: _this.name,
      phone: _this.phone,
      province: _this.province,
      city: _this.city,
      district: _this.district,
      address: _this.address,
      areaCode: _this.areaCode,
      addressType: _this.addressType
    }

    url = _this.addressId ? apiUrls.modifyAddress : apiUrls.addAddress
    axios.post(url, params).then((res) => {
      this.showMsg(_this, '地址保存成功', 'fr-iconfont icon-radio-check-s', '')
      this.saveAddressToStore(_this)
      _this.$closeEditPage()
    }, (error) => {
      this.saveAddressFailed(_this, error)
    }).catch((error) => {
      this.saveAddressFailed(_this, error)
    })
  },

  saveAddressFailed(_this, error) {
    console.error(error)
    this.showMsg(_this, JSON.stringify(error), 'fr-iconfont icon-info', 'mint-toast-width')
  },

  saveAddressToStore(_this) {
    let newDefaultAddress

    newDefaultAddress = {
      id: null,
      name: _this.name,
      phone: _this.phone,
      province: _this.province,
      city: _this.city,
      district: _this.district,
      address: _this.address,
      areaCode: _this.areaCode,
      addressType: _this.addressType
    }

    _this.$store.commit(_this.addressType === 1 ? SET_USER_DEFAULT_ADDRESS : SET_USER_RECEIVE_DEFAULT_ADDRESS, newDefaultAddress)
    _this.$closeEditPage()
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

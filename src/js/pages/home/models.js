/* global moment */
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import { SET_USER_DEFAULT_ADDRESS, SET_LOGIN_METHOD, SET_USER_LOGIN_STATUS } from 'store/mutation-types'
import storage from 'common/storage'
import auth from 'common/auth'

export default {
  setLoginMethod(_this) {
    _this.$store.commit(SET_LOGIN_METHOD, 0)
  },

  getDefaultAddress(_this) {
    let params, defaultAddress

    defaultAddress = storage.getDefaultAddressToStorage()

    params = {
      userId: _this.userInfo ? storage.getUserId(_this.userInfo.name) : '',
      addressType: 1
    }

    axios.post(apiUrls.getDefaultAddress, params)
      .then((res) => {
        _this.$store.commit(SET_USER_DEFAULT_ADDRESS, res.data && res.data.length > 0 ? (res.data)[0] : {})
        if (!defaultAddress && res.data.length !== 0) {
          _this.defaultAddress = (res.data)[0]
          storage.setDefaultAddressToStorage((res.data)[0])
        } else {
          _this.defaultAddress = defaultAddress
        }
      })
      .catch((error) => {
        console.error(error)
        if (error.code === '-1' || error.code === -1) {
          this.doUserLogout(_this)
        }
      })
  },

  getAnnouncement(_this) {
    axios.post(apiUrls.getAnnouncement)
      .then((res) => {
        _this.announcement = res && res.data.length > 0 ? res.data : []
      })
      .catch((error) => {
        console.error(error)
      })
  },

  doValidate(_this) {
    let msg,
      res

    msg = ''
    res = true

    if (!_this.defaultAddress || !_this.defaultAddress.name || !_this.defaultAddress.phone || !_this.defaultAddress.address) {
      msg = '请选择/填写寄件地址'
      res = false
    } else if (!_this.reviceAddress || !_this.reviceAddress.name || !_this.reviceAddress.phone || !_this.reviceAddress.address) {
      msg = '请选择/填写收件地址'
      res = false
    } else if (!_this.productWeight || _this.productWeight > 30) {
      msg = '请输入物品重量，且重量不能超过30公斤'
      res = false
    } else if (!_this.productName) {
      msg = '请填写物品名称'
      res = false
    } else if (!_this.estimateMoney || _this.estimateMoney <= 0) {
      msg = '没获取到预估运费'
      res = false
    } else if (!_this.isAgreeed) {
      msg = '请先查看并同意我们的服务协议'
      res = false
    }

    if (res === false) {
      this.showTipMsgBig(_this, msg, '', 'mint-toast-width', 1500)
    } else {
      _this.productName = _this.productName.replace(/^\s|\s$/g, '')
    }

    return res
  },

  getEstimateMoney(_this) {
    let prams
    prams = {
      receiverProvince: _this.reviceAddress ? _this.reviceAddress.provinceName : '',
      weight: _this.productWeight
    }

    axios.post(apiUrls.getPriceEstimate, prams).then((res) => {
      _this.estimateMoney = res && res.data.length > 0 ? (res.data)[0]['price'] : 0
    })
      .catch((error) => {
        console.error(error)
        _this.estimateMoney = 0
      })
  },

  doSubmit(_this) {
    let params,
      sendAddress,
      receiveAddress,
      orderTime

    sendAddress = _this.defaultAddress
    receiveAddress = _this.reviceAddress
    orderTime = ''
    orderTime = moment((new Date()).getTime()).format('YYYY-MM-DD HH:mm:ss')

    params = {
      senderName: sendAddress.name,
      senderPhone: sendAddress.phone,
      senderProvince: sendAddress.provinceName,
      senderCity: sendAddress.cityName,
      senderDistrict: sendAddress.areaName,
      senderAddress: sendAddress.address,
      senderAreaCode: sendAddress.areaCode,

      receiverName: receiveAddress.name,
      receiverPhone: receiveAddress.phone,
      receiverProvince: receiveAddress.provinceName,
      receiverCity: receiveAddress.cityName,
      receiverDistrict: receiveAddress.areaName,
      receiverAddress: receiveAddress.address,
      receiverAreaCode: receiveAddress.areaCode,

      goodsName: _this.productName,
      estimateWeight: _this.productWeight,
      estimatePrice: _this.estimateMoney,
      userRemark: _this.remark,
      orderTime: orderTime,
      userId: storage.getUserId()
    }

    axios.post(apiUrls.commitOrder, params)
      .then((res) => {
        let msg = '提交订单成功！运单编号：' + `${(res.data)[0]['expressId']}` + '，已短信发送，请注意包装完好，我们将尽快上门为您服务'
        _this.$indicator.close()
        this.showTipMsgBig(_this, msg, 'fr-iconfont icon-radio-check', 'mint-toast-big-left', 5000)
        this.resetState(_this)
      })
      .catch((error) => {
        console.error(error)
        _this.$indicator.close()
        this.showTipMsgBig(_this, error.message || error, 'fr-iconfont icon-info')
      })
  },

  showTipMsgBig(_this, msg, icon, className, duration) {
    let toastPanel = document.querySelector('.mint-toast')

    if (toastPanel) {
      document.querySelector('body').removeChild(toastPanel)
    }

    _this.$toast({
      message: msg,
      iconClass: icon,
      className: 'mint-toast-big ' + className,
      duration: duration || 3000
    })
  },

  resetState(_this) {
    _this.estimateMoney = 0
    _this.productName = ''
    _this.productWeight = null
    _this.remark = ''
    storage.setDefaultAddressToStorage(null)
    _this.defaultAddress = null
    this.getDefaultAddress(_this)
    storage.setReceiveAddressToStorage(null)
    _this.reviceAddress = null
  },

  setAddressType(_type) {
    // _this.$store.commit(SET_ADDRESS_TYPE, _type)
    storage.setAddresTypeToStorage(_type)
    storage.setNeedAddressTabFlag(0)
  },

  validateWeight(_this) {
    let res, msg

    res = true

    if (!_this.productWeight || _this.productWeight <= 0 || _this.productWeight > 30) {
      res = false
      msg = '请将物品重量控制在30公斤以内'
    } else if (!((/^\d+(\.\d{1})?$/).test(_this.productWeight))) {
      res = true
      msg = '请确认物品重量填是否有误，物品重量控制在30公斤以内，并且重量只能精确到小数点后一位'
      _this.productWeight = parseInt(_this.productWeight * 10) / 10
    }

    if (res === false) {
      this.showTipMsgBig(_this, msg, '', 'mint-toast-big', 1500)
    }
    return res
  },

  calculateMoney(_this) {
    const prodDetailObj = storage.get('prodDetailObj')

    if (prodDetailObj) {
      _this.productWeight = prodDetailObj.productWeight || null
      _this.productName = prodDetailObj.productName || ''
      _this.remark = prodDetailObj.remark || ''

      _this.productWeight = parseFloat(_this.productWeight)

      if (_this.productWeight && _this.productWeight > 0) {
        _this.$getEstimateMoney()
      }
    }
  },

  doUserLogout(_this) {
    storage.loginOutRemoveAll()
    auth.removeAllCookie()
    _this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
  }
}

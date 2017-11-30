import axios from 'axios'
import apiUrls from 'common/apiUrls'
import { SET_LOGIN_METHOD } from 'store/mutationTypes'
import storage from 'common/storage'

export default {
  setLoginMethod(_this) {
    _this.$store.commit(SET_LOGIN_METHOD, 0)
  },

  getUserAddress(_this, addressType) {
    let params

    _this.$indicator.open({
      spinnerType: 'fading-circle'
    })
    _this.addressList = [{address: '', addressType: '', city: '', defaultFlag: '', district: '', id: '', name: '', phone: '', province: '', userId: ''}]

    params = {
      userId: this.getUserId(_this),
      addressType: addressType
    }

    axios.post(apiUrls.getUserAddress, params)
      .then((res) => {
        _this.addressList = (res.data)[0]
        _this.odlDefaultAddress = _this.addressList.filter((item) => {
          return item.defaultFlag === 1
        })[0]
        _this.$indicator.close()
        _this.isLoaded = true
      })
      .catch((error) => {
        _this.isLoaded = true
        console.error(error)
        _this.$indicator.close()
      })
  },

  setDefaultAddress(_this, item) {
    let params

    _this.$indicator.open({
      spinnerType: 'fading-circle'
    })

    params = JSON.parse(JSON.stringify(item))
    params.userId = this.getUserId(_this)
    params.defaultFlag = 1

    axios.post(apiUrls.setDefaultAddress, params)
      .then((res) => {
        item.defaultFlag = 1
        if (_this.odlDefaultAddress) {
          return this.cancelDefaultAddress(_this)
        }
        this.saveAddressToStore(_this, res)
      })
      .then((res) => {
        if (_this.odlDefaultAddress) {
          _this.odlDefaultAddress.defaultFlag = 0
        }
        _this.odlDefaultAddress = item
        _this.$indicator.close()
      // this.getUserAddress(_this, _this.addressType)
      })
      .catch((error) => {
        _this.$indicator.close()
        this.showTipMsgBig(_this, (error.message || error.detailMessage) || '设置默认地址出错')
        console.error(error)
      })
  },

  cancelDefaultAddress(_this) {
    let params

    params = JSON.parse(JSON.stringify(_this.odlDefaultAddress))
    params.userId = this.getUserId(_this)
    params.defaultFlag = 0

    return axios.post(apiUrls.setDefaultAddress, params)
  },

  saveAddressToStore(_this, res) {
    let newDefaultAddress

    newDefaultAddress = res.data[0]
    newDefaultAddress.userId = newDefaultAddress.id
    storage.setDefaultAddressToStorage(newDefaultAddress)
  },

  saveChooseAddToStore(_this, item) {
    let selectedAddress

    selectedAddress = {
      id: item.id,
      name: item.name,
      phone: item.phone,
      province: item.province,
      city: item.city,
      district: item.district,
      address: item.address,
      areaCode: item.areaCode,
      addressType: item.addressType
    }

    storage.setAddresTypeToStorage(item.addressType)

    if (item.addressType === 1) {
      storage.setDefaultAddressToStorage(selectedAddress)
    } else if (item.addressType === 2) {
      storage.setReceiveAddressToStorage(selectedAddress)
    }
    _this.$router.push({path: '/'})
  },

  doDeleteAddress(_this, item) {
    let params

    params = {
      id: item.id
    }

    _this.$indicator.open({
      spinnerType: 'fading-circle'
    })

    axios.post(apiUrls.deleteAddress, params)
      .then((res) => {
        this.updateStorageAfterEditAddress(_this, item, true)
        this.getUserAddress(_this, _this.addressType)
      })
      .catch((error) => {
        console.error(error)
        _this.$indicator.close()
        this.showTipMsgBig(_this, error.message || error, 'fr-iconfont icon-info')
      })
  },

  showTipMsgBig(_this, msg, icon) {
    _this.$toast({
      message: msg,
      iconClass: icon,
      className: 'mint-toast-big',
      duration: 5000
    })
  },

  getUserId(_this) {
    return storage.getUserId(_this.$store.state.userInfo.name)
  },

  setAddressType(_type) {
    storage.setAddresTypeToStorage(_type)
  },

  getAddressType(_this) {
    if (_this.needTabFlag === 1) {
      return 1
    } else {
      return storage.getAddresTypeToStorage()
    }
  },

  getNeedTabFlag() {
    return storage.getNeedAddressTabFlag()
  },

  updateStorageAfterEditAddress(_this, item, isDelete) {
    let defaultAddress = storage.getDefaultAddressToStorage()
    let receiveDefaultAddress = storage.getReceiveAddressToStorage()
    let addressType = this.getAddressType(_this)

    if (addressType === 1 && defaultAddress && defaultAddress.id === item.id) {
      storage.setDefaultAddressToStorage(isDelete ? null : item)
    }
    if (addressType === 2 && receiveDefaultAddress && receiveDefaultAddress.id === item.id) {
      storage.setReceiveAddressToStorage(isDelete ? null : item)
    }
  }
}

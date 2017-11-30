/* global localStorage */
const FR_EXPRESS_USER_INFO = 'fr_express_user_info'
const DEFAULT_ADDRESS = 'defaultAddress'
const RECEIVE_ADDRESS = 'receiveAddress'
const ADDRESS_TYPE = 'address_type'
const ADDRESS_PAGE_NEED_TAB = 'address_type_need_tab'

export default {
  setUserInfoToStorage(value) {
    localStorage.setItem(FR_EXPRESS_USER_INFO, encodeURIComponent(JSON.stringify(value)))
  },

  getUserInfoFromStorage() {
    return JSON.parse(decodeURIComponent(localStorage.getItem(FR_EXPRESS_USER_INFO)))
  },

  getUserId(userIdFromStore) {
    let userInfo

    if (!userIdFromStore) {
      userInfo = this.getUserInfoFromStorage()
      if (userInfo) {
        return userInfo.name
      }
    }

    return userIdFromStore
  },

  setAddresTypeToStorage(type) {
    localStorage.setItem(ADDRESS_TYPE, type)
  },

  getAddresTypeToStorage() {
    return parseInt(localStorage.getItem(ADDRESS_TYPE), 10)
  },

  setDefaultAddressToStorage(defaultAddress) {
    localStorage.setItem(DEFAULT_ADDRESS, encodeURIComponent(JSON.stringify(defaultAddress)))
  },

  getDefaultAddressToStorage() {
    return JSON.parse(decodeURIComponent(localStorage.getItem(DEFAULT_ADDRESS)))
  },

  setReceiveAddressToStorage(receiveAddress) {
    localStorage.setItem(RECEIVE_ADDRESS, encodeURIComponent(JSON.stringify(receiveAddress)))
  },

  getReceiveAddressToStorage() {
    return JSON.parse(decodeURIComponent(localStorage.getItem(RECEIVE_ADDRESS)))
  },

  setNeedAddressTabFlag(value) {
    localStorage.setItem(ADDRESS_PAGE_NEED_TAB, value)
  },

  getNeedAddressTabFlag() {
    return parseInt(localStorage.getItem(ADDRESS_PAGE_NEED_TAB), 10)
  },

  loginOutRemoveAll() {
    localStorage.clear()
  },
  get(key) {
    let res = localStorage.getItem(key)
    try {
      return JSON.parse(res)
    } catch (e) {
      return res
    }
  },
  set(key, item) {
    localStorage.setItem(key, item)
  }
}

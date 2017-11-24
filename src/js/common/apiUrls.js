const envCfg = require('env.cfg')
const RF_EXPRESS = envCfg.rfExpressApi + '/rf_express'
const RF_UCENTER = envCfg.rfucenterApi + '/rfucenter'
const RF_KDN = envCfg.rfucenterApi + '/kdn'

export default {
  getDefaultAddress: RF_EXPRESS + '/userAddressDb/getDefaultAddress',
  getAddress: RF_EXPRESS + '/userAddressDb/get',
  getPriceEstimate: RF_EXPRESS + '/order/priceEstimate',
  commitOrder: RF_EXPRESS + '/order/commit',
  getAnnouncement: RF_EXPRESS + '/announcement/get',
  getListSonArea: RF_EXPRESS + '/area/listSonArea',
  addAddress: RF_EXPRESS + '/userAddressDb/add',
  modifyAddress: RF_EXPRESS + '/userAddressDb/modify',
  deleteAddress: RF_EXPRESS + '/userAddressDb/delete',
  userLogin: RF_UCENTER + '/auth/expressLogin',
  userRegister: RF_UCENTER + '/userManage/register/commit1',
  getCode: RF_UCENTER + '/auth/getCaptcha1/',
  checkCode: RF_UCENTER + '/auth/checkCaptcha/',
  resetPassCheckCode: RF_UCENTER + '/auth/checkAccountForChangePwd/',
  resetPassword: RF_UCENTER + '/userManage/resetPassword/',
  getOrderList: RF_EXPRESS + '/userOrders/list',
  getOrderLogisticInfo: RF_KDN + '/Ebusiness/EbusinessOrderHandle.aspx',
  getUserAddress: RF_EXPRESS + '/userAddressDb/get',
  setDefaultAddress: RF_EXPRESS + '/userAddressDb/modify'
}

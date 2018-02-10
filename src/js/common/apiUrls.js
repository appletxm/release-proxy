const envCfg = require('env.cfg')
const API_URL = envCfg.api + envCfg.apiPrefix

export default {
  userLogin: API_URL + '/account/login',
  userRegister: API_URL + '/account/register',
  checkMobileExist: API_URL + '/account/mobileExist',
  getCode: API_URL + '/sms/send',
  checkCaptcha: API_URL + '/account/checkCaptcha/',
  resetPassword: API_URL + '/account/resetPassword',
  changePassword: API_URL + '/account/changePassword',
  getCurrentUserInfo: API_URL + '/user/getCurrentUserInfo',
  saveCurrentUserInfo: API_URL + '/user/saveCurrentUserInfo',
  getUserInfo: API_URL + '/user/getUserInfo',
  userLogOut: API_URL + '/account/logOut',
  uploadImg: API_URL + '/oss/uploadImg',
  getTicket: API_URL + '/account/getTicket',
  listUserInfo: API_URL + '/user/listUserInfo',
  uploadImageTmp: API_URL + '/oss/uploadImgFile',
  getProvince: API_URL + '/area/getProvince'
}

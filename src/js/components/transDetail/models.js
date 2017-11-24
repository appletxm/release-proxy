import Base64 from 'utils/base64'
import * as MD5 from 'utils/md5'
import axios from 'axios'
import QS from 'querystring'
import apiUrls from 'common/apiUrls'
import consts from 'common/consts'

export default {
  getOrderLogisticInfo(packageObj) {
    console.log(packageObj)
    let RequestData = {
      ShipperCode: packageObj.logisticsCompany,
      LogisticCode: packageObj.logisticsCode
    }
    let requestDataStr = encodeURIComponent(JSON.stringify(RequestData))
    let dataSign = JSON.stringify(RequestData) + consts['LOGIC_APPKEY']
    dataSign = encodeURIComponent(Base64.encode(MD5['hex_md5'](dataSign)))
    let params = {
      RequestData: requestDataStr,
      EBusinessID: consts['LOGISTIC_ID'],
      RequestType: '1002',
      DataSign: dataSign,
      DataType: 'json'
    }
    let instance = axios.create({})
    return instance({
      method: 'post',
      baseURL: './',
      url: apiUrls.getOrderLogisticInfo,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
      },
      data: QS.stringify(params)
    })
  }
}

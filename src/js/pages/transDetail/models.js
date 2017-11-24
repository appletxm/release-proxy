import Base64 from 'utils/base64'
import * as MD5 from '../../utils/md5'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import QS from 'querystring'

export default {
  getOrderLogisticInfo(packageObj) {
    let RequestData = {
      OrderCode: packageObj.orderCode,
      ShipperCode: packageObj.logisticsCompany,
      LogisticCode: packageObj.logisticsCode
    }
    let logisticId = 1297366
    let logicAppKey = '37dbbe33-7d99-4ac4-a788-eb4a0736131c'
    let requestDataStr = encodeURIComponent(JSON.stringify(RequestData))
    let dataSign = JSON.stringify(RequestData) + logicAppKey
    dataSign = encodeURIComponent(Base64.encode(MD5['hex_md5'](dataSign)))
    let params = {
      RequestData: requestDataStr,
      EBusinessID: logisticId,
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

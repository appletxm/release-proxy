/* global _ */
import axios from 'axios'
import apiUrls from 'common/apiUrls'
// import _ from 'lodash'

export default {
  getOrderList(option) {
    let params = {
      pageIndex: 1,
      pageSize: 10,
      userId: ''
    }
    params = _.assignIn(params, option)
    return axios.post(apiUrls.getOrderList, params)
  }
}

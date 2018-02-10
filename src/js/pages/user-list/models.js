/* global moment */
import axios from 'axios'
import apiUrls from 'common/apiUrls'

export default {
  listUserInfo(pageSize, pageNum, _this) {
    let params

    params = {pageSize, pageNum}
    _this.$showLoading()

    axios.post(apiUrls.listUserInfo, params).then((res) => {
      this.getUserListSuccessCb(res, pageNum, _this)
      _this.$closeLoading()
    }).catch((err) => {
      _this.$closeLoading()
      _this.$showMsg('error', err.detailMessage || err.message)
    })
  },

  calculatePageInfo(data) {
    let totalPages

    if (!data || !data.list || data.list.length <= 0) {
      totalPages = 0
    } else {
      totalPages = Math.ceil(data.total / data.pageSize)
    }

    return totalPages
  },

  getUserListSuccessCb(res, pageNum, _this) {
    let list = res.data.list || []

    list = this.decorateData(list)
    _this.totalCount = res.data.total

    if (pageNum <= 1) {
      _this.totalPages = this.calculatePageInfo(res.data)
    }

    _this.userList = list
  },

  decorateData(list) {
    list.map((item) => {
      item.registerTimeFormat = moment(item.registerTime).format('YYYY-MM-DD hh:mm:ss')
      item.fullAddress = (item.provinceName || '') + (item.cityName || '') + (item.areaName || '') + (item.address || '')
    })
    return list
  }
}

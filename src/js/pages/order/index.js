import html from './template.html'
import * as uiUtils from 'utils/uiUtils'
import { SET_CURRENT_MODULE } from 'store/mutationTypes'
import models from './models'
import ListLoader from 'components/listLoader'
import UserLogin from 'components/userLogin'
import Dialog from 'components/dialog'
import auth from 'common/auth'
import storage from 'common/storage'
import OrderDetailDialog from 'components/orderDetailDialog'
import consts from 'common/consts'

export default {
  template: html,
  data() {
    return {
      orderList: [],
      curPage: 0,
      totalPage: 1,
      isShowLogin: false,
      isShowDetail: false,
      showDetailData: {},
      isLoading: false
    }
  },
  async created () {
    uiUtils.changeTitle('我的订单')
    this.$store.commit(SET_CURRENT_MODULE, 'MyAll')
  },
  async mounted () {
    if (auth.checkUserLogin() === true) {
      await this.loadOrderList()
    } else {
      this.isShowLogin = true
    }
  },
  methods: {
    orderStatusName (status) {
      // ['无轨迹', '在揽件', '在途中', '签收', '问题件']
      return consts['ORDER_STATUS_DICT'][status]
    },
    openDetail (item) {
      this.isShowDetail = true
      this.showDetailData = item
    },
    closeDetail () {
      this.isShowDetail = false
    },
    async loginSuccessCb () {
      this.isShowLogin = false
      await this.loadOrderList()
    },
    closeLoginCb () {
    },
    async loadOrderList () {
      const userInfo = storage.getUserInfoFromStorage()
      try {
        this.$indicator.open()
        this.isLoading = true
        const res = await models.getOrderList({pageIndex: this.curPage + 1, userId: userInfo.userId})
        this.$indicator.close()
        this.isLoading = false
        this.totalPage = res.data.pages
        this.curPage = res.data.pageNum
        res.data.list.forEach((item) => {
          this.orderList.push(item)
        })
      } catch (e) {
      }
    },
    async loadMore () {
      if (this.curPage < this.totalPage) {
        await this.loadOrderList()
      }
    }
  },
  components: {
    ListLoader,
    'user-login': UserLogin,
    'pop-dialog-login': Dialog,
    OrderDetailDialog
  }
}

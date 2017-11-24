import template from './template.html'
import consts from 'common/consts'

export default {
  template,
  data () {
    return {
      name: '',
      actualWeight: '',
      actualPrice: '',
      userRemark: ''
    }
  },
  props: {
    orderDetail: {
      type: Object,
      required: true
    },
    closeFun: {
      type: Function,
      required: true
    },
    data: {
      type: Object,
      required: true
    }
  },
  mounted () {
    let name = consts['ORDER_STATUS_DICT'][this.data.orderStatus]
    this.name = name
    this.actualPrice = this.data.actualPrice
    this.actualWeight = this.data.actualWeight
    this.userRemark = this.data.userRemark
    // console.log('name', name)
  },
  methods: {
    closeDialog() {
      this.closeFun()
    }
  }

}

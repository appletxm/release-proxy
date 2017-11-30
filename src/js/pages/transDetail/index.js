import template from './template.html'
import TransDetail from 'components/transDetail'
import * as uiUtils from 'utils/uiUtils'

export default {
  template,
  data() {
    return {
      title: "i'm transDetail page",
      expressId: '',
      orderStatus: ''
    }
  },
  async mounted () {
    this.expressId = this.$route.params.transId
    this.orderStatus = this.$route.query.orderStatus
  },
  methods: {
    back () {
      this.$router.back()
    }
  },
  components: {TransDetail},
  created () {
    uiUtils.changeTitle('物流详情')
  }
}

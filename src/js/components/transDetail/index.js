/* global _ */
import template from './template.html'
import models from './models'
import consts from 'common/consts'
// import _ from 'lodash'

export default {
  template,
  props: {
    expressId: {
      type: String,
      required: true
    },
    detailLoadedCb: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      traces: {
        Traces: []
      }
    }
  },
  computed: {
    orderStatusName () {
      // ['无轨迹', '在揽件', '在途中', '签收', '问题件']
      return consts['TRACE_DICT'][this.traces.State]
    },
    trancesSort () {
      return _.reverse(this.traces.Traces)
    },
    senderPhone () {
      let reg = /1\d{10}/g
      let phoneItem = _.find(this.trancesSort, function (o) {
        return o.AcceptStation.match(reg)
      })
      if (phoneItem) {
        return phoneItem.AcceptStation.match(reg)[0]
      }
    },
    senderCom () {
      const comObj = consts['LOGIC_SHIPPER_CODE_COOP']
      return comObj[this.traces.ShipperCode]
    },
    phoneHref () {
      return 'tel:' + this.senderPhone
    }
  },

  watch: {
    async expressId(newValue) {
      console.info('get detail for express id:', newValue)

      this.$indicator.open({
        spinnerType: 'fading-circle'
      })
      const res = await models.getOrderLogisticInfo({logisticsCompany: consts['LOGIC_SHPPER_COM_CODE'][0], logisticsCode: this.expressId})
      // this.traces = res.data.Traces
      this.traces = res.data
      if (this.detailLoadedCb && typeof this.detailLoadedCb === 'function') {
        this.detailLoadedCb(res)
      }
      this.$indicator.close()
    }
  }
}

import html from './template.html'
import * as uiUtils from 'utils/uiUtils'
import { SET_CURRENT_MODULE } from 'store/mutationTypes'
import models from './models'
import TransDetail from 'components/transDetail'

export default {
  template: html,
  data() {
    return {
      expressNo: '',
      expressIdToDetail: '',
      showDetailPanel: false
    }
  },

  components: {
    'trans-detail': TransDetail
  },

  methods: {
    $doSearch() {
      let validRes = models.doValidate(this)
      if (validRes === true) {
        this.expressIdToDetail = this.expressNo
      }
    },

    detailLoadedCb(res) {
      this.showDetailPanel = true
    }
  },

  created() {
    uiUtils.changeTitle('查快递')
    this.$store.commit(SET_CURRENT_MODULE, 'Search')
  }
}

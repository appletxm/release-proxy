import html from './template.html'
import * as uiUtils from 'utils/uiUtils'
import { storage, CURRENT_MENU_ID } from 'common/storage'
import models from './models'

export default {
  template: html,
  props: {},
  computed: {},
  data() {
    return {
      currentMenuId: null,
      breadList: [],
      menuData: null
    }
  },
  methods: {
    $gotoModule(item, event) {
      this.currentSelectedItem = item
      if (uiUtils.checkType.isFunction(this.changeModuleCb) === true) {
        this.changeModuleCb(item)
      }
      event.stopPropagation()
    },

    $renderBread() {
      this.breadList = models.getPath(this.menuData, this.currentMenuId)
    }
  },
  watch: {
    '$store.state.menuData'(value) {
      this.menuData = value
      this.$renderBread()
    },
    '$store.state.currentMenuId'(value) {
      this.currentMenuId = value
      this.$renderBread()
    }
  },
  created() {
    this.menuData = this.$store.state.menuData
    this.currentMenuId = storage.get(CURRENT_MENU_ID)
    this.$renderBread()
  },
  mounted() {}
}

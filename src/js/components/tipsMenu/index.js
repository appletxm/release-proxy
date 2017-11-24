import html from './template.html'
import * as uiUtils from 'utils/uiUtils'

export default {
  template: html,
  props: {
    list: {
      type: Array,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    changeModuleCb: {
      type: Function
    }
  },
  computed: {
    isShow() {
      return this.value
    }
  },
  data() {
    return {
      currentSelectedItem: null
    }
  },
  methods: {
    $gotoModule(item, event) {
      this.currentSelectedItem = item
      if (uiUtils.checkType.isFunction(this.changeModuleCb) === true) {
        this.changeModuleCb(item)
      }
      event.stopPropagation()
    }
  }
}

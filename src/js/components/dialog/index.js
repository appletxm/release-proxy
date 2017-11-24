import html from './template.html'
// import models from './models'

export default {
  template: html,
  data() {
    return {
      userName: null,
      password: '',
      validateCode: ''
    }
  },

  props: {
    isPopShow: {
      type: Boolean,
      required: true,
      default: false
    },
    isNeedFoot: {
      type: Boolean,
      required: true,
      default: true
    },
    closeCb: {
      type: Function
    },
    confirmCb: {
      type: Function
    }
  },

  computed: {},

  components: {},

  methods: {
    $closePop() {
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      } else {
        this.isPopShow = false
      }
    }
  }
}

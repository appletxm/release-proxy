import html from './template.html'

export default {
  template: html,
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    closeCb: {
      type: Function
    }
  },

  data() {
    return {}
  },

  methods: {
    $closePopDark() {
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    }
  },

  mounted() {}
}

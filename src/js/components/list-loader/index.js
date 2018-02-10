import html from './template.html'

export default {
  template: html,
  props: {
    isEmpty: {
      type: Boolean,
      default: true
    },
    isShowLoadMore: {
      type: Boolean,
      default: false
    },
    marginBottom: {
      type: String,
      required: false
    },
    isLoading: {
      type: false,
      default: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.listenBottom()
    },
    getScrollTop() {
      return this.$el.scrollTop
    },
    getScrollHeight() {
      return this.$el.scrollHeight
    },
    getWindowHeight() {
      let windowHeight
      if (window.document.compatMode === 'CSS1Compat') {
        windowHeight = document.documentElement.clientHeight
      } else {
        windowHeight = document.body.clientHeight
      }
      return windowHeight
    },
    listenBottom() {
      this.$el.onscroll = () => {
        if (!this.isLoading) {
          if (this.getScrollTop() + this.getWindowHeight() >= this.getScrollHeight()) {
            this.$emit('loadMore', true)
          }
        }
      }
    }
  }
}

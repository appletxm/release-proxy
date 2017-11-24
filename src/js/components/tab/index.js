import html from './template.html'

export default {
  template: html,
  props: {
    tabData: {
      type: Array,
      default: []
    },
    selectedIndex: {
      type: Number,
      default: 0
    },
    changeTab: {
      type: Function
    }
  },

  data() {
    return {
      currentIndex: 0
    }
  },

  methods: {
    $toggleTab(index) {
      if (index !== this.currentIndex) {
        this.currentIndex = index

        if (this.changeTab && typeof this.changeTab === 'function') {
          this.changeTab(this.tabData[index])
        }
      }
    },

    parentChangeTab(index) {
      this.currentIndex = index || 0
    }
  },

  mounted() {
    this.currentData = this.selectedIndex
  }
}

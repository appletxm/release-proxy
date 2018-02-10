/* global frExpressCityData */
import html from './template.html'
import './style.less'

const province = frExpressCityData.province
const city = frExpressCityData.city
const area = frExpressCityData.area

export default {
  template: html,

  data: function () {
    return {
      show: this.propsShow,
      result: this.propsResult,
      target: '',
      provinceState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      cityState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      areaState: {
        data: null,
        selectedId: null,
        index: 0,
        startPos: null,
        translateY: 0,
        startTranslateY: 0,
        dragging: false
      },
      delta: 0,
      slideEls: null
    }
  },

  mounted: function () {
    this.initData()
    this._onTouchMove = this._onTouchMove.bind(this)
    this._onTouchEnd = this._onTouchEnd.bind(this)
  },

  methods: {
    initData() {
      this.provinceState.data = province
      this.provinceState.selectedId = 110000 // 北京市  省
      this.cityState.selectedId = 110100 // 市辖区  市
      this.areaState.selectedId = 110101 // 东城区  区
      this.filterCity()
      this.filterArea()
    },
    submit() {
      this.result = {
        'province': this.provinceState.data[this.provinceState.index],
        'city': this.cityState.data[this.cityState.index],
        'area': this.areaState.data[this.areaState.index]
      }
      this.show = false

      if (this.confirmCb && typeof this.confirmCb === 'function') {
        this.confirmCb(JSON.parse(JSON.stringify(this.result)))
      }
    },
    filterCity() {
      this.cityState.data = city.filter((item, index) => {
        return item.parentId === this.provinceState.selectedId
      })
      this.cityState.selectedId = this.cityState.data[0] && this.cityState.data[0].code
      this.cityState.translateY = 0
      this.cityState.index = 0
    },
    filterArea() {
      this.areaState.data = area.filter((item, index) => {
        return item.parentId === this.cityState.selectedId
      })
      this.areaState.selectedId = this.areaState.data[0] && this.areaState.data[0].code
      this.areaState.translateY = 0
      this.areaState.index = 0
    },
    getSelectedData(index) {
      let target = this.target
      let thisData = this[target + 'State']
      thisData.selectedId = thisData.data[index].code
      if (target === 'province') {
        this.filterCity()
        this.filterArea()
      }
      if (target === 'city') {
        this.filterArea()
      }
    },
    setPage() {
      let target = this.target
      let thisData = this[target + 'State']
      let clientHeight = this.slideEls[0]['clientHeight']
      let total = thisData.data.length
      let goPage = Math.round((thisData.translateY / clientHeight).toFixed(1))
      if (goPage > 0) {
        goPage = 0
      }
      goPage = total - 1 >= Math.abs(goPage) ? goPage : -(total - 1)
      let index = Math.abs(goPage)
      thisData.index = index
      this.getSelectedData(index)
      thisData.translateY = goPage * clientHeight
    },
    _getTouchPos(e) {
      return e.changedTouches ? e.changedTouches[0]['pageY'] : e['pageY']
    },
    _getElem(e) {
      return Array.from(e.currentTarget.children).slice(3, -3)
    },
    _onTouchStart(target, e) {
      let thisData = this[target + 'State']
      this.target = target
      this.slideEls = this._getElem(e)
      this.delta = 0
      thisData.startPos = this._getTouchPos(e)
      thisData.startTranslateY = thisData.translateY
      thisData.dragging = true
      document.addEventListener('touchmove', this._onTouchMove, false)
      document.addEventListener('touchend', this._onTouchEnd, false)
      document.addEventListener('mousemove', this._onTouchMove, false)
      document.addEventListener('mouseup', this._onTouchEnd, false)
    },
    _onTouchMove(e) {
      let target = this.target
      let thisData = this[target + 'State']
      this.delta = this._getTouchPos(e) - thisData.startPos
      thisData.translateY = thisData.startTranslateY + this.delta
      if (Math.abs(this.delta) > 0) {
        e.preventDefault()
      }
    },
    _onTouchEnd(e) {
      let target = this.target
      let thisData = this[target + 'State']
      thisData.dragging = false
      this.setPage()
      document.removeEventListener('touchmove', this._onTouchMove)
      document.removeEventListener('touchend', this._onTouchEnd)
      document.removeEventListener('mousemove', this._onTouchMove)
      document.removeEventListener('mouseup', this._onTouchEnd)
    },
    _stopDef(e) {
      e.preventDefault()
    },

    _closePanel() {
      this.show = false
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    }
  },
  watch: {
    propsShow: function (newVal) {
      this.show = newVal
    },
    show: function (newVal) {
      this.$emit('result', newVal, this.result)
    }
  },
  props: {
    'propsResult': {
      type: Object,
      default: null
    },
    'propsShow': {
      type: Boolean,
      default: false
    },
    'title': {
      type: String,
      default: '请选择'
    },
    'confirm': {
      type: String,
      default: '确定'
    },
    'cancel': {
      type: String,
      default: '取消'
    },
    'closeCb': {
      type: Function
    },
    'confirmCb': {
      type: Function
    }
  }
}

import html from './template.html'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
let province,
  city,
  area

export default {
  template: html,

  data() {
    return {
      addrObjs: {},
      tabs: [
        {
          type: '省份',
          content: ''
        },
        {
          type: '城市',
          content: ''
        },
        {
          type: '区县',
          content: ''
        }
      ],
      num: 0,
      selectedActive: {
        1: '',
        2: '',
        3: ''
      }
    }
  },
  props: {
    clearContent: Boolean
  },
  mounted() {
    axios.post(apiUrls.getProvince)
      .then((res) => {
        province = res.data
        this.tabs[0].content = res.data
      })
      .catch((error) => {
        console.error(error)
      })
  },

  methods: {
    tabChange(index) {
      this.num = index
    },
    selected(tabContent, index) {
      this.selectedActive[index] = tabContent
    },
    addrSelected(code, name, index,i) {
      if (this.clearContent) {
        this.tabs[2].content = ''
      }
      if (this.num === 0) {
        city = province[i]
        this.num = index + 1
        this.tabs[this.num].content = city.children
        this.tabs[this.num + 1].content = ''
      } else if (this.num === 1) {
        area = city.children[i]
        this.num = index + 1
        this.tabs[this.num].content = area.children
      } else {
        this.$emit('addr-wrap-hide')
      }
      this.$emit('addr-selected', index, name, code)
    }
  }

}

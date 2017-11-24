import html from './template.html'
import axios from 'axios'
import apiUrls from 'common/apiUrls'
import formValidate from 'utils/formValidate'

export default {
  template: html,
  props: {
    maxTime: {
      type: Number,
      default: 120
    },
    phone: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isDisabled: false,
      isGettingCode: false,
      countDownNo: 0,
      timer: 0,
      code: ''
    }
  },

  methods: {
    $getCode() {
      if (this.phone && formValidate.phone(this.phone)) {
        axios.get(apiUrls.getCode + this.phone, {
          params: {
            source: 'fyt_getCaptcha'
          }
        }).then((res) => {
          this.$getCodeSuccess()
        }, (error) => {
          this.$getCodeFailed(error)
        }).catch((error) => {
          this.$getCodeFailed(error)
        })
      } else {
        this.$toast({
          message: '请输入正确的手机号码',
          duration: 3000,
          className: 'mint-toast-width'
        })
      }
    },

    $getCodeSuccess() {
      this.isDisabled = true
      this.countDownNo = this.maxTime
      this.$triggerTime()
      if (this.getCodeCb && typeof this.getCodeCb === 'function') {
        this.getCodeCb(this.code)
      }
    },

    $getCodeFailed(error) {
      this.isDisabled = false
      this.$toast({
        message: error.message || error,
        duration: 3000,
        className: 'mint-toast-width'
      })
    },

    $triggerTime() {
      clearInterval(this.timer)
      this.timer = setInterval(() => {
        if (this.countDownNo <= 1) {
          clearInterval(this.timer)
          this.isDisabled = false
          this.countDownNo = this.maxTime
        } else {
          this.countDownNo--
        }
      }, 1000)
    }
  }
}

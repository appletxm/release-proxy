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
    mobile: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      isDisabled: false,
      countDownNo: 0,
      timer: 0,
      code: ''
    }
  },

  methods: {
    $getCode() {
      if (this.mobile && formValidate.phone(this.mobile)) {
        let parmas
        parmas = {
          mobile: this.mobile
        }
        axios.post(apiUrls.getCode, parmas).then((res) => {
          this.$emit('get-unique-id', res.data)
          this.$getCodeSuccess()
        }, (error) => {
          this.$getCodeFailed(error)
        }).catch((error) => {
          this.$getCodeFailed(error)
        })
      } else {
        this.$showMsg('warning', '请输入正确的手机号码')
      }
    },

    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
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
      this.$showMsg('warning', error.message || error)
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

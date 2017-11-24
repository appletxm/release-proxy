import html from './template.html'
import models from './models'
import CountDown from 'components/countDown'

export default {
  template: html,
  data() {
    return {
      userName: '',
      password: '',
      validateCode: '',
      maxTimeLength: 120
    }
  },

  props: {
    isForgetPassState: {
      type: Boolean,
      required: true,
      default: false
    },
    registerShow: {
      type: Boolean,
      required: true,
      default: false
    },
    closeCb: {
      type: Function
    },
    registerSuccessCb: {
      type: Function
    },
    getPassSuccessCb: {
      type: Function
    }
  },

  computed: {},

  components: {
    'count-down': CountDown
  },

  methods: {
    $closePanel() {
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    },

    $doRegister() {
      let validRes = models.doValidate(this)
      if (validRes === true) {
        this.$indicator.open({
          spinnerType: 'fading-circle'
        })

        models.doCheckCode(this, (res) => {
          models.doRegister(this, this.$registerSuccess.bind(this), this.$registerFaild.bind(this))
        }, this.$registerFaild.bind(this))
      }
    },

    $registerSuccess() {
      this.$indicator.close()
      if (this.registerSuccessCb && typeof this.registerSuccessCb === 'function') {
        this.registerSuccessCb()
      }
    },

    $registerFaild() {
      this.$indicator.close()
    }
  }
}

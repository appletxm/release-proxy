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
    isShow: {
      type: Boolean,
      required: true,
      default: false
    },
    closeCb: {
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

    $doGetPassBack() {
      let validRes = models.doValidate(this)
      if (validRes === true) {
        this.$indicator.open({
          spinnerType: 'fading-circle'
        })
        models.doCheckCode(this, this.$doGetPassBackSucess.bind(this), this.$doGetPassBackFailed.bind(this))
      }
    },

    $doGetPassBackSucess() {
      this.$indicator.close()
      if (this.getPassSuccessCb && typeof this.getPassSuccessCb === 'function') {
        this.getPassSuccessCb()
      }
    },

    $doGetPassBackFailed() {
      this.$indicator.close()
    }
  }
}

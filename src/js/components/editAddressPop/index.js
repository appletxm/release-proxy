import html from './template.html'
import models from './models'
import { checkType } from 'utils/uiUtils'
import AreaPicker from 'components/areaPicker'
// import { SET_SHOW_NAVIGATOR } from 'store/mutationTypes'

export default {
  template: html,
  data() {
    return {
      addressId: null,
      name: '',
      phone: '',
      province: '',
      city: '',
      district: '',
      address: '',
      areaCode: '',
      defaultFlag: 0,
      propsShow: false,
      propsResult: {}
    }
  },

  props: {
    addressData: {
      type: Object,
      required: true,
      default: {}
    },
    addressType: {
      type: Number,
      required: true,
      default: null
    },
    saveSuccessCb: {
      type: Function
    },
    closeCb: {
      type: Function
    }
  },
  computed: {
  },

  components: {
    'area-picker': AreaPicker
  },

  methods: {
    $closeEditPage() {
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    },

    $saveAddress() {
      let validRes

      validRes = models.doValidate(this)

      if (validRes === true) {
        this.$indicator.open({
          spinnerType: 'fading-circle'
        })
        models.saveAddress(this)
      }
    },

    $openAddressPanel() {
      this.propsShow = true
    // this.$store.commit(SET_SHOW_NAVIGATOR, false)
    },

    closeChooseArea() {
      this.propsShow = false
    // this.$store.commit(SET_SHOW_NAVIGATOR, true)
    },

    chooseArea(result) {
      if (this.addressType === 1 && String(result.area.code) !== '440114') {
        this.$toast({
          message: '抱歉，目前寄件地址只支持广东省广州市花都区',
          duration: 3000,
          className: 'mint-toast-width'
        })
        this.propsShow = false
      } else {
        this.propsShow = false
        this.propsResult = result

        this.province = result.province.name
        this.city = result.city.name
        this.district = result.area.name
        this.areaCode = result.area.code
      }
    },

    closeLoginCb() {
      this.isPopShow = false
    },

    $saveAddressSuccess(item) {
      this.isPopShow = false
      if (checkType.isFunction(this.saveSuccessCb) === true) {
        this.saveSuccessCb(true, item)
      }
    }
  },

  watch: {
    addressData(newValue) {
      models.renderAddress(this, newValue)
    }
  }
}

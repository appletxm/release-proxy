import html from './template.html'
import models from './models'
import auth from 'common/auth'
import storage from 'common/storage'
import AreaPicker from 'components/areaPicker'
import UserLogin from 'components/userLogin'
import Dialog from 'components/dialog'

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
      isChecked: false,
      propsShow: false,
      propsResult: {},
      isPopShow: false,
      popType: 1
    }
  },

  props: {
    showEdit: {
      type: Boolean,
      required: true,
      default: false
    },
    addressType: {
      type: Number,
      required: true,
      default: null
    },
    closeCb: {
      type: Function
    },
    setSuccessCb: {
      type: Function
    }
  },
  computed: {
    'defaultAddress'() {
      return storage.getDefaultAddressToStorage()
    },
    'reviceAddress'() {
      return storage.getReceiveAddressToStorage()
    },
    'userInfo'() {
      return storage.getUserInfoFromStorage()
    },
    'isInfoEdit'() {
      let addressInfo

      addressInfo = models.getSourceInfo(this)
      return models.isInfoEdit(this, addressInfo)
    }
  },

  components: {
    'area-picker': AreaPicker,
    'user-login': UserLogin,
    'pop-dialog-login': Dialog
  },

  methods: {
    $closeEditPage() {
      this.name = ''
      this.phone = ''
      this.province = ''
      this.city = ''
      this.district = ''
      this.address = ''
      if (this.closeCb && typeof this.closeCb === 'function') {
        this.closeCb()
      }
    },

    $gotoAddressList() {
      this.$closeEditPage()
      this.$router.push({path: '/address'})
    },

    $saveAddress() {
      let validRes

      validRes = models.doValidate(this)
      if (validRes === true) {
        if (this.isChecked === true) {
          if (auth.checkUserLogin() === true) {
            this.$indicator.open({
              text: '数据保存中...',
              spinnerType: 'fading-circle'
            })
            models.saveAddress(this)
          } else {
            console.info('pop user login box')
            models.openLoginPanel(this)
          }
        } else {
          models.saveAddressToStore(this)
        }
      }
    },

    $toggleChecked() {
      this.isChecked = !this.isChecked
    },

    $openAddressPanel() {
      this.propsShow = true
    },

    closeChooseArea() {
      this.propsShow = false
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

    loginSuccessCb() {
      this.isPopShow = false
      this.$saveAddress()
    }
  },

  watch: {
    'showEdit': {
      handler(value) {
        if (value === true) {
          models.setAddressInfo(this)
        }
      },
      deep: true
    }
  }
}

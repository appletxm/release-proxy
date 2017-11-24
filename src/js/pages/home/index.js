import html from './template.html'
import protocolHtml from './protocol.html'
import dangerListHtml from './dangerList.html'
import * as uiUtils from 'utils/uiUtils'
import auth from 'common/auth'
import storage from 'common/storage'
import models from './models'
import EditAddress from 'components/editAddress'
import Dialog from 'components/dialog'
import UserLogin from 'components/userLogin'
import PopDark from 'components/popDark'
import { SET_ADDRESS_TYPE } from 'store/mutationTypes'

export default {
  template: html,

  data() {
    return {
      isAgreeed: true,
      estimateMoney: 0,
      productName: '',
      productWeight: null,
      remark: '',
      announcement: [],
      isEditShow: false,
      addressType: null,
      isPopLoginShow: false,
      needShowPopDark: false,

      defaultAddress: null,
      reviceAddress: null,
      isPopShow: false,
      gotoAddressType: null
    }
  },

  // compuuted: mapState([
  //   'defaultAddress',
  //   'reviceAddress',
  //   'userInfo'
  // ]),

  computed: {
    'userInfo'() {
      return storage.getUserInfoFromStorage()
    }
  },

  methods: {
    // $controlInput(maxLength, event) {
    //   let value = event.target.value
    //   if (value.length > maxLength) {
    //     value = value.slice(0, maxLength)
    //     this.productWeight = this.productWeight.slice(0, maxLength)
    //   } else {

    //   }

    //   this.productWeight = parseFloat(this.productWeight)
    // },

    $toggleContract() {
      this.isAgreeed = !this.isAgreeed
    },

    $getEstimateMoney() {
      let res
      this.productWeight = parseFloat(this.productWeight)
      res = models.validateWeight(this)

      if (res === true) {
        models.getEstimateMoney(this)
      }
    },

    $triggerAnimate() {
      let scrollerOut = document.querySelector('#js-announce-outer')

      if (this.announcement.length > 0) {
        setTimeout(() => {
          uiUtils.scrollAnimate(scrollerOut, scrollerOut.querySelector('ul'))
        }, 1000)
      }
    },

    $doSubmit() {
      var validateRes

      validateRes = models.doValidate(this)
      if (validateRes === true) {
        if ((this.defaultAddress.areaCode + '') !== '440114') {
          this.$toast({
            message: '抱歉，目前寄件地址只支持广东省广州市花都区，请重新填写寄件地址',
            className: 'mint-toast-big',
            duration: 5000
          })
          return
        }
        this.$indicator.open({
          spinnerType: 'fading-circle'
        })
        return models.doSubmit(this)
      }
    },

    $gotoEditPage(type) {
      this.addressType = type
      this.isEditShow = true
      this.$setAddressTypeToSession(type)
    },

    $gotToAddressList(type) {
      this.gotoAddressType = type
      if (auth.checkUserLogin() === false) {
        this.isPopShow = true
      } else {
        this.$setAddressTypeToSession(type)
        this.$router.push({path: '/address/0'})
      }
    },
    loginSuccessCb() {
      this.$setAddressTypeToSession(this.gotoAddressType)
      this.$router.push({path: '/address/0'})
    },
    closeLoginCb() {
      this.isPopShow = false
    },
    $openProtocol() {
      document.querySelector('#popDarkContent').innerHTML = protocolHtml
      this.needShowPopDark = true
    },

    $showDangerList() {
      document.querySelector('#popDarkContent').innerHTML = dangerListHtml
      this.needShowPopDark = true
    },

    $setAddressTypeToSession(type) {
      this.$store.commit(SET_ADDRESS_TYPE, type)
      models.setAddressType(type)
    },

    closeEditPage() {
      this.isEditShow = false
    },

    closePopLogin() {
      this.isPopLoginShow = false
    },

    setAddressSuccessCb(addressType, addressInfo) {
      if (addressType === 1) {
        this.defaultAddress = addressInfo
      } else {
        this.reviceAddress = addressInfo
      }
    },

    closePopDarkCb() {
      this.needShowPopDark = false
    }
  },

  components: {
    'edit-address': EditAddress,
    'pop-dialog': Dialog,
    'pop-dark': PopDark,
    'pop-dialog-login': Dialog,
    'user-login': UserLogin
  },

  watch: {
    'announcement': {
      handler() {
        this.$triggerAnimate()
      },
      deep: true
    }
  },

  created() {
    uiUtils.changeTitle('寄快递')

    models.getAnnouncement(this)
    models.setLoginMethod(this)
  },

  mounted() {
    if (auth.checkUserLogin() === true) {
      models.getDefaultAddress(this)
    } else {
      this.defaultAddress = storage.getDefaultAddressToStorage()
    }
    this.reviceAddress = storage.getReceiveAddressToStorage()
  }
}

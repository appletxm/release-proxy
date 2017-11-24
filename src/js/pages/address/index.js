import html from './template.html'
import { mapState } from 'vuex'
import * as uiUtils from 'utils/uiUtils'
import { SET_CURRENT_MODULE } from 'store/mutationTypes'
import auth from 'common/auth'
import models from './models'
import EditAddressPop from 'components/editAddressPop'
import Dialog from 'components/dialog'
import UserLogin from 'components/userLogin'
import AddressTab from 'components/tab'

const tabData = [
  {
    addressType: 1,
    name: '寄件地址'
  },
  {
    addressType: 2,
    name: '收件地址'
  }
]

export default {
  template: html,

  data() {
    return {
      addressList: [],
      tabList: tabData,
      tabCurrentItem: tabData[0],
      tabSelectedIndex: 0,
      isEditPopShow: false,
      isPopLoginShow: false,
      odlDefaultAddress: {},
      beEditAddress: {},
      addressType: 1,
      needTabFlag: 1
    }
  },

  computed: mapState([
    'userInfo']),

  methods: {
    changeTab(item) {
      this.addressType = item.addressType
      // models.setAddressType(item.addressType)
      models.getUserAddress(this, item.addressType)
      document.querySelector('#js-address-list-pannel').scrollTop = 0
    },

    $toggleSetDefault(item) {
      if (item.defaultFlag !== 1) {
        models.setDefaultAddress(this, item)
      } else {
        this.$indicator.open({
          text: '取消默认地址...',
          spinnerType: 'fading-circle'
        })
        models.cancelDefaultAddress(this)
          .then((res) => {
            item.defaultFlag = 0
            this.odlDefaultAddress = {}
            this.$indicator.close()
          // models.getUserAddress(this)
          })
          .catch((error) => {
            this.$indicator.close()
            models.showTipMsgBig(this, (error.message || error.detailMessage) || '设置默认地址出错')
            console.error(error)
          })
      }
    },

    $gotoEditPage(item) {
      this.isEditPopShow = true
      this.beEditAddress = item
    },

    $addNewAddress() {
      this.isEditPopShow = true
      this.beEditAddress = {}
    },

    $doDelete(item) {
      this.$messagebox.confirm('确定执行此操作?')
        .then(action => {
          models.doDeleteAddress(this, item)
        })
        .catch((error) => {
          console.info(error)
        })
    },

    loginSuccessCb() {
      this.isPopLoginShow = false
      models.getUserAddress(this, this.addressType)
    },

    closePopLogin() {
      this.isPopLoginShow = false
    },

    closeEditPage() {
      this.isEditPopShow = false
      this.beEditAddress = {}
    },

    editAddressSuccessCb() {
      this.closeEditPage()
      models.getUserAddress(this, this.addressType)
    },

    $chooseAddress(item) {
      if (this.needTabFlag === 0) {
        models.saveChooseAddToStore(this, item)
        this.$store.commit(SET_CURRENT_MODULE, 'Home')
      }
    },

    $showPageAccordingFlag() {
      if (auth.checkUserLogin() === true) {
        this.needTabFlag = models.getNeedTabFlag()
        this.addressType = models.getAddressType(this)

        models.getUserAddress(this, this.addressType)
      } else {
        this.isPopLoginShow = true
      }
    }
  },

  components: {
    'edit-address-pop': EditAddressPop,
    'user-login': UserLogin,
    'pop-dialog-login': Dialog,
    'address-tab': AddressTab
  },

  watch: {
    '$route.params': {
      handler() {
        // TODO should have a better way to resolve the address page layout problem
        this.$showPageAccordingFlag()
      }
    }
  },

  created() {
    uiUtils.changeTitle('地址簿')
    this.$store.commit(SET_CURRENT_MODULE, 'MyAll')
    models.setLoginMethod(this)
  },

  mounted() {
    this.$showPageAccordingFlag()
  }
}

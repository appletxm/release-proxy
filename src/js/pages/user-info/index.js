import html from './template.html'
import AddressSeleted from 'components/address-seleted'
import ImageUpload from 'components/image-upload'
import models from './models'

export default {
  template: html,
  data() {
    return {
      phone: '',
      email: '',
      realName: '',
      nickName: '',
      provinceName: '',
      provinceCode: '',
      cityName: '',
      cityCode: '',
      areaName: '',
      areaCode: '',
      address: '',
      addressDetail: '',
      addrSelectedShow: false,
      clearDistrict: false,
      gender: '1',
      invoiceTitle: '',
      loadingObj: null,
      msgObj: null,
      avatarUrl: ''
    }
  },
  created() {},
  mounted() {
    models.getUserInfo(this)
  },
  methods: {
    addrSelected(index, name, code) {
      if (index === 0) {
        models.setCurProvince(this, name, code)
        models.setCurCity(this, '', '')
        models.setCurArea(this, '', '')
      } else if (index === 1) {
        models.setCurCity(this, name, code)
        models.setCurArea(this, '', '')
      } else if (index === 2) {
        models.setCurArea(this, name, code)
        document.removeEventListener('click', this.handleDocumentClick)
      }
    },
    addrWrapHide() {
      this.addrSelectedShow = false
    },
    $addrWrapShow(e) {
      this.addrSelectedShow = true
      document.addEventListener('click', this.handleDocumentClick)

      e.stopPropagation()
    },
    handleDocumentClick(e) {
      let eventBox
      eventBox = document.querySelector('#js-address-box')
      if (!eventBox.contains(e.target)) {
        this.addrWrapHide()
        document.removeEventListener('click', this.handleDocumentClick)
      }
    },
    $doSubmit() {
      let result = models.doValidate(this)

      if (result.res === true) {
        this.$showLoading()
        models.doSubmit(this)
      } else {
        this.$showMsg('warning', result.msg)
      }
    },
    $showLoading() {
      this.loadingObj = this.$loading({
        lock: true,
        spinner: 'el-icon-loading'
      })
    },
    $showMsg(type, msg) {
      this.msgObj = this.$message({
        message: msg,
        showClose: true,
        type: type,
        duration: 2000
      })
    },
    $closeLoading() {
      if (this.loadingObj) {
        this.loadingObj.close()
      }
    },
    getImageCb(avatarUrl) {
      console.info('===avatarUrl===', avatarUrl)
      this.avatarUrl = avatarUrl
    }
  },
  components: {
    'address-seleted': AddressSeleted,
    'image-upload': ImageUpload
  }
}

import html from './template.html'
import models from './models'

const IMAGE_CONFIG = {
  width: 400,
  height: 400,
  type: 'jpg',
  msgObj: null
}

export default {
  template: html,
  props: {
    avatarUrl: {
      type: String,
      default: ''
    },
    getImageCb: {
      type: Function
    }
  },
  computed: {},
  data() {
    return {
      needShowEditBox: false,
      supportFileApi: false,
      avatarConfig: IMAGE_CONFIG,
      uploadTmpImgUrl: ''
    }
  },
  methods: {
    $chooseImg(event) {
      let files, file, isImage

      if (this.supportFileApi !== true) {
        this.$uploadImgInIe()
        return false
      }
      files = event.srcElement.files
      if (!files || files.length === 0) {
        return false
      }
      file = files[0]

      isImage = models.isImageFile(file)
      models.saveImageFileName(file)

      if (isImage === true) {
        this.needShowEditBox = true
        models.readFiler(file)
      } else {
        this.$showMsg('warning', '请选择正确的图片(png/gif/jpg)')
      }
    },

    $chooseImgIe(event) {
      let filePath = event.srcElement.value
      let ext

      if (filePath) {
        ext = filePath.match(/\.(png|gif|jpg|jpeg|bmp)$/)
        if (!ext || !ext[1]) {
          this.$showMsg('warning', '请选择正确的图片(png/gif/jpg)')
        } else {
          document.querySelector('#js-upload-form').submit()
        }
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

    $confirmCropper() {
      this.$closeImgEditPanel()
      models.saveEditImgToServer(this.$uploadImgCb.bind(this))
    },

    $uploadImgCb(imgUrl) {
      this.avatarUrl = imgUrl
      if (this.getImageCb && typeof this.getImageCb === 'function') {
        this.getImageCb(imgUrl)
      }
    },

    $closeImgEditPanel() {
      this.needShowEditBox = false
    },

    $iframeLoad(event) {
      let bodyMsg = event.target.contentWindow.document.querySelector('body').innerHTML
      if (bodyMsg) {
        bodyMsg = JSON.parse(bodyMsg)
        if (bodyMsg.code === '200') {
          this.needShowEditBox = true
          setTimeout(() => {
            document.querySelector('#js-upload-pre').setAttribute('src', bodyMsg.data)
          }, 0)
        }
      }
    }
  },
  created() {
    this.supportFileApi = models.isBrowserSupportFileApi()
  },
  mounted() {
    if (this.supportFileApi !== true) {
      this.uploadTmpImgUrl = models.getUploadTmpImgUrl()
      models.compatiableIe()
    }
    models.initFileReader()
  },
  destroyed() {
    models.destroyed()
  }
}

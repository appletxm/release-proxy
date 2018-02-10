/* global FileReader */
import axios from 'axios'
import apiUrls from 'common/apiUrls'

let fileReader, imgPrev, preBox, actionPanel, canvas, ctx, fileName
let canMove = false
let cropperArea = {
  cropperWidth: 160,
  cropperHeight: 160,
  boxWidth: 400,
  boxHeight: 400,
  gapLeft: 0,
  gapTop: 0,
  cropTop: 0,
  cropLeft: 0,
  moveX: 0,
  moveY: 0,
  dpi: 80
}

export default {
  readFiler(file) {
    fileReader.readAsDataURL(file)
  },

  getImg(event) {
    imgPrev.setAttribute('src', event.target.result)
  },

  calcluateImg(event) {
    let areaInfo

    this.calculateScale(event.target)
    // editCompletedCb(event.target)
    areaInfo = this.getCropperImg()
    this.drawImg(areaInfo)
  },

  calculateScale(img) {
    cropperArea.gapTop = (img.naturalHeight - cropperArea.boxHeight) / 2
    cropperArea.gapLeft = (img.naturalWidth - cropperArea.boxWidth) / 2
    cropperArea.cropTop = (cropperArea.boxWidth - cropperArea.cropperWidth) / 2
    cropperArea.cropLeft = (cropperArea.boxWidth - cropperArea.cropperWidth) / 2

    // console.info(img.naturalWidth , img.naturalHeight, cropperArea.cropTop, cropperArea.cropLeft)

    img.style.top = -cropperArea.gapTop + 'px'
    img.style.left = -cropperArea.gapLeft + 'px'
  },

  handleMouseDown(event) {
    // console.info('mouse down event:', event)
    cropperArea.moveX = event.pageX
    cropperArea.moveY = event.pageY
    canMove = true
  },

  handleMouseMouve(event) {
    let gapX, gapY
    let imgPos = this.getImgLeftTop()

    if (canMove === true) {
      gapX = event.pageX - cropperArea.moveX
      gapY = event.pageY - cropperArea.moveY
      cropperArea.moveX = event.pageX
      cropperArea.moveY = event.pageY

      // console.info('--------move------')
      // console.info(gapX, gapY, oldY + gapY, oldX + gapX)

      imgPrev.style.top = (imgPos.top + gapY) + 'px'
      imgPrev.style.left = (imgPos.left + gapX) + 'px'
    }
  },

  handleMouseUp(event) {
    let areaInfo

    canMove = false
    areaInfo = this.getCropperImg()
    this.drawImg(areaInfo)
  },

  drawImg(areaInfo) {
    ctx.fillStyle = '#bbb'
    ctx.clearRect(0, 0, areaInfo.width, areaInfo.height)
    ctx.save()
    ctx.restore()
    ctx.fillRect(0, 0, areaInfo.width, areaInfo.height)
    // ctx.drawImage(imgPrev, areaInfo.left, areaInfo.top, areaInfo.gapWidh, areaInfo.gapHeight, Math.ceil(areaInfo.width - areaInfo.gapWidh / 2), Math.ceil(areaInfo.height - areaInfo.gapWgapHeightidh / 2), areaInfo.gapWidh, areaInfo.gapHeight)
    canvas.width = areaInfo.width * 1.4
    canvas.height = areaInfo.height * 0.8
    ctx.drawImage(imgPrev, areaInfo.left, areaInfo.top, areaInfo.gapWidh, areaInfo.gapHeight, 0, 0, areaInfo.width * 1.4, areaInfo.height * 0.8)
  },

  getCropperImg() {
    let imgPos = this.getImgLeftTop()
    let imgLeft = imgPos.left
    let imgTop = imgPos.top
    let tmpLeft, tmpTop, gapWidh, gapHeight, imgWidth, imgHeight
    let areaInfo

    // console.info(cropperArea.cropTop, cropperArea.cropLeft, imgTop, imgLeft)

    if (imgTop <= 0) {
      tmpTop = cropperArea.cropTop + Math.abs(imgTop)
    } else {
      tmpTop = cropperArea.cropTop - imgTop
    }

    if (imgLeft <= 0) {
      tmpLeft = cropperArea.cropLeft + Math.abs(imgLeft)
    } else {
      tmpLeft = cropperArea.cropLeft - imgLeft
    }

    imgWidth = imgPrev.naturalWidth
    imgHeight = imgPrev.naturalHeight

    gapWidh = imgWidth - tmpLeft - cropperArea.cropperWidth
    gapWidh = gapWidh > 0 ? cropperArea.cropperWidth : gapWidh + cropperArea.cropperWidth
    gapHeight = imgHeight - tmpTop - cropperArea.cropperHeight
    gapHeight = gapHeight > 0 ? cropperArea.cropperHeight : gapHeight + cropperArea.cropperHeight

    areaInfo = {
      left: tmpLeft,
      top: tmpTop,
      width: cropperArea.cropperWidth,
      height: cropperArea.cropperHeight,
      gapWidh: gapWidh,
      gapHeight: gapHeight
    }

    console.info('areainfo:', areaInfo)

    return areaInfo
  },

  getImgLeftTop() {
    let imgLeft = parseFloat(imgPrev.style.left.replace('px', ''))
    let imgTop = parseFloat(imgPrev.style.top.replace('px', ''))

    return {
      left: imgLeft || 0,
      top: imgTop || 0
    }
  },

  handleMouseLeave(event) {
    canMove = false
  },

  isImageFile(file) {
    let imgRegexp = /^image\/jpg|jpeg|png|gif|bmp/

    return imgRegexp.test(file.type)
  },

  saveImageFileName(file) {
    fileName = file.name
  },

  saveEditImgToServer(succCb) {
    let base64 = canvas.toDataURL('image/jpeg', cropperArea.dpi)
    let params = {
      imgStr: base64,
      imgName: fileName
    }
    axios.post(apiUrls.uploadImg, params)
      .then((res) => {
        if (succCb && typeof succCb === 'function') {
          succCb(res.data)
        }
      })
      .catch((error) => {
        console.error(error)
      })
  },

  initFileReader() {
    preBox = document.querySelector('#js-pre-box')
    imgPrev = document.querySelector('#js-upload-pre')
    actionPanel = document.querySelector('#js-upload-action')
    canvas = document.querySelector('#js-upload-canvas')
    ctx = canvas.getContext('2d')

    try {
      fileReader = new FileReader()
      fileReader.addEventListener('load', this.getImg.bind(this))
    } catch (err) {
      fileReader = {}
    }

    imgPrev.addEventListener('load', this.calcluateImg.bind(this))
    actionPanel.addEventListener('mousedown', this.handleMouseDown.bind(this))
    actionPanel.addEventListener('mousemove', this.handleMouseMouve.bind(this))
    actionPanel.addEventListener('mouseup', this.handleMouseUp.bind(this))
    preBox.addEventListener('mouseleave', this.handleMouseLeave.bind(this))
  },

  destroyed() {
    fileReader.removeEventListener('load', this.getImg.bind(this))
    imgPrev.removeEventListener('load', this.calcluateImg.bind(this))
    actionPanel.removeEventListener('mousedown', this.handleMouseDown.bind(this))
    actionPanel.removeEventListener('mousemove', this.handleMouseMouve.bind(this))
    actionPanel.removeEventListener('mouseup', this.handleMouseUp.bind(this))
    preBox.removeEventListener('mouseleave', this.handleMouseLeave.bind(this))
    fileReader = imgPrev = preBox = canvas = fileName = null
    canMove = false
  },

  isBrowserSupportFileApi() {
    try {
      let fileReader = new FileReader()
      console.info('you current browser can support file api', fileReader)
      fileReader = null
      return true
    } catch (err) {
      return false
    }
  },

  getFileObject(fileInput) {
    let file, isSupportFileApi

    console.info('fileInput.value:', fileInput, fileInput.value)

    isSupportFileApi = this.isBrowserSupportFileApi()

    if (isSupportFileApi === true) {
      if (fileInput.files.length === 0) {
        return null
      }
      file = fileInput.files[0]
      file.isSupportFileApi = true
    } else {
      file = {
        isSupportFileApi: false,
        type: '',
        name: '',
        path: ''
      }
    }

    return file
  },

  getUploadTmpImgUrl() {
    return apiUrls.uploadImageTmp
  },

  compatiableIe() {}
}

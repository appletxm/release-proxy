import formValidate from 'utils/formValidate'

export default {
  doValidate(_this) {
    let msg,
      res

    res = true

    if (formValidate.normal(_this.expressNo, 6, 20) === false) {
      msg = '请输入正确的运单号'
      res = false
    }

    if (res === false) {
      _this.$toast({
        message: msg,
        duration: 3000,
        className: 'mint-toast-width'
      })
    }

    return res
  }
}

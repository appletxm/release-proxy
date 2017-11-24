/* global Vue */
import auth from 'common/auth'

const TOKEN_INVALID = '您已经离开我太久了，请重新登录'

export const errorCodeMatch = {
  '-1'(resData) {
    let hashList = ['#/', '#/home', '#/home/']
    let errorObj = {code: resData.code, message: resData.detailMessage || resData.message}

    if (hashList.indexOf(window.location.hash) >= 0) {
      throw (errorObj)
    }

    errorPopMsg.showTimeoutErrConfrim(errorObj)
  }
}

export const errorPopMsg = {
  showTimeoutErrConfrim(errorObj) {
    Vue.$messagebox.alert(TOKEN_INVALID, '令牌过期提示').then(() => {
      let url
      auth.removeAllCookie()
      url = window.location.origin + window.location.pathname + '#/login?timeOut=1'
      window.location.href = url
    }).catch(() => {
      if (errorObj) {
        throw (errorObj)
      }
    })
  }
}

// const TOKEN_INVALID = '您已经离开我太久了，请重新登录'

export const errorCodeMatch = {
  '401'(resData) {
    window.location.href = './login.html'
    throw (resData)
  }
}

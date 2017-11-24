/* global console,setTimeout */

/* eslint-disable */
export function getA (arg1, arg2) {
  console.info('==2==', arg1, arg2)

  var promiseA = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ a: 123 })
    }, 5000)
  })

  return promiseA
}

export function getB (arg1) {
  console.info('==5==', arg1)

  var promiseB = new Promise((resolve) => {
    setTimeout(() => {
      resolve({ b: 789 })
    }, 5000)
  })

  return promiseB
}

export function callGetA (arg1, arg2) {
  console.info('==1==', arg1, arg2)

  return getA(arg1, arg2).then((res) => {
    console.info('==3==', res)
    return res
  }).catch((error) => {
    console.info('error:', error)
  })
}

export function callGetB (arg1) {
  console.info('==4==', arg1)

  return getB(arg1).then((res) => {
    console.info('==6==', res)
    return res
  }).catch((error) => {
    console.log('error:', error)
  })
}
/* eslint-enable */

export default {
  normal(value, min, max) {
    let regStr,
      regexp
    regStr = '[\\u4e00-\\u9fa5|\\x00-\\xff|\\d|\\w|_|\\$]'
    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  text(value, min, max) {
    let regStr,
      regexp
    regStr = '[\\u4e00-\\u9fa5|\\x00-\\xff|\\d|\\w|_|\\$|\\.|。|,|，|（|）|\\(|\\)]'
    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  phone(value) {
    let regStr,
      regexp

    regStr = '\\d{11}'
    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    // console.info('phone:', regStr, regexp, value, regexp.test(value))

    return regexp.test(value)
  },

  telephone(value) {
    let regStr,
      regexp

    regStr = '\\d{3,4}-\\d{7,8}'
    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    // console.info('telephone:', regStr, regexp, value, regexp.test(value))

    return regexp.test(value)
  },

  password(value, min, max) {
    let regStr,
      regexp
    regStr = '.'
    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    return regexp.test(value)
  },

  validateCode(value, min, max) {
    let regStr,
      regexp
    regStr = '\\d'
    if (min && max) {
      regStr += '{' + min + ',' + max + '}'
    } else if (max) {
      regStr += '{,' + max + '}'
    } else if (min) {
      regStr += '{' + min + ',}'
    }

    regStr = '^' + regStr + '$'
    regexp = new RegExp(regStr)

    return regexp.test(value)
  }
}

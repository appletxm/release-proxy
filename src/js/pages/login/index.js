import html from './template.html'
import * as uiUtils from 'utils/uiUtils'
import { SET_LOGIN_METHOD, SET_CURRENT_MODULE, SET_USER_LOGIN_STATUS } from 'store/mutationTypes'
import Tab from 'components/tab'
import UserLogin from 'components/userLogin'
import UserRegister from 'components/userRegister'

const tabData = [
  {
    id: 0,
    name: '登 录'
  },
  {
    id: 1,
    name: '注 册'
  }
]

export default {
  template: html,
  data() {
    return {
      title: "i'm help page",
      tabList: tabData,
      tabSelectedIndex: 0,
      tabCurrentItem: tabData[0],
      loginShow: true,
      registerShow: true,
      isPopShow: false
    }
  },
  methods: {
    changeTab(item) {
      this.tabCurrentItem = JSON.parse(JSON.stringify(item))
    },
    closeLoginCb() {},
    loginSuccessCb() {
      // window.location.href = '/'
      this.$router.push({path: '/'})
    },
    closeRegisterCb() {},
    registerSuccessCb() {
      // window.location.href = '/'
      this.$router.push({path: '/'})
    }
  },
  components: {
    'login-tab': Tab,
    'user-login': UserLogin,
    'user-register': UserRegister
  },
  created() {
    uiUtils.changeTitle('用户登录/注册')
    this.$store.commit(SET_LOGIN_METHOD, 0)
    this.$store.commit(SET_CURRENT_MODULE, 'MyAll')
  },
  mounted() {
    let url, timeOut, matched

    matched = window.location.hash.match(/\?(.+)/)
    if (matched && matched.length > 0) {
      url = matched[0]
      timeOut = uiUtils.getQueryString('timeOut', url)
      if (timeOut && timeOut === '1') {
        this.$store.commit(SET_USER_LOGIN_STATUS, false)
      }
    }
  }
}

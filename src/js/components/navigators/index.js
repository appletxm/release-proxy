import html from './template.html'
import TipsMenu from '../tipsMenu'
import auth from 'common/auth'
import storage from 'common/storage'
import { SET_CURRENT_MODULE, SET_USER_LOGIN_STATUS } from 'store/mutationTypes'

const subMenuList = [
  {
    id: 'address',
    title: '我的地址',
    isShow: true,
    path: '/address/1',
    parentModuleName: 'MyAll'
  },
  {
    id: 'order',
    title: '我的订单',
    isShow: true,
    path: '/order',
    parentModuleName: 'MyAll'
  },
  {
    id: 'loginout',
    title: '退出登录',
    isShow: true,
    path: '/login',
    parentModuleName: 'MyAll',
    event: 'loginOut'
  }
]

export default {
  template: html,
  data() {
    return {
      selectedIndex: 0,
      helpTipsMenuShow: false,
      helpTipsMenu: subMenuList,
      currentModule: 'Home'
    }
  },
  methods: {
    openHelpMenu() {
      this.helpTipsMenuShow = true
    },

    changeSubModuleCb(item) {
      if (item.id === 'address') {
        this.$gotoAddressPage()
      }
      if (item.id === 'loginout') {
        this.$loginOut()
      }

      this.$changeNav({path: item.path}, item.parentModuleName)
      this.helpTipsMenuShow = false
    },

    $changeNav(path, moduleName) {
      this.$store.commit(SET_CURRENT_MODULE, moduleName)
      this.$router.push(path)
    },

    $loginOut() {
      storage.loginOutRemoveAll()
      auth.removeAllCookie()
      this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
    },

    $gotoAddressPage() {
      storage.setNeedAddressTabFlag(1)
    }
  },

  components: {
    'tips-menu': TipsMenu
  },

  created() {
    this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
  },

  mounted() {
    document.addEventListener('click', (e) => {
      if (!this.$refs['helpMenu'].contains(e.target)) {
        this.helpTipsMenuShow = false
      }
    })
  }
}

import html from './template.html'
import TipsMenu from '../tips-menu'
import auth from 'common/auth'
import { storage } from 'common/storage'
import { SET_USER_LOGIN_STATUS } from 'store/mutation-types'
import models from './models'
import axios from 'axios'
import apiUrls from 'common/apiUrls'

export default {
  template: html,
  data() {
    return {
      selectedIndex: 0,
      helpTipsMenuShow: false,
      currentModule: '',
      navList: []
    }
  },
  methods: {
    openHelpMenu() {
      this.helpTipsMenuShow = true
    },

    changeSubModuleCb(item) {
      if (item.id === 'loginout') {
        this.$loginOut()
      } else {
        this.$changeNav(item)
        this.helpTipsMenuShow = false
      }
    },

    $changeNav(nav, event) {
      let {isOusideLink, path, parentModuleName, menuItemId, children} = nav

      if (event) {
        event.stopPropagation()
      }

      if (children && children.length > 0) {
        this.helpTipsMenuShow = true
        return false
      }

      if (isOusideLink === true) {
        window.location.href = path
        return path
      }
      models.openNavLink(this, parentModuleName, menuItemId + '_' + nav.title + '_' + 'nav', path)
    },

    $loginOut() {
      axios.post(apiUrls.userLogOut)
        .then((res) => {
          storage.loginOutRemoveAll()
          auth.removeAllCookie()
          this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
          window.location.href = '/login.html'
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },

  components: {
    'tips-menu': TipsMenu
  },

  created() {
    let navList = models.getNavData()
    navList = models.decorateNavData(navList)
    this.navList = navList
  },

  mounted() {
    document.addEventListener('click', (e) => {
      this.helpTipsMenuShow = false
    })

    models.urlMatchNavItem(this)
  }
}

import * as data from './nav-data'
import { storage, CURRENT_MODULE } from 'common/storage'
import { SET_CURRENT_MODULE } from 'store/mutation-types'
import leftMenuModels from 'components/left-menu/models'

export default {
  getNavData() {
    return data.navData
  },

  openNavLink(_this, currentModule, currentMenuInfo, path) {
    this.updateCacheForCurrentModule(_this.$store, currentModule)
    leftMenuModels.setCurrentMenuId(_this.$store, currentMenuInfo)
    _this.$router.push(path)
  },

  urlMatchNavItem(_this) {
    let path = window.location.hash.replace(/#/, '')
    let matchedItemList = []

    if (!path || path === '/') {
      _this.$changeNav(_this.navList[3])
    } else {
      this.doMatch(path, _this.navList, matchedItemList)
      if (matchedItemList.length > 0) {
        _this.$changeNav(matchedItemList[0])
      }
    }
  },

  doMatch(path , navData, matchedItemList) {
    for (let nav of navData) {
      if (nav.path === path) {
        matchedItemList.push(nav)
      } else if (nav.children && nav.children.length >= 0) {
        this.doMatch(path, nav.children, matchedItemList)
      }
    }
  },

  updateCacheForCurrentModule(conStore, value) {
    storage.set(CURRENT_MODULE, value)
    conStore.commit(SET_CURRENT_MODULE, value)
  },

  decorateNavData(navList) {
    let userInfo = storage.getUserInfoFromStorage()
    navList[navList.length - 1]['title'] = userInfo.nickName || userInfo.mobile
    return navList
  }
}

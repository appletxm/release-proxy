import { SET_CURRENT_MENU_ID } from 'store/mutation-types'
import { storage, CURRENT_MENU_ID } from 'common/storage'
import menuList from './left-menu-data'

export default {
  getMenuData() {
    let promise

    promise = new Promise((resolve) => {
      resolve(menuList)
    })

    return promise
  },

  matchedMenuItem(menuData, menuId, matchedItem) {
    if (menuData && menuData.length <= 0) {
      return null
    }

    for (let i = 0; i < menuData.length; i++) {
      let menuItem = menuData[i]
      let children = menuData[i].children

      if (menuId === menuItem.id) {
        menuItem.index = i
        matchedItem.push(menuItem)
        return false
      }
      if (children && children.length > 0) {
        this.matchedMenuItem(menuItem.children, menuId, matchedItem)
      }
    }
  },

  getMatchedList(menuData, matchedItem, matchedMenuList) {
    let tmpMatchedItem = []
    if (matchedItem && menuData.length > 0) {
      matchedMenuList.push({
        menuId: matchedItem.id,
        title: matchedItem.title,
        index: matchedItem.index
      })
      if (matchedItem.parentId) {
        this.matchedMenuItem(menuData, matchedItem.parentId, tmpMatchedItem)
        this.getMatchedList(menuData, tmpMatchedItem[0], matchedMenuList)
      } else {
        return false
      }
    }
  },

  getCurrentMenuInfo(currentMenuId) {
    let tmpSplit
    let menuId
    let title
    let type

    if (currentMenuId) {
      tmpSplit = currentMenuId.split('_')
      menuId = tmpSplit[0]
      title = tmpSplit[1]
      type = tmpSplit[2]

      return {menuId, title, type}
    } else {
      return {}
    }
  },

  setCurrentMenuId(conStore, menuStr) {
    storage.set(CURRENT_MENU_ID, menuStr)
    conStore.commit(SET_CURRENT_MENU_ID, menuStr)
  },

  clearFocus(data) {
    data.map(item => {
      item.isActived = false
      if (item.children && item.children.length > 0) {
        this.clearFocus(item.children)
      }
    })
  },

  selectMenuItem(_this, menuId) {
    let matchedMenuItemList = []
    let matchedMenuIndexList = []
    let tmpOpenMenuItem = _this.list

    this.matchedMenuItem(_this.list, menuId, matchedMenuItemList)
    this.getMatchedList(_this.list, matchedMenuItemList[0], matchedMenuIndexList)

    matchedMenuIndexList = matchedMenuIndexList.reverse()

    matchedMenuIndexList.forEach((item) => {
      tmpOpenMenuItem = tmpOpenMenuItem[item.index]
      tmpOpenMenuItem['isActived'] = true

      if (tmpOpenMenuItem.children && tmpOpenMenuItem.children.length > 0) {
        tmpOpenMenuItem = tmpOpenMenuItem.children
      } else {
        _this.lastSelectedItem = _this.currentSelectedItme
        _this.currentSelectedItme = tmpOpenMenuItem
        if (_this.lastSelectedItem) {
          _this.lastSelectedItem['isActived'] = false
        }
      }
    })
  }
}

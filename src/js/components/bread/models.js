import leftMenuModels from 'components/left-menu/models'

export default {
  getPath(menuData, selectedMenuInfo) {
    let {menuId, title} = leftMenuModels.getCurrentMenuInfo(selectedMenuInfo)

    let breadList = []
    let matchedItem = []

    if (!menuId) {
      breadList.push({menuId, title})
    } else {
      leftMenuModels.matchedMenuItem(menuData, menuId, matchedItem)
      if (matchedItem && matchedItem.length > 0) {
        leftMenuModels.getMatchedList(menuData, matchedItem[0], breadList)
        breadList = breadList.reverse()
        breadList.concat(breadList)
      }
    }

    return breadList
  }

}

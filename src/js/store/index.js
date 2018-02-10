/* global Vuex */
import * as consts from './mutation-types'

const store = new Vuex.Store({
  state: {
    userInfo: {
      userId: ''
    },
    loginMethod: 0, // 0 page 1 pop
    resetPassToken: '',
    currentModule: 'Introduction', // app modules which matched with the navigator, include 'Home, Search, My',
    showNavigator: true,
    isUserLogin: false,
    currentMenuId: '',
    menuData: []
  },

  getters: {},

  actions: {},

  mutations: {
    [consts.SET_USER_INFO](state, payLoad) {
      state.userInfo = payLoad
    },

    [consts.SET_LOGIN_METHOD](state, value) {
      state.loginMethod = value
    },

    [consts.SET_RESET_PASS_TOKEN](state, value) {
      state.resetPassToken = value
    },

    [consts.SET_CURRENT_MODULE](state, value) {
      state.currentModule = value
    },

    [consts.SET_SHOW_NAVIGATOR](state, value) {
      state.showNavigator = value
    },

    [consts.SET_USER_LOGIN_STATUS](state, value) {
      state.isUserLogin = value
    },

    [consts.SET_CURRENT_MENU_ID](state, value) {
      state.currentMenuId = value
    },

    [consts.SET_MENU_DATA](state, value) {
      state.menuData = value
    }
  }
})

export default store

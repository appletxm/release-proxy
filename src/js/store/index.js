/* global Vuex */
import * as consts from './mutationTypes'

const store = new Vuex.Store({
  state: {
    userInfo: {
      userId: ''
    },
    addressType: 1, // 1 send address, 2 received address
    defaultAddress: {},
    reviceAddress: {},
    loginMethod: 0, // 0 page 1 pop
    resetPassToken: '',
    currentModule: 'Home', // app modules which matched with the navigator, include 'Home, Search, My',
    showNavigator: true,
    isUserLogin: false
  },

  getters: {},

  actions: {},

  mutations: {
    [consts.SET_USER_INFO](state, payLoad) {
      state.userInfo = payLoad
    },

    [consts.SET_USER_DEFAULT_ADDRESS](state, payLoad) {
      state.defaultAddress = payLoad
    },

    [consts.SET_USER_RECEIVE_DEFAULT_ADDRESS](state, payLoad) {
      state.reviceAddress = payLoad
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

    [consts.SET_ADDRESS_TYPE](state, value) {
      state.addressType = value
    },

    [consts.SET_USER_LOGIN_STATUS](state, value) {
      state.isUserLogin = value
    }
  }
})

export default store

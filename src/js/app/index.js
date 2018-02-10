import html from './template.html'
import navigator from 'components/navigators'
import leftMenu from 'components/left-menu'
import bread from 'components/bread'
// import { SET_USER_LOGIN_STATUS, SET_USER_INFO } from 'store/mutation-types'
// import { storage } from 'common/storage'
// import auth from 'common/auth'

export default {
  template: html,

  data() {
    return {
      menuData: null
    }
  },
  components: {
    'navigator': navigator,
    'left-menu': leftMenu,
    'app-bread': bread
  },
  methods: {
    $iframeLoad() {
      console.info('iframe------reload')
    },

    $chooseImgIe(event) {
      document.querySelector('#js-upload-form').submit()
    }
  },
  created() {
    // let isUserLogin = auth.checkUserLogin()

    // if (isUserLogin !== true) {
    //   window.location.href = '/login.html'
    // } else {
    //   this.$store.commit(SET_USER_INFO, storage.getUserInfoFromStorage())
    //   this.$store.commit(SET_USER_LOGIN_STATUS, auth.checkUserLogin())
    // }
  },
  mounted() {}
}

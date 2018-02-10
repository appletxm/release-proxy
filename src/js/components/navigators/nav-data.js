export const subMenuList = [
  {
    id: 'changeMyPass',
    title: '修改密码',
    isShow: true,
    path: '/userCenter/changePassword',
    parentModuleName: 'UserOperations',
    menuItemId: '12',
    isOusideLink: false,
    hasChild: false,
    children: []
  },
  {
    id: 'changeMyInfo',
    title: '修改资料',
    isShow: true,
    path: '/userCenter/userInfo',
    parentModuleName: 'UserOperations',
    menuItemId: '11',
    isOusideLink: false,
    hasChild: false,
    children: []
  },
  {
    id: 'loginout',
    title: '退出登录',
    isShow: true,
    path: '/login',
    parentModuleName: 'UserCenter',
    event: 'loginOut',
    isOusideLink: true,
    hasChild: false,
    children: []
  }
]

export const navData = [
  {
    id: 'portal',
    title: '首页',
    isShow: true,
    path: 'http://kb.rfgmc.com/rfindex/',
    parentModuleName: 'Portal',
    menuItemId: '',
    isOusideLink: true,
    icon: '',
    hasChild: false,
    children: []
  },
  {
    id: 'sample',
    title: '打版',
    isShow: true,
    path: 'http://kb.dt.rfgmc.com/#/login',
    parentModuleName: 'Sample',
    menuItemId: '',
    isOusideLink: true,
    icon: '',
    hasChild: false,
    children: []
  },
  {
    id: 'userCenter',
    title: '个人中心',
    isShow: true,
    path: '/userCenter/userInfo',
    parentModuleName: 'UserCenter',
    menuItemId: '11',
    isOusideLink: false,
    icon: '',
    hasChild: false,
    children: []
  },
  {
    id: 'introduction',
    title: '使用说明',
    isShow: true,
    path: '/introduction',
    parentModuleName: 'Introduction',
    menuItemId: '',
    isOusideLink: false,
    icon: '',
    hasChild: false,
    children: []
  },
  {
    id: 'userOperations',
    title: '用户',
    isShow: true,
    path: '/userOperations',
    parentModuleName: 'UserOperations',
    menuItemId: '',
    isOusideLink: false,
    icon: 'rf-iconfont icon-account',
    hasChild: true,
    children: subMenuList
  }
]

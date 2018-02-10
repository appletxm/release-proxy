const menuList = [
  {
    id: '1',
    title: '个人中心',
    isActived: false,
    path: '',
    parentModuleName: 'MyAll',
    parentId: '',
    hasChild: true,
    children: [
      {
        id: '11',
        title: '修改资料',
        path: '/userCenter/userInfo',
        isActived: false,
        parentModuleName: 'MyAll',
        isOusideLink: false,
        parentId: '1',
        hasChild: false,
        children: []
      },
      {
        id: '12',
        title: '修改密码',
        path: '/userCenter/changePassword',
        isActived: false,
        parentModuleName: 'MyAll',
        isOusideLink: false,
        parentId: '1',
        hasChild: false,
        children: []
      }
    ]
  },

  {
    id: '2',
    title: '用户列表',
    isActived: false,
    path: '/userList',
    parentModuleName: 'MyAll',
    parentId: '',
    hasChild: false,
    children: []
  }
]

export default menuList

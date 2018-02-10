const columns = [
  {
    prop: 'userId',
    label: '用户ID',
    width: 180,
    type: 'string',
    sortable: true
  },
  {
    prop: 'avatarUrl',
    label: '用户头像',
    type: 'image',
    hidden: true
  },
  {
    prop: 'email',
    label: '电子邮箱',
    width: 180,
    type: 'string',
    sortable: true
  },
  {
    prop: 'realName',
    label: '真实姓名',
    type: 'string',
    sortable: true
  },
  {
    prop: 'nickName',
    label: '用户昵称',
    type: 'string',
    sortable: true
  },
  {
    prop: 'fullAddress',
    label: '用户地址',
    type: 'string',
    sortable: true
  },
  {
    prop: 'registerTimeFormat',
    label: '注册时间',
    type: 'number',
    width: 180,
    sortable: true
  }
]

export default columns

/* global VueRouter */
let routes, router

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const UserInfo = () => import(/* webpackChunkName: "UserInfo" */ 'pages/user-info')
const ErrorPage = () => import(/* webpackChunkName: "ErrorPage" */ 'pages/error')
const Introduction = () => import(/* webpackChunkName: "Instruction" */ 'pages/introduction')
const ChangePassword = () => import(/* webpackChunkName: "ChangePassword" */ 'pages/change-password')
const UserList = () => import(/* webpackChunkName: "UserList" */ 'pages/user-list')

routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/introduction', component: Introduction },
  { path: '/userCenter/changePassword', component: ChangePassword },
  { path: '/userCenter/userInfo', component: UserInfo },
  { path: '/userList', component: UserList },
  { path: '*', component: ErrorPage }
]

router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

export default router

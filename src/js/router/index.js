/* global VueRouter */
let routes, router

const Home = () => import(/* webpackChunkName: "Home" */ 'pages/home')
const Login = () => import(/* webpackChunkName: "Help" */ 'pages/login')
const Search = () => import(/* webpackChunkName: "About" */ 'pages/search')
const Order = () => import(/* webpackChunkName: "About" */ 'pages/order')
const Address = () => import(/* webpackChunkName: "Address" */ 'pages/address')
const TransDetail = () => import(/* webpackChunkName: "TransDetail" */ 'pages/transDetail')
const ErrorPage = () => import(/* webpackChunkName: "Error" */ 'pages/error')

routes = [
  { path: '/', component: Home },
  { path: '/#/', component: Home },
  { path: '/home', component: Home },
  { path: '/search', component: Search },
  { path: '/order', component: Order },
  { path: '/trans/:transId', component: TransDetail },
  { path: '/login', component: Login },
  { path: '/address/:flag', component: Address },
  { path: '*', component: ErrorPage }
]

router = new VueRouter({routes})

router.beforeEach((to, from, next) => {
  document.body.scrollTop = 0
  next()
})

export default router

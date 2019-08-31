import Vue from 'vue'
import Router from 'vue-router'
import { Notification } from 'element-ui'
import store from './store'
import unit from '@/unit/unit.js'
Vue.use(Router)

// 使用路由按需加载(官方推荐)
const _import = (r) => file => require.ensure([], () => file(require(`@/views${ r }.vue`)))

// 初始路由
const initRouters = [
  {
    path: '/',
    name: 'Login',
    component: _import('/Login/Login')
  },
	{
		path: '/NoFind/NoFind',
		name: 'NoFind',
		component: _import('/NoFind/NoFind')
  }
]

// 配置路由
var router = new Router({
  routes: initRouters,
  // mode: 'history'
})
// 解决点击同一个路由出现错误的情况
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// 进入路由之前 动态添加路由
let isReplace = true // 控制刷新
router.beforeEach((to, from, next) => {
  let token = store.state.base.token // 获取token
  let limit = store.state.base.limit // 获取路由表
  if (!token && to.path !== '/') { // 没有token 并且 进入的不是登录页面  重定向到登录页面
    if (to.path !== '/') {
      next({
        path: '/'
      })
      Notification.error({
        title: '错误',
        message: '您还未登录'
      })
    } else {
      next()
    }
  } else { // 有token
    if (to.path === '/') { // 有token进入登录页面
      next()
    } else { // 有token进入非登录页面
      if (isReplace) { // 刷新
        if (to.path !== from.path) {
          isReplace = false
          let routers = []
          unit.filterRouter(limit, routers)
          let allRouters = [
            {
              path: '/Home',
              name: 'Home',
              component: _import('/Home'),
              mtea: {
                parentName: '',
                name: '首页',
                requiresAuth: true,
              },
              children: routers
            },
            { path: '*', redirect: '/NoFind/NoFind' },
          ]
          router.addRoutes(allRouters)
          next({
            path: to.path
          })
        } else {
          next()
        }
      } else { // 不是刷新
        next()
      }
    }
  }
  // 存放当前路由
  store.dispatch('CHANGE_NOWROUTE_ACT', to.path)
  store.dispatch('CHANGE_LASTROUTE_ACT', from.path)
})
export default router
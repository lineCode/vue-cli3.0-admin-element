import Base from '@/base/base'
import api from '@/api/api'
import Vue from 'vue'
import { Notification } from 'element-ui'
import router, { resetRouter } from '@/router.js'
export default class extends Base {
  // 表格数据
  queryList () {
    let self = this
    api.queryUser(self.vm.paginations, {
      'token': self.vm.base.token,
      'Content-Type': 'application/json'
    })
    .then(res => {
      if (res.status === 200) {
        if (res.data.status === 1003) {
          Notification({
            type: 'error',
            title: '错误',
            message: res.data.msg
          })
          resetRouter()
          const _import = (r) => file => require.ensure([], () => file(require(`@/views${ r }.vue`)))
          let allRouters = [
            {
              path: '/Home',
              name: 'Home',
              component: _import('/Home'),
              mtea: {
                parentName: '',
                name: '',
                requiresAuth: true,
              },
              children: []
            },
            { path: '*', redirect: '/NoFind/NoFind' },
          ]
          router.addRoutes(allRouters)
          self.vm.CHANGE_LIMIT_ACT([]) // 清空路由表
          self.vm.CHANGE_CLICKROUTE_ACT([]) // 清空点击过的列表
          self.vm.$router.push({
            path: '/'
          })
        } else if (res.data.status === 1005) {
          Notification({
            type: 'error',
            title: '错误',
            message: res.data.msg
          })
        } else {
          Vue.set(self.vm.list, 'data', res.data.data)
          Vue.set(self.vm.paginations, 'total', res.data.total)
        }
      }
    })
  }
  updateList (param) {
    let self = this
    api.updateUser(param)
    .then(res => {
      if (res.data.result === 'success') {
        Vue.set(self.vm.innerDrawer, 'show', false)
        Vue.set(self.vm.limitsDrawer, 'show', false)
        Vue.set(self.vm.innerDrawer, 'list', {})
        Vue.set(self.vm.innerDrawer.list, 'status', '2')
        self.queryList()
      }
      Notification({
        type: res.data.result,
        title: res.data.title,
        message: res.data.msg
      })
    })
  }
  deleteList (param) {
    let self = this
    api.deleteUser(param)
    .then(res => {
      Notification({
        type: res.data.result,
        title: res.data.title,
        message: res.data.msg
      })
      self.queryList()
    })
  }
}
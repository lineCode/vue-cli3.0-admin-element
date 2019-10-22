import Base from '@/base/base'
import api from '@/api/api'
import { JSEncrypt } from 'jsencrypt'
import router, { resetRouter } from '@/router.js'
import unit from '@/unit/unit.js'
import { Notification } from 'element-ui'

export default class extends Base {
  // async asyncAwaitFn (fn) {
  //   return await new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(fn)
  //     }, 1000);
  //   })
  // }
  // 拿到公钥
  getPubKey (param) {
    let self = this
    api.getPubKey()
    .then(res => {
      if (res.data.result === 'success') {
        self.vm.CHANGE_PUBKEY_ACT(res.data.pubKey)
        let encrypt = new JSEncrypt()
        encrypt.setPublicKey(self.vm.base.pubKey)
        api.login({
          user: encrypt.encrypt(param.user),
          pass: encrypt.encrypt(param.pass)
        })
        .then(res => {
          let limits = {}
          if (res.data.result === 'success') {
            limits = typeof res.data.limits !== 'object' ? JSON.parse(res.data.limits) : res.data.limits
            const _import = (r) => file => require.ensure([], () => file(require(`@/views${ r }.vue`)))
            let firstR = {}
            resetRouter()
            self.vm.CHANGE_LIMIT_ACT([]) // 清空路由表
						self.vm.CHANGE_CLICKROUTE_ACT([]) // 清空点击过的列表
						self.vm.CHANGE_LIMIT_ACT(limits) // 存放路由表
						self.vm.CHANGE_FORMlOGIN_ACT({ username: res.data.name }) // 存放登录字段
            self.vm.CHANGE_TOKEN_ACT({ token: res.data.jwt }) // 存放token
            let routers = []
						unit.filterRouter(limits, routers)
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
								children: routers
							},
							{ path: '*', redirect: '/NoFind/NoFind' },
						]
            router.addRoutes(allRouters)
            firstR = {
              icon: "&#xe640;",
              iconSize: "24",
              level: 1,
              sort: 1,
              state: 1,
              link: "/Index/Index",
              linkName: "Index",
              name: "首页",
              children: []
            }
            self.vm.$nextTick(() => {
              self.vm.$router.push({ // 跳转到首位路由
                path: firstR.link
              })
              self.vm.CHANGE_CLICKROUTE_ACT({ link: firstR.link, name: firstR.name })
            })
          }
          Notification({
            type: res.data.result,
            title: res.data.title,
            message: res.data.msg
          })
        })
      }
    })
  }
  login (param) {
    let self = this
    self.getPubKey(param)
  }
}
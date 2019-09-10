import Base from '@/base/base'
import api from '@/api/api'
import Vue from 'vue'

export default class extends Base {
  // 表格数据
  queryUser () {
    api.queryUser(this.vm.paginations)
    .then(res => {
      // window.console.log(res)
      if (res.status === 200) {
        Vue.set(this.vm.list, 'data', res.data.data)
        Vue.set(this.vm.paginations, 'total', res.data.total)
      }
    })
  }
}
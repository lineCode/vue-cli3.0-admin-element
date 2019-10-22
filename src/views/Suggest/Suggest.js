import Base from '@/base/base'
import api from '@/api/api'
import Vue from 'vue'
import { Notification } from 'element-ui'
export default class extends Base {
  // 表格数据
  queryList () {
    let self = this
    api.querySuggest(self.vm.paginations)
    .then(res => {
      if (res.status === 200) {
        Vue.set(self.vm.list, 'data', res.data.data)
        Vue.set(self.vm.paginations, 'total', res.data.total)
      }
    })
  }
  updateList (param) {
    let self = this
    api.updateSuggest(param)
    .then(res => {
      if (res.data.result === 'success') {
        Vue.set(self.vm.innerDrawer, 'show', false)
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
    api.deleteSuggest(param)
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
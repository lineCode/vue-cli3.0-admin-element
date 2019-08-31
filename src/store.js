import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import base from '@/store/base.js'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    base
  },
  // 设置持久化
  plugins: [createPersistedState({
    key: 'zhuanghongliang',
    paths: ['base']
  })]
})
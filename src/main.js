import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import '../public/fontIcon/iconfont'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'driver.js/dist/driver.min.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

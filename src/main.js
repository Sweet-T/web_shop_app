import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import './plugins/vant'
// 导入全局样式
import './assets/css/global.css'

// 导入axios
import axios from 'axios'
// 设置axios根路径
axios.defaults.baseURL = 'https://fanhc.xyz/api/public/v1'
// 并挂载到Vue原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

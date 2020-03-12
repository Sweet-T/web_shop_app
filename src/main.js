import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 导入vant组件
import './plugins/vant'
// 导入全局样式
import './assets/css/global.css'
Vue.config.productionTip = false
import axios from 'axios'
//接口根路径
axios.defaults.baseURL = "https://fanhc.xyz/api/public/v1"

// 挂载$http到Vue原型对象上 这样Vue构造函数的所有实例对象，都可以调用axios!!!
Vue.prototype.$http = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

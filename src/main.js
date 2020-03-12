import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/vant'
import './assets/css/global.css'

// 导入axios组件
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'https://fanhc.xyz/api/public/v1/'
// 挂载$http到Vue原型对象上 这样Vue构造函数的所有实例对象，都可以调用axios!!!
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
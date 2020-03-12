import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/vant'
import './assets/css/global.css'
<<<<<<< HEAD
<<<<<<< HEAD
// 导入axios组件
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'https://fanhc.xyz/api/public/v1/'
// 挂载$http到Vue原型对象上 这样Vue构造函数的所有实例对象，都可以调用axios!!!
Vue.prototype.$http = axios
import Bus from './components/Bus'
=======

axios.defaults.baseURL = 'https://fanhc.xyz/api/public/v1/'
Vue.prototype.$http = axios
>>>>>>> cates
=======

// 导入axios
import axios from 'axios'
// 设置axios根路径
axios.defaults.baseURL = 'https://fanhc.xyz/api/public/v1'
// 并挂载到Vue原型对象上
Vue.prototype.$http = axios

>>>>>>> home
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
import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由对应的组件
import Index from '../views/Index.vue'
import Home from '../views/tabbars/Home.vue'
import Cates from '../views/tabbars/Cates.vue'
import Search from '../views/tabbars/Search.vue'
import Cart from '../views/tabbars/Cart.vue'
import My from '../views/tabbars/My.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  component: Index,
  redirect: '/index'
}, {
  path: '/index',
  name: '主体骨架',
  component: Index,
  redirect: '/home',
  children: [{
    path: '/home',
    name: '首页',
    component: Home
  }, {
    path: '/cates',
    name: '分类',
    component: Cates
  }, {
    path: '/search',
    name: '搜索',
    component: Search
  }, {
    path: '/cart',
    name: '购物车',
    component: Cart
  }, {
    path: '/my',
    name: '我的',
    component: My
  }]
}]

const router = new VueRouter({
  routes
})

export default router
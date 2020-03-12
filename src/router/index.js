import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由对应的组件
import Index from '../views/Index.vue'
import Home from '../views/tabbars/Home.vue'
import Cates from '../views/tabbars/Cates.vue'
import Search from '../views/tabbars/Search.vue'
import Cart from '../views/tabbars/Cart.vue'
import My from '../views/tabbars/My.vue'
// 导入 提交订单 列表组件
import Order from '../views/orders/Order.vue'
// 导入 地址列表 组件
import Addresslist from '../views/orders/Addresslist.vue'
// 导入 添加地址 组件
import Address from '../views/orders/Address.vue'

Vue.use(VueRouter)

const routes = [{
  path: '/',
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
  },{
    path: '/order/:order',
    name: '订单',
    component: Order
  },{
    path: '/addresslist/:data',
    name: '地址list',
    component: Addresslist
  },{
    path: '/address/:data',
    name: '地址',
    component: Address
  }]
}]

const router = new VueRouter({
  routes
})
router.afterEach((to, from) => {
  if(to.path == '/home') {
    to.params.ifHome = true
  }
})
export default router
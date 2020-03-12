import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入路由对应的组件
import Index from '../views/Index.vue'
import Home from '../views/tabbars/Home.vue'
import Cates from '../views/tabbars/Cates.vue'
import Search from '../views/tabbars/Search.vue'
import Cart from '../views/tabbars/Cart.vue'
import My from '../views/tabbars/My.vue'
<<<<<<< HEAD
<<<<<<< HEAD
// 导入 提交订单 列表组件
import Order from '../views/orders/Order.vue'
// 导入 地址列表 组件
import Addresslist from '../views/orders/Addresslist.vue'
// 导入 添加地址 组件
import Address from '../views/orders/Address.vue'
=======
import GoodsList from '../views/tabbars/GoodsList.vue'
import GoodsListNull from '../views/tabbars/Null.vue'
>>>>>>> cates

=======
import Goods_List from '../views/goods/Goods_List.vue'
import Goods_Detail from '../views/goods/Goods_Detail.vue'
>>>>>>> search
Vue.use(VueRouter)

const routes = [{
<<<<<<< HEAD
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
<<<<<<< HEAD
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
=======
  }, {
    path: '/goods_list/:goodList',
    name: '商品列表',
    component: Goods_List
  }, {
    path: '/goods_detail/:goodDetail',
    name: '商品详情',
    component: Goods_Detail
  },]
>>>>>>> search
=======
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
    }, {
        path: '/goods_list',
        name: '商品列表',
        component: GoodsList
    }, {
        path: '/goods_list/null',
        name: '零商品列表',
        component: GoodsListNull
    }]
>>>>>>> cates
}]

const router = new VueRouter({
    routes
})
<<<<<<< HEAD
router.afterEach((to, from) => {
  if(to.path == '/home') {
    to.params.ifHome = true
  }
})
=======
// 重置页面滚动条位置
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

>>>>>>> search
export default router
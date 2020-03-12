<template>
  <div>
<<<<<<< HEAD
    <van-nav-bar title="精品优购" fixed :left-arrow="this.$route.params.ifHome?false:true" :left-text="this.$route.params.ifHome?'':'返回'" @click-left="goBack"/>
=======
    <van-nav-bar title="精品优购" fixed/>
    <div class="big"></div>
>>>>>>> cates
    <!-- index 下级所有组件的路由占位符 -->
    <div class="topbar"></div>
    <router-view></router-view>
    <van-tabbar v-model="active" active-color="#d81e06" route> 
      <van-tabbar-item to="/home">
        <span>首 页</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_home : icon.inactive_home"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/cates">
        <span>分 类</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_cates : icon.inactive_cates"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/search">
        <span>搜 索</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_search : icon.inactive_search"
        />
      </van-tabbar-item>
      <van-tabbar-item :info="totalGoods" to="/cart">
        <span>购物车</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="props.active ? icon.active_cart : icon.inactive_cart"
        />
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <span>我 的</span>
        <img slot="icon" slot-scope="props" :src="props.active ? icon.active_my : icon.inactive_my" />
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>

export default {
  data() {
    return {
      //选中状态绑定值
      active: 0,
      // 主骨架图标
      icon: {
        active_home: "/icons/home-active.png",
        inactive_home: "/icons/home.png",
        active_cates: "/icons/cates-active.png",
        inactive_cates: "/icons/cates.png",
        active_search: "/icons/search-active.png",
        inactive_search: "/icons/search.png",
        active_cart: "/icons/cart-active.png",
        inactive_cart: "/icons/cart.png",
        active_my: "/icons/my-active.png",
        inactive_my: "/icons/my.png"
      },
      totalGoods: 0,
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  },
  created() {
        this.localObj = JSON.parse(window.localStorage.getItem("cartList"));
    
    for (const key in this.localObj) {
      this.totalGoods++;
    }
  },
};
</script>

<style lang="less" scoped>
<<<<<<< HEAD
.topbar {
  height: 46px;
=======
.big{
  height: 46px;

>>>>>>> cates
}
</style>
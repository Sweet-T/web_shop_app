<template>
  <div class="body">
    <van-swipe
      class="my-swipe"
      :autoplay="show ? 300000 : 3000"
      indicator-color="white"
      height="350"
      @change="getIndex"
    >
      <van-swipe-item v-for="(item,i) in swipePics" :key="i">
        <img :src="item.pics_mid_url" alt @click="picView" />
      </van-swipe-item>
    </van-swipe>
    <div class="detail_price">￥{{goodsDetail_list.goods_price}}.00</div>

    <van-row class="goods_info">
      <van-col span="20" class="boder-r">{{goodsDetail_list.goods_name}}</van-col>
      <van-col span="4">
        <div class="collect" @click="collect">
          <van-goods-action-icon icon="star" :color="collected ?' #ff5000' :'#cccccc'" />
        </div>
        <div class="collect">收藏</div>
      </van-col>
    </van-row>

    <!-- 购物车 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" />
      <van-goods-action-icon icon="cart-o" text="购物车" :info="cartCount" @click="toCart" />
      <van-goods-action-icon icon="shop-o" text="店铺" />
      <van-goods-action-button
        type="warning"
        text="加入购物车"
        @click="addCart(goodsDetail_list.goods_id)"
      />
      <van-goods-action-button type="danger" text="立即购买" to="/cart" />
    </van-goods-action>

    <van-coupon-cell @click="showList = true" />
    <!-- 选择送货地址 -->
    <!-- <van-row class="address">
      <van-col span="16" class="adsInfo">请选择送货地址</van-col>
      <van-col span="8" class="arrow-r">
        <van-icon name="arrow" />
      </van-col>
    </van-row>-->

    <!-- 优惠券列表 -->
    <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
      <van-coupon-list @change="onChange" />
    </van-popup>
    <van-tabs v-model="activeName">
      <van-tab title="图文详情" name="a">
        <div v-html="goodsDetail_list.goods_introduce"></div>
      </van-tab>
      <van-tab title="规格参数" name="b">
        <van-cell-group>
          <van-cell
            :title="item.attr_name"
            :value="item.attr_vals"
            v-for="(item,i) in  goods_attr"
            :key="i"
          />
        </van-cell-group>
      </van-tab>
    </van-tabs>

    <!-- 图片展示 -->
    <van-image-preview v-model="show" :images="images" :start-position="current">
      <!-- <template v-slot:index>第{{ current+1 }}页</template> -->
    </van-image-preview>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      images: [],

      //点击轮播图当前图片索引
      current: 0,
      //优惠券的显示与隐藏
      showList: false,
      //商品详情数据
      goodsDetail_list: {},
      activeName: "",
      //购物车总数
      cartCount: 0,
      // 轮播图数据
      swipePics: [],
      //添加到购物车的信息
      cartObj: {},
      //商品属性
      goods_attr: [],
      //收藏按钮
      collected: false
    };
  },
  methods: {
    //点击图片时预览图片
    getIndex(index) {
      //   console.log(index);
      //当前索引
      this.current = index;
    },
    //图片浏览
    picView() {
      this.show = !this.show;
      //   console.log(this.picsViewUrl);
    },
    onChange() {
      this.showList = false;
    },
    // 点击添加购物车
    addCart(id) {
      if (this.cartObj[id]) {
        this.cartObj[id][0]++;
        this.cartObj[id][1] = true;
      } else {
        this.cartObj[id] = [1, true];
        this.cartCount++;
      }
      window.localStorage.setItem("cartList", JSON.stringify(this.cartObj));
    },
    toCart() {
      this.$router.push("/cart");
    },
    // 收藏
    collect() {
      this.collected = !this.collected;
      console.log(this.collected);
      if (this.collected) {
        this.$toast.success("收藏成功");
      }else {
        this.$toast.fail("已取消收藏");
      }
    }
  },
  async created() {
    // console.log(this.goodsDetail_list);
    // this.images = this.picsViewUrl;
    //保存购物车信息在本地
    if (!window.localStorage.getItem("cartList")) {
      window.localStorage.setItem("cartList", JSON.stringify({}));
    }
    this.cartObj = JSON.parse(window.localStorage.getItem("cartList"));
    for (const key in this.cartObj) {
      this.cartCount++;
    }
    // console.log(window.localStorage.getItem("cartList"));
    let id = this.$route.params.goodDetail - 0;
    console.log(id);
    let { data: res } = await this.$http.get("/goods/detail", {
      params: {
        goods_id: id
      }
    });
    if (res.meta.status !== 200) {
      return this.$toast("获取失败");
    }
    this.swipePics = res.message.pics;
    this.goodsDetail_list = res.message;
    // console.log(this.swipePics);
    console.log(this.goodsDetail_list);
    this.goods_attr = res.message.attrs;
    console.log(this.goods_attr);
    //   console.log(res.message.pics);
    res.message.pics.forEach(item => {
      this.images.push(item.pics_big_url);
    });
  },
  computed: {}
};
</script>
<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #ffffff;
  img {
    width: 100%;
    height: 100%;
  }
}

.detail_price {
  font-size: 22px;
  color: #ff0000;
  height: 60px;
  line-height: 60px;
  padding-left: 15px;
}
.collect {
  font-size: 14px;
  text-align: center;
}
.boder-r {
  border-right: 1px solid #ccc;
  font-size: 14px;
  font-weight: 700;
}
.goods_info {
  padding: 0 15px;
  font-size: 15px;
  color: #3c3c3c;
  border-right: 1px solid #ccc;
}
.van-goods-action {
  z-index: 999;
  overflow: hidden;
}
.address {
  padding: 20px 15px;
  .arrow-r {
    text-align: right;
  }
  .adsInfo {
    font-size: 13px;
  }
}
</style>
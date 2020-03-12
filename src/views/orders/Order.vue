<template>
  <div>
    <div class="add" v-if="Object.keys(address).length === 0">
      <van-button
        type="primary"
        icon="plus"
        :to="'/addresslist/'+JSON.stringify([orderList,address])"
      >添加地址</van-button>
    </div>
    <div class="add" v-else>
      <van-nav-bar :title="'收货人：'+address.name +'\t 电话：'+address.tel" right-arrow @click-right="onClickRight">
        <van-icon name="arrow" slot="right" />
      </van-nav-bar>
      <h4 style="color: #333;margin:auto;line-height:50px">{{address.address}}</h4>
    </div>
    <div class="slide"></div>
    <van-list :finished="finished" finished-text="没有更多了">
      <van-cell v-for="item in orders" :key="item.goods_id">
        <van-card
          :title="item.goods_name"
          :num="''+item.count"
          class="goods-card"
          :thumb="item.pics[0].pics_sma"
        >
          <div slot="price">￥{{item.goods_price}}</div>
        </van-card>
      </van-cell>
    </van-list>
    <van-submit-bar button-text="登录后提交订单" @submit="onSubmit" />
  </div>
</template>

<script>
import Bus from "../../components/Bus";
export default {
  data() {
    return {
      orderList: {},
      orders: [],
      finished: false,
      address: {}
    };
  },
  methods: {
    async getOrders() {
      console.log(this.orderList);
      for (const key in this.orderList) {
        const { data: res } = await this.$http.get("/goods/detail", {
          params: {
            goods_id: key
          }
        });
        if (res.meta.status !== 200) return this.$notify(res.meta.msg);
        // 在返回的数据对象上添加属性count(数量)
        res.message.count = this.orderList[key];
        this.orders.push(res.message);
      }
      console.log(this.orders);
      this.finished = true;
    },
    onSubmit() {
      this.$notify({ type: "primary", message: "请先登录！" });
    },
    onClickRight() {
      this.$router.push(`/addresslist/${JSON.stringify([this.orderList,this.address])}`)
    }
  },
  created() {
    const list = JSON.parse(this.$route.params.order);
    this.orderList = list[0];
    this.address = list[1];
    this.getOrders();
    console.log(list);
    console.log(this.address);
  }
};
</script>

<style lang="less" scoped>
.add {
  height: 100px;
  display: flex;
  flex-wrap: wrap;
  .van-button {
    margin: auto;
  }
  .van-nav-bar {
    flex: 1;

    background-color: #fff !important;
  }
  .van-nav-bar__title {
    color: #333 !important;
    max-width: unset;
  }
}
.slide {
  height: 7.5px;
  background: url(/images/cart_border@2x.png);
}
.van-submit-bar__button {
  height: 100%;
  width: 100%;
}
.van-button--round {
  border-radius: 0;
}
.van-submit-bar__bar {
  padding: 0;
}
</style>
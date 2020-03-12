<template>
  <div>
    <van-card
      v-for="item in goods_List"
      :key="item.goods_id"
      :num="item.goods_number"
      :price="item.goods_price+'.00'"
      :title="item.goods_name"
      class="goods-card"
      :thumb="item.goods_small_logo"
      @click="goGoodsDetail(item.goods_id)"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      //接收图片地址
      viewUrl: [],
      goodsValue: "",
      goods_List: [],

    };
  },
  async created() {
    this.goodsValue = this.$route.params.goodList;
    let { data: res } = await this.$http.get("/goods/search", {
      params: { query: this.goodsValue}
    });
    if (res.meta.status !== 200) {
      return this.$toast("获取失败");
    }
    console.dir(res.message.goods);
    this.goods_List = res.message.goods;
    // console.log(this.goodsValue);
  },
  methods: {
    async goGoodsDetail(id) {
      this.$router.push(`/goods_detail/${id+''}`);
    }
  },
  computed: {

  }
};
</script>
<style lang="less" scoped>
.van-card__title {
  font-size: 13px;
}
.van-card__price {
  color: red;
}
</style>
<template>
  <div>
    <van-card :num="total" :price="good_price" :title="good_name" :thumb="good_small_logo" @click="goDetails(good_id)"/>
    <div class="kongbai">
      <span>❤小主，没有更多咯❤</span>
    </div>
    <section></section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: "",
      cid: 0,
      pagenum: 1,
      pagesize: 20,
      goodslist: [],
      total: 0,
      good_price: 0,
      good_name: "",
      good_small_logo: "",
      good_id: 0
    };
  },
  created() {
    this.query = this.$route.query.query || "";
    this.cid = this.$route.query.cid || "";
    this.getURLParams();
  },
  methods: {
    async getURLParams() {
      // console.log(this.cid);
      const { data: res } = await this.$http.get("/goods/search", {
        params: {
          query: this.query,
          cid: this.cid,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      console.log(res)
      if(res.message.total===0){
        this.$router.push('/goods_list/null')
      }else{
      this.total = res.message.total;
      this.goodslist = res.message.goods;
      await this.goodslist.forEach((item, index) => {
        this.good_price = item.goods_price;
        this.good_name = item.goods_name;
        this.good_small_logo = item.goods_small_logo;
        this.good_id = item.goods_id
      });
      }
    },
    goDetails(id) {
      this.$router.push(`/goods_detail/${id}`)
    }
  }
};
</script>

<style lang="less" scoped>
.van-card__price {
  color: #ff3300;
}
.van-card__title {
  font-size: 15px;
  color: #808080;
}
.van-card__num {
  font-size: 15px;
  color: #ffb3a7;
}
.kongbai {
  height: 90px;
  line-height: 90px;
  text-align: center;
  font-family: '黑体';
  font-size: 14px;
  color: #c2ccd0;
}
section{
  height: 80px;
  background-color: #FAFAFA;
}
</style>


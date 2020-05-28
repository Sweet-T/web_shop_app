<template>
  <div>
    <!-- immediate-check属性解决首次加载就把finished=true的问题 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没更多啦"
      @load="onLoad"
      :offset="60"
      :immediate-check="false"
    >
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
    </van-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      querywords: '',
      cateid: '',
      pagenumber: 1,
      goods_List: [],
      total: 0,
      // 是否处于加载状态，加载过程中不触发load事件
      loading: false,
      // 是否已加载完成，加载完成后不再触发load事件！！！
      finished: false
    }
  },
  async created() {
    // 判断是分类点过来的，还是搜索页或者首页点过来的
    // 分类点过来的this.$route.query.cid 存在 就会执行else if 对分类id进行赋值
    // 搜索页点过来的，this.$route.query.querywords就存在 执行if 对关键字赋值
    if (this.$route.query.querywords) {
      this.querywords = this.$route.query.querywords
    } else if (this.$route.query.cid) {
      this.cateid = this.$route.query.cid
    }
    console.log(
      `查询关键字是${this.querywords}`,
      `分类id是${this.cateid}`,
      `当前页码是${this.pagenumber}`
    )
    // 调用获取商品列表的方法 传入关键字，分类id,页码
    this.getGoodsList(this.querywords, this.cateid, this.pagenumber)
  },
  methods: {
    // 点击商品列表中的某个商品时，转跳到对应的商品详情页
    // （路由中携带商品id，以便在/goods_detail路由中拿到需要渲染的商品id）
    async goGoodsDetail(id) {
      this.$router.push(`/goods_detail/${id + ''}`)
    },
    // 定义获取商品列表的方法,此方法有三个参数
    // querywords是搜索关键字  主要对应首页和搜索页的转跳
    // 表现形式为 /goods_list?querywords=XXX XXX就是关键字
    // cateid是分类id 是分类页转跳到对应分类列表页需要携带的路由参数
    // 表现形式为 /goods_list?cid=XXX
    // pagenumber是当前页，默认为1   每页展示为20条商品
    async getGoodsList(querywords, cateid, pagenumber) {
      // 请求返回的是一个Promise,使用ES7语法async/await进行转化为结果对象,
      // 这个对象中的data属性是我们需要的数据，重命名data为res
      const { data: res } = await this.$http.get('/goods/search', {
        params: {
          query: querywords,
          cid: cateid,
          pagenum: pagenumber
        }
      })

      if (res.meta.status !== 200) {
        return this.$toast('获取失败')
      }
      // 请求成功 则将新请求过来的数据追加到商品列表中
      this.goods_List.push(...res.message.goods)
      this.total = res.message.total
      // 此时请求结束并且数据同步完成了 
      // 可以重新触发onLoad事件 继续加载数据，
      // 所以设置loading=false，即可以进入onLoad事件
      this.loading = false
    },
    // onLoading会在
    onLoad() {
      // 当滚动到第一页尾部时执行（滚动条触底时）
      if (this.total / 20 > this.pagenumber) {
        // 一旦满足以上判断 则说明还有下一页数据可以请求，
        // 则设置处于加载状态，避免重复请求（节流），
        // 这样在this.loading设置为false之前，不能再进入onLoad事件
        this.loading = true
        // 让请求的页码加1
        this.pagenumber++
        // 请求下一页数据  因为此时的pagenumber已经设置为+1页了
        this.getGoodsList(this.querywords, this.cateid, this.pagenumber)
      }else {
        // 加载到最大页数 没有下一页时，设置finished=true,
        // 则不会再进入onLoad事件，并且底部文字显示为加载完成
        this.finished = true
      }
    }
  },
  computed: {}
}
</script>
<style lang="less" scoped>
.van-card__title {
  font-size: 13px;
}
.van-card__price {
  color: red;
}
// 解决tabbar遮挡列表，显示不全的问题
.van-list {
  padding-bottom: 60px;
}
</style>
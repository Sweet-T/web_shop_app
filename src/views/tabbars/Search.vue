<template>
  <div>
    <form action="/">
      <van-search
        v-model="search_searchContent"
        show-action
        placeholder="牛奶"
        @search="onSearch"
        @cancel="onCancel"
        @input="inputChange"
      />
    </form>

    <van-list finished-text="没有更多了">
      <van-cell
        v-for="item in search_list"
        :key="item.goods_id"
        :title="item.goods_name"
        @click="toDetail(item.goods_id)"
      />
    </van-list>
    <van-row type="flex" justify="space-between">
      <van-col span="8" class="historyText">历史记录：</van-col>
      <van-col span="8" class="deleteIcon">
        <van-icon name="delete" @click="delteHistory" />
      </van-col>
    </van-row>
    <van-tag v-for="(item,i) in search_history" :key="i" @click="clickHistory(item)">{{item}}</van-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //搜索框搜索内容
      search_searchContent: "",
      //输入框发生变化时获取到的列表信息
      search_list: [],
      //商品列表
      search_goodslist: [],
      loading: false,
      finished: false,
      //搜索历史记录
      search_history: [],
      //接收图片地址
      viewUrl: []
    };
  },
  created() {
    //如果localsorage不存在
    if (!window.localStorage.getItem("history")) {
      window.localStorage.setItem("history", JSON.stringify([]));
    }
    this.search_history = JSON.parse(window.localStorage.getItem("history"));
    // console.log(this.search_history);
  },
  computed: {},
  methods: {
    // 点击确定或者敲下回车时触发
    async onSearch() {
      //当输入框为空时默认发送牛奶请求
      if (this.search_searchContent.trim() == "") {
        this.search_searchContent = "牛奶";
        let { data: res } = await this.$http.get("/goods/search", {
          params: { query: this.search_searchContent }
        });
        console.log(res.message.goods);

        this.search_goodslist = res.message.goods;
        // this.$store.commit("searchList", this.search_goodslist);
        this.$router.push(`/goods_list/${this.search_searchContent}`);
      } else {
        //输入框不为空时
        this.getGoodsList();
        this.search_history = JSON.parse(
          window.localStorage.getItem("history")
        );
        //当localstorage里面有相同的历史记录就不会追加
        if (
          !this.search_history.some(x => {
            return x == this.search_searchContent;
          })
        ) {
          this.search_history.push(this.search_searchContent);
        }
        window.localStorage.setItem(
          "history",
          JSON.stringify(this.search_history)
        );
      }
      // console.log(window.localStorage.getItem("history"));
    },
    // 根据关键字搜索
    async getList() {
      let { data: res } = await this.$http.get(
        "goods/qsearch?query=" + this.search_searchContent
      );
      // console.log(res.message);
      this.search_list = res.message;
    },
    //根据关键字商品列表搜索并且跳转到goods_list页面
    async getGoodsList() {
      let { data: res } = await this.$http.get("/goods/search", {
        params: { query: this.search_searchContent }
      });
      if (res.meta.status !== 200) {
        return this.$toast("获取失败");
      }
      console.dir(res.message.goods);
      this.search_goodslist = res.message.goods;
      // this.$store.commit("searchList", this.search_goodslist);
      this.$router.push(`/goods_list/${this.search_searchContent}`);
      // console.log(this.search_goodslist);
    },
    // 点击取消时触发
    onCancel() {
      this.search_searchContent == "";
      this.search_list = [];
    },
    // 当输入框发生变化时
    inputChange() {
      this.getList();
    },
    //当点击历史记录时
    clickHistory(item) {
      this.search_searchContent = item;
      this.getGoodsList();
    },
    // 点击删除历史记录时
    delteHistory() {
      // 先清空本地存储
      window.localStorage.removeItem("history");
      // 再将历史数组清空
      this.search_history = [];
      // 需要刷新一下，不然再次输入不会添加
      location.reload();
    },

    // 点击输入框变化时的列表导航跳转
    async toDetail(id) {
      let { data: res } = await this.$http.get("/goods/detail", {
        params: {
          goods_id: id
        }
      });
      if (res.meta.status !== 200) {
        return this.$toast("获取失败");
      }
      console.log(res.message);
      //   console.log(res.message.pics);
      // res.message.pics.forEach(item => {
      //   this.viewUrl.push(item.pics_big_url);
      // });
      // console.log(this.viewUrl);
      this.$router.push(`/goods_detail/${id + ""}`);
    }
  }
};
</script>

<style lang="less" scoped>
.deleteIcon {
  text-align: right;
  padding-right: 10px;
}
.historyText {
  padding-left: 15px;
  color: #6c6c6c;
}
.van-tag {
  margin: 5px 0px 5px 15px;
}
</style>
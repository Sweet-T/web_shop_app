<template>
  <div>
    <!-- //使用van-tree-select将分类展示 -->
    <van-tree-select :items="items" :main-active-index.sync="active" @click-nav="rightChanged">
      <!-- 右侧展示内容 -->
      <template slot="content">
        <div v-for="(item1,i) in right" :key="i">
          <!-- 二级名称 -->
          <li class="cat_two_name">/{{item1.cat_name}}/
          <!-- 三级图标 -->
          <van-grid :border="false" :column-num="3" :gutter="4">
            <van-grid-item v-for="(item2,i) in item1.children" :key="i" :icon="item2.cat_icon" :text="item2.cat_name" :to="{path:'goods_list',query:{cid:item2.cat_id}}">
          
            </van-grid-item>
          </van-grid>
          </li>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  data() {
    return {
      active: 0,
      activeIndex: 0,
      items: [],
      cateslist: [],
    };
  },
  created() {
    this.getCatesList();
  },
  methods: {
    async getCatesList() {
      const { data: res } = await this.$http.get("/categories");
      if (res.meta.status !== 200) {
        console.log("获取分类数据失败了");
      }
      this.cateslist = res.message;
      // console.log(this.cateslist);
      await this.cateslist.forEach((item, index) => {
        this.items.push({
          text: item.cat_name,
          cat_id: item.cat_id,
          children: item.children,
        });
      });
    },
    rightChanged(index) {
      this.activeIndex = index;
    },
  },
  computed: {//这里为什么要用到computed监听，原因就是:computed是计算属性，而当前左侧项的activeIndex是一直在变化，当每次页面刷新的时候，他还是要返回原来的0,用watch不行，watch是监听行为的。
    right() {
      if (this.cateslist.length !== 0) {
        let array = this.cateslist[this.activeIndex].children;
        return array;
      } else {
        return "获取子数组失败";
      }
    }
  }
};
</script>

<style lang="less" scoped>
.van-tree-select__content{
  height: 1000px;
  padding-bottom:50px;
  margin-left: 80px;
}
.van-tree-select__nav {
  height: 1000px;
  position: fixed;
  z-index: 1;
}
.cat_two_name {
  color: #3c3c3c;
  font-weight:700;
  font-size: 18px;
  text-align: center;
  letter-spacing: 0.3em;
}
</style>
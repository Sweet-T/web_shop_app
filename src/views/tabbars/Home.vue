<template>
  <div>
    <!-- 轮播图区域 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.image_src" class="lunbo" />
      </van-swipe-item>
    </van-swipe>
    <!-- 分类导航区域 -->
    <van-grid type="flex">
      <van-grid-item justify="space-around" v-for="(item,i) in catitems" :key="i" class="fenleiLi">
        <a href="javascript:;">
          <van-image :src="item.image_src"></van-image>
        </a>
      </van-grid-item>
    </van-grid>
    <!-- 楼层导航区域 -->
    <div>
      <div class="yige" v-for="(item,i) in floordata" :key="i">
        <van-image :src="item.floor_title.image_src"></van-image>
        <van-row class="floorImgs">
          <van-col span="8" v-for="(a, j) in item.product_list" :key="j">
            <van-image
              :src="item.product_list[j].image_src"
              :width="item.product_list[j].image_src/2"
              cover
            ></van-image>
          </van-col>
          <!-- <van-col span="8">
            <van-image
              :src="item.product_list[1].image_src"
              :width="item.product_list[1].image_src/2"
            ></van-image>
          </van-col>
          <van-col span="8">
            <van-image
              :src="item.product_list[3].image_src"
              :width="item.product_list[3].image_src/2"
            ></van-image>
          </van-col>
          <van-col span="8">
            <van-image
              :src="item.product_list[2].image_src"
              :width="item.product_list[2].image_src/2"
            ></van-image>
          </van-col>
          <van-col span="8">
            <van-image
              :src="item.product_list[4].image_src"
              :width="item.product_list[4].image_src/2"
            ></van-image>
          </van-col> -->
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created() {
    // 获取轮播图图片数据
    const { data: res } = await this.$http.get('/home/swiperdata')
    this.images = res.message
    // console.log(res)

    // 获取分类导航数据
    const { data: catitems } = await this.$http.get('/home/catitems')
    // console.log(catitems)
    this.catitems = catitems.message

    // 获取楼层导航信息
    const { data: floordata } = await this.$http.get('/home/floordata')
    this.floordata = floordata.message
    console.log(this.floordata)
  },
  data() {
    return {
      images: [], //轮播图的数据
      catitems: [], //分类导航的数据
      floordata: [] //楼层导航数据
    }
  }
}
</script>

<style lang="less" scoped>
.lunbo {
  width: 100%;
  height: 100%;
}
.fenleiLi {
  img {
    width: 128/2px;
    // height: 140/2px;
  }
}

.floorImgs {
  padding: 0 5px;
}
</style>
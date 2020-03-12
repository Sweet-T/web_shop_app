<template>
  <div>
    <!-- 头部面板 -->
    <van-panel title="购物车列表" icon="shop-o"></van-panel>
    <!-- 商品滑块部分 -->
    <div :class="cartList.length == 0 ? 'cart_empty' : ''">
      <van-checkbox-group v-model="checkedList" ref="checkboxGroup" @change="stateChange">
        <van-swipe-cell v-for="item in cartList" :key="item.goods_id">
          <van-row>
            <van-col span="2">
              <van-checkbox
                checked-color="#d81e06"
                :name="''+item.goods_id"
                @click="checkedChange(item.goods_id,item.ifChecked)"
              ></van-checkbox>
            </van-col>
            <van-col span="22">
              <van-card
                :title="item.goods_name"
                class="goods-card"
                :thumb="item.pics[0].pics_sma"
                @click-thumb="goDetail(item.goods_id)"
              >
                <div slot="num">
                  <van-stepper
                    v-model="item.count"
                    integer
                    min="1"
                    max="99"
                    @change="onChange(item.goods_id,item.count)"
                  />
                </div>
                <div slot="price">￥{{item.goods_price}}</div>
              </van-card>
            </van-col>
          </van-row>
          <template slot="right">
            <van-button
              square
              type="danger"
              text="删除"
              class="delete-button"
              @click.self="deleteGoods(item.goods_id)"
            />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
    </div>

    <!-- 全选 提交订单 按钮 -->
    <van-submit-bar
      :price="total"
      button-text="提交订单"
      @submit="onSubmit"
      :disabled="checkedList.length==0?true:false"
    >
      <van-checkbox
        v-model="checkedAll"
        @click="checkAll"
        checked-color="#d81e06"
        ref="allChecked"
      >全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      checkedAll: false,
      // 存储选中的项目
      checkedList: [],
      value: [],
      // 购物车商品列表
      cartList: [],
      // localstorage中存储的数据
      localObj: {},
      // 历史记录
      historys: [],
      // 总价
      total: 0,
      // 单价列表
      prices: {},
      // 购物车中总商品数（不是数量）
      totalGoods: 0
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push(`/goods_detail/${id}`)
    },
    // 点击提交订单按钮
    onSubmit() {
      // 清空选中的商品
      let orders = {}
      for (const key in this.localObj) {
        if (this.localObj[key][1]) {
          orders[key] = this.localObj[key][0]
          // 删除并同步本地数据
          delete this.localObj[key]
          window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
        }
      }
      console.dir(orders)
      // 转跳到提交订单页面
      this.$router.push(`/order/${JSON.stringify([orders, {}])}`)
    },
    async getCartList() {
      for (const key_id in this.localObj) {
        const { data: res } = await this.$http.get('/goods/detail', {
          params: {
            goods_id: key_id
          }
        })
        if (res.meta.status !== 200) return this.$notify(res.meta.msg)
        // 在返回的数据对象上添加属性count(数量)
        res.message.count = this.localObj[key_id][0]
        // 在返回的数据对象上添加属性ifChecked(是否选中)
        res.message.ifChecked = this.localObj[key_id][1]
        // 以对象形式 {goods_is:单价} 存储所有的对应商品的价格
        this.prices[res.message.goods_id] = res.message.goods_price
        // 初始化选中状态的商品
        // -- van-checkbox-group上的 v-model 绑定的属性checkedList进行同步
        if (this.localObj[key_id][1]) {
          this.checkedList.push(key_id)
        }
        // 初始化购物车列表模板的数据源
        this.cartList.push(res.message)
        console.log(this.cartList)
      }
    },
    // 当商品数量发生变化
    onChange(id, count) {
      console.log(count)
      this.localObj[id][0] = count
      console.log(this.localObj)
      window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
      // 调用勾选状态改变逻辑 -- 进行总价的变更
      this.stateChange()
    },
    // 当每个复选框被点击时
    checkedChange(id, ifChecked) {
      console.log(ifChecked)
      console.log(this.checkedAll)
      this.localObj[id][1] = !ifChecked
      window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
      location.reload()
    },
    // 当复选框（数）组  选中状态发生改变时
    stateChange() {
      this.total = 0
      this.checkedList.forEach(item => {
        this.total += this.localObj[item][0] * this.prices[item] * 100
      })
      console.log(this.checkedList.length, this.totalGoods)
      // 当选中数量和localstorage中存储的数据项数目相等时 全选按钮被勾选
      if (this.checkedList.length == this.totalGoods) {
        this.$refs.allChecked.toggle(true)
      } else {
        this.$refs.allChecked.toggle(false)
      }
    },
    // 当点击全选按钮
    checkAll() {
      this.checkedAll = !this.checkedAll
      // 如果全选按钮选中
      if (this.checkedAll) {
        for (const key in this.localObj) {
          this.localObj[key][1] = true
        }
        window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
      } else {
        for (const key in this.localObj) {
          this.localObj[key][1] = false
        }
        window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
      }

      this.$refs.checkboxGroup.toggleAll(this.checkedAll)
      console.log(this.checkedAll)
      // 必须刷新才能重新渲染模板对应的值 === 本地的对应的值
      //  因为不是双向数据绑定的，不会实时更新
      location.reload()
    },
    // 事件要v-on.self修饰符修饰 只有本身触发生效
    deleteGoods(id) {
      delete this.localObj[id]
      window.localStorage.setItem('cartList', JSON.stringify(this.localObj))
      location.reload()
    }
    // toggleAll() {
    //   this.$refs.checkboxGroup.toggleAll();
    // }
  },
  computed: {},
  created() {
    if (!JSON.parse(window.localStorage.getItem('cartList'))) {
      window.localStorage.setItem('cartList', JSON.stringify({}))
    }
    // window.localStorage.setItem("cartList", JSON.stringify({ 542: [2,true],543: [1,true],544: [2,true],545: [1,true],546: [2,true],547: [1,true],548: [2,true],549: [1,true] }));
    this.localObj = JSON.parse(window.localStorage.getItem('cartList'))

    for (const key in this.localObj) {
      this.totalGoods++
    }
    this.getCartList()
    console.log(this.historys)
  }
}
</script>

<style lang="less" scoped>
.cart_empty {
  height: 400px;
  background: url(/images/cart_empty@2x.png) no-repeat center;
}
.delete-button {
  height: 100%;
}
.van-submit-bar {
  bottom: 50px;
}
.van-button--round {
  border-radius: 0;
}
.van-submit-bar__button--danger {
  background: #d81e06;
}
.van-submit-bar__bar {
  padding-right: 0;
}
.van-submit-bar__button {
  height: 100%;
}
.van-swipe-cell {
  .van-col {
    height: 105px;
    display: flex;
    .van-checkbox {
      margin: auto;
    }
    .van-card {
      width: 100%;
      padding-left: 0;
      .van-card__price {
        color: #d81e06;
        font-weight: 600;
      }
    }
  }
}
</style>
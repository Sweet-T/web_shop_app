<template>
  <div>
    <van-address-list
      v-model="chosenAddressId"
      :list="localAddress"
      default-tag-text="默认"
      @add="onAdd"
      @edit.self="onEdit"
      @select.self="chooseAddress"
    />
  </div>
</template>

<script>
import areaList from "../../../public/area.js";
export default {
  data() {
    return {
      chosenAddressId: '1',
      localAddress: [],
      orderList: {},
    }
  },
  methods: {
    onAdd() {
      this.$router.push('/address/{}')
    },
    // 当点击编辑按钮时
    onEdit(item,index) {
      console.dir(item)
      if(!item) {
        item = {};
      }
      item.id = index;
      this.$router.push(`/address/${JSON.stringify(item)}`)
    },
    // 当选中地址时
    chooseAddress(item) {
      this.$router.push(`/order/${JSON.stringify([this.orderList,item])}`)
    }
  },
  created() {
    if(!JSON.parse(window.localStorage.getItem('addresses'))) {
      window.localStorage.setItem('addresses',JSON.stringify([]));
    }
    this.localAddress = JSON.parse(window.localStorage.getItem('addresses'))
    this.orderList = JSON.parse(this.$route.params.data)[0]
  },
};
</script>

<style lang="less" scoped>
</style>
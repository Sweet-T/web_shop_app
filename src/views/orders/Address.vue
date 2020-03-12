<template>
  <div>
    <!-- 删除按钮需完善 -->
    <van-address-edit
      ref="editForm"
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      :address-info="editAddress"
    />
  </div>
</template>

<script>
import areaList from "../../../public/area.js";
export default {
  data() {
    return {
      areaList,
      searchResult: [],
      localAddress: [],
      savedLocal: {},
      editAddress: {},
    };
  },
  methods: {
    onSave(content) {
    //   console.dir(content);
      this.savedLocal.id = this.localAddress.length;
      this.savedLocal.name = content.name;
      this.savedLocal.tel = content.tel;
      this.savedLocal.address =
        content.province +
        content.city +
        content.county +
        content.addressDetail;
      this.savedLocal.postalCode = content.postalCode;
      this.savedLocal.isDefault = content.isDefault;
      this.savedLocal.province = content.province;
      this.savedLocal.city = content.city;
      this.savedLocal.county = content.county;
      this.savedLocal.addressDetail = content.addressDetail;
      this.savedLocal.areaCode = content.areaCode;
      this.savedLocal.country = content.country;

      this.localAddress.push(this.savedLocal);
      window.localStorage.setItem(
        "addresses",
        JSON.stringify(this.localAddress)
      );
      this.$router.push(`/addresslist/${JSON.stringify(this.savedLocal)}`);
    },
    onDelete(content) {
      // this.localAddress = this.localAddress.splice(this.editAddress.id)
      // console.log(this.editAddress)
      // window.localStorage.setItem(
      //   "addresses",
      //   JSON.stringify(this.localAddress)
      // );
      // this.$router.push(`/addresslist/${JSON.stringify(this.savedLocal)}`);
    }
  },
  created() {
    this.editAddress = JSON.parse(this.$route.params.data);
    this.localAddress = JSON.parse(window.localStorage.getItem("addresses"));
  }
};
</script>

<style lang="less" scoped>
</style>
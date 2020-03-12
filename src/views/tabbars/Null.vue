<template>
  <div class="big">
    <div class="small">
    <p>..(｡•ˇ‸ˇ•｡)… 这里什么都没有喔</p>
    <p>点击返回看看其他的叭(❁´◡`❁)*✲ﾟ*</p>
    </div>
    <div>
    </div>
    <van-button color="linear-gradient(to right, #f9906f, #ffb3a7)" @click="goBack">返回</van-button>
  </div>
</template>

<script>
export default {
  methods:{
    goBack(){
      this.$router.go(-2)
    }
  }
};
</script>

<style lang="less" scoped>
.big {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 160px;
  background: #fafafa;
  text-align: center;
  p{
    font-family: "黑体";
    font-weight: 400;
    margin-top: 10px;
    color: #f9906f;
  }
  .van-button{
    margin-top: 20px;
    width: 100px;
    height: 40px;
    line-height: 40px;
  }
}

</style>
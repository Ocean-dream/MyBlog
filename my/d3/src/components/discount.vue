<template>
  <div class="dis_bg">
    <div class="dis_box">
      <h3 style="font-size:1rem;">恭喜您成功申领巧虎特别权益</h3>
      <h3 style="font-size:1rem;">您的优惠券为:</h3>
      <p style="color:#00A0E9;font-size:2.1rem;font-weight:700;">{{discountContent}}</p>
      <p style="color:red;font-size:.8rem;width:74vw;text-align:left;padding-left:21vw;">有效期限:{{start}}-{{end}}</p>
      <p style="font-size:.8rem;width:55vw;text-align:left;padding-left:20vw;letter-spacing:.1rem;margin:0;line-height:1.5;">每账户限使用一次，请妥善保存券码并在有效期内及时使用，逾期不补</p>
    </div>
     <div class="cor_right">
       <img src="../assets/cron.png" alt="" style="height:2vh">
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      discountContent: '',
      start: '',
      end: ''
    }
  },
  created () {
    this.discountContent = this.$route.query.discountNum
    this.start = (this.$route.query.effectiveTime).replace(/-/g, '.')
    this.end = (this.$route.query.expirationTime).replace(/-/g, '.')
  },
  methods: {
  } 
}
</script>
<style lang="less" scoped>
.dis_bg {
  width: 100vw;
  height: 100vh;
  background:#fff url('../assets/discountf.png') no-repeat  top;
  background-size: contain;
  overflow: hidden;
  position: relative;
  .cor_right{
    position: absolute;
    bottom: 0;
    width: 95vw;
    text-align: center;
    h3{
      font-weight: normal;
      margin:0;
    }
  }
  .dis_box{
    position: absolute;
    width: 94vw;
    padding: 0 3vw;
    text-align: center;
    top:14%;
  }
}
</style>
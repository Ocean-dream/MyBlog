<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created () {
  }
}
</script>
<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #eee;
  min-height:100vh;
}
.van-tabbar{
  background: #129E7b;
  .van-tabbar-item{
    color: #fff;
  }
}
</style>

<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app'
}
</script>

<style lang="less">
#app{
    height: 100vh;
}
.el-select-dropdown{
    min-width:80px!important;
  }
.el-table{
  td{
    text-align: center;
    color:#333;
  }
}
.el-switch__core{
  width: 50px!important;
}
.el-pagination.is-background .btn-next, .el-pagination.is-background .btn-prev, .el-pagination.is-background .el-pager li{
  border: 1px solid #D2D2D2;
  background: #fff;
  border-radius: 4px;
}
.el-pagination button, .el-pagination span:not([class*="suffix"]){
  padding:0 6px;
  font-size: 12px;
}
.el-menu-item:hover{
  background: transparent !important;
}
.el-cascader-panel{
  height: 250px;
}
</style>

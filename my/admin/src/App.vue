<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html, body{
  width:100%;
  min-width: 1390px;
}
.el-message-box__btns .el-button{
  background:#129f77!important;
  border:0!important;
}
#app{
  width:100%;
  min-width: 1390px;
  height: 100%;
  background: #F0F2F5;
}
.el-card__body {
  padding:10px!important;
}
.el-table{
  font-size: 12px!important;
}
.el-input__inner{
  height: 33px!important;
  line-height: 33px!important;
}
.el-table th{
  background: #eeeeee9e!important;
}
.el-table td, .el-table th {
  padding: 3px!important;
}
.el-table td .cell, .el-table th .cell{
  text-align: center;
}
.el-tag {
  height: 22px!important;
  line-height: 22px!important;
}
.el-form-item__label{
  font-size: 11px!important;
}
.el-dialog__body{
  font-size: 12px!important;
}
.el-form-item{
  margin-bottom: 10px!important;
}
.all_title, .el-loading-text{
  color:#129F77!important;
}
 .el-loading-spinner .path{
   stroke: #129F77!important;
 }
.el-dialog__body{
  padding-top: 0!important;
}
.el-dialog__header{
  padding-bottom:0!important;
}
</style>

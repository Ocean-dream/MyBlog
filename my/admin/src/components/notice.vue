<template>
  <div class="text_title">
    <el-alert
      :title="title"
      type="warning"
      :closable="false"
      show-icon>
    </el-alert>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: '提示：'
    }
  }
}
</script>
<style scoped>
.text_title{
  margin: 0 0 10px 0;
}
.text_title >>> .el-alert__title{
  font-size: 7px;
}
.text_title >>> .el-alert--warning.is-light{
  background: #129F77;
  color: #fff;
}
.text_title  >>> .el-alert{
  padding: 4px 16px;
}
</style>

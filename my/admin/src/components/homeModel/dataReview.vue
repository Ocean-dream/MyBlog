<template>
  <div>
    <head-notice :title="title"></head-notice>
    <el-row>
      <el-card class="box-card">
        <h3>订单(webhook)</h3>
        <div class="insert">+</div>
      </el-card>
    </el-row>
    <el-row style="margin:30px 0;">
      <el-card class="box-card">
        <h3>销售(webhook)</h3>
        <div class="insert">+</div>
      </el-card>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <h3>分成(webhook)</h3>
        <div class="insert">+</div>
      </el-card>
    </el-row>
    <el-row style="margin:30px 0 0 0;">
      <el-card class="box-card">
        <h3>退款(webhook)</h3>
        <div class="insert">+</div>
      </el-card>
    </el-row>
  </div>
</template>
<script>
import headNotice from './../../components/notice.vue'
export default {
  components: {
    headNotice
  },
  data () {
    return {
      title: '提示：用于将业务数据温馨推送到第三方系统之中（计划中）'
    }
  }
}
</script>
<style scoped>
.box-card{
  height: 100px;
}
.insert{
  width:20px;
  height: 20px;
  line-height: 18px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 18px;
  color: #ccc;
  cursor: pointer;
}
</style>

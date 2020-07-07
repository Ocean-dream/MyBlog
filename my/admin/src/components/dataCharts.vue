<template>
  <el-table
    :data="data"
    stripe
    show-summary
    style="width: 100%">
    <el-table-column
      prop="ctime"
      label="日期"
      >
    </el-table-column>
    <el-table-column
      prop="count"
      label="数量（个）"
    >
    </el-table-column>
    <div slot="append">
      <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="data.length !== 0">
        <div class='sum_footer_unit center'>平均</div>
        <div class='sum_footer_unit'>{{Account}}</div>
      </div>
    </div>
  </el-table>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    },
    Account: {
      type: String,
      default: '0'
    }
  }
}
</script>
<style scoped>
.sum_footer{
  display:flex;
  display:-webkit-flex;
  line-height:25px;
  color:#606266;
}
.sum_footer_unit{
    flex-grow:1;
    -webkit-flex-grow:1;
    /* text-indent:10px; */
    text-align:center;
    font-size:12px;
}
.sum_footer_unit.center{
  /* text-align:center; */
}
.sum_footer.xiaoji{
  border-bottom:1px solid #EBEEF5;
}
</style>

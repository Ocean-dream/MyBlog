<template>
    <div class="calcu">
      <el-dropdown trigger="click">
        <el-button type="primary">
          快速统计<i class="el-icon-arrow-down el-icon--right"></i>
        </el-button>
        <el-dropdown-menu slot="dropdown" class="drop_con">
          <el-dropdown-item style="color:rgb(18, 159, 119)">
              <el-dropdown placement="top-end">
                <el-button style="border:0;">
                  收入类<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            <el-dropdown-menu slot="dropdown"  class="drop_son">
                <el-dropdown-item @click.native="computeSelectTotal()">总额</el-dropdown-item>
                <el-dropdown-item @click.native="computeSelectStoreTotal()">门店总收入</el-dropdown-item>
                <el-dropdown-item @click.native="computeSelectOperateTotal()">运营总收入</el-dropdown-item>
                <el-dropdown-item @click.native="computeSelectPlattamTotal()">平台总收入</el-dropdown-item>
            </el-dropdown-menu>
              </el-dropdown>
          </el-dropdown-item>
           <el-dropdown-item style="color:rgb(18, 159, 119)">
              <el-dropdown>
                <el-button style="border:0;">
                  比例类<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            <el-dropdown-menu slot="dropdown" class="drop_son">
                <el-dropdown-item>支付成功</el-dropdown-item>
                <el-dropdown-item>出货成功</el-dropdown-item>
                <el-dropdown-item>掉货成功</el-dropdown-item>
                <el-dropdown-item>退款类</el-dropdown-item>
            </el-dropdown-menu>
              </el-dropdown>
          </el-dropdown-item>
          <el-dropdown-item style="color:rgb(18, 159, 119)">
              <el-dropdown>
                <el-button style="border:0;">
                  导出类<i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
            <el-dropdown-menu slot="dropdown" class="drop_son">
                <el-dropdown-item @click.native="selectExport()">选择导出</el-dropdown-item>
            </el-dropdown-menu>
              </el-dropdown>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
</template>
<script>
export default {
  methods: {
    computeSelectTotal () {
      this.$emit('selectAllTotal')
    },
    computeSelectStoreTotal () {
      this.$emit('selectStoreTotal')
    },
    computeSelectOperateTotal () {
      this.$emit('selectOperateTotal')
    },
    computeSelectPlattamTotal () {
      this.$emit('selectPlattamTotal')
    },
    selectExport () {
      this.$emit('selectData')
    }
  }
}
</script>
<style scoped>
.drop_con >>> .el-dropdown-menu__item{
  padding:0 5px!important;
}
.drop_son >>>  .el-dropdown-menu__item{
  padding:0 8px!important;
}
</style>

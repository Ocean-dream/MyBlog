<template>
  <div v-if="isShowError" class="err_info">
    <el-collapse accordion>
      <el-collapse-item :title="title + '查看详情'">
        <div>{{content}}</div>
      </el-collapse-item>
    </el-collapse>
   <i class="close" @click="closeErr()">x</i>
  </div>
</template>
<script>
export default {
  props: {
    isShowError: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    content: {
      type: Object,
      default: () => {}
    }
  },
  mounted () {
  },
  methods: {
    closeErr () {
      this.$emit('closeError', this.isShowError)
    }
  }
}
</script>
<style scoped>
.err_info{
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: #FFF0F0;
  padding: 10px;
  border-radius: 6px;
}
.err_info >>> .el-collapse{
  border-top:0;
  border-bottom:0;
}
.err_info >>> .el-collapse-item__wrap{
  background: #FFF0F0;
  border-bottom: 0;
}
.err_info >>> .el-collapse-item__header {
  color: red;
  background: #FFF0F0;
  height: 24px;
  line-height: 24px;
  border-bottom: 0;
}
.err_info >>> .el-collapse-item__content{
  padding-bottom: 0;
  color:#e6923c;
}
.close{
  position: absolute;
  top: 0;
  right: 0;
  font-style: normal;
  color:#aaa;
  width: 15px;
  height: 15px;
  cursor: pointer;
}
</style>

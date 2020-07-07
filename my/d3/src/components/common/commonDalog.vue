<template>
       <el-dialog
            :append-to-body="append"
            :visible="isShow"
            :width="width"
            class="add_device"
            :before-close="handleClose"
            >
            <span slot="title" style="font-family: MicrosoftYaHei-Bold;font-size: 16px;color: #FFFFFF;letter-spacing: 1.9px;margin-left:40%;">{{headTitle}}</span>
            <h3>{{title}}</h3>
            <slot/>
            <span slot="footer" class="dialog-footer" v-show="isFooter">
                <el-button round @click="cancleDialog()" style="background:#fff;color:#333333;border-color:#333;">取 消</el-button>
                <el-button type="primary" round @click="submitMessage()">确 定</el-button>
            </span>
            </el-dialog>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    width: {
      type: String,
      default: '30%'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    isFooter: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    append: {
      type: Boolean,
      default: false
    },
    headTitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeDialog')
    },
    submitMessage () {
      this.$emit('submit')
    },
    cancleDialog () {
      this.$emit('cancleSonDialog')
    }
  }
}
</script>
<style lang="less" scoped>
  .add_device{
    /deep/.el-dialog__header{
        // padding: 20px 20px 23px;
        padding: 10px 20px 13px;
        background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);
        border-radius: 4px 4px 0 0;
        .el-dialog__headerbtn .el-dialog__close{
            color: #fff;
        }
    }
    /deep/.el-dialog__body{
        padding-top: 0;
    } 
    /deep/.el-dialog__footer{
        text-align: left;
        .el-button{
            background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);
            border-radius: 18px;
            color:#fff;
            padding:8px 23px;
        }
        .el-button--default{
            margin-left: 28%;
            margin-right:20%;
        }
    }
}
</style>
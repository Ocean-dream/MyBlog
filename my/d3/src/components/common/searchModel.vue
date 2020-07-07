<template>
  <div  class="device_sty">
     <div class="title">
       <span>{{title}}</span>
     </div>
      <div class="search" v-if="isShowSearch">
        <!-- <span>{{searchTitle}}搜索：</span> -->
        <el-input
          prefix-icon="el-icon-search"
          placeholder="请输入内容"
          v-model="searchValue"
          style="width:20%"
          @clear = "clearInput"
          clearable>
          </el-input>
          <el-button @click="searchSingle()">搜索</el-button>
          <el-button v-show="isAdd" @click="addDevice()" class="el-icon-plus" style="padding:12px 15px;">{{searchTitle}}添加</el-button>
      </div>
    </div>
</template>
<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false
    },
    isShowSearch: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default:''
    },
    searchTitle: {
      type: String,
      default: '设备'
    }
  }
  ,methods: {
    addDevice () {
      this.$emit('changeDevice')
    },
    searchSingle () {
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.searchValue
      }
      this.$emit('singleSearch', obj)
    },
    clearInput () {
       const obj = {}
      this.$emit('singleSearch', obj)
    }
  }
}
</script>
<style lang="less" scoped>
  .device_sty{
    margin-bottom:33px;
    .title{
       background: url('../../assets/title.png') no-repeat ;
       height: 20px;
       line-height: 5px;
       margin-left: 50%;
       margin-bottom:30px;
       margin-top:31px;
       transform: translateX(-20%);
       span{
          margin-left:65px;
          font-weight: 700;
          font-size: 24px;
          color: #333333;
          letter-spacing: 2.85px;
       }
    }
    .search{
      display:flex;
      span{
        width:7%;
        text-align: center;
        font-size: 14px;
      }
      /deep/.el-input{
        width:20%;
        height: 45px;
        margin:0 1%;
        .el-input__inner{
          background: #F2F7FF;
          border-radius: 42.5px;
          height: 45px;
          line-height: 45px;
        }
      }
      .el-button{
        background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);
        border-radius: 22.5px;
        color: #fff;
        padding: 12px 30px;
        margin-left: 20px;
      }
    }
  }
</style>
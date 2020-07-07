<template>
  <div class="cur_mach">
    <van-row>
      <p>设备信息</p>
    </van-row>
     <van-row>
      <van-col :span="12">
        <p>机器序列号：</p>
      </van-col>
      <van-col :span="12">
        <p>{{machineSn}}</p>
      </van-col>
    </van-row>
    <van-row>
      <van-col :span="12">
        <p>机器名称：</p>
      </van-col>
      <van-col :span="12">
        <p>{{machineName}}</p>
      </van-col>
    </van-row>
     <van-row>
       <van-col :span="12">
         <p>归属门店：</p>
       </van-col>
      <van-col :span="12">
        <p>{{belongStore}}</p>
      </van-col>
    </van-row>
    <van-row>
      <van-col :span="12">
        <p>机器状态：</p>
      </van-col>
      <van-col :span="12">
        <p>
          <van-switch v-model="checked" size="24px" inactive-color="#ccc" @change="stateChange()"/>
        </p>
      </van-col>
    </van-row>
    <van-row>
       <van-col :span="12">
         <p>验证状态：</p>
       </van-col>
      <van-col :span="12">
        <!-- <p v-if="isShowVerify === true" style="color:red;">开启</p> -->
        <van-tag v-if="isShowVerify === true" type="danger"  size="large" style="margin-top:2vh;">开启</van-tag>
        <van-tag v-if="isShowVerify === false" type="danger"  size="large" style="margin-top:2vh;">关闭</van-tag>
        <!-- <p v-if="isShowVerify === false" style="color:red;">关闭</p> -->
      </van-col>
    </van-row>
    <van-row>
      <div class="warm_info">
        <p>温馨提示：</p>
        <div style="margin-left:5%;">
          <p>1.补货操作前：请先关闭业务状态</p>
          <p>2.补货完成后：请再打开业务状态</p>
        </div>
      </div>
    </van-row>
    <van-row>
        <van-button type="primary" size="small" :disabled="checked === true ? true : false" @click="skipSupplyGoods()">进入补货</van-button>
    </van-row>
  </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
export default {
  data () {
    return {
      checked: '',
      belongStore: '',
      machineName: '',
      isShowVerify: '',
      machineSn: '',
      machineId: ''
    }
  },
  created () {
    this.getCurrentMachineInfo()
  },
  methods: {
    async getCurrentMachineInfo () {
      const sn = window.localStorage.getItem('machineSn')
      var serverUrl = window.localStorage.getItem('apiUrl')
      let accessId = window.localStorage.getItem('accesId')
      let accessSecret = window.localStorage.getItem('accessSecret')
      const url = genRequestGetUrl(serverUrl, 'machines', accessId, 'list_goods', { machine_sn: sn }, accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.belongStore = res.ret_data.orgs_info.store.cname
      this.machineName = res.ret_data.device_info.cname
      this.machineId = res.ret_data.device_info.id
      this.machineSn = res.ret_data.device_info.sn
      if (res.ret_data.device_info.status === 1) {
        this.checked = true
      }
      if (res.ret_data.device_info.verify === 1) {
        this.isShowVerify = true
      } else {
        this.isShowVerify = false
      }
    },
    skipSupplyGoods () {
      this.$router.push('/supplyGoods')
    },
    async stateChange () {
      var serverUrl = window.localStorage.getItem('apiUrl')
      let accessId = window.localStorage.getItem('accesId')
      let accessSecret = window.localStorage.getItem('accessSecret')
      if (this.checked) {
        const url = genRequestGetUrl(serverUrl, 'machines', accessId, 'biz_status_enable', { machine_id: this.machineId }, accessSecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
        this.$toast('状态开启成功')
      } else {
        const url = genRequestGetUrl(serverUrl, 'machines', accessId, 'biz_status_disable', { machine_id: this.machineId }, accessSecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
        this.$toast('状态关闭成功')
      }
    }
  }
}
</script>
<style lang="less" scope>
  .cur_mach{
    height: 100vh;
    background: #129E7b;
    overflow: hidden;
     .van-row{
        p{
          color: #fff;
          margin: 2vh;
          font-size: 5vw;
        }
        span{
          color:#fff;
          font-size: 3vw;
        }
        .warm_info{
          p{
            font-size: 3vw;
            margin-left: 2vw;
            text-align: left;
            color:greenyellow;
          }
        }
     }
  }
</style>

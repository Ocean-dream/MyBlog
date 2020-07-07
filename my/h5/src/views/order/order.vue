<template>
  <div class="order_content">
    <div class="order_logo">
      <van-card :centered ="true">
        <div slot="tags" v-show="isShowError === true">
          <img src="../../assets/timg.jpg">
          <p plain type="danger">订单已完成</p>
        </div>
        <div slot="tags" v-show="isShowError === false">
          <img src="../../assets/err.jpg">
          <p plain type="danger">订单完成，但出货异常</p>
        </div>
      </van-card>
    </div>
    <div class="order_detail">
      <van-row>商品信息</van-row>
      <div class="detail_show">
         <van-row gutter="20" v-for="(item, index) in goodList" :key="index">
          <van-col span="8">
            <img :src="item.goods_img_url_logo">
          </van-col>
          <van-col span="8">{{item.goods_cname}}</van-col>
          <van-col span="8" >
            <div style="line-height:2vh;padding-top:2vh;">
              <span><span style="color:#129E7b;">￥{{(item.pay_price / 100).toFixed(2)}}</span> X {{item.goods_number}}</span><br>
              <span :style="item.success_number > 0 ? 'font-size:3vw;color:#129E7b;' : 'font-size:3vw;'">出货成功：{{item.success_number}}</span><br>
              <span :style="item.failed_number > 0 ? 'font-size:3vw;color:red;' : 'font-size:3vw;'">出货失败：{{item.failed_number}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <van-row style="color:#129E7b;text-align:right;padding-right:2vw;">总价：{{total}}</van-row>
    </div>
    <div class="order_detail order_trade">
      <van-row>订单信息</van-row>
      <div class="order_num">
        <van-row style="font-size:4vw;">
          <van-col span="8">订单编号</van-col>
          <van-col span="16">{{tradeNo}}</van-col>
        </van-row>
      </div>
    </div>
    <div class="order_bottom">
      <van-grid clickable :column-num="isShowError === false ? 3 : 1">
        <van-grid-item text="客服反馈" v-show="isShowError === false" @click="isShowTicket = true"/>
        <van-grid-item text="返回首页"  to="/change"/>
         <van-grid-item
          text="关闭"
          @click="loginout()"
          >
          </van-grid-item>
      </van-grid>
    </div>
    <!-- 反馈 -->
    <van-dialog
      v-model="isShowTicket"
      title="反馈清单"
      :closeOnClickOverlay = true
      show-cancel-button
      @confirm ="submitTicket()"
      @close ="closeTicket()"
    >
    <van-row>
      <van-row style="text-align: left;font-size:3vw;margin:1vh 0;">请选择反馈类型</van-row>
      <van-radio-group v-model="radio" style="display:flex;font-size:3vw;justify-content: space-evenly;">
        <van-radio name="1" icon-size="10px">没出货</van-radio>
        <van-radio name="2" icon-size="10px">部分没出货</van-radio>
        <van-radio name="3" icon-size="10px">货品不对</van-radio>
        <van-radio name="4" icon-size="10px">质量有问题</van-radio>
        <van-radio name="9" icon-size="10px">其他</van-radio>
      </van-radio-group>
    </van-row>
      <van-field
        v-model="message"
        rows="3"
        autosize
        type="textarea"
        maxlength="100"
        placeholder="请输入反馈内容"
        show-word-limit
      />
    </van-dialog>
  </div>
</template>

<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import { rand } from '@/untils/untils.js'
export default {
  created () {
    this.getQueryString()
  },
  data () {
    return {
      radio: '',
      goodList: [],
      total: 0,
      tradeNo: '',
      tradeState: '',
      tradenum: '',
      isShowError: '',
      isShowTicket: false,
      message: '',
      serverUrl: '',
      accessId: '',
      accessSecret: ''
    }
  },
  methods: {
    async loginout () {
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = serverUrl + '/logout'
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.closeWindow()
    },
    closeWindow () {
      setTimeout(function () {
        document.addEventListener('WeixinJSBridgeReady', function () {
          WeixinJSBridge.call('closeWindow') // eslint-disable-line
        }, false)
        WeixinJSBridge.call('closeWindow') // eslint-disable-line
      }, 100)
    },
    async getUserOrder (tradeNo) {
      const params = {
        out_trade_no: tradeNo,
        // out_trade_no: '21-20200228150719-5353',
        order_type: 1
      }
      this.serverUrl = window.localStorage.getItem('apiUrl')
      this.accessId = window.localStorage.getItem('accesId')
      this.accessSecret = window.localStorage.getItem('accessSecret')
      // const url = genRequestGetUrl('https://api-atm-test.mobius.org.cn', 'orders', '3POT7VA61QF0IK6Y', 'query_by_tradeno', params, 'vyfstuxwwh8vevj7l1qhezgou7e9ztto')
      const url = genRequestGetUrl(this.serverUrl, 'orders', this.accessId, 'query_by_tradeno', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.goodList = res.ret_data.goods_list
      this.total = (res.ret_data.total_fee / 100).toFixed(2)
      this.tradeNo = res.ret_data.out_trade_no

      if (res.ret_data.shipment_state === 1) {
        this.isShowError = true
      } else {
        this.isShowError = false
      }
    },
    getQueryString () {
      const _this = this
      var url = '?' + window.location.href.split('?')[1]
      var codeResult = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          codeResult[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      _this.getUserOrder(codeResult.out_trade_no)
    },
    // 提交反馈
    async submitTicket () {
      var randnum = rand(100, 999)
      const params = {
        name: 'tickets—test' + randnum,
        description: this.message,
        type: this.radio,
        open_id: window.localStorage.getItem('openId'),
        out_trade_no: this.tradeNo,
        store_id: window.localStorage.getItem('storeId'),
        machine_id: window.localStorage.getItem('machineId'),
        machine_sn: window.localStorage.getItem('machineSn'),
        store_name: window.localStorage.getItem('storeName'),
        store_cname: window.localStorage.getItem('storeCname')
      }
      const url = genRequestGetUrl(this.serverUrl, 'tickets', this.accessId, 'create_one', params, this.accessSecret)
      // const url = genRequestGetUrl('https://api-atm-test.mobius.org.cn', 'tickets', '3POT7VA61QF0IK6Y', 'create_one', params, 'vyfstuxwwh8vevj7l1qhezgou7e9ztto')
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      } else {
        this.$toast('已收到您的反馈，正在处理中')
        // window.location.href = this.app.h5.root_url + '/#/change'
      }
    },
    closeTicket () {
      this.message = ''
    }
  }
}
</script>
<style lang="less" scoped>
.order_content {
  height: 100%;
  overflow: hidden;
  .order_logo{
    .van-card{
      width: 96vw;
      margin: 1vh auto;
      padding: 0;
      img{
        width: 20vw;
        border-radius: 80%;
      }
      p{
        font-style: italic;
        font-weight: 700;
      }
    }
  }
  .order_detail{
    background: #fff;
    font-size: 5vw;
    width: 96vw;
    margin: 1vh auto;
    .van-row{
      text-align: left;
      color: #333;
    }
    .detail_show{
      overflow: hidden;
      margin: 1vh 0;
      .van-row{
        width: 100%;
        background: #FAFAFA;
        margin: 1vh 0;
        padding: 1vw;
        .van-col{
          font-size: 4vw;
          text-align: center;
          height: 8vh;
          line-height: 8vh;
          img{
            height: 100%;
          }
        }
      }
    }
  }
  .order_trade{
    color: #333;
    margin-bottom:10vh;
  }
  .order_bottom{
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    /deep/ .van-grid-item__content{
      background: #129E7b;
      /deep/ .van-grid-item__text{
        color: #fff;
      }
    }
  }
}
</style>

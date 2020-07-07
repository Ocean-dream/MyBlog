<template>
  <div>
   <van-collapse v-model="activeName" accordion>
    <van-collapse-item title="我的历史" name="1">
       <van-cell-group>
        <van-cell title="历史订单" @click="showRealteOrder()"/>
        <van-cell title="历史反馈" @click="showRealteTicket()"/>
        <van-cell title="历史退款" @click="showRealteRefund()"/>
      </van-cell-group>
    </van-collapse-item>
    <van-collapse-item title="补货通道" name="2">
      <van-cell-group>
        <van-cell title="运营补货" @click="skipSupplyLogin()"/>
        <van-cell title="历史补货" @click="skipSupplyLogin()"/>
      </van-cell-group>
    </van-collapse-item>
  </van-collapse>
      <van-tabbar route>
          <van-tabbar-item
            replace
            to="/change"
            icon="home-o"
          >
          主页
          </van-tabbar-item>
          <van-tabbar-item
            replace
            to="/ticket"
            icon="manager"
          >
            我的
          </van-tabbar-item>
          <van-tabbar-item
          icon="close"
          @click="loginout()"
          >
            关闭
          </van-tabbar-item>
        </van-tabbar>
         <!-- 历史订单详情 -->
      <van-dialog
        v-model="historyOrderShow"
        title="订单详情"
        :showConfirmButton="false"
        className="qua_show"
        :closeOnClickOverlay="true"
        >
      <div class="order_detail">
      <van-row>商品信息</van-row>
      <div class="detail_show">
        <van-row gutter="20" v-for="(item, index) in singleOrder.goods_list" :key="index">
          <van-col span="8">
            <img :src="item.goods_img_url_logo">
          </van-col>
          <van-col span="8" style="line-height:6vh;">{{item.goods_cname}}</van-col>
          <van-col span="8" >
            <div style="line-height:2vh;padding-top:2vh;">
              <span><span style="color:red;">￥{{(item.pay_price / 100).toFixed(2)}}</span> X {{item.goods_number}}</span><br>
              <span style="font-size:2.5vw;">出货成功：{{item.success_number}}</span><br>
              <span style="font-size:2.5vw;">出货失败：{{item.failed_number}}</span>
            </div>
          </van-col>
        </van-row>
      </div>
      <van-row style="color:#129E7b;text-align:right;padding-right:2vw;">总价：{{total}}</van-row>
    </div>
    </van-dialog>
        <!-- 历史订单 -->
        <van-action-sheet v-model="isHistoryshow" :title="title" @close="handleCloseSheet()">
           <van-row class="his_order">
            <van-col span="8">时间</van-col>
            <van-col span="10">订单号</van-col>
            <van-col span="2" v-show="isShowOrder">付款</van-col>
            <van-col span="2" v-show="isShowOrder">出货</van-col>
            <van-col span="4" v-show="isShowRefund">退款金额</van-col>
            <van-col span="4" v-show="isShowTickets">门店</van-col>
            <van-col span="2" v-show="isShowOrder">操作</van-col>
          </van-row>
          <van-row v-for="(item, index) in historyOrderList" :key="index" class="his_order">
            <van-col span="8">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</van-col>
            <van-col span="10" v-if="isShowRefund">{{item.out_refund_no}}</van-col>
            <van-col span="10" v-else>{{item.out_trade_no}}</van-col>
            <van-col span="4" v-show="isShowTickets" style="font-size:2.5vw;">{{item.store_cname}}</van-col>
            <van-col span="4" v-show="isShowRefund">{{(item.refund_fee / 100).toFixed(2)}}</van-col>
            <van-col span="2" v-show="isShowOrder">
              <span style="color:#129E7b" v-if="item.trade_state === 'SUCCESS'">成功</span>
              <span style="color:red" v-else>失败</span>
            </van-col>
            <van-col span="2" v-show="isShowOrder">
              <span style="color:#129E7b" v-if="item.shipment_state === 1">成功</span>
              <span style="color:red" v-else>失败</span>
            </van-col>
            <van-col span="2" @click="readCurrent(item.out_trade_no)" v-show="isShowOrder">查看</van-col>
          </van-row>
          <van-row>
            <van-pagination
              v-model="currentPage"
              :total-items="totalNum"
              :show-page-size="3"
              force-ellipses
              @change="handlePageChange()"
            />
          </van-row>
        </van-action-sheet>
  </div>
</template>

<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
export default {
  data () {
    return {
      totalNum: 0,
      currentPage: 1,
      isShowOrder: false,
      isShowTickets: false,
      isShowRefund: false,
      historyOrderShow: false,
      historyOrderList: [],
      isHistoryshow: false,
      singleOrder: [],
      serverUrl: '',
      accessId: '',
      accessSecret: '',
      total: 0,
      openid: '',
      activeName: '1',
      title: '',
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 5
        }
      }
    }
  },
  created () {
    this.openid = window.localStorage.getItem('openId')
    this.serverUrl = window.localStorage.getItem('apiUrl')
    this.accessId = window.localStorage.getItem('accesId')
    this.accessSecret = window.localStorage.getItem('accessSecret')
  },
  methods: {
    skipSupplyLogin () {
      this.$router.push({ path: '/supplylogin' })
    },
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
    handleCloseSheet () {
      this.searchJson.page.page_num = 1
    },
    handlePageChange () {
      this.searchJson.page.page_num = this.currentPage
      if (this.isShowOrder) {
        this.showRealteOrder()
      } else if (this.isShowTickets) {
        this.showRealteTicket()
      } else {
        this.showRealteRefund()
      }
    },
    // 历史订单
    async showRealteOrder () {
      this.isShowOrder = true
      this.isShowTickets = false
      this.isShowRefund = false
      this.title = '历史订单'
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(this.serverUrl, 'orders', this.accessId, 'list_by_openid', { openid: this.openid, 'search_str': searchStr }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.historyOrderList = res.ret_data.rows
      this.totalNum = res.ret_total
      this.isHistoryshow = true
    },
    // 根据订单查详细
    async readCurrent (param) {
      const params = {
        out_trade_no: param,
        order_type: 2
      }
      const url = genRequestGetUrl(this.serverUrl, 'orders', this.accessId, 'query_by_tradeno', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.singleOrder = res.ret_data
      this.total = (res.ret_data.total_fee / 100).toFixed(2)
      this.historyOrderShow = true
    },
    // 历史反馈
    async showRealteTicket () {
      this.isShowOrder = false
      this.isShowTickets = true
      this.isShowRefund = false
      this.title = '历史反馈'
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(this.serverUrl, 'tickets', this.accessId, 'list_by_openid', { openid: this.openid, 'search_str': searchStr }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.historyOrderList = res.ret_data
      this.totalNum = res.ret_total
      this.isHistoryshow = true
    },
    // 历史退款
    async showRealteRefund () {
      this.isShowOrder = false
      this.isShowRefund = true
      this.isShowTickets = false
      this.title = '历史退款'
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(this.serverUrl, 'refunds', this.accessId, 'list_by_openid', { openid: this.openid, 'search_str': searchStr }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.historyOrderList = res.ret_data
      this.totalNum = res.ret_total
      this.isHistoryshow = true
    }
  }
}
</script>
<style lang="less">
.van-tabbar{
  background: #129E7b;
  .van-tabbar-item{
    color: #fff;
  }
}
.van-pagination__item{
  color:#129E7b!important;
  &:active{
    background: #129E7b;
  }
  }
.van-pagination__item--active{
  color:#fff!important;
  background: #129E7b;
}
.van-collapse-item__content{
  padding: 0!important;
}
.order_detail{
    background: #fff;
    font-size: 4vw;
    margin: 1vh auto;
    .van-row{
      text-align: left;
      color: #666;
    }
    .detail_show{
      overflow: hidden;
      margin: 1vh 0;
      .van-row{
        width: 100%;
        background: #FAFAFA;
        margin: 1vh;
        padding: 1vw;
        .van-col{
          font-size: 3vw;
          text-align: center;
          height: 8vh;
          line-height: 8vh;
          img{
            height: 100%;
          }
        }
      }
    }
    .order_trade{
      color: #333;
    }
  }
.his_order {
  margin:2vh 0;
  /deep/ .van-col{
    font-size: 3vw;
  }
}
</style>

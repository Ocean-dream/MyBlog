<template>
 <div>
  <div v-if="isShowGoodsList === false" style="width:100vw;height:100vh;">
    <img src="./../assets/pause.png" alt="" style="width:100vw;height:100vh;">
  </div>
    <div v-show="isAllLoad" v-else>
        <div class="home">
          <van-row class="home_title">
            您好，欢迎选购，机器SN号：{{machine_sn}}
          </van-row>
          <div class="home_info">
            <van-row style="font-size:2.5vw;">
              <van-col :span="10">温馨提示：点击图片可了解更多详情</van-col>
              <!-- <van-col :span="10">客服电话：0755-251986666-8668</van-col> -->
              <!-- <van-col class="qualification" @click="showqualification()" :span="4">营业执照</van-col> -->
            </van-row>
             <div class="search_message">
                <form action="/" style="height:5vh;">
                <van-search
                  v-model="searchMedicine"
                  shape="round"
                  background="#129E7b"
                  placeholder="请输入药品名称"
                  @search="onSearch"
                  @input="onSearch"
                />
              </form>
             </div>
          </div>
          <van-row class="goods_show">
            <van-col :span="6" v-for="(item, index) in goodsList" :key="index" style="box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)">
              <div class="goods_detail">
                <van-row class="goods_title">{{item.goods_cname}}</van-row>
                <van-row class="goods_pic">
                  <img :src="item.goods_img_url_logo" @click="showGoodsDetail(item.goods_img_url_raw, item.goods_instruction_file_url)">
                  <van-tag color="#129E7b" style="position: absolute;top:0;left:0;">{{item.goods_channel_no}}货道</van-tag>
                  <i>{{item.goods_number}}</i>
                  <van-tag type="danger" style="position: absolute;bottom:10%;right:0;" v-show="item.confirm_retail_unit_price > item.confirm_discount_unit_price">活动</van-tag>
                </van-row>
                <van-row>
                   <van-stepper
                      v-model="goodsNum[index]"
                      style="display:flex;"
                      min="0"
                      :max="item.goods_number"
                      @change="getPlusShopNum(item, index)"
                      disable-input integer
                      :disable-plus="disablePlus"
                    />
                </van-row>
                <div style="height:3vh;margin:1vh 0;">
                  <van-row v-if="item.confirm_retail_unit_price === item.confirm_discount_unit_price" style="color:#129E7b;font-size:2vw;">售价: ￥{{item.confirm_discount_unit_price}}</van-row>
                  <div v-else>
                    <van-row style="color:red;font-size:2vw;">原价: <del>￥{{item.confirm_retail_unit_price}}</del></van-row>
                    <van-row style="color:#129E7b;font-size:2vw;">售价: ￥{{item.confirm_discount_unit_price}}</van-row>
                  </div>
                </div>
                 <!-- 营业执照 -->
                <van-dialog
                  v-model="qualificationShow"
                  title="营业执照"
                  class="qua_show"
                  show-cancel-button
                  >
                  <img :src="qualificationSrc" style="width:100%;">
                </van-dialog>
              </div>
            </van-col>
          </van-row>
          <!-- 商品详情 -->
          <van-dialog
            v-model="goodsDetailShow"
            title="药品详情"
            :showConfirmButton="false"
            className="qua_show"
            :closeOnClickOverlay="true"
            >
            <img :src="scarleSrc" style="width:93%;height:40vh;">
            <div style="height:30vh;overflow:auto;" v-if="pdfSrc !== null">
              <pdf :src="pdfSrc"></pdf>
            </div>
          </van-dialog>
          <!--  -->
          <van-dialog
            v-model="sureOrderShow"
            title="确认订单"
            :showCancelButton="true"
            className="qua_show"
            style="max-height:70vh;"
            :closeOnClickOverlay="true"
            @close = "handleClose"
            @confirm ="submitGoodOrder()"
            >
            <van-card v-for="(item, index) in sureDetail" :key="index"
              :num="item.goods_number"
              :price="item.goods_price"
              :title="item.goods_name"
              style="height:8vh;"
            >
              <div slot="thumb">
                <img :src="item.goods_img" alt="" style="width:50%;">
              </div>
            </van-card>
            <van-row style="text-align:right;margin-right:1%;">总价：{{(totalPrice / 100).toFixed(2)}}</van-row>
            <van-row style="color:red;font-size: 4vw;" v-show="parseInt(isverify) === 1">该机器开启验证模式，收取小额金额</van-row>
          </van-dialog>
          <div class="loading_sty" v-show="isLoading">
            <van-loading vertical type="spinner" size="40px" color="#fff">{{userInfo}}</van-loading>
          </div>
          <!-- 购物车详情 -->
          <div style="margin-bottom:17%;">
          </div>
          <van-goods-action class="shop_car" style="bottom:7%;">
            <van-popup
                v-model="isShowCar"
                :overlay ='false'
                :duration=0
                close-icon="close"
                position="bottom"
                style="min-height:5%;margin-bottom:12.4%;"
                class="car_detail"
                >
                <van-row style="background:#129E7b;color:#fff;">
                  <van-col span="8">商品</van-col>
                  <van-col span="8">价格</van-col>
                  <van-col span="8">数量</van-col>
                </van-row>
                <div v-show="carDetail.length === 0">
                  <van-row style="font-size:4vw;">尚未添加商品</van-row>
                </div>
                <div v-show="carDetail.length !== 0">
                  <van-row v-for="(item, index) in carDetail" :key="index">
                    <van-col span="8">{{item.goods_name}}</van-col>
                    <van-col span="8">{{item.goods_price}}</van-col>
                    <van-col span="8">{{item.goods_number}}</van-col>
                  </van-row>
                </div>
            </van-popup>
            <van-goods-action-icon icon="cart-o" text="购物车" @click="onClickIcon"  :info="totalnum" style="border-bottom:1px solid #fff;"/>
          </van-goods-action>
          <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit" style="left:20%;width:80%;bottom:6.8%;"/>
        </div>
        <van-tabbar>
          <van-tabbar-item
            replace
            to="/"
            icon="home-o"
            style="border-top: 1px solid #fff"
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
          icon="clear"
          @click="loginout()"
          >
            退出
          </van-tabbar-item>
        </van-tabbar>
    </div>
    <drag-comp @goNext="isShowTel"  :isShow="isShowContent" @showSellPic="sellPic"/>
 </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import { wxPaySign, rand, isUserAgrent, isWeChat, isTest, getSelectParam } from '@/untils/untils.js'
import dragComp from '@/views/components/drag'
import moment from 'moment'
import pdf from 'vue-pdf'
export default {
  data () {
    return {
      goodsListSearch: [],
      searchMedicine: '',
      isShowContent: false,
      pdfSrc: '',
      isAllLoad: false,
      machineId: '',
      isShowGoodsList: '',
      isLoading: false,
      sureOrderShow: false,
      disablePlus: false,
      isShowCar: false,
      goodsDetailShow: false,
      goodsList: [],
      machine_sn: '',
      qualificationShow: false,
      qualificationSrc: '',
      totalnum: 0,
      goodsNum: [],
      totalPrice: 0,
      goods_json: [],
      scarleSrc: '',
      carDetail: [],
      tradenumber: '',
      sureDetail: [],
      intervalId: null,
      trachingNum: 0,
      isverify: '',
      userInfo: '正在前往支付...',
      environment: '',
      accessSecret: '',
      accesId: '',
      trendAppId: ''
    }
  },
  components: {
    pdf,
    dragComp
  },
  name: 'home',
  created () {
    if (isUserAgrent() && isWeChat()) {
      if (window.location.hash.split('?')[0] === '#/login') {
        this.getEnterParams()
      } else {
        this.getCode()
      }
    } else {
      this.$router.push('/error')
    }
  },
  methods: {
    onSearch (val) {
      this.goodsListSearch = []
      let _this = this
      if (val === '') {
        this.getAllGoodsInfo()
      } else {
        _this.goodsList.forEach(item => {
          if (item.goods_cname.match(val)) {
            _this.goodsListSearch.push(item)
          }
        })
        this.goodsList = this.goodsListSearch
      }
    },
    sellPic () {
      this.qualificationShow = true
    },
    isShowTel () {
      this.isShowContent = !this.isShowContent
    },
    async loginout () {
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = serverUrl + '/logout'
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
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
    handleClose () {
      this.sureDetail = []
    },
    // 展示点击商品详细信息
    showGoodsDetail (src, url) {
      this.scarleSrc = src
      if (url !== null) {
        this.pdfSrc = 'https' + url.split(':')[1]
      }
      this.goodsDetailShow = true
    },
    // 获取所有商品信息
    async getAllGoodsInfo () {
      var serverUrl = window.localStorage.getItem('apiUrl')
      var machineSn = window.localStorage.getItem('machineSn')
      const url = genRequestGetUrl(serverUrl, 'machines', this.accesId, 'list_goods', { machine_sn: machineSn }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.device_info.status === 1) {
        this.goodsList = res.ret_data.goods_list
        this.goodsList.forEach(item => {
          this.goodsNum.push(0)
        })
        this.machineId = res.ret_data.device_info.id
        this.machine_sn = res.ret_data.device_info.sn
        this.isverify = res.ret_data.device_info.verify
        this.qualificationSrc = res.ret_data.qualification_info.biz_license_img_url
        document.title = res.ret_data.orgs_info.merchant.cname + '·' + res.ret_data.orgs_info.store.cname
        this.isShowGoodsList = true
        this.isAllLoad = true
        this.isLoading = false
        window.localStorage.setItem('storeId', res.ret_data.orgs_info.store.id)
        window.localStorage.setItem('machineId', res.ret_data.device_info.id)
        window.localStorage.setItem('storeName', res.ret_data.orgs_info.store.name)
        window.localStorage.setItem('storeCname', res.ret_data.orgs_info.store.cname)
      } else {
        this.isShowGoodsList = false
      }
    },
    // 展示资质信息
    showqualification () {
      this.qualificationShow = true
    },
    // 获取机器sn和环境
    getEnterParams () {
      const _this = this
      // var str = 'https://atm-h5-test.mobius.org.cn/#/login?machine_sn= M00002019TT&&environment=dev'
      var url = '?' + window.location.href.split('?')[1]
      var Result = {}
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (let i = 0; i < strs.length; i++) {
          Result[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
        }
      }
      this.machine_sn = Result.machine_sn !== undefined ? Result.machine_sn : this.default.machine_sn
      this.environment = Result.environment !== undefined ? Result.environment : this.default.environment
      this.trendAppId = Result.wx_appid !== undefined ? Result.wx_appid : this.default.wx_appid
      _this.api_url = isTest(this.environment).api_server_url
      this.accesId = isTest(this.environment).access_key_id
      this.accessSecret = isTest(this.environment).access_key_secret
      window.localStorage.setItem('apiUrl', isTest(this.environment).api_server_url)
      window.localStorage.setItem('accesId', isTest(this.environment).access_key_id)
      window.localStorage.setItem('accessSecret', isTest(this.environment).access_key_secret)
      window.localStorage.setItem('machineSn', this.machine_sn)
      window.localStorage.setItem('appid', this.trendAppId)
      window.localStorage.setItem('redict', this.app.h5.wx.redirect_url)
      var redictUrl = encodeURIComponent(this.app.h5.wx.redirect_url)
      // 重定向域名编码
      // 扫码的链接  跳转时获取code
      const starturl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.trendAppId + '&redirect_uri=' + redictUrl + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      window.location.href = starturl
      this.isLoading = true
      this.userInfo = '正在加载......'
    },
    // 获取code的值
    getCode () {
      var url = '?' + window.location.href.split('?')[1]
      var codeResult = getSelectParam(url)
      let usercode = codeResult.code
      this.getOpenId(usercode)
    },
    // 获取openid的值
    async getOpenId (code) {
      var serverUrl = window.localStorage.getItem('apiUrl')
      var appid = window.localStorage.getItem('appid')
      const url = serverUrl + '/login_wxapp?code=' + code + '&app_id=' + appid + '&app_type=1'
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (window.location.hash.split('?')[0] === '#/change') {
          this.openid = window.localStorage.getItem('openId')
        } else {
          return this.$toast('用户登录失败')
        }
      } else {
        this.openid = res.ret_data.data.openid
        window.localStorage.setItem('openId', res.ret_data.data.openid)
      }
      this.getAllGoodsInfo()
    },
    // 点击购物车
    onClickIcon () {
      this.dealData()
      this.isShowCar = !this.isShowCar
    },
    // 处理goods_json
    dealData () {
      this.carDetail = []
      this.goods_json.forEach(item => {
        if (item && item !== undefined) {
          this.carDetail.push(item)
        }
      })
    },
    // 购物车计算
    getPlusShopNum (item, index) {
      let _this = this
      this.totalPrice = 0
      // 点击加或减
      this.goods_json[index] = {
        goods_channel_no: item.goods_channel_no,
        goods_id: item.goods_id,
        goods_number: this.goodsNum[index],
        goods_price: item.confirm_discount_unit_price,
        goods_name: item.goods_cname,
        goods_img: item.goods_img_url_logo
      }
      this.goods_json.forEach((item, index) => {
        // 数值为0 删除该对象
        if (item && item.goods_number === 0) {
          _this.goods_json[index] = { }
        }
        if (item.goods_price && item.goods_number) {
          this.totalPrice += (item.goods_price * 100).toFixed(0) * item.goods_number
        }
      })
      // 总数量
      this.totalnum = 0
      this.goodsNum.forEach(item => {
        this.totalnum += item
        if (this.totalnum > 4) {
          this.$toast('一次最多可下5单，可分批下单')
          this.disablePlus = true
        } else {
          this.disablePlus = false
        }
      })
      this.dealData()
    },
    // 确认订单
    onSubmit () {
      this.goods_json.forEach(item => {
        if (item && item !== undefined && JSON.stringify(item) !== '{}') {
          this.sureDetail.push(item)
        }
      })
      if (this.sureDetail.length === 0) return this.$toast('请先选择商品')
      this.sureOrderShow = true
    },
    // 提交订单
    async submitGoodOrder () {
      this.isLoading = true
      this.userInfo = '正在下单中.......'
      let orderArr = []
      this.goods_json.forEach(item => {
        if (item && JSON.stringify(item) !== '{}') {
          const obj = {
            goods_id: item.goods_id,
            goods_channel_no: item.goods_channel_no,
            goods_number: item.goods_number
          }
          orderArr.push(obj)
        }
      })
      var randnum = rand(1000, 9999)
      let currentTime = moment(new Date()).format('YYYYMMDDHHmmss')
      const goodsJsonStr = JSON.stringify(orderArr)
      this.tradenumber = this.machineId + '-' + currentTime + '-' + randnum
      const params = {
        pay_type: 1,
        comsumer_type: 1,
        openid: this.openid,
        machine_id: this.machineId,
        out_trade_no: this.tradenumber,
        goods_list: goodsJsonStr,
        total_fee: (this.totalPrice / 100).toFixed(2),
        machine_sn: this.machine_sn,
        app_id: window.localStorage.getItem('appid')
      }
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = genRequestGetUrl(serverUrl, 'orders', this.accesId, 'pre_order', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code === 0) {
        this.isLoading = false
        this.wxpay(res.ret_data)
      } else {
        this.isLoading = false
        this.$toast({
          message: 'Error：' + res.ret_msg,
          icon: 'fail'
        })
      }
    },
    wxpay (data) {
      var vm = this
      // https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=7_7&index=6
      if (typeof WeixinJSBridge === 'undefined') {
        if (document.addEventListener) {
          document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false)
        } else if (document.attachEvent) {
          document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data))
          document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady(data))
        }
      } else {
        vm.onBridgeReady(data)
      }
    },
    onBridgeReady: function (data) {
      const _this = this
      let nonceStr = data.nonceStr
      let appId = window.localStorage.getItem('appid')
      let mchKey = data.mch_key
      let prepayId = 'prepay_id=' + data.prepayId
      let signType = 'HMAC-SHA256'
      let timeStamp = (Date.parse(new Date()) / 1000).toString()
      let paySign = wxPaySign(appId, nonceStr, prepayId, signType, timeStamp, mchKey)
      WeixinJSBridge.invoke( // eslint-disable-line
        'getBrandWCPayRequest', {
          'appId': appId,
          'timeStamp': timeStamp,
          'nonceStr': nonceStr,
          'package': prepayId,
          'signType': signType,
          'paySign': paySign
        },
        function (res) {
          if (res.err_msg === 'get_brand_wcpay_request:ok') {
            _this.userInfo = '正在出货中...'
            _this.isLoading = true
            _this.orderTracking()
          } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
            _this.closePayOrder(_this.tradenumber)
          } else {
            this.$toast('取消支付')
          }
        }
      )
    },
    // 轮询查单
    orderTracking () {
      const _this = this
      this.intervalId = setInterval(
        _this.queryByTradeno, 3 * 1000
      )
    },
    // 查询出货结果
    async queryByTradeno () {
      const _this = this
      // 查询超时
      if (this.trachingNum < 10) {
        this.trachingNum++
      } else {
        clearInterval(_this.intervalId)
        this.trachingNum = 0
        return
      }
      const params = {
        out_trade_no: this.tradenumber,
        order_type: 1
      }
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = genRequestGetUrl(serverUrl, 'orders', _this.accesId, 'query_by_tradeno', params, _this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code === 0) {
        if (res.ret_data.shipment_state !== 0) {
          _this.isLoading = false
          clearInterval(_this.intervalId)
          _this.isLoading = false
          window.location.href = _this.app.h5.root_url + '/#/order?out_trade_no=' + _this.tradenumber + '&v=' + (new Date().getTime())
        } else {
          _this.isLoading = true
        }
      } else {
        this.$toast('Error, 有接口调用错误：' + res.ret_msg)
        clearInterval(_this.intervalId)
        _this.isLoading = false
        _this.trachingNum = 0
      }
    },
    // 关闭订单
    async closePayOrder (tradeNum) {
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = genRequestGetUrl(serverUrl, 'orders', this.accesId, 'close_order', { out_trade_no: tradeNum }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.$toast('订单已取消，请重新下单')
    }
  }
}
</script>
<style lang="less">
.van-stepper__minus::after, .van-stepper__minus::before, .van-stepper__plus::after, .van-stepper__plus::before{
  margin: 0!important;
  top:50%!important;
  left:50%!important;
  transform: translate(-50%, -50%)!important;
}
.van-popup--top{
  right:0!important;
}
.van-stepper__input[disabled]{
  color:#129E7b!important;
}
.van-tabbar{
  background: #129E7b;
  height: 7vh;
  .van-tabbar-item{
    color: #fff;
  }
}
</style>
<style lang="less" scoped>
.search_message{
  margin-top: 0.8vh;
  /deep/.van-search{
    padding: 0.5vh;
    .van-search__content{
      .van-cell {
        line-height: 17px;
      }
    }
  }
}
.pdf-container{
    width: 100%;
    height: 100%;
    position: absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
  }
.goods_detail{
  /deep/.van-card__thumb{
  overflow: hidden;
  display: flex;
  align-items: center;
}
}
.shop_car{
  /deep/.van-popup--bottom{
  bottom:7.5vh!important;
}
}
.home{
  .loading_sty{
    position: fixed;
    top:50vh;
    left:50vw;
    transform: translate(-50%, -50%);
    padding: 20px;
    background:#4a4a4a;
    /deep/ .van-loading__text{
      color:#fff;
    }
  }
  .home_title{
    background: #129E7b;
    color:#fff;
    font-size: 4vw;
  }
  .home_info {
    margin: 1vh 0;
    background: #fff;
    .van-row{
      color:#129E7b;
      font-size: 0.5vw;
      text-align: left;
      .qualification{
        &:hover{
          color:blue;
        }
      }
    }
  }
  .goods_show{
    padding-bottom: 6vh;
    .van-col{
      padding: 3px;
      .goods_detail{
          background: #fff;
          padding:1vw;
        .goods_title{
          font-size: 2.5vw;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          margin-bottom: 0;
          margin-bottom:0.5vh;
        }
        .goods_pic{
          position: relative;
          img{
            width:100%;
            margin:auto;
            height:100px;
          }
          i{
            position: absolute;
            top:0;
            right:0;
            width: 12px;
            height: 12px;
            padding: 2px;
            background: red;
            border-radius: 50%;
            color: #fff;
            font-style: normal;
            font-size:3vw;
          }
        }
      }
      .qua_show{
        width: 80vw;
      }
    }
  }
  .car_detail{
    border: 1px solid #129E7b;
    .van-row{
      .van-col{
        font-size: 3.5vw;
        line-height: 4vh;
      }
    }
  }
}
</style>

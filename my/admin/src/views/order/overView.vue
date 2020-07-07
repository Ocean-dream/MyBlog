<template>
<div>
  <div class='dashboard'>
    <el-row :gutter='20'>
      <el-col style='margin-left:0;'>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
            <div style="display:flex;justify-content: space-between;">
              <div>
                <el-tag>总销售额</el-tag>
                <h3>¥ {{totalPay}}</h3>
                <span class="small_title">周趋势</span>
              </div>
              <div style="margin-right:5%; margin-top:9%;">
                <ul style="padding:0;margin:0;">
                  <li>
                    <div>
                      <span >今日</span>
                      <span style="color:#41B983;">¥ {{todaySale}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span >昨日</span>
                      <span style="color:#41B983;">¥ {{yesterDaySale}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>近一周</span>
                      <span style="color:#41B983;">¥ {{totalSale}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <ve-line :data="chartSaleData" :settings="chartSettings" :grid="grid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-line>
          </el-card>
        </div>
      </el-col>
      <el-col >
        <div class='grid-content bg-purple show_charts'>
          <el-card>
             <div style="display:flex;justify-content: space-between;">
              <div>
                <el-tag>订单量</el-tag>
                <h3>{{total}}</h3>
                <span class="small_title">周趋势</span>
              </div>
              <div style="margin-right:5%; margin-top:9%;">
                <ul style="padding:0;margin:0;">
                  <li>
                    <div>
                      <span>今日</span>
                      <span style="color:#41B983;">{{todayOrder}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>昨日</span>
                      <span style="color:#41B983;">{{yesterDayOrder}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>近一周</span>
                      <span style="color:#41B983;">{{totalOrderNum}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <ve-histogram :data="chartOrderData" :settings="chartOrderSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
      <el-col >
        <div class='grid-content bg-purple show_charts'>
          <el-card>
              <div style="display:flex;justify-content: space-between;">
              <div>
                <el-tag>支付数</el-tag>
                <h3>{{totalOrder}}</h3>
                <span class="small_title">周趋势</span>
              </div>
              <div style="margin-right:5%; margin-top:9%;">
                <ul style="padding:0;margin:0;">
                  <li>
                    <div>
                      <span>今日</span>
                      <span style="color:#41B983;">{{todayPay}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>昨日</span>
                      <span style="color:#41B983;">{{yesterDayPay}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>近一周</span>
                      <span style="color:#41B983;">{{totalPayNum}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <ve-line :data="chartPayData" :settings="chartPaySettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-line>
          </el-card>
        </div>
      </el-col>
      <el-col style='margin-right:0;'>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
             <div style="display:flex;justify-content: space-between;">
              <div>
                <el-tag>用户数</el-tag>
                <h3>{{totalUser}}</h3>
                <span class="small_title">周趋势</span>
              </div>
              <div style="margin-right:5%; margin-top:9%;">
                <ul style="padding:0;margin:0;">
                  <li>
                    <div>
                      <span>今日</span>
                      <span style="color:#41B983;">{{todayUser}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>昨日</span>
                      <span style="color:#41B983;">{{yesterDayUser}}</span>
                    </div>
                  </li>
                  <li>
                    <div>
                      <span>近一周</span>
                      <span style="color:#41B983;">{{totalUserNum}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <ve-histogram :data="chartUserData" :settings="chartUserSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter='20'>
      <el-col style='margin-left:0;'>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
              <el-tag>商户数</el-tag>
              <h3>{{totalMerchant}}</h3>
            <div style="margin-bottom:8px;display:flex;justify-content: space-between;">
              <span class="small_title">月趋势</span>
              <ul style="margin:0;padding:0;margin-right:16%;">
                <li><span style="font-size:12px;">近一月<span style="color:#41B983;">{{totalMerchantNum}}</span></span></li>
              </ul>
            </div>
            <ve-histogram :data="chartMerchantData" :settings="chartMerchantSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
      <el-col>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
            <el-tag>门店数</el-tag>
          <h3>{{totalStore}}</h3>
           <div style="margin-bottom:8px;display:flex;justify-content: space-between;">
              <span class="small_title">月趋势</span>
               <ul style="margin:0;padding:0;margin-right:6%;">
                <li><span style="font-size:12px;">近一月<span style="color:#41B983;">{{totalStoreNum}}</span></span></li>
              </ul>
            </div>
            <ve-histogram :data="chartStoreData" :settings="chartStoreSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
       <el-col>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
            <el-tag>商品数</el-tag>
            <h3>{{totalGoods}}</h3>
            <div style="margin-bottom:8px;display:flex;justify-content: space-between;">
              <span class="small_title">月趋势</span>
              <ul style="margin:0;padding:0;margin-right:6%;">
                <li><span style="font-size:12px;">近一月<span style="color:#41B983;">{{totalGoodsNum}}</span></span></li>
              </ul>
            </div>
            <ve-histogram :data="chartGoodsData" :settings="chartGoodsSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
       <el-col style='margin-right:0;'>
        <div class='grid-content bg-purple show_charts'>
          <el-card>
              <el-tag>机器数</el-tag>
              <h3>{{totalMachine}}</h3>
            <div  style="margin-bottom:8px;display:flex;justify-content: space-between;">
              <span class="small_title">月趋势</span>
               <ul style="margin:0;padding:0;margin-right:6%;display:flex;justify-content: space-between;">
                <li><span style="font-size:12px;">近一月<span style="color:#41B983;">{{totalMachineNum}}</span></span></li>
              </ul>
            </div>
            <ve-histogram :data="chartMachineData" :settings="chartMachineSettings" :grid="ordergrid" :legend-visible="false" height="65px" width="366px" :extend="extend"></ve-histogram>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
    <el-row>
        <span class="more_det" @click="go()" style="border:1px solid #ccc;padding:3px;font-size:12px;margin-left:93%;margin-bottom:5px;">更多细节<i class="el-icon-arrow-right"></i></span>
        <div style="display:flex;justify-content: space-between;">
          <el-col style="background:#fff;width:47%;margin-left: 2%; padding:10px;">
            <ve-line :colors="['#129f77', '#e6a23c']" :data="chartSaleData" :settings="chartSaleSettings" :grid="salegrid" :loading="saleLoading" height="370px"></ve-line>
          </el-col>
          <el-col :span="12" style="background:#fff;width:47%;margin-right: 2%; padding:10px;">
            <ve-line :colors="['#129f77', '#e6a23c']" :data="chartPayRataData" :settings="chartPayRataSettings" :grid="salegrid" :loading="rateLoading" height="370px"></ve-line>
          </el-col>
        </div>
    </el-row>
    <el-row>
    </el-row>
</div>
</template>
<script>
import moment from 'moment'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  created () {
    this.orgId = window.localStorage.getItem('active') === null ? 1 : window.localStorage.getItem('active')
    this.getWeekMerchant()
    this.getWeekStore()
    this.getWeekData()
    this.getWeekOrder()
    this.getWeekGoods()
    this.getWeekMachines()
    this.getWeekPay()
    this.getWeekuSER()
    this.getTotal()
    this.getTotalPay()
    this.getTotalOrder()
    this.getTotalUser()
    this.getTotalMerchant()
    this.getTotalStore()
    this.getTotalGoods()
    this.getTotalMachine()
    this.getWeekBackMoney()
    this.getWeekpayRata()
    this.getWeekbackRata()
  },
  data () {
    this.extend = {
      xAxis: {
        show: false
      },
      yAxis: {
        show: false
      },
      tooltip: {
        show: true,
        axisPointer: {
          type: 'none'
        }
      },
      series: {
        barWidth: 20
      }
    }
    this.ordergrid = {
      left: -30
    }
    this.salegrid = {
      left: '2%',
      right: '2%'
    }
    this.grid = {
      left: -50
    }
    this.chartSettings = {
      labelMap: {
        'total_fee': '销售额',
        'backMoney': '退款额',
        'ctime': '日期'
      },
      stack: { 'ctime': ['total_fee'] },
      area: true
    }
    this.chartPayRataSettings = {
      axisSite: { right: ['backRata'] },
      labelMap: {
        'payrate': '近一周支付率',
        'ctime': '日期',
        'backRata': '近一周退款率'
      },
      yAxisType: ['percent', 'percent'],
      yAxisName: ['支付率(%)', '退款率（%）'],
      legend: {
        selectedMode: false
      }
    }
    this.chartSaleSettings = {
      axisSite: { right: ['backMoney'] },
      labelMap: {
        'total_fee': '近一周销售额',
        'ctime': '日期',
        'backMoney': '近一周退款额'
      },
      legendName: {
        'total_fee': '销售额',
        'backMoney': '退款额'
      },
      yAxisType: ['KMB', 'normal'],
      yAxisName: ['销售额(￥)', '退款额（￥）'],
      legend: {
        selectedMode: false
      }
    }
    this.chartOrderSettings = {
      labelMap: {
        'count': '订单量',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartPaySettings = {
      labelMap: {
        'count': '支付数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartUserSettings = {
      labelMap: {
        'count': '用户数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartMerchantSettings = {
      labelMap: {
        'count': '商户数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartStoreSettings = {
      labelMap: {
        'count': '门店数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartGoodsSettings = {
      labelMap: {
        'count': '商品数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    this.chartMachineSettings = {
      labelMap: {
        'count': '机器数',
        'ctime': '日期'
      },
      stack: { 'ctime': ['count'] },
      area: true
    }
    return {
      saleLoading: true,
      rateLoading: true,
      chartSaleData: {
        columns: ['ctime', 'total_fee', 'backMoney'],
        rows: []
      },
      chartOrderData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartPayData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartUserData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartMerchantData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartStoreData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartGoodsData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartMachineData: {
        columns: ['ctime', 'count'],
        rows: []
      },
      chartPayRataData: {
        columns: ['ctime', 'payrate', 'backRata'],
        rows: []
      },
      totalPay: '',
      total: '',
      totalOrder: '',
      totalUser: '',
      totalMerchant: '',
      totalStore: '',
      totalGoods: '',
      totalMachine: '',
      orgId: '',
      todaySale: '',
      todayOrder: '',
      todayPay: '',
      todaymerchant: '',
      todayUser: '',
      yesterDaySale: '',
      yesterDayOrder: '',
      yesterDayPay: '',
      yesterDayUser: '',
      totalSale: 0,
      totalOrderNum: 0,
      totalPayNum: 0,
      totalUserNum: 0,
      totalMachineNum: 0,
      totalStoreNum: 0,
      totalMerchantNum: 0,
      totalGoodsNum: 0,
      commonArr: [],
      commonRataArr: []
    }
  },
  methods: {
    go () {
      this.$router.push('/stats')
    },
    // 获取一周销售额
    async getWeekData () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      var yesterday = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD')
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.totalSale = 0
        if (res.ret_data.length !== 0) {
          res.ret_data.forEach(item => {
            this.totalSale += parseInt(item.total_fee)
            item.total_fee = (item.total_fee / 100).toFixed(2)
          })
          this.totalSale = (this.totalSale / 100).toFixed(2)
          if (res.ret_data[res.ret_data.length - 1].ctime) {
            if (today.split(' ')[0] === res.ret_data[res.ret_data.length - 1].ctime) {
              this.todaySale = res.ret_data[res.ret_data.length - 1].total_fee
            } else {
              this.todaySale = 0
            }
            if (yesterday.split(' ')[0] === res.ret_data[res.ret_data.length - 2].ctime) {
              this.yesterDaySale = res.ret_data[res.ret_data.length - 2].total_fee
            } else {
              this.yesterDaySale = 0
            }
          }
          this.commonArr = res.ret_data
        }
      }
    },
    // 获取一周退款额
    async getWeekBackMoney () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_refunds_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach((item, index) => {
          this.commonArr[index]['backMoney'] = (item.total_fee / 100).toFixed(2)
        })
        this.chartSaleData.rows = this.commonArr
        this.saleLoading = false
      }
    },
    // 获取一周支付率
    async getWeekpayRata () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_payrate_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.commonRataArr = res.ret_data
        this.commonRataArr.forEach((item, index) => {
          item.payrate = (item.payrate / 100).toFixed(2)
        })
      }
    },
    // 获取一周退款率
    async getWeekbackRata () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_refundrate_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach((item, index) => {
          this.commonRataArr[index]['backRata'] = (item.refundrate / 100).toFixed(2)
        })
        this.chartPayRataData.rows = this.commonRataArr
        this.rateLoading = false
      }
    },

    // 获取一周订单
    async getWeekOrder () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      var yesterday = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_total_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.totalOrderNum = 0
        if (res.ret_data.length !== 0) {
          res.ret_data.forEach(item => {
            this.totalOrderNum += parseInt(item.count)
          })
          if (res.ret_data[res.ret_data.length - 1].ctime) {
            if (today.split(' ')[0] === res.ret_data[res.ret_data.length - 1].ctime) {
              this.todayOrder = res.ret_data[res.ret_data.length - 1].count
            } else {
              this.todayOrder = 0
            }
            if (yesterday.split(' ')[0] === res.ret_data[res.ret_data.length - 2].ctime) {
              this.yesterDayOrder = res.ret_data[res.ret_data.length - 2].count
            } else {
              this.yesterDayOrder = 0
            }
          }
          this.chartOrderData.rows = res.ret_data
        }
      }
      // this.totalOrderNum = (this.totalOrderNum / 2)
    },
    // 获取一周支付数
    async getWeekPay () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      var yesterday = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_paid_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_data.length !== 0) {
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        this.totalPayNum = 0
        res.ret_data.forEach(item => {
          this.totalPayNum += parseInt(item.count)
        })
        if (res.ret_data[res.ret_data.length - 1].ctime) {
          if (today.split(' ')[0] === res.ret_data[res.ret_data.length - 1].ctime) {
            this.todayPay = res.ret_data[res.ret_data.length - 1].count
          } else {
            this.todayPay = 0
          }
          if (yesterday.split(' ')[0] === res.ret_data[res.ret_data.length - 2].ctime) {
            this.yesterDayPay = res.ret_data[res.ret_data.length - 2].total_fee
          } else {
            this.yesterDayPay = 0
          }
        }
        this.chartPayData.rows = res.ret_data
      }
    },
    // 获取一周用户数
    async getWeekuSER () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      var yesterday = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_consumers_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_data.length !== 0) {
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        this.totalUserNum = 0
        res.ret_data.forEach(item => {
          this.totalUserNum += parseInt(item.count)
        })
        if (res.ret_data[res.ret_data.length - 1].ctime) {
          if (today.split(' ')[0] === res.ret_data[res.ret_data.length - 1].ctime) {
            this.todayUser = res.ret_data[res.ret_data.length - 1].count
          } else {
            this.todayUser = 0
          }
          if (yesterday.split(' ')[0] === res.ret_data[res.ret_data.length - 2].ctime) {
            this.yesterDayUser = res.ret_data[res.ret_data.length - 2].count
          } else {
            this.yesterDayUser = 0
          }
        }
        this.chartUserData.rows = res.ret_data
      }
    },
    // 获取一月商户数
    async getWeekMerchant () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_merchants_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_data.length !== 0) {
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        this.totalMerchantNum = 0
        res.ret_data.forEach(item => {
          this.totalMerchantNum += item.count
        })
        this.chartMerchantData.rows = res.ret_data
      }
    },
    // 获取一月门店数
    async getWeekStore () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_stores_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.totalStoreNum = 0
      if (res.ret_data.length !== 0) {
        res.ret_data.forEach(item => {
          this.totalStoreNum += item.count
        })
        this.chartStoreData.rows = res.ret_data
      }
    },
    // 获取一月商品数
    async getWeekGoods () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_goods_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.totalGoodsNum = 0
      if (res.ret_data.length !== 0) {
        res.ret_data.forEach(item => {
          this.totalGoodsNum += item.count
        })
        this.chartGoodsData.rows = res.ret_data
      }
    },
    // 获取一月机器数
    async getWeekMachines () {
      var date = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD')
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      const start = date + ' ' + '00:00:00'
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: today
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_machines_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.totalMachineNum = 0
      if (res.ret_data.length !== 0) {
        res.ret_data.forEach(item => {
          this.totalMachineNum += item.count
        })
        this.chartMachineData.rows = res.ret_data
      }
    },
    // 获取订单总销售额
    async getTotalPay () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.rows.length !== 0) {
        if (res.ret_data.rows[0].total_fee) {
          this.totalPay = (res.ret_data.rows[0].total_fee / 100).toFixed(2)
        }
      } else {
        this.totalPay = 0
      }
    },
    // 获取订单总量
    async getTotal () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_total_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.count) {
        this.total = res.ret_data.count
      } else {
        this.total = 0
      }
    },
    // 获取所有支付的订单数量
    async getTotalOrder () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_paid_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.count) {
        this.totalOrder = res.ret_data.count
      } else {
        this.totalOrder = 0
      }
    },
    // 获取小程序用户总数
    async getTotalUser () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_consumers_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.amount) {
        this.totalUser = res.ret_data.amount
      } else {
        this.totalUser = 0
      }
    },
    // 获取商户总数
    async getTotalMerchant () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_merchants_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.amount === undefined) {
        this.totalMerchant = 0
      } else {
        this.totalMerchant = res.ret_data.amount
      }
    },
    // 获取门店总数
    async getTotalStore () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_stores_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.amount === undefined) {
        this.totalStore = 0
      } else {
        this.totalStore = res.ret_data.amount
      }
    },
    // 获取商品总数
    async getTotalGoods () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_goods_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.amount === undefined) {
        this.totalGoods = 0
      } else {
        this.totalGoods = res.ret_data.amount
      }
    },
    // 获取商品总数
    async getTotalMachine () {
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_machines_amount', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      if (res.ret_data.amount === undefined) {
        this.totalMachine = 0
      } else {
        this.totalMachine = res.ret_data.amount
      }
    },
    onResize: function () {
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.getWeekMerchant()
      this.getWeekStore()
      this.getWeekData()
      this.getWeekOrder()
      this.getWeekPay()
      this.getWeekuSER()
      this.getTotal()
      this.getTotalPay()
      this.getTotalOrder()
      this.getTotalUser()
      this.getTotalMerchant()
      this.getTotalStore()
      this.getTotalGoods()
      this.getTotalMachine()
      this.getWeekBackMoney()
      this.getWeekpayRata()
      this.getWeekbackRata()
    }
  }
}
</script>
<style scoped>
.dashboard {
  padding-left:30px;
}
.dashboard >>> .el-card__body{
  padding-bottom: 0!important;
  padding-right: 0!important;
}
.dashboard >>> .el-tag{
  background: #41B983;
  color: #fff;
  font-size: 14px;
}
.dashboard >>> .el-row{
  margin-left:30px;
  height:200px;
}
.dashboard >>> .el-col{
  width: 24%;
  height: 170px;
  margin: 10px 6px;
}
.dashboard p {
  color:#8C8C8C;
  font-size: 23px;
}
.dashboard h3{
  color: #41B983;
  font-weight: 400;
  font-size: 25px;
}
.show_charts span{
  color: #8C8C8C;
  margin-left: 10px;
  font-size: 12px;
}
.show_charts h3{
  margin: 10px;
}
.show_charts .small_title{
  font-size: 12px;
  color: #8c8c8c;
}
.more_det{
  color:#41B983;
  cursor: pointer;
}
</style>

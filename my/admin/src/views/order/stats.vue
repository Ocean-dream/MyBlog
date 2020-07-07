<template>
  <div>
    <div class="stat_title">
      <el-row style="width:43.4%">
        <data-time  ref="dataTimeRef" @todayCurrent ='getCurrentData'></data-time>
      </el-row>
    </div>
    <div>
      <el-row class="stats_show">
        <el-tabs type="border-card" v-model="activeName">
          <el-tab-pane label="收入" name="1">
            <el-row>
              <el-col :span="12">
                <el-button size="mini" round @click="changeOperateStyle()">点击切换</el-button>
                <ve-histogram :data="chartOperateData" :settings="chartOperateSettings" :extend="saleExtends" :grid="grid"  height="250px" v-show="isShowOperate === false" ref="chart1"></ve-histogram>
                <div v-show="isShowOperate === true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outOperate', chartOperateSettings.labelMap.total_fee)" class="el-icon-download download_sty">导出表格</el-button>
                    <el-table
                      :data="chartOperateData.rows"
                      stripe
                      show-summary
                      id="outOperate"
                      style="width: 100%">
                      <el-table-column
                        label="日期"
                      >
                      <template slot-scope="scope">
                        <div>{{scope.row.ctime}}</div>
                      </template>
                      </el-table-column>
                      <el-table-column
                        prop="storeTotal"
                        label="门店（￥）"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="total_fee"
                        label="运营（￥）"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="total_fee"
                        label="平台（￥）"
                      >
                      </el-table-column>
                       <el-table-column
                        prop="accuracy"
                        label="误差（￥）"
                      >
                      </el-table-column>
                      <el-table-column
                        prop="saleTotal"
                        label="总额（￥）"
                      >
                      </el-table-column>
                      <div slot="append">
                        <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="chartOperateData.rows.length !== 0">
                          <div class='sum_footer_unit center'>平均</div>
                          <div class='sum_footer_unit'>{{storeAccount}}</div>
                          <div class='sum_footer_unit'>{{operateAccount}}</div>
                          <div class='sum_footer_unit'>{{plattamAccount}}</div>
                          <div class='sum_footer_unit'>{{accuracyAccount}}</div>
                          <div class='sum_footer_unit'>{{totalAccount}}</div>
                        </div>
                      </div>
                    </el-table>
                </div>
              </el-col>
              <el-col :span="12">
                <el-button size="mini" round @click="changeRefundStyle()">点击切换</el-button>
                <ve-histogram :data="chartRefundData" :settings="chartRefundSettings" height="250px" :grid="grid" :extend="saleExtends" v-if="isShowRefund === false" ref="chart1"></ve-histogram>
                <div v-if="isShowRefund === true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outRefund', chartRefundSettings.labelMap.count)" class="el-icon-download download_sty">导出表格</el-button>
                  <el-table
                    :data="chartRefundData.rows"
                    stripe
                    show-summary
                    id="outRefund"
                    style="width: 100%">
                    <el-table-column
                      label="日期"
                    >
                    <template slot-scope="scope">
                      <div>{{scope.row.ctime}}</div>
                    </template>
                    </el-table-column>
                    <el-table-column
                      prop="return_total"
                      label="分账回退（￥）"
                    >
                    </el-table-column>
                    <el-table-column
                      prop="total_fee"
                      label="消费退款（￥）"
                    >
                    </el-table-column>
                    <div slot="append">
                        <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="chartOperateData.rows.length !== 0">
                          <div class='sum_footer_unit center'>平均</div>
                          <div class='sum_footer_unit'>{{buyAccount}}</div>
                          <div class='sum_footer_unit'>{{shareAccount}}</div>
                        </div>
                      </div>
                  </el-table>
                </div>
              </el-col>
            </el-row>
            <el-row>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button size="mini" round @click="changeBackRateStyle()">点击切换</el-button>
                <ve-histogram :data="chartBackRateData" :settings="chartBackRateSettings" :extend="saleExtends" :grid="grid" height="250px" v-if="isShowBackRate === false" ref="chart1"></ve-histogram>
                <div v-if="isShowBackRate === true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outBackRate', chartBackRateSettings.labelMap.diff_goods_num)" class="el-icon-download download_sty">导出表格</el-button>
                  <el-table
                      :data="chartBackRateData.rows"
                      stripe
                      show-summary
                      id="outBackRate"
                      style="width: 100%">
                      <el-table-column
                        label="日期"
                      >
                      <template slot-scope="scope">
                        <div>{{scope.row.ctime}}</div>
                      </template>
                      </el-table-column>
                      <el-table-column
                        prop="refundrate"
                        label="退款率（%）"
                      >
                      </el-table-column>
                      <div slot="append">
                        <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="chartBackRateData.rows.length !== 0">
                          <div class='sum_footer_unit center'>平均</div>
                          <div class='sum_footer_unit'>{{refundRateAccount}}</div>
                        </div>
                      </div>
                    </el-table>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="订单" name="2">
            <el-row>
              <el-col :span="12">
                <el-button size="mini" round @click="changePayStyle()">点击切换</el-button>
                <ve-histogram :data="chartPayData" :settings="chartPaySettings" :extend="saleExtends" :grid="grid" height="250px"  width="40vw" v-if="isShowPay === false" ref="chart2"></ve-histogram>
                <div v-if="isShowPay=== true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outPay', chartPaySettings.labelMap.count)" class="el-icon-download download_sty">导出表格</el-button>
                  <menu-tree :data = "chartPayData.rows" id="outPay" :Account="payAccount"></menu-tree>
                </div>
              </el-col>
              <el-col :span="12">
                <el-button size="mini" round @click="changeOrderStyle()">点击切换</el-button>
                <ve-histogram :data="chartOrderData" :settings="chartOrderSettings" height="250px" width="40vw" :grid="grid" :extend="saleExtends" v-if=" isShowOrder === false" ref="chart2"></ve-histogram>
                <div v-if="isShowOrder === true"  class="form_top">
                  <el-button size="mini" round @click="exportExcel('#out', chartOrderSettings.labelMap.count)" class="el-icon-download download_sty">导出表格</el-button>
                  <menu-tree :data = "chartOrderData.rows" id="out" :Account="ordersAccount"></menu-tree>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-button size="mini" round @click="changePayRataStyle()">点击切换</el-button>
                <ve-histogram :data="chartOrderRataData" :settings="chartOrderRataSettings" height="250px"  width="40vw" :grid="grid" :extend="saleExtends" v-if="isShowpayRata === false" ref="chart2"></ve-histogram>
                <div v-if="isShowpayRata === true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outOrderRata', chartOrderRataSettings.labelMap.payrate)" class="el-icon-download download_sty">导出表格</el-button>
                  <el-table
                      :data="chartOrderRataData.rows"
                      stripe
                      show-summary
                      id="outOrderRata"
                      style="width: 100%">
                      <el-table-column
                        label="日期"
                      >
                      <template slot-scope="scope">
                        <div>{{scope.row.ctime}}</div>
                      </template>
                      </el-table-column>
                      <el-table-column
                        prop="payrate"
                        label="支付率（%）"
                      >
                      </el-table-column>
                      <div slot="append">
                        <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="chartOrderRataData.rows.length !== 0">
                          <div class='sum_footer_unit center'>平均</div>
                          <div class='sum_footer_unit'>{{payRataAccount}}</div>
                        </div>
                      </div>
                    </el-table>
                </div>
              </el-col>
              <el-col :span="12">
                <el-button size="mini" round @click="changeUserStyle()">点击切换</el-button>
                <ve-histogram :data="chartUserData" :settings="chartUserSettings" height="250px" :grid="grid" :extend="saleExtends" v-if="isShowUser === false" ref="chart2"></ve-histogram>
                <div v-if="isShowUser === true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outUser', chartUserSettings.labelMap.count)" class="el-icon-download download_sty">导出表格</el-button>
                  <menu-tree :data = "chartUserData.rows" id="outUser" :Account="consumersAccount"></menu-tree>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="运营" name="3">
            <el-row>
              <el-col :span="12">
                <el-button size="mini" round @click="changeSupplyStyle()">点击切换</el-button>
                <ve-histogram :data="chartSupplyData" :settings="chartSupplySettings" :extend="saleExtends" :grid="grid" height="250px" v-show="isShowSupply === false" ref="chart3"></ve-histogram>
                <div v-show="isShowSupply=== true" class="form_top">
                  <el-button size="mini" round @click="exportExcel('#outSupply', chartSupplySettings.labelMap.diff_goods_num)" class="el-icon-download download_sty">导出表格</el-button>
                  <el-table
                      :data="chartSupplyData.rows"
                      stripe
                      show-summary
                      id="outSupply"
                      style="width: 100%">
                      <el-table-column
                        label="日期"
                      >
                      <template slot-scope="scope">
                        <div>{{scope.row.ctime}}</div>
                      </template>
                      </el-table-column>
                      <el-table-column
                        prop="diff_goods_num"
                        label="补货量（￥）"
                      >
                      </el-table-column>
                      <div slot="append">
                        <div class='sum_footer xiaoji' ref='sum_xiaoji' v-show="chartSupplyData.rows.length !== 0">
                          <div class='sum_footer_unit center'>平均</div>
                          <div class='sum_footer_unit'>{{supplyAccount}}</div>
                        </div>
                      </div>
                    </el-table>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
import dataTime from '@/components/dataTime'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import menuTree from './../../components/dataCharts'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { menuTree, dataTime },
  data () {
    this.saleExtends = {
      series: {
        barWidth: 15
      }
    }
    this.grid = {
      show: false,
      left: 40
    }
    // 订单
    this.chartOrderSettings = {
      labelMap: {
        'count': '订单量',
        'ctime': '日期'
      },
      yAxisName: ['订单量(个)']
    }
    // 运营
    this.chartOperateSettings = {
      metrics: ['storeTotal', 'total_fee', 'platTotal', 'accuracy', 'saleTotal'],
      stack: { '分成': ['storeTotal', 'total_fee', 'platTotal', 'accuracy'] },
      dimension: ['ctime'],
      labelMap: {
        'storeTotal': '门店',
        'total_fee': '运营',
        'ctime': '日期',
        'platTotal': '平台',
        'saleTotal': '总额',
        'accuracy': '误差'
      },
      legendName: {
        'storeTotal': '门店',
        'total_fee': '运营',
        'platTotal': '平台',
        'saleTotal': '总额',
        'accuracy': '误差'
      },
      yAxisName: ['收入（￥）']
    }
    // 支付数
    this.chartPaySettings = {
      labelMap: {
        'count': '支付数',
        'ctime': '日期'
      },
      yAxisName: ['支付数(个)']
    }
    // 小程序使用数量
    this.chartUserSettings = {
      labelMap: {
        'count': '用户数',
        'ctime': '日期'
      },
      yAxisName: ['用户数(个)']
    }
    // 补货历史
    this.chartSupplySettings = {
      labelMap: {
        'diff_goods_num': '补货数',
        'ctime': '日期'
      },
      yAxisName: ['补货数(个)']
    }
    // 订单支付率
    this.chartOrderRataSettings = {
      labelMap: {
        'payrate': '支付率',
        'ctime': '日期'
      },
      yAxisName: ['支付率(%)']
    }
    // 订单退款率
    this.chartBackRateSettings = {
      labelMap: {
        'refundrate': '退款率',
        'ctime': '日期'
      },
      yAxisName: ['退款率(%)']
    }
    // 退单
    this.chartRefundSettings = {
      metrics: ['return_total', 'total_fee'],
      labelMap: {
        'total_fee': '消费退款',
        'return_total': '分账回退',
        'ctime': '日期'
      },
      legendName: {
        'return_total': '分账回退',
        'total_fee': '消费退款'
      },
      yAxisName: ['退款额']
    }
    return {
      accuracyAccount: 0,
      supplyAccount: 0,
      ordersAccount: 0,
      payAccount: 0,
      payRataAccount: 0,
      consumersAccount: 0,
      buyAccount: 0,
      refundRateAccount: 0,
      shareAccount: 0,
      totalAccount: 0,
      storeAccount: 0,
      operateAccount: 0,
      plattamAccount: 0,
      refundArr: [],
      sopArr: [],
      activeName: '1',
      selectName: '',
      start_time: '',
      end_time: '',
      isShowBackRate: false,
      isShowpayRata: false,
      isShowSupply: false,
      isShowOperate: false,
      isShowSale: false,
      isShowOrder: false,
      aboutToday: false,
      isShowPay: false,
      isShowRefund: false,
      isShowUser: false,
      isShowStore: false,
      personStart: '',
      personEnd: '',
      orgId: 1,
      chartBackRateData: {
        columns: ['ctime', 'refundrate'],
        rows: []
      },
      chartSupplyData: {
        columns: ['ctime', 'diff_goods_num'],
        rows: []
      },
      chartOperateData: {
        columns: ['ctime', 'total_fee', 'saleTotal', 'platTotal', 'accuracy', 'storeTotal'],
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
      chartOrderRataData: {
        columns: ['ctime', 'payrate'],
        rows: []
      },
      chartRefundData: {
        columns: ['ctime', 'total_fee', 'return_total'],
        rows: []
      }
    }
  },
  created () {
    this.orgId = window.localStorage.getItem('active') === null ? 1 : window.localStorage.getItem('active')
    this.selectName = window.localStorage.getItem('cname')
  },
  methods: {
    getCurrentData (start, end) {
      this.start_time = start
      this.end_time = end
      if (this.activeName === '1') {
        this.getSaleRefund(this.start_time, this.end_time)
        this.getOperateRevenue(this.start_time, this.end_time)
        this.getrefundRata(this.start_time, this.end_time)
      } else if (this.activeName === '2') {
        this.getOrderData(this.start_time, this.end_time)
        this.getPayData(this.start_time, this.end_time)
        this.getUserData(this.start_time, this.end_time)
        this.getPayRataData(this.start_time, this.end_time)
      } else {
        this.getSupplyData(this.start_time, this.end_time)
      }
    },
    exportExcel (str, title) {
      const excelName = this.selectName + '-' + title + '-' + this.start_time.split(' ')[0].split('-').join('') + '-' + this.end_time.split(' ')[0].split('-').join('') + '.xlsx'
      /* generate workbook object from table */
      var wb = XLSX.utils.table_to_book(document.querySelector(str))
      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), excelName)
      } catch (e) {}
      return wbout
    },
    changeBackRateStyle () {
      this.isShowBackRate = !this.isShowBackRate
    },
    changeRefundStyle () {
      this.isShowRefund = !this.isShowRefund
    },
    changeOrderStyle () {
      this.isShowOrder = !this.isShowOrder
    },
    changeOperateStyle () {
      this.isShowOperate = !this.isShowOperate
    },
    changePayStyle () {
      this.isShowPay = !this.isShowPay
    },
    changeUserStyle () {
      this.isShowUser = !this.isShowUser
    },
    changeSupplyStyle () {
      this.isShowSupply = !this.isShowSupply
    },
    changePayRataStyle () {
      this.isShowpayRata = !this.isShowpayRata
    },
    // 获取今天
    async getTodayData () {
      this.chartOrderData = {
        columns: ['ctime', 'count'],
        rows: []
      }
      this.chartPayData = {
        columns: ['ctime', 'count'],
        rows: []
      }
      this.chartUserData = {
        columns: ['ctime', 'count'],
        rows: []
      }
      this.chartBackRateData = {
        columns: ['ctime', 'refundrate'],
        rows: []
      }
      this.chartSupplyData = {
        columns: ['ctime', 'diff_goods_num'],
        rows: []
      }
      this.chartOperateData = {
        columns: ['ctime', 'total_fee', 'platTotal', 'saleTotal'],
        rows: []
      }
      this.chartOrderRataData = {
        columns: ['ctime', 'payrate'],
        rows: []
      }
      this.chartRefundData = {
        columns: ['ctime', 'total_fee'],
        rows: []
      }
      var date = moment(new Date().getTime()).format('YYYY-MM-DD')
      var start = date + ' ' + '00:00:00'
      var today = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      this.getOperateRevenue(start, today)
      this.getSaleRefund(start, today)
      this.getrefundRata(start, today)
      this.getTotal(start, today, 'get_orders_refundrate_trend', this.chartBackRateData)
      this.getTotal(start, today, 'get_orders_total_trend', this.chartOrderData)
      this.getTotal(start, today, 'get_orders_paid_trend', this.chartPayData)
      this.getTotal(start, today, 'get_consumers_trend', this.chartUserData)
      this.getTotal(start, today, 'get_orders_payrate_trend', this.chartOrderRataData)
      this.getTotal(start, today, 'get_supplements_trend', this.chartSupplyData)
    },
    // 获取销售额数据
    async getTotal (start, end, action, databox, account) {
      this.start_time = start
      this.end_time = end
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, action, params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        // const length = res.ret_data.length
        // console.log(length)
        // res.ret_data.forEach(item => {
        //   if (item.count) {
        //     // account += (parseInt(item.count) / length).toFixed(2)
        //     account += parseInt(item.count) / length
        //   }
        // })
        // console.log(this.ordersAccount)
        // console.log(this.payAccount)
        // console.log(this.consumersAccount)
        databox.rows = res.ret_data
      }
    },
    // 获取退款率
    async getrefundRata (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_refundrate_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.refundrate)
      })
      this.refundRateAccount = (account / 100 / length).toFixed(2)
      this.chartBackRateData.rows = res.ret_data
    },
    // 获取订单量
    async getOrderData (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_total_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.count)
      })
      this.ordersAccount = (account / length).toFixed(0)
      this.chartOrderData.rows = res.ret_data
    },
    // 获取支付数
    async getPayData (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_paid_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.count)
      })
      this.payAccount = (account / length).toFixed(0)
      this.chartPayData.rows = res.ret_data
    },
    // 获取用户数
    async getUserData (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_consumers_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.count)
      })
      this.consumersAccount = (account / length).toFixed(0)
      this.chartUserData.rows = res.ret_data
    },
    //
    // 获取平台分成
    async getPlatamRevenue (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_platform_revenue_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach((item, index) => {
        this.sopArr[index]['platTotal'] = (item.total_fee / 100).toFixed(2)
      })
      this.getSaleRevenue(start, end)
    },
    // 获取销售额
    async getSaleRevenue (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach((item, index) => {
        this.sopArr[index]['saleTotal'] = (item.total_fee / 100).toFixed(2)
      })
      this.getPrecisionError(start, end)
    },
    // 获取分账误差
    async getPrecisionError (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_accuracy_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach((item, index) => {
        this.sopArr[index]['accuracy'] = (item.total_fee / 100).toFixed(2)
      })
      this.getStoreRevenue(start, end)
    },
    // 获取支付率
    async getPayRataData (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_orders_payrate_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.payrate)
      })
      this.payRataAccount = (account / 100 / length).toFixed(2)
      this.chartOrderRataData.rows = res.ret_data
    },
    // 获取补货数
    async getSupplyData (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_supplements_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let account = 0
      let length = res.ret_data.length
      res.ret_data.forEach(item => {
        account += parseInt(item.diff_goods_num)
      })
      this.supplyAccount = (account / length).toFixed(0)
      this.chartSupplyData.rows = res.ret_data
    },
    // 获取运营方式
    async getOperateRevenue (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_operator_revenue_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach(item => {
        item.total_fee = (item.total_fee / 100).toFixed(2)
      })
      this.sopArr = res.ret_data
      this.getPlatamRevenue(start, end)
    },
    // 获取门店分成
    async getStoreRevenue (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_store_revenue_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach((item, index) => {
        this.sopArr[index]['storeTotal'] = (item.total_fee / 100).toFixed(2)
      })
      this.getAverage(this.sopArr)
      this.chartOperateData.rows = this.sopArr
    },
    // 获取消费退款
    async getSaleRefund (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_refunds_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach(item => {
        item.total_fee = (item.total_fee / 100).toFixed(2)
      })
      this.refundArr = res.ret_data
      this.getShareRefund(start, end)
    },
    // 获取分账回退
    async getShareRefund (start, end) {
      const params = {
        org_id: this.orgId,
        start_time: start,
        end_time: end
      }
      const url = genRequestGetUrl(apiUrl, 'stats', accessKeyId, 'get_return_trend', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      res.ret_data.forEach((item, index) => {
        this.refundArr[index]['return_total'] = (item.total_fee / 100).toFixed(2)
      })
      let buyAccount = 0
      let shareAccount = 0
      const length = this.refundArr.length
      this.refundArr.forEach(item => {
        buyAccount += parseInt((item.total_fee * 100).toFixed(0))
        shareAccount += parseInt((item.return_total * 100).toFixed(0))
      })
      this.buyAccount = (buyAccount / length / 100).toFixed(2)
      this.shareAccount = (shareAccount / length / 100).toFixed(2)
      this.chartRefundData.rows = this.refundArr
    },
    // 获取平均数
    getAverage (arr) {
      let totalAccount = 0
      let storeAccount = 0
      let operateAccount = 0
      let plattamAccount = 0
      let accuracyAccount = 0
      const length = arr.length
      arr.forEach((item, index) => {
        operateAccount += parseInt((item.total_fee * 100).toFixed(0))
        storeAccount += parseInt((item.storeTotal * 100).toFixed(0))
        totalAccount += parseInt((item.saleTotal * 100).toFixed(0))
        plattamAccount += parseInt((item.platTotal * 100).toFixed(0))
        accuracyAccount += parseInt((item.accuracy * 100).toFixed(0))
      })
      this.totalAccount = (totalAccount / length / 100).toFixed(2)
      this.storeAccount = (storeAccount / length / 100).toFixed(2)
      this.operateAccount = (operateAccount / length / 100).toFixed(2)
      this.plattamAccount = (plattamAccount / length / 100).toFixed(2)
      this.accuracyAccount = (accuracyAccount / length / 100).toFixed(2)
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
      this.selectName = this.$route.query.cname
    },
    orgId () {
      this.getTodayData()
    },
    activeName (v) {
      this.getCurrentData(this.start_time, this.end_time)
      this.$nextTick(_ => {
        this.$refs[`chart${v}`].echarts.resize()
      })
    }
  }
}
</script>
<style scoped>
.stats_show >>> .el-col{
  border: 1px solid #eee;
  padding: 5px;
}
.stat_title{
  margin-left: 40%;
}
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
.stat_title >>> .el-row{
  margin-bottom:10px;
}
.stat_title >>> .el-button{
 padding: 6px 13px;
  margin: -1px;
  font-size: 12px;
  border: 1px solid #ccc;
  color: #129f77;
  background: #fff;
  border-radius: 0;
}
.stat_title >>> .el-button:hover{
  background: #129f77;
  color: #fff;
}
.person_style{
  padding: 6px;
  display: flex;
}
.person_style >>> .el-button{
  padding: 2px 3px;
}
.active{
  background: #129f77!important;
  color: #fff!important;
}
.popo .sure{
  margin: 0!important;
  border: 0!important;
}
.show_card {
width:49%;
margin-left:1%;
}
.card_height{
  min-height: 200px;
}
.card_height >>> .el-button{
  padding: 2px 15px;
}
.form_top{
  margin-top:20px;
}
.download_sty {
  color:#129f77;
  float:right;
}
.stat_title .show_time{
  float:left;
  width:600px;
  margin-left: 513px;
  margin-top: 9px;
}
.show_time span{
  margin:0 8px;
  font-size: 12px;
  color:#129f77
}
</style>

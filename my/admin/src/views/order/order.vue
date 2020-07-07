<template>
    <div>
        <head-notice></head-notice>
        <el-card class="box-card">
          <div style="float:left;">
            <calc-model
            @selectAllTotal="computeAll(selecttotalArr, '选中总额之和')"
            @selectStoreTotal="computeAll(selectStoreArr, '选中门店收入总额')"
            @selectOperateTotal="computeAll(selectOperateArr, '选中运营收入总额')"
            @selectPlattamTotal="computeAll(selectPlattamArr, '选中平台收入总额')"
            @selectData="exportExcel('#orderExcel')"
            >
            </calc-model>
          </div>
           <div class="order_title">
              <el-input placeholder="请输入内容" v-model="meId" clearable></el-input>
              <el-button type="primary" @click="selectByName()">名称查询</el-button>
             <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown" >
                  <el-dropdown-item >
                    <el-popover
                      placement="bottom"
                      trigger="click">
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;"  @click="isScroll = 'display:block;'">时段查询</el-button>
                    </el-popover>
                  </el-dropdown-item>
                  <el-dropdown-item><span @click="detailSearch()">高级查询</span></el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
              </el-button>
              <el-button type="primary" @click="reset()">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
        <el-table
          v-loading="loading"
          element-loading-text="正在  加载中"
          element-loading-background="rgba(0,0,0,.3)"
          ref="orderTable"
          @selection-change="selectBox"
          :data="tableList"
          id="orderExcel"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="48"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="55"
            @click="this.dialogFormVisible = true"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showDetail(slotProps.row.id)" class="mouse_hover">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="50"
            >
            <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                width="10"
                trigger="hover"
              >
                <div class="name_column">
                  {{slotProps.row.name}}
                </div>
                <el-button slot="reference" class="el-icon-view" style="border:0;padding:9px 12px;"></el-button>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="pay_type"
            label="支付类型"
            width="85"
            >
            <template slot-scope="slotProps">
              <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
              <el-tag type="success" v-if="slotProps.row.pay_type===2">支付宝支付</el-tag>
              <el-tag type="success" v-if="slotProps.row.pay_type===3">银行支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchant"
            label="商户"
            >
          </el-table-column>
           <el-table-column
            label="机器"
            width="152"
            >
            <template slot-scope="slotProps">
              <span>{{slotProps.row.machine_cname}},{{slotProps.row.machine_sn}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column
            prop="store"
            label="门店"
            width="100"
          >
          </el-table-column> -->
          <el-table-column
          width="135"
            label="支付结果,出货结果"
            >
             <template slot-scope="slotProps">
              <span class="success_font" v-show="slotProps.row.trade_state === 'SUCCESS'">支付成功</span>
              <span class="fail_font" v-show="slotProps.row.trade_state === 'USERPAYING'">等待支付</span>
              <span style="color:#aaa" v-show="slotProps.row.trade_state === 'CLOSED'">订单关闭</span>
              ,
              <span class="fail_font" v-show="slotProps.row.shipment_state === 0">等待出货</span>
              <span class="success_font" v-show="slotProps.row.shipment_state === 1">出货成功</span>
              <span class="fail_font" v-show="slotProps.row.shipment_state === 2">出货失败</span>
              <span class="fail_font" v-show="slotProps.row.shipment_state === 3">出货部分失败</span>
              <span class="fail_font" v-show="slotProps.row.shipment_state === 4">出货超时</span>
              <span style="color:#aaa" v-show="slotProps.row.shipment_state === 5">取消出货</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="return_state"
            width="130"
            label="分帐回退,消费退款"
          >
          <template slot-scope="slotProps">
             <span class="success_font" v-if="slotProps.row.return_state === 'SUCCESS'">回退成功</span>
             <span class="success_font" v-else>--------</span>,
             <span class="success_font" v-if="slotProps.row.refund_state === 'SUCCESS'">退款成功</span>
             <span class="success_font" v-else>--------</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="store"
            width="50"
            label="品类"
          >
            <template slot-scope="slotProps">
              {{slotProps.row.goods_list.length}}
            </template>
          </el-table-column>
          <el-table-column
            prop="store_revenue"
            width="200"
            label="总额<门店,运营,平台，误差>(元)"
            >
            <template slot-scope="slotProps">
             <span class="success_font"> {{ slotProps.row.settlement_total_fee + '&lt;' + slotProps.row.store_revenue + '，' + slotProps.row.operator_revenue+ '，' + slotProps.row.platform_revenue +  '，' + slotProps.row.accuracy_amount + '>'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            width="140"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column
            label="组织归属"
            width="100"
            >
              <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="280"
            >
            <template slot-scope="slotProps">
              <div class="top">
                  <el-button type="text" size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
                  <el-button type="text" size="mini">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link" style="font-size:12px;color:#409EFF">
                        关联<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown"  class="relate_order">
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedShare(slotProps.row.id)">分账</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedSale(slotProps.row.out_trade_no)">销售</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedTicket(slotProps.row.out_trade_no)">工单</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedRefund(slotProps.row.transaction_id)">退款</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
                    <el-button type="text" size="mini" @click="reviewAll(slotProps.row.id, slotProps.row.out_trade_no, slotProps.row.transaction_id)">总览</el-button>
                   <el-button type="text" size="mini" :disabled="(slotProps.row.trade_state === 'CLOSED' || slotProps.row.return_state === 'SUCCESS' || slotProps.row.shipment_state === 1 || slotProps.row.profit_sharing === 'N') ? true : false" @click="refundPolicyMoney(slotProps.row.id, slotProps.row.profit_sharing)">
                    分账回退
                  </el-button>
                   <el-button type="text" size="mini" :disabled="(slotProps.row.trade_state === 'CLOSED' || slotProps.row.refund_state === 'SUCCESS' || slotProps.row.shipment_state === 1) ? true : false" @click="refundMoney(slotProps.row.id)">
                    消费退款
                  </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <page-model :total="total" @sizeChange="handleSizeChange" @numChange="handleCurrentChange"></page-model>
        <!-- 弹框 -->
      <el-dialog title="搜索条件" :visible="dialogFormVisible" width="70%" @close='closeDialog'>
        <h2>搜索</h2>
        <el-form :model="modelList" :inline="true" class="select_form" ref="modelListRef" label-width="90px">
          <el-row>
            <el-col :span="8" :key="index" v-for="(item, index) in modelList">
              <el-form-item style="margin-right:34px;">
                <div style="display:flex;" class="search_add">
                  <span style="width:163px;text-align:center;">
                    <span v-if="item.comment.length < 7">{{item.comment}}</span>
                    <el-popover
                      placement="top-start"
                      width="10"
                      trigger="hover"
                      v-else
                    >
                      <div class="name_column">
                        {{item.comment}}
                      </div>
                      <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
                    </el-popover>
                  </span>
                  <el-input placeholder="请输入内容" v-model="input[index]" clearable></el-input>
                  <el-popover
                      placement="bottom"
                      width="400"
                      style="margin-left:5px;"
                      trigger="click">
                      <el-button slot="reference">高级设置</el-button>
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="顺序">
                          <el-radio-group v-model="order[item.comment]" :value="item.id" :id="index">
                            <el-radio label="无"></el-radio>
                            <el-radio label="升序"></el-radio>
                            <el-radio label="降序"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="查询" v-show="item.type.substring(0, 3) == 'VAR'">
                          <el-radio-group  v-model="selectCondition[index]">
                            <el-radio label="模糊"></el-radio>
                            <el-radio label="精确"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </el-popover>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 详情页 -->
      <el-dialog
        title="详细信息"
        :visible="detailDialogVisible"
        width="60%"
        :before-close="handleClose">
          <order-detail :detailList ="detailList" />
      </el-dialog>
        <!-- 关联 -->
      <el-dialog
        title="关联分账"
        :visible.sync="relatedSharesDialogVisible"
        width="60%"
        :before-close="handleClose">
        <share-detail :detailList="relatedShareList" />
      </el-dialog>
      <!-- 总览 -->
       <el-dialog
        title="订单总览"
        :visible.sync="reviewAllDialogVisible"
        width="80%"
        :before-close="handleClose">
        <order-flow :isSuccess="isSuccess" :isSaleSuccess="isSaleSuccess" :isShareSuccess="isShareSuccess" :orderTime="orderTime" :ticketTime="ticketTime" :refundTime="refundTime" :shareTime="shareTime" :saleTime="saleTime" :tableData="detailList" :shareData="relatedShareList" :saleData="relateSaleList" :ticketData="relateTicketList" :refundData="relateRefundList"></order-flow>
      </el-dialog>
       <el-dialog
        title="关联销售"
        :visible.sync="relatedSaleDialogVisible"
        width="80%"
        :before-close="handleClose">
        <sails-Table :isOperate="false" :tableList="relateSaleList"  @showSaleDetail = "showSingleSale"/>
        <el-dialog
          width="50%"
          title="详细信息"
          :visible.sync="innerSaleVisible"
          :before-close="closeDialog"
          append-to-body>
          <sail-detail :detailList="singleSale" ></sail-detail>
        </el-dialog>
      </el-dialog>
       <el-dialog
        title="关联工单"
        :visible.sync="relatedTicketDialogVisible"
        width="60%"
        :before-close="handleClose">
        <ticket-detail :detailList="relateTicketList" />
      </el-dialog>
      <el-dialog
        title="关联退款"
        :visible.sync="relatedRefundDialogVisible"
        width="80%"
        :before-close="handleClose">
        <refund-table :isSearch="false" :isInner="false" :isClass="false" :isShowPage="false" :supplyTable = "relateRefundList" @readInfo ="readCurrentIno"/>
        <el-dialog
          width="50%"
          title="详细信息"
          :visible.sync="innerRefundVisible"
          :before-close="closeDialog"
          append-to-body>
          <refund-detail :detailList="singleRefund"></refund-detail>
        </el-dialog>
      </el-dialog>
      <!-- 退款 -->
      <el-dialog
        :visible.sync="refundDialogVisible"
        width="50%"
        :before-close="handleClose">
        <div v-if="isSeparateAccount === true">
          <h3>消费退款</h3>
           <el-input placeholder="请输入确认的退款金额(全额或部分)" v-model="refundMoneyNum" clearable>
              <template slot="append">￥</template>
            </el-input>
            <div style="margin:20px 0;">
              <el-checkbox v-model="checked"></el-checkbox>
              <span style="margin-right:10px;">开启强制退款</span>
              <li style="color:#e63d3d;margin-top:5px;">强制退款是指可以先进行消费退款,再进行分帐回退（原则上，一般建议 先执行 分帐回退，再进行 消费退款）</li>
            </div>
        </div>
        <div v-else>
          <h3>分账回退</h3>
          <div>
              <el-row v-for="(item, index) in refundAccountList" :key="index" :gutter="20" style="margin:10px;">
                <el-col :span="6" style="display:flex;align-items: center;">
                  <span style="width:18%;margin:0 10px;">账号</span><el-input v-model="item.account" disabled></el-input>
                </el-col>
                <el-col :span="8"  style="display:flex;align-items: center;">
                  <span style="width:25%;">退款金额</span><el-input v-model="item.refund_fee" :placeholder="'可退最大金额为' + (item.amount / 100).toFixed(2)" @blur ="checkRefund(item.refund_fee, item.amount)">
                     <template slot="append">￥</template>
                  </el-input>
                </el-col>
                <el-col :span="8"  style="display:flex;align-items: center;">
                  <span style="width:12%;margin:0 10px;">备注</span><el-input v-model="item.description"  @blur ="checkDescription(item.description)"></el-input>
                </el-col>
                <el-col :span="2">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteCurrent(index)"></el-button>
                </el-col>
              </el-row>
          </div>
        </div>
        <div class="main_style">
            <h3 style="color:#129f77;">温馨提示</h3>
            <ul style="padding: 0 15px;">
              <li><p style="color:#129f77;">退款时统一以元为单位</p></li>
              <li><p style="color:#129f77;">常用换算：1角 = 0.1元 ，1分 = 0.01元</p></li>
              <li><p style="color:#129f77;">输入金额不能大于订单的总额（会失败）</p></li>
            </ul>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="refundDialogVisible = false" style="padding:8px 14px;background:#129f77;color:#fff;border:0;">取消</el-button>
          <el-button type="primary" @click="backMoney()" style="padding:8px 14px;background:#129f77;color:#fff;border:0;">确认</el-button>
        </span>
      </el-dialog>
      <err-info :isShowError="isShowError" :title="errorTitle" :content="errorContent" @closeError="closeErrorInfo" ref="errInfo"></err-info>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
// import { exportSelect } from '@/untils/untils.js'
import dataTime from '@/components/dataTime'
import moment from 'moment'
import calcModel from '@/components/calculatorModel'
import orderDetail from '@/components/orderModel/orderDetail.vue'
import orderFlow from '@/components/orderModel/orderFlow.vue'
import shareDetail from '@/components/sharesModel/sharesDetail.vue'
import sailDetail from '@/components/salesModel/salesDetail.vue'
import sailsTable from '@/components/salesModel/salesTable.vue'
import ticketDetail from '@/components/ticketsModel/tacketDetail.vue'
import refundTable from '@/components/refundModel/refundTable.vue'
import headNotice from './../../components/notice.vue'
import refundDetail from '@/components/refundModel/refundDetail.vue'
import errInfo from '@/components/errorMessage.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
// import FileSaver from 'file-saver'
// import XLSX from 'xlsx'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { pageModel, dataTime, shareDetail, calcModel, orderDetail, sailDetail, ticketDetail, sailsTable, refundTable, refundDetail, errInfo, orderFlow, headNotice },
  data () {
    return {
      excelData: [],
      isSaleSuccess: '',
      isShareSuccess: '',
      isSuccess: '',
      orderTime: '',
      shareTime: '',
      saleTime: '',
      refundTime: '',
      ticketTime: '',
      reviewAllDialogVisible: false,
      isShowError: false,
      errorTitle: '',
      errorContent: {},
      innerSaleVisible: false,
      singleSale: [],
      loading: false,
      singleRefund: [],
      innerRefundVisible: false,
      relatedRefundDialogVisible: false,
      relatedTicketDialogVisible: false,
      relatedSaleDialogVisible: false,
      relateSaleList: [],
      relateTicketList: [],
      relateRefundList: [],
      checked: '',
      refundAccountList: [],
      isSeparateAccount: '',
      refundStyle: '',
      selecttotalArr: [],
      selectStoreArr: [],
      selectOperateArr: [],
      selectPlattamArr: [],
      refunid: '',
      refundMoneyNum: '',
      refundDialogVisible: false,
      relatedSharesDialogVisible: false,
      relatedShareList: [],
      isScroll: 'display:block;',
      personStart: '',
      personEnd: '',
      orgId: '',
      detailList: [],
      detailDialogVisible: false,
      // 输入框集合
      input: {
        id: '',
        name: '',
        cname: '',
        ctime: '',
        default_discount_unit_price: '',
        default_retail_unit_price: '',
        default_share_ratio: '',
        default_supply_unit_price: '',
        deleted: '',
        norms: '',
        status: '',
        type: ''
      },
      // 顺序
      order: {},
      // 查询条件
      selectCondition: {
        'op': 'like'
      },
      value1: true,
      dialogFormVisible: false,
      modelList: { },
      tableList: [],
      total: 0,
      meId: '',
      form: {
        resource: ''
      },
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
    }
  },
  created () {
    this.getAllData()
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    exportExcel () {
      if (this.excelData.length === 0) return this.$message.warning('请先选择需要导出的内容')
      // exportSelect(this.excelData)
      var that = this
      require.ensure([], () => {
        // this.excelData.forEach(item => {
        //   item.pay_type = item.pay_type === 1 ? '微信支付' : (item.pay_type === 2 ? '支付宝支付' : '银行支付')
        //   item.shipment_state = item.shipment_state === 0 ? '等待出货' : (item.shipment_state === 1 ? '出货成功' : '出货失败')
        //   item.return_state = item.return_state === 'SUCCESS' ? '回退成功' : '----------'
        //   item.refund_state = item.refund_state === 'SUCCESS' ? '退款成功' : '----------'
        // })
        const { export_json_to_excel } = require('@/excel/export2Excel')  // eslint-disable-line
        const tHeader = ['编号', '名称', '商户', '组织归属', '支付类型', '出货结果', '分账回退', '消费退款', '总额', '门店收入', '运营收入', '平台收入'] // 导出的表头名信息
        const filterVal = ['id', 'name', 'merchant', 'store', 'pay_type', 'shipment_state', 'return_state', 'refund_state', 'settlement_total_fee', 'store_revenue', 'operator_revenue', 'platform_revenue'] // 导出的表头字段名，需要导出表格字段名
        const list = that.excelData
        const data = that.formatJson(filterVal, list)
        export_json_to_excel(tHeader, data, 'excel表格名字')  // eslint-disable-line
      })
    },
    // 格式转换，直接复制即可
    formatJson (filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    reviewAll (id, tradno, refunId) {
      this.getOverView(id)
      this.reviewAllDialogVisible = true
    },
    closeErrorInfo () {
      this.isShowError = false
    },
    showSingleSale (id) {
      this.singleSale = []
      this.relateSaleList.forEach(item => {
        if (item.id === id) {
          this.singleSale.push(item)
        }
      })
      this.innerSaleVisible = true
    },
    readCurrentIno (id) {
      this.singleRefund = []
      this.relateRefundList.forEach(item => {
        if (item.id === id) {
          this.singleRefund.push(item)
        }
      })
      this.innerRefundVisible = true
    },
    checkRefund (real, amount) {
      const re = (real * 100).toFixed(0)
      if (re > amount) {
        this.$message.warning('退款金额不能超过总额')
      }
    },
    checkDescription (val) {
      if (val === '') {
        this.$message.warning('备注内容不能为空')
      }
    },
    deleteCurrent (index) {
      this.refundAccountList.splice(index, 1)
    },
    computeAll (arr, name) {
      if (arr.length === 0) return this.$message.error('请先勾选表格中的选项')
      let count = 0
      arr.forEach(item => {
        count += item * 100
      })
      let total = (count / 100).toFixed(2)
      this.$message.success('当前' + name + '为：' + total + '￥')
    },
    // 监听表格单选框
    selectBox (val) {
      this.excelData = val
      if (this.$refs.orderTable.selection.length !== 0) {
        this.selecttotalArr = []
        this.selectStoreArr = []
        this.selectOperateArr = []
        this.selectPlattamArr = []
        this.$refs.orderTable.selection.forEach(item => {
          this.selecttotalArr.push(item.settlement_total_fee)
          this.selectStoreArr.push(item.store_revenue)
          this.selectOperateArr.push(item.operator_revenue)
          this.selectPlattamArr.push(item.platform_revenue)
        })
        this.isShowCalculator = true
      } else {
        this.isShowCalculator = false
      }
    },
    // 获取总览数据
    async getOverView (id) {
      this.detailList = []
      this.relatedShareList = []
      this.relateSaleList = []
      this.relateTicketList = []
      this.relateRefundList = []
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'get_lifecycle_info', { order_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      this.orderTime = moment(res.ret_data.order.mtime).format('YYYY-MM-DD HH:mm:ss')
      this.shareTime = moment(res.ret_data.share.mtime).format('YYYY-MM-DD HH:mm:ss')
      res.ret_data.sale_list.forEach(item => {
        this.saleTime = moment(item.mtime).format('YYYY-MM-DD HH:mm:ss')
        if (item.drop_goods_status !== 1) {
          this.isSaleSuccess = false
        } else {
          this.isSaleSuccess = true
        }
      })
      res.ret_data.refund_list.forEach(item => {
        this.refundTime = moment(item.mtime).format('YYYY-MM-DD HH:mm:ss')
      })
      this.ticketTime = moment(res.ret_data.share.mtime).format('YYYY-MM-DD HH:mm:ss')
      this.detailList.push(res.ret_data.order)
      this.relatedShareList.push(res.ret_data.share)
      this.relateSaleList = res.ret_data.sale_list
      this.relateTicketList.push(res.ret_data.ticket)
      this.relateRefundList = res.ret_data.refund_list
      if (res.ret_data.order.shipment_state !== 1 || res.ret_data.order.result_code !== 'SUCCESS') {
        if (res.ret_data.order.trade_state === 'CLOSED') {
          this.isSuccess = '2'
        } else {
          this.isSuccess = '1'
        }
      } else {
        this.isSuccess = '3'
      }
      if (res.ret_data.share.result_code !== 'SUCCESS') {
        if (res.ret_data.order.trade_state === 'CLOSED') {
          this.isShareSuccess = '2'
        } else {
          this.isShareSuccess = '1'
        }
      } else {
        this.isShareSuccess = '3'
      }
    },
    // 退款
    refundMoney (id, style) {
      this.refundStyle = style
      this.refundMoneyNum = ''
      this.refunid = id
      this.isSeparateAccount = true
      this.refundDialogVisible = true
    },
    // 分账退款
    refundPolicyMoney (id, style) {
      this.refunid = id
      this.refundStyle = style
      this.getRealtedSharesData(id)
      this.isSeparateAccount = false
      this.refundDialogVisible = true
    },
    async backMoney () {
      if (this.isSeparateAccount === false) {
        const arr = []
        this.refundAccountList.forEach(item => {
          const obj = {
            account: item.account,
            refund_fee: (item.refund_fee * 100).toFixed(0),
            description: item.description
          }
          arr.push(obj)
        })
        const refundStr = JSON.stringify(arr)
        const params = {
          order_id: this.refunid,
          refund_list: refundStr
        }
        const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'return_share', params, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('退款成功')
          this.refundDialogVisible = false
          this.getAllData()
        }
      } else {
        const reFee = (this.refundMoneyNum * 100).toFixed(0)
        if (reFee === 0) return this.$message.err('退款金额不能为0')
        if (this.checked) {
          const params = {
            order_id: this.refunid,
            refund_fee: reFee,
            force: true
          }
          const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'refund_order', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('退款成功')
            this.refundDialogVisible = false
            this.getAllData()
          }
        } else {
          const params = {
            order_id: this.refunid,
            refund_fee: reFee,
            force: false
          }
          const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'refund_order', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('退款成功')
            this.refundDialogVisible = false
            this.getAllData()
          }
        }
      }
    },
    relatedShare (id) {
      this.getRealtedSharesData(id)
      this.relatedSharesDialogVisible = true
    },
    relatedSale (id) {
      this.getRealtedSaleData(id)
      this.relatedSaleDialogVisible = true
    },
    // 关联工单
    relatedTicket (id) {
      this.getrelatedTicket(id)
      this.relatedTicketDialogVisible = true
    },
    // 关联退款  退款可能有多项
    relatedRefund (id) {
      this.getrelatedRefund(id)
      this.relatedRefundDialogVisible = true
    },
    // 获取关联工单
    async getrelatedTicket (id) {
      this.relateTicketList = []
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'query_related_ticket', { out_trade_no: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relateTicketList = res.ret_data.rows
        } else {
          this.$message.warning('当前无工单信息')
        }
      }
    },
    // 获取关联退款
    async getrelatedRefund (id) {
      this.relateRefundList = []
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'query_related_refund', { transaction_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        this.isShowError = true
        this.errorTitle = 'Error, 有接口调用错误：' + res.ret_msg
        this.errorContent = res.ret_res
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relateRefundList = res.ret_data.rows
        } else {
          this.$message.warning('当前无退款信息')
        }
      }
    },
    // 获取关联销售
    async getRealtedSaleData (id) {
      this.relateSaleList = []
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'query_related_sale', { out_trade_no: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        this.isShowError = true
        this.errorTitle = 'Error, 有接口调用错误：' + res.ret_msg
        this.errorContent = res.ret_res
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relateSaleList = res.ret_data.rows
        } else {
          this.$message.warning('当前无销售信息')
        }
      }
    },
    // 获取关联分账
    async getRealtedSharesData (id) {
      this.refundAccountList = []
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'query_related_share', { order_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.relatedShareList = res.ret_data.rows
        this.sharetotal = res.ret_total
        res.ret_data.rows[0].receivers.forEach(item => {
          if (item.type !== 'PERSONAL_WECHATID') {
            const obj = {
              account: item.account,
              refund_fee: '',
              amount: item.amount,
              description: ''
            }
            this.refundAccountList.push(obj)
          }
        })
      }
    },
    getScroll () {
      this.isScroll = 'display:none;'
    },
    // 按照时间搜索
    getCurrentData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getAllData()
    },
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllData()
    },
    handleClose () {
      this.detailDialogVisible = false
      this.relatedSharesDialogVisible = false
      this.relatedSaleDialogVisible = false
      this.refundDialogVisible = false
      this.relatedTicketDialogVisible = false
      this.relatedRefundDialogVisible = false
      this.reviewAllDialogVisible = false
    },
    sure () {
      this.dialogFormVisible = true
      var arr = []
      var arr1 = []
      for (let key in this.input) {
        if (this.input[key] !== '') {
          if (key === 'default_discount_unit_price' || key === 'default_retail_unit_price' || key === 'default_share_ratio' || key === 'default_supply_unit_price' || key === 'id') {
            var obj1 = {
              'key': key,
              'op': 'eq',
              'value': parseFloat(this.input[key])
            }
            arr.push(obj1)
          } else {
            var obj = {
              'key': key,
              'op': 'like',
              'value': this.input[key]
            }
            arr.push(obj)
          }
          this.searchJson.filter = [...arr, ...arr1]
        }
      }
      this.getAllData()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    closeDialog () {
      this.dialogFormVisible = false
      this.innerRefundVisible = false
      this.innerSaleVisible = false
    },
    async showDetail (id) {
      this.getSingleOrder(id)
      this.detailDialogVisible = true
    },
    async getSingleOrder (id) {
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(ele => {
          ele['country'] = ele.country + '·' + ele.region + '·' + ele.province + '·' + ele.city + '·' + ele.district + '·' + ele.address
        })
        this.detailList = res.ret_data
      }
    },
    async selectByName () {
      if (this.meId === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.meId
      }
      this.searchJson.filter.push(obj)
      this.getAllData()
      this.searchJson.filter = []
    },
    async getAllData () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'orders', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.tableList = res.ret_data
        res.ret_data.forEach(ele => {
          ele['country'] = ele.country + '·' + ele.region + '·' + ele.province + '·' + ele.city + '·' + ele.district + '·' + ele.address
          ele['settlement_total_fee'] = (ele.settlement_total_fee / 100).toFixed(2)
          ele['store_revenue'] = (ele.store_revenue / 100).toFixed(2)
          ele['operator_revenue'] = (ele.operator_revenue / 100).toFixed(2)
          ele['platform_revenue'] = (ele.platform_revenue / 100).toFixed(2)
          ele['accuracy_amount'] = (ele.accuracy_amount / 100).toFixed(2)
        })
        this.total = res.ret_total
        this.loading = false
      }
    },
    async detailSearch () {
      this.dialogFormVisible = true
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.searchJson['org_id'] = this.orgId
      this.getAllData()
    }
  }
}
</script>
<style scoped>
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
}
.order_title{
  float: right;
   margin-bottom: 5px;
}
.mouse_hover{
  cursor: pointer;
}
.btn_sty{
  border: 0;
}
.name_column{
  padding: 5px;
}
.success_font{
  color:#129f77;
}
.fail_font{
  color:red;
}
.order_title >>> .el-input{
  width: 300px;
}
.order_title  >>> .el-button{
  margin:5px 20px;
}
.order_title .higher_search{
  margin-right:20px
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.select_form >>>.el-form-item{
  margin-bottom: 5px;
}
.select_form >>>.el-form-item:nth-child(even){
  margin-right: 50px;
  float: right;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
.box-card >>> .el-button{
  padding: 7px 17px;
}
.relate_order >>> .el-dropdown-menu__item {
  line-height: 24px!important;
}
</style>

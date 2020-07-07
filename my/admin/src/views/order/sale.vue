<template>
    <div>
        <head-notice></head-notice>
        <el-card class="box-card">
          <div style="float:left;">
            <calc-model
              :disabled="isShowCalculator"
              @selectAllTotal="computeAll(selecttotalArr, '选中总额之和')"
              @selectStoreTotal="computeAll(selectStoreArr, '选中门店收入总额')"
              @selectOperateTotal="computeAll(selectOperateArr, '选中运营收入总额')"
              @selectPlattamTotal="computeAll(selectPlattamArr, '选中平台收入总额')"
              @selectData="exportExcel('#saleExcel')"
              >
              </calc-model>
            </div>
           <div style="float:right;margin-bottom: 5px;">
              <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
              <el-button type="primary" @click="selectByName()" style="margin:5px 20px">名称查询</el-button>
              <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                      <el-popover
                      placement="bottom"
                      trigger="click">
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData'  :style="isScroll"></data-time>
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
        id="saleExcel"
          v-loading="loading"
          element-loading-text="正在  加载中"
          element-loading-background="rgba(0,0,0,.3)"
          ref="saleTable"
          @selection-change="selectBox"
          :data="tableList"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="50"
            @click="this.dialogFormVisible = true"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="60"
            >
            <template slot-scope="slotProps">
                <el-popover
                  placement="top-start"
                  trigger="hover"
                  >
                  <div style="padding:5px;">
                    {{slotProps.row.name}}
                  </div>
                  <el-button slot="reference" class="el-icon-view" style="border:0;padding:9px 15px;"></el-button>
                </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="goods_cname"
            width="130"
            label="商品名称">
            <template slot-scope="slotProps">
               <span style="color:#7949F4">{{slotProps.row.goods_cname}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="pay_type"
            label="支付类型"
            width="85"
            >
            <template slot-scope="slotProps">
              <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
              <el-tag v-else>其他支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="drop_goods_status"
            label="出货状态">
             <template slot-scope="slotProps">
               <el-tag type="success" v-show="slotProps.row.drop_goods_status === 1">成功</el-tag>
               <el-tag type="danger" v-show="slotProps.row.drop_goods_status === 2">失败</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="machine_cname"
            label="机器名称">
          </el-table-column>
          <el-table-column
            prop="channel_num"
            label="货道"
            width="50"
            >
          </el-table-column>
          <el-table-column
            prop="merchant"
            label="商户"
            width="150"
            >
          </el-table-column>
          <el-table-column
            prop="store"
            width="100"
            label="门店">
          </el-table-column>
          <el-table-column
            prop="store_revenue"
            width="220"
            label="总额<门店,运营,平台，误差>(元)"
            >
            <template slot-scope="slotProps">
             <span style="color:#129F77;"> {{ slotProps.row.sale_unit_price + '&lt;' + slotProps.row.store_revenue + '，' + slotProps.row.operator_revenue+ '，' + slotProps.row.platform_revenue +  '，' + slotProps.row.accuracy_amount + '>'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="sale_unit_price"
            label="地址"
            width="50"
            >
            <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                trigger="hover"
                >
                <div style="padding:5px;">
                  {{slotProps.row.country}}
                </div>
                <el-button slot="reference" class="el-icon-view" style="border:0;padding:0;"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            prop="ctime"
            width="150"
            label="创建时间"
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
            width="145"
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
                          <el-button type="text" size="mini" @click="relatedOrder(slotProps.row.id)">订单</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedRefund(slotProps.row.id)">退款</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchJson.page.page_num"
          :page-sizes="[10,15,25,50,100,200]"
          :page-size="this.searchJson.page.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination> -->
        <page-model :total="total" @sizeChange="handleSizeChange" @numChange="handleCurrentChange"></page-model>
        <!-- 弹框 -->
      <el-dialog title="搜索条件" :visible="dialogFormVisible" @close='closeDialog'>
        <h2>搜索</h2>
        <el-form :model="modelList" :inline="true" label-position = "top" class="select_form" ref="modelListRef">
          <el-form-item :label="item.comment" :key="index" v-for="(item, index) in modelList">
            <!-- <pre>{{item.type}}</pre> -->
            <div style="display:flex;" class="search_add">
              <el-input placeholder="请输入内容" v-model="input[index]" clearable></el-input>
               <el-popover
                  placement="bottom"
                  title="高级设置"
                  width="400"
                  style="margin-left:15px;"
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
        </el-form>
        <h2>关联</h2>
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
        class="sale_detail"
        :before-close="handleClose">
          <sales-detail :detailList = "detailList"></sales-detail>
      </el-dialog>
      <!-- 关联 -->
      <el-dialog
        title="关联订单"
        :visible.sync="relatedOrderDialogVisible"
        width="54%"
        :before-close="handleClose">
        <order-detail :detailList ="relatedOrderList" />
      </el-dialog>
      <!-- 关联退款 -->
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
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import { exportSelect } from '@/untils/untils.js'
import headNotice from './../../components/notice.vue'
import dataTime from '@/components/dataTime'
import calcModel from '@/components/calculatorModel'
import orderDetail from '@/components/orderModel/orderDetail.vue'
import salesDetail from '@/components/salesModel/salesDetail.vue'
import refundTable from '@/components/refundModel/refundTable.vue'
import refundDetail from '@/components/refundModel/refundDetail.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { pageModel, dataTime, orderDetail, calcModel, salesDetail, refundTable, refundDetail, headNotice },
  data () {
    return {
      excelData: [],
      loading: false,
      singleRefund: [],
      innerRefundVisible: false,
      relatedRefundDialogVisible: false,
      relateRefundList: [],
      isShowCalculator: false,
      selecttotalArr: [],
      selectStoreArr: [],
      selectOperateArr: [],
      selectPlattamArr: [],
      relatedOrderDialogVisible: false,
      relatedOrderList: [],
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
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  created () {
    this.getAllSaleData()
  },
  methods: {
    exportExcel () {
      exportSelect(this.excelData)
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
      if (this.$refs.saleTable.selection.length !== 0) {
        this.selecttotalArr = []
        this.selectStoreArr = []
        this.selectOperateArr = []
        this.selectPlattamArr = []
        this.$refs.saleTable.selection.forEach(item => {
          this.selecttotalArr.push(item.sale_unit_price)
          this.selectStoreArr.push(item.store_revenue)
          this.selectOperateArr.push(item.operator_revenue)
          this.selectPlattamArr.push(item.platform_revenue)
        })
        this.isShowCalculator = true
      } else {
        this.isShowCalculator = false
      }
    },
    relatedOrder (id) {
      this.getRealtedOrderData(id)
      this.relatedOrderDialogVisible = true
    },
    relatedRefund (id) {
      this.getrelatedRefund(id)
    },
    // 获取关联退款
    async getrelatedRefund (id) {
      this.relateRefundList = []
      const url = genRequestGetUrl(apiUrl, 'sales', accessKeyId, 'query_related_refund', { sale_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relateRefundList = res.ret_data.rows
          this.relatedRefundDialogVisible = true
        } else {
          this.$message.warning('当前无退款信息')
        }
      }
    },
    // 获取关联订单
    async getRealtedOrderData (id) {
      const url = genRequestGetUrl(apiUrl, 'sales', accessKeyId, 'query_related_order', { sale_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.relatedOrderList = res.ret_data.rows
        this.ordertotal = res.ret_total
      }
    },
    getScroll () {
      this.isScroll = 'display:none;'
    },
    // 按照时间搜索
    getCurrentData (start, end) {
      this.searchJson.filter = []
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getAllSaleData()
    },
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllSaleData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllSaleData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllSaleData()
    },
    handleClose () {
      this.detailDialogVisible = false
      this.relatedRefundDialogVisible = false
      this.relatedOrderDialogVisible = false
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
      this.getAllSaleData()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    closeDialog () {
      this.innerRefundVisible = false
      this.dialogFormVisible = false
    },
    async showDetail (id) {
      const url = genRequestGetUrl(apiUrl, 'sales', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data.rows
        this.detailDialogVisible = true
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
      this.getAllSaleData()
      this.searchJson.filter = []
    },
    async getAllSaleData () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'sales', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
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
          ele['store_revenue'] = (ele.store_revenue / 100).toFixed(2)
          ele['operator_revenue'] = (ele.operator_revenue / 100).toFixed(2)
          ele['platform_revenue'] = (ele.platform_revenue / 100).toFixed(2)
          ele['sale_unit_price'] = (ele.sale_unit_price / 100).toFixed(2)
          ele['accuracy_amount'] = (ele.accuracy_amount / 100).toFixed(2)
        })
        this.tableList = res.ret_data
        this.total = res.ret_total
        this.loading = false
      }
    },
    async detailSearch () {
      const url = genRequestGetUrl(apiUrl, 'sales', accessKeyId, 'list_schema', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.modelList = res.ret_data.rows
      this.dialogFormVisible = true
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.searchJson['org_id'] = this.orgId
      this.getAllSaleData()
    }
  }
}
</script>
<style>
.el-pagination{
  margin-top: 30px;
}
</style>
<style scoped>
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.direct_select{
  margin-left: 10px;
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
.sale_detail >>> .el-dialog__body{
  padding-left:120px;
}
.relate_order >>> .el-dropdown-menu__item {
  line-height: 24px!important;
}
</style>

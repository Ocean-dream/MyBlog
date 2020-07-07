<template>
    <div>
        <head-notice></head-notice>
        <el-card class="box-card">
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
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;" @click="isScroll = 'display:block;'">时段查询</el-button>
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
          :data="tableList"
          style="width: 100%">
          <el-table-column
            type="selection"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="80"
            @click="this.dialogFormVisible = true"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="80"
            >
            <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                width="10"
                trigger="hover"
              >
                <div style="padding:5px;">
                  {{slotProps.row.name}}
                </div>
                <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="支付类型"
            width="100"
            >
            <template slot-scope="slotProps">
                <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
                <el-tag type="success" v-if="slotProps.row.pay_type===2">支付宝支付</el-tag>
                <el-tag type="success" v-if="slotProps.row.pay_type===3">银行支付</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="result_code"
            label="结果"
            >
            <template slot-scope="slotProps">
                <span v-if="slotProps.row.result_code==='SUCCESS'">成功</span>
                <span type="success" v-else-if="slotProps.row.result_code==='WAIT'">等待</span>
                <span type="success" v-else-if="slotProps.row.result_code==='AMOUNT_OVERDUE'">比例失败</span>
                <span type="success" v-else-if="slotProps.row.result_code==='INVALID_REQUEST'">非法请求</span>
              </template>
          </el-table-column>
          <el-table-column
            label="分账主体"
          >
          <template slot-scope="slotProps">
            <el-tag v-show="slotProps.row.order_subject_info.subject_name === 'operator'">运营方</el-tag>
            <el-tag type="success" v-show="slotProps.row.order_subject_info.subject_name === 'store'">门店方</el-tag>
            <el-tag type="info" v-show="slotProps.row.order_subject_info.subject_name === 'platform'">平台方</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            label="分账客体"
            width="180"
          >
          <template slot-scope="slotProps">
            <span v-for="(item, index) in slotProps.row.order_object_list" :key="index">
              <el-tag type="info">{{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}（{{item.object_type === 'MERCHANT_ID'?'商户':'个人'}}）</el-tag>
            </span>
          </template>
          </el-table-column>
           <el-table-column
            label="分账金额(￥)"
            width="250"
            >
            <template slot-scope="slotProps">
            <span v-for="(item, index) in slotProps.row.receivers" :key="index">
              <el-tag type="info">{{item.name}}（{{(item.amount / 100).toFixed(2)}}）</el-tag>
            </span>
          </template>
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="mtime"
            label="编辑时间"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
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
            width="175"
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
                          <el-button type="text" size="mini" @click="relatedRefund(slotProps.row.order_id)">回退</el-button>
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
        width="65%"
        :before-close="handleClose">
          <share-detail :detailList="detailList" />
      </el-dialog>
      <el-dialog
        title="关联订单"
        :visible.sync="relatedOrderDialogVisible"
        width="54%"
        :before-close="handleClose">
        <order-detail :detailList ="relatedOrderList"/>
      </el-dialog>
      <el-dialog
        title="关联工单"
        :visible.sync="relatedRefundDialogVisible"
        width="54%"
        :before-close="handleClose">
        <refund-detail :detailList ="relatedRefundData" />
      </el-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import dataTime from '@/components/dataTime'
import shareDetail from '@/components/sharesModel/sharesDetail.vue'
import headNotice from './../../components/notice.vue'
import orderDetail from '@/components/orderModel/orderDetail.vue'
import refundDetail from '@/components/refundModel/refundDetail.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { pageModel, dataTime, orderDetail, shareDetail, refundDetail, headNotice },
  data () {
    return {
      loading: false,
      relatedRefundDialogVisible: false,
      relatedRefundData: [],
      relatedOrderDialogVisible: false,
      relatedOrderList: [],
      isScroll: 'display:block;',
      orgId: '',
      detailList: [],
      personStart: '',
      personEnd: '',
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
      // value1: true,
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
    this.getAllSharesData()
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    relatedOrder (id) {
      this.getRealtedOrderData(id)
      this.relatedOrderDialogVisible = true
    },
    // 关联回退
    relatedRefund (id) {
      this.getRealtedRefund(id)
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
      this.getAllSharesData()
    },
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllSharesData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllSharesData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllSharesData()
    },
    handleClose () {
      this.detailDialogVisible = false
      this.relatedOrderDialogVisible = false
      this.relatedRefundDialogVisible = false
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
    },
    async showDetail (id) {
      const url = genRequestGetUrl(apiUrl, 'shares', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
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
      this.getAllSharesData()
      this.searchJson.filter = []
    },
    async getAllSharesData () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'shares', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.tableList = res.ret_data
        this.total = res.ret_total
        this.loading = false
      }
    },
    async detailSearch () {
      const url = genRequestGetUrl(apiUrl, 'shares', accessKeyId, 'list_schema', { }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.modelList = res.ret_data
      this.dialogFormVisible = true
    },
    // 获取关联回退
    async getRealtedRefund (id) {
      const url = genRequestGetUrl(apiUrl, 'shares', accessKeyId, 'query_related_refund', { wx_order_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      // if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      // this.relatedRefundData = res.ret_data.rows
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relatedRefundData = res.ret_data.rows
          this.relatedRefundDialogVisible = true
        } else {
          this.$message.warning('当前无退款信息')
        }
      }
    },
    // 获取关联订单
    async getRealtedOrderData (id) {
      const url = genRequestGetUrl(apiUrl, 'shares', accessKeyId, 'query_related_order', { share_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.relatedOrderList = res.ret_data.rows
      }
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.searchJson['org_id'] = this.orgId
      this.getAllSharesData()
    }
  }
}
</script>
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

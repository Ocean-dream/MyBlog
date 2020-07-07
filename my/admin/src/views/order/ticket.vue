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
                <el-button slot="reference" class="el-icon-view" style="border:0;padding:6px 15px;"></el-button>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="machine_id"
            label="机器编号"
            width="75"
            >
          </el-table-column>
          <el-table-column
            prop="machine_sn"
            label="机器SN"
            width="140"
            >
          </el-table-column>
           <el-table-column
            prop="type"
            label="反馈类型"
          >
          <template slot-scope="slotProps">
            <el-tag type="danger" v-if="slotProps.row.type === 1">没出货</el-tag>
            <el-tag type="danger" v-else-if="slotProps.row.type === 2">部分没出货</el-tag>
            <el-tag type="danger" v-else-if="slotProps.row.type === 3">货品不对</el-tag>
            <el-tag type="danger" v-else-if="slotProps.row.type === 4">质量有问题</el-tag>
            <el-tag type="danger" v-else-if="slotProps.row.type === 9">其他</el-tag>
          </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="反馈描述"
            >
          </el-table-column>
          <el-table-column
            label="状态"
            >
            <template slot-scope="slotProps">
              <span v-show="slotProps.row.status === 1">已处理</span>
              <span v-show="slotProps.row.status === 2">未处理</span>
              <span v-show="slotProps.row.status === 3">处理中</span>
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
            >
              <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="200"
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
                  <el-button type="text" size="mini" @click="closeTicket(slotProps.row.id)">关闭</el-button>
                  <el-button type="text" size="mini" @click="refundMoney(slotProps.row.id)" :disabled="slotProps.row.status === 1 ? true : false">退款</el-button>
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
        :before-close="handleClose">
          <ticket-detail :detailList = "detailList"></ticket-detail>
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
      <!-- 跳转退款 -->
      <el-dialog
        :visible.sync="skipRefundVisible"
        width="30%"
        :before-close="handleClose">
        <p>请到<span style="color:#129F77">{{relatedOrderId}}</span>号订单下完成退款</p>
        <router-link :to="{ path: '/order' }" target="_blank">跳转退款</router-link>
      </el-dialog>
      <!-- 关闭订单 -->
      <el-dialog
        :visible.sync="isShowCloseTicket"
        width="30%"
        :before-close="handleClose">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入关闭原因"
          v-model="textarea">
        </el-input>
         <div slot="footer" class="dialog-footer">
          <el-button @click="isShowCloseTicket = false">取 消</el-button>
          <el-button type="primary" @click="submitClose()">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import dataTime from '@/components/dataTime'
import orderDetail from '@/components/orderModel/orderDetail.vue'
import headNotice from './../../components/notice.vue'
import ticketDetail from '@/components/ticketsModel/tacketDetail.vue'
import refundTable from '@/components/refundModel/refundTable.vue'
import refundDetail from '@/components/refundModel/refundDetail.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: {
    dataTime,
    orderDetail,
    ticketDetail,
    refundTable,
    refundDetail,
    headNotice,
    pageModel
  },
  data () {
    return {
      textarea: '',
      isShowCloseTicket: false,
      ticketId: '',
      relatedOrderId: '',
      skipRefundVisible: false,
      loading: false,
      singleRefund: [],
      innerRefundVisible: false,
      relatedRefundDialogVisible: false,
      relateRefundList: [],
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
    this.getAllTicketData()
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    async submitClose () {
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'close_ticket', { ticket_id: this.ticketId, reason: this.textarea }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('关闭成功')
        this.isShowCloseTicket = false
      }
    },
    closeTicket (id) {
      this.ticketId = id
      this.isShowCloseTicket = true
    },
    refundMoney (id) {
      this.skipRefundVisible = true
      this.getRealtedOrderData(id)
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
    relatedRefund (id) {
      this.getrelatedRefund(id)
    },
    // 获取关联退款
    async getrelatedRefund (id) {
      this.relateRefundList = []
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'query_related_refund', { ticket_id: id }, accessKeySecret)
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
    relatedOrder (id) {
      this.getRealtedOrderData(id)
      this.relatedOrderDialogVisible = true
    },
    // 获取关联订单
    async getRealtedOrderData (id) {
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'query_related_order', { ticket_id: id }, accessKeySecret)
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
        this.relatedOrderId = res.ret_data.rows[0].id
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
      this.getAllTicketData()
    },
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllTicketData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllTicketData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllTicketData()
    },
    handleClose () {
      this.detailDialogVisible = false
      this.isShowCloseTicket = false
      this.relatedOrderDialogVisible = false
      this.relatedRefundDialogVisible = false
      this.relatedOrderDialogVisible = false
      this.skipRefundVisible = false
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
      this.getAllTicketData()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    closeDialog () {
      this.dialogFormVisible = false
      this.innerRefundVisible = false
    },
    async showDetail (id) {
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data
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
      this.getAllTicketData()
      this.searchJson.filter = []
    },
    async getAllTicketData () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
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
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'list_schema', { }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.modelList = res.ret_data
        this.dialogFormVisible = true
      }
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.searchJson['org_id'] = this.orgId
      this.getAllTicketData()
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

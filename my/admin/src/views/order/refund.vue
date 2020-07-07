<template>
  <div>
    <refund-table
      :pagesize = "searchJson.page.page_size"
      :pagenum= "searchJson.page.page_num"
      :isScroll = "isScroll"
      :loading = "loading"
      :total= "total"
      :isExpand="false"
      :supplyTable ="refundList"
      @resetData="resetRefund"
      @pageSize="changeSize"
      @selectBySupplyHistoryName="searchName"
      @pageNum="currentChange"
      @readInfo="readCurrentInfo"
      @getNewTableData="currentTimeData"
      @controlSearch="changeScroll"
      @searchOrder="searchRelatedOrder"
      @searchTicket="searchRelatedTicket"
     ></refund-table>
    <el-dialog
      title="关联订单"
      :visible.sync="relatedOrderDialogVisible"
      width="54%"
      :before-close="handleClose">
      <order-detail :detailList ="relatedOrderList" />
    </el-dialog>
    <el-dialog
      title="关联工单"
      :visible.sync="relatedTicketDialogVisible"
      width="54%"
      :before-close="handleClose">
      <ticket-detail :detailList ="relatedTicketList" />
    </el-dialog>
    <el-dialog
      title="详情展示"
      :visible.sync="refundDialogVisible"
      width="54%"
      :before-close="handleClose">
      <refund-detail :detailList ="singleRefundList" />
    </el-dialog>
  </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import refundTable from '@/components/refundModel/refundTable.vue'
import refundDetail from '@/components/refundModel/refundDetail.vue'
import orderDetail from '@/components/orderModel/orderDetail.vue'
import ticketDetail from '@/components/ticketsModel/tacketDetail.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: {
    refundTable,
    orderDetail,
    refundDetail,
    ticketDetail
  },
  data () {
    return {
      loading: false,
      relatedTicketDialogVisible: false,
      relatedTicketList: [],
      isScroll: 'display:block;',
      total: 0,
      orgId: '',
      refundList: [],
      relatedOrderList: [],
      singleRefundList: [],
      refundDialogVisible: false,
      relatedOrderDialogVisible: false,
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
    this.getAllRefund()
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    // 查询所有退款
    async getAllRefund () {
      this.refundList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active')) === 'NAN' ? 1 : parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'refunds', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.refundList = res.ret_data
        this.total = res.ret_total
        this.loading = false
      }
    },
    // 关联工单
    async getRelatedTicket (id) {
      const url = genRequestGetUrl(apiUrl, 'refunds', accessKeyId, 'query_related_ticket', { refund_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.rows.length !== 0) {
          this.relatedTicketList = res.ret_data.rows
          this.relatedTicketDialogVisible = true
        } else {
          this.$message.warning('当前无工单信息')
        }
      }
    },
    // 查询关联分账
    async getRelateOrder (id) {
      const url = genRequestGetUrl(apiUrl, 'refunds', accessKeyId, 'query_related_order', { refund_id: id }, accessKeySecret)
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
    },
    // 根据id查询退款订单
    async getRefundById (id) {
      const url = genRequestGetUrl(apiUrl, 'refunds', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.singleRefundList = res.ret_data.rows
        this.refundDialogVisible = true
      }
    },
    // 一键重置
    resetRefund () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllRefund()
    },
    // 分页
    changeSize (val) {
      this.searchJson.page.page_size = val
      this.getAllRefund()
    },
    currentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllRefund()
    },
    // 按名称查找
    searchName (val) {
      if (val === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': val
      }
      this.searchJson.filter.push(obj)
      this.getAllRefund(this.orgId)
    },
    // 查看详情
    readCurrentInfo (id) {
      this.getRefundById(id)
    },
    // 按时间查询
    currentTimeData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getAllRefund(this.orgId)
    },
    getScroll (val) {
      this.isScroll = 'display:none;'
    },
    deepSearch () {

    },
    changeScroll () {
      this.isScroll = 'display:block;'
    },
    // 关联订单
    searchRelatedOrder (id) {
      this.getRelateOrder(id)
      this.relatedOrderDialogVisible = true
    },
    // 关联工单
    searchRelatedTicket (id) {
      this.getRelatedTicket(id)
    },
    handleClose () {
      this.relatedOrderDialogVisible = false
      this.refundDialogVisible = false
      this.relatedTicketDialogVisible = false
    }

  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.getAllRefund()
    }
  }
}
</script>
<style scoped>

</style>

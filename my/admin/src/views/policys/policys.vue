<template>
  <div class="dashboard">
    <supply-part
      :pagesize = "searchJson.page.page_size"
      :pagenum= "searchJson.page.page_num"
      :total= "total"
      :isScroll = "isScroll"
      :supplyTable= "supplyTable"
      @resetData = "resetTable"
      @pageSize = "pageSizeChange"
      @pageNum = "pageNumChange"
      @readInfo = "readCurrentInfo"
      @selectBySupplyHistoryName = "selectByName"
      @getNewTableData = "getNewData"
      @controlSearch = "controlDataTime"
      @advanceSearch = "searchCondition"
    >
    </supply-part>
    <detail-part
      :detailDialogVisible ="detailDialogVisible"
      :isClude="false"
      :detailList ="detailList"
      @closeDialog ="closeDetailDialog"
      >
      </detail-part>
      <search-part :modelList ="modelList" :searchConditionDialogVisible="searchConditionDialogVisible" :isClude = "false" @closeDialog ="closeDetailDialog"></search-part>
  </div>
</template>
<script>
import supplyPart from '@/components/ticketsModel/tacketDetail.vue'
import detailPart from '@/components/ticketsModel/tacketTable.vue'
import searchPart from '@/components/commonModel/searchConditionModel.vue'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: {
    supplyPart,
    detailPart,
    searchPart
  },
  data () {
    return {
      modelList: [],
      isScroll: 'display:block;',
      detailDialogVisible: false,
      searchConditionDialogVisible: false,
      detailList: [],
      orgId: '',
      total: 0,
      supplyTable: [],
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 10
        }
      }
    }
  },
  created () {
    this.getAllSupply()
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    // tableData reset
    resetTable (search) {
      this.searchJson = search
      this.getAllSupply()
    },
    // read current supplyhistory detail
    readCurrentInfo (id) {
      this.detailDialogVisible = true
      this.getSupplyDetail(id)
    },
    // Monitoring changes
    onResize: function () {
    },
    // get all supply histories
    async getAllSupply () {
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.supplyTable = res.ret_data
      this.total = parseInt(res.ret_total)
    },
    // page reset
    pageSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllSupply()
    },
    pageNumChange (val) {
      this.searchJson.page.page_num = val
      this.getAllSupply()
    },
    // get supplyhistory detail
    async getSupplyDetail (id) {
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.detailList = res.ret_data.rows
    },
    // close
    closeDetailDialog () {
      this.detailDialogVisible = false
      this.searchConditionDialogVisible = false
    },
    // select by supplyhistory cname
    selectByName (val) {
      if (val === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': val
      }
      this.searchJson.filter.push(obj)
      this.getAllSupply(this.orgId)
    },
    // get searchcondition
    async getSearchConditions () {
      this.dialogFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'tickets', accessKeyId, 'list_schema', { }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.modelList = res.ret_data
    },
    // select supplyhistory data by time
    getNewData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getAllSupply(this.orgId)
    },
    // data time isshow
    controlDataTime () {
      this.isScroll = 'display:block'
    },
    getScroll () {
      this.isScroll = 'display:none;'
    },
    searchCondition () {
      this.searchConditionDialogVisible = true
      this.getSearchConditions()
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.orgid
    },
    orgId () {
      this.getAllSupply()
    }
  }
}
</script>
<style scoped>
</style>

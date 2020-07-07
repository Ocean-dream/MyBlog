<template>
  <div class="device_list">
    <el-card class="device_title">
      <div>
        <search-model title="实时监控"  @singleSearch="searchCurrent"></search-model>
      </div>
      <view-table
      :total="total"
      :tableData="tableData"
      @openView="handleOpen"
      @changePageNum = "changePageNum"
      @changePageSize = "changePageSize"
      >
      </view-table>
    </el-card>
  </div>
</template>
<script>
import searchModel from '../common/searchModel'
import viewTable from '../common/viewTable'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
const apiUrl = 'http://117.135.164.14:7221'
const accessKeySecret = 'yyyyyyyyy'
const accessKeyId = 'xxxxxxxx'
export default {
  components: {
    searchModel,
    viewTable
  },
  data () {
    return {
      total: 0,
      searchValue: '',
      tableData: [],
      searchJson: {
        filter: [],
        page: {
          page_size: 10,
          page_num: 1
        }
      },
      options: [
        {
          value: 10,
          label: '10'
          }, {
          value: 15,
          label: '15'
          }, {
          value: 20,
          label: '20'
          }, {
          value: 25,
          label: '25'
          }, {
          value: 50,
          label: '50'
          }
      ],
    }
  },
  created () {
    this.getTableData()
  },
  methods: {
    // 定义一个定时器  实时获取数据
    timer() {
      return setTimeout(()=>{
        this.getTableData()
      },10000)
    },
    // 搜索实时
    searchCurrent (obj) {
      if (JSON.stringify(obj) == '{}') {
        this.searchJson.filter = []
      } else {
        this.searchJson.filter.push(obj)
      }
      clearTimeout(this.timer)
      this.getTableData()
      this.timer()
    },
    handleOpen (head, id, src, autoId, pointInfo) {
      this.$router.push({
        name: 'timeviewer',
        params: {
          name: 'nameValue',
          id: id,
          src: src,
          autoId: autoId,
          pointInfo: pointInfo,
          head: head,
        }
      })
      window.localStorage.setItem('robotId', id)
      window.localStorage.setItem('videoSrc', src)
      window.localStorage.setItem('autoId', autoId)
      window.localStorage.setItem('pointInfo', JSON.stringify(pointInfo))
      window.localStorage.setItem('head', head)
    },
    changePageNum (val) {
      this.searchJson.page.page_num = val
      this.getTableData()
    },
    changePageSize (val) {
      this.searchJson.page.page_size = val
      this.getTableData()       
      },
    async getTableData () {
      let searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'current', accessKeyId, 'list_items', {search_str: searchStr}, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.retcode === 4006) return this.$router.push('/login')
      if(res.ret_code !==0) return this.$message.error('获取数据失败')
      this.tableData = res.ret_data.rows
      this.total = res.ret_total
    }
  },
  watch: {
    tableData () {
      this.timer()
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>
<style lang="less">
</style>

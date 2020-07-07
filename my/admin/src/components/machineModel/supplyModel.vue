<template>
    <div>
        <head-notice></head-notice>
        <el-card class="box-card">
           <div style="float:right;">
              <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
              <el-button type="primary" @click="selectByName()" style="margin:5px 20px;padding:7px 17px;">名称查询</el-button>
              <el-button type="primary" style="margin-right:20px; padding:7px 17px;" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <div style="margin-top:-15px;">
                    <el-dropdown-item>
                      <el-popover
                        placement="bottom"
                        trigger="click">
                        <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                        <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;"  @click="changeScroll()">时段查询</el-button>
                      </el-popover>
                    </el-dropdown-item>
                  </div>
                  <el-dropdown-item><span @click="highSearch()">高级查询</span></el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
              </el-button>
              <el-button type="primary" @click="reset()" style="padding:7px 17px;">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
        <el-table
          :data="supplyTable"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="readCurrent(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="operator"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="machine_cname"
            label="机器名称"
            >
          </el-table-column>
           <el-table-column
            prop="channel_num"
            label="货道号"
            >
          </el-table-column>
           <el-table-column
            prop="machine_id"
            label="机器编号"
            >
          </el-table-column>
          <el-table-column
            prop="goods_cname"
            label="商品名"
            >
          </el-table-column>
          <el-table-column
            prop="diff_goods_num"
            label="补货量（个）">
            <template slot-scope="slotProps">
              <span style="color:red" v-show="slotProps.row.diff_goods_num < 0">{{slotProps.row.diff_goods_num}}</span>
              <span style="color:#129f77" v-show="slotProps.row.diff_goods_num >= 0">{{slotProps.row.diff_goods_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchant"
            label="商户">
          </el-table-column>
          <el-table-column
            prop="store"
            label="门店"
            width ="160"
          >
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="创建时间"
            width ="160"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column
            label="组织归属"
            >
             <template slot-scope="slotProps">
                <el-tag type="success">{{slotProps.row.org.cname}}</el-tag>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="warning" icon="el-icon-zoom-in" circle size="mini" @click="readCurrent(slotProps.row.id)"></el-button>
            </div>
          </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[5,10,25,50,100,200, 500, 1000]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </div>
</template>
<script>
import headNotice from './../../components/notice.vue'
import dataTime from './../dataTime.vue'
export default {
  components: {
    dataTime,
    headNotice
  },
  props: {
    isScroll: {
      type: String,
      default: 'display:block;'
    },
    supplyTable: {
      type: Array,
      default: () => []
    },
    total: {
      type: Number,
      default: 0
    },
    pagesize: {
      type: Number,
      default: 15
    },
    pagenum: {
      type: Number,
      default: 1
    }
  },
  data () {
    return {
      meId: '',
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
  },
  methods: {
    reset () {
      this.$emit('resetData', this.searchJson)
    },
    handleSizeChange (val) {
      this.$emit('pageSize', val)
    },
    selectByName () {
      this.$emit('selectBySupplyHistoryName', this.meId)
    },
    handleCurrentChange (val) {
      this.$emit('pageNum', val)
    },
    readCurrent (id) {
      this.$emit('readInfo', id)
    },
    getCurrentData (starttime, endtime) {
      this.$emit('getNewTableData', starttime, endtime)
    },
    changeScroll () {
      this.$emit('controlSearch', this.isScroll)
    },
    highSearch () {
      this.$emit('advanceSearch', this.meId)
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
</style>

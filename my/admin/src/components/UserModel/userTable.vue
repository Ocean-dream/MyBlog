<template>
    <div>
        <el-card class="box-card">
          <div>
            <el-button type="primary" @click="claim()">创建</el-button>
          </div>
           <div style="float:right;"  v-show="isSearch">
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
              <el-button type="primary" @click.native="reset()" style="padding:7px 17px;">一键重置</el-button>
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
                <el-tag type="info" @click="readUserDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            width="180"
            label="名称"
            >
          </el-table-column>
           <el-table-column
            prop="cname"
            label="中文名称"
            >
          </el-table-column>
          <el-table-column
            prop="email"
            width ="190"
            label="邮箱"
            >
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            >
            <template slot-scope="slotProps">
             <el-switch v-model="slotProps.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="PersonalPower(slotProps.row.id, slotProps.row.status)"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="反馈描述"
            >
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
            label="操作"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="text" size="mini"  @click="readCurrent(slotProps.row.id)">私发密码</el-button>
            <el-button type="text" size="mini" @click="readUserDetail(slotProps.row.id)">查看详情</el-button>
            </div>
          </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagenum"
          :page-sizes="[10,15,25,50,100,200, 500, 1000]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
    </div>
</template>
<script>
import dataTime from './../dataTime.vue'
export default {
  components: {
    dataTime
  },
  props: {
    isScroll: {
      type: String,
      default: 'display:block;'
    },
    isSearch: {
      type: Boolean,
      default: true
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
          page_size: 15
        }
      }
    }
  },
  created () {
  },
  methods: {
    PersonalPower (id, states) {
      this.$emit('userStateChange', id, states)
    },
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
    },
    readUserDetail (id) {
      this.$emit('readUser', id)
    },
    claim () {
      this.$emit('creatUser', this.meId)
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

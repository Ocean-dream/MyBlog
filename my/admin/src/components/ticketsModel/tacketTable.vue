<template>
    <div>
        <el-card class="box-card" v-show="isSearch">
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
              <el-button type="primary" @click.native="reset()" style="padding:7px 17px;">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
        <el-table
          :data="supplyTable"
          style="width: 100%">
          <el-table-column
            type="selection"
            v-if="isCheck"
            width="55">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="slotScope">
               <div>
                <div>
                  <h3 class="all_title">基本信息</h3>
                  <div style="margin-left:40px;">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>编号:</p>
                          <p class="ticket_lay">{{slotScope.row.id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>名称:</p>
                          <p class="ticket_lay">{{slotScope.row.name}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>创建者:</p>
                          <p class="ticket_lay">{{slotScope.row.create_user_json ? slotScope.row.create_user_json.user_cname : '未知'}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>更新者:</p>
                          <p class="ticket_lay">{{slotScope.row.update_user_json ? slotScope.row.update_user_json.user_cname : '未知'}}</p>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p style="margin-left:8px">创建时间:</p>
                          <p class="ticket_lay">{{slotScope.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p style="margin-left:8px">修改时间:</p>
                        <p class="ticket_lay">{{slotScope.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                      </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p style="margin-left:8px">备注:</p>
                          <p class="ticket_lay">{{slotScope.row.description}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div>
                  <h3 class="all_title">其他信息</h3>
                  <div style="margin-left:40px;">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>机器SN:</p>
                          <p  class="ticket_lay">{{slotScope.row.machine_sn}}</p>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>openId:</p>
                          <p class="ticket_lay">{{slotScope.row.open_id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>交易编号:</p>
                          <p  class="ticket_lay">{{slotScope.row.out_trade_no}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>门店名称:</p>
                          <p class="ticket_lay">{{slotScope.row.store_cname}}</p>
                        </div>
                      </el-col>
                      <el-col :span="10">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>机器编号:</p>
                            <p  class="ticket_lay">{{slotScope.row.machine_id}}</p>
                          </div>
                        </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="show_table">
                  <h3 class="all_title">反馈重点</h3>
                  <div style="margin-left:40px;">
                    <el-row :gutter="20" class="show_table_title">
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>类型</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>描述</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>跟进状态</p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">
                          <span type="danger" v-if="slotScope.row.type === 1">没出货</span>
                            <span type="danger" v-else-if="slotScope.row.type === 2">部分没出货</span>
                            <span type="danger" v-else-if="slotScope.row.type === 3">货品不对</span>
                            <span type="danger" v-else-if="slotScope.row.type === 4">质量有问题</span>
                            <span type="danger" v-else-if="slotScope.row.type === 9">其他</span>
                        </p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.description}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">
                          <span>{{slotScope.row.status === 1 ? '已处理' : '未处理'}}</span>
                        </p>
                      </div>
                    </el-col>
                  </el-row>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="50"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="readCurrent(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="name"
            v-if="isCheck"
            label="名称"
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
                <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            prop="machine_id"
            label="机器编号"
            >
          </el-table-column>
          <el-table-column
            prop="machine_sn"
            width ="190"
            label="机器SN"
            >
          </el-table-column>
          <el-table-column
            prop="store_id"
            label="门店编号"
            >
          </el-table-column>
          <el-table-column
            prop="store_cname"
            label="门店名称"
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
            width="80"
            >
            <!-- <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                width="10"
                trigger="hover"
              >
                <div style="padding:5px;"> -->
                  <!-- {{slotProps.row.description}} -->
                <!-- </div>
                <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
              </el-popover>
            </template> -->
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            v-if="isCheck"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="mtime"
            label="编辑时间"
            v-if="isCheck"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="组织归属"
            > -->
              <!-- <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template> -->
          <!-- </el-table-column> -->
           <el-table-column
            label="操作"
            v-if="isOperate"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="warning" icon="el-icon-zoom-in" circle size="mini" @click="readCurrent(slotProps.row.id)"></el-button>
            <el-button type="text" size="mini" disabled>关联分账</el-button>
            </div>
          </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-if="pageChange"
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
import dataTime from './../dataTime.vue'
export default {
  components: {
    dataTime
  },
  props: {
    isCheck: {
      type: Boolean,
      default: true
    },
    pageChange: {
      type: Boolean,
      default: true
    },
    isSearch: {
      type: Boolean,
      default: true
    },
    isOperate: {
      type: Boolean,
      default: true
    },
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
.select_form >>>.el-form-slotScope.row{
  margin-bottom: 5px;
}
.select_form >>>.el-form-slotScope.row:nth-child(even){
  margin-right: 50px;
  float: right;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
</style>

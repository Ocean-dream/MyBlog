<template>
    <div>
        <head-notice></head-notice>
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
              <el-button type="primary" @click="reset()" style="padding:7px 17px;">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
        <el-table
          v-loading="loading"
          element-loading-text="正在  加载中"
          element-loading-background="rgba(0,0,0,.3)"
          :data="supplyTable"
          style="width: 100%">
          <el-table-column
            v-if="isCheck"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="expand" v-if="isExpand">
            <template slot-scope="slotScope">
              <div>
                <div>
                  <h3 class="all_title">基础信息</h3>
                  <div style="margin-left:40px;">
                    <el-row :gutter="20">
                      <el-col style="width:32.5%;">
                        <div class="grid-content bg-purple search_add">
                          <p>编号:</p>
                          <p class="detail_id">{{slotScope.row.id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>名称:</p>
                          <p class="detail_id">{{slotScope.row.name}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>状态:</p>
                          <p style="margin-left:15px">
                            <el-tag type="success" v-if="slotScope.row.status===1">已完成</el-tag>
                            <el-tag type="info" v-if="slotScope.row.status===2">未完成</el-tag>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>创建者:</p>
                          <p style="margin-left:15px">{{slotScope.row.create_user_json.user_cname ? slotScope.row.create_user_json.user_cname : '未知'}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>更新者:</p>
                          <p style="margin-left:15px">{{slotScope.row.update_user_json.user_cname ? slotScope.row.update_user_json.user_cname : '未知'}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>创建时间:</p>
                          <p class="detail_id">{{slotScope.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>修改时间:</p>
                          <p class="detail_id">{{slotScope.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
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
                        <div class="grid-content bg-purple search_add">
                          <p>应用编号:</p>
                          <p class="detail_id">{{slotScope.row.appid}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>商户编号:</p>
                          <p class="detail_id">{{slotScope.row.mch_id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>交易单号:</p>
                          <p class="detail_id">{{slotScope.row.transaction_id}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>退款单号:</p>
                          <p class="detail_id">{{slotScope.row.out_refund_no}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>openId:</p>
                          <p class="detail_id">{{slotScope.row.open_id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>消费退款金额:</p>
                          <p class="detail_id" style="color:#129f77;">{{(slotScope.row.refund_fee / 100).toFixed(2)}}￥</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>分账回退金额:</p>
                          <p class="detail_id" style="color:#129f77;">{{(slotScope.row.return_amount / 100).toFixed(2)}}￥</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>退款备注:</p>
                          <p class="detail_id" style="color:#f56c6c;">{{slotScope.row.return_description}}</p>
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
                <el-button slot="reference" class="el-icon-view" style="border:0;padding:6px 15px;"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            label="类型"
            >
            <template slot-scope="slotProps">
            <span v-show="slotProps.row.return_amount">分账回退</span>
            <span v-show="slotProps.row.refund_fee">消费退款</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="transaction_id"
            label="交易编号"
            width="230"
            >
            <template slot-scope="slotProps">
            <span>{{slotProps.row.transaction_id ? slotProps.row.transaction_id : '--'}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="mch_id"
            label="商户编号"
            width="120"
          >
          </el-table-column>
          <el-table-column
            prop="out_return_no"
            label="回退单号"
            width="165"
          >
           <template slot-scope="slotProps">
            <span>{{slotProps.row.out_return_no ? slotProps.row.out_return_no : '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="out_refund_no"
            label="退款单号"
            width="165"
          >
           <template slot-scope="slotProps">
            <span>{{slotProps.row.out_refund_no ? slotProps.row.out_refund_no : '--'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="return_amount"
            label="回退金额(￥)"
            >
            <template slot-scope="slotProps">
            <span style="color:#129f77;">{{slotProps.row.return_amount ? (slotProps.row.return_amount / 100).toFixed(2) : '----'}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="refund_fee"
            label="退款金额(￥)"
            >
            <template slot-scope="slotProps">
            <span style="color:#129f77;">{{slotProps.row.refund_fee ? (slotProps.row.refund_fee / 100).toFixed(2) : '----'}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isCheck"
            prop="ctime"
            label="创建时间"
            width="160"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column
            label="组织归属"
            width="100"
            v-if="isClass"
            >
              <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            v-if="isInner"
            width="180"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="text"  size="mini" @click="readCurrent(slotProps.row.id)">查看</el-button>
            <el-button type="text" size="mini">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link" style="font-size:12px;color:#409EFF">
                        关联<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown"  class="relate_order">
                        <el-dropdown-item>
                          <el-button type="text"  size="mini" @click="relatedorder(slotProps.row.id)">订单</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text"  size="mini" @click="relatedTicket(slotProps.row.id)">工单</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                </el-button>
            </div>
          </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          v-if="isShowPage"
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
import headNotice from './../../components/notice.vue'
import dataTime from './../dataTime.vue'
export default {
  components: {
    dataTime,
    headNotice
  },
  props: {
    isCheck: {
      type: Boolean,
      default: true
    },
    isExpand: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    isClass: {
      type: Boolean,
      default: true
    },
    isShowPage: {
      type: Boolean,
      default: true
    },
    isScroll: {
      type: String,
      default: 'display:block;'
    },
    isInner: {
      type: Boolean,
      default: true
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
    relatedorder (id) {
      this.$emit('searchOrder', id)
    },
    relatedTicket (id) {
      this.$emit('searchTicket', id)
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
.relate_order >>> .el-dropdown-menu__item {
  line-height: 24px!important;
}
</style>

<template>
    <div>
        <el-card class="box-card"  v-show="isSearch">
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
                <div style="padding-left:40px;">
                  <div>
                    <h3 class="all_title">基本信息</h3>
                    <div style="margin-left:40px;">
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>编号:</p>
                            <p style="margin-left:15px">{{slotScope.row.id}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>名称:</p>
                            <p style="margin-left:15px">{{slotScope.row.name}}</p>
                            </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>状态:</p>
                            <p style="margin-left:15px">
                              <span v-if="slotScope.row.status === 1">启用</span>
                                <span v-if="slotScope.row.status === 2">关闭</span>
                            </p>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
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
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>创建时间:</p>
                            <p style="margin-left:15px">{{slotScope.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>修改时间:</p>
                            <p style="margin-left:15px">{{slotScope.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>备注:</p>
                            <p style="margin-left:15px">{{slotScope.row.description}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div>
                    <h3 class="all_title">其他信息</h3>
                    <div style="margin-left:40px;">
                      <el-row>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>应用编号:</p>
                            <p style="margin-left:15px">{{slotScope.row.app_id}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>支付编号:</p>
                            <p style="margin-left:15px">{{slotScope.row.pay_id}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>支付类型:</p>
                            <p style="margin-left:15px">
                              <el-tag type="success" v-if="slotScope.row.pay_type===1">微信支付</el-tag>
                              <el-tag type="success" v-if="slotScope.row.pay_type===2">支付宝支付</el-tag>
                              <el-tag type="success" v-if="slotScope.row.pay_type===3">银行支付</el-tag>
                            </p>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row :gutter="20">
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>订单编号:</p>
                            <p style="margin-left:15px">{{slotScope.row.order_id}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>交易结果:</p>
                            <p style="margin-left:15px">{{slotScope.row.result_code}}</p>
                          </div>
                        </el-col>
                        <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>交易编号:</p>
                            <p style="margin-left:15px">{{slotScope.row.transaction_id}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div class="show_table">
                    <h3 class="all_title">分账信息</h3>
                    <div style="margin-left:30px">
                        <h4>收单主体</h4>
                          <el-row :gutter="20" style="margin-left:20px;" class="show_table_title">
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p>名称</p>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p>商户号</p>
                              </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="grid-content bg-purple">
                              <p>主体名</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p>备注</p>
                              </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:20px;">
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px"> {{slotScope.row.object_name === 'platform'?'平台方' : (slotScope.row.object_name === 'operator' ? '运营方':'门店方') }}</p>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{slotScope.row.order_subject_info.mch_id}}</p>
                              </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{slotScope.row.order_subject_info.subject_cname}}</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{slotScope.row.order_subject_info.subject_description}}</p>
                              </div>
                          </el-col>
                        </el-row>
                    </div>
                    <div style="margin-left:30px" class="show_table">
                      <h4>分账客体</h4>
                      <div style="margin-left:30px;">
                        <el-row :gutter="20" class="show_table_title">
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:25px;">名称</p>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:25px;">类型</p>
                              </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px;">全称</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:25px;">账号</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px;">备注</p>
                              </div>
                          </el-col>
                        </el-row>
                        <el-row :gutter="20" v-for="(item, index) in slotScope.row.order_object_list" :key="index">
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">
                                {{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}
                              </p>
                            </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">
                                {{item.object_type === 'MERCHANT_ID'?'商户':'个人'}}
                              </p>
                              </div>
                          </el-col>
                          <el-col :span="6">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{item.object_cname}}</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{item.object_account}}</p>
                              </div>
                          </el-col>
                          <el-col :span="4">
                            <div class="grid-content bg-purple">
                              <p style="margin-left:15px">{{item.object_description}}</p>
                              </div>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                    <div style="margin-left:30px"  class="show_table">
                      <h4>分账金额</h4>
                        <el-row :gutter="20" style="margin-left:20px" class="show_table_title">
                        <el-col :span="6">
                          <div class="grid-content bg-purple">
                            <p style="margin-left:25px;">名称</p>
                          </div>
                        </el-col>
                        <el-col :span="5">
                          <div class="grid-content bg-purple">
                            <p style="margin-left:25px;">金额(￥)</p>
                            </div>
                        </el-col>
                      </el-row>
                        <el-row :gutter="20" v-for="(items, index) in slotScope.row.receivers" :key="index" style="margin-left:20px">
                        <el-col :span="6">
                          <div class="grid-content bg-purple">
                            <p style="margin-left:25px;">{{items.name}}</p>
                          </div>
                        </el-col>
                        <el-col :span="5">
                          <div class="grid-content bg-purple">
                            <p style="margin-left:25px;">{{(items.amount / 100).toFixed(2)}}</p>
                            </div>
                        </el-col>
                      </el-row>
                    </div>
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
            label="支付类型"
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
          >
          <template slot-scope="slotProps">
            <span v-for="(item, index) in slotProps.row.order_object_list" :key="index">
              <el-tag type="info">{{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}（{{item.object_type === 'MERCHANT_ID'?'商户':'个人'}}）</el-tag>
            </span>
          </template>
          </el-table-column>
           <el-table-column
            label="分账金额(￥)"
            >
            <template slot-scope="slotProps">
            <span v-for="(item, index) in slotProps.row.receivers" :key="index">
              <el-tag type="info">{{item.name}}（{{(item.amount / 100).toFixed(2)}}）</el-tag>
            </span>
          </template>
          </el-table-column>
          <el-table-column
            prop="ctime"
            v-if="isCheck"
            label="创建时间"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="mtime"
            v-if="isCheck"
            label="编辑时间"
            width ="200"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            label="操作"
            v-if="isInner"
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
    isScroll: {
      type: String,
      default: 'display:block;'
    },
    isInner: {
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

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
              <el-button type="primary" @click="reset()" style="padding:7px 17px;">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
        <el-table
          :data="supplyTable"
          style="width: 100%">
          <el-table-column
            v-if="isCheck"
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column type="expand" v-show="isExpand">
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
                        <div class="grid-content bg-purple search_add">
                          <p>地址:</p>
                          <p class="detail_id">{{slotScope.row.country}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>状态:</p>
                          <p style="margin-left:15px">
                            <el-tag type="success" v-if="slotScope.row.status===1">启用</el-tag>
                            <el-tag type="info" v-if="slotScope.row.status===2">关闭</el-tag>
                            <el-tag type="success" v-if="slotScope.row.status===3">维护中</el-tag>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>创建者:</p>
                          <p style="margin-left:15px">{{slotScope.row.create_user_json? slotScope.row.create_user_json.user_cname : '未知'}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>更新者:</p>
                          <p style="margin-left:15px">{{slotScope.row.update_user_json? slotScope.row.update_user_json.user_cname : '未知'}}</p>
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
                          <p>应用类型:</p>
                          <p class="detail_pay">
                            <el-tag v-show="slotScope.row.comsumer_type === 1">微信公众号</el-tag>
                            <el-tag type="warning" v-show="slotScope.row.comsumer_type === 2">微信小程序</el-tag>
                          </p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>门店:</p>
                          <p class="detail_id">{{slotScope.row.store}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>商户:</p>
                          <p class="detail_id">{{slotScope.row.merchant}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>机器名称:</p>
                          <p class="detail_id">{{slotScope.row.machine_cname}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>机器编号:</p>
                          <p class="detail_id">{{slotScope.row.machine_id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>机器SN:</p>
                          <p class="detail_id">{{slotScope.row.machine_sn}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>支付类型:</p>
                          <p class="detail_pay">
                            <el-tag type="success" v-if="slotScope.row.pay_type===1">微信支付</el-tag>
                            <el-tag type="success" v-if="slotScope.row.pay_type===2">支付宝支付</el-tag>
                            <el-tag type="success" v-if="slotScope.row.pay_type===3">银行支付</el-tag>
                          </p>
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
                          <p>交易编号:</p>
                          <p class="detail_id">{{slotScope.row.transaction_id}}</p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>应用编号:</p>
                          <p class="detail_id">{{slotScope.row.appid}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple search_add">
                          <p>订单编号:</p>
                          <p class="detail_id">{{slotScope.row.out_trade_no}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="show_table">
                  <h3 class="all_title">商品信息</h3>
                  <el-row style="margin-left:40px;" class="show_table_title">
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>商品名称</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>商品数量</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>商品编号</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>商品货道号</p>
                      </div>
                    </el-col>
                  </el-row>
                  <div v-for="(items, index) in slotScope.row.goods_list" :key="index" style="margin-left:40px;">
                    <div>
                      <el-row>
                        <el-col :span="6">
                          <div class="grid-content bg-purple search_add">
                            <p>{{items.goods_cname}}</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple search_add">
                            <p>{{items.goods_number}}</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple search_add">
                            <p>{{items.goods_id}}</p>
                          </div>
                        </el-col>
                        <el-col :span="6">
                          <div class="grid-content bg-purple search_add">
                            <p>{{items.goods_channel_no}}</p>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
                <div class="show_table">
                  <h3 class="all_title">收入信息</h3>
                  <el-row style="margin-left:40px;" class="show_table_title">
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>门店收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>运营收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>平台收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p>总额(￥)</p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-left:40px;">
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <!-- <p class="detail_id">{{(slotScope.row.store_revenue / 100).toFixed(2)}}</p> -->
                        <p class="detail_id">{{(slotScope.row.store_revenue / 100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{(slotScope.row.operator_revenue / 100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{(slotScope.row.platform_revenue / 100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{((slotScope.row.platform_revenue * 100 + slotScope.row.operator_revenue * 100+ slotScope.row.store_revenue * 100) / 10000).toFixed(2)}}</p>
                      </div>
                    </el-col>
                  </el-row>
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
            prop="pay_type"
            label="支付类型"
            width="85"
            >
            <template slot-scope="slotProps">
              <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
              <el-tag type="success" v-if="slotProps.row.pay_type===2">支付宝支付</el-tag>
              <el-tag type="success" v-if="slotProps.row.pay_type===3">银行支付</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchant"
            label="商户"
            width="160"
            >
          </el-table-column>
          <el-table-column
            prop="store"
            label="门店"
          >
          </el-table-column>
          <el-table-column
            prop="trade_state"
            label="支付结果"
            >
             <template slot-scope="slotProps">
             <span class="success_font" v-if="slotProps.row.trade_state === 'SUCCESS'">成功</span>
             <span v-else-if="slotProps.row.trade_state === 'CLOSED'">关闭</span>
             <span class="fail_font" v-else>失败</span>
            </template>
          </el-table-column>
          <el-table-column
            label="调货结果"
          >
          <template slot-scope="slotProps">
             <span class="success_font" v-show="slotProps.row.shipment_state === 1">出货成功</span>
             <span class="fail_font" v-show="slotProps.row.shipment_state === 2">出货失败</span>
             <span class="fail_font" v-show="slotProps.row.shipment_state === 0">未掉货</span>
             <span class="fail_font" v-show="slotProps.row.shipment_state === 3">出货部分失败</span>
             <span class="fail_font" v-show="slotProps.rowshipment_state === 4">出货超时</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="store"
            label="商品种类"
          >
            <template slot-scope="slotProps">
              {{slotProps.row.goods_list.length}}
            </template>
          </el-table-column>
           <el-table-column
            prop="settlement_total_fee"
            label="总额"
            >
             <template slot-scope="slotProps">
             <span class="success_font"> {{(slotProps.row.settlement_total_fee / 100).toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="store_revenue"
            label="门店收入(元)"
            >
            <template slot-scope="slotProps">
             <span class="success_font"> {{(slotProps.row.store_revenue / 100).toFixed(2)}}</span>
            </template>
          </el-table-column>
            <el-table-column
            prop="operator_revenue"
            label="运营收入（元）"
            >
            <template slot-scope="slotProps">
             <span class="success_font"> {{(slotProps.row.operator_revenue / 100).toFixed(2)}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="platform_revenue"
            label="平台收入(元)"
          >
            <template slot-scope="slotProps">
            <span class="success_font"> {{(slotProps.row.platform_revenue / 100).toFixed(2)}}</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="country"
            v-if="isCheck"
            label="地址"
          >
          <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                width="10"
                trigger="hover"
              >
                <div class="name_column">
                  {{slotProps.row.country}}
                </div>
                <el-button slot="reference" class="el-icon-view btn_sty"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isCheck"
            prop="ctime"
            label="创建时间"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <!-- <el-table-column
            label="组织归属"
            >
              <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column> -->
           <el-table-column
            label="操作"
            v-if="isInner"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="text"  size="mini" @click="readCurrent(slotProps.row.id)">查看</el-button>
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
    isExpand: {
      type: Boolean,
      default: false
    },
    pageChange: {
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
      list: [],
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
.success_font {
  color: #129F77;
}
.fail_font{
  color: red;
}
.select_form >>>.el-form-slotScope.row:nth-child(even){
  margin-right: 50px;
  float: right;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
</style>

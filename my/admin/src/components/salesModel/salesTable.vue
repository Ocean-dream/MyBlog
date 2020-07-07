<template>
  <div>
    <el-table
          ref="saleTable"
          :data="tableList"
          style="width: 100%">
          <el-table-column
            v-if="isCheck"
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column type="expand">
            <template slot-scope="slotScope">
              <div >
                <div>
                  <h3 class="all_title">基础信息</h3>
                  <div style="margin-left:30px;">
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
                          <p>地址:</p>
                          <p style="margin-left:15px">{{slotScope.row.country}}</p>
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
                      <el-col :span="10">
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
                  <div style="margin-left:30px;">
                    <el-row :gutter="20">
                      <el-col :span="8">
                          <div class="grid-content bg-purple" style="display: flex;">
                            <p>商户:</p>
                            <p style="margin-left:15px">{{slotScope.row.merchant}}</p>
                          </div>
                        </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>门店:</p>
                          <p style="margin-left:15px">{{slotScope.row.store}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>支付类型:</p>
                          <p style="margin-left:15px;">
                            <el-tag type="success" v-if="slotScope.row.pay_type===1">微信支付</el-tag>
                            <el-tag type="success" v-if="slotScope.row.pay_type===2">支付宝支付</el-tag>
                            <el-tag type="success" v-if="slotScope.row.pay_type===3">银行支付</el-tag>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>机器编号:</p>
                          <p style="margin-left:15px">{{slotScope.row.machine_id}}</p>
                        </div>
                      </el-col>
                        <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>机器名称:</p>
                          <p style="margin-left:15px">{{slotScope.row.machine_cname}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>出货状态:</p>
                          <p style="margin-left:15px">
                            <el-tag type="danger" v-if="slotScope.row.drop_goods_status===0">未掉货</el-tag>
                            <el-tag v-if="slotScope.row.drop_goods_status===1">出货成功</el-tag>
                            <el-tag  type="danger" v-if="slotScope.row.drop_goods_status===2">出货失败</el-tag>
                            <el-tag type="danger" v-if="slotScope.row.drop_goods_status===3">出货部分失败</el-tag>
                            <el-tag type="danger" v-if="slotScope.row.drop_goods_status===4">出货超时</el-tag>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>出货单号:</p>
                          <p style="margin-left:15px">{{slotScope.row.out_trade_no}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="show_table">
                  <h3 class="all_title">收单地址</h3>
                  <div style="margin-left:40px;">
                  <el-row :gutter="20" class="show_table_title">
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p>国家</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p>地区</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p>省</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p>市</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p>区</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple search_add">
                        <p>详细地址</p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.country}}</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.region}}</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.province}}</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.city}}</p>
                      </div>
                    </el-col>
                    <el-col :span="3">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.district}}</p>
                      </div>
                    </el-col>
                    <el-col :span="4">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{slotScope.row.address}}</p>
                      </div>
                    </el-col>
                  </el-row>
                  </div>
                </div>
                <div>
                  <h3 class="all_title">商品信息</h3>
                  <div style="margin-left:30px;">
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品编号:</p>
                          <p style="margin-left:15px">{{slotScope.row.goods_id}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品名称:</p>
                          <p style="margin-left:15px;color:#7949f4;">{{slotScope.row.goods_cname}}</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品类型:</p>
                          <p style="margin-left:15px">
                            <el-tag type="success" v-if="slotScope.row.goods_type===1">医药品</el-tag>
                            <el-tag type="success" v-if="slotScope.row.goods_type===2">日用品</el-tag>
                            <el-tag type="success" v-if="slotScope.row.goods_type===3">成人用品</el-tag>
                            <el-tag type="success" v-if="slotScope.row.goods_type===4">饮料</el-tag>
                            <el-tag type="success" v-if="slotScope.row.goods_type===5">零食</el-tag>
                            <el-tag type="success" v-if="slotScope.row.goods_type===6">其他</el-tag>
                          </p>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品实际价格:</p>
                          <p style="margin-left:15px">{{(slotScope.row.retail_unit_price / 100).toFixed(2)}}￥</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品零售价格:</p>
                          <p style="margin-left:15px">{{(slotScope.row.sale_unit_price / 100).toFixed(2)}}￥</p>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="grid-content bg-purple" style="display: flex;">
                          <p>商品优惠价格:</p>
                          <p style="margin-left:15px">{{(slotScope.row.discount_unit_price / 100).toFixed(2)}}￥</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
                <div class="show_table">
                  <h3 class="all_title">收入信息</h3>
                  <div style="margin-left:40px;">
                  <el-row :gutter="20" class="show_table_title">
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p>门店收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p>运营收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p>平台收入(￥)</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p>总额(￥)</p>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row :gutter="20">
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{(slotScope.row.store_revenue /100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{(slotScope.row.operator_revenue /100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{(slotScope.row.platform_revenue /100).toFixed(2)}}</p>
                      </div>
                    </el-col>
                    <el-col :span="5">
                      <div class="grid-content bg-purple search_add">
                        <p class="detail_id">{{((slotScope.row.platform_revenue + slotScope.row.operator_revenue + slotScope.row.store_revenue) / 100).toFixed(2)}}</p>
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
          @click="this.dialogFormVisible = true"
          >
          <template slot-scope="slotProps">
              <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="name"
          v-if="isCheck"
          label="名称"
          width="60"
          >
          <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                trigger="hover"
                >
                <div style="padding:5px;">
                  {{slotProps.row.name}}
                </div>
                <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
              </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="goods_cname"
          v-if="isCheck"
          width="130"
          label="商品名称">
          <template slot-scope="slotProps">
            <span style="color:#7949F4">{{slotProps.row.goods_cname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="pay_type"
          label="支付类型"
          width="85"
          >
          <template slot-scope="slotProps">
            <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
            <el-tag v-else>其他支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="drop_goods_status"
          label="出货状态">
          <template slot-scope="slotProps">
            <el-tag type="success" v-show="slotProps.row.drop_goods_status === 1">成功</el-tag>
            <el-tag type="danger" v-show="slotProps.row.drop_goods_status === 2">失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="machine_cname"
          label="机器名称">
        </el-table-column>
        <el-table-column
          prop="channel_num"
          label="货道"
          width="50"
          >
        </el-table-column>
        <el-table-column
          prop="merchant"
          label="商户"
          width="150"
          >
        </el-table-column>
        <el-table-column
          prop="store"
          width="90"
          label="门店">
        </el-table-column>
        <el-table-column
          prop="sale_unit_price"
          label="总额（元）"
          >
          <template slot-scope="slotProps">
          <span style="color:#129F77;"> {{(slotProps.row.sale_unit_price / 100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="store_revenue"
          label="门店收入（元）"
          >
          <template slot-scope="slotProps">
          <span style="color:#129F77;"> {{(slotProps.row.store_revenue / 100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="operator_revenue"
          label="运营收入（元）"
          >
          <template slot-scope="slotProps">
          <span style="color:#129F77;"> {{(slotProps.row.operator_revenue / 100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="platform_revenue"
          label="平台收入（元）"
          >
          <template slot-scope="slotProps">
            <span style="color:#129F77;"> {{(slotProps.row.platform_revenue / 100).toFixed(2)}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="ctime"
          width="150"
          v-if="isCheck"
          label="创建时间"
          >
          <template slot-scope="slotProps">
          {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
        <el-table-column
          v-if="isOperate"
          label="操作"
          width="145"
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
                      <el-dropdown-slotScope.row>
                        <el-button type="text" size="mini" @click="relatedOrder(slotProps.row.id)">关联订单</el-button>
                      </el-dropdown-slotScope.row>
                      <el-dropdown-slotScope.row>
                        <el-button type="text" size="mini" @click="relatedRefund(slotProps.row.id)">关联退款</el-button>
                      </el-dropdown-slotScope.row>
                    </el-dropdown-menu>
                  </el-dropdown>
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
            </div>
</template>
<script>
export default {
  props: {
    isCheck: {
      type: Boolean,
      default: true
    },
    tableList: {
      type: Array,
      default: () => {}
    },
    isOperate: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    showDetail (id) {
      this.$emit('showSaleDetail', id)
    }
  }
}
</script>

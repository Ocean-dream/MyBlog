<template>
  <div>
    <div v-for="(item, index) in detailList" :key="index">
      <div>
        <h3 class="all_title">基础信息</h3>
        <div style="margin-left:30px;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>编号:</p>
                <p style="margin-left:15px">{{item.id}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>名称:</p>
                <p style="margin-left:15px">{{item.name}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>地址:</p>
                <p style="margin-left:15px">{{item.country}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>创建者:</p>
                <p style="margin-left:15px">{{item.create_user_json.user_cname ? item.create_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>更新者:</p>
                <p style="margin-left:15px">{{item.update_user_json.user_cname ? item.update_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>创建时间:</p>
                <p style="margin-left:15px">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
            <div class="grid-content bg-purple" style="display: flex;">
              <p>修改时间:</p>
              <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
            </div>
            </el-col>
            <el-col :span="10">
            <div class="grid-content bg-purple" style="display: flex;">
              <p>备注:</p>
              <p style="margin-left:15px">{{item.description}}</p>
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
                  <p style="margin-left:15px">{{item.merchant}}</p>
                </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>门店:</p>
                <p style="margin-left:15px">{{item.store}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>支付类型:</p>
                <p style="margin-left:15px;">
                  <el-tag type="success" v-if="item.pay_type===1">微信支付</el-tag>
                  <el-tag type="success" v-if="item.pay_type===2">支付宝支付</el-tag>
                  <el-tag type="success" v-if="item.pay_type===3">银行支付</el-tag>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>机器编号:</p>
                <p style="margin-left:15px">{{item.machine_id}}</p>
              </div>
            </el-col>
              <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>机器名称:</p>
                <p style="margin-left:15px">{{item.machine_cname}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>出货状态:</p>
                <p style="margin-left:15px">
                  <el-tag type="danger" v-if="item.drop_goods_status===0">未掉货</el-tag>
                  <el-tag v-if="item.drop_goods_status===1">出货成功</el-tag>
                  <el-tag  type="danger" v-if="item.drop_goods_status===2">出货失败</el-tag>
                  <el-tag type="danger" v-if="item.drop_goods_status===3">出货部分失败</el-tag>
                  <el-tag type="danger" v-if="item.drop_goods_status===4">出货超时</el-tag>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>出货单号:</p>
                <p style="margin-left:15px">{{item.out_trade_no}}</p>
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
              <p class="detail_id">{{item.country}}</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.region}}</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.province}}</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.city}}</p>
            </div>
          </el-col>
          <el-col :span="3">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.district}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.address}}</p>
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
                <p style="margin-left:15px">{{item.goods_id}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>商品名称:</p>
                <p style="margin-left:15px;color:#7949f4;">{{item.goods_cname}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>商品类型:</p>
                <p style="margin-left:15px">
                  <el-tag type="success" v-if="item.goods_type===1">医药品</el-tag>
                  <el-tag type="success" v-if="item.goods_type===2">日用品</el-tag>
                  <el-tag type="success" v-if="item.goods_type===3">成人用品</el-tag>
                  <el-tag type="success" v-if="item.goods_type===4">饮料</el-tag>
                  <el-tag type="success" v-if="item.goods_type===5">零食</el-tag>
                  <el-tag type="success" v-if="item.goods_type===6">其他</el-tag>
                </p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>商品实际价格:</p>
                <p style="margin-left:15px">{{(item.retail_unit_price / 100).toFixed(2)}}￥</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>商品零售价格:</p>
                <p style="margin-left:15px">{{(item.sale_unit_price / 100).toFixed(2)}}￥</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>商品优惠价格:</p>
                <p style="margin-left:15px">{{(item.discount_unit_price / 100).toFixed(2)}}￥</p>
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
          <el-col :span="4">
            <div class="grid-content bg-purple search_add">
              <p>误差(￥)</p>
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
              <p class="detail_id">{{(item.store_revenue /100).toFixed(2)}}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{(item.operator_revenue /100).toFixed(2)}}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{(item.platform_revenue /100).toFixed(2)}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{(item.accuracy_amount /100).toFixed(2)}}</p>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{(item.sale_unit_price / 100).toFixed(2)}}</p>
            </div>
          </el-col>
        </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    detailList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.show_table_title .el-col{
  background: #eee;
}
.show_table >>> .el-col{
  border: 1px solid #ccc;
  /* text-align: center; */
}
.show_table p{
  margin-left: 29%;
}
</style>

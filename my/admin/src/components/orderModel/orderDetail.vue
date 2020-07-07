<template>
  <div>
      <div v-for="(item, index) in detailList" :key="index">
        <div>
          <h3 class="all_title">基础信息</h3>
          <div style="margin-left:40px;">
            <el-row :gutter="20">
              <el-col style="width:32.5%;">
                <div class="grid-content bg-purple search_add">
                  <p>编号:</p>
                  <p class="detail_id">{{item.id}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>名称:</p>
                  <p class="detail_id">{{item.name}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>地址:</p>
                  <p class="detail_id">{{item.country}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>状态:</p>
                  <p style="margin-left:15px">
                    <el-tag type="success" v-if="item.status===1">启用</el-tag>
                    <el-tag type="info" v-if="item.status===2">关闭</el-tag>
                    <el-tag type="success" v-if="item.status===3">维护中</el-tag>
                  </p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建者:</p>
                  <p style="margin-left:15px">{{item.create_user_json? item.create_user_json.user_cname : '未知'}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>更新者:</p>
                  <p style="margin-left:15px">{{item.update_user_json? item.update_user_json.user_cname : '未知'}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>创建时间:</p>
                  <p class="detail_id">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>修改时间:</p>
                  <p class="detail_id">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
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
                    <el-tag v-show="item.comsumer_type === 1">微信公众号</el-tag>
                    <el-tag type="warning" v-show="item.comsumer_type === 2">微信小程序</el-tag>
                  </p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>门店:</p>
                  <p class="detail_id">{{item.store}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>商户:</p>
                  <p class="detail_id">{{item.merchant}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>机器名称:</p>
                  <p class="detail_id">{{item.machine_cname}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>机器编号:</p>
                  <p class="detail_id">{{item.machine_id}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>机器SN:</p>
                  <p class="detail_id">{{item.machine_sn}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>支付类型:</p>
                  <p class="detail_pay">
                    <el-tag type="success" v-if="item.pay_type===1">微信支付</el-tag>
                    <el-tag type="success" v-if="item.pay_type===2">支付宝支付</el-tag>
                    <el-tag type="success" v-if="item.pay_type===3">银行支付</el-tag>
                  </p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>openId:</p>
                  <p class="detail_id">{{item.open_id}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>交易编号:</p>
                  <p class="detail_id">{{item.transaction_id}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>应用编号:</p>
                  <p class="detail_id">{{item.appid}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>订单编号:</p>
                  <p class="detail_id">{{item.out_trade_no}}</p>
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
          <div v-for="(items, index) in item.goods_list" :key="index" style="margin-left:40px;">
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
          <el-row style="margin-left:40px;">
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <!-- <p class="detail_id">{{(item.store_revenue / 100).toFixed(2)}}</p> -->
                <p class="detail_id">{{(item.store_revenue / 100).toFixed(2)}}</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{(item.operator_revenue / 100).toFixed(2)}}</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{(item.platform_revenue / 100).toFixed(2)}}</p>
              </div>
            </el-col>
             <el-col :span="4">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{(item.accuracy_amount / 100).toFixed(2)}}</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{(item.settlement_total_fee / 100).toFixed(2)}}</p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="show_table" v-if="item.version_json !== null">
          <h3 class="all_title">固件信息</h3>
          <el-row style="margin-left:40px;" class="show_table_title">
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p>配置</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p>引导</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p>程序</p>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-left:40px;">
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{item.version_json.vapp}}</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{item.version_json.vboot}}</p>
              </div>
            </el-col>
            <el-col :span="5">
              <div class="grid-content bg-purple search_add">
                <p class="detail_id">{{item.version_json.vinit}}</p>
              </div>
            </el-col>
          </el-row>
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
.show_table >>> .el-col{
  border: 1px solid #ccc;
  text-align: center;
}
.show_table p{
  margin-left: 29%;
}
.show_table_title .el-col{
  background: #eee;
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.detail_id{
  margin-left:15px;
}
.direct_select{
  margin-left: 10px;
}
.detail_id{
  margin-left:15px;
}
.detail_pay{
  margin-left:15px;
  margin-top:5px;
}
</style>

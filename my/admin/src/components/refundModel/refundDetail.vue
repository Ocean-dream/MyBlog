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
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>状态:</p>
                  <p style="margin-left:15px">
                    <el-tag type="success" v-if="item.status===1">已完成</el-tag>
                    <el-tag type="info" v-if="item.status===2">未完成</el-tag>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row>
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
                  <p>应用编号:</p>
                  <p class="detail_id">{{item.appid}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>商户编号:</p>
                  <p class="detail_id">{{item.mch_id}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>交易单号:</p>
                  <p class="detail_id">{{item.transaction_id}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>退款单号:</p>
                  <p class="detail_id">{{item.out_refund_no}}</p>
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
                  <p>消费退款金额:</p>
                  <p class="detail_id" style="color:#129f77;">{{(item.refund_fee / 100).toFixed(2)}}￥</p>
                </div>
              </el-col>
            </el-row>
             <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>分账回退金额:</p>
                  <p class="detail_id" style="color:#129f77;">{{(item.return_amount / 100).toFixed(2)}}￥</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple search_add">
                  <p>退款备注:</p>
                  <p class="detail_id" style="color:#f56c6c;">{{item.return_description}}</p>
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
</style>

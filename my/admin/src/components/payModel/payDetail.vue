<template>
  <div>
    <div v-for="(item, index) in detailList" :key="index">
        <div>
          <h3 class="all_title">基本信息</h3>
          <div style="margin-left:20px">
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
                  <p style="margin-left:15px">{{item.cname}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>状态:</p>
                  <p style="margin-left:15px;">
                    <el-tag v-show="item.status === 1">开启</el-tag>
                    <el-tag v-show="item.status === 2" type="info">关闭</el-tag>
                  </p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建者:</p>
                  <p style="margin-left:15px">{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>更新者:</p>
                  <p style="margin-left:15px">{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建时间:</p>
                  <p style="margin-left:15px">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>修改时间:</p>
                  <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>备注:</p>
                  <p style="margin-left:15px;">{{item.description}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <h3 class="all_title">其他信息</h3>
          <el-row :gutter="20" style="margin-left:20px">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>应用编号:</p>
                <p style="margin-left:15px">{{item.app_id}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>支付类型:</p>
                <p style="margin-left:15px; margin-top:5px;">
                  <el-tag type="success" v-if="item.pay_type===1">微信支付</el-tag>
                  <el-tag type="success" v-if="item.pay_type===2">支付宝支付</el-tag>
                  <el-tag type="success" v-if="item.pay_type===3">银行支付</el-tag>
                </p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>应用类型:</p>
                <p style="margin-left:15px; margin-top:5px;">
                  <el-tag type="success" v-if="item.app_type===1">微信公众号</el-tag>
                  <el-tag type="success" v-if="item.app_type===2">微信小程序</el-tag>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div>
          <h3 class="all_title">分账信息</h3>
          <div style="margin-left:30px">
            <h4>分账主体</h4>
              <el-row :gutter="20" style="margin-left:20px">
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="display: flex;">
                    <p>名称:</p>
                    <p style="margin-left:15px"> {{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}</p>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="display: flex;">
                    <p>商户号:</p>
                    <p style="margin-left:15px">{{item.order_subject_info.mch_id}}</p>
                    </div>
                </el-col>
              </el-row>
            </div>
          <div style="margin-left:30px">
            <h4>分账客体</h4>
            <el-row :gutter="20" style="margin-left:10px">
              <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:25px;">名称</p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:25px;">类型</p>
                  </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px;">全称</p>
                  </div>
              </el-col>
                <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:25px;">账号</p>
                  </div>
              </el-col>
                <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px;">备注</p>
                  </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" v-for="(item, index) in item.order_object_list" :key="index" style="margin-left:10px">
              <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px">
                    {{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}
                  </p>
                </div>
              </el-col>
              <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px">
                    {{item.object_type === 'MERCHANT_ID'?'商户':'个人'}}
                  </p>
                  </div>
              </el-col>
              <el-col :span="4">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px">{{item.object_cname}}</p>
                  </div>
              </el-col>
                <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px">{{item.object_account}}</p>
                  </div>
              </el-col>
                <el-col :span="5">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p style="margin-left:15px">{{item.object_description}}</p>
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

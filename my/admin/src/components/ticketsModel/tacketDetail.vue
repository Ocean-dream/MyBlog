<template>
<div>
  <div v-for="(item, index) in detailList" :key="index">
      <div>
        <h3 class="all_title">基本信息</h3>
        <div style="margin-left:40px;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>编号:</p>
                <p class="ticket_lay">{{item.id}}</p>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>名称:</p>
                <p class="ticket_lay">{{item.name}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>创建者:</p>
                <p class="ticket_lay">{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>更新者:</p>
                <p class="ticket_lay">{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple" style="display: flex;">
                <p style="margin-left:8px">创建时间:</p>
                <p class="ticket_lay">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
              </div>
            </el-col>
            <el-col :span="6">
            <div class="grid-content bg-purple" style="display: flex;">
              <p style="margin-left:8px">修改时间:</p>
              <p class="ticket_lay">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
            </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p style="margin-left:8px">备注:</p>
                <p class="ticket_lay">{{item.description}}</p>
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
                <p  class="ticket_lay">{{item.machine_sn}}</p>
              </div>
            </el-col>
            <el-col :span="10">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>openId:</p>
                <p class="ticket_lay">{{item.open_id}}</p>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>交易编号:</p>
                <p  class="ticket_lay">{{item.out_trade_no}}</p>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>门店名称:</p>
                <p class="ticket_lay">{{item.store_cname}}</p>
              </div>
            </el-col>
            <el-col :span="10">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>机器编号:</p>
                  <p  class="ticket_lay">{{item.machine_id}}</p>
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
                 <span type="danger" v-if="item.type === 1">没出货</span>
                  <span type="danger" v-else-if="item.type === 2">部分没出货</span>
                  <span type="danger" v-else-if="item.type === 3">货品不对</span>
                  <span type="danger" v-else-if="item.type === 4">质量有问题</span>
                  <span type="danger" v-else-if="item.type === 9">其他</span>
              </p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">{{item.description}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content bg-purple search_add">
              <p class="detail_id">
                 <span>{{item.status === 1 ? '已处理' : '未处理'}}</span>
              </p>
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
.ticket_lay{
  margin-left:15px;
}
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

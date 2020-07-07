<template>
  <div>
       <div v-for="(item, index) in detailList" :key="index" style="padding-left:25px;">
          <div>
            <h3 class="all_title">基础信息</h3>
            <div style="margin-left:20px;">
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
                    <p>创建者:</p>
                    <p style="margin-left:15px">{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row>
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
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="display: flex;">
                    <p>修改时间:</p>
                    <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="display: flex;">
                    <p>描述:</p>
                    <p style="margin-left:15px">{{item.description}}</p>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <h3 class="all_title">其他信息</h3>
            <el-row style="margin-left:20px;">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>开始时间:</p>
                  <p style="margin-left:15px">{{item.start_time}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>结束时间:</p>
                  <p style="margin-left:15px">{{item.end_time}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>分账策略:</p>
                  <p style="margin-left:15px">{{item.policy_entity}}</p>
                </div>
              </el-col>
            </el-row>
          </div>
          <div>
            <h3 class="all_title">分账配置</h3>
            <div style="margin-left:20px;">
              <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分账对象</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分账类型</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分帐占比</p>
                    </div>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>平台方</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <el-tag>{{item.object_json.platform.share_type === 'ratio'?'比例':'其他'}}</el-tag>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>{{(item.object_json.platform.share_value * 100).toFixed(0)}}</p>
                    </div>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>门店方</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <el-tag>{{item.object_json.store.share_type=== 'ratio'?'比例':'其他'}}</el-tag>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>{{(item.object_json.store.share_value * 100).toFixed(0)}}</p>
                    </div>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>运营方</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <el-tag>{{item.object_json.operator.share_type=== 'ratio'?'比例':'其他'}}</el-tag>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>{{(item.object_json.operator.share_value * 100).toFixed(0)}}</p>
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

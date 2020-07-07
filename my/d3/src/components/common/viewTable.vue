<template>
  <div>
    <div class="device_content">
        <!-- <div class="table_title">
          <h3>设备列表</h3>
        </div> -->
         <el-table
         :header-cell-style="{background:'#F2F7FF',color:'#333',textAlign: 'center'}"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            width="200"
            >
          </el-table-column>
          <el-table-column
            width="200"
            prop="head_id"
            label="头部序列号">
          </el-table-column>
           <el-table-column
            prop="body_id"
            width="200"
            label="身体序列号">
          </el-table-column>
          <el-table-column
            prop="power"
            label="电量">
          </el-table-column>
          <el-table-column
            prop="os_version"
            width="150"
            label="系统版本">
          </el-table-column>
           <el-table-column
            prop="auto_mode"
            width="100"
            label="自主模式">
            <template slot-scope="slotProps">
              <span style="margin-left: 10px;color:#34ACFF;" v-show="slotProps.row.auto_mode === 1">开启</span>
              <span style="margin-left: 10px;color:#F25A5A;" v-show="slotProps.row.auto_mode === 2">关闭</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="online_status"
            label="在线状态">
            <template slot-scope="slotProps">
              <span style="margin-left: 10px;color:#34ACFF;" v-show="slotProps.row.online_status === 1">在线</span>
              <span style="margin-left: 10px;color: #F25A5A;" v-show="slotProps.row.online_status === 0">离线</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="volume"
            label="音量">
          </el-table-column>
           <el-table-column
            prop="brightness"
            label="亮度">
          </el-table-column>
          <el-table-column
            prop="task_status"
            label="任务状态">
            <template slot-scope="slotProps">
              <el-tooltip class="item" effect="dark" :content="slotProps.row.task_status.name" placement="top-start">
                <el-button>{{slotProps.row.task_status.status}}</el-button>
              </el-tooltip>   
            </template>
          </el-table-column>
          <el-table-column
            prop="err_status"
            label="错误状态">
            <template slot-scope="slotProps">
              <el-tooltip class="item" effect="dark" :content="slotProps.row.err_status.meaasge" placement="top-start">
                <el-button>{{slotProps.row.err_status.status}}</el-button>
              </el-tooltip>   
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            label="操作">
            <template slot-scope="slotProps">
                <!-- :disabled="slotProps.row.online_status === 1 ? false : true" -->
              <el-button
                style="background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);border-radius: 22.5px;color: #fff;padding: 8px 15px;"
                size="mini"
                :disabled="slotProps.row.online_status === 1 ? false : true"
                @click="handleView(slotProps.row.head_id, slotProps.row.id, slotProps.row.av_address, slotProps.row.auto_mode, slotProps.row.point_info)">监控控制</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="margin-left:30%;">
        <el-pagination
            background
            prev-text="上一页"
            next-text="下一页"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchJson.page.page_num"
            :page-size="searchJson.page.page_size"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      options: [
        {
          value: 2,
          label: '2'
          }, {
          value: 5,
          label: '5'
          }, {
          value: 10,
          label: '10'
          }, {
          value: 25,
          label: '25'
          }, {
          value: 50,
          label: '50'
          }
      ],
      searchJson: {
        page: {
          page_num: 1,
          page_size: 10
        }
      }
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    tableData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleView (head, id, src, autoId, pointInfo) {
      this.$emit('openView', head, id, src, autoId, pointInfo)
    },
    handleCurrentChange (val) {
      this.$emit('changePageNum', val)
    },
    handleSizeChange (val) {
      this.$emit('changePageSize', val)
    },
  }
}
</script>
<style lang="less" scoped>
.item {
      margin: 4px;
    }
   .device_content{
      margin-bottom: 8%;
      .table_title{
        margin: 20px 0;
        display: flex;
        justify-content: space-between;
        h3{
          font-size: 30px;
          margin: 0;
        }
         .select_page{
          /deep/ .el-select{
            margin-top:5px;
            width:40%;
                .el-input{
                    width:70%!important;
                    input{
                      height:25px;
                    }
                    .el-input__suffix{
                      top:9px;
                    }
                }
          }
        }
      }
    }
</style>
<template>
  <div>
    <div class="device_content">
        <!-- <div class="table_title">
          <h3>{{listTitle}}</h3>
        </div> -->
         <el-table
         :header-cell-style="{background:'#F2F7FF',color:'#333',textAlign: 'center'}"
          :data="tableData"
          :height="height"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            v-if="isDevice || isMap"
            width="180">
          </el-table-column>
          <el-table-column
            prop="id"
            label="ID"
            v-if="isUser || isTran"
            width="180">
          </el-table-column>
          <el-table-column
            prop="cname"
            label="名称"
            v-if="isPoint || isUser || isTran || isLine || isArea"
            >
          </el-table-column>
          <el-table-column
            label="左上角(x,y)"
            v-if="isArea"
            >
            <template slot-scope="scope">
              <span>{{scope.row.xleftpoint}},{{scope.row.yleftpoint}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="右下角(x,y)"
            v-if="isArea"
            >
            <template slot-scope="scope">
              <span>{{scope.row.xbottompoint}},{{scope.row.ybottompoint}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="点1名称"
            v-if="isLine"
            >
            <template slot-scope="scope">
              <span>{{scope.row.startPos.instanceName}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="点2名称"
            v-if="isLine"
            >
             <template slot-scope="scope">
              <span>{{scope.row.endPos.instanceName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="account"
            label="账号"
            v-if="isUser"
            >
          </el-table-column>
           <!-- <el-table-column
            prop="access_key_id"
            label="密钥"
            v-if="isUser"
           >
          </el-table-column> -->
          <el-table-column
            prop="authority"
            label="权限"
            v-if="isUser"
            width="180">
            <template slot-scope="scope">
              <span v-show="scope.row.authority === 1"><img src="../../assets/common.png" style="vertical-align: middle;margin-right: 6px;">普通管理员</span>
              <span v-show="scope.row.authority === 2"><img src="../../assets/high.png" style="vertical-align: middle;margin-right: 6px;">高级管理员</span>
              <span v-show="scope.row.authority === 3"><img src="../../assets/super.png" style="vertical-align: middle;margin-right: 6px;">超级管理员</span>
            </template>
          </el-table-column>
           <el-table-column
            prop="point"
            label="(x,y)坐标"
            v-if="isPoint"
            width="180">
            <template slot-scope="scope">
              <span>{{scope.row.pos.x}},{{scope.row.pos.y}}</span>
            </template>
          </el-table-column>
          <el-table-column
            v-if="isDevice"
            prop="cname"
            label="设备名称"
            width="180">
          </el-table-column>
          <el-table-column
            v-if="isDevice"
            prop="head_id"
            label="设备headId">
          </el-table-column>
           <el-table-column
            v-if="isDevice"
            prop="body_id"
            label="设备bodyId">
          </el-table-column>
           <el-table-column
            v-if="isDevice"
            prop="address"
            width="240"
            label="设备地址">
          </el-table-column>
          <el-table-column
            label="拥有者"
            v-if="isDevice"
            >
            <template slot-scope="slotProps">
              <span style="margin-left: 10px;color:#34ACFF;">{{slotProps.row.user === null ? 'xxx' : slotProps.row.user.cname}}</span>
            </template>
          </el-table-column>
           <el-table-column
           v-if="isMap || isTran"
            prop="cname"
            label="地图名称">
          </el-table-column>
           <el-table-column
           v-if="isMap || isTran"
            prop="address"
            width="420"
            label="地图对应地址">
          </el-table-column>
          <el-table-column
            prop="mtime"
            v-if="isDevice || isMap"
            label="更新时间">
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dataFormart('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column
          width="220"
            label="操作">
            <template slot-scope="slotProps">
                <el-button
                v-show="isMap || isUser"
                size="mini"
                style="border-color:#34ACFF;color:#34ACFF;border-radius: 22.5px;"
                @click="handleEdit(slotProps.row.id, slotProps.row.address)"
                >编辑</el-button>
                <el-button
                v-show="isMap"
                style="border-color:#03B58D;color:#03B58D;border-radius: 22.5px;"
                size="mini"
                @click.native="download(slotProps.row.cname, slotProps.row.address)"
                >
                下载
                </el-button>
                <el-button
                v-show="isDelet"
                style="border-color:#F25A5A;color:#F25A5A;border-radius: 22.5px;"
                size="mini"
                round
                @click ="deleteData(slotProps.row.id, slotProps.row.x, slotProps.row.y, slotProps.row.account, slotProps.row.cname)"
                >删除</el-button>
                <el-button
                v-show="isPoint"
                style="border-color:#F25A5A;color:#F25A5A;border-radius: 22.5px;"
                size="mini"
                @click ="deletePoint(slotProps.row.cname, slotProps.row.pos.x, slotProps.row.pos.y)"
                >删除</el-button>
                <el-button
                v-show="isLine"
               style="border-color:#F25A5A;color:#F25A5A;border-radius: 22.5px;"
                size="mini"
                @click ="deleteLine(slotProps.row.id)"
                >删除</el-button>
                <el-button
                v-show="isArea"
               style="border-color:#F25A5A;color:#F25A5A;border-radius: 22.5px;"
                size="mini"
                @click ="deleteArea(slotProps.row.id)"
                >删除</el-button>
                <el-button
                v-show="isTran"
                size="mini"
                style="background:#34ACFF;border-color:0;color:#fff;border-radius: 22.5px;"
                @click="readConfict()"
                >查看所有冲突区域</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="isPage" style="margin-left:30%;">
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
          value: 5,
          label: '5'
          }, {
          value: 10,
          label: '10'
          }, {
          value: 3,
          label: '3'
          }, {
          value: 20,
          label: '20'
          }, {
          value: 50,
          label: '50'
          }
      ],
      searchJson: {
          filter: [],
          page: {
          page_num: 1,
          page_size: 10
          }
      },
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    height: {
      default: null
    },
    tableData: {
      type: Array,
      default: () => []
    },
    listTitle: {
      type: String,
      default: ''
    },
    isViewer: {
      type: Boolean,
      default: false
    },
    isDelet: {
      type: Boolean,
      default: false
    },
    isDevice: {
      type: Boolean,
      default: false
    },
    isTran: {
      type: Boolean,
      default: false
    },
    isMap: {
      type: Boolean,
      default: false
    },
    isPoint: {
      type: Boolean,
      default: false
    },
    isPage: {
      type: Boolean,
      default: true
    },
    isUser: {
      type: Boolean,
      default: false
    },
    isLine: {
      type: Boolean,
      default: false
    },
     isArea: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleView (id, address) {
      this.$emit('openView', id, address)
    },
    handleEdit (id, address) {
      this.$emit('editContent', id, address)
    },
    readConfict () {
      this.$emit('readCurrent')
    },
    deleteData (id, x, y, account,cname) {
      this.$emit('deleteDevice', id, x, y, account, cname)
    },
    deletePoint (cname, x, y) {
      this.$emit('deletePot', cname, x, y)
    },
    handleCurrentChange (val) {
      this.$emit('changePageNum', val)
    },
    handleSizeChange (val) {
      this.$emit('changePageSize', val)
    },
    download (name, address) {
      this.$emit('downloadFile', name, address)
    },
    deleteLine (id) {
      this.$emit('deLine', id)
    },
    deleteArea (id) {
      this.$emit('deArea', id)
    }
  }
}
</script>
<style lang="less" scoped>
   .device_content{
      margin-bottom: 5%;
      .table_title{
        margin: 6px 0;
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
      /deep/.el-table{
        .el-table__header-wrapper{
          .el-table__header{
            tr{
              th{
                background: #F2F7FF;
                font-size: 16px;
              }
            }
          }
        }
      }
    }
</style>
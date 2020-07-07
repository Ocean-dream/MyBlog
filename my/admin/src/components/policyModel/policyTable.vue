<template>
  <div>
    <el-card class="box-card">
        <div style="display:flex;justify-content: space-between;">
        <div>
          <el-button type="primary" @click="claim('created')">创建</el-button>
          <el-button type="primary" :disabled="claimDisabled" @click="claim('claim')">认领</el-button>
        </div>
        <div>
          <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
          <el-button type="primary" @click="selectByName()" style="margin:0 20px">名称查询</el-button>
          <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
            <span class="el-dropdown-link" style="color:#fff;">
              自定义查询
            </span>
              <el-dropdown-menu slot="dropdown">
              <el-dropdown-item >
                <el-popover
                  placement="bottom"
                  trigger="click">
                  <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                  <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;" @click="isScroll = 'display:block;'">时段查询</el-button>
                </el-popover>
              </el-dropdown-item>
              <el-dropdown-item><span @click="detailSearch()">高级查询</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-button>
          <el-button type="primary" @click="reset()">一键重置</el-button>
        </div>
      </div>
    </el-card>
    <!-- 表格 -->
    <el-table
      :data="tablePolicyList"
      ref="multipleTable"
      @selection-change="selectBox()"
      style="width: 100%">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="id"
        label="编号"
        @click="this.dialogFormVisible = true"
        >
        <template slot-scope="slotProps">
            <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="cname"
        label="名称"
        >
      </el-table-column>
      <el-table-column
        prop="start_time"
        label="开始时间"
        >
      </el-table-column>
      <el-table-column
        prop="end_time"
        label="结束时间"
        >
      </el-table-column>
      <el-table-column
        prop="policy_entity"
        label="策略对象"
        >
        <template slot-scope="slotProps">
          <el-tag type="warning" v-show="slotProps.row.policy_entity === 'order_share'">分账</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="门店占比（%）"
        >
        <template slot-scope="slotProps">
          <span>{{(slotProps.row.object_json.store.share_value * 100).toFixed(0)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="平台占比（%）"
        >
        <template slot-scope="slotProps">
          <span>{{(slotProps.row.object_json.platform.share_value * 100).toFixed(0)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="运营占比（%）"
        >
        <template slot-scope="slotProps">
          <span>{{(slotProps.row.object_json.operator.share_value * 100).toFixed(0)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        >
      </el-table-column>
      <el-table-column
        prop="ctime"
        label="创建时间"
        width ="160"
        >
        <template slot-scope="slotProps">
        {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        prop="mtime"
        label="修改时间"
        width ="160"
        >
        <template slot-scope="slotProps">
        {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
        </template>
      </el-table-column>
      <el-table-column
        label="组织归属"
        >
        <template slot-scope="slotProps">
          <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="220"
        >
        <template slot-scope="slotProps">
            <div class="top">
                <el-button type="text" size="mini" @click="editUserInfo(slotProps.row.id)">编辑</el-button>
                <el-button type="text" size="mini" @click="deleteGoodsInfo(slotProps.row.id)" :disabled = "true">删除</el-button>
                <el-button type="text" circle size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizePolicyChange"
      @current-change="handleCurrentPolicyChange"
      :current-page="this.searchJson.page.page_num"
      :page-sizes="[5,10,25,50,100,200, 500, 1000]"
      :page-size="this.searchJson.page.page_size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      meId: '',
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
    }
  },
  props: {
    tablePolicyList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleSizePolicyChange (val) {
      this.$emit('pageSize', val)
    },
    handleCurrentPolicyChange (val) {
      this.$emit('pageNum', val)
    },
    claim (val) {
      this.$emit('creatPolicy', val)
    },
    selectByName () {
      this.$emit('selectPolicyByName', this.meId)
    },
    detailSearch () {
    },
    reset () {
    },
    selectBox () {
    },
    showDetail (id) {
      this.$emit('showPolicyDetail', id)
    },
    editUserInfo (id) {
      this.$emit('editPolicyInfo', id)
    },
    deleteGoodsInfo (id) {
      this.$emit('deletePolicyInfo', id)
    }
  }
}
</script>
<style scoped>

</style>
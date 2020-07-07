<template>
  <div>
    <el-dialog
        title="高级搜索"
        :visible="searchConditionDialogVisible"
        width="60%"
        :append-to-body ="isClude"
        :before-close="handleClose">
          <h2>搜索</h2>
        <el-form :model="model" :inline="true" class="select_form" ref="modelListRef" label-width="90px">
          <el-row>
            <el-col :span="8" :key="index" v-for="(item, index) in modelList">
              <el-form-item style="margin-right:34px;">
                <div style="display:flex;" class="search_add">
                  <span style="width:163px;text-align:center;">
                    <span v-if="item.comment && item.comment.length < 7">{{item.comment}}</span>
                    <el-popover
                      placement="top-start"
                      width="10"
                      trigger="hover"
                      v-else
                    >
                      <div class="name_column">
                        {{item.comment}}
                      </div>
                      <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
                    </el-popover>
                  </span>
                  <el-input placeholder="请输入内容" v-model="input[index]" clearable></el-input>
                  <el-popover
                      placement="bottom"
                      width="400"
                      style="margin-left:5px;"
                      trigger="click">
                      <el-button slot="reference">高级设置</el-button>
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="顺序">
                          <el-radio-group v-model="order[item.comment]" :value="item.id" :id="index">
                            <el-radio label="无"></el-radio>
                            <el-radio label="升序"></el-radio>
                            <el-radio label="降序"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="查询" v-show="item.type && item.type.substring(0, 3) == 'VAR'">
                          <el-radio-group  v-model="selectCondition[index]">
                            <el-radio label="模糊"></el-radio>
                            <el-radio label="精确"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </el-popover>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      input: {
        id: '',
        name: '',
        cname: '',
        ctime: '',
        default_discount_unit_price: '',
        default_retail_unit_price: '',
        default_share_ratio: '',
        default_supply_unit_price: '',
        deleted: '',
        norms: '',
        status: '',
        type: ''
      },
      form: {
        resource: ''
      },
      model: {},
      // 查询条件
      selectCondition: {
        'op': 'like'
      },
      // 顺序
      order: {}
    }
  },
  props: {
    searchConditionDialogVisible: {
      type: Boolean,
      default: false
    },
    isClude: {
      type: Boolean,
      default: false
    },
    modelList: {
      default: () => []
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeDialog', this.searchConditionDialogVisible)
    }
  },
  watch: {
    searchConditionDialogVisible: {
      handler: function (val) {
        this.searchConditionDialogVisible = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped>

</style>

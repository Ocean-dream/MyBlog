<template>
   <el-dialog
        title="详细信息"
        :visible="detailDialogVisible"
        width="54%"
        :append-to-body ="isClude"
        :before-close="handleClose">
          <div v-for="(item, index) in detailList" :key="index">
             <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>编号:</p>
                  <p style="margin-left:15px">{{item.id}}</p>
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
                  <p>商品名称:</p>
                  <p style="margin-left:15px">{{item.goods_cname}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>平台:</p>
                  <p style="margin-left:15px">{{item.platform}}</p>
                </div>
              </el-col>
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
            </el-row>
            <el-row :gutter="20">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>货道号:</p>
                  <p style="margin-left:15px">{{item.channel_num}}</p>
                </div>
              </el-col>
               <el-col :span="14">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建时间:</p>
                  <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;margin-bottom:10px;">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>操作人:</p>
                  <p style="margin-left:15px">{{ item.operator }}</p>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>备注:</p>
                  <p style="margin-left:15px">{{item.description}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">补货前后对比</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">补货前</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">补货后</div></el-col>
            </el-row>
            <el-row style="margin: 20px 0;">
              <el-col :span="4">确认供应单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_supply_unit_price.pre === null? '--': item.confirm_supply_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_supply_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row>
              <el-col :span="4">确认活动单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_discount_unit_price.pre === null? '--': item.confirm_discount_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_discount_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row style="margin: 20px 0;">
              <el-col :span="4">确认零售单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_retail_unit_price.pre === null? '--': item.confirm_retail_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_retail_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row>
              <el-col :span="4">确认分成策略</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_share_json.pre === null? '--': item.confirm_share_json.pre}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_share_json.new}}</div></el-col>
            </el-row>
          </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
      </el-dialog>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    detailDialogVisible: {
      type: Boolean,
      default: false
    },
    isClude: {
      type: Boolean,
      default: false
    },
    detailList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeDialog', this.detailDialogVisible)
    }
  },
  watch: {
    detailDialogVisible: {
      handler: function (val) {
        this.detailDialogVisible = val
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped>
</style>

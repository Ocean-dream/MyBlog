<template>
  <div>
    <el-dialog
      title="创建用户"
      :visible="createDialogVisible"
       width="40%"
      :before-close="handleClose">
        <el-form ref="addDevicesFormRef" :model="addUserFrom" label-width="110px" :rules="rules" :inline="true">
            <el-row>
                <el-col :span="12">
                  <el-form-item label="英文名称" prop="name">
                    <el-input v-model="addUserFrom.name" placeholder="请输入英文名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="中文名称" prop="cname">
                    <el-input v-model="addUserFrom.cname" placeholder="请输入中文名称"></el-input>
                  </el-form-item>
                </el-col>
            </el-row>
            <el-row style="margin:10px 0;">
              <el-col :span="12">
                <el-form-item label="邮箱" prop="email">
                  <el-input v-model="addUserFrom.email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="手机号" prop="phone">
                  <el-input v-model="addUserFrom.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input v-model="addUserFrom.description" placeholder="请输入其他备注"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <p style="color:#129f77;">温馨提示：当前红色星号标记的为必填项</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="submitCreate" style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    createDialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      addUserFrom: {
        name: '',
        cname: '',
        email: '',
        phone: '',
        description: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleClose () {
      this.$emit('closeCreated', this.createDialogVisible, this.addUserFrom)
      this.addUserFrom = {}
    },
    submitCreate () {
      this.$emit('submitCreatUser', this.addUserFrom)
      this.addUserFrom = {}
    }
  }
}
</script>

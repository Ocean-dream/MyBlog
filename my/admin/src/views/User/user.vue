<template>
  <div>
    <head-notice></head-notice>
    <user-table
      :supplyTable = "userlist"
      :isSearch = "false"
      :total = "total"
      @readInfo = "getUserPassword"
      @creatUser= "createUsers"
      @pageNum="pageNumChange"
      @pageSize ="pageSizeChange"
      @readUser="seeUserDetail"
      @userStateChange = "userChange"
    >
    </user-table>
    <user-create :createDialogVisible ="createDialogVisible" @closeCreated ="closeDialog" @submitCreatUser ="submitCreatUsers" ref ="userForm"></user-create>
    <!-- 查看详情 -->
    <el-dialog
      :visible.sync="detailDialogVisible"
      width="40%"
      :before-close="handleClose">
      <user-detail :showPersonal="orgInfoArr"></user-detail>
    </el-dialog>
  </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import userTable from '@/components/UserModel/userTable.vue'
import headNotice from './../../components/notice.vue'
import userDetail from '@/components/UserModel/userDetail.vue'
import userCreate from '@/components/UserModel/userCreate.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: {
    userTable,
    userCreate,
    userDetail,
    headNotice
  },
  data () {
    return {
      orgInfoArr: [],
      detailDialogVisible: false,
      createDialogVisible: false,
      userlist: [],
      total: 0,
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    async userChange (id, states) {
      if (states === 1) {
        const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'biz_status_enable', { 'update_id': id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('状态开启成功')
        }
      } else {
        const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'biz_status_disable', { 'update_id': id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('状态关闭成功')
        }
      }
    },
    async seeUserDetail (id) {
      const params = {
        org_id: 1,
        query_user_id: id
      }
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'query_user_orginfo', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.length === 0) return this.$message.warning('当前用户暂无角色')
        this.orgInfoArr = res.ret_data
        this.detailDialogVisible = true
      }
    },
    handleClose () {
      this.detailDialogVisible = false
    },
    async getAllUsers () {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_all_users', { 'search_str': searchStr }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.total = res.ret_total
        this.userlist = res.ret_data.rows
      }
    },
    // 获取密码
    async getUserPassword (id) {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'send_password', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('密码已发送，请注意查收')
      }
    },
    createUsers () {
      this.createDialogVisible = true
    },
    closeDialog () {
      this.createDialogVisible = false
    },
    async submitCreatUsers (params) {
      this.addUserForm = params
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'create_one', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('创建成功')
        this.createDialogVisible = false
        this.getAllUsers()
      }
    },
    pageNumChange (val) {
      this.searchJson.page.page_num = val
      this.getAllUsers()
    },
    pageSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllUsers()
    }
  }
}
</script>
<style scoped>

</style>

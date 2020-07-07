<template>
    <div>
        <el-card>
            <search-model title="用户管理" searchTitle = "用户" :isAdd="true" @changeDevice="addUser"  @singleSearch="searchUser"></search-model>
             <table-model
                :tableData="tableData"
                :isDelet="true"
                :total="total"
                :isUser="true"
                listTitle="用户列表"
                @editContent = "handleEdit"
                @changePageNum = "changePageNum"
                @changePageSize = "changePageSize"
                @deleteDevice="deleteUser"
                >
                </table-model>
        </el-card>
        <common-dialog  width="30%" title="用户添加" :isShow="userVisible" @closeDialog="handleClo" @submit="submitCreat" @cancleSonDialog="dialogCancle">
             <el-form ref="addUserForm" :model="addUserForm" label-width="100px" :rules="rules" autocomplete="off">
                <el-form-item label="用户名" prop="cname" label-width="85px">
                    <el-input v-model="addUserForm.cname" style="margin-left:13px;width:92%;"></el-input>
                </el-form-item>
                <el-form-item label="账户" prop="account" label-width="75px">
                    <el-input v-model="addUserForm.account" style="margin-left:23px;width:90%;"/>
                </el-form-item>
                <el-form-item label="密码" prop="password" label-width="75px">
                    <el-input type="password" v-model="addUserForm.password" style="margin-left:23px;width:90%;"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="check_password">
                    <el-input  type="password" v-model="addUserForm.check_password" style="width:95%;"></el-input>
                </el-form-item>
                  <el-form-item label="权限选择"  prop="authority">
                    <el-select v-model="addUserForm.authority" placeholder="请选择权限">
                    <el-option label="普通管理员" value="1"></el-option>
                    <el-option label="高级管理员" value="2"></el-option>
                    <el-option label="超级管理员" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" label-width="70px">
                    <el-input v-model="addUserForm.description" style="margin-left:26px;width:90%;"></el-input>
                </el-form-item>
            </el-form>
        </common-dialog>
        <common-dialog  width="35%" title="用户信息编辑" :isShow="userEditVisible" @closeDialog="handleClo" @submit="submitEdit" @cancleSonDialog="dialogCancle">
             <el-form ref="editForm" :model="editUserForm" label-width="100px">
                <el-form-item label="名称" label-width="70px">
                    <el-input v-model="editUserForm.cname" style="width:90%;margin-left:30px;"></el-input>
                </el-form-item>
                 <el-form-item label="账号"  label-width="70px">
                    <el-input v-model="editUserForm.account" style="width:90%;margin-left:30px;" disabled></el-input>
                </el-form-item>
                <el-form-item label="密码"  label-width="70px">
                    <el-input v-model="editUserForm.password" style="width:90%;margin-left:30px;" type="password" :show-password="true"></el-input>
                </el-form-item>
                  <!-- <el-form-item label="状态"  label-width="70px">
                    <el-select v-model="editUserForm.status" placeholder="请选择权限" style="margin-left:30px;">
                    <el-option label="开启" :value="1"></el-option>
                    <el-option label="关闭" :value="2"></el-option>
                    </el-select>
                </el-form-item> -->
                 <el-form-item label="权限选择"  prop="authority">
                    <el-select v-model="editUserForm.authority" placeholder="请选择权限">
                    <el-option label="普通管理员" :value="1"></el-option>
                    <el-option label="高级管理员" :value="2"></el-option>
                    <el-option label="超级管理员" :value="3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </common-dialog>
        <common-dialog width="35%" headTitle="删除确认" :isShow="deleteVisiable" @closeDialog="handleClo" @submit="suredeleteUser" @cancleSonDialog="dialogCancle">
            <div style="width:100%;text-align:center;">
                <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #333333;letter-spacing: 1.9px;margin-right:50px;">是否将用户<span style="color:red;">{{deleteUserName}}</span>删除?</span>
            </div>
        </common-dialog>
    </div>
</template>
<script>
import searchModel from '../common/searchModel'
import commonDialog from '../common/commonDalog'
import tableModel from '../common/tableModel'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
const apiUrl = 'http://117.135.164.14:7221'
const accessKeySecret = 'yyyyyyyyy'
const accessKeyId = 'xxxxxxxx'
export default {
    components: {
        tableModel,
        searchModel,
        commonDialog
    },
    data(){
        return{
            deleteUserName: '',
            deleteVisiable: false,
            editUserForm: {},
            userEditVisible: false,
            addUserForm: {
               cname: '', 
               account: '', 
               password: '', 
               check_password: '', 
               authority: ''
            },
            rules: {
                cname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                 account: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在2-15个字符 ', trigeer: 'blur' }
                ],
                 password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在2-15个字符 ', trigeer: 'blur' }
                ],
                 check_password: [
                    { required: true, message: '请输入确认密码', trigger: 'blur' },
                ],
                 authority: [
                    { required: true, message: '请选择 权限', trigger: 'blur' },
                ]
            },
            userVisible: false,
            tableData: [],
            userId: '',
            total: 0,
            searchJson: {
                filter: [],
                page: {
                page_num: 1,
                page_size: 10
                }
            }
        }
    },
    created() {
        this.getAllUser()
    },
    methods: {
        dialogCancle () {
            this.deleteVisiable = false
            this.userEditVisible = false
            this.userVisible = false
        },
        deleteUser (id, x, y, account, cname) {
            // console.log(account)
            this.userAccount = account
            this.deleteId = id
            this.deleteUserName = cname
            this.deleteVisiable = true
            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            // confirmButtonText: '确定',
            // cancelButtonText: '取消',
            // type: 'warning'
            // }).then(() => {
            //     this.suredeleteUser(id)
            // }).catch(() => {
            // this.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // })       
            // })
        },
        async suredeleteUser () {
            const id = this.deleteId
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'delete_by_id', {id: id}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('删除用户失败')
            this.$message.success('删除用户成功')
            this.deleteVisiable = false
            const account = window.localStorage.getItem('account')
            if (this.userAccount === account) {
                this.$router.push('/')
            } else {
                this.getAllUser()
            }
        },
        // 搜索用户
        searchUser (obj) {
            if (JSON.stringify(obj) == '{}') {
                this.searchJson.filter = []
            } else {
                this.searchJson.filter.push(obj)
            }
            this.getAllUser()
            this.searchJson.filter = []
        },
        handleEdit (id) {
            this.getUserInfo(id)
            this.userEditVisible = true
        },
        handleClo () {
            this.deleteVisiable = false
            this.userVisible = false
            this.userEditVisible = false
            this.addUserForm = {}
        },
        addUser () {
            this.userVisible = true
        },
        submitCreat () {
            this.$refs.addUserForm.validate(async valid => {
            if (!valid) return
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'create_one', this.addUserForm, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if (res.ret_code !==0) return this.$message.error('用户创建失败')
            this.userVisible = false
            this.addUserForm = {}
            this.getAllUser()
            })
        },
        async getAllUser () {
            let searchStr = JSON.stringify(this.searchJson)
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'list_items', {search_str: searchStr}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('获取用户信息失败')
            this.tableData= res.ret_data
            this.total = res.ret_total
        },
        // 获取用户详情
        async getUserInfo (id) {
            this.userId = id
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'query_by_id', {id: id }, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('获取用户信息失败')
            this.editUserForm = res.ret_data[0]
        },
        async submitEdit () {
            let editStr = JSON.stringify(this.editUserForm)
            let id = parseInt(this.userId)
            const params = {
                id: id,
                update_str: editStr
            }
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'update_by_id', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if (res.ret_code !==0) return this.$message.error('用户更新信息失败')
            this.$message.success('用户更新成功')
            this.userEditVisible = false
            this.getAllUser()
        },
        // 删除用户
        async delteUser () {

        },
         // 处理分页
        changePageNum (val) {
            this.searchJson.page.page_num = val
            this.getAllUser()
        },
        changePageSize (val) {
            this.searchJson.page.page_size = val
            this.getAllUser()       
        },
    },
}
</script>
<style lang="less" scoped>
</style>

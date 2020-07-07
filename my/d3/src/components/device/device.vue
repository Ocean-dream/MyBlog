<template>
    <div>
        <el-card>
            <search-model title="设备管理" :isAdd="true" @changeDevice="newDevice" @singleSearch="searchDevice"></search-model>
            <table-model
            :tableData="tableData"
            :isDelet="true"
            listTitle="设备列表"
            :isDevice="true"
            :total="total"
            @deleteDevice="deleteOperate"
            @changePageNum = "changePageNum"
            @changePageSize = "changePageSize"
            >
            </table-model>
        </el-card>
        <common-dialog width="35%" headTitle="删除确认" :isShow="deleteVisiable" @closeDialog="handleClo" @submit="suredeleteOperate" @cancleSonDialog="dialogCancle">
            <div style="width:100%;text-align:center;">
                <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #333333;letter-spacing: 1.9px;margin-right:50px;">此操作将永久删除该文件, 是否继续?</span>
            </div>
        </common-dialog>
        <!-- 添加设备 -->
        <common-dialog width="50%" title="设备添加" :isShow="addVisiable" @closeDialog="handleClo" @submit="submitForm" @cancleSonDialog="dialogCancle">
            <el-form ref="form" :model="addForm" label-width="120px" :rules="rules">
                <el-form-item label="设备名称" prop="cname" label-width="110px">
                    <el-input v-model="addForm.cname" style="width:90%;margin-left:10px;"></el-input>
                </el-form-item>
                <el-form-item label="头部序列号" prop="head_id">
                    <el-input v-model="addForm.head_id" style="width:90%;"></el-input>
                </el-form-item>
                <el-form-item label="身体序列号" prop="body_id">
                    <el-input v-model="addForm.body_id" style="width:90%;"></el-input>
                </el-form-item>
                 <el-form-item label="拥有者" prop="owner_id" label-width="93px">
                    <el-select placeholder="请选择" v-model="addForm.owner_id" style="margin-left:25px;">
                        <el-option
                            v-for="(item, index) in ownerUser"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select>
                </el-form-item>
                 <el-form-item label="地址：" label-width="93px" prop="country">
                    <div style="margin-left:23px;">
                        <el-select disabled placeholder="中国大陆" v-model="addForm.country" style="margin-right:30px;"></el-select>
                        <!-- <el-select placeholder="请选择" v-model="addForm.region" style="margin:0 20px;">
                        <el-option
                            v-for="(item, index) in region"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                        </el-select> -->
                        <el-cascader
                        size="large"
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleAdressChange">
                    </el-cascader>
                    </div>
                    </el-form-item>
                <el-form-item label="详细地址"  prop="address" label-width="100px">
                    <el-input v-model="addForm.address" style="width:90%;margin-left:15px;"></el-input>
                </el-form-item>
                 <el-form-item label="备注" label-width="70px">
                    <el-input v-model="addForm.description" style="width:90%;margin-left:43px;"></el-input>
                </el-form-item>
            </el-form>
        </common-dialog>
    </div>
</template>
<script>
import searchModel from '../common/searchModel'
import commonDialog from '../common/commonDalog'
import tableModel from '../common/tableModel'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import { genRequestGetUrl } from '@/untils/cryptojs.js'
const apiUrl = 'http://117.135.164.14:7221'
const accessKeySecret = 'yyyyyyyyy'
const accessKeyId = 'xxxxxxxx'
export default {
    components: {
        searchModel,
        tableModel,
        commonDialog
    },
    data(){
        return{
            deleteId: '',
            deleteVisiable: false,
            rules: {
                cname: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                 head_id: [
                    { required: true, message: '请输入头部序列号', trigger: 'blur' },
                ],
                 body_id: [
                    { required: true, message: '请输入身体序列号', trigger: 'blur' },
                ],
                 owner_id: [
                    { required: true, message: '请选择拥有着', trigger: 'blur' },
                ],
                 country: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入地址', trigger: 'blur' },
                ]
            },
            options: regionData,
            selectedOptions: [],
            ownerUser: [],
            addForm: {
                country: '中国',
                head_id: '',
                body_id: '',
                owner_id: '',
                region: '中国',
                province: '',
                city: '',
                district: ''
            },
            addVisiable: false,
            tableData: [],
            searchJson: {
                filter: [],
                with: [{
                    key: 'users',
                    required: false
                }],
                page: {
                page_num: 1,
                page_size: 10
                }
            },
            total: 0
        }
    },
    created() {
        this.getTableData()
    },
    methods: {
        dialogCancle () {
            this.addVisiable = false
            this.deleteVisiable = false
        },
        // 搜索设备
        searchDevice (obj) {
             if (JSON.stringify(obj) == '{}') {
                this.searchJson.filter = []
            } else {
                this.searchJson.filter.push(obj)
            }
            this.getTableData()
            this.searchJson.filter = []
        },
        // 获取所有设备
        async getTableData () {
            let searchStr = JSON.stringify(this.searchJson)
            const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'list_items', {search_str: searchStr}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('获取数据失败');
            this.tableData = res.ret_data.rows
            this.total = res.ret_total
        },
        // 设备添加
        newDevice () {
            this.addVisiable = true
            this.getAllUsers()
        },
        handleClo () {
            this.deleteVisiable = false
            this.addVisiable = false
            this.addForm = {}
            this.addForm['region'] = '中国'
            this.addForm['country'] = '中国'
            this.selectedOptions = []
        },
         // 监听地址联动变化及转换
        handleAdressChange (arr) {
            this.addForm.province = CodeToText[arr[0]]
            this.addForm.city = CodeToText[arr[1]]
            this.addForm.district = CodeToText[arr[2]]
        },
        async submitForm () {
            this.addVisiable = false
            const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'create_one', this.addForm, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('添加设备失败');
            this.$message.success('添加成功')
            this.getTableData()
            this.addForm = {}
            this.addForm['country'] = '中国'
            this.addForm['region'] = '中国'
            this.selectedOptions = []
        },
        // 设备删除
        deleteOperate (id) {
            this.deleteVisiable = true
            this.deleteId = id
        },
        async suredeleteOperate () {
            let id = this.deleteId
            const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'delete_by_id', {id: id}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('删除设备失败')
            this.$message.success('删除设备成功')
            this.deleteVisiable = false
            this.getTableData()
        },
        // 获取用户列表
        async getAllUsers () {
            this.ownerUser = []
            const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'list_items', {}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('获取用户列表失败')
            res.ret_data.forEach(item => {
                let obj = {
                value: item.id,
                label: item.account
                }
                this.ownerUser.push(obj)
            })
        },
        // 处理分页
        changePageNum (val) {
        this.searchJson.page.page_num = val
        this.getTableData()
        },
        changePageSize (val) {
        this.searchJson.page.page_size = val
        this.getTableData()       
        },
    },
}
</script>
<style lang="less" scoped>
</style>

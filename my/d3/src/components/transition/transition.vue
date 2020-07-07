<template>
    <div>
         <el-card>
            <search-model title="交通管理" searchTitle = "地图"></search-model>
             <table-model
                :tableData="tableData"
                :isTran="true"
                :total="total"
                listTitle="地图列表"
                @readCurrent = "currentConfict"
                >
                </table-model>
        </el-card>
        <common-dialog width="40%" :isFooter="false" :isShow="tranVisible" @closeDialog="handleClo"  @cancleSonDialog="dialogCancle">
            <h3 style="font-weight:400;margin-left:40%;font-size: 16px;color: #333333;letter-spacing: 1.9px;">冲突区域列表</h3>
            <el-table
            :header-cell-style="{background:'#F2F7FF',color:'#333',textAlign: 'center'}"
            :data="comData"
            style="width: 100%">
            <el-table-column
                prop="id"
                label="ID"
                >
            </el-table-column>
            <el-table-column
                prop="name"
                label="冲突区域名称"
                >
            </el-table-column>
             <el-table-column
                prop="state"
                label="占用状态"
               >
            </el-table-column>
             <el-table-column
                prop="sta_id"
                label="占用Id"
                >
            </el-table-column>
            </el-table>
        </common-dialog>
    </div>
</template>
<script>
import tableModel from '../common/tableModel'
import commonDialog from '../common/commonDalog'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
import searchModel from '../common/searchModel'
export default {
    components: {
        searchModel,
        tableModel,
        commonDialog
    },
    data(){
        return{
            total: 1,
            path:'ws://192.168.1.146:1234/chat',
            socket:"",
            tranVisible: false,
            comData: [
                {
                    id: 1,
                    name: 'assd',
                    state: '已占用',
                    sta_id: 'q123'
                }
            ],
            tableData: [
                {
                    id: 1,
                    cname: 'qwer',
                    address: '上海市长宁区'
                }
            ]
        }
    },
    created() {
    },
    methods: {
        dialogCancle () {
            this.tranVisible = false
        },
        handleClo () {
            this.tranVisible = false
        },
        currentConfict () {
            this.tranVisible = true
        }
    }
}
</script>
<style lang="less" scoped>
</style>

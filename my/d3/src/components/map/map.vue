<template>
    <div>
         <el-card>
            <search-model title="地图管理" :isAdd="true" searchTitle="地图" @changeDevice = "addMap"  @singleSearch="searchMap"></search-model>
             <table-model
                :tableData="tableData"
                :isMap="true"
                :total="total"
                :isDelet="true"
                listTitle="地图列表"
                @editContent = "handleEdit"
                @deleteDevice= "deleteMap"
                @changePageNum = "changePageNum"
                @changePageSize = "changePageSize"
                @downloadFile="downloadMap"
                >
                </table-model>
        </el-card>
        <common-dialog width="50%" title="地图编辑" :isFooter="false" :isShow="editVisible" @closeDialog="handleClo" @cancleSonDialog="dialogCancle">
           <div class="edit_map">
               <el-tabs type="card"  v-model="activeName" tab-position="left" style="height: 500px;" @tab-click="tabChange" :stretch="true">
                <el-tab-pane name="1">
                    <span slot="label">地图总览<div style="height:2px;background:#DCE9FD;margin-left:5%;">
                        </div> </span>
                    <div class="view_all" id="container">
                        <h3>读取地图文件显示的地图</h3>
                    </div>
                    <diV style="margin-top:1vh;">
                        <el-form ref="editFormRef" :model="editForm" label-width="40px">
                            <el-form-item label="名称">
                                <el-input v-model="editForm.cname"></el-input>
                            </el-form-item>
                            <el-form-item label="备注">
                                <el-input v-model="editForm.description"></el-input>
                            </el-form-item>
                        </el-form>
                    </diV>
                </el-tab-pane>
                <el-tab-pane name="2">
                    <span slot="label">点操作<div style="height:2px;background:#DCE9FD;margin-left:5%;">
                        </div> </span>
                    <div class="view_all">
                        <div class="point_title" id="smallContainer">
                            <h3>读取地图文件显示的地图</h3>
                        </div>
                        <el-button style="border-color:#35A6FF;color:#35A6FF;margin-bottom:5px;" @click="addPoint()">点添加</el-button>
                        <common-dialog  ref="pointAdd" headTitle="点添加" :isFooter="false" :isShow="pointVisible" :append="true" width="25%" @closeDialog="handleAppendClo" @cancleSonDialog="dialogSonCancle">
                             <el-form ref="addPoint" :model="addPointForm" label-width="100px">
                                <el-form-item label="名称" label-width="75px">
                                    <el-input v-model="addPointForm.cname" style="margin-left:23px;width:92%;"></el-input>
                                </el-form-item>
                                <el-form-item label="x点坐标">
                                    <el-input v-model="addPointForm.xpoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-form-item label="y点坐标">
                                    <el-input v-model="addPointForm.ypoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-button style="background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);border-radius: 18px;margin-top:10px;color:#fff;margin-left:40%;padding:8px 20px;" @click="addPointOperate()">添加</el-button>
                            </el-form>
                        </common-dialog>
                        <div>
                            <table-model
                            :tableData="pointData"
                            :isPoint="true"
                            height="150"
                            :isPage="false"
                            @deletePot="deletePoint"
                            >
                            </table-model>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane name="3">
                    <span slot="label">线操作<div style="height:2px;background:#DCE9FD;margin-left:5%;">
                        </div> </span>
                    <div class="view_all">
                        <div class="point_title"  id="LineContainer">
                            <h3>读取地图文件显示的地图</h3>
                        </div>
                        <el-button style="border-color:#35A6FF;color:#35A6FF;margin-bottom:5px;" @click="addLinePoint()">线添加</el-button>
                        <common-dialog headTitle="线添加" :append="true" width="20%" :isFooter="false" :isShow="lineVisible" @closeDialog="handleAppendClo" @cancleSonDialog="dialogSonCancle">
                             <el-form ref="addLine" :model="addLineForm" label-width="100px">
                                <el-form-item label="名称"  label-width="78px">
                                    <el-input v-model="addLineForm.cname" style="margin-left:23px;width:92%;"></el-input>
                                </el-form-item>
                                <el-form-item label="点1名称">
                                    <el-input v-model="addLineForm.first"></el-input>
                                </el-form-item>
                                <el-form-item label="点2名称">
                                    <el-input v-model="addLineForm.second"></el-input>
                                </el-form-item>
                                <el-button style="background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);border-radius: 18px;margin-top:10px;color:#fff;margin-left:40%;padding:8px 20px;" @click="addMapLine()">添加</el-button>
                            </el-form>
                        </common-dialog>
                        <table-model
                        :tableData="newTempLine"
                        height="150"
                        :isLine="true"
                        :isPage="false"
                        @deLine ="lineDelte"
                        >
                        </table-model>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="冲突区域操作" name="4">
                    <div class="view_all">
                        <div class="point_title" id="areaContainer">
                            <h3>读取地图文件显示的地图</h3>
                        </div>
                        <el-button @click="addAreaPoint()"  style="border-color:#35A6FF;color:#35A6FF;margin-bottom:5px;">域添加</el-button>
                        <common-dialog headTitle="域添加" :append="true" width="20%" :isFooter="false" :isShow="areaVisible" @closeDialog="handleAppendClo" @cancleSonDialog="dialogSonCancle">
                             <el-form ref="areaForm" :model="addAreaForm" label-width="100px">
                                <el-form-item label="名称" label-width="48px">
                                    <el-input v-model="addAreaForm.cname" style="margin-left:50px;width:83%;"></el-input>
                                </el-form-item>
                                <el-form-item label="左上角x坐标">
                                    <el-input v-model="addAreaForm.xleftpoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-form-item label="左上角y坐标">
                                    <el-input v-model="addAreaForm.yleftpoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-form-item label="右下角x坐标">
                                    <el-input v-model="addAreaForm.xbottompoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-form-item label="右下角y坐标">
                                    <el-input v-model="addAreaForm.ybottompoint" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'') " onafterpaste="this.value=this.value.replace(/[^\d\.]/g,'') "></el-input>
                                </el-form-item>
                                <el-button style="background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);border-radius: 18px;margin-top:10px;color:#fff;margin-left:40%;padding:8px 20px;" @click="areaCreate()">添加</el-button>
                            </el-form>
                        </common-dialog>
                        <table-model
                        :tableData="areaArr"
                        :isArea="true"
                        height="150"
                        :isAreaDelet="true"
                        :isPage="false"
                        @deArea="handleArea"
                        >
                        </table-model>
                    </div>
                </el-tab-pane>
            </el-tabs>
           </div>
           <el-button type="primary" @click="saveMapChange()" style="background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);border-radius: 18px;color:#fff;padding:8px 28px;">保存</el-button>
        </common-dialog>
        <common-dialog  ref="mapAdd" title="地图添加" :isShow="addMapVisible"  width="40%" @closeDialog="handleAddMap" @submit="submitAddMap" @cancleSonDialog="dialogCancle">
                <el-form ref="addPoint" :model="addMapForm" label-width="100px">
                <el-form-item label="名称">
                    <el-input v-model="addMapForm.cname"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="addMapForm.description"></el-input>
                </el-form-item>
                <el-form-item label="文件">
                    <el-upload
                        :action="uploadURL"
                        ref="newupload"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        :before-upload="beforeAvatarUpload"
                        :auto-upload="false"
                        :with-credentials="true"
                        :limit="1"
                        >
                        <div style="display:flex;">
                            <el-button style="border-color:#35A6FF;color:#35A6FF;padding:1px 15px;margin-right:10px;">选取文件</el-button>
                            <div slot="tip" class="el-upload__tip" style="font-size: 12px;color: #999999;letter-spacing: 1.43px;">提示：只能上传json格式的文件</div>
                        </div>
                    </el-upload>
                </el-form-item>
            </el-form>
        </common-dialog>
        <common-dialog width="35%" headTitle="删除确认" :isShow="deleteVisiable" @closeDialog="handleClo" @submit="mapDelete" @cancleSonDialog="dialogCancle">
            <div style="width:100%;text-align:center;">
                <span style="font-family: MicrosoftYaHei;font-size: 16px;color: #333333;letter-spacing: 1.9px;margin-right:50px;">此操作将永久删除该文件, 是否继续?</span>
            </div>
        </common-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import searchModel from '../common/searchModel'
import tableModel from '../common/tableModel'
import commonDialog from '../common/commonDalog'
import FileSaver from 'file-saver'
import * as d3 from 'd3'
import { draw } from '@/untils/untils.js'
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
            mapId: '',
            areaArr: [],
            addAreaForm: {},
            editForm: {},
            searchJson: {
                filter: [],
                page: {
                page_num: 1,
                page_size: 10
                }
            },
            uploadId: '',
            addMapForm: {},
            uploadURL: '',
            addMapVisible: false,
            lineVisible: false,
            mapData: {},
            areaVisible: false,
            addLineForm: {},
            newTempLine: [],
            activeName: '1',
            addPointForm: {},
            total: 0,
            editVisible: false,
            pointVisible: false,
            tableData: [],
            pointData: [],
            index: 0,
            tempLine: [],
            newTempLine: []
        }
    },
    created() {
        this.getMapList()
    },
    methods: {
        dialogSonCancle () {
            this.areaVisible = false
            this.lineVisible = false
            this.pointVisible = false

        },
        dialogCancle () {
            this.deleteVisiable = false
            this.addMapVisible = false
            this.editVisible = false
            this.$refs.newupload.clearFiles()
            this.addMapForm = {}
        },
        // 搜索地图
        searchMap (obj) {
            if (JSON.stringify(obj) == '{}') {
                this.searchJson.filter = []
            } else {
                this.searchJson.filter.push(obj)
            }
            this.getMapList()
            this.searchJson.filter = []
        },
        // 保存编辑
        async saveMapChange () {
            let param = {
                cname: this.editForm.cname,
                description: this.editForm.description,
                point: this.pointData,
                line: this.newTempLine,
                conflict_areas: this.areaArr
            }
            let updata = JSON.stringify(param)
            const params = {
                id: this.mapId,
                update_str: updata
            }
            const url = genRequestGetUrl(apiUrl, 'maps', accessKeyId, 'update_by_id', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('编辑地图失败')
            this.$message.success('编辑成功')
            this.editVisible = false
        },
        // 导出json
        downloadMap (name, address) {
            this.$http.get(address).then(res => {
                const data = JSON.stringify(res.data)
                const blob = new Blob([data], {type: ''})
                FileSaver.saveAs(blob, name + '.json')
            })
        },
        // 处理分页
        changePageNum (val) {
            this.searchJson.page.page_num = val
            this.getMapList()
        },
        changePageSize (val) {
            this.searchJson.page.page_size = val
            this.getMapList()       
        },
        // 获取地图列表
        async getMapList () {
            let searchStr = JSON.stringify(this.searchJson)
            const url = genRequestGetUrl(apiUrl, 'maps', accessKeyId, 'list_items', {search_str: searchStr}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('获取地图列表失败')
            this.tableData = res.ret_data.rows
            this.total = res.ret_total
        },
        // 删除地图
        deleteMap (id) {
            this.deleteVisiable = true
            this.deleteId = id
        },
        async mapDelete () {
            let id = this.deleteId
            const url = genRequestGetUrl(apiUrl, 'maps', accessKeyId, 'delete_by_id', {id: id}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('删除地图失败')
            this.$message.success('删除地图成功')
            this.deleteVisiable = false
            this.getMapList()
        },
        // 添加地图
        async addMap () {
            this.addMapVisible = true
        },
        async submitAddMap () {
            this.$refs.newupload.submit()
            this.addMapVisible = false
            this.addMapForm = {}
            this.$refs.newupload.clearFiles()
        },
        handleRemove (file, fileList) {
        },
        beforeRemove (file, fileList) {
        },
        beforeAvatarUpload (file) {
            const _this = this
            const isJson = (file.type === '' || file.type === 'application/json')
            if (!isJson) return this.$message.warning('上传文件格式必须为json格式')
            let formData = new FormData()
            var originalArray = [1, 2, 3, 4];
            originalArray.sort(function () {
            return 0.5 - Math.random();
            });
            let random = parseInt(originalArray.join(''))
            let mapName = 'maps' + '_' +  Date.parse(new Date()) + '_' + random + '.json'
            formData.append(mapName, file, mapName)
            let config = {
            headers: {
                'Content-Type': 'multipart/form-data; charset=UTF-8 '
            }
            }
            const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'create_one', { cname: this.addMapForm.cname, description: this.addMapForm.description, map_name: mapName, resources: 'maps' }, accessKeySecret)
            let arr = url.split("?")
            let newUrl = 'http://117.135.164.14:7221/uploads?' + arr[arr.length - 1]
            this.$http.post(newUrl, formData, config).then(function (res) {
                _this.getMapList()
            }).catch((err) => {
            })
        },
        // tab栏切换
        tabChange () {
            if (this.activeName === '2') {
                var p = d3.select("#smallContainer").selectAll('svg')
                p.remove()
                draw(600, 200,  this.mapData , '#smallContainer', this.newTempLine, this.areaArr)
            } else if (this.activeName === '3') {
                var p = d3.select("#LineContainer").selectAll('svg')
                p.remove()
                draw(600, 200,  this.mapData , '#LineContainer', this.newTempLine, this.areaArr)
            } else if (this.activeName === '4') {
                var p = d3.select("#areaContainer").selectAll('svg')
                p.remove()
                draw(600, 200,  this.mapData , '#areaContainer', this.newTempLine, this.areaArr)
            } else {
                var p = d3.select("#container").selectAll('svg')
                p.remove()
                draw(600, 250,  this.mapData , '#container', this.newTempLine, this.areaArr)
            }
        },
        // 线操作
        addLinePoint () {
            this.lineVisible = true
        },
        // 点位连线
        addMapLine () {
            let isContinuePoint = false
            const _this = this
            this.tempLine = []
            this.mapData.advancedPointList.forEach(item => {
                if (item.instanceName == this.addLineForm.first || item.instanceName == this.addLineForm.second) {
                    _this.tempLine.push(item)
                }
            })
            if(_this.tempLine.length === 1) {
                _this.$message.warning('请选择地图上包含的点')
            } else {
                for (let i = 0; i < this.tempLine.length; i++) {
                    this.index++
                    let obj = {
                        id: this.index,
                        cname: this.addLineForm.cname,
                        startPos: _this.tempLine[i],
                        endPos: _this.tempLine[i + 1]
                    }
                    i++
                    _this.newTempLine.forEach(item => {
                        if (item.cname == obj.cname) {
                            this.$message.warning('当前连线已存在')
                            isContinuePoint = true
                        }
                    })
                    if (!isContinuePoint) {
                        _this.newTempLine.push(obj)
                    }
                }
                // 解决连线冲突
                var p = d3.select("#LineContainer").selectAll('svg')
                p.remove();
                draw(600, 200,  this.mapData , '#LineContainer', this.newTempLine, this.areaArr)
                this.lineVisible = false
                this.addLineForm = {}
            }
        },
        // 域操作
        addAreaPoint () {
            this.areaVisible = true
        },
        areaCreate () {
            this.index ++
            let obj = {
                id: this.index,
                cname: this.addAreaForm.cname,
                xleftpoint: this.addAreaForm.xleftpoint,
                yleftpoint: this.addAreaForm.yleftpoint,
                xbottompoint: this.addAreaForm.xbottompoint,
                ybottompoint: this.addAreaForm.ybottompoint,
            }
            if (this.addAreaForm.xleftpoint == undefined || this.addAreaForm.yleftpoint == undefined || this.addAreaForm.xbottompoint == undefined || this.addAreaForm.ybottompoint == undefined) {
                 this.$message.warning('请填写完整信息')
            } else {
                // 解决重复添加冲突域
                let isContinue = false
                this.areaArr.forEach(item => {
                    if (item.cname == obj.cname) {
                        this.$message.warning('当前冲突域已存在')
                        isContinue = true
                    }
                })
                if (!isContinue) {
                    this.areaArr.push(obj)
                    var p = d3.select("#areaContainer").selectAll('svg')
                    p.remove();
                    draw(600, 200,  this.mapData, '#areaContainer', this.newTempLine, this.areaArr)
                    this.addAreaForm = {}
                    this.areaVisible = false
                }
            }
        },
        handleArea (id) {
            this.areaArr.forEach(item => {
                if (item.id = id) {
                    this.areaArr.splice(this.areaArr.indexOf(item), 1)
                }
            })
            this.tabChange()
        },
        // 删除线
        lineDelte (id) {
            let _this = this
            this.newTempLine.forEach(item => {
                if (item.id === id) {
                    this.newTempLine.splice(this.newTempLine.indexOf(item), 1)
                    var p = d3.select("#LineContainer").selectAll('svg')
                    p.remove();
                    draw(600, 200,  this.mapData , '#LineContainer', this.newTempLine, this.areaArr)
                }
            })
        },
        // 点操作增加或删除
        addPointOperate () {
            this.pointVisible = true
            const nameArr = []
            this.mapData.advancedPointList.forEach(item => {
                nameArr.push(item.instanceName)
            })
            if (nameArr.indexOf(this.addPointForm.cname) !== -1) {
                this.$message.warning('当前点位已存在')
            } else if (this.addPointForm.xpoint == undefined || this.addPointForm.ypoint == undefined) {
                this.$message.warning('请完整填写点位信息')
            } else {
                this.mapData.advancedPointList.push({
                    instanceName: this.addPointForm.cname,
                    pos: {
                        x: this.addPointForm.xpoint,
                        y: this.addPointForm.ypoint
                    }
                }),
                this.pointData.push({
                    cname: this.addPointForm.cname,
                    instanceName: this.addPointForm.cname,
                    pos: {
                        x: this.addPointForm.xpoint,
                        y: this.addPointForm.ypoint
                    }
                })
                this.tabChange()
                this.pointVisible = false
                this.addPointForm = {
                    cname: '',
                    x: '',
                    y: ''
                }
            }
        },
        // 删除点   同时删除与该点有关的线
        deletePoint (cname, x, y) {
            this.newTempLine.forEach(item => {
                if (item.startPos.instanceName === cname || item.endPos.instanceName === cname) {
                    this.newTempLine.splice(this.newTempLine.indexOf(item), 1)
                    var p = d3.select("#LineContainer").selectAll('svg')
                    p.remove();
                    draw(600, 200,  this.mapData , '#LineContainer', this.newTempLine, this.areaArr)
                }
            })
            this.pointData.forEach(item => {
                if (item.cname === cname) {
                    this.pointData.splice(this.pointData.indexOf(item), 1)
                }
            })
            this.mapData.advancedPointList.forEach(item => {
                if (item.pos.x === x && item.pos.y === y) {
                     this.mapData.advancedPointList.splice( this.mapData.advancedPointList.indexOf(item), 1)
                }
            })
            this.tabChange()
        },
        // 点击编辑 
        handleEdit (id, address) {
            this.mapId = id
            this.areaArr = []
            this.mapById(id)
        },
        // 根据id查询当前信息
        async mapById (id) {
            let _this = this
            this.newTempLine = []
            this.areaArr = []
            this.mapData = []
            this.pointData = []
            const url = genRequestGetUrl(apiUrl, 'maps', accessKeyId, 'query_by_id', {id: id}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('查询地图失败')
            this.editForm = res.ret_data.rows[0]
            this.areaArr = res.ret_data.rows[0].conflict_areas === null ? [] : res.ret_data.rows[0].conflict_areas
            this.newTempLine = res.ret_data.rows[0].line === null ? [] :  res.ret_data.rows[0].line
            this.pointData = res.ret_data.rows[0].point === null ? [] :  res.ret_data.rows[0].point
             this.$http.get(res.ret_data.rows[0].address).then(res => {
                 if (res.data == '' || res.data.header == undefined) return this.$message.error('读取地图失败，地图格式存在问题')
                this.mapData = res.data
                _this.pointData.forEach(item => {
                    this.mapData.advancedPointList.push(item)
                })
                this.editVisible = true
                this.$nextTick(() => {
                     draw(600, 250,  this.mapData , '#container', this.newTempLine, this.areaArr)
                })
                // this.activeName = '1'
                // this.tabChange()
                })
        },
        handleAddMap () {
            this.addMapVisible = false
            this.$refs.newupload.clearFiles()
        },
        handleClo () {
            this.deleteVisiable = false
            this.uploadMapVisible = false
            this.addMapForm = {}
            this.editVisible = false
            var p = d3.select("#container").selectAll('svg')
            p.remove();
        },
        handleAppendClo () {
            this.pointVisible = false
            this.lineVisible = false
            this.areaVisible = false
        },
        addPoint () {
            this.pointVisible = true
        }
    },
}
</script>
<style>
.is-active{
    color:#fff!important;
    background-image: linear-gradient(90deg, #34ACFF 0%, #3B83FF 100%);
}
</style>
<style lang="less" scoped>
.edit_map{
    /deep/.el-tabs--left .el-tabs__item.is-left{
        text-align: center;
         height: 106px;
         line-height: 106px;
         border-top: 0;
    }
    /deep/.el-tabs{
        .el-tabs__header{
            .el-tabs__nav-wrap{
                margin-right:8px;
                .el-tabs__nav-scroll{
                    .el-tabs__nav{
                        box-shadow: 0 2px 9px 0 #D7DADD;
                        border-radius: 4px;
                        /deep/.el-tabs__item{
                            // margin:20px 0;
                            // height: 70px;
                            // line-height: 70px;
                            font-size: 16px;
                            // background: #fff;
                            color:#333
                        }
                    }
                }
            }
        }
    }
    .view_all{
        border: 1px solid #ccc;
        min-height: 32vh;
        padding: 10px;
        .point_title{
            border: 1px solid #ccc;
            min-height: 17vh;
            margin-bottom:15px;
        }
    }
}
</style>

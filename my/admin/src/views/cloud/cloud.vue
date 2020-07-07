<template>
    <div>
        <head-notice></head-notice>
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
                 <el-dropdown-menu slot="dropdown" >
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
          :data="tableList"
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
            prop="sn"
            label="机器SN"
            width="120"
            >
          </el-table-column>
          <el-table-column
            prop="cloud_region"
            width="120"
            label="地域"
            >
          </el-table-column>
          <el-table-column
            prop="cloud_vendor"
            label="云供应商"
            >
            <template>
              <span>阿里云</span>
            </template>
          </el-table-column>
          <el-table-column
            width="110"
            prop="device_name"
            label="设备名称">
          </el-table-column>
           <el-table-column
            label="绑定机器名称(SN)"
            width ="200"
            >
            <template slot-scope="slotProps">
              <span style="color:#129F77;" v-if="slotProps.row.machines.length !== 0">{{slotProps.row.machines[0].cname}}({{slotProps.row.machines[0].sn}})</span>
              <span style="color:red;" v-else>当前设备无关联机器</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            width ="130"
            >
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            width ="150"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="mtime"
            label="修改时间"
            width ="150"
            >
             <template slot-scope="slotProps">
            {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
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
                <el-button type="text" size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
                <el-button type="text" size="mini">
                    <el-dropdown trigger="click">
                      <span class="el-dropdown-link" style="font-size:12px;color:#409EFF">
                        机器<i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                      <el-dropdown-menu slot="dropdown"  class="relate_order">
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="relatedMachine(slotProps.row.id)">关联机器</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="bindMachine(slotProps.row.id)">绑定机器</el-button>
                        </el-dropdown-item>
                        <el-dropdown-item>
                          <el-button type="text" size="mini" @click="unbindMachine(slotProps.row.id, slotProps.row.org_id, slotProps.row.machines)">解绑机器</el-button>
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-button>
            </div>
        </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchJson.page.page_num"
          :page-sizes="[10,15,25,50,100,200]"
          :page-size="this.searchJson.page.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination> -->
        <page-model :total="total" @sizeChange="handleSizeChange" @numChange="handleCurrentChange"></page-model>
        <!-- 弹框 -->
      <el-dialog title="搜索条件" :visible="dialogFormVisible" @close='closeDialog'>
        <h2>搜索</h2>
        <el-form :model="modelList" :inline="true" label-position = "top" class="select_form" ref="modelListRef">
          <el-form-item :label="item.comment" :key="index" v-for="(item, index) in modelList">
            <div style="display:flex;" class="search_add">
              <el-input placeholder="请输入内容" v-model="input[index]" clearable></el-input>
               <el-popover
                  placement="bottom"
                  title="高级设置"
                  width="400"
                  style="margin-left:15px;"
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
                    <el-form-item label="查询">
                      <el-radio-group  v-model="selectCondition[index]">
                        <el-radio label="模糊"></el-radio>
                        <el-radio label="精确"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </el-popover>
            </div>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 认领和创建 -->
      <el-dialog
        :title="showTitle"
        :visible="createdDeviceDialogVisible"
        width="45%"
        class="creat_dia"
        :before-close="handleClose">
        <div  v-show="showCreated">
        <el-form ref="addDevicesFormRef" :model="addDevicesForm" label-width="110px" :rules="rules" :inline="true">
          <el-row>
              <el-col :span="12">
                <el-form-item label="英文名称" prop="name">
                  <el-input v-model="addDevicesForm.name" placeholder="请输入英文名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="中文名称" prop="cname">
                  <el-input v-model="addDevicesForm.cname" placeholder="请输入中文名称"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="云供应商" prop="cloud_vendor">
                <el-select v-model="addDevicesForm.cloud_vendor" placeholder="请选择">
                  <el-option value="aliyun">aliyun</el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="地域" prop="cloud_region">
              <el-select v-model="addDevicesForm.cloud_region" placeholder="请选择">
                  <el-option value="cn-shanghai">cn-shanghai</el-option>
                </el-select>
            </el-form-item>
            </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                 <el-form-item label="云服务入口" prop="cloud_entry">
                  <el-input v-model="addDevicesForm.cloud_entry" placeholder="请输入云服务入口"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                 <el-form-item label="产品密钥" prop="product_key">
                  <el-input v-model="addDevicesForm.product_key" placeholder="请输入产品密钥"></el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
              <el-col :span="12">
                <el-form-item label="设备名称" prop="device_name">
                  <el-input v-model="addDevicesForm.device_name" placeholder="请输入设备名称">
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="设备密钥" prop="device_secret">
                  <el-input v-model="addDevicesForm.device_secret" placeholder="请输入设备密钥">
                  </el-input>
                </el-form-item>
              </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
            <el-form-item label="SN" prop="device_secret">
              <el-input v-model="addDevicesForm.sn" placeholder="请输入sn">
              </el-input>
            </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="备注">
                <el-input v-model="addDevicesForm.description" placeholder="请输入其他备注"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <p style="color:#129f77;">温馨提示：当前红色星号标记的为必填项</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancleAdd()">取 消</el-button>
          <el-button type="primary" @click="addSubmit()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 详情页 -->
      <el-dialog
        title="详细信息"
        :visible="detailDialogVisible"
        width="60%"
        :before-close="handleClose">
          <div v-for="(item, index) in detailList" :key="index">
            <div>
              <h3 class="all_title">基础信息</h3>
              <div style="margin-left:20px;">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>编号:</p>
                      <p style="margin-left:15px">{{item.id}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>英文名称:</p>
                      <p style="margin-left:15px">{{item. name}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>中文名称:</p>
                      <p style="margin-left:15px">{{item.cname}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>创建时间:</p>
                      <p style="margin-left:15px">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>修改时间:</p>
                        <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                      </div>
                    </el-col>
                    <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>描述:</p>
                        <p style="margin-left:15px">{{item.description}}</p>
                      </div>
                    </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <h3 class="all_title">其他信息</h3>
              <div style="margin-left:20px;">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>云服务入口:</p>
                      <p style="margin-left:15px">{{item.cloud_entry}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>地域:</p>
                      <p style="margin-left:15px">{{item.cloud_region}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>云供应商:</p>
                      <p style="margin-left:15px">{{item.cloud_vendor}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>设备名称:</p>
                      <p style="margin-left:15px">{{item.device_name}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>设备密钥:</p>
                      <p style="margin-left:15px">{{item.device_secret}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>产品密钥:</p>
                      <p style="margin-left:15px">{{item.product_key}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>SN:</p>
                      <p style="margin-left:15px">{{item.sn}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
      </el-dialog>
      <!-- 编辑页面 -->
      <el-dialog
        title="更新"
        :visible="editDialogVisible"
        width="40%"
        :before-close="handleClose">
          <el-form ref="editDeviceFormRef" :model="editDeviceForm" label-width="110px" :rules="rules" :inline="true">
           <el-form-item label="英文名称" prop="name">
            <el-input v-model="editDeviceForm.name" placeholder="请输入英文名称" disabled></el-input>
          </el-form-item>
          <el-form-item label="中文名称" prop="cname">
            <el-input v-model="editDeviceForm.cname" placeholder="请输入中文名称"></el-input>
          </el-form-item>
          <el-form-item label="云供应商" prop="cloud_vendor">
            <el-input v-model="editDeviceForm.cloud_vendor" placeholder="请输入云供应商" disabled></el-input>
          </el-form-item>
          <el-form-item label="地域" prop="cloud_region">
            <el-input v-model="editDeviceForm.cloud_region" placeholder="请输入地域" disabled></el-input>
          </el-form-item>
          <el-form-item label="云服务入口" prop="cloud_entry">
            <el-input v-model="editDeviceForm.cloud_entry" placeholder="请输入云服务入口"></el-input>
          </el-form-item>
           <el-form-item label="产品密钥" prop="product_key">
            <el-input v-model="editDeviceForm.product_key" placeholder="请输入产品密钥"></el-input>
          </el-form-item>
           <el-form-item label="设备名称" prop="device_name">
            <el-input v-model="editDeviceForm.device_name" placeholder="请输入设备名称">
            </el-input>
          </el-form-item>
           <el-form-item label="设备密钥" prop="device_secret">
            <el-input v-model="editDeviceForm.device_secret" placeholder="请输入设备密钥">
            </el-input>
          </el-form-item>
          <el-form-item label="SN" prop="device_secret">
            <el-input v-model="editDeviceForm.sn" placeholder="请输入sn">
            </el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editDeviceForm.description" placeholder="请输入其他备注"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 绑定机器 -->
      <el-dialog
        title="绑定机器"
        :visible.sync="bindMachineDialogVisible"
        width="30%"
        :before-close="handleClose">
        <el-select v-model="machineCname" placeholder="请选择" style="margin-top:20px;">
          <el-option
            v-for="(item, index) in machineArr"
            :key="index"
            :label="item.cname + '(' + item.sn + ')'"
            :value="item.id">
          </el-option>
        </el-select>
        <span slot="footer" class="dialog-footer">
          <el-button @click="bindMachineDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBindMachine()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 关联机器 -->
      <el-dialog
        title="详情展示"
        :visible="machineDetailDialogVisible"
        width="50%"
        :before-close="handleClose">
        <div v-for="(item, index) in relateMachineList" :key="index">
          <div>
            <h3 class="all_title">基础信息</h3>
            <div style="margin-left:20px;">
              <el-row style="margin-bottom:20px;">
                <el-col :span="8">中文名称：{{item.cname}}</el-col>
                <el-col :span="8">业务状态：
                  <el-tag type="success"  v-show="item.status === 1">启用</el-tag>
                  <el-tag type="info" v-show="item.status === 2">关闭</el-tag>
                  <el-tag v-show="item.status === 3">维护中</el-tag>
                </el-col>
                <el-col :span="8">创建者：{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</el-col>
              </el-row>
              <el-row style="margin-bottom:20px;">
                <el-col :span="8">更新者：{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</el-col>
                <el-col :span="8">地址：{{item.address}}</el-col>
                <el-col :span="8">创建时间：{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="8">修改时间：{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</el-col>
                <el-col :span="12">备注：{{item.description}}</el-col>
              </el-row>
            </div>
          </div>
          <div>
            <h3 class="all_title">其他信息</h3>
            <div style="margin-left:20px;">
              <el-row style="margin-bottom:20px;">
                <el-col :span="8">类型：
                  <el-tag v-show="item.type === 2">有屏</el-tag>
                  <el-tag type="success" v-show="item.type === 1">无屏</el-tag>
                </el-col>
                <el-col :span="8">控制类型：
                  <el-tag v-show="item.control_type === 2">弹簧</el-tag>
                  <el-tag type="success" v-show="item.control_type === 1">继电器</el-tag>
                </el-col>
                <el-col :span="8">验证模式：
                  <el-tag v-show="item.verify === 2">关闭</el-tag>
                  <el-tag type="success" v-show="item.verify === 1">开启</el-tag>
                </el-col>
              </el-row>
              <el-row style="margin-bottom:20px;">
                <el-col :span="8">机器SN：{{item.sn}}</el-col>
              </el-row>
            </div>
          </div>
          <div>
            <h3 class="all_title">相关图片</h3>
            <el-row style="margin-left:20px;">
              <img :src="item.qr_code_image_url" alt="" style="width:200px;height:200px;">
            </el-row>
          </div>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import headNotice from './../../components/notice.vue'
import dataTime from '@/components/dataTime'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { pageModel, dataTime, headNotice },
  data () {
    return {
      machineDetailDialogVisible: false,
      relateMachineList: [],
      machineId: '',
      deviceId: '',
      machineCname: '',
      bindMachineDialogVisible: false,
      machineArr: [],
      isScroll: 'display:block;',
      personStart: '',
      personEnd: '',
      editDialogVisible: false,
      editDeviceForm: {
        policy_type: 1
      },
      arr: [],
      rules: {
        cloud_vendor: [
          { required: true, message: '请输入云供应商', trigger: 'blur' }
        ],
        cloud_region: [
          { required: true, message: '请输入地域', trigger: 'blur' }
        ],
        cloud_entry: [
          { required: true, message: '请输入云服务入口', trigger: 'blur' }
        ],
        product_key: [
          { required: true, message: '请输入产品密钥', trigger: 'blur' }
        ],
        device_name: [
          { required: true, message: '请输入设备名称', trigger: 'blur' }
        ],
        device_secret: [
          { required: true, message: '请输入设备密钥', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ]
      },
      selectName: '',
      selectOrgId: 1,
      treeList: [],
      claimDisabled: true,
      showCreated: '',
      showTitle: '',
      orgId: '',
      addDevicesForm: {
        name: '',
        cloud_vendor: '',
        cloud_region: '',
        cloud_entry: '',
        product_key: '',
        device_name: '',
        description: '',
        device_secret: '',
        sn: ''
      },
      createdDeviceDialogVisible: false,
      detailList: [],
      detailDialogVisible: false,
      // 输入框集合
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
      // 顺序
      order: {},
      // 查询条件
      selectCondition: {
        'op': 'like'
      },
      value1: true,
      dialogFormVisible: false,
      modelList: { },
      tableList: [],
      total: 0,
      meId: '',
      form: {
        resource: ''
      },
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      },
      imgSrc: '',
      selectId: '',
      selectIdArr: []
    }
  },
  created () {
    this.getAllCloudData()
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    async relatedMachine (id) {
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'query_related_machine', { device_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        if (res.ret_data.rows.length === 0) return this.$message.warning('当前设备暂无关联机器')
        this.relateMachineList = res.ret_data.rows
        this.machineDetailDialogVisible = true
      }
    },
    async unbindMachine (id, orgId, arr) {
      if (arr.length === 0) return this.$message.warning('此设备尚未绑定机器')
      const machineId = arr[0].id
      const confirmResult = await this.$confirm('此操作将进行注销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'unbind_machine', { machine_id: machineId, device_id: id, org_id: orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('解绑成功')
        this.getAllCloudData()
      }
    },
    async submitBindMachine () {
      if (this.machineCname === '') return this.$message.warning('请选择要绑定的机器')
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'bind_machine', { machine_id: this.machineCname, device_id: this.deviceId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('绑定成功')
      }
    },
    bindMachine (id) {
      this.deviceId = id
      this.getAllDataMachines()
      this.bindMachineDialogVisible = true
    },
    getScroll () {
      this.isScroll = 'display:none;'
    },
    // 按照时间搜索
    getCurrentData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getAllCloudData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllCloudData()
    },
    // 一键重置
    reset () {
      this.searchJson.filter = []
      this.getAllCloudData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllCloudData()
    },
    handleClose () {
      this.createdDeviceDialogVisible = false
      this.bindMachineDialogVisible = false
      this.editDialogVisible = false
      this.detailDialogVisible = false
      this.machineDetailDialogVisible = false
      this.addDevicesForm = {}
    },
    handleUploadClose () {
      this.uploadDialogVisible = false
      this.$refs.newupload.clearFiles()
    },
    // 提交高级查询
    sure () {
      this.dialogFormVisible = true
      var arr = []
      var arr1 = []
      for (let key in this.input) {
        if (this.input[key] !== '') {
          if (key === 'default_discount_unit_price' || key === 'default_retail_unit_price' || key === 'default_share_ratio' || key === 'default_supply_unit_price' || key === 'id') {
            var obj1 = {
              'key': key,
              'op': 'eq',
              'value': parseFloat(this.input[key])
            }
            arr.push(obj1)
          } else {
            var obj = {
              'key': key,
              'op': 'like',
              'value': this.input[key]
            }
            arr.push(obj)
          }
          this.searchJson.filter = [...arr, ...arr1]
        }
      }
      this.getAllData()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    // 关闭高级查询框
    closeDialog () {
      this.dialogFormVisible = false
    },
    // 查看详情
    async showDetail (id) {
      this.detailDialogVisible = true
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data.rows
      }
    },
    // 根据名称搜索
    async selectByName () {
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.meId
      }
      this.searchJson.filter.push(obj)
      this.getAllCloudData()
      this.searchJson.filter = []
    },
    // 获取所有设备
    async getAllCloudData () {
      this.orgId = parseInt(window.localStorage.getItem('active')) === 'NAN' ? 1 : parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.tableList = res.ret_data
        this.total = res.ret_total
      }
    },
    // 查询所有机器
    async getAllDataMachines () {
      this.machineArr = []
      this.orgId = 1
      var searchStr = JSON.stringify({})
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(item => {
          const obj = {
            cname: item.cname,
            id: item.id,
            sn: item.sn
          }
          this.machineArr.push(obj)
        })
      }
    },
    // 高级搜索条件
    async detailSearch () {
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'list_schema', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.dialogFormVisible = true
        this.modelList = res.ret_data
      }
    },
    // 设备创建认领弹框
    claim (str) {
      this.getNavList()
      if (str === 'created') {
        this.showCreated = true
        this.showTitle = '创建'
      } else {
        this.showCreated = false
        this.showTitle = '认领'
      }
      this.createdDeviceDialogVisible = true
    },
    // 监听表格单选框
    selectBox () {
      if (this.$refs.multipleTable.selection.length !== 0) {
        this.selectIdArr = []
        this.$refs.multipleTable.selection.forEach(item => {
          this.selectIdArr.push(item.id)
        })
        this.claimDisabled = false
      } else {
        this.claimDisabled = true
      }
    },
    // 设备提交创建和认领
    async addSubmit () {
      if (this.showCreated === true) {
        if (this.addDevicesForm.org_id === '') return this.$message.error('请选择认领的组织')
        this.addDevicesForm['org_id'] = 1
        const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'create_one', this.addDevicesForm, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('添加成功')
          this.getAllCloudData()
          this.createdDeviceDialogVisible = false
          this.selectName = ''
        }
      } else {
        this.selectIdArr.forEach(async item => {
          var params = {
            policy_id: parseInt(item),
            org_id: this.selectOrgId
          }
          const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'bind_org', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('认领成功')
          }
        })
        this.createdDeviceDialogVisible = false
        this.selectName = ''
        this.getAllData()
      }
    },
    // 提交编辑
    async editSubmit () {
      const id = this.editDeviceForm.id
      const editStr = JSON.stringify(this.editDeviceForm)
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'update_by_id', { 'update_str': editStr, id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
        this.getAllCloudData()
        this.editDialogVisible = false
      }
    },
    // 获取组织树
    async getNavList () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_org_alltree', {}, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.treeList = res.ret_data[0].platforms
      }
    },
    // 编辑获取数据
    editUserInfo (id) {
      this.editDialogVisible = true
      this.selectbyId(id)
    },
    // 获取组织org-id
    write (oid, name) {
      this.selectOrgId = oid
      this.selectName = name
    },
    // 根据id查找商品
    async selectbyId (id) {
      const url = genRequestGetUrl(apiUrl, 'devices', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.rows.forEach(item => {
          this.editDeviceForm = item
        })
      }
    },
    // 取消创建
    cancleAdd () {
      this.createdDeviceDialogVisible = false
      this.selectName = ''
      this.addDevicesForm = {}
    },
    // 根据id删除
    async deleteGoodsInfo (id) {
      const confirmResult = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'delete_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('删除成功')
        this.getAllData()
      }
    }
  },
  computed: {
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.getAllCloudData()
    }
  }
}
</script>
<style scoped>
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
}
.current_pic{
  width: 200px;
  height: 300px
}
.current_pic img{
  width: 100%;
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.direct_select{
  margin-left: 10px;
}
.select_form >>>.el-form-item{
  margin-bottom: 5px;
}
.select_form >>>.el-form-item:nth-child(even){
  margin-right: 50px;
  float: right;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
.creat_dia >>> .el-dialog__body{
  padding: 0 20px 30px;
}
.creat_dia .el-form-item:nth-child(even){
  float:right;
}
.box-card >>> .el-button.is-disabled, .box-card >>>  .el-button.is-disabled:focus, .box-card >>>  .el-button.is-disabled:hover{
  color: #fff;
  cursor: not-allowed;
  background-image: none;
  background-color: #ccc;
  border-color: #EBEEF5;
}
</style>

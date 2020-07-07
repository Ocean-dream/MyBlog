<template>
  <div>
    <head-notice></head-notice>
    <el-card class="box-card">
      <div style="float:right;">
        <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
        <el-button type="primary" @click="selectByName()" style="margin:5px 20px">名称查询</el-button>
        <el-button type="primary" @click="reset()">一键重置</el-button>
      </div>
    </el-card>
      <!-- 表格 -->
    <el-table
      :data="tableList"
      ref="multipleTable"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180"
        >
          <template slot-scope="slotProps">
            <el-tag type="info"  style="cursor: pointer;" @click="showDetail(slotProps.row.id)">{{slotProps.row.id}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        >
      </el-table-column>
        <el-table-column
        prop="legal_person_name"
        label="法人"
        >
      </el-table-column>
      <el-table-column
        prop="biz_scope"
        label="经营范围"
        >
      </el-table-column>
      <el-table-column
        prop="biz_type"
        label="商户类型"
        >
        <template slot-scope="slotProps">
          <el-tag v-show="slotProps.row.id === 1">企业商户</el-tag>
          <el-tag type="success" v-show="slotProps.row.id === 2">个体工商户</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="industry_type"
        label="行业类型"
        >
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        >
        <template slot-scope="slotProps">
          <el-tag v-show="slotProps.row.status === 1">已提交</el-tag>
          <el-tag type="warning" v-show="slotProps.row.status === 2">审核中</el-tag>
          <el-tag type="danger" v-show="slotProps.row.status === 3">未通过</el-tag>
          <el-tag type="success" v-show="slotProps.row.status === 4">已通过</el-tag>
          <el-tag type="info" v-show="slotProps.row.status === 5">已过期</el-tag>
        </template>
      </el-table-column>
       <el-table-column
        label="组织归属"
        >
          <template slot-scope="slotProps">
            <el-tag type="success">{{slotProps.row.org.cname}}</el-tag>
          </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="300"
        >
        <template slot-scope="slotProps">
          <div class="top">
              <el-button type="text" size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
              <el-button type="text" size="mini" @click="passVerify(slotProps.row.id)">通过</el-button>
              <el-button type="text" size="mini" @click="refuseVerify(slotProps.row.id)">拒绝</el-button>
              <el-button type="text" size="mini" @click="loseVerify(slotProps.row.id)">失效</el-button>
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
    <!-- <el-dialog title="搜索条件" :visible="dialogFormVisible" @close='closeDialog'>
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
                  <el-form-item label="查询" v-show="item.type.substring(0, 3) == 'VAR'">
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
      <h2>关联</h2>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure()">确 定</el-button>
      </div>
    </el-dialog> -->
    <!-- 详情页 -->
   <el-dialog
     title="详情展示"
     :visible="detailDialogVisible"
     width="60%"
     append-to-body
     :before-close="handleClose">
      <div v-for="(item, index) in detailList" :key="index">
        <div style="margin-bottom:20px;">
          <h3 class="all_title">基础信息</h3>
          <div style="margin-left:20px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  编号：{{item.id}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  名称：{{item.name}}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  法人：{{item.legal_person_name }}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="detail_qualify">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  经营范围：{{item.biz_scope }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  商户类型：
                  <el-tag v-show="item.biz_type === 1">企业商户</el-tag>
                  <el-tag type="success" v-show="item.biz_type === 2">个体工商户</el-tag>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  行业类型：{{item.industry_type}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="detail_qualify">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  创建时间：{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  修改时间：{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss') }}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <h3 class="all_title">资质信息</h3>
          <div style="margin-left:20px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple">
                  法人身份证号：{{item.legal_idcard_no}}
                </div>
              </el-col>
              <el-col :span="13">
                <div class="grid-content bg-purple">
                  药品许可证有效日期：{{item.goods_biz_license_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.goods_biz_license_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="detail_qualify">
              <el-col :span="11">
                <div class="grid-content bg-purple">
                  营业执照有效日期：{{item.biz_license_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.biz_license_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
                </div>
              </el-col>
              <el-col :span="13">
                <div class="grid-content bg-purple">
                  药品经营质量管理规范认证有效日期：{{item.biz_op_quality_gsp_certificate_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.biz_op_quality_gsp_certificate_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div>
          <h3 class="all_title">相关图片</h3>
          <div style="margin-left:20px;">
            <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  商户营业执照 ：
                    <el-image
                      style="width:80px;"
                      :src="item.biz_license_img_url_logo"
                      :preview-src-list="saleImgList">
                    </el-image>
                </div>
              </el-col>
                <el-col :span="8">
                  <div class="grid-content bg-purple detail_img">
                    药品经营许可证：
                      <el-image
                      style="width:80px;"
                      :src="item.goods_biz_license_img_url_logo"
                      :preview-src-list="licenseImgList">
                    </el-image>
                  </div>
                </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  药品经营质量管理规范认证：
                  <el-image
                    style="width:80px;"
                    :src="item.biz_op_quality_gsp_certificate_img_url_logo"
                    :preview-src-list="qualityImgList">
                  </el-image>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" style="margin-top:30px;">
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  门店门头照片：
                    <el-image
                    style="width:80px;"
                    :src="item.store_headdoor_img_url_logo"
                    :preview-src-list="headImgList">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  法人手持证件照 ：
                    <el-image
                    style="width:80px;"
                    :src="item.legal_idcard_hold_img_url_logo"
                    :preview-src-list="cardImgList">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  门店店内照片 ：
                    <el-image
                    style="width:80px;"
                    :src="item.store_indoor_img_url_logo"
                    :preview-src-list="indoorImgList">
                  </el-image>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20" class="detail_qualify">
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  租赁合同照片 ：
                    <el-image
                    style="width:80px;"
                    :src="item.store_biz_contact_logo"
                    :preview-src-list="contactImgList">
                  </el-image>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img" >
                  门店收银台照片：
                    <el-image
                    style="width:80px;"
                    :src="item.store_cashier_img_url_logo"
                    :preview-src-list="cashierImgList">
                  </el-image>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
   </el-dialog>
  </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import headNotice from './../../components/notice.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: {
    headNotice,
    pageModel
  },
  data () {
    return {
      contactImgList: [],
      cashierImgList: [],
      headImgList: [],
      cardImgList: [],
      indoorImgList: [],
      licenseImgList: [],
      saleImgList: [],
      qualityImgList: [],
      orgId: '',
      detailList: [],
      // modelList: {},
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
      // dialogFormVisible: false,
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
      }
    }
  },
  created () {
    this.getAllData()
  },
  methods: {
    reset () {
      this.getAllData()
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllData()
    },
    handleClose () {
      this.detailDialogVisible = false
      this.saleImgList = []
      this.licenseImgList = []
      this.qualityImgList = []
      this.headImgList = []
      this.cardImgList = []
      this.indoorImgList = []
      this.contactImgLi = []
      this.cashierImgList = []
    },
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
    closeDialog () {
      this.dialogFormVisible = false
    },
    async showDetail (id) {
      this.detailDialogVisible = true
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data.rows
        this.saleImgList.push(res.ret_data.rows[0].biz_license_img_url)
        this.licenseImgList.push(res.ret_data.rows[0].goods_biz_license_img_url)
        this.qualityImgList.push(res.ret_data.rows[0].biz_op_quality_gsp_certificate_img_url)
        this.headImgList.push(res.ret_data.rows[0].store_headdoor_img_url)
        this.cardImgList.push(res.ret_data.rows[0].legal_idcard_hold_img_url)
        this.indoorImgList.push(res.ret_data.rows[0].store_indoor_img_url)
        this.contactImgList.push(res.ret_data.rows[0].store_biz_contact)
        this.cashierImgList.push(res.ret_data.rows[0].store_cashier_img_url)
      }
    },
    async selectByName () {
      if (this.meId === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.meId
      }
      this.searchJson.filter.push(obj)
      this.getAllData()
      this.searchJson.filter = []
    },
    async getAllData () {
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
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
    async passVerify (id) {
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'review_passed', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.getAllData()
      }
    },
    async refuseVerify (id) {
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'review_rejected', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.getAllData()
      }
    },
    async loseVerify (id) {
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'review_expired', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.getAllData()
      }
    }
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
    },
    orgId () {
      this.searchJson['org_id'] = this.orgId
      this.getAllData()
    }
  }
}
</script>
<style scoped>
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
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
.detail_qualify{
  margin: 20px 0;
}
.detail_img{
  display: flex;
}
</style>

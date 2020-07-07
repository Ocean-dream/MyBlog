<template>
    <div>
        <head-notice></head-notice>
        <el-card class="box-card">
           <div style="float:right;margin-bottom: 5px;">
              <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
              <el-button type="primary" @click="selectByName()" style="margin:5px 20px">名称查询</el-button>
              <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                    <el-popover
                      placement="bottom"
                      trigger="click">
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;"  @click="isScroll = 'display:block;'">时段查询</el-button>
                    </el-popover>
                  </el-dropdown-item>
                  <el-dropdown-item><span @click="detailSearch()">高级查询</span></el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
              </el-button>
              <el-button type="primary" @click="reset()">一键重置</el-button>
           </div>
        </el-card>
          <!-- 表格 -->
        <el-table
          v-loading="loading"
          element-loading-text="正在  加载中"
          element-loading-background="rgba(0,0,0,.3)"
          :data="tableList"
          @row-click="clickTableRow"
          @row-contextmenu="rightClick"
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
            prop="operator"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="machine_cname"
            label="机器名称"
            >
          </el-table-column>
           <el-table-column
            prop="channel_num"
            label="货道号"
            >
          </el-table-column>
           <el-table-column
            prop="machine_id"
            label="机器编号"
            >
          </el-table-column>
          <el-table-column
            prop="goods_cname"
            label="商品名"
            >
          </el-table-column>
          <el-table-column
            prop="diff_goods_num"
            label="补货量（个）">
            <template slot-scope="slotProps">
              <span style="color:red" v-show="slotProps.row.diff_goods_num < 0">{{slotProps.row.diff_goods_num}}</span>
              <span style="color:#129f77" v-show="slotProps.row.diff_goods_num >= 0">{{slotProps.row.diff_goods_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchant"
            width="180"
            label="商户">
          </el-table-column>
          <el-table-column
            prop="store"
            label="门店"
            width ="160"
          >
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="创建时间"
            width ="160"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
          <el-table-column
            label="组织归属"
            >
             <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="text" size="mini" @click="showDetail(slotProps.row.id)">详情</el-button>
            </div>
        </template>
          </el-table-column>
        </el-table>
        <div id="menu">
            <div class="menu" v-for="(item,index) in menus" :key="index" @click.stop="infoClick(index)">{{item}}</div>
        </div>
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
            <!-- <pre>{{item.type}}</pre> -->
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
      </el-dialog>
      <!-- 详情页 -->
      <el-dialog
        title="详细信息"
        :visible="detailDialogVisible"
        width="54%"
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
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>操作人:</p>
                  <p style="margin-left:15px">{{ item.operator }}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>补货数量:</p>
                  <p style="margin-left:15px;color:green;" v-show="item.diff_goods_num >= 0">{{ item.diff_goods_num }}</p>
                  <p style="margin-left:15px;color:red;" v-show="item.diff_goods_num < 0">{{ item.diff_goods_num }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;margin-bottom:10px;">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建时间:</p>
                  <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
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
              <el-col :span="10"><div class="grid-content bg-purple">
                <div style="background:#1E1E1E;color:#C48A72;width:80%;overflow:auto;">
                  <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{item.confirm_share_json.pre}}</pre>
                </div>
                </div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">
                 <div style="background:#1E1E1E;color:#C48A72;width:80%;overflow:auto;">
                  <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{item.confirm_share_json.new}}</pre>
                </div>
                </div></el-col>
            </el-row>
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
      menus: ['查看详情'],
      radio: null,
      currentRowIndex: 0,
      isScroll: 'display:block;',
      orgId: '',
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
      loading: false,
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
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    infoClick (index) {
      var menu = document.querySelector('#menu')
      menu.style.display = 'none'
      if (this.menus[index] === '查看详情') {
        this.showDetail(this.currentRowIndex)
      }
      // console.log('当前选中行id为' + this.currentRowIndex, '你点击了自定义菜单的' + this.menus[index] + '功能')
    },
    // table的左键点击当前行事件
    clickTableRow (row, column, event) {
      var menu = document.querySelector('#menu')
      menu.style.display = 'none'
      this.tableList.forEach((item, index) => {
        if (row.name === item.name) {
          this.radio = index
        }
      })
    },
    rightClick (row, column, event) {
      var menu = document.querySelector('#menu')
      event.preventDefault()
      menu.style.left = event.pageX + 'px'
      menu.style.top = event.pageY + 'px'
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block'
      // 获取当前右键点击table下标
      this.tableList.forEach((item, index) => {
        if (item.name === row.name) {
          this.currentRowIndex = item.id
          return false
        }
      })
    },
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 10
        }
      }
      this.getAllData()
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
      this.getAllData()
    },
    getScroll () {
      this.isScroll = 'display:none;'
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
      const url = genRequestGetUrl(apiUrl, 'supplements', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
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
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'supplements', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
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
        this.loading = false
      }
    },
    async detailSearch () {
      this.dialogFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'supplements', accessKeyId, 'list_schema', { }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.modelList = res.ret_data
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
.box-card >>> .el-button{
  padding: 7px 17px;
}
#menu {
  width: 120px;
  /* height: 100px; */
  overflow: hidden; /*隐藏溢出的元素*/
  box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
  position: absolute;
  display: none;
  background: #ffffff;
  z-index: 10;
}
.menu {
    width: 125px;
    height: 25px;
    line-height: 25px;
    text-indent: 10px;
    cursor: pointer;
}
.menu:hover {
    color: rgb(18, 159, 119);
    text-decoration: underline;
}
</style>

<template>
  <div  class="cur_mach">
     <div class="loading_sty" v-show="isLoading">
        <van-loading vertical type="spinner" size="40px" color="#fff">正在加载...</van-loading>
      </div>
    <div class="goods_title">
      <b>货道商品</b>
      <van-button color="#129E7b" size="mini" @click="getCurrentMachineInfo()" style="color:#fff;margin-left:34%;" icon="replay">刷新页面</van-button>
      <van-button color="#129E7b" size="mini" @click="showAllBox()" style="color:#fff;margin-left:10%;" icon="upgrade">退出补货</van-button>
    </div>
      <van-tree-select
        height="95vh"
        :items="items"
        @click-nav ="selectIndex"
        :main-active-index.sync="active"
      >
        <template slot="content">
            <div v-if="active === 0" >
            </div>
            <div v-for="(item, floor) in 10" :key="floor" v-show="active - 1 === floor" class="goods_floor">
              <!-- <span v-for="(item, index) in 10" :key="index"> -->
                <van-col :span="11" v-for="(item, num) in machineList[active - 1]" :key="num" style="background:#ccc;position:relative;height:17vh;margin: 0.5vh 1vw;">
                    <div v-if="item.goods_number !== undefined">
                      <van-tag type="success" style="font-size:2vw;text-align:left;position:absolute;top:0;left:0;" mark>货道:{{item.goods_channel_no}}</van-tag>
                      <img :src="item.goods_img_url_logo" style="height:10vh;margin-top:1vh;" alt="" @click="editGoods(item.goods_img_url_logo,item.goods_channel_no, item.confirm_supply_unit_price, item.goods_number, item.confirm_retail_unit_price, item.confirm_discount_unit_price, item.goods_id)">
                      <span style="font-size:2.5vw;display:block;">名称：{{item.goods_cname}}</span>
                      <span style="font-size:2.5vw;display:block;">零售单价：{{item.confirm_discount_unit_price}}￥</span>
                      <van-tag type="danger" style="font-size:2vw;position:absolute;top:10%;right:20%;;;" round>{{item.goods_number}}</van-tag>
                      <van-tag  style="font-size:2vw;position:absolute;top:0;right:0;"  @click="deleteGoods(item.goods_channel_no)" round>X</van-tag>
                      <van-tag type="warning" style="font-size:2vw;position:absolute;top:20%;right:0;"  @click="editGoods(item.goods_img_url_logo,item.goods_channel_no, item.confirm_supply_unit_price, item.goods_number, item.confirm_retail_unit_price, item.confirm_discount_unit_price, item.goods_id)">更新</van-tag>
                    </div>
                    <div v-else>
                      <van-tag type="success"  style="font-size:2vw;text-align:left;position:absolute;top:0;left:0;">货道:{{item.goods_channel_no}}</van-tag>
                      <div  @click="addGoods(item.goods_channel_no)" style="line-height:17vh;font-size:10vw;color:#aaa;">+</div>
                    </div>
                </van-col>
            </div>
        </template>
      </van-tree-select>
    <!-- 添加商品 -->
    <van-dialog  v-model="isShowAdd" show-cancel-button @cancel="cancelAdd()" @click-overlay="cancelAdd()" @confirm="submitAdd()">
      <div>
        <van-row>
            <van-col :span="9"><span style="line-height:36vh;color:#333;font-size:4vw;">选择商品</span></van-col>
            <van-col :span="15">
              <van-picker :columns="columns" @change="selectChange"/>
            </van-col>
        </van-row>
        <van-row>
          <van-col :span="9" style="text-align:center; font-size: 4vw;">
            商品图片
          </van-col>
          <van-col :span="15">
            <img :src="selectImg" alt="" style="height:4vh;">
          </van-col>
        </van-row>
        <van-field :value="supplyPrice" label="供应单价" type="number" right-icon="gold-coin-o" @input="changeSupply"/>
        <van-field :value="salePrice" label="零售单价"  type="number"  right-icon="gold-coin-o" @input="changeSale"/>
        <van-field :value="discountPrice" label="优惠单价"  type="number" right-icon="gold-coin-o" @input="changeDiscount"/>
        <van-field :value="goodsNumber" label="商品数量"  type="number"  @input="changeNum"/>
      </div>
    </van-dialog >
    <!-- 编辑商品 -->
     <van-dialog  v-model="isShowEdit" show-cancel-button style="background:#129E7b;" @cancel="cancelEdit()" @click-overlay="cancelEdit()" @confirm="submitEdit()">
      <div>
        <van-row style="padding-top:1vh;">
          <img :src="editImgSrc" alt="">
        </van-row>
        <van-field :value="supplyPrice" label="供应单价" type="number"  right-icon="gold-coin-o"  @input="changeSupply"/>
        <van-field :value="salePrice" label="零售单价"  type="number"  right-icon="gold-coin-o"  @input="changeSale"/>
        <van-field :value="discountPrice" label="优惠单价"  type="number"  right-icon="gold-coin-o"  @input="changeDiscount"/>
        <van-field :value="goodsNumber" label="商品数量"  type="number" @input="changeNum"/>
      </div>
    </van-dialog >
    <!-- 货道弹出层 -->
    <van-popup v-model="isShowAllFloor" position="right" :style="{ width: '80%',height: '100%' }" @close="closeAllShow()">
      <h3 style="color:#129E7b;margin:4.5vh 0;">货道面板</h3>
      <van-row v-for="(item, floor) in 10" :key="floor">
        <van-col v-for="(item, index) in machineList[floor]" :key="index" style="position:relative;border:1px solid #ccc;margin:1vh 0.1vw;font-size:3vw;width:9%;background:#129E7b;height:6vh;">
          <div v-if="item.goods_number !== undefined">
              <van-tag type="danger" style="font-size:2vw;position:absolute;bottom:0;right:14%;" round>{{item.goods_number}}</van-tag>
              <img :src="item.goods_img_url_logo" alt="" style="height:4vh;margin-top:0.6vh;">
              <span type="success" style="font-size:2vw;position:absolute;top:-32%;right:0;width:100%;background:#129E7b;">{{item.goods_channel_no}}</span>
          </div>
          <div v-else>
              <span  style="font-size:2vw;line-height:7vh;">空</span>
              <span style="font-size:2vw;position:absolute;top:-32%;right:0;width:100%;background:#129E7b;">{{item.goods_channel_no}}</span>
          </div>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import { Dialog } from 'vant'
export default {
  data () {
    return {
      testvalue: '',
      editsupplyPrice: '',
      editsalePrice: '',
      editdiscountPrice: '',
      editgoodsNumber: '',
      isLoading: true,
      isShowAllFloor: false,
      selectImg: '',
      isShowAll: false,
      editImgSrc: '',
      isShowEdit: false,
      supplyPrice: '',
      salePrice: '',
      discountPrice: '',
      goodsNumber: '',
      value1: 0,
      active: 1,
      items: [{ text: '总览' }, { text: '第一层' }, { text: '第二层' }, { text: '第三层' }, { text: '第四层' }, { text: '第五层' }, { text: '第六层' }, { text: '第七层' }, { text: '第八层' }, { text: '第九层' }, { text: '第十层' }],
      goodsList: [],
      isShowAdd: false,
      orgid: '',
      serverUrl: '',
      channel: '',
      goodsId: '',
      accessId: '',
      accessSecret: '',
      allGoods: [],
      machineId: '',
      isShowGoods: false
    }
  },
  created () {
    this.getCurrentMachineInfo()
  },
  methods: {
    closeAllShow () {
      this.active = 1
    },
    changeNum (value) {
      this.editgoodsNumber = value
    },
    changeDiscount (value) {
      this.editdiscountPrice = value
    },
    changeSale (value) {
      this.editsalePrice = value
    },
    changeSupply (value) {
      this.editsupplyPrice = value
    },
    selectIndex (index) {
      // this.active = index
      if (index === 0) {
        this.isShowAllFloor = true
      }
    },
    deleteGoods (chanel) {
      this.channel = chanel
      Dialog.confirm({
        message: '是否确认下架此商品'
      }).then(() => {
        this.delete()
      }).catch(() => {
        this.$toast('已取消')
      })
    },
    async delete () {
      const params = {
        machine_id: this.machineId,
        channel_number: this.channel
      }
      const url = genRequestGetUrl(this.serverUrl, 'machines', this.accessId, 'unbind_goods', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error：' + res.ret_msg)
      this.$toast('下架商品成功')
      this.getCurrentMachineInfo()
    },
    selectChange (picker, value) {
      this.goodsId = value.id
      this.getGoodsById(value.id)
    },
    showAllBox () {
      Dialog.confirm({
        message: '退出补货前是否打开业务状态',
        confirmButtonText: '是',
        cancelButtonText: '否'
      }).then(() => {
        this.openMachineState()
      }).catch(() => {
        Dialog.confirm({
          message: '业务状态关闭时将无法进行售卖，是否确认直接退出？'
        }).then(() => {
          this.openMachineState()
        }).catch(() => {
          Dialog.confirm({
            message: '退出补货前是否打开业务状态',
            confirmButtonText: '是',
            cancelButtonText: '否'
          }).then(() => {
            this.openMachineState()
          }).catch(() => {
            this.$toast('已取消')
          })
        })
      })
    },
    async getCurrentMachineInfo () {
      const sn = window.localStorage.getItem('machineSn')
      this.serverUrl = window.localStorage.getItem('apiUrl')
      this.accessId = window.localStorage.getItem('accesId')
      this.accessSecret = window.localStorage.getItem('accessSecret')
      const url = genRequestGetUrl(this.serverUrl, 'machines', this.accessId, 'list_goods', { machine_sn: sn }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      this.goodsList = res.ret_data.goods_list
      this.orgid = res.ret_data.orgs_info.store.id
      this.machineId = res.ret_data.device_info.id
      this.isLoading = false
    },
    cancelAdd () {
      this.supplyPrice = ''
      this.goodsNumber = ''
      this.salePrice = ''
      this.discountPrice = ''
      this.isShowAdd = false
    },
    cancelEdit () {
      this.editsupplyPrice = ''
      this.editgoodsNumber = ''
      this.editsalePrice = ''
      this.editdiscountPrice = ''
      this.isShowEdit = false
    },
    addGoods (channel) {
      this.channel = channel
      if (this.isShowGoods) {
        this.isShowAdd = true
      } else {
        this.getAllGoods()
      }
    },
    editGoods (editImgSrc, channel, supplyPrice, goodsNumber, salePrice, discountPrice, goodsId) {
      this.channel = channel
      this.goodsId = goodsId
      this.editImgSrc = editImgSrc
      this.supplyPrice = supplyPrice
      this.goodsNumber = goodsNumber
      this.salePrice = salePrice
      this.discountPrice = discountPrice
      this.isShowEdit = true
    },
    async submitEdit () {
      if (this.editsalePrice === '') {
        this.editsalePrice = this.salePrice
      }
      if (this.editgoodsNumber === '') {
        this.editgoodsNumber = this.goodsNumber
      }
      if (this.editsupplyPrice === '') {
        this.editsupplyPrice = this.supplyPrice
      }
      if (this.editdiscountPrice === '') {
        this.editdiscountPrice = this.discountPrice
      }
      const params = {
        machine_id: this.machineId,
        channel_number: this.channel,
        goods_id: this.goodsId,
        goods_number: this.editgoodsNumber,
        confirm_supply_unit_price: this.editsupplyPrice,
        confirm_retail_unit_price: this.editsalePrice,
        confirm_discount_unit_price: this.editdiscountPrice
      }
      const url = genRequestGetUrl(this.serverUrl, 'machines', this.accessId, 'update_goods_supply', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error：' + res.ret_msg)
      this.$toast('更新商品成功')
      this.getCurrentMachineInfo()
      this.editsupplyPrice = ''
      this.editgoodsNumber = ''
      this.editsalePrice = ''
      this.editdiscountPrice = ''
      this.isShowEdit = false
    },
    async submitAdd () {
      if (this.editsalePrice === '') {
        this.editsalePrice = this.salePrice
      }
      if (this.editgoodsNumber === '') {
        this.editgoodsNumber = this.goodsNumber
      }
      if (this.editsupplyPrice === '') {
        this.editsupplyPrice = this.supplyPrice
      }
      if (this.editdiscountPrice === '') {
        this.editdiscountPrice = this.discountPrice
      }
      const params = {
        machine_id: this.machineId,
        channel_number: this.channel,
        goods_id: this.goodsId,
        goods_number: this.editgoodsNumber,
        confirm_supply_unit_price: this.editsupplyPrice,
        confirm_retail_unit_price: this.editsalePrice,
        confirm_discount_unit_price: this.editdiscountPrice,
        confirm_share_json: '{}'
      }
      const url = genRequestGetUrl(this.serverUrl, 'machines', this.accessId, 'bind_goods', params, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error：' + res.ret_msg)
      this.$toast('上架商品成功')
      this.getCurrentMachineInfo()
      this.supplyPrice = ''
      this.goodsNumber = ''
      this.salePrice = ''
      this.discountPrice = ''
      this.isShowAdd = false
    },
    // get all goods
    async getAllGoods () {
      const url = genRequestGetUrl(this.serverUrl, 'goods', this.accessId, 'list_items', { org_id: this.orgid }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      this.allGoods = res.ret_data
      this.isShowAdd = true
      this.isShowGoods = true
    },
    // 根据id查询商品
    async getGoodsById (id) {
      const url = genRequestGetUrl(this.serverUrl, 'goods', this.accessId, 'query_by_id', { id: id }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error：' + res.ret_msg)
      this.supplyPrice = res.ret_data[0].default_supply_unit_price
      this.discountPrice = res.ret_data[0].default_discount_unit_price
      this.salePrice = res.ret_data[0].default_retail_unit_price
      this.selectImg = res.ret_data[0].img_url_logo
    },
    // 开启机器状态
    async openMachineState () {
      const url = genRequestGetUrl(this.serverUrl, 'machines', this.accessId, 'biz_status_enable', { machine_id: this.machineId }, this.accessSecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.logOut()
      // this.$router.push('/change')
    },
    // 删除管理员cookie
    async logOut () {
      const url = this.serverUrl + '/logout'
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.closeWindow()
    },
    closeWindow () {
      setTimeout(function () {
        document.addEventListener('WeixinJSBridgeReady', function () {
          WeixinJSBridge.call('closeWindow') // eslint-disable-line
        }, false)
        WeixinJSBridge.call('closeWindow') // eslint-disable-line
      }, 100)
    }
  },
  computed: {
    machineList () {
      let newData = []
      for (let i = 0; i < 100; i++) {
        let obj = {}
        obj['goods_channel_no'] = i
        newData.push(obj)
      }
      newData = [...newData, ...this.goodsList]
      var newArr = []
      newData.forEach(function (item, index) {
        var flag = true
        if (newArr.length > 0) {
          for (var i = 0; i < newArr.length; i++) {
            if (newArr[i].goods_channel_no === item.goods_channel_no) {
              newArr[i].goods_number = item.goods_number
              newArr[i].goods_cname = item.goods_cname
              newArr[i].confirm_discount_unit_price = item.confirm_discount_unit_price
              newArr[i].confirm_retail_unit_price = item.confirm_retail_unit_price
              newArr[i].confirm_supply_unit_price = item.confirm_supply_unit_price
              newArr[i].goods_id = item.goods_id
              newArr[i].goods_img_url_logo = item.goods_img_url_logo
              break
            }
          }
        }
        if (flag) {
          newArr.push(item)
        }
      })
      let floorArr = []
      for (let index = 0; index < newArr.length; index += 10) {
        let temp = []
        temp.push(newArr[index], newArr[index + 1], newArr[index + 2], newArr[index + 3], newArr[index + 4], newArr[index + 5], newArr[index + 6], newArr[index + 7], newArr[index + 8], newArr[index + 9])
        floorArr.push(temp)
      }
      return floorArr
    },
    columns () {
      let newData = []
      this.allGoods.forEach(item => {
        const obj = {
          text: item.cname,
          id: item.id
        }
        newData.push(obj)
      })
      return newData
    }
  }
}
</script>
<style>
  .van-sidebar-item--select{
    background: #129E7b;
    color: #fff;
    border-color: #129E7b;
  }
  .van-sidebar-item{
    line-height: 4vh;
  }
  .van-tree-select__nav{
    flex:0.5;
  }
</style>
<style lang="less" scoped>
.cur_mach{
    height: 100vh;
    overflow: hidden;
    .loading_sty{
      position: fixed;
      z-index: 9999999999;
      top:50vh;
      left:50vw;
      transform: translate(-50%, -50%);
      padding: 20px;
      background:#4a4a4a;
      /deep/ .van-loading__text{
        color:#fff;
      }
    }
    .goods_title{
      background: #fff;
      text-align: left;
      padding-bottom:2vh;
      b{
        font-size:4vw;
        // text-align: left;
        margin-left:5%;
        font-style:normal;
        font-weight: 500;
        color: #129E7b;
      }
    }
    .goods_floor {
      .van-row {
        min-height: 7.2vh;
        // .has_goods{
        //   .van-row{
        //     margin:0.2vh;
        //     .goods_tag{
        //       text-align:right;padding-top:1vw;
        //       .van-tag{color:#fff;}
        //     }
        //     .goods_pic{
        //       text-align:left;;padding:1vw;
        //       img{height:7vh;}
        //     }
        //     .goods_info{
        //       text-align:left;
        //     }
        //   }
        // }
        // .no_goods{
        //   .van-row{
        //     margin:0.2vh;
        //     width:64.6vw;
        //     padding:1vw;
        //     padding-right:0;
        //   }
        // }
        span{
          color: #333;
          display: block;
          font-size: 2.8vw;
        }
      }
    }
    .add_goods{
      font-size: 6vw;
      border: 1px solid #aaa;
      text-align: center;
      min-height: 6vh;
      color: #aaa;
      line-height: 6vh;
    }
}
</style>

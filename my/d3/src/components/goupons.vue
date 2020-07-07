<template>
  <div class="bg_box">
      <div class="inp_box">
        <h2 style="margin:0; width:100%;text-align:center;margin-bottom:2vh;color:#e6a23c;letter-spacing:.1rem;box-sizing:border-box;padding-left:8vw;">巧爱福欢迎您</h2>
        <el-form ref="ruleForm" :model="discountForm" :rules="rules" >
          <el-form-item label="手机号" prop="phone" label-width="90px">
            <el-input v-model="discountForm.phone" clearable type="tel" placeholder="请输入投保人手机号"></el-input>
          </el-form-item>
          <el-form-item label="保单号" prop="guarantee" label-width="90px">
            <el-input v-model="discountForm.guarantee" clearable placeholder="请输入巧爱福产品PC开头保单号"></el-input>
          </el-form-item>
          <el-form-item style="text-align:center;">
            <el-button type="primary" @click="submitForm('ruleForm')">点击获取</el-button>
          </el-form-item>
        </el-form>
        <div class="dis_info">
          <p style="margin-bottom: 0.5vh;">优惠细则</p>
          <span>【优惠详情】50元巧虎周边商品优惠券1张</span><br/>
          <span>【有效期限】成功申领后3个月内有效</span><br/>
          <span style="word-break: break-all;">【使用方式】①登录巧虎周边商城官网https://buy.qiaohumall.com/即可下单使用；</span><br/>
          <span> &nbsp;②关注微信订阅号“巧虎乐智小天地”，点击菜单栏“关于巧虎”，点击弹出菜单栏的“巧虎周边”即可下单使用</span><br/>
          <span>【其他】若无法成功领取，请联系您的客户经理</span>
        </div>
        </div>
      <div class="cor_right">
         <img src="../assets/cron.png" alt="" style="height:2vh">
      </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      discountForm: {
        phone: '',
        guarantee: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { min: 11, max: 11, message: '长度为11位数字', trigger: 'blur' }
        ],
        guarantee: [
          { required: true, message: '请输入保单号', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
  },
  mounted () {
  },
  methods: {
     submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            var params = {
              phone: this.discountForm.phone,
              policy_number: this.discountForm.guarantee
            }
            const result= await this.$http.post('https://robot.fubot.cn/policy/get_coupon_code',params)
            const res =result.data;
            if(res.ret_code !==0) {
              this.$message.error('请填写正确的手机号和保单号')
            } else {
              if (JSON.stringify(res.ret_data) === '{}') {
                this.$message.warning('当前优惠券尚未匹配')
              } else {
                this.$router.push({
                path: '/discount',
                query: {
                  discountNum: res.ret_data.rows[0].coupon_code,
                  effectiveTime: res.ret_data.rows[0].effective_time,
                  expirationTime: res.ret_data.rows[0].expiration_time
                }
              })
              }
            }
          } 
        })
      }
  }
}
</script>
<style lang="less" scoped>
.bg_box {
  width: 100vw;
  height: 100vh;
  background: #f7ebc3 url('../assets/qiaohuf.png') no-repeat top;
  background-size: cover;
  position: relative;
  .cor_right{
    position: absolute;
    bottom: 0;
    width: 95vw;
    text-align: center;
    h3{
      margin:0;
    }
  }
  .inp_box{
    position: absolute;
    width: 94vw;
    top:31%;
    .dis_info{
      width: 99vw;
      box-sizing: border-box;
      padding: 0.5vh 1.6rem;
      p{
        font-size: .9rem;
        margin-bottom: 2vh;
        color:#A9A9A9;
      }
      span{
         font-size: .75rem;
        color:#A9A9A9;
      }
    }
  }
}
</style>
<template>
  <div class="check_box">
    <div class="check_content">
      <p>请留意 校验短信以 【默比优斯科技】 开头</p>
      <van-row class="sms_content">
          <van-col span="21" offset="1">
          <van-field
            v-model="loginSms"
            center
            clearable
            required
            label-width="20vw"
            label="短信验证码"
            placeholder="请输入短信验证码"
          >
            <van-button slot="button" size="mini" type="primary" :class="{disabled: !this.canClick}">{{content}}</van-button>
          </van-field>
          </van-col>
      </van-row>
      <van-row>
        <van-col :span="4" offset="1">
          <van-button type="primary" size="mini" @click="submitCheck()">提交验证</van-button>
        </van-col>
        <van-col :span="4" offset="1" :style="style">
          <van-button type="info" @click="back" size="mini">返回首页</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      content: '发送验证码',
      style: 'display:none;',
      totalTime: 60,
      canClick: true,
      loginSms: '',
      phone: ''
    }
  },
  created () {
    this.countdown()
    this.phone = this.$route.query.phone
  },
  methods: {
    countdown () {
      if (!this.canClick) return
      this.canClick = false
      this.content = this.totalTime + 's后将失效'
      let clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后将失效'
        if (this.totalTime < 1) {
          window.clearInterval(clock)
          this.canClick = true
          this.content = '验证码已失效'
          this.style = 'display:block;'
        }
      }, 1000)
    },
    back () {
      this.$router.push('/supplylogin')
    },
    async submitCheck () {
      var serverUrl = window.localStorage.getItem('apiUrl')
      const url = serverUrl + '/login_code?phone=' + this.phone + '&code=' + this.loginSms
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.$router.push('/currentMachine')
    }
  }
}
</script>
<style lang="less" scoped>
.check_box{
  height: 100vh;
  background: #129E7b;
  overflow: hidden;
  .check_content{
    p{
      color:#fff;
      font-size: 3vw;
    }
    .sms_content {
      .van-field{
        .disabled{
          background-color: #ddd!important;
          border-color: #ddd;
          color:#07c160;
          cursor: not-allowed;
        }
      }
    }
  }
}
</style>

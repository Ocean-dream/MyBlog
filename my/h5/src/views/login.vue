<template>
  <div class="login_box">
    <div class="login_content">
        <p>补货登录界面</p>
        <van-row>
           <van-col span="21" offset="1">
              <van-field v-model="logintel" type="tel" label="账号" placeholder="请输入手机号" required label-width="9vw"/>
           </van-col>
        </van-row>
         <van-row>
           <van-col span="21" offset="1">
              <van-field v-model="loginPwd" type="password" label="密码" placeholder="请输入密码" required label-width="9vw"/>
           </van-col>
        </van-row>
        <van-row style="margin-left:2%;">
          <van-button type="primary" size="large" @click="loginSupply" style="width:86%;">登录</van-button>
        </van-row>
    </div>
  </div>
</template>
<script>
const serverUrl = window.localStorage.getItem('apiUrl')
export default {
  data () {
    return {
      logintel: '',
      loginPwd: ''
    }
  },
  created () {
  },
  methods: {
    async loginSupply () {
      if (this.logintel === '') return this.$toast('账号不能为空')
      if (this.loginPwd === '') return this.$toast('密码不能为空')
      const url = serverUrl + '/login?phone=' + this.logintel + '&password=' + this.loginPwd
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$toast('Error, 有接口调用错误：' + res.ret_msg)
      this.$router.push({
        path: '/supplycheck',
        query: {
          phone: this.logintel
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.login_box{
  height: 100vh;
  background: #129E7b;
  overflow: hidden;
  .login_content{
    p{
      color:#fff;
    }
    .van-row{
      margin: 3vh;
    }
  }
}
</style>

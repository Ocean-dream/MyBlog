<template>
  <div class ="login_container">
    <div class="login_box" v-show="!isRegister">
      <h3 class="title">默比优斯科技</h3>
      <!-- 头像 -->
      <div class="avata_box">
          <img src="../assets/logo.png" alt="">
      </div>
      <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormhref" label-position="right">
          <!-- 用户名 -->
          <el-form-item  prop="username" label="手机号">
              <el-input  prefix-icon="el-icon-phone" class="login_icon" v-model="loginForm.username"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop ="password" label="密码 ">
              <el-input  prefix-icon="el-icon-lock" class="login_icon e_input" v-model="loginForm.password" type="password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
              <el-button type="primary" @click="login()" @keyup.enter="handleLogin">登录</el-button>
              <el-button type="primary" @click="register()">注册</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="login_box" v-show="isRegister">
      <el-alert
      title="注册功能尚未开放，请联系管理人员"
      type="warning"
      :closable="false"
      effect="dark">
    </el-alert>
     <el-button type="primary" size="small" round @click="backLogin()" style="margin-top:30px;">返回登录页面</el-button>
    </div>
    <div class="coryRight">
     <div>默比优斯科技 Copyright  2019 All Rights Reserved </div>
     <div style="margin-left:67px;">备案号：粤ICP备18112417号-1</div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
const apiUrl = window.g.api_url
export default {
  data: function () {
    return {
      isRegister: false,
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          // 验证手机号
          { required: true, message: '请输入手机号', trigeer: 'blur' },
          { min: 2, max: 15, message: '长度在11个字符 ', trigeer: 'blur' }
        ],
        password: [
          // 验证密码
          { required: true, message: '请输入密码', trigeer: 'blur' },
          { min: 2, max: 15, message: '长度在2到6个字符 ', trigeer: 'blur' }
        ]
      }
    }
  },
  created () {
    var _this = this
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        _this.handleLogin()
        return false
      }
    }
  },
  methods: {
    register () {
      this.isRegister = true
    },
    backLogin () {
      this.isRegister = false
    },
    resetLoginForm () {
      this.$refs.loginFormhref.resetFields()
    },
    login () {
      this.$refs.loginFormhref.validate(async valid => {
        if (!valid) return
        let allCookies = document.cookie
        if (allCookies !== '') {
          this.$router.push({
            path: '/home'
          })
        } else {
          const url = apiUrl + '/login?phone=' + this.loginForm.username + '&password=' + this.loginForm.password
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          if (res.ret_code === 0) {
            this.$router.push({
              path: '/check',
              query: {
                phone: this.loginForm.username
              }
            })
          }
        }
      })
    },
    handleLogin () {
      this.login()
    }
  }
}
</script>
<style  scoped>
.login_container {
  min-height: 980px;
  background-color: #3ac290;
}
.login_container .title{
  position: absolute;
  top: -171px;
  left: 143px;
  font-size: 33px;
  color: #fff;
}
 .login_container .login_box {
  width: 450px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  background: #3ac2771f;
  transform: translate(-50%, -50%);
 }
.login_container .login_box .avata_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  box-shadow: 0 0 10px #ddd;
  padding: 10px;
  position: absolute;
  left: 54%;
  background: #fff;
  transform: translate(-50%, -50%);
}
 .login_container .login_box .avata_box  img {
  width: 100%;
  height: 100%;
  background: #eee;
  border-radius: 50%;
}
.login_form{
  box-sizing: border-box;
  margin-top: 100px;
  padding: 10px;
}
.login_form >>> .el-form-item__label{
  color:#fff;
}
.login_form >>> .el-form-item__content{
  display: flex;
}
.login_form     .login_icon{
  font-size: 18px;
}
.e_input{
  margin-left: 11px;
}
.btns{
  display: flex;
  margin-left: 60px;
}
.btns >>> .el-button{
  width: 180px;
}
.coryRight{
  position: absolute;
  top: 80%;
  left: 52%;
  width: 400px;
  height: 60px;
  transform: translateX(-50%);
}
.coryRight div{
  font-size: 14px;
  color:#fff;
  margin: 20px 0;
}
</style>

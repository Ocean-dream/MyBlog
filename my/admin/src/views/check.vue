<template>
  <div class="check">
    <div class="check_box">
      <h4 style="color:#fff">请留意 校验短信以 【默比优斯科技】 开头</h4>
       <div class="check_content">
          <input type="text" v-model="inputNum">
          <el-button type="primary"  :class="{disabled: !this.canClick}">{{content}}</el-button>
       </div>
       <div style="display:flex">
          <el-button type="primary" @click="submit" style="margin-bottom:10px" @keyup.enter="handleLogin">提交验证</el-button>
          <el-button type="primary" @click="back" :style="style">返回首页</el-button>
       </div>
    </div>
  </div>
</template>
<script>
// import { setCookie } from '@/untils/untils.js'
const apiUrl = window.g.api_url
export default {
  data () {
    return {
      style: 'display:none',
      content: '发送验证码',
      totalTime: 60,
      canClick: true,
      inputNum: '',
      phone: ''
    }
  },
  created () {
    this.countdown()
    this.phone = this.$route.query.phone
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
          this.style = 'display:block'
        }
      }, 1000)
    },
    async submit () {
      // this.getCookie('_session_id_=sid_kl9eu83dt986mmbyk8li3l2pfnst; _session_id_.sig=BlG1Z6ak3WjVL-duylqmcQ8l0QM;')
      const url = apiUrl + '/login_code?phone=' + this.phone + '&code=' + this.inputNum
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.$router.push('/home')
    },
    // getCookie (str) {
    //   let cr = str.split(';')
    //   let crr = []
    //   cr.forEach(item => {
    //     let ncr = item.split('=')
    //     let obj = {
    //       name: ncr[0],
    //       value: ncr[1]
    //     }
    //     crr.push(obj)
    //   })
    //   crr.forEach(item => {
    //     setCookie(item.name, item.value, 7)
    //   })
    // },
    back () {
      this.$router.push('/login')
    },
    handleLogin () {
      this.submit()
    }
  }
}
</script>
<style scoped>
.check{
  min-height: 980px;
  background-color: #3ac290;
  position: relative;
}
.check_box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.check_content{
  display: flex;
  margin-bottom: 15px;
}
.check_box input{
  width: 400px;
  margin-right: 20px
}
.disabled{
 background-color: #ddd;
 border-color: #ddd;
 color:#57a3f3;
 cursor: not-allowed;
}
.check .el-button{
  height:38px;
}
</style>

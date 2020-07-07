<template>
    <div class ="login_container">
        <div class="login_box">
            <!-- 头像 -->
            <div class="avata_box">
                <img src="./../assets/login-logo.png" alt="">
            </div>
            <h2>机器人管理云平台</h2>
            <!-- 登录表单  表单的:model属性获取的表单的内荣为一个对象，rules是用来验证表单格式的属性 -->
            <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginFormhref" label-width="120px">
                <!-- 用户名 -->
                <el-form-item  prop="account">
                    <el-input  prefix-icon="el-icon-user-solid" v-model="loginForm.account" placeholder="用户名"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop ="password" style="margin-top:31px;">
                    <el-input  prefix-icon="el-icon-unlock" v-model="loginForm.password" type="password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-checkbox v-model="checked" style="font-size: 12px;color: #999999;letter-spacing: 1.64px;">记住密码</el-checkbox>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data:function () {
            return{
                checked: false,
                loginForm:{
                    account:'',
                    password:''
                },
                rules:{
                    account:[
                        // 验证用户名
                        {required:true,message:"请输入用户名",trigeer:'blur'},
                        {min:2,max:15,message:'长度在2到15个字符 ',trigeer:'blur'}
                    ],
                    password:[
                        // 验证密码
                        {required:true,message:"请输入密码",trigeer:'blur'},
                        {min:2,max:15,message:'长度在2到15个字符 ',trigeer:'blur'}
                    ]

                }
            
            }
        },
        methods:{
            resetLoginForm(){
                this.$refs.loginFormhref.resetFields()
                
            },
            login(){
                this.$refs.loginFormhref.validate( async valid =>{
                  if(!valid) return
                  const result= await this.$http.post('http://117.135.164.14:7221/login',this.loginForm)
                  window.localStorage.setItem('account', this.loginForm.account)
                  const res =result.data;
                  if(res.ret_code !==0) return this.$message.error('登录失败,账号或密码错误');
                    window.localStorage.setItem('author',  res.ret_data.authority)
                    window.localStorage.setItem('cname',  res.ret_data.cname)
                  this.$router.push({
                      path: '/home',
                      query: {
                          authority: res.ret_data.authority,
                          username: res.ret_data.cname,
                      }
                  })
                  this.$message.success('登录成功');  
                })
            }
        }
    }
</script>
<style lang="less">
.el-checkbox__label{
    font-size: 12px;
}
</style>
<style lang="less" scoped>
    .login_container {
        height: 100vh;
        background: url('../assets/login.png') no-repeat fixed top;
    }
    
    .login_box {
        width: 588px;
        height: 614px;
        position: absolute;
        top: 16%;
        left: 55.6%;
        background: #FFFFFF;
        box-shadow: 0 2px 29px 0 rgba(121,177,255,0.35);
        border-radius: 4px;
        h2{
            font-size: 34px;
            color: #34ACFF;
            font-weight: normal;
            letter-spacing: 4.04px;
            margin-left:25.4%;
            margin-top: 11px;
        }
        .avata_box {
            width: 55px;
            height: 49px;
            margin-top:15.5%;
            margin-left:45.5%;
            img {
                width: 100%;
            }
        }
    }
    .login_form{
        box-sizing: border-box;
        margin-top:77px;
        /deep/  .el-form-item{
            .el-form-item__content{
                .el-input{
                    width: 365px;
                    /deep/.el-input__inner{
                        height: 45px;
                        line-height: 45px;
                    }
                }
            }
        }
        .btns{
            text-align: left;
            /deep/ .el-form-item__content{
                .el-button{
                    margin-top: 41px;
                    background-image: linear-gradient(119deg, #34ACFF 0%, #3B83FF 100%);
                    border-radius: 22.5px;
                    width: 365px;
                }
            }
        }
    }
</style>
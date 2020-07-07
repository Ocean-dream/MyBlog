<template>
   <el-container style="height:100%;">
    <el-aside width="200px">
        <div class="home-title">
            <img src="../assets/home-logo.png" alt="">
            <div class="palt_title">
                <span>机器人管理平台</span>
            </div>
        </div>
        <el-menu
            class="el-menu-vertical-demo menu_list"
            background-color="transparent"
            text-color="#fff"
            active-text-color="#409eff" 
            unique-opened :collapse="isCollapse" :default-active="activePath" :collapse-transition="false" router >
            <el-menu-item index="/timeviewerall">
                <i>
                    <img src="../assets/time.png" alt="">
                </i>
                <span>实时监控</span>
            </el-menu-item>
            <el-menu-item index="/device" v-if="isShowAll">
                <i>
                    <img src="../assets/device.png" alt="">
                </i>
                <span>设备管理</span>
            </el-menu-item>
            <el-menu-item index="/map">
                <i>
                    <img src="../assets/map.png" alt="">
                </i>
                <span>地图管理</span>
            </el-menu-item>
            <el-menu-item index="/transportation">
                <i>
                    <img src="../assets/car.png" alt="">
                </i>
                <span>交通管理</span>
            </el-menu-item>
            <el-menu-item index="/user" v-if="isShowAll">
                <i>
                    <img src="../assets/user.png" alt="">
                </i>
                <span>用户管理</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
    <el-container>
        <el-header style="display:flex;justify-content:flex-end;">
            <div class="loginout">
                <span>当前用户：{{username}}</span>
                <span @click="exit" class="leave">退出</span>
            </div>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
    </el-container>
</template>
<script>
export default {
    data(){
        return{
            username: '',
            isShowAll: false,
            menulist:[],
            isCollapse:false,
            activePath:''
        }
    },
    created(){
        this.username = window.localStorage.getItem('cname')
        if (window.localStorage.getItem('author') == 3) {
            this.isShowAll = true
        }
    },
    methods:{
        exit(){
            window.sessionStorage.clear();
            this.$router.push('/login')
        }
    }
}
</script>
<style lang="less" scoped>
    .loginout{
        font-size: 14px;
        color: #34ACFF;
        letter-spacing: 1.66px;
        padding: 20px;
        .leave{
            box-sizing: border-box;
            margin-left:30px;
            border: 1px solid #34ACFF;
            padding: 4px;
            border-radius: 10px;
        }
    }
    .home-con{
        height: 100%;
        display: flex;
    }
    .el-header{
        background: #fff;
        padding-left:0;
        position: relative;
        .el-button{
        position: absolute;
        right: 80px;
        top: 15px;
        border: 1px solid #34ACFF;
        border-radius: 17px;
    }
    }
    .home-title{
        width: 200px;
        margin-top:24px;
        img{
            margin-left: 82px;
            width:20%;
        }
        .palt_title{
            margin-left:30px;
            margin-top:7px;
            span{
                font-size: 16px;
                color: #FFFFFF;
                font-weight: 700;
                letter-spacing: 2.5px;
            }
        }
    }
    .menu_list{
        margin-top:10px;
        line-height: 60px;
        /deep/ .is-active{
            background: #0780CF!important;
        }
        /deep/.el-menu-item{
            color: #FFFFFF;
            letter-spacing: 2.5px;
            line-height: 60px;
            i{
                img{
                    width: 14%;
                    margin-left: 20px;
                }
            }
            span{
                font-size: 16px;
                margin-left:10px;
            }
        }
    }
    .el-aside{
        background-image: linear-gradient(119deg, #34ACFF 0%, #3B83FF 100%);
        box-shadow: 2px 2px 9px 0;
        height:100%;
    }
    .el-menu{
        border-right: 0;
    }
    .el-main{
        background: #eee;
        padding: 20px;
    }
</style>
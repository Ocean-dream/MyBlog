<template>
    <div>
       <el-card>
           <search-model :isShowSearch="false" title="监控控制"></search-model>
        <div class="time_box">
            <div class="left_content">
                <el-alert :closable=false>
                    <div class="alert_img">
                        <img src="../../assets/device.png" alt="">
                    </div>
                    <h3>设备headld：{{head}}</h3>
                </el-alert>
                <div>
                    <div style="display:flex;margin:23px 0 24px 0;">
                        <div style="width:4px;background:#34ACFF;"></div>
                        <h3 style="margin:0 0 0 8px;">音视频界面</h3>
                    </div>
                    <div>
                        <video
                        id="my-player1"
                        class="video-js vjs-big-play-centered"
                        preload="auto"
                        data-setup='{}'>
                        </video>
                    </div>
                </div>
            </div>
            <div class="right_content">
                <div class="con_title">
                    <div style="width:4px;background:#34ACFF;"></div>
                    <h3 style="font-weight:400; margin-left:10px;">自主模块</h3>
                    <el-switch
                    v-model="isOpen"
                    @change="autoChange()"
                    >
                    </el-switch>
                </div>
                <div class="empty" v-show="isOpen">
                    <div class="open_info el-icon-warning">当前为自主模式, 如需手动操作请关注自主模块开关</div>
                </div>
                <div class="close_info"  v-show="!isOpen">
                    <div class="move_control" v-show="!isOpen">
                        <h3 class="common_h3">移动控制：</h3>
                        <div class="move_table">
                            <div class="move_font">
                                <el-button id="font">前</el-button>
                            </div>
                            <div class="move_middle">
                                <el-button id="left">左旋</el-button>
                                <el-button id="right">右旋</el-button>
                            </div>
                            <div class="move_font">
                                <el-button id="back">后</el-button>
                            </div>
                        </div>
                    </div>
                    <div class="task_control" v-show="!isOpen">
                        <div class="task_title">
                            <h3 class="common_h3">任务控制：</h3>
                            <div>
                                <span style="font-size:14px;margin-right:18px;margin-left:20%;">选择导航点位</span>
                                <el-select v-model="positionValue" placeholder="1">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.num"
                                    :label="item.name"
                                    :value="item.num">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="tas_table">
                            <div class="tas_start">
                                <el-button @click="startTask()">开始</el-button>
                                <el-button @click="pauseTask()">暂停</el-button>
                            </div>
                            <div class="tas_start">
                                <el-button @click="goTask()">继续</el-button>
                                <el-button @click="endTask()">停止</el-button>
                            </div>
                        </div>
                    </div>
                    <div v-show="!isOpen">
                        <h3 style="margin-bottom:15px;margin-left:9%;" class="common_h3">机器人语音说话内容：</h3>
                        <div class="send_msg">
                            <el-input v-model="enterVoice" clearable></el-input>
                            <el-button @click="sendMessage()" @keyup.enter="sendMessage()">发送</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       </el-card>
    </div>
</template>
<script>
import videojs from 'video.js';
import "videojs-flash"
import "video.js/dist/video-js.min.css"
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import SearchModel from './../common/searchModel'
const apiUrl = 'http://117.135.164.14:7221'
const accessKeySecret = 'yyyyyyyyy'
const accessKeyId = 'xxxxxxxx'
export default {
    components: {
        SearchModel
    },
    data(){
        return{
            intervalId: null,
            videoOptions: {
                height: '200px',
                preload: 'auto',   
                // autoplay: true, // 是否自动播放
                muted: false, // 是否静音
                fluid: true, // 宽高自适应
                sources: [{
                    src: 'rtmp://video.mobius.org.cn/live/' + this.head,
                    type: 'rtmp/flv'
                }]
            },
            isOpen: true,
            videoSrc: '',
            enterVoice: '',
            head: '',
            positionValue: 1,
            viewId: '',
            autoId: '',
            options: []
        }
    },
    created() {
        this.viewId = window.localStorage.getItem('robotId')
        window.localStorage.getItem('autoId') === '1' ? this.isOpen = true : this.isOpen = false
        this.videoSrc = window.localStorage.getItem('videoSrc')
        this.head =  window.localStorage.getItem('head')
        this.videoOptions.sources[0].src = window.localStorage.getItem('videoSrc')
        JSON.parse(window.localStorage.getItem('pointInfo')).forEach(ele => {
            if (ele !== null) {
                this.options.push(ele)
            }
        });
        var _this = this
        document.onkeydown = function (e) {
            var key = window.event.keyCode
            if (key === 13) {
                _this.sendMessage()
                return false
            }
        }
    },
    mounted () {
            let _this = this
            this.player1 = videojs('my-player1', this.videoOptions, function onPlayerReady () {
            videojs.log('播放器已经准备好了!')
            this.on('play', function() {
            //   console.log('开始/恢复播放')
            })
            this.on('pause', function() {
            //   console.log('暂停播放')
            })
            this.on('ended', function() {
            //   console.log('结束播放')
            })
          })
          this.player1.play()
        document.querySelector('#font').addEventListener('mousedown', function () {
            clearInterval(_this.intervalId)
           _this.intervalId = setInterval(
            _this.moveRobotFront, 500
      )
        })
        document.querySelector('#font').addEventListener('mouseup', function () {
            clearInterval(_this.intervalId)
        })
         document.querySelector('#back').addEventListener('mousedown', function () {
            clearInterval(_this.intervalId)
           _this.intervalId = setInterval(
            _this.moveRobotBack, 500
      )
        })
        document.querySelector('#back').addEventListener('mouseup', function () {
            clearInterval(_this.intervalId)
        })
         document.querySelector('#left').addEventListener('mousedown', function () {
            clearInterval(_this.intervalId)
           _this.intervalId = setInterval(
            _this.moveRobotLeft, 500
      )
        })
        document.querySelector('#left').addEventListener('mouseup', function () {
            clearInterval(_this.intervalId)
        })
         document.querySelector('#right').addEventListener('mousedown', function () {
            clearInterval(_this.intervalId)
           _this.intervalId = setInterval(
            _this.moveRobotRight, 500
      )
        })
        document.querySelector('#right').addEventListener('mouseup', function () {
            clearInterval(_this.intervalId)
        })
    },
    methods: {
        async sendMessage () {
            const url = genRequestGetUrl(apiUrl, 'tts', accessKeyId, 'robot_say', {robot_id: this.viewId, message: this.enterVoice}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('发送失败，请重新发送')
            this.$message.success('内容已发送')
        },
        // 自主模式切换
        async autoChange () {
            if (this.isOpen) {
                this.autoId = 1
            } else {
                this.autoId = 2
            }
            let id = parseInt(this.viewId)
            const url = genRequestGetUrl(apiUrl, 'current', accessKeyId, 'switch_auto_mode', {id: id, auto_mode: this.autoId}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) {
              this.$message.error('切换状态失败')
              this.autoId = window.localStorage.getItem('autoId')
              return
            }
            this.$message.success('切换状态成功')
        },
        // 开始任务
        async startTask () {
            const url = genRequestGetUrl(apiUrl, 'task', accessKeyId, 'start_exec', {robot_id: this.viewId, point_id: this.positionValue}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('开始任务失败')
        },
        // 暂停任务
        async pauseTask () {
            const url = genRequestGetUrl(apiUrl, 'task', accessKeyId, 'pause_exec', {robot_id: this.viewId, point_id: this.positionValue}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('暂停任务失败')
        },
        // 继续任务
        async goTask () {
            const url = genRequestGetUrl(apiUrl, 'task', accessKeyId, 'goon_exec', {robot_id: this.viewId, point_id: this.positionValue}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('继续任务失败')
        },
        // 结束任务
        async endTask () {
            const url = genRequestGetUrl(apiUrl, 'task', accessKeyId, 'stop_exec', {robot_id: this.viewId, point_id: this.positionValue}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('停止任务失败')
        },
        // 机器人移动
        async moveRobotFront () {
            const url = genRequestGetUrl(apiUrl, 'move', accessKeyId, 'start_exec', {robot_id: this.viewId, direction: 'front'}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('移动任务失败')
        },
        async moveRobotBack () {
            const url = genRequestGetUrl(apiUrl, 'move', accessKeyId, 'start_exec', {robot_id: this.viewId, direction: 'back'}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('移动任务失败')
        },
        async moveRobotLeft () {
            const url = genRequestGetUrl(apiUrl, 'move', accessKeyId, 'start_exec', {robot_id: this.viewId, direction: 'left'}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('移动任务失败')
        },
        async moveRobotRight () {
            const url = genRequestGetUrl(apiUrl, 'move', accessKeyId, 'start_exec', {robot_id: this.viewId, direction: 'right'}, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code === 4006) return this.$router.push('/login')
            if(res.ret_code !==0) return this.$message.error('移动任务失败')
        }
    },
    beforeDestroy () {
        this.player1.dispose()
    }
}
</script>
<style lang="less">
// .el-input__inner{
//     background: #fff;
//     border-radius: 0;
// }
.my-player1-dimensions.vjs-fluid{
    // padding-top:80%;
}
</style>
<style lang="less" scoped>
.common_h3{
    font-weight: normal;
    font-size: 18px;
    color: #333333;
    letter-spacing: 2.14px;
}
.send_msg{
    display: flex;
    // justify-content: space-around;
    margin-left:9%;
    /deep/.el-input{
        width:60%;
        /deep/.el-input__inner{
            // width:70%;
            background: #F2F7FF;
            border-radius: 0!important;
        }
    }
    .el-button{
        background: #34ACFF;
        color: #fff;
        border-radius: 21px;
        width: 91px;
        margin-left:14%;
    }
}
.time_box{
    display: flex;
    justify-content: space-between;
    .left_content{
        flex:0.5;
        /deep/.el-alert{
            background: #F1F9FF;
            .el-alert__description{
                display: flex;
                justify-content: space-around;
                .alert_img{
                    background: #34ACFF;
                    width: 22px;
                    height: 22px;
                    img{
                        width:100%;
                    }
                }
                h3{
                    margin:2px 0  0 10px;
                    color:#34ACFF;
                    font-size: 16px;
                    letter-spacing: 1.9px;
                }
            }
        }
    }
    .right_content{
        flex:0.5;
        .con_title{
            margin-left: 25%;
            display: flex;
            margin-bottom: 22px;
            h3{
                margin:0 0 0 8px;
               font-size: 20px;
                color: #333333;
                letter-spacing: 2.38px;
            }
            /deep/.el-switch{
                margin-left:16px;
                margin-top: 3px;
                // font-size: 30px;
            }
        }
        .empty{
            height: 65vh;
            margin-left: 25%;
            text-align: center;
            margin-right: 8%;
            border: 2px solid #ccc;
            .open_info{
                line-height: 65vh;
                font-family: MicrosoftYaHei;
                font-size: 14px;
                color: #34ACFF;
                letter-spacing: 1.66px;
            }
        }
       .close_info{
            margin-left: 25%;
            background: #FFFFFF;
            box-sizing: border-box;
            padding: 23px 0;
            box-shadow: 0 2px 9px 0 #D7DADD;
            .move_control{
                margin-left: 9%;
                .move_table{
                    height: 15vh;
                    width: 90%;
                    background: #F9FBFF;
                    padding-top: 20px;
                    padding-bottom:10px;
                    .move_font{
                        text-align: center;
                    }
                    .move_middle{
                        margin-left:20%;
                        .el-button:nth-child(2){
                            margin-left:34%;
                        }
                    }
                    .el-button{
                        background-image: linear-gradient(119deg, #34ACFF 0%, #3B83FF 100%);
                        border-radius: 4px;
                        font-size: 20px;
                        width: 76px;
                        color:#fff;
                    }
                }
            }
            .task_control{
                margin-left:9%;
                .task_title{
                    display: flex;
                    justify-content: space-between;
                    /deep/ .el-select{
                        width: 25%;
                        margin-top: 15px;
                        .el-input{
                            // width:30%;
                            .el-input__inner{
                                height: 25px;
                                line-height: 25px;
                                color:#35A6FF;
                                border-color: #35A6FF;
                            }
                            .el-input__icon{
                                line-height: 16px;
                                color:#35A6FF;
                            }
                        }
                    }
                }
                .tas_table{
                    height: 20vh;
                    width: 90%;
                    background: #F9FBFF;
                    padding-top: 20px;
                    .el-button{
                        background-image: linear-gradient(119deg, #34ACFF 0%, #3B83FF 100%);
                        border-radius: 4px;
                        width: 76px;
                        color: #fff;
                        font-size: 20px;
                    }
                    .tas_start{
                        margin-left:20%;
                        margin-top:20px;
                        .el-button:nth-child(2){
                            margin-left:35%;
                        }
                    }
                }
            }
       }
    }
}
</style>

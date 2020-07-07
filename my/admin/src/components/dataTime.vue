<template>
  <div>
    <div class="data_box">
      <div class="data_title">
        <span>起止时间: {{starttime}} ~ {{endtime}}</span>
      </div>
      <div style="display:flex;">
      <div>
        <el-dropdown>
          <el-button type="primary" size="mini">
            按天<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="current()" class="drop_menu">今天</el-dropdown-item>
            <el-dropdown-item @click.native="yesterday()" class="drop_menu">昨天</el-dropdown-item>
            <el-dropdown-item @click.native="recentCurrent()" class="drop_menu">过去一天</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-dropdown>
          <el-button type="primary" size="mini">
            按周<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="todayWeek()" class="drop_menu">本周</el-dropdown-item>
            <el-dropdown-item @click.native="lastWeek()" class="drop_menu">上周</el-dropdown-item>
            <el-dropdown-item @click.native="recentWeek()" class="drop_menu">过去一周</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-dropdown>
          <el-button type="primary" size="mini">
            按月<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="currentMonth()" class="drop_menu">本月</el-dropdown-item>
            <el-dropdown-item @click.native="lastMonth()" class="drop_menu">上月</el-dropdown-item>
            <el-dropdown-item @click.native="recentMonth()" class="drop_menu">过去一月</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-dropdown>
          <el-button type="primary" size="mini">
            按季度<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item  @click.native="currentQuarter()" class="drop_menu">本季度</el-dropdown-item>
            <el-dropdown-item  @click.native="lastQuarter()" class="drop_menu">上季度</el-dropdown-item>
            <el-dropdown-item class="drop_menu" @click.native="recentQuarter()">近一季度</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
         <el-dropdown>
          <el-button type="primary" size="mini">
            按年<i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="drop_menu" @click.native="currentYear()">今年</el-dropdown-item>
            <el-dropdown-item class="drop_menu" @click.native="lastYear()">上一年</el-dropdown-item>
            <el-dropdown-item class="drop_menu" @click.native="recentYear()">过去一年</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-popover
        placement="bottom"
        width="400"
        trigger="click">
          <el-date-picker
            v-model="value1"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="sureTime()"
            end-placeholder="结束日期">
          </el-date-picker>
        <el-button type="primary" size="mini" slot="reference" style="padding-top:8px;">自定义</el-button>
      </el-popover>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data () {
    return {
      value1: '',
      starttime: '',
      endtime: ''
    }
  },
  created () {
    this.starttime = moment(new Date().getTime()).format('YYYY-MM-DD') + ' ' + '00:00:00'
    this.endtime = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    // 自定义
    sureTime () {
      this.starttime = this.value1[0]
      this.endtime = this.value1[1]
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 今天
    current () {
      this.starttime = moment(new Date().getTime()).format('YYYY-MM-DD') + ' ' + '00:00:00'
      this.endtime = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 昨天
    yesterday () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD') + ' ' + '00:00:00'
      this.endtime = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD') + ' ' + '23:59:59'
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 近一天
    recentCurrent () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().subtract('days', 0).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 本周
    todayWeek () {
      this.starttime = moment().startOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().endOf('isoweek').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 上周
    lastWeek () {
      this.starttime = moment().startOf('isoweek').subtract('week', 1).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().endOf('isoweek').subtract('week', 1).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 近一周
    recentWeek () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000 * 7).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 本月
    currentMonth () {
      this.starttime = moment().startOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().endOf('month').endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 上月
    lastMonth () {
      this.starttime = moment().startOf('month').subtract('month', 1).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().endOf('month').subtract('month', 1).endOf('month').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 过去一月
    recentMonth () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000 * 30).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 本季度
    currentQuarter () {
      this.starttime = moment().startOf('quarter').format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 上季度
    lastQuarter () {
      this.starttime = moment().quarter(moment().quarter() - 1).startOf('quarter').format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().quarter(moment().quarter() - 1).endOf('quarter').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 过去一季度
    recentQuarter () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000 * 90).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 今年
    currentYear () {
      this.starttime = moment().startOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 上一年
    lastYear () {
      this.starttime = moment().startOf('year').subtract('year', 1).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment().endOf('year').subtract('year', 1).endOf('year').format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    },
    // 近一年
    recentYear () {
      this.starttime = moment(new Date().getTime() - 3600 * 24 * 1000 * 365).format('YYYY-MM-DD HH:mm:ss')
      this.endtime = moment(new Date().getTime()).format('YYYY-MM-DD HH:mm:ss')
      this.$emit('todayCurrent', this.starttime, this.endtime)
    }
  }
}
</script>
<style scoped>
.data_box{
  width: 100%;
}
.data_box >>> .el-button--mini, .data_box >>>.el-button--small{
  border-radius:0!important;
}
.data_box >>> .el-button{
  background: #129F77!important;
  border: 1px solid #eee ;
  color: #fff !important;
}
.drop_menu{
  font-size: 12px;
  line-height: 25px;
}
.data_title{
  background: #fff;
  text-align: center;
  margin-right: 3px;
  border: 1px solid #129F77;
  border-bottom: 0;
}
.data_title span{
  font-size: 12px;
  color: #129F77;
}
</style>

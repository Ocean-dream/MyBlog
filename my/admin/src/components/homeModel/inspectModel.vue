<template>
<div>
    <div>
      <h3>检查结论</h3>
      <h4 class="el-icon-circle-check" style="font-size:15px;color:green;font-weight：700;margin:0;">通过</h4>
    </div>
  <div :inspectArr="inspectArr" class="inspect_content">
    <h3>检查细节</h3>
     <el-row style="background:#129f77;">
          <el-col :span="2" style="color:#fff;">检查类</el-col>
          <el-col :span="5" style="color:#fff;">检查项</el-col>
          <el-col :span="5" style="color:#fff;">该项值</el-col>
          <el-col :span="8" style="color:#fff;">检查度</el-col>
          <el-col :span="4" style="color:#fff;">检查结果</el-col>
      </el-row>
      <el-row style="inspect_divide">
          <el-col :span="2" style="height:83px;line-height: 82px;">基础类</el-col>
          <el-col :span="5">
            <el-row class="bdbom">地址</el-row>
            <el-row>业务状态</el-row>
          </el-col>
          <el-col :span="5">
            <el-row class="bdbom">
              <el-tag type="danger" effect="dark">必须满足</el-tag>
            </el-row>
            <el-row>
              <el-tag type="danger" effect="dark">必须满足</el-tag>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="bdbom">
              {{inspectArr.base.addres.country === null ? '' : inspectArr.base.addres.country}}
              {{inspectArr.base.addres.region === null ? '' : inspectArr.base.addres.region}}
              {{inspectArr.base.addres.province === null ? '' : inspectArr.base.addres.province}}
              {{inspectArr.base.addres.city === null ? '' : inspectArr.base.addres.city}}
              {{inspectArr.base.addres.district === null ? '' : inspectArr.base.addres.district}}
              {{inspectArr.base.addres.address === null ? '' : inspectArr.base.addres.address}}
              </el-row>
            <el-row>
              {{inspectArr.base.status === 1 ? '开启' : '关闭'}}
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="inspectArr.base.addres.address !== null && inspectArr.base.addres.district !== null && inspectArr.base.addres.country !== null && inspectArr.base.addres.region !== null && inspectArr.base.addres.city !== null"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row>
              <i class="el-icon-check right" v-if="inspectArr.base.status === 1 "></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="2" style="height:83px;line-height: 82px;">资质类</el-col>
          <el-col :span="5">
            <el-row class="bdbom">是否提交过资质申请</el-row>
            <el-row>是否通过审核</el-row>
          </el-col>
           <el-col :span="5">
              <el-row class="bdbom">
                <el-tag type="danger" effect="dark">必须满足</el-tag>
              </el-row>
              <el-row>
                <el-tag type="danger" effect="dark">必须满足</el-tag>
              </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="bdbom">{{inspectArr.qualifications.submit}}</el-row>
            <el-row>
              {{inspectArr.qualifications.review === false ? '否' : '是'}}
            </el-row>
          </el-col>
          <el-col :span="4">
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="inspectArr.qualifications.submit > 0"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row>
              <i class="el-icon-check right" v-if="inspectArr.qualifications.review === true"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="2" style="height:206px;line-height: 206px;">营业类</el-col>
          <el-col :span="5">
            <el-row class="bdbom">是否有管理人员</el-row>
            <el-row class="bdbom">是否创建分成配置</el-row>
            <el-row class="bdbom">是否微信支付的公众号配置</el-row>
            <el-row class="bdbom">是否微信支付的小程序配置</el-row>
            <el-row>是否有支付宝支付的配置</el-row>
          </el-col>
           <el-col :span="5">
            <el-row class="bdbom">
              <el-tag type="danger" effect="dark">必须满足</el-tag>
            </el-row>
            <el-row class="bdbom">
              <el-tag type="warning" effect="dark">按需可选</el-tag>
            </el-row>
            <el-row class="bdbom">
              <el-tag type="warning" effect="dark">按需可选</el-tag>
            </el-row>
            <el-row class="bdbom">
              <el-tag type="warning" effect="dark">按需可选</el-tag>
            </el-row>
            <el-row>
              <el-tag type="warning" effect="dark">按需可选</el-tag>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-row class="bdbom">
              <span v-for="(item, index) in inspectUser" :key="index">
                {{item}}
              </span>
              <span v-show="inspectUser.length === 0">无</span>
            </el-row>
            <el-row class="bdbom">
              {{ inspectArr.policys.length  === 0 ? '无' : '有'}}
            </el-row>
            <!-- 公众号配置 -->
             <el-row class="bdbom">
                 <span v-if="wxType.indexOf(1) !== -1 && wxStatus.indexOf(1) !== -1">存在并开启</span>
                  <span v-else>无</span>
            </el-row>
            <!-- 小程序配置 -->
            <el-row class="bdbom">
                <span v-if="wxType.indexOf(2) !== -1 && wxStatus.indexOf(1) !== -1">存在并开启</span>
               <span v-else>无</span>
            </el-row>
             <el-row>
              无
            </el-row>
          </el-col>
           <el-col :span="4">
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="inspectUser.length !== 0"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="inspectArr.policys.length !== 0"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="wxType.indexOf(1) !== -1 && wxStatus.indexOf(1) !== -1"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row class="bdbom">
              <i class="el-icon-check right" v-if="wxType.indexOf(2) !== -1 && wxStatus.indexOf(1) !== -1"></i>
              <i class="el-icon-close error" v-else></i>
            </el-row>
            <el-row>
              <i class="el-icon-close error"></i>
            </el-row>
          </el-col>
      </el-row>
  </div>
</div>
</template>
<script>
export default {
  created () {
  },
  props: {
    inspectArr: {
      type: Object,
      default: () => {}
    },
    inspectUser: {
      type: Array,
      default: () => []
    },
    wxType: {
      type: Array,
      default: () => []
    },
    wxStatus: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.inspect_content >>> .el-row{
  min-height: 40px;
  line-height: 40px;
  text-align: center;
  /* margin:20px 0; */
}
.inspect_content >>>.el-col{
  border: 1px solid #ccc;
}
.right, .error{
  color:green;
  font-size:20px;
  font-weight:700;
}
.error{
  color:red;
}
.bdbom{
  border-bottom: 1px solid #ccc;
}
</style>

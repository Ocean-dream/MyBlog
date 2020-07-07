<template>
  <div>
    <div v-for="(item, index) in detailList" :key="index">
      <div style="margin-bottom:20px;">
        <h3 class="all_title">基础信息</h3>
        <div style="margin-left:20px;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                编号：{{item.id}}
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                名称：{{item.name}}
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                法人：{{item.legal_person_name }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="detail_qualify">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                经营范围：{{item.biz_scope }}
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                商户类型：
                <el-tag v-show="item.biz_type === 1">企业商户</el-tag>
                <el-tag type="success" v-show="item.biz_type === 2">个体工商户</el-tag>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                行业类型：{{item.industry_type}}
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>创建者:</p>
                <p style="margin-left:15px">{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple" style="display: flex;">
                <p>更新者:</p>
                <p style="margin-left:15px">{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</p>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple">
                创建时间：{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="detail_qualify">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                修改时间：{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss') }}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <h3 class="all_title">其他信息</h3>
        <div style="margin-left:20px;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple">
                法人身份证号：{{item.legal_idcard_no}}
              </div>
            </el-col>
            <el-col :span="13">
              <div class="grid-content bg-purple">
                药品许可证有效日期：{{item.goods_biz_license_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.goods_biz_license_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="detail_qualify">
            <el-col :span="11">
              <div class="grid-content bg-purple">
                营业执照有效日期：{{item.biz_license_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.biz_license_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
              </div>
            </el-col>
            <el-col :span="13">
              <div class="grid-content bg-purple">
                药品经营质量管理规范认证有效日期：{{item.biz_op_quality_gsp_certificate_start_time | dateformat('YYYY-MM-DD HH:mm:ss') }} - {{item.biz_op_quality_gsp_certificate_end_time | dateformat('YYYY-MM-DD HH:mm:ss')}}
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <h3 class="all_title">相关图片</h3>
        <div style="margin-left:20px;">
          <el-row :gutter="20">
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                商户营业执照 ：
                  <el-image
                    style="width:80px;"
                    :src="item.biz_license_img_url_logo"
                    :preview-src-list="saleImgList">
                  </el-image>
              </div>
            </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple detail_img">
                  药品经营许可证：
                  <el-image
                    style="width:80px;"
                    :src="item.goods_biz_license_img_url_logo"
                    :preview-src-list="licenseImgList">
                  </el-image>
                </div>
              </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                药品经营质量管理规范认证：
                <el-image
                  style="width:80px;"
                  :src="item.biz_op_quality_gsp_certificate_img_url_logo"
                  :preview-src-list="qualityImgList">
                </el-image>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top:30px;">
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                门店门头照片：
                <el-image
                  style="width:80px;"
                  :src="item.store_headdoor_img_url_logo"
                  :preview-src-list="headImgList">
                </el-image>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                法人手持证件照 ：
                <el-image
                  style="width:80px;"
                  :src="item.legal_idcard_hold_img_url_logo"
                  :preview-src-list="cardImgList">
                </el-image>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                门店店内照片 ：
                <el-image
                  style="width:80px;"
                  :src="item.store_indoor_img_url_logo"
                  :preview-src-list="indoorImgList">
                </el-image>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" class="detail_qualify">
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img">
                租赁合同照片 ：
                  <el-image
                  style="width:80px;"
                  :src="item.store_biz_contact_logo"
                  :preview-src-list="contactImgList">
                </el-image>
              </div>
            </el-col>
            <el-col :span="8">
              <div class="grid-content bg-purple detail_img" >
                门店收银台照片：
                  <el-image
                  style="width:80px;"
                  :src="item.store_cashier_img_url_logo"
                  :preview-src-list="cashierImgList">
                </el-image>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
    }
  },
  props: {
    detailList: {
      type: Array,
      default: () => []
    },
    saleImgList: {
      type: Array,
      default: () => []
    },
    licenseImgList: {
      type: Array,
      default: () => []
    },
    qualityImgList: {
      type: Array,
      default: () => []
    },
    headImgList: {
      type: Array,
      default: () => []
    },
    cardImgList: {
      type: Array,
      default: () => []
    },
    indoorImgList: {
      type: Array,
      default: () => []
    },
    contactImgList: {
      type: Array,
      default: () => []
    },
    cashierImgList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
  }
}
</script>
<style scoped>
.show_table >>> .el-col{
  border: 1px solid #ccc;
  text-align: center;
}
.show_table p{
  margin-left: 29%;
}
.show_table_title .el-col{
  background: #eee;
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.detail_id{
  margin-left:15px;
}
.detail_qualify{
  margin: 20px 0;
}
.detail_img{
  display: flex;
}
</style>

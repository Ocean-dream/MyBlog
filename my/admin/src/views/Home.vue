<template>
  <div>
    <el-container class="home-con">
      <el-header class="header">
         <el-col :span="4">
           <div class="grid-content bg-purple logo" @click="go('/home')" style="cursor: pointer; background-color:#129F77">
              <div style="width:60px;height:60px;margin-right:21px">
                <img src="../assets/logo.png" alt="" title="默比优斯·运营平台" style="width:100%">
              </div>
              默比优斯·运营平台
            </div>
          </el-col>
         <el-col :span="18">
           <div class="grid-content bg-purple-light">
             <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" background-color="#129F77"
            text-color="#fff"
            active-text-color="#6cf583">
                <el-submenu index="1">
                  <template slot="title" style="min-width:100px">业务管理</template>
                  <el-menu-item index="1-1" style="min-width:100px" @click="go('/overview')">业务总览</el-menu-item>
                  <!-- <el-menu-item index="1-2" style="min-width:100px" @click="go('/review')">业务大盘</el-menu-item> -->
                  <el-menu-item index="1-2" style="min-width:100px;" @click="go('/stats')">趋势分析</el-menu-item>
                  <el-menu-item index="1-3" style="min-width:100px;border-bottom:1px solid #ccc;" @click="go('/dimension')">维度分析</el-menu-item>
                  <el-menu-item index="1-4" style="min-width:100px" @click="go('/order')">历史订单</el-menu-item>
                  <el-menu-item index="1-5" style="min-width:100px" @click="go('/shares')">历史分账</el-menu-item>
                  <el-menu-item index="1-6" style="min-width:100px" @click="go('/sales')">历史销售</el-menu-item>
                  <el-menu-item index="1-7" style="min-width:100px" @click="go('/ticket')">反馈工单</el-menu-item>
                  <el-menu-item index="1-8" style="min-width:100px" @click="go('/refund')">历史退款</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">商品管理</template>
                  <el-menu-item index="2-1" @click="go('/good')">商品列表</el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">机器管理</template>
                  <el-menu-item index="3-1" @click="go('/machine')">机器列表</el-menu-item>
                  <el-menu-item index="3-2" @click="go('/supplyhistory')">补货历史</el-menu-item>
                </el-submenu>
                <el-submenu index="4" v-show="cloudShow === true && currentfloor === 'platform'">
                  <template slot="title">平台管理</template>
                  <el-submenu index="4-1">
                    <template slot="title">用户管理</template>
                    <el-menu-item index="4-1-1"  @click="go('/users')" style="min-width:100px;">用户列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-2">
                    <template slot="title">设备管理</template>
                    <el-menu-item index="4-2-1"  @click="go('/device')" style="min-width:100px;">设备列表</el-menu-item>
                  </el-submenu>
                  <el-submenu index="4-3">
                    <template slot="title">审核管理</template>
                    <el-menu-item index="4-3-1" @click="go('/verify')" style="min-width:100px;">审核列表</el-menu-item>
                  </el-submenu>
                </el-submenu>
              </el-menu>
           </div>
          </el-col>
         <el-col :span="2" class="logo_col">
           <div class="grid-content bg-purple loginout">
             <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <el-avatar icon="el-icon-user-solid"></el-avatar>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item class="clearfix">
                    <span @click="personalSpace()"><i class="el-icon-user" style="color:#129f77"></i>个人中心</span>
                    <el-badge class="mark" />
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <span @click="ManagementDialogVisible = true"><i class="el-icon-s-management" style="color:#129f77"></i>组织管理</span>
                    <el-badge class="mark" />
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                    <span @click="openHistory()"><i class="el-icon-document" style="color:#129f77"></i>操作历史</span>
                    <el-badge class="mark" />
                  </el-dropdown-item>
                  <el-dropdown-item class="clearfix">
                   <span @click="logout()"><i class="el-icon-switch-button" style="color:#129f77"></i>退出</span>
                    <el-badge class="mark"/>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
           </div>
          </el-col>
      </el-header>
      <el-container class="home-main" id="box">
        <el-aside id="aside" :width="isCollapse?'50px':'260px'" style="background:#129f77;">
            <sidebar-item :isShowMark="showTreeMark" :treePower="treeUserPower" :newMenuTree="newMenuTree" :expandKey="positionExpand" :defaultExpand ="expandDefault" :model="layoutmark" @receiveData = "handleNode" @rightClick="clickRight" @handleDouble="doubleClick"/>
          <div class="man_con" v-show="isSetting" id="screen">
            <ul>
              <li><span style="cursor:pointer;color:#129F77;" @click="userInstruction()">导航说明</span></li>
              <li><span style="cursor:pointer;color:#129F77;" @click="screenSetting()">显示设置</span></li>
            </ul>
          </div>
          <div class = "toggle">
            <div class="toggle_content space_man">
              <span v-show="isCollapse === false" :style="isSetting ? 'background:#344563;color: #fff;padding: 3px 5px 7px 5px;' : 'backgroung:#fff;color:#129F77;padding:0;'" @click.stop="showSetting()"><i class="el-icon-setting" style="margin-right:8px;"></i>组织管理</span>
              <span class="el-icon-setting" v-show="isCollapse === true" ></span>
            </div>
            <div @click="toggleCollapse()" class="toggle_content toggle_sca">
              <span v-show="isCollapse === false" style="font-size:13px;color:#129F77;font-weight:700;">&lt;&lt;</span>
              <i v-show="isCollapse === true" style="font-size:13px;color:#129F77;font-weight:700;" >&gt;&gt;</i>
            </div>
          </div>
        </el-aside>
        <div v-show="newmenuVisible" class="mlist">
          <ul id="RML" class="menu">
            <li class="menu_item el-icon-plus" @click="onClick()"><button :disabled="rightList.create_next === '' ? true:(this.level === 'store' ? true : false) ">创建下层</button></li>
            <li class="menu_item el-icon-delete" @click="deleteRole()"><button :disabled="rightList.delete_current === ''? true:false ">注销本层</button></li>
            <li class="menu_item el-icon-turn-off" style="border-bottom:1px solid #ccc;"><button @click="serviceStates()" :disabled="rightList.pay_manager === ''? true:false">业务状态</button></li>
            <li class="menu_item el-icon-view" @click="readCurrent()"><button :disabled="rightList.read_current === ''? true:false ">查看详情</button></li>
            <li class="menu_item el-icon-edit-outline" @click="updataCurrent()"><button :disabled="rightList.update_current === ''? true:false ">更新详情</button></li>
            <li class="menu_item el-icon-s-custom" @click="divideRole()"><button :disabled="rightList.user_manage === ''? true:false ">用户管理</button></li>
            <li class="menu_item el-icon-s-order" @click="qualification()"><button :disabled="rightList.qualification_manager === ''? true:false">资质管理</button></li>
            <li class="menu_item el-icon-s-operation" @click="shareMoney()"><button :disabled="rightList.share_manager === ''? true:false">分成管理</button></li>
            <li class="menu_item el-icon-bank-card" @click="payMoney()" style="border-bottom:1px solid #ccc;"><button :disabled="rightList.pay_manager === ''? true:false">支付管理</button></li>
            <li class="menu_item el-icon-message"><button @click="openDataReview()" :disabled="rightList.pay_manager === ''? true:false">数据订阅</button></li>
            <li class="menu_item el-icon-finished"  @click="selfCheck()"><button @click="inspect()" :disabled="rightList.pay_manager !== '' && level === 'store'? false:true">一键检查</button></li>
            <li class="menu_item el-icon-document"  @click="operateHistory()"><button :disabled="rightList.pay_manager === ''? true:false">操作历史</button></li>
          </ul>
        </div>
        <div id="resize"></div>
        <el-main id="mainContent">
          <router-view></router-view>
          <div class="contact">
            <el-popover
              placement="top"
              width="250"
              trigger="click"
              >
                <div class="contact_con">
                   <el-popover
                    placement="left"
                    width="250"
                    trigger="hover"
                    >
                    <div style="background:#129f77; padding:10px;">
                      <ul style="margin:0;padding:0;list-style:none;line-height:18px;">
                        <li style="color:#fff;cursor: pointer;" @click="online()">客服热线</li>
                        <li><a target="_blank" href=" http://wiki.mobius.org.cn:8090/pages/viewpage.action?pageId=7438384" style="color:#fff;text-decoration: none;">使用指南</a></li>
                      </ul>
                    </div>
                    <span slot="reference" style="color:#ccc;font-size:29px;line-height:49px;" class="el-icon-s-comment"></span>
                  </el-popover>
                </div>
              <span slot="reference" style="color:#fff;font-size:29px;line-height:38px;" class="el-icon-menu"></span>
            </el-popover>
          </div>
      </el-main>
      </el-container>
    </el-container>
    <!-- 添加导航 -->
    <el-dialog
      title="创建"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px" v-if="this.level === 'merchant'">
        <el-form-item label="类型">
          <el-radio v-model="form.mark" label="商户" checked>商户</el-radio>
          <el-radio v-model="form.mark" label="门店" checked>门店</el-radio>
        </el-form-item>
         <el-form-item label="英文名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="中文名称">
          <el-input v-model="form.cname"></el-input>
        </el-form-item>
        <el-form-item label="地址：" label-width="100px">
          <div style="margin-bottom:30px;">
            <el-select disabled placeholder="中国大陆" v-model="form.country"></el-select>
            <el-select placeholder="请选择" v-model="form.detailregion" style="margin:0 50px;">
              <el-option
                v-for="(item, index) in region"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleAdressChange">
          </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="详细地址：" label-width="100px">
            <el-input placeholder="请输入详细地址" v-model="form.address" clearable style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
      </el-form>
      <el-form ref="form" :model="form" label-width="80px" v-else>
        <el-form-item label="类型">
          <el-radio v-model="form.mark" label="商户" v-if="this.level === 'platform'">商户</el-radio>
          <el-radio v-model="form.mark" label="商户" v-if="this.level === 'store'">门店</el-radio>
        </el-form-item>
         <el-form-item label="英文名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
         <el-form-item label="中文名称">
          <el-input v-model="form.cname"></el-input>
        </el-form-item>
         <el-form-item label="地址：" label-width="100px">
          <div style="margin-bottom:30px;">
            <el-select disabled placeholder="中国大陆" v-model="form.country"></el-select>
            <el-select placeholder="请选择" v-model="form.region" style="margin:0 50px;">
              <el-option
                v-for="(item, index) in region"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-cascader
            size="large"
            :options="options"
            v-model="selectedOptions"
            @change="handleAdressChange">
          </el-cascader>
          </div>
        </el-form-item>
        <el-form-item label="详细地址：" label-width="100px">
            <el-input placeholder="请输入详细地址" v-model="form.address" clearable style="width: 60%;"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.describe"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitMessage()"  style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 用户授权框 -->
    <el-dialog
      title="用户管理"
      :visible="userDialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户:">
          <el-select v-model="userForm.value" placeholder="请选择">
            <el-option
              v-for="(item, index) in userlist"
              :key="index"
              :label="item.cname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色">
          <el-radio-group v-model="userForm.resource">
            <el-radio label="管理员"></el-radio>
            <el-radio label="运营"></el-radio>
            <el-radio label="财务"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-table
        :data="powerList"
        style="width: 100%">
        <el-table-column
          prop="user.cname"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="role.cname"
          label="角色"
          width="180">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleUnbind(scope.row.user.id, scope.row.role.cname)">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="userDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureDo()"  style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 个人中心 -->
    <el-dialog
      title="个人中心"
      :visible="priviteDialogVisible"
      width="45%"
      :before-close="handleClose"
      >
        <h3>基本信息</h3>
        <div style="display:flex">
          <div style="width:70%; margin-top:30px">
            <el-row :gutter="20" style="margin-bottom:15px">
              <el-col :span="12"><div class="grid-content bg-purple">英文姓名：{{ userInfo.name }}</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:15px">
              <el-col :span="12"><div class="grid-content bg-purple">中文名称：{{ userInfo.cname }}</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:15px">
              <el-col :span="12"><div class="grid-content bg-purple">手机号码：{{ userInfo.phone }}</div></el-col>
            </el-row>
            <el-row :gutter="20" style="margin-bottom:15px">
              <el-col :span="12"><div class="grid-content bg-purple">电子邮箱：{{ userInfo.email }}</div></el-col>
            </el-row>
          </div>
          <div style="border:1px solid #ccc; width:150px;height:150px;font-size:100px;color:#ccc;text-align:center;line-height:130px;cursor:pointer;" @click="uploadUserImage()">+</div>
        </div>
        <div style="margin-top:30px;">
         <el-tabs type="border-card">
          <el-tab-pane label="组织管理">
            <el-row style="margin-bottom:20px">
              <el-col :span="8">组织</el-col>
              <el-col :span="8">类型</el-col>
              <el-col :span="8">角色</el-col>
            </el-row>
            <el-row v-for="(item, index) in userPower" :key="index" style="margin-bottom:20px">
              <el-col :span="8">{{item.cname}}</el-col>
              <el-col :span="8">
                <el-tag v-if="item.entity === 'merchant'">商户</el-tag>
                <el-tag v-if="item.entity === 'store'">门店</el-tag>
                <el-tag v-if="item.entity === 'platform'">平台</el-tag>
              </el-col>
              <el-col :span="8">
                <el-tag type="success">{{item.power}}</el-tag>
                <el-tag type="success" v-if="item.elpower !== undefined" style="margin-left:15px;">{{item.elpower}}</el-tag>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="密码管理">
            <el-form ref="passWordFormRef" :model="passWordForm" label-width="100px" style="width:50%;margin-left:80px;">
              <el-form-item label="请输入旧密码">
                <el-input v-model="passWordForm.old" type="password"></el-input>
              </el-form-item>
              <el-form-item label="请输入新密码">
                <el-input v-model="passWordForm.new" type="password"></el-input>
              </el-form-item>
              <el-form-item label="请确认新密码">
                <el-input v-model="passWordForm.sure" type="password"></el-input>
              </el-form-item>
              <el-button type="primary" @click="changePassword()" style="background:#129F77;border-color:#129F77;">提交修改</el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="秘钥管理">计划中</el-tab-pane>
          <el-tab-pane label="认证管理">计划中</el-tab-pane>
        </el-tabs>
        </div>
    </el-dialog>
    <!-- 查看本层 -->
    <el-dialog
      title="查看本层"
      :visible="readDialogVisible"
      width="30%"
      :before-close="handleClose"
      >
      <div v-for="(item, index) in currentList" :key="index">
        <el-row style="margin-top:20px;">名称：{{item.cname}}</el-row>
        <el-row style="margin:20px 0;">创建人：{{item.create_user_name === null ? item.create_user_name : '未知'}}</el-row>
        <el-row style="margin:20px 0;">更新人：{{item.update_user_name === null ? item.update_user_name : '未知'}}</el-row>
        <el-row>地址：{{item.country ? item.country + '-' : ''}}{{item.region ? item.region + '-' : ''}}{{item.province ? item.province + '-' : ''}}{{item.city ? item.city + '-' : ''}}{{item.district ? item.district + '-' : ''}}</el-row>
        <el-row style="margin-top:20px;">详细地址：{{item.address}}</el-row>
        <el-row style="margin-top:20px;">描述：{{item.description}}</el-row>
        <el-row style="margin-top:20px;">审核状态：
          <el-tag v-show="item.review_state === 2">审核中</el-tag>
          <el-tag type="success" v-show="item.review_state === 1">通过</el-tag>
          </el-row>
        <el-row style="margin-top:20px;">业务状态：
          <el-tag v-show="item.status === 3">维护中</el-tag>
          <el-tag type="success" v-show="item.status === 1">启用</el-tag>
          <el-tag type="info" v-show="item.status === 2">关闭</el-tag>
          </el-row>
      </div>
    </el-dialog>
    <!-- 更新本层 -->
    <el-dialog
      title="更新本层"
      :visible="updataDialogVisible"
      width="50%"
      :before-close="handleClose"
      >
      <el-form ref="updataOrgFormRef" :model="updataOrgForm" label-width="80px">
        <el-form-item label="名称：" label-width="100px">
          <el-input v-model="updataOrgForm.cname" placeholder="请输入中文名称"></el-input>
        </el-form-item>
        <el-form-item label="地址：" label-width="100px">
          <div style="margin-bottom:30px; display:flex;">
            <div>
              <p style="margin:0 0 0 20px;">一级区域</p>
              <el-select disabled placeholder="中国大陆" v-model="updataOrgForm.country"></el-select>
            </div>
            <div>
              <p style="margin:0 0 0 70px;">二级区域</p>
              <el-select placeholder="请选择" v-model="updataOrgForm.region" style="margin:0 50px;">
                <el-option
                  v-for="(item, index) in region"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div>
              <p style="margin:0 0 0 20px;">地域（省/市/区）</p>
              <el-cascader
                size="large"
                :options="options"
                v-model="selectedOptions"
                @change="handleAdressChange">
              </el-cascader>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="详细地址：" label-width="100px">
            <el-input placeholder="请输入详细地址" v-model="updataOrgForm.address" clearable style="width: 60%;"></el-input>
        </el-form-item>
         <el-form-item label="描述：" label-width="100px">
          <el-input v-model="updataOrgForm.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="updataDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updataOrg()"  style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 组织管理 -->
    <el-dialog
      title="组织管理"
      :visible="ManagementDialogVisible"
      width="30%"
      :before-close="handleClose">
      <el-tabs type="border-card">
          <el-tab-pane label="用户管理">计划中</el-tab-pane>
          <el-tab-pane label="授权管理">计划中</el-tab-pane>
          <el-tab-pane label="申请管理">计划中</el-tab-pane>
          <el-tab-pane label="审批管理">计划中</el-tab-pane>
        </el-tabs>
    </el-dialog>
    <!-- 操作历史 -->
    <el-dialog
      title="操作历史"
      :visible.sync="historyDialogVisible"
      width="80%"
      id="historyoperate"
      :before-close="handleClose">
        <div style="margin-left:82%;margin-bottom:20px;">
          <el-button type="primary" style="margin-right:20px;padding:6px 13px;background: #129f77;border-color: #129f77" class="free_search"><el-dropdown trigger="click">
          <span class="el-dropdown-link" style="color:#fff;">
            自定义查询
          </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item style="">
              <el-popover
                placement="bottom"
                trigger="click">
                <data-time ref="dataTimeRef" @todayCurrent ='getCurrentHistoryData' :style="isScroll"></data-time>
                <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;padding:6px 13px;" @click="isScroll = 'display:block;'"><span>时段查询</span></el-button>
              </el-popover>
            </el-dropdown-item>
            <el-dropdown-item><span style="margin-left:13px;">高级查询</span></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </el-button>
      <el-button type="primary" @click="resetHistory()" style="color:#fff;background: #129f77;padding:6px 20px;border-color: #129f77">一键重置</el-button>
        </div>
        <el-table
          :data="historyList"
          stripe
          ref="multipleTable"
          @cell-click="openDetails"
          style="width: 100%">
           <el-table-column type="expand">
             <template slot-scope="slotProps">
                <div style="padding:10px;">
                  <el-row>
                    <span class="detail_his" @click="historyDetail = true">查看详情</span>
                  </el-row>
                  <el-row :gutter="20" style="margin-left:7%;">
                    <el-col :span="8"><div class="grid-content bg-purple"> 编号：{{slotProps.row.id}}</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple"> 中文名：{{slotProps.row.cname}}</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple"> 描述：{{slotProps.row.description}}</div></el-col>
                  </el-row>
                  <el-row :gutter="20" style="margin:10px 0; border-top:1px solid #eee;padding-top:10px; margin-left:7%;">
                    <el-col :span="8"><div class="grid-content bg-purple">操作对象：{{slotProps.row.resources}}</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">状态：{{slotProps.row.status}}</div></el-col>
                    <el-col :span="8"><div class="grid-content bg-purple">用户中文名：{{slotProps.row.user_cname}}</div></el-col>
                  </el-row>
                    <el-row :gutter="20" style="border-top:1px solid #eee;padding-top:10px; margin-left:7%;">
                      <el-col :span="8"><div class="grid-content bg-purple">用户编号：{{slotProps.row.user_id}}</div></el-col>
                      <el-col :span="8"><div class="grid-content bg-purple">用户ip：{{slotProps.row.user_ip}}</div></el-col>
                      <el-col :span="8"><div class="grid-content bg-purple">用户姓名：{{slotProps.row.user_name}}</div></el-col>
                    </el-row>
                    <el-row :gutter="20" style="margin-top:10px;border-top:1px solid #eee;padding-top:10px;margin-left:7%;">
                      <el-col :span="8"><div class="grid-content bg-purple">
                        <span style="color:red" v-if="slotProps.row. meta.output_dict.ret_code !== 0">输出信息：{{slotProps.row.meta.output_dict.ret_msg}}</span>
                        <span v-else>输出信息：{{slotProps.row.meta.output_dict.ret_msg}}</span>
                        </div></el-col>
                      <el-col :span="8"><div class="grid-content bg-purple">创建时间：{{slotProps.row.ctime}}</div></el-col>
                      <el-col :span="8"><div class="grid-content bg-purple">修改时间：{{slotProps.row.mtime}}</div></el-col>
                    </el-row>
                  </div>
                   <el-dialog
                    width="62%"
                    title="事件详情"
                    :visible.sync="historyDetail"
                    append-to-body>
                    <div style="display:flex;justify-content: space-between; height:500px;overflow:auto;">
                      <div style="background:#1E1E1E;color:#C48A72;width:48%;overflow:auto;">
                        <h3 style="margin-left:50%;transform: translateX(-50%)">输入</h3>
                        <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{slotProps.row.meta.input_dict}}</pre>
                      </div>
                      <div style="background:#1E1E1E;color:#C48A72;width:48%;">
                        <h3 style="margin-left:50%;transform: translateX(-50%)">输出</h3>
                        <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{slotProps.row.meta.output_dict}}</pre>
                      </div>
                    </div>
                  </el-dialog>
              </template>
           </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="user_cname"
            label="操作人"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="操作时间">
             <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="org_id"
            label="操作组织">
            <template slot-scope="slotProps">
              {{slotProps.row.org.cname}}
            </template>
          </el-table-column>
          <el-table-column
            prop="resources"
            label="操作资源.操作编号">
            <template slot-scope="slotProps">
              {{slotProps.row.resources ? slotProps.row.resources : '--'}}.{{slotProps.row.resource_id ? slotProps.row.resource_id : '--'}}
            </template>
          </el-table-column>
           <el-table-column
            prop="action"
            label="操作动作">
             <template slot-scope="slotProps">
              {{slotProps.row.action }}
               <el-popover
                placement="top-start"
                trigger="hover"
                >
                <span style="color:#129F77;width:100%;">{{CNList[slotProps.row.resources][slotProps.row.action]['action_cname']}}</span>
                <el-button slot="reference" style="padding:1px 2px 0;font-size:13px; color:#129F77;border: 0;" icon="el-icon-question" circle></el-button>
              </el-popover>
            </template>
          </el-table-column>
           <el-table-column
            label="操作结果">
            <template slot-scope="slotProps">
              <span style="color:red" v-show="slotProps.row. meta.output_dict.ret_code !== 0">{{slotProps.row. meta.output_dict.ret_code}}</span>
              <span v-show="slotProps.row. meta.output_dict.ret_code === 0">{{slotProps.row. meta.output_dict.ret_code}}</span>
            </template>
          </el-table-column>
           <el-table-column
            label="操作耗时（ms）">
            <template slot-scope="slotProps">
              {{slotProps.row. meta.output_dict.ret_cost }}
            </template>
          </el-table-column>
        </el-table>
       <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchJson.page.page_num"
          :page-sizes="[10,15,25,50,100,200, 500]"
          :page-size="this.searchJson.page.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="historyTotal">
      </el-pagination>
    </el-dialog>
    <!-- 资质管理 -->
    <el-dialog
      title="资质管理"
      :visible="qualificationDialogVisible"
      width="80%"
      :before-close="handleClose">
      <head-notice></head-notice>
      <el-button type="primary" @click="editQualify()" style="background:#129f77;border:0;padding:5px 15px;margin:10px;">创建</el-button>
      <el-table
        :data="tableList"
        ref="multipleTable"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="编号"
          width="180"
          >
            <template slot-scope="slotProps">
              <el-tag type="info"  style="cursor: pointer;" @click="readCurrentDetail(slotProps.row.id)">{{slotProps.row.id}}</el-tag>
            </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          >
        </el-table-column>
         <el-table-column
          prop="legal_person_name"
          label="法人"
          >
        </el-table-column>
        <el-table-column
          prop="biz_scope"
          label="经营范围"
          >
        </el-table-column>
        <el-table-column
          prop="biz_type"
          label="商户类型"
          >
          <template slot-scope="slotProps">
            <el-tag v-show="slotProps.row.biz_type === 1">企业商户</el-tag>
            <el-tag type="success" v-show="slotProps.row.biz_type === 2">个体工商户</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="industry_type"
          label="行业类型"
          >
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          >
          <template slot-scope="slotProps">
            <el-tag v-show="slotProps.row.status === 1">已提交</el-tag>
            <el-tag type="warning" v-show="slotProps.row.status === 2">审核中</el-tag>
            <el-tag type="danger" v-show="slotProps.row.status === 3">未通过</el-tag>
            <el-tag type="success" v-show="slotProps.row.status === 4">已通过</el-tag>
            <el-tag type="info" v-show="slotProps.row.status === 5">已过期</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="组织归属"
          >
           <template slot-scope="slotProps">
              <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="操作"
          width="300"
          >
          <template slot-scope="slotProps">
            <div class="top">
                <el-button type="text" size="mini" @click="editQualify(slotProps.row.id)">编辑</el-button>
                <el-button type="text" size="mini" disabled>删除</el-button>
                <el-button type="text" size="mini" @click="readCurrentDetail(slotProps.row.id)">查看</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 创建 -->
      <el-dialog
        width="60%"
        title="创建"
        :visible.sync="qualificationinnerVisible"
        append-to-body>
        <div style="margin:30px 0;">
          <el-steps :active="checkActive - '0'">
            <el-step title="第一步"></el-step>
            <el-step title="第二步"></el-step>
            <el-step title="第三步"></el-step>
          </el-steps>
        </div>
        <el-form ref="qualificationFormRef" :model="qualificationForm" label-width="190px">
          <el-tabs v-model="checkActive" type="card">
            <!-- 第一步 -->
          <el-tab-pane label="资质信息" name="0">
            <el-row style="margin-top:30px;">
              <el-col :span="15" >
                <el-form-item label="名称（英文）">
                  <el-input v-model="qualificationForm.name" placeholder="请输入商户类型：" style="width:82%"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="商户类型：">
                  <el-select v-model="qualificationForm.biz_type" placeholder="请选择">
                    <el-option
                      v-for="item in merchantOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="qualificationForm.biz_type" placeholder="请输入商户类型："></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="经营范围">
                  <el-select v-model="qualificationForm.biz_scope" placeholder="请选择">
                    <el-option
                      v-for="item in qualifyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="qualificationForm.biz_scope" placeholder="请输入经营范围："></el-input> -->
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="行业类型：">
                  <el-select v-model="qualificationForm.industry_type" placeholder="请选择">
                    <el-option
                      v-for="item in qualifyOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <!-- <el-input v-model="qualificationForm.industry_type" placeholder="请输入行业类型："></el-input> -->
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="经营药品许可证有效日期：">
                    <el-date-picker
                        v-model="qualificationForm.goods_biz_license_start_time"
                        type="date"
                        placeholder="起始时间"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss"
                      >
                      </el-date-picker>
                    <el-date-picker
                      v-model="qualificationForm.goods_biz_license_end_time"
                      style="margin-left:30px"
                      type="date"
                      placeholder="结束时间"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd HH:mm:ss"
                    >
                    </el-date-picker>
                  </el-form-item>
              </el-col>
              <el-col :span="9">
                <!-- 药品经营许可证照片 -->
                <el-form-item label="药品经营许可证：">
                  <el-upload
                      class="upload-demo"
                      ref="uploadLicense"
                      :limit="1"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="handleChangelicense"
                      :on-remove="handleRemovelicense"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    <div style="float:right">
                      <img :src="qualificationForm.goods_biz_license_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.goods_biz_license_img_url_logo">
                    </div>
                    </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="质量管理规范认证有效日期:">
                  <el-date-picker
                      v-model="qualificationForm.biz_op_quality_gsp_certificate_start_time"
                      type="date"
                      placeholder="起始时间"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                    <el-date-picker
                      v-model="qualificationForm.biz_op_quality_gsp_certificate_end_time"
                      style="margin-left:30px"
                      type="date"
                      placeholder="结束时间"
                      format="yyyy 年 MM 月 dd 日"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <!-- 规范认证照片 -->
                <el-form-item label="药品经营质量管理规范认证:">
                    <el-upload
                      class="upload-demo"
                      ref="upload"
                      :limit="1"
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :on-change="handleChangequalify"
                      :on-remove="handleRemovequalify"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                      <div style="float:right">
                      <img :src="qualificationForm.biz_op_quality_gsp_certificate_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.biz_op_quality_gsp_certificate_img_url_logo">
                      </div>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="15">
                <el-form-item label="营业执照有效日期：">
                  <el-popover
                    placement="bottom"
                    width="260"
                    trigger="click">
                    <div style="padding:20px;">
                      <el-date-picker
                        v-model="qualificationForm.biz_license_start_time"
                        type="date"
                        placeholder="起始时间"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                      <el-date-picker
                        style="margin-top:10px;"
                        v-model="qualificationForm.biz_license_end_time"
                        type="date"
                        placeholder="结束时间"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd HH:mm:ss">
                      </el-date-picker>
                    </div>
                    <el-button slot="reference">长期</el-button>
                  </el-popover>
                  <el-popover
                      placement="bottom"
                      width="260"
                      trigger="click"
                      style="margin-left:100px;"
                    >
                      <div style="padding:20px;">
                        <el-date-picker
                          v-model="qualificationForm.biz_license_start_time"
                          type="date"
                          placeholder="起始时间"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                        <el-date-picker
                          style="margin-top:10px;"
                          v-model="qualificationForm.biz_license_end_time"
                          type="date"
                          placeholder="结束时间"
                          format="yyyy 年 MM 月 dd 日"
                          value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                      </div>
                      <el-button slot="reference">固定日期</el-button>
                  </el-popover>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <!-- 营业执照照片 -->
                <el-form-item label="营业执照:">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      ref="upload"
                      :limit="1"
                      :on-remove="handleRemoveSale"
                      :on-change="handleChangeSale"
                      :with-credentials="true"
                      :auto-upload="false">
                      <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                      <div style="float:right">
                        <img :src="qualificationForm.biz_license_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.biz_license_img_url_logo">
                      </div>
                      <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
                    </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin:30px 0 0 30px;">
              <el-col :span="4" >
                <el-button type="primary" @click="checkActive= '1'" style="background:#129f77;border:0;">下一步</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 第二部 -->
          <el-tab-pane label="法人信息" name="1">
            <el-row  style="margin-top:30px;">
              <el-col :span="12">
                <el-form-item label="法人姓名">
                  <el-input v-model="qualificationForm.legal_person_name" placeholder="请输入法人姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="法人身份证号">
                  <el-input v-model="qualificationForm.legal_idcard_no" placeholder="法人身份证号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <!-- 手持身份证照片 -->
                <el-form-item label="法人身份证手持照">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :limit="1"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :on-change="handleChangeCard"
                  :on-remove="handleRemoveCard"
                  :auto-upload="false">
                  <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                  <div style="float:right">
                    <img :src="qualificationForm.legal_idcard_hold_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.legal_idcard_hold_img_url_logo">
                  </div>
                </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin:30px 0 0 30px;">
              <el-col :span="4" >
                <el-button type="primary" @click="checkActive= '0'" style="background:#129f77;border:0;">上一步</el-button>
                <el-button type="primary" @click="checkActive= '2'" style="background:#129f77;border:0;">下一步</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
          <!-- 第三步 -->
          <el-tab-pane label="合作信息" name="2">
            <el-row  style="margin-top:30px;">
              <el-col :span="8">
                <!-- 门头照片 -->
                <el-form-item label="门头照片">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-change="handleChangeHeard"
                    :on-remove="handleRemoveHeard"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                    <div style="float:right;margin-right:160px;">
                      <img :src="qualificationForm.store_headdoor_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.store_headdoor_img_url_logo">
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <!-- 店内照片 -->
                <el-form-item label="店内照片">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-remove="handleRemoveStore"
                    :on-change="handleChangeStore"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                    <div style="float:right;margin-right:160px;">
                      <img :src="qualificationForm.store_indoor_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.store_indoor_img_url_logo">
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <!-- 收银台照片 -->
                <el-form-item label="收银台照片">
                <el-upload
                    class="upload-demo"
                    ref="upload"
                    :limit="1"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-remove="handleRemoveCashier"
                    :on-change="handleChangeCashier"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                    <div style="float:right;margin-right:160px;">
                      <img :src="qualificationForm.store_cashier_img_url_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.store_cashier_img_url_logo">
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <!-- 租赁合同照片 -->
                <el-form-item label="租赁合同照片">
                  <el-upload
                    class="upload-demo"
                    ref="upload"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :on-remove="handleRemoveContact"
                    :on-change="handleChangeContact"
                    :limit="1"
                    :auto-upload="false">
                    <el-button slot="trigger" size="small" type="primary" style="background:#129f77;border:0;">上传图片</el-button>
                    <div style="float:right;margin-right:160px;">
                      <img :src="qualificationForm.store_biz_contact_logo" alt="" style="width:30px;height:30px;" v-show="qualificationForm.store_biz_contact_logo">
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row style="margin:30px 0 0 30px;">
              <el-col :span="4" >
                <el-button type="primary" @click="checkActive= '1'" style="background:#129f77;border:0;">上一步</el-button>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="qualificationinnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitqualify()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 详情 -->
      <el-dialog
        title="详情展示"
        :visible="deatilDialogVisible"
        width="60%"
        append-to-body
        :before-close="handleInnerClose">
          <qualify-detail :detailList = "detailList"
            :saleImgList ="saleImgList"
            :licenseImgList ="licenseImgList"
            :qualityImgList ="qualityImgList"
            :headImgList ="headImgList"
            :cardImgList ="cardImgList"
            :indoorImgList ="indoorImgList"
            :contactImgList ="contactImgList"
            :cashierImgList ="cashierImgList"
          ></qualify-detail>
      </el-dialog>
    </el-dialog>
    <!-- 支付管理 -->
    <el-dialog
      title="支付管理"
      :visible="payDialogVisible"
      width="80%"
      id="policyScroll"
      :before-close="handleClose">
        <head-notice></head-notice>
         <el-card class="box-card">
           <el-button type="primary" @click="createPayList()">创建</el-button>
           <div style="float:right;">
              <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
              <el-button type="primary" @click="selectByName()" style="margin:5px 20px">名称查询</el-button>
              <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                    <el-popover
                      placement="bottom"
                      trigger="click">
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;" @click="isScroll = 'display:block;'">时段查询</el-button>
                    </el-popover>
                  </el-dropdown-item>
                  <el-dropdown-item><span @click="detailSearch()">高级查询</span></el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
              </el-button>
              <el-button type="primary" @click="resetPay()">一键重置</el-button>
           </div>
          </el-card>
          <!-- 表格 -->
          <el-table
            :data="paytableList"
            style="width: 100%">
            <el-table-column
              prop="id"
              label="编号"
              @click="this.dialogFormVisible = true"
              >
              <template slot-scope="slotProps">
                  <el-tag type="info" @click="showPayDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
              prop="cname"
              label="名称"
              width="180"
              >
            </el-table-column>
            <el-table-column
              prop="pay_type"
              label="支付类型"
              >
              <template slot-scope="slotProps">
                <el-tag type="success" v-if="slotProps.row.pay_type===1">微信支付</el-tag>
                <el-tag type="success" v-if="slotProps.row.pay_type===2">支付宝支付</el-tag>
                <el-tag type="success" v-if="slotProps.row.pay_type===3">银行支付</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="app_type"
              label="应用类型"
              >
              <template slot-scope="slotProps">
                <el-tag type="success" v-if="slotProps.row.app_type===1">微信公众号</el-tag>
                <el-tag type="success" v-if="slotProps.row.app_type===2">微信小程序</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="app_id"
              label="应用编号"
              width="180"
              >
            </el-table-column>
            <el-table-column
              label="收单主体"
            >
              <template slot-scope="slotProps">
                <el-tag v-show="slotProps.row.order_subject_info.subject_name === 'operator'">运营方</el-tag>
                <el-tag type="success" v-show="slotProps.row.order_subject_info.subject_name === 'store'">门店方</el-tag>
                <el-tag type="info" v-show="slotProps.row.order_subject_info.subject_name === 'platform'">平台方</el-tag>
              </template>
            </el-table-column>
             <el-table-column
              label="分账客体"
            >
            <template slot-scope="slotProps">
                <span v-for="(item, index) in slotProps.row.order_object_list" :key="index">
                  <el-tag type="info">{{item.object_name === 'platform'?'平台方' : (item.object_name === 'operator' ? '运营方':'门店方') }}（{{item.object_type === 'MERCHANT_ID'?'商户':'个人'}}）</el-tag>
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              label="状态"
            >
             <template slot-scope="slotProps">
             <el-switch v-model="slotProps.row.status"
                :active-value="1"
                :inactive-value="2"
                 @change="payStatusChange(slotProps.row.status, slotProps.row.id)"
              >
              </el-switch>
            </template>
            </el-table-column>
            <el-table-column
              label="组织归属"
              >
              <template slot-scope="slotProps">
                <span style="color:#129f77"> {{slotProps.row.org.cname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="120"
              >
              <template slot-scope="slotProps">
                <div class="top">
                    <el-button type="text" size="mini" @click="editPayInfo(slotProps.row.id)">编辑</el-button>
                    <el-button type="text" size="mini" @click="showPayDetail(slotProps.row.id)">查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.searchJson.page.page_num"
            :page-sizes="[10,15,25,50,100,200, 500]"
            :page-size="this.searchJson.page.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="paytotal">
          </el-pagination>
        <!-- 查看详情 -->
        <el-dialog
          width="50%"
          title="支付详情"
          :visible="innerPayVisible"
          :before-close="handleInnerClose"
          append-to-body>
          <pay-detail :detailList="payDetailList"></pay-detail>
        </el-dialog>
        <!-- 创建 -->
         <el-dialog
          width="65%"
          title="创建"
          class="ceeate_pay"
          :visible.sync="innerCreateVisible"
          :before-close="handdleCreatOrder"
          append-to-body>
            <div>
              <h3>基本信息</h3>
               <el-form ref="creatPayOrderRef" :model="creatPayOrder" label-width="120px" :inline="true" :rules="rules">
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="creatPayOrder.name" placeholder="请使用英文名称" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="中文名称" prop="cname">
                        <el-input v-model="creatPayOrder.cname" placeholder="请输入中文名称" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                     <el-col :span="12">
                      <el-form-item label="备注">
                        <el-input v-model="creatPayOrder.description" placeholder="请输入其他备注" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row><h3>配置信息</h3></el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="支付类型" prop="pay_type">
                        <el-select v-model="creatPayOrder.pay_type" placeholder="请选择支付类型" style="width:122%">
                          <el-option
                            v-for="item in creatPayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                     <el-col :span="12">
                      <el-form-item label="应用类型" prop="app_type">
                        <el-select v-model="creatPayOrder.app_type" placeholder="请选择应用类型" style="width:122%">
                          <el-option
                            v-for="item in creatPayTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                   <el-col :span="12">
                      <el-form-item label="应用编号" prop="app_id">
                        <el-input v-model="creatPayOrder.app_id" placeholder="请输入app_id" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                     <el-col :span="12">
                      <el-form-item label="应用密钥" prop="app_secret">
                        <el-input v-model="creatPayOrder.app_secret" placeholder="请输入app_secret" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
            </div>
            <div>
              <h3>收单主体 <span style="color:#129f77;">（暨分帐方，一般指特约商户）</span></h3>
              <div style="padding-left:118px;margin-bottom:20px;">
                <el-select v-model="order_subject_info.subject_name" placeholder="请选择收单主体">
                  <el-option
                    v-for="(item, index) in payMainOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" circle  @click="selectpayMain()" style="margin-left:50px;background:#129F77;border:0;"></el-button>
              </div>
              <div v-for="(item, index) in payMainArr" :key="index">
              <div style="padding-left:44px;">
                  <el-form :model="order_subject_info" label-width="130px" :inline="true" :rules="rules">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户编号" style="display:flex" prop="mch_id">
                            <el-input v-model="order_subject_info.mch_id" style="width:156%;" placeholder="请输入编号"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col style="margin-left:1%;width:19%;">
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户密钥" style="display:flex" prop="mch_key">
                            <el-input v-model="order_subject_info.mch_key" type="password" style="width:183%;"  placeholder="请输入密钥"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="7">
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户名称" style="display:flex;margin-left:20%;" label-width="74px" prop="subject_cname">
                            <el-input v-model="order_subject_info.subject_cname" style="width:145%;"  placeholder="请输入商户名称"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="4" style="margin-left:2%;">
                        <div class="grid-content bg-purple">
                          <el-form-item label="备注" style="display:flex">
                            <el-input v-model="order_subject_info.subject_description"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="2">
                       <el-button type="danger" icon="el-icon-delete" circle @click="deleteMain()"></el-button>
                      </el-col>
                    </el-row>
                  </el-form>
              </div>
              </div>
            </div>
            <div>
              <h3>分账客体 <span style="color:#129f77;">（暨分账接收方，一般指合作伙伴或合作个人）</span></h3>
              <div style="padding-left:118px;margin-bottom:20px">
                <el-select v-model="order_object_list.object_name"  placeholder="请选择分账客体">
                  <el-option
                    v-for="(item, index) in payMainOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus"  @click="selectObjectPay()" circle style="margin-left:50px;background:#129F77;border:0;"></el-button>
              </div>
              <div v-for="(item, index) in order_object_list.payTitle" :key="index">
              <div style="margin-bottom:10px;padding-left:56px;">
                 <el-form :model="order_object_list" label-width="147px" :inline="true" :rules="rules">
                    <el-row :gutter="10">
                       <el-col style="width:13.5%">
                        <div class="grid-content bg-purple">
                          <el-form-item label="客体方" style="display:flex" prop="object_name">
                            <el-select v-model="item.object_name"  placeholder="请选择" style="width:150%;">
                              <el-option
                                v-for="(item, index) in payMainOptions"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="grid-content bg-purple">
                          <el-form-item label="类型" style="display:flex;margin-right:0;" prop="object_type">
                            <el-select v-model="item.object_type"  placeholder="请选择" style="width:150%;">
                              <el-option
                                v-for="(item, index) in creatPayType"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple" >
                          <el-form-item label="账号"  style="display:flex" prop="object_account">
                            <el-input v-model="item.object_account" style="width:140%;" placeholder="请输入账号"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-form-item label="全称" style="display:flex" label-width="67px" prop="object_cname">
                            <el-input v-model="item.object_cname" style="width:140%;" placeholder="请输入客体全称"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                          <el-form-item label="备注"  style="display:flex">
                            <el-input v-model="item.object_description"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="2" style="padding-left:16px;">
                       <el-button type="danger" icon="el-icon-delete" circle @click="deletePayTitle(index)"></el-button>
                      </el-col>
                    </el-row>
                  </el-form>
              </div>
              </div>
            </div>
            <div style="color:#129f77;">
              <h3>温馨提示</h3>
              <ul>
                <li>分账客体选择商户时，全称应填写具体的商户名称</li>
                <li>分账客体选择个人时，全称应填写真实的个人名称</li>
                <li>个人微信号必须要是实名认证的用户</li>
              </ul>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancleAdd()">取 消</el-button>
              <el-button type="primary" @click="submitCreatPay()" style="background:#129F77;border:0;">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑 -->
         <el-dialog
            width="65%"
            title="更新"
            :before-close="handleInnerClose"
            :visible="innerUpdataPayVisible"
            append-to-body>
            <div>
              <h3>基本信息</h3>
              <el-form ref="creatPayOrderRef" :model="editPayOrder" label-width="120px" :inline="true" :rules="rules">
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="editPayOrder.name" placeholder="请使用英文名称" style="width:132%" disabled></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="中文名称" prop="cname">
                        <el-input v-model="editPayOrder.cname" placeholder="请输入中文名称" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="备注">
                        <el-input v-model="editPayOrder.description" placeholder="请输入其他备注" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row><h3>应用配置</h3></el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="类型">
                        <el-select v-model="editPayOrder.pay_type" placeholder="请选择" style="width:122%" disabled>
                          <el-option
                            v-for="item in creatPayOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                  <el-col :span="12">
                      <el-form-item label="应用类型" prop="app_type">
                        <el-select v-model="editPayOrder.app_type" placeholder="请选择" style="width:122%">
                          <el-option
                            v-for="item in creatPayTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="应用编号" prop="app_id">
                      <el-input v-model="editPayOrder.app_id" placeholder="请输入AppId" style="width:132%"></el-input>
                    </el-form-item>
                  </el-col>
                   <el-col :span="12">
                    <el-form-item label="应用密钥" prop="app_secret">
                      <el-input v-model="editPayOrder.app_secret" placeholder="请输入app_secret" style="width:132%"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
            <div>
              <h3>收单主体 <span style="color:#129f77;">（暨分帐方，一般指特约商户）</span></h3>
              <div style="padding-left:63px;margin-bottom:20px;">
                主体选择 <el-select v-model="order_subject_info.subject_name" placeholder="请选择">
                  <el-option
                    v-for="(item, index) in payMainOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" circle  @click="selectpayMain()" style="margin-left:1%;background:#129F77;border:0;"></el-button>
              </div>
              <div v-for="(item, index) in payMainArr" :key="index">
              <div style="padding-left:44px;">
                  <el-form :model="order_subject_info" label-width="130px" :inline="true" :rules="rules">
                    <el-row :gutter="20">
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户编号" style="display:flex" prop="mch_id">
                            <el-input v-model="order_subject_info.mch_id" autocomplete="off" style="width:134%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col style="width:22.83333%;">
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户密钥"  style="display:flex" prop="mch_key">
                            <el-input v-model="order_subject_info.mch_key" type="password" autocomplete="off" style="width:134%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="7" >
                        <div class="grid-content bg-purple">
                          <el-form-item label="商户名称"  style="display:flex;margin-left:38px" label-width="74px" prop="subject_cname">
                            <el-input v-model="order_subject_info.subject_cname" style="width:142%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="3" style="margin-left:33px;">
                        <div class="grid-content bg-purple">
                          <el-form-item label="备注"  style="display:flex">
                            <el-input v-model="order_subject_info.subject_description" style="width:197%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="2">
                       <el-button type="danger" icon="el-icon-delete" style="margin-left:48%;" circle @click="deleteMain()"></el-button>
                      </el-col>
                    </el-row>
                  </el-form>
              </div>
              </div>
            </div>
            <div>
              <h3>分账客体 <span style="color:#129f77;">（暨分账接收方，一般指合作伙伴或合作个人）</span></h3>
              <div style="padding-left:63px;margin-bottom:20px">
                客体选择 <el-select v-model="order_object_list.object_name"  placeholder="请选择">
                  <el-option
                    v-for="(item, index) in payMainOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus"  @click="selectObjectPay()" circle style="margin-left:1%;background:#129F77;border:0;"></el-button>
              </div>
              <div v-for="(item, index) in order_object_list.payTitle" :key="index">
              <div style="margin-bottom:10px;padding-left:56px;">
                 <el-form :model="order_object_list" label-width="138px" :inline="true" :rules="rules">
                    <el-row :gutter="10">
                       <el-col style="width:13.5%">
                        <div class="grid-content bg-purple">
                          <el-form-item label="客体方" style="display:flex"  :prop="'payTitle.' + index + '.object_name'">
                            <el-select v-model="item.object_name"  placeholder="请选择" style="width:130%;">
                              <el-option
                                v-for="(item, index) in payMainOptions"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="3">
                        <div class="grid-content bg-purple">
                          <el-form-item label="类型" style="display:flex"  :prop="'payTitle.' + index + '.object_type'">
                            <el-select v-model="item.object_type"  placeholder="请选择" style="width:130%;">
                              <el-option
                                v-for="(item, index) in creatPayType"
                                :key="index"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="4">
                        <div class="grid-content bg-purple">
                          <el-form-item label="账号"  style="display:flex" prop="object_account">
                            <el-input v-model="item.object_account" style="width:140%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="grid-content bg-purple">
                          <el-form-item label="全称" style="display:flex" label-width="72px" prop="object_cname">
                            <el-input v-model="item.object_cname" style="width:140%;"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="3" style="margin-left:45px;">
                        <div class="grid-content bg-purple">
                          <el-form-item label="备注"  style="display:flex">
                            <el-input v-model="item.object_description" style="width:183%"></el-input>
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="2" style="padding-left:48px;">
                       <el-button type="danger" icon="el-icon-delete" circle @click="deletePayTitle(index)"></el-button>
                      </el-col>
                    </el-row>
                  </el-form>
              </div>
              </div>
            </div>
             <div style="color:#129f77;">
              <h3>温馨提示</h3>
              <ul>
                <li>分账客体选择商户时，全称应填写具体的商户名称</li>
                <li>分账客体选择个人时，全称应填写真实的个人名称</li>
                <li>个人微信号必须要是实名认证的用户</li>
              </ul>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="innerUpdataPayVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitUpdataPay()" style="background:#129F77;border:0;">确 定</el-button>
            </span>
      </el-dialog>
    </el-dialog>
    <!-- 分账策略 -->
    <el-dialog
      title="分账策略"
      :visible.sync="sharePolicyDialogVisible"
      width="90%"
      id="policyScroll"
      :before-close="handleClose">
        <head-notice></head-notice>
         <el-card class="box-card">
           <div style="display:flex;justify-content: space-between;">
            <div>
              <el-button type="primary" @click="claim('created')">创建</el-button>
              <el-button type="primary" :disabled="claimDisabled" @click="claim('claim')">认领</el-button>
            </div>
            <div>
              <el-input placeholder="请输入内容" v-model="meId" clearable style="width:300px;"></el-input>
              <el-button type="primary" @click="selectByName()" style="margin:0 20px">名称查询</el-button>
             <el-button type="primary" style="margin-right:20px" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item >
                    <el-popover
                      placement="bottom"
                      trigger="click">
                      <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;" @click="isScroll = 'display:block;'">时段查询</el-button>
                    </el-popover>
                  </el-dropdown-item>
                  <el-dropdown-item><span @click="detailSearch()">高级查询</span></el-dropdown-item>
                 </el-dropdown-menu>
               </el-dropdown>
              </el-button>
              <el-button type="primary" @click="reset()">一键重置</el-button>
            </div>
          </div>
        </el-card>
          <!-- 表格 -->
          <el-table
            :data="tablePolicyList"
            ref="multipleTable"
            @selection-change="selectBox()"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="id"
              label="编号"
              @click="this.dialogFormVisible = true"
              >
              <template slot-scope="slotProps">
                  <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
              prop="cname"
              label="名称"
              >
            </el-table-column>
            <el-table-column
              prop="start_time"
              label="开始时间"
              >
            </el-table-column>
            <el-table-column
              prop="end_time"
              label="结束时间"
              >
            </el-table-column>
            <el-table-column
              prop="policy_entity"
              label="策略对象"
              >
              <template slot-scope="slotProps">
                <el-tag type="warning" v-show="slotProps.row.policy_entity === 'order_share'">分账</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="门店占比（%）"
              >
              <template slot-scope="slotProps">
                <span>{{(slotProps.row.object_json.store.share_value * 100).toFixed(0)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="平台占比（%）"
              >
              <template slot-scope="slotProps">
                <span>{{(slotProps.row.object_json.platform.share_value * 100).toFixed(0)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="运营占比（%）"
              >
              <template slot-scope="slotProps">
                <span>{{(slotProps.row.object_json.operator.share_value * 100).toFixed(0)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="描述"
              >
            </el-table-column>
            <el-table-column
              prop="ctime"
              label="创建时间"
              width ="160"
              >
              <template slot-scope="slotProps">
              {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
              </template>
            </el-table-column>
            <el-table-column
              prop="mtime"
              label="修改时间"
              width ="160"
              >
              <template slot-scope="slotProps">
              {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
              </template>
            </el-table-column>
            <el-table-column
              label="组织归属"
              >
              <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="220"
              >
              <template slot-scope="slotProps">
                  <div class="top">
                      <el-button type="text" size="mini" @click="editUserInfo(slotProps.row.id)">编辑</el-button>
                      <el-button type="text" size="mini" @click="deleteGoodsInfo(slotProps.row.id)" :disabled = "true">删除</el-button>
                      <el-button type="text" circle size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
                  </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizePolicyChange"
            @current-change="handleCurrentPolicyChange"
            :current-page="this.searchJson.page.page_num"
            :page-sizes="[10,15,25,50,100,200, 500]"
            :page-size="this.searchJson.page.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
          <!-- 认领和创建 -->
          <el-dialog
            :title="showTitle"
            :visible="createdDialogVisible"
            width="50%"
            class="creat_dia"
            append-to-body
            :before-close="handleInnerClose">
            <h3>组织认领
              <el-tooltip class="item" effect="light" content="温馨提示：选择商户时可点击顶层箭头符号进行确认" placement="right">
                <span class="el-icon-question" style="color:green;margin-left:5px;"></span>
              </el-tooltip>
            </h3>
            <div style="display:flex; justify-content: space-between;align-items: center;margin-left:60px;">
              <el-menu
                class="el-menu-vertical-demo"
                background-color="#fff"
                text-color="#333"
                mode="horizontal"
                menu-trigger="click"
                :unique-opened= "true"
                style="height:100%;width:20%; margin-bottom:40px; margin-left:20px;"
                >
                <!-- 默比优斯 -->
                  <el-submenu :index="item.id + ''" :key="item.id" v-for="item in treeList" id="meunList" disabled>
                    <template slot="title">
                      <span @click="write(item.id, item.cname)">{{item.cname}}</span>
                    </template>
                    <!-- 商户 -->
                    <el-submenu :index="subItem.id+''" :key="subItem.id" v-for="subItem in item.merchants" @click.native.stop="writepolicy(subItem.id, subItem.cname)">
                      <template slot="title">
                        <span>{{subItem.cname}}</span>
                      </template>
                      <!-- 子商户 -->
                      <el-submenu :index="subItems.id+''" :key="subItems.id" v-for="subItems in subItem.merchants" @click.native.stop="writepolicy(subItems.id, subItems.cname)" v-show="subItem.merchants !== undefined">
                        <template slot="title">
                          <span>{{subItems.cname}}</span>
                        </template>
                          <!-- 二级 -->
                        <el-submenu :index="subsons.id+''" :key="index" v-for="(subsons, index) in subItems.merchants" @click.native.stop="writepolicy(subsons.id, subsons.cname)" v-show="subItems.merchants !== undefined">
                          <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span @contextmenu.prevent="$refs.menu.open($event, {level: subsons.entity, orgid:subsons.id, parentId:subsons.parent_id, son: subsons})">{{subsons.cname}}</span>
                          </template>
                            <!-- 三级 -->
                            <el-submenu :index="subgrandson.id+''" :key="index" v-for="(subgrandson, index) in subsons.merchants" @click.native.stop="writepolicy(subgrandson.id, subgrandson.cname)" v-show="subsons.merchants !== undefined">
                            <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span @contextmenu.prevent="$refs.menu.open($event, {level: subgrandson.entity, orgid:subgrandson.id, parentId:subgrandson.parent_id, son: subgrandson})">{{subgrandson.cname}}</span>
                            </template>
                              <!-- 四级 -->
                              <el-submenu :index="subgrandsons.id+''" :key="index" v-for="(subgrandsons, index) in subgrandson.merchants" @click.native.stop="writepolicy(subgrandsons.id, subgrandsons.cname)" v-show="subgrandson.merchants !== undefined">
                                <template slot="title">
                                  <i class="el-icon-menu"></i>
                                  <span @contextmenu.prevent="$refs.menu.open($event, {level: subgrandsons.entity, orgid:subgrandsons.id, parentId:subgrandsons.parent_id, son: subgrandsons})">{{subgrandsons.cname}}</span>
                                </template>
                                <!-- 五级 -->
                                  <el-submenu :index="grandsons.id+''" :key="index" v-for="(grandsons, index) in subgrandsons.merchants" @click.native.stop="writepolicy(grandsons.id, grandsons.id)" v-show="subgrandsons.merchants !== undefined">
                                      <template slot="title">
                                        <i class="el-icon-menu"></i>
                                        <span @contextmenu.prevent="$refs.menu.open($event, {level: grandsons.entity, orgid:grandsons.id, parentId:grandsons.parent_id, son: grandsons})">{{grandsons.cname}}</span>
                                      </template>
                                      <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in grandsons.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)">
                                        <template slot="title">
                                          <i class="el-icon-menu"></i>
                                          <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                                        </template>
                                      </el-menu-item>
                                    </el-submenu>
                                <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subgrandsons.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)">
                                  <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                                  </template>
                                </el-menu-item>
                              </el-submenu>
                            <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subgrandson.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)">
                              <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                              </template>
                            </el-menu-item>
                          </el-submenu>
                          <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subsons.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)">
                            <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                            </template>
                          </el-menu-item>
                        </el-submenu>
                        <!-- 门店 -->
                        <el-menu-item :index="deepItems.id+''" :key="deepItems.id" v-for="deepItems in subItems.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)">
                          <template slot="title">
                            <span>{{deepItems.cname}}</span>
                          </template>
                        </el-menu-item>
                      </el-submenu>
                      <!-- 商户下直接门店 -->
                      <el-menu-item :index="deepItems.id+''" :key="deepItems.id" v-for="deepItems in subItem.stores" @click.native.stop="writepolicy(deepItems.id, deepItems.cname)" v-show="subItem.merchants === undefined">
                        <template slot="title">
                          <span>{{deepItems.cname}}</span>
                        </template>
                      </el-menu-item>
                  </el-submenu>
                </el-submenu>
              </el-menu>
              <div style="margin-bottom:40px; margin-right:160px;">
                <h4>您当前选择的是：<span style="color:#129F77">{{selectName}}</span></h4>
              </div>
            </div>
            <div  v-show="showCreated">
            <div>
                <h3>基础信息</h3>
                <el-form ref="addGoodsFormRef" :model="addPolicyForm" label-width="110px" :rules="rules" :inline="true">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="addPolicyForm.name" placeholder="请使用英文名称" style="width:112%;"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="中文名称" prop="cname">
                        <el-input v-model="addPolicyForm.cname" placeholder="请输入中文名称" disabled style="width:112%;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                  <el-col :span="12">
                      <el-form-item label="起始时间" prop="start_time">
                      <el-time-picker
                        placeholder="起始时间"
                        v-model="addPolicyForm.start_time"
                        @change="start()"
                        value-format="HH:mm:ss"
                        style="width:96%;"
                        format='HH:mm:ss'
                        >
                      </el-time-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="结束时间" prop="end_time">
                        <el-time-picker
                          placeholder="结束时间"
                          v-model="addPolicyForm.end_time"
                          @change="start()"
                          value-format="HH:mm:ss"
                          style="width:96%;"
                          format='HH:mm:ss'
                          >
                        </el-time-picker>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="策略对象">
                        <el-input v-model="addPolicyForm.policy_entity" disabled  style="width:112%;">
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="备注">
                        <el-input v-model="addPolicyForm.description" placeholder="请输入其他备注"  style="width:112%;"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                  </el-row>
                </el-form>
            </div>
            <div>
              <h3>分账配置</h3>
                <div class="pay_setting">
                  <el-row style="padding-left:50px;">
                    <el-col style="width:61%;">
                      <div>
                      <span style="width:80px;margin-top:12px;margin-right:20px;">运营方</span>
                      <el-select v-model="object_json.operator.share_type" placeholder="请选择分账策略">
                        <el-option
                          v-for="item in policyTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <el-input placeholder="请输入内容" v-model="object_json.operator.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="padding-left:50px;margin:10px 0;">
                    <el-col style="width:61%;">
                      <div>
                      <span style="width:80px;margin-top:12px;margin-right:20px;">平台方</span>
                      <el-select v-model="object_json.platform.share_type" placeholder="请选择分账策略">
                        <el-option
                          v-for="item in policyTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div >
                        <el-input placeholder="请输入" v-model="object_json.platform.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="padding-left:50px;">
                    <el-col style="width:61%;">
                      <div>
                        <span style="width:80px;margin-right:20px;">门店方</span>
                        <el-select v-model="object_json.store.share_type" placeholder="请选择分账策略">
                          <el-option
                            v-for="item in policyTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                    <div>
                        <el-input placeholder="请输入内容" v-model="object_json.store.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                </div>
            </div>
            <div style="margin-top:50px;">
              <h4 style="color:#129f77;">温馨提示：</h4>
              <ul >
                <li><p style="color:#129f77;">当前红色星号标记的为必填项</p></li>
                <li><p style="color:#129f77;">填写开始时间和结束时间时请按照hh:mm的格式</p></li>
                <li><p style="color:#129f77;">平台占比和门店占比相加的和为一百</p></li>
                <li><p style="color:#129f77; ">当前创建的中文名称由时间自动拼接而成</p></li>
              </ul>
            </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="cancleAdd()">取 消</el-button>
              <el-button type="primary" @click="addSubmit()" style="background:#129f77;border:0;">确 定</el-button>
            </span>
          </el-dialog>
            <!-- 详情页 -->
          <el-dialog
            title="详细信息"
            :visible="detailDialogVisible"
            width="50%"
            append-to-body
            :before-close="handleInnerClose">
            <policy-detail :detailList ="detailPolicyList"></policy-detail>
          </el-dialog>
           <!-- 弹框 -->
          <el-dialog title="搜索条件" :visible="dialogPolicyFormVisible" append-to-body width="70%" @close='closeDialog'>
          </el-dialog>
           <!-- 编辑页面 -->
          <el-dialog
            title="更新"
            :visible="editDialogVisible"
            width="50%"
            append-to-body
            :before-close="handdleCreatOrder">
            <div>
              <h3>基础信息</h3>
                <el-form ref="ediotGoodsFormRef" :model="editPolicysForm" label-width="110px" :rules="rules" :inline="true">
                  <el-row>
                      <el-col :span="10">
                        <el-form-item label="名称">
                          <el-input v-model="editPolicysForm.name" disabled style="width:112%;"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="中文名称" prop="cname">
                          <el-input v-model="editPolicysForm.cname" disabled style="width:112%;"></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                        <el-form-item label="开始时间" prop="start_time">
                          <el-time-picker
                                placeholder="起始时间"
                                v-model="editPolicysForm.start_time"
                                @change="editstart()"
                                style="width:96%;"
                                value-format="HH:mm:ss"
                                format='HH:mm:ss'
                                >
                              </el-time-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="结束时间" prop="end_time">
                          <el-time-picker
                            placeholder="结束时间"
                            v-model="editPolicysForm.end_time"
                              @change="editstart()"
                              style="width:96%;"
                              value-format="HH:mm:ss"
                              format='HH:mm:ss'
                            >
                          </el-time-picker>
                        </el-form-item>
                      </el-col>
                  </el-row>
                  <el-row>
                      <el-col :span="10">
                        <el-form-item label="备注">
                          <el-input v-model="editPolicysForm.description" placeholder="请输入其他备注" style="width:112%;"></el-input>
                        </el-form-item>
                      </el-col>
                  </el-row>
                </el-form>
            </div>
            <div>
              <h3>分账配置</h3>
                <div class="pay_setting">
                  <el-row style="padding-left:50px;">
                    <el-col :span="12">
                      <div>
                      <span style="width:80px;margin-top:12px;margin-right:20px;">运营方</span>
                      <el-select v-model="object_json.operator.share_type" placeholder="请选择分账策略">
                        <el-option
                          v-for="item in policyTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div>
                        <el-input placeholder="请输入内容" v-model="object_json.operator.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="padding-left:50px;margin:30px 0;">
                    <el-col :span="12">
                      <div>
                      <span style="width:80px;margin-top:12px;margin-right:20px;">平台方</span>
                      <el-select v-model="object_json.platform.share_type" placeholder="请选择分账策略">
                        <el-option
                          v-for="item in policyTypeOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                      <div >
                        <el-input placeholder="请输入" v-model="object_json.platform.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                  <el-row style="padding-left:50px;">
                    <el-col :span="12">
                      <div>
                        <span style="width:80px;margin-right:20px;">门店方</span>
                        <el-select v-model="object_json.store.share_type" placeholder="请选择分账策略">
                          <el-option
                            v-for="item in policyTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </div>
                    </el-col>
                    <el-col :span="6">
                    <div>
                        <el-input placeholder="请输入内容" v-model="object_json.store.share_value">
                          <template slot="append">%</template>
                        </el-input>
                      </div>
                    </el-col>
                  </el-row>
                </div>
            </div>
              <h4 style="color:#129f77;">温馨提示：</h4>
            <ul>
              <li><p style="color:#129f77;">当前红色星号标记的为必填项</p></li>
              <li><p style="color:#129f77;">填写开始时间和结束时间时请按照hh:mm的格式</p></li>
              <li><p style="color:#129f77;">平台占比和门店占比相加的和为一百</p></li>
              <li><p style="color:#129f77; ">当前创建的中文名称由时间自动拼接而成</p></li>
            </ul>
            <span slot="footer" class="dialog-footer">
              <el-button @click="editDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="editSubmit()">确 定</el-button>
            </span>
          </el-dialog>
    </el-dialog>
    <!-- 一键检查 -->
    <el-dialog
      title="一键检查"
      :visible.sync="inspectDialogVisible"
      width="70%"
      :before-close="handleInnerClose">
      <inspect-model :inspectArr = "inspectInfo" :inspectUser="isInspectUser" :wxType="appType" :wxStatus="appState"></inspect-model>
    </el-dialog>
    <!-- 数据订阅 -->
    <el-dialog
      title="数据订阅"
      :visible.sync="isShowOpenData"
      width="60%"
      :before-close="handleClose">
      <review-model></review-model>
    </el-dialog>
    <!-- 客服热线 -->
    <el-dialog
      title="客服热线"
      :visible.sync="onlineVisiable"
      width="30%"
      :before-close="handleClose">
      <p>平台办公热线 0755-251986666-8668</p>
      <p>平台负责联系 15601891987</p>
    </el-dialog>
    <!-- 业务状态 -->
     <el-dialog
      title="业务状态"
      :visible.sync="serviceStatesVisiable"
      width="30%"
      :before-close="handleClose">
      <div>
        <div class="status_title">
          <h3>当前业务状态</h3>
          <el-tag type="success" v-if="currentStatus === 1">开启</el-tag>
          <el-tag type="info" v-else-if="currentStatus === 2">关闭</el-tag>
          <el-tag type="warning" v-else>维护中</el-tag>
        </div>
        <div>
          <h3>操作业务状态</h3>
          <el-switch v-model="currentStatus"
            :active-value="1"
            :inactive-value="2"
            @change="PersonalPower()"
          >
          </el-switch>
        </div>
      </div>
    </el-dialog>
    <!-- 页面布局 -->
    <el-dialog
      title="页面设置"
      :visible.sync="screenVisiable"
      width="30%"
      :before-close="handleClose">
       <div class="divide"></div>
        <h3>导航显示选项</h3>
        <div>
            <div>
              <el-radio v-model="layoutmark" label="1">页面树结构</el-radio>
              <span class="el-icon-success" style="color:#129F77;" v-show="layoutmark === '1'">当前选中项</span>
            </div>
              <div style="margin:20px 0;">
                <el-radio v-model="layoutmark" label="2">页面树结构(角色标记)</el-radio>
                <span class="el-icon-success" style="color:#129F77;" v-show="layoutmark === '2'">当前选中项</span>
              </div>
              <div style="margin:20px 0;">
                <el-radio v-model="layoutmark" label="3">子页面</el-radio>
                <span class="el-icon-success" style="color:#129F77;" v-show="layoutmark === '3'">当前选中项</span>
              </div>
              <div style="margin:20px 0;">
                <el-radio v-model="layoutmark" label="4">子页面(角色标记)</el-radio>
                <span class="el-icon-success" style="color:#129F77;" v-show="layoutmark === '4'">当前选中项</span>
              </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="screenLayOut()" style="background:#129f77;border:0;">切换</el-button>
      </span>
    </el-dialog>
    <!-- 导航说明 -->
    <el-dialog
      title="导航说明"
      :visible.sync="instructionVisiable"
      width="30%"
      :before-close="handleClose">
       <div class="divide" style="margin:20px 0;">
        <el-row>
          <el-col :span="12">系统结构或图标</el-col>
           <el-col :span="12">说明</el-col>
        </el-row>
        <el-row>
          <el-col :span="12">组织层级</el-col>
           <el-col :span="12">平台·商户·子商户····门店</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><i class="el-icon-s-platform"></i></el-col>
           <el-col :span="12">平台图标</el-col>
        </el-row><el-row>
          <el-col :span="12"><i class="el-icon-s-home"></i></el-col>
           <el-col :span="12">商户商标</el-col>
        </el-row>
        <el-row>
          <el-col :span="12"><i class="el-icon-s-shop"></i></el-col>
          <el-col :span="12">门店商标</el-col>
        </el-row>
        </div>
        <el-row>
          <span style=" color:#129F77;">温馨提示：如要改变当前菜单栏的显示形式，请前往显示设置修改</span>
        </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import dataTime from '@/components/dataTime'
import inspectModel from '@/components/homeModel/inspectModel'
import reviewModel from '@/components/homeModel/dataReview'
import policyDetail from '@/components/policyModel/policyDetail'
import headNotice from './../components/notice.vue'
import payDetail from '@/components/payModel/payDetail'
import SidebarItem from '@/components/treeMenue'
import qualifyDetail from '@/components/qualifyModel/qualifyDetail'
import { regionData, CodeToText, TextToCode } from 'element-china-area-data'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { SidebarItem, dataTime, inspectModel, policyDetail, payDetail, qualifyDetail, reviewModel, headNotice },
  data () {
    return {
      showTreeMark: false,
      userPower: [],
      treeUserPower: {},
      positionExpand: [],
      instructionVisiable: false,
      expandDefault: false,
      layoutmark: '1',
      screenVisiable: false,
      newmenuVisible: false,
      rightOrgid: '',
      rightparentId: '',
      rightNext: [],
      CNList: {},
      newMenuTree: [],
      menuStyle: 'color:#56ff00',
      key: '',
      isShowPlattam: false,
      isSetting: false,
      isHightLight: false,
      currentStatus: 0,
      serviceStatesVisiable: false,
      isShowOpenData: false,
      onlineVisiable: false,
      appState: [],
      appType: [],
      isInspectUser: [],
      creatPayTypeOptions: [
        {
          value: 1,
          label: '微信公众号'
        }, {
          value: 2,
          label: '微信小程序'
        }
      ],
      inspectInfo: {},
      inspectDialogVisible: false,
      historyTotal: 0,
      isScroll: 'display:block;',
      personStart: '',
      personEnd: '',
      dialogPolicyFormVisible: false,
      modelList: {},
      historyDetail: false,
      detailPolicyList: [],
      tablePolicyList: [],
      detailDialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        start_time: [
          { required: true, message: '请输入开始时间', trigger: 'blur' }
        ],
        app_secret: [
          { required: true, message: '请输入应用密钥', trigger: 'blur' }
        ],
        end_time: [
          { required: true, message: '请输入结束时间', trigger: 'blur' }
        ],
        platform_ratio: [
          { required: true, message: '请输入平台占比', trigger: 'blur' }
        ],
        store_ratio: [
          { required: true, message: '请输入门店占比', trigger: 'blur' }
        ],
        policy_type: [
          { required: true, message: '请输入分账政策', trigger: 'blur' }
        ],
        pay_type: [
          { required: true, message: '请选择分账类型', trigger: 'blur' }
        ],
        app_type: [
          { required: true, message: '请选择应用类型', trigger: 'blur' }
        ],
        app_id: [
          { required: true, message: '请选择app_id', trigger: 'blur' }
        ],
        mch_key: [
          { required: true, message: '请输入商户编号', trigger: 'blur' }
        ],
        mch_id: [
          { required: true, message: '请输入商户密钥', trigger: 'blur' }
        ],
        object_name: [
          { required: true, message: '请选择客体方', trigger: 'blur' }
        ],
        object_cname: [
          { required: true, message: '请输入客体全称', trigger: 'blur' }
        ],
        subject_cname: [
          { required: true, message: '请输入商户名称', trigger: 'blur' }
        ],
        object_account: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        object_type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ]
      },
      showCreated: '',
      claimDisabled: true,
      selectName: '',
      selectOrgId: '',
      treeList: [],
      imgSrc: '',
      selectId: '',
      selectIdArr: [],
      showTitle: '',
      createdDialogVisible: false,
      editDialogVisible: false,
      editPolicysForm: {
      },
      addPolicyForm: {
        payMain: '',
        name: '',
        cname: '',
        start_time: '',
        end_time: '',
        platform_ratio: '',
        store_ratio: '',
        policy_type: '',
        description: '',
        policy_entity: 'share'
      },
      object_json: {
        operator: {
          share_type: '',
          share_value: ''
        },
        platform: {
          share_type: '',
          share_value: ''
        },
        store: {
          share_type: '',
          share_value: ''
        }
      },
      policyTypeOptions: [{
        value: 'ratio',
        label: '比例'
      }],
      sharePolicyDialogVisible: false,
      editPayId: '',
      editPayOrder: {},
      innerUpdataPayVisible: false,
      order_object_list: {
        payTitle: []
      },
      order_subject_info: {},
      innerCreateVisible: false,
      creatPayOptions: [
        {
          value: 1,
          label: '微信支付'
        }
      ],
      creatPayType: [
        {
          value: 'MERCHANT_ID',
          label: '商户'
        }, {
          value: 'PERSONAL_WECHATID',
          label: '个人'
        }
      ],
      creatPayOrder: {},
      payDetailList: [],
      innerPayVisible: false,
      meId: '',
      paytotal: 0,
      paytableList: [],
      payMainOptions: [
        {
          value: 'store',
          label: '门店方'
        }, {
          value: 'platform',
          label: '平台方'
        }, {
          value: 'operator',
          label: '运营方'
        }
      ],
      realpayTitle: '',
      payMainArr: [],
      contactImgList: [],
      cashierImgList: [],
      headImgList: [],
      cardImgList: [],
      indoorImgList: [],
      licenseImgList: [],
      saleImgList: [],
      qualityImgList: [],
      detailtitle: '查看详情',
      detailList: [],
      deatilDialogVisible: false,
      tableList: [],
      qualificationinnerVisible: false,
      // shangchuan测试
      checkActive: '0',
      payDialogVisible: false,
      historyList: [],
      historyDialogVisible: false,
      isCollapse: false,
      cloudShow: false,
      passWordForm: {
        old: '',
        new: '',
        sure: ''
      },
      updataOrgForm: {
        region: '',
        country: '中国',
        address: '',
        province: '',
        district: '',
        city: '',
        cname: ''
      },
      qualificationForm: {
        name: '',
        biz_type: '',
        goods_biz_license_img_url: '',
        goods_biz_license_img_url_logo: '',
        goods_biz_license_start_time: '',
        goods_biz_license_end_time: '',
        biz_op_quality_gsp_certificate_img_url: '',
        biz_op_quality_gsp_certificate_img_url_logo: '',
        biz_op_quality_gsp_certificate_start_time: '',
        biz_op_quality_gsp_certificate_end_time: '',
        biz_license_img_url: '',
        // 上传图片的临时路径
        biz_license_img_url_logo: '',
        biz_license_start_time: '',
        biz_license_end_time: '',
        biz_scope: '',
        industry_type: '',
        legal_person_name: '',
        legal_idcard_no: '',
        legal_idcard_hold_img_url: '',
        legal_idcard_hold_img_url_logo: '',
        store_headdoor_img_url: '',
        store_headdoor_img_url_logo: '',
        store_indoor_img_url: '',
        store_indoor_img_url_logo: '',
        store_cashier_img_url: '',
        store_cashier_img_url_logo: '',
        store_biz_contact: '',
        store_biz_contact_logo: '',
        org_id: ''
      },
      selectedOptions: [],
      region: [
        {
          value: '华东',
          label: '华东'
        }, {
          value: '华南',
          label: '华南',
          disabled: true
        }, {
          value: '华北',
          label: '华北'
        }, {
          value: '东北',
          label: '东北'
        }, {
          value: '西南',
          label: '西南'
        }, {
          value: '西北',
          label: '西北'
        }, {
          value: '华中',
          label: '华中'
        }, {
          value: '台湾',
          label: '台湾'
        }, {
          value: '香港特别行政区',
          label: '香港特别行政区'
        }, {
          value: '澳门特别行政区',
          label: '澳门特别行政区'
        }
      ],
      options: regionData,
      ManagementDialogVisible: false,
      priviteDialogVisible: false,
      userInfo: {},
      active: '',
      readDialogVisible: false,
      updataDialogVisible: false,
      title: '',
      userId: '',
      rightList: {
        create_next: '',
        read_current: '',
        update_current: '',
        user_manage: '',
        qualification_manager: '',
        delete_current: '',
        share_manager: '',
        pay_manager: ''
      },
      rightMenu: false,
      change: 'true',
      userForm: {
        value: '',
        resource: ''
      },
      orgid: 1,
      parentId: '',
      mark: '',
      level: '',
      width: '300px',
      activeIndex: '1',
      navList: [],
      userlist: [],
      showpersonal: [],
      powerList: [],
      currentList: [],
      menuVisible: false,
      dialogVisible: false,
      userDialogVisible: false,
      qualificationDialogVisible: false,
      asideWidth: '250',
      form: {
        id: '',
        name: '',
        cname: '',
        describe: '',
        address: '',
        country: '中国',
        region: '',
        province: '',
        city: '',
        district: ''
      },
      currentfloor: '',
      total: 0,
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      },
      historydouble: false,
      qualifyOptions: [
        {
          value: '零售业',
          label: '零售业'
        },
        {
          value: '制造业',
          label: '制造业'
        }
      ],
      merchantOptions: [
        {
          value: 1,
          label: '企业商户'
        },
        {
          value: 2,
          label: '个体商户'
        }
      ]
    }
  },
  created () {
    this.showPersonal()
    this.getZW()
    this.positionExpand = window.localStorage.getItem('positionMenu') === null ? [1] : JSON.parse(window.localStorage.getItem('positionMenu'))
    this.layoutmark = window.localStorage.getItem('layout') === null ? this.layoutmark : window.localStorage.getItem('layout')
    if (this.layoutmark === '1') {
      this.getNewTree()
    } else if (this.layoutmark === '2') {
      this.showTreeMark = true
      this.getNewTree()
    } else if (this.layoutmark === '3') {
      let id = window.localStorage.getItem('markeid')
      this.screenLayOutChange(id)
    } else {
      this.showTreeMark = true
      let id = window.localStorage.getItem('markeid')
      this.screenLayOutChange(id)
    }
    this.active = window.localStorage.getItem('active')
    this.key = window.localStorage.getItem('menuKey')
  },
  mounted () {
    this.dragControllerDiv()
    document.onkeydown = function (e) {
      var key = window.event.keyCode
      if (key === 13) {
        return false
      }
    }
    document.querySelector('#policyScroll').addEventListener('scroll', this.getScroll)
    document.querySelector('#historyoperate').addEventListener('scroll', this.getScroll)
    document.addEventListener('click', () => {
      this.isSetting = false
    })
  },
  methods: {
    dragControllerDiv: function () {
      let resize = document.getElementById('resize')
      let left = document.getElementById('aside')
      let right = document.getElementById('mainContent')
      let box = document.getElementById('box')
      resize.onmousedown = function (e) {
        let startX = e.clientX
        resize.left = resize.offsetLeft
        document.onmousemove = function (e) {
          let endX = e.clientX
          let moveLen = resize.left + (endX - startX)
          let maxT = box.clientWidth - resize.offsetWidth
          if (moveLen < 150) moveLen = 240
          if (moveLen > maxT - 800) moveLen = maxT - 800
          resize.style.left = moveLen
          left.style.width = moveLen + 'px'
          right.style.width = (box.clientWidth - moveLen - 5) + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          resize.releaseCapture && resize.releaseCapture()
        }
        resize.setCapture && resize.setCapture()
        return false
      }
    },
    userInstruction () {
      this.instructionVisiable = true
    },
    openDetails (row, column, event) {
      if (event.cellIndex !== 0) {
        this.$refs.multipleTable.toggleRowExpansion(row)
      }
    },
    doubleClick (id, parentId) {
      this.screenLayOutChange(id)
    },
    screenLayOut () {
      window.localStorage.setItem('layout', this.layoutmark)
      window.localStorage.setItem('markeid', this.orgid)
      this.screenLayOutChange(this.orgid)
    },
    async screenLayOutChange (id) {
      if (this.layoutmark === '3') {
        this.showTreeMark = false
        this.newMenuTree = []
        const temp = []
        const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_orgtree_inc', { org_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        res.ret_data.current['children'] = res.ret_data.children
        temp.push(res.ret_data.current)
        if (res.ret_data.parent === undefined || res.ret_data.parent === null) {
          this.newMenuTree = temp
        } else {
          res.ret_data.parent['children'] = temp
          this.newMenuTree.push(res.ret_data.parent)
        }
      } else if (this.layoutmark === '2') {
        this.showTreeMark = true
      } else if (this.layoutmark === '4') {
        this.showTreeMark = true
        this.newMenuTree = []
        const temp = []
        const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_orgtree_inc', { org_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        res.ret_data.current['children'] = res.ret_data.children
        temp.push(res.ret_data.current)
        if (res.ret_data.parent === undefined || res.ret_data.parent === null) {
          this.newMenuTree = temp
        } else {
          res.ret_data.parent['children'] = temp
          this.newMenuTree.push(res.ret_data.parent)
        }
      } else {
        this.showTreeMark = false
        this.getNewTree()
      }
      this.expandDefault = true
      this.screenVisiable = false
    },
    screenSetting () {
      this.screenVisiable = true
    },
    handleNode (data) {
      this.write(data.id, data.entity, data.cname)
    },
    clickRight (event, data) {
      this.rightList = {
        create_next: '',
        read_current: '',
        update_current: '',
        user_manage: '',
        qualification_manager: '',
        delete_current: '',
        share_manager: '',
        pay_manager: ''
      }
      this.newmenuVisible = true
      let menu = document.querySelector('#RML')
      menu.style.left = event.clientX + 26 + 'px'
      menu.style.top = event.clientY - 10 + 'px'
      document.addEventListener('click', this.foo)// 监听整个页面  点击其他地方执行foo
      this.level = data.entity
      this.rightOrgid = data.id
      this.rightparentId = data.parentId
      this.rightNext = data.children
      this.rightClick(data.id, data.parent_id, data.entity)
    },
    foo () {
      this.newmenuVisible = false
      document.removeEventListener('click', this.foo)
    },
    // 获取新组织树
    async getNewTree () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_orgtree_all', { }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (!this.isShowPlattam) {
        this.newMenuTree = res.ret_data[0].children
      } else {
        this.newMenuTree = res.ret_data
      }
    },
    // selectStores (key) {
    //   this.key = key
    //   window.localStorage.setItem('menuKey', key)
    // },
    uploadUserImage () {
      this.$message.warning('头像功能正在开发中')
    },
    async PersonalPower () {
      if (this.currentStatus === 1) {
        const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'biz_status_enable', { org_id: this.orgid }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getCurrentServiceStatus(this.orgid)
        } else {
          this.$message.success('开启成功')
        }
      } else if (this.currentStatus === 2) {
        const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'biz_status_disable', { org_id: this.orgid }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getCurrentServiceStatus(this.orgid)
        } else {
          this.$message.success('关闭成功')
        }
      }
    },
    // 业务状态
    serviceStates () {
      // this.orgid = this.rightOrgid
      this.getCurrentServiceStatus(this.rightOrgid)
    },
    // 获取当前业务状态
    async getCurrentServiceStatus (id) {
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'query_biz_status', { org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
          this.$router.push({
            path: '/login'
          })
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.currentStatus = res.ret_data.status
        this.serviceStatesVisiable = true
      }
    },
    openDataReview () {
      this.isShowOpenData = true
    },
    online () {
      this.onlineVisiable = true
    },
    // 一键检查
    async inspect () {
      this.appType = []
      this.appState = []
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'unified_biz_check', { org_id: this.orgid }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.inspectInfo = res.ret_data
        this.getPower(this.orgid)
        res.ret_data.pays.list.forEach(item => {
          this.appType.push(item.app_type)
          this.appState.push(item.status)
        })
        this.inspectDialogVisible = true
      }
    },
    selfCheck () {
      this.orgid = this.rightOrgid
    },
    resetHistory () {
      this.searchJson.filter = []
      if (this.historydouble === true) {
        this.getAllOperation()
      } else {
        this.operateHistory(this.orgid)
      }
    },
    getCurrentHistoryData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      if (this.historydouble === true) {
        this.getAllOperation()
      } else {
        this.operateHistory(this.orgid)
      }
    },
    getScroll () {
      this.isScroll = 'display:none;'
    },
    resetPay () {
      this.searchJson.filter = []
      this.getALLPayInfo(this.orgid)
    },
    // 按照时间搜索
    getCurrentData (start, end) {
      this.searchJson.filter = []
      var arr = [start, end]
      let obj = {
        'key': 'ctime',
        'op': 'between',
        'value': arr
      }
      this.searchJson.filter.push(obj)
      this.getALLPayInfo(this.orgid)
      this.getAllDataPolicy(this.orgid)
    },
    selectpayMain () {
      this.payMainArr = [1]
    },
    // 分账策略
    shareMoney () {
      this.sharePolicyDialogVisible = true
      this.getAllDataPolicy(this.rightOrgid)
      this.selectName = this.rightNext[0].cname
      this.orgid = this.rightOrgid
    },
    // 关闭高级查询框
    closeDialog () {
      this.dialogPolicyFormVisible = false
    },
    // 高级策略搜索条件
    async detailSearch () {
      this.dialogPolicyFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'list_schema', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.modelList = res.ret_data
      }
    },
    // 高级策略搜索条件detailPaySearch
    async detailPaySearch () {
      this.dialogPolicyFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'list_schema', { org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.modelList = res.ret_data
      }
    },
    // 删除动态生成的表单
    deletePayTitle (index) {
      this.order_object_list.payTitle.splice(index, 1)
    },
    selectObjectPay () {
      this.order_object_list.payTitle.push(JSON.parse(JSON.stringify({
        object_name: this.order_object_list.object_name,
        object_account: '',
        object_cname: '',
        object_description: '',
        object_type: ''
      })))
    },
    // 提交创建支付
    async submitCreatPay () {
      this.order_object_list.payTitle.forEach(item => {
        if (item.object_name === this.order_subject_info.subject_name) return this.$message.error('主体名称和客体不能相同')
      })
      const subject = JSON.stringify(this.order_subject_info)
      const object = JSON.stringify(this.order_object_list.payTitle)
      this.creatPayOrder['order_subject_info'] = subject
      this.creatPayOrder['order_object_list'] = object
      this.creatPayOrder['org_id'] = this.orgid
      const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'create_one', this.creatPayOrder, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('创建成功')
        this.innerCreateVisible = false
        this.getALLPayInfo(this.orgid)
      }
    },
    // 打开编辑支付
    editPayInfo (id) {
      this.editPayId = id
      this.getPayInfoById(id)
      this.innerUpdataPayVisible = true
    },
    // 提交支付更新
    async submitUpdataPay () {
      this.order_object_list.payTitle.forEach(item => {
        if (item.object_name === this.order_subject_info.subject_name) return this.$message.error('主体名称和客体不能相同')
      })
      this.editPayOrder['order_subject_info'] = this.order_subject_info
      this.editPayOrder['order_object_list'] = this.order_object_list.payTitle
      const upstr = JSON.stringify(this.editPayOrder)
      const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'update_by_id', { id: this.editPayId, update_str: upstr }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('编辑成功')
        this.innerUpdataPayVisible = false
        this.getALLPayInfo(this.orgid)
      }
    },
    createPayList () {
      this.innerCreateVisible = true
    },
    // 主体删除
    deleteMain () {
      this.payMainArr = []
      this.order_subject_info = {
        mch_id: '',
        mch_key: '',
        subject_name: ''

      }
    },
    // 验证开关
    async checkChange (id, verify) {
      if (verify === 1) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_verify_enable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('开启验证成功')
        }
      } else if (verify === 2) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_verify_disable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('关闭验证成功')
        }
      }
    },
    handleRemovelicense () {
      this.qualificationForm.goods_biz_license_img_url_logo = ''
    },
    handleRemovequalify () {
      this.qualificationForm.biz_op_quality_gsp_certificate_img_url_logo = ''
    },
    handleRemoveSale () {
      this.qualificationForm.biz_license_img_url_logo = ''
    },
    handleRemoveCard () {
      this.qualificationForm.legal_idcard_hold_img_url_logo = ''
    },
    handleRemoveHeard () {
      this.qualificationForm.store_headdoor_img_url_logo = ''
    },
    handleRemoveStore () {
      this.qualificationForm.store_indoor_img_url_logo = ''
    },
    handleRemoveCashier () {
      this.qualificationForm.store_cashier_img_url_logo = ''
    },
    handleRemoveContact () {
      this.qualificationForm.store_biz_contact_logo = ''
    },
    // 提交签约
    async submitqualify () {
      this.qualificationForm.org_id = this.orgid
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'create_one', this.qualificationForm, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('签约成功')
        this.qualificationinnerVisible = false
      }
    },
    // 经营许可证
    handleChangelicense (file, files) {
      const _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_goods_biz_' + 'license.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_goods_biz_license', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'goods_biz_license_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'goods_biz_license_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 质量管理规范
    handleChangequalify (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_biz_' + 'op_quality_gsp_certificate.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_biz_op_quality_gsp_certificate', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'biz_op_quality_gsp_certificate_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'biz_op_quality_gsp_certificate_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 营业执照
    handleChangeSale (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_biz_' + 'license.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_biz_license', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'biz_license_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'biz_license_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 手持身份证
    handleChangeCard (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_legal_idcard_hold.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_legal_idcard_hold', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'legal_idcard_hold_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'legal_idcard_hold_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 门头照片
    handleChangeHeard (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_store_headdoor.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_store_headdoor', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'store_headdoor_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'store_headdoor_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 店内照片
    handleChangeStore (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_store_indoor.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_store_indoor', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'store_indoor_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'store_indoor_img_url_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 收银台照片
    handleChangeCashier (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_store_cashier.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_store_cashier', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'store_cashier_img_url', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'store_cashier_img_url_logo', res.data.ret_data.logo_img_url)
          this.qualificationForm.store_cashier_img_url = res.data.ret_data.raw_img_url
          this.qualificationForm.store_indoor_img_url_logo = res.data.ret_data.logo_img_url
        }).catch(() => {
        })
      }
    },
    // 合同照片
    handleChangeContact (file) {
      var _this = this
      const isJPG = (file.raw.type === 'image/jpg' || file.raw.type === 'image/jpeg' || file.raw.type === 'image/png')
      const isImage = file.raw.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let id = parseInt(this.orgid)
        let goodsImageName = 'qualifications_' + id + '_store' + '_biz_contact.jpg'
        formData.append(goodsImageName, file.raw, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_store_biz_contact', { org_id: id, resources: 'qualifications' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.$set(_this.qualificationForm, 'store_biz_contact', res.data.ret_data.raw_img_url)
          _this.$set(_this.qualificationForm, 'store_biz_contact_logo', res.data.ret_data.logo_img_url)
        }).catch(() => {
        })
      }
    },
    // 预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 提交上传
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 结束
    payMoney () {
      this.payDialogVisible = true
      this.orgid = this.rightOrgid
      this.getALLPayInfo(this.rightOrgid)
    },
    handleSizePolicyChange (val) {
      this.searchJson.page.page_size = val
      this.getAllDataPolicy(this.orgid)
    },
    handleCurrentPolicyChange (val) {
      this.searchJson.page.page_num = val
      this.getAllDataPolicy(this.orgid)
    },
    // 监听分页
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      if (this.historydouble === true) {
        this.getAllOperation()
      } else {
        this.operateHistory(this.orgid)
      }
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      if (this.historydouble === true) {
        this.getAllOperation()
      } else {
        this.operateHistory(this.orgid)
      }
    },
    qualification () {
      this.qualificationDialogVisible = true
      this.orgid = this.rightOrgid
      this.getAllqualify(this.orgid)
    },
    // 操作历史
    async operateHistory () {
      // this.searchJson.filter = []
      this.orgid = this.rightOrgid
      let id = this.rightOrgid
      this.historyDialogVisible = true
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'events', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(item => {
          if (item.meta.input) {
            item.meta['input_dict'] = item.meta.input
          } else if (item.meta.event_input) {
            item.meta['input_dict'] = item.meta.input
          }
          if (item.meta.output) {
            item.meta['ouput_dict'] = item.meta.output
          } else if (item.meta.event_output) {
            item.meta['output_dict'] = item.meta.event_output
          }
        })
        this.historyList = res.ret_data
        this.historyTotal = res.ret_total
      }
    },
    // 收缩
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
    },
    // 监听地址联动变化及转换
    handleAdressChange (arr) {
      this.updataOrgForm.province = CodeToText[arr[0]]
      this.updataOrgForm.city = CodeToText[arr[1]]
      this.updataOrgForm.district = CodeToText[arr[2]]
      this.form.province = CodeToText[arr[0]]
      this.form.city = CodeToText[arr[1]]
      this.form.district = CodeToText[arr[2]]
    },
    // control router go
    go (path) {
      const id = parseInt(window.localStorage.getItem('active'))
      this.$router.push({
        path: path,
        query: {
          org_id: id
        }
      })
    },
    // handleOpen (key, keyPath) {
    //   this.key = key
    //   window.localStorage.setItem('menuKey', key)
    // },
    // handleMenuClose (key, keyPath) {
    //   this.key = key
    //   window.localStorage.setItem('menuKey', key)
    // },
    openHistory () {
      this.historyDialogVisible = true
      this.historydouble = true
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.getAllOperation()
    },
    // dialog close
    handleClose () {
      this.instructionVisiable = false
      this.screenVisiable = false
      this.serviceStatesVisiable = false
      this.isShowOpenData = false
      this.onlineVisiable = false
      this.inspectInfo = {}
      this.ManagementDialogVisible = false
      this.priviteDialogVisible = false
      this.passWordForm = {}
      this.updataDialogVisible = false
      this.updataOrgForm = {}
      this.readDialogVisible = false
      this.sharePolicyDialogVisible = false
      this.userDialogVisible = false
      this.dialogVisible = false
      this.historyDialogVisible = false
      this.historydouble = false
      this.historyList = []
      this.qualificationDialogVisible = false
      this.qualificationForm = {}
      this.qualificationinnerVisible = false
      this.payDialogVisible = false
      this.payTitle = []
      this.payMainArr = []
      this.realpayTitle = ''
    },
    handdleCreatOrder () {
      this.innerCreateVisible = false
      this.order_subject_info = {}
      this.creatPayOrder = {}
      this.order_object_list = { payTitle: [] }
    },
    // 内层弹框关闭
    handleInnerClose () {
      this.inspectDialogVisible = false
      this.innerUpdataPayVisible = false
      this.innerPayVisible = false
      this.deatilDialogVisible = false
      this.createdDialogVisible = false
      this.editDialogVisible = false
      this.detailDialogVisible = false
      this.addPolicyForm = {}
      this.order_object_list.payTitle = []
      this.order_subject_info = {}
      this.object_json = {
        operator: {
          share_type: '',
          share_value: ''
        },
        platform: {
          share_type: '',
          share_value: ''
        },
        store: {
          share_type: '',
          share_value: ''
        }
      }
      this.saleImgList = []
      this.licenseImgList = []
      this.qualityImgList = []
      this.headImgList = []
      this.cardImgList = []
      this.indoorImgList = []
      this.contactImgLi = []
      this.cashierImgList = []
    },
    // 查看本层
    async readCurrent () {
      this.readDialogVisible = true
      this.getOrgInfoById(this.rightOrgid)
    },
    // 更新回显
    async getOrgInfoById (id) {
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.currentList = res.ret_data.rows
        let newAdr = []
        this.selectedOptions = []
        res.ret_data.rows.forEach(item => {
          this.updataOrgForm = item
          newAdr.push(item.province)
          newAdr.push(item.city)
          newAdr.push(item.district)
        })
        if (newAdr[0] !== null && newAdr[1] !== null && newAdr[2] !== null) {
          this.selectedOptions.push(TextToCode[newAdr[0]].code)
          this.selectedOptions.push(TextToCode[newAdr[0]][newAdr[1]].code)
          this.selectedOptions.push(TextToCode[newAdr[0]][newAdr[1]][newAdr[2]].code)
        }
      }
    },
    // change password
    async changePassword () {
      const params = {
        old_password: this.passWordForm.old,
        new_password: this.passWordForm.new,
        double_password: this.passWordForm.sure
      }
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'reset_password', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
      }
    },
    // 更新本层
    updataCurrent () {
      this.orgid = this.rightOrgid
      this.getOrgInfoById(this.rightOrgid)
      this.updataDialogVisible = true
    },
    // 个人中心
    personalSpace () {
      this.priviteDialogVisible = true
      this.getUserInfo()
    },
    writepolicy (oid, name) {
      this.orgid = oid
      this.selectName = name
    },
    // 点击组织树菜单
    async write (id, currentfloor, cname) {
      this.positionExpand = []
      this.positionExpand.push(id)
      window.localStorage.setItem('positionMenu', JSON.stringify(this.positionExpand))
      let path = window.location.hash.split('?')[0].substring(1)
      if (path !== '/error') {
        window.localStorage.setItem('isError', path)
      }
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'query_page_authority', { org_id: id, page_func: 'test' }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_data.allow === true && res.ret_code === 0) {
        this.currentfloor = currentfloor
        const active = id + ''
        // this.positionExpand = []
        // this.positionExpand.push(id)
        // window.localStorage.setItem('positionMenu', JSON.stringify(this.positionExpand))
        window.localStorage.setItem('active', active)
        window.localStorage.setItem('cname', cname)
        this.orgid = id
        window.localStorage.setItem('active', this.orgid)
        // eslint-disable-next-line
        // if (this.key == this.orgid)
        this.$router.push(
          {
            path: window.localStorage.getItem('isError'),
            query: { org_id: id, cname: cname }
          }
        )
      } else {
        this.$router.push(
          {
            path: '/error'
          }
        )
      }
    },
    // 创建下层
    onClick () {
      this.orgid = this.rightOrgid
      this.parentId = this.rightparentId
      this.dialogVisible = true
      if (this.level === 'merchant') {
        this.rightNext.forEach(item => {
          if (item.merchants === undefined && item.stores !== undefined) {
            this.level = 'store'
          } else if (item.merchants !== undefined && item.stores === undefined) {
            this.level = 'platform'
          } else {
            this.level = 'merchant'
          }
        })
      }
    },
    // 登出
    async logout () {
      const url = 'https://api-atm-test.mobius.org.cn/logout'
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
      this.delCookie()
      this.$router.push('/')
    },
    delCookie () {
      var keys = document.cookie.match(/[^ =;]+(?==)/g)
      if (keys) {
        for (var i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString() // 清除当前域名下的
          document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString() // 清除当前域名下的
          document.cookie = keys[i] + '=0;path=/;domain=.mobius.org.cn;expires=' + new Date(0).toUTCString() // 清除一级域名下的或指定的
        }
      }
    },
    // 获取所有用户
    async getAllUser () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_all_users', '', accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.userlist = res.ret_data.rows
      }
    },
    // 提交更新
    async updataOrg (id) {
      const updateStr = JSON.stringify(this.updataOrgForm)
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'update_info', { org_id: this.orgid, update_str: updateStr }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
        this.updataDialogVisible = false
        this.getNewTree()
      }
    },
    async submitMessage () {
      if (this.form.mark === undefined) return this.$message.error('请选择类型')
      const _this = this
      const params = {
        name: this.form.name,
        cname: this.form.cname,
        description: this.form.describe,
        org_id: parseInt(this.orgid),
        address: this.form.address,
        country: '中国',
        region: this.form.region,
        province: this.form.province,
        city: this.form.city,
        district: this.form.district
      }
      if (this.level === 'platform') {
        if (this.parentId === '1') {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'create_submerchant', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            _this.orgid = res.ret_data.id
            this.getNewTree()
            this.form = {}
          }
        } else {
          const url = genRequestGetUrl(apiUrl, 'platforms', accessKeyId, 'create_merchant', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            _this.orgid = res.ret_data.id
            this.getNewTree()
          }
        }
      } else if (this.level === 'store') {
        const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'create_store', params, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          _this.orgid = res.ret_data.id
          this.getNewTree()
          this.form = {}
        }
      } else if (this.level === 'merchant') {
        if (this.form.mark === '商户') {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'create_submerchant', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            _this.orgid = res.ret_data.id
            this.getNewTree()
            this.form = {}
          }
        } else {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'create_store', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            _this.orgid = res.ret_data.id
            this.getNewTree()
            this.form = {}
          }
        }
      }
      this.dialogVisible = false
    },
    // 查看支付管理详情
    showPayDetail (id) {
      this.getPayInfoById(id)
      this.innerPayVisible = true
    },
    // 用户管理
    divideRole () {
      this.enyity = this.level
      this.orgid = this.rightOrgid
      this.parentId = this.rightparentId
      this.userDialogVisible = true
      this.getAllUser()
      this.getPower(this.orgid)
    },
    // 注销本层
    async deleteRole () {
      let entity = this.level
      let orgid = this.rightOrgid
      this.parentId = this.rightparentId
      const confirmResult = await this.$confirm('此操作将进行注销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      if (entity === 'merchant') {
        if (parseInt(this.parentId) === 1) {
          const url = genRequestGetUrl(apiUrl, 'platforms', accessKeyId, 'remove_merchant', { org_id: orgid }, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('删除成功')
          }
        } else {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'remove_submerchant', { org_id: orgid }, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('删除成功')
          }
        }
      } else if (entity === 'store') {
        const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'remove_store', { org_id: orgid }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('删除成功')
        }
      }
      this.getNewTree()
    },
    // 获取权限
    async getPower (orgid) {
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'get_users', { org_id: orgid }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.powerList = res.ret_data
        if (this.inspectInfo) {
          this.isInspectUser = []
          let arr = []
          this.inspectInfo.members.forEach(item => {
            arr.push(item.user.cname)
          })
          let powerArr = []
          this.powerList.forEach(item => {
            powerArr.push(item.user.cname)
          })
          arr.forEach(item => {
            if (powerArr.indexOf(item) !== -1) {
              this.isInspectUser.push(item)
            }
          })
        }
      }
    },
    // 解绑1
    async handleUnbind (userId, cname) {
      const params = {
        unbind_user_id: userId,
        org_id: this.orgid
      }
      const confirmResult = await this.$confirm('此操作将进行解绑, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      if (this.enyity === 'merchant') {
        if (cname === '管理') {
          if (parseInt(this.parentId) === 1) {
            const url = genRequestGetUrl(apiUrl, 'platforms', accessKeyId, 'unbind_merchant_admin', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('解绑成功')
          } else {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'unbind_submerchant_admin', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('解绑成功')
          }
        } else if (cname === '运营') {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'unbind_merchant_opsrv', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('解绑成功')
        } else {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'unbind_merchant_finance', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('解绑成功')
        }
      } else if (this.enyity === 'store') {
        if (cname === '运营') {
          const url = genRequestGetUrl(apiUrl, 'stores', accessKeyId, 'unbind_store_opsrv', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('解绑成功')
        } else if (cname === '财务') {
          const url = genRequestGetUrl(apiUrl, 'stores', accessKeyId, 'unbind_store_finance', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('解绑成功')
        } else if (cname === '管理') {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'unbind_store_admin', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('解绑成功')
        }
      }
      this.getPower(this.orgid)
    },
    // 绑定1
    async sureDo () {
      if (this.userForm.resource === undefined) return this.$message.error('请选择类型')
      const _this = this
      const params = {
        bind_user_id: parseInt(this.userForm.value),
        org_id: parseInt(this.orgid)
      }
      if (this.enyity === 'merchant') {
        // 父id为1  说明上一级为平台
        if (parseInt(this.parentId) === 1) {
          if (this.userForm.resource === '管理员') {
            const url = genRequestGetUrl(apiUrl, 'platforms', accessKeyId, 'bind_merchant_admin', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
          } else if (this.userForm.resource === '运营') {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_merchant_opsrv', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
            this.userForm = {}
          } else {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_merchant_finance', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
            this.userForm = {}
          }
        } else {
          if (this.userForm.resource === '管理员') {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_submerchant_admin', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
          } else if (this.userForm.resource === '运营') {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_merchant_opsrv', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
            this.userForm = {}
          } else {
            const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_merchant_finance', params, accessKeySecret)
            const { data: res } = await this.$http.get(url)
            if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            this.$message.success('绑定成功')
            _this.orgid = res.ret_data.id
            this.userForm = {}
          }
        }
      } else if (this.enyity === 'store') {
        if (this.userForm.resource && this.userForm.resource === '运营') {
          const url = genRequestGetUrl(apiUrl, 'stores', accessKeyId, 'bind_store_opsrv', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('绑定成功')
          _this.orgid = res.ret_data.id
          this.userForm = {}
        } else if (this.userForm.resource && this.userForm.resource === '管理员') {
          const url = genRequestGetUrl(apiUrl, 'merchants', accessKeyId, 'bind_store_admin', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('绑定成功')
          _this.orgid = res.ret_data.id
        } else if (this.userForm.resource && this.userForm.resource === '财务') {
          const url = genRequestGetUrl(apiUrl, 'stores', accessKeyId, 'bind_store_finance', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.$message.success('绑定成功')
          _this.orgid = res.ret_data.id
          this.userForm = {}
        }
      }
      this.userDialogVisible = false
    },
    // 个人中心
    async showPersonal () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_user_all_org', '', accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.showPersonal = res.ret_data
        var obj = {}
        res.ret_data.forEach(item => {
          if (!obj[item.org.cname]) {
            obj[item.org.cname] = item.role.cname
          }
          obj[item.org.cname] += item.role.cname
          this.userId = item.user.id
          if (item.role.entity === 'platform' && item.role.name === 'admin') {
            this.cloudShow = true
            this.isShowPlattam = true
          }
          // 个人中心分类
          this.treeUserPower[item.org.name] === undefined ? this.treeUserPower[item.org.name] = {
            id: item.org.id,
            power: item.role.cname,
            cname: item.org.cname,
            entity: item.role.entity
          } : this.treeUserPower[item.org.name]['elpower'] = item.role.cname
        })
        for (let k in this.treeUserPower) {
          this.userPower.push(this.treeUserPower[k])
        }
      }
    },
    // 右键弹框显示优化
    async rightClick (id, parid, level) {
      // 第一步：判断当前所在层
      const url = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'get_users', { org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      let isAdmin = false
      let isUser = false
      if (res.ret_code === 0) {
        res.ret_data.forEach(item => {
          if (item.user.id === parseInt(this.userId)) {
            isUser = true
            if (item.role.name === 'admin') {
              isAdmin = true
            }
          }
        })
      }
      if (isAdmin) {
        if (level !== 'store') {
          this.rightList['create_next'] = '创建下层'
        }
        this.rightList['read_current'] = '查看本层'
        this.rightList['update_current'] = '更新本层'
        this.rightList['user_manage'] = '用户管理'
        this.rightList['qualification_manager'] = '资质管理'
        this.rightList['pay_manager'] = '支付管理'
        this.rightList['share_manager'] = '分账策略'
      } else if (isUser) {
        this.rightList['read_current'] = '查看本层'
      }
      // 第二步：判断上一层
      const eurl = genRequestGetUrl(apiUrl, 'orgs', accessKeyId, 'get_users', { org_id: parid }, accessKeySecret)
      const { data: result } = await this.$http.get(eurl)
      isAdmin = false
      isUser = false
      if (result.ret_code === 0) {
        result.ret_data.forEach(item => {
          if (item.user.id === parseInt(this.userId)) {
            isUser = true
            if (item.role.name === 'admin') {
              isAdmin = true
            }
          }
        })
      }
      if (isAdmin) {
        this.rightList['read_current'] = '查看本层'
        this.rightList['user_manage'] = '用户管理'
        this.rightList['delete_current'] = '注销本层'
      } else if (isUser) {
      }
    },
    // 获取用户个人信息
    async getUserInfo () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_user_info', '', accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.userInfo = res.ret_data.user
      }
    },
    // 获取操作列表
    async getAllOperation () {
      this.historyTotal = 0
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'events', accessKeyId, 'list_items_by_user', { 'search_str': searchStr }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(item => {
          if (item.meta.input) {
            item.meta['input_dict'] = item.meta.input
          } else if (item.meta.event_input) {
            item.meta['input_dict'] = item.meta.input
          }
          if (item.meta.output) {
            item.meta['ouput_dict'] = item.meta.output
          } else if (item.meta.event_output) {
            item.meta['output_dict'] = item.meta.event_output
          }
        })
        this.historyList = res.ret_data
        this.historyTotal = res.ret_total
      }
    },
    // 查询所有资质管理学信息
    async getAllqualify (id) {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.tableList = res.ret_data
        this.total = res.ret_total
      }
    },
    readCurrentDetail (id) {
      this.deatilDialogVisible = true
      this.selectQualifyById(id)
    },
    // 根据id查找信息
    async selectQualifyById (id) {
      const url = genRequestGetUrl(apiUrl, 'qualifications', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data.rows
        this.saleImgList.push(res.ret_data.rows[0].biz_license_img_url)
        this.licenseImgList.push(res.ret_data.rows[0].goods_biz_license_img_url)
        this.qualityImgList.push(res.ret_data.rows[0].biz_op_quality_gsp_certificate_img_url)
        this.headImgList.push(res.ret_data.rows[0].store_headdoor_img_url)
        this.cardImgList.push(res.ret_data.rows[0].legal_idcard_hold_img_url)
        this.indoorImgList.push(res.ret_data.rows[0].store_indoor_img_url)
        this.contactImgList.push(res.ret_data.rows[0].store_biz_contact)
        this.cashierImgList.push(res.ret_data.rows[0].store_cashier_img_url)
        this.qualificationForm = res.ret_data.rows[0]
      }
    },
    // 编辑资质
    editQualify (id) {
      this.qualificationForm = {}
      this.qualificationinnerVisible = true
      if (id !== undefined) {
        this.selectQualifyById(id)
      }
    },
    // 获取全部支付信息
    async getALLPayInfo (id) {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.paytableList = res.ret_data
        this.paytotal = res.ret_total
      }
    },
    // 根据id查找支付信息
    async getPayInfoById (id) {
      const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.payDetailList = res.ret_data.rows
        this.editPayOrder = res.ret_data.rows[0]
        this.order_subject_info = res.ret_data.rows[0].order_subject_info
        this.payMainArr = [1]
        this.order_object_list.payTitle = res.ret_data.rows[0].order_object_list
      }
    },
    // 支付开关1
    async payStatusChange (status, id) {
      if (status === 1) {
        const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'biz_status_enable', { pay_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getALLPayInfo(this.orgid)
        } else {
          this.$message.success('开启成功')
        }
      } else if (status === 2) {
        const url = genRequestGetUrl(apiUrl, 'pays', accessKeyId, 'biz_status_disable', { pay_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getALLPayInfo(this.orgid)
        } else {
          this.$message.success('关闭成功')
        }
      }
    },
    // 获取所有策略
    async getAllDataPolicy (id) {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.tablePolicyList = res.ret_data
        this.total = res.ret_total
      }
    },
    // 一键重置
    reset () {
      this.searchJson.filter = []
      this.getAllDataPolicy(this.orgid)
    },
    // 查看策略详情
    async showDetail (id) {
      this.detailDialogVisible = true
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailPolicyList = res.ret_data.rows
      }
    },
    // 根据id查找
    async selectbyId (id) {
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.rows.forEach(item => {
          item.object_json.operator['share_value'] = (item.object_json.operator.share_value * 100).toFixed(0)
          item.object_json.platform['share_value'] = (item.object_json.platform.share_value * 100).toFixed(0)
          item.object_json.store['share_value'] = (item.object_json.store.share_value * 100).toFixed(0)
          this.editPolicysForm = item
          this.object_json = item.object_json
        })
      }
    },
    // 取消创建
    cancleAdd () {
      this.createdDialogVisible = false
      this.innerCreateVisible = false
      this.creatPayOrder = {}
      this.editPayOrder = {}
      this.order_subject_info = {}
      this.order_object_list = { payTitle: [] }
      this.payMainArr = []
      this.addPolicyForm = {}
      this.object_json = {
        operator: {
          share_type: '',
          share_value: ''
        },
        platform: {
          share_type: '',
          share_value: ''
        },
        store: {
          share_type: '',
          share_value: ''
        }
      }
    },
    // 提交编辑
    async editSubmit () {
      const id = this.editPolicysForm.id
      const objectJson = {
        operator: {
          share_type: this.object_json.operator.share_type,
          share_value: (this.object_json.operator.share_value / 100).toFixed(2)
        },
        platform: {
          share_type: this.object_json.platform.share_type,
          share_value: (this.object_json.platform.share_value / 100).toFixed(2)
        },
        store: {
          share_type: this.object_json.store.share_type,
          share_value: (this.object_json.store.share_value / 100).toFixed(2)
        }
      }
      const params = {
        description: this.editPolicysForm.description,
        end_time: this.editPolicysForm.end_time,
        start_time: this.editPolicysForm.start_time,
        object_json: objectJson
      }
      const editStr = JSON.stringify(params)
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'update_by_id', { 'update_str': editStr, id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
        // this.getAllDataPolicy(this.get)
        this.editDialogVisible = false
      }
    },
    // /提交创建和认领
    async addSubmit () {
      const objectJson = {
        operator: {
          share_type: this.object_json.operator.share_type,
          share_value: (this.object_json.operator.share_value / 100).toFixed(2)
        },
        platform: {
          share_type: this.object_json.platform.share_type,
          share_value: (this.object_json.platform.share_value / 100).toFixed(2)
        },
        store: {
          share_type: this.object_json.store.share_type,
          share_value: (this.object_json.store.share_value / 100).toFixed(2)
        }
      }
      const objectStr = JSON.stringify(objectJson)
      if (this.showCreated === true) {
        if (this.addPolicyForm.org_id === '') return this.$message.error('请选择认领的组织')
        const params = {
          name: this.addPolicyForm.name,
          cname: this.addPolicyForm.cname,
          start_time: this.addPolicyForm.start_time,
          end_time: this.addPolicyForm.end_time,
          object_json: objectStr,
          description: this.addPolicyForm.description,
          policy_entity: 'share',
          org_id: this.orgid
        }
        const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'create_one', params, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('添加成功')
          this.getAllDataPolicy(this.orgid)
          this.createdDialogVisible = false
        }
      } else {
        this.selectIdArr.forEach(async item => {
          var params = {
            policy_id: parseInt(item),
            org_id: this.selectOrgId
          }
          const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'bind_org', params, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('认领成功')
          }
        })
        this.createdDialogVisible = false
        this.getAllDataPolicy(this.orgid)
      }
    },
    // 创建认领弹框
    claim (str) {
      this.createdDialogVisible = true
      this.getNewTree()
      if (str === 'created') {
        this.showCreated = true
        this.showTitle = '创建'
      } else {
        this.showCreated = false
        this.showTitle = '认领'
      }
    },
    start () {
      this.addPolicyForm.cname = this.addPolicyForm.start_time.split(':').splice(0, 2).join('') + '-' + this.addPolicyForm.end_time.split(':').splice(0, 2).join('')
    },
    editstart () {
      this.editPolicysForm.cname = this.editPolicysForm.start_time.split(':').splice(0, 2).join('') + '-' + this.editPolicysForm.end_time.split(':').splice(0, 2).join('')
    },
    // 监听表格单选框
    selectBox () {
      if (this.$refs.multipleTable.selection.length !== 0) {
        this.selectIdArr = []
        this.$refs.multipleTable.selection.forEach(item => {
          this.selectIdArr.push(item.id)
        })
        this.claimDisabled = false
      } else {
        this.claimDisabled = true
      }
    },
    // 编辑获取数据
    editUserInfo (id) {
      this.editDialogVisible = true
      this.selectbyId(id)
    },
    showSetting () {
      this.isSetting = true
    },
    // 获取操作历史转译
    async getZW () {
      const url = genRequestGetUrl(apiUrl, 'actions', accessKeyId, 'list_map', { resources_list: 'all' }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.CNList = res.ret_data
      }
    }
  }
}
</script>
<style>
.el-menu--popup{
  min-width: 100px!important;
}
.el-main{
  padding-top:10px!important;
}
.el-popover {
  padding: 0!important;
  border:0!important;
}
.el-menu--vertical .el-submenu__title {
  height: 30px!important;
  line-height: 30px!important;
}
.el-submenu .el-menu-item{
  height: 30px!important;
  line-height: 30px!important;
}
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
  color:#129F77!important;
}
</style>
<style  scoped>
#resize{
    position: relative;
    width:5px;
    min-height: 700px;
    /* background: pink; */
    cursor: w-resize;
    float:left;
  }
.divide >>> .el-col{
  border: 1px solid  #129F77;
  /* background: #129F77; */
  color: #129F77;
  height: 44px;
  line-height:44px;
  text-align: center;
  font-size: 16px;
}
.divide >>> .el-col i{
  font-size: 16px;
  color:#129F77;
}
/* test */
.mlist .menu__item {
    display: block;
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }
.mlist .menu {
  /* height: 100px; */
  width: 120px;
  position: absolute;
  padding: 0px;
  /* border-radius: 10px; */
  z-index: 99999;
  border: 1px solid #999999;
  background-color: #f4f4f4;
}
.mlist .menu li:hover {
  background-color: #129F77;
  color: white;
}
.mlist .menu li{
  line-height: 1.5;
  padding: 0 10px;
}
.mlist .menu li >>> button{
  border:0;
  outline: 0;
  background: transparent;
  padding-left:10px;
  font-size: 14px;
}
/* test */
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
}
.el-menu--vertical .el-menu-item, .el-menu--vertical .el-submenu__title{
  height: 30px!important;
  line-height: 30px!important;
}
.box-card >>> .el-button.is-disabled, .box-card >>>  .el-button.is-disabled:focus, .box-card >>>  .el-button.is-disabled:hover{
  color: #fff;
  cursor: not-allowed;
  background-image: none;
  background-color: #ccc;
  border-color: #EBEEF5;
}
.copyright{
  width: 400px;
  height: 100px;
  margin: 100px  auto;
}
.copyright div{
  font-size: 14px;
  color:#aaa;
  margin: 20px 0;
}
.home-con{
  height: 100%;
  padding: 0 10px;
}
.header{
  height: 60px;
  line-height: 60px;
  background: #129F77;
}
.contact{
  width: 35px;
  height: 35px;
  padding: 5px;
  text-align: center;
  border-radius: 50%;
  background: #129f77;
  position: fixed;
  font-size: 14px;
  line-height: 21px;
  bottom: 10px;
  right: 50px;
  cursor: pointer;
}
.contact_con{
  background: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  border: 0;
  width: 43px;
  height: 43px;
  overflow: hidden;
  position: fixed;
  bottom: 63px;
  right: 52px;
  z-index: 9999999;
  text-align: center;
}
a:hover{
  text-decoration: underline!important;
  color: #67c23a!important;
}
.header >>> .el-menu{
  background: #444;
}
 .home-con >>>.el-menu--collapse .el-menu .el-submenu, .home-con >>> .el-menu--popup{
  min-width: 100px!important;
}
.home-main >>> .el-menu-item, .home-main >>> .el-submenu__title{
  height: 40px;
  line-height: 40px;
}
.logo{
  display: flex;
}
.logo,.loginout{
  color:#eee;
  font-weight: 700;
}
.loginout{
  text-align: right;
  padding:10px 20px 0 0;
}
.loginout >>> .el-popper {
  margin-top: -17px;
}
.el-aside{
  min-height: 700px;
  /* max-height: 100vh; */
  display: flex;
  position: relative;
  overflow: hidden;
}
 #slide{
  float: right;
  width: 10px;
  background: #ccc;
  height: 855px;
  z-index: 999;
  cursor: pointer;
}
/* .el-aside >>> .el-menu{
  position: relative;
  height: 100%;
  border-right: 0;
  flex:1;
} */
.logo_col{
  overflow: hidden;
  box-sizing: border-box;
}
.home-main{
  width: 100%;
  margin-top: 10px;
}
.el-main{
  box-sizing: border-box;
  padding:0 -1px 20px 15px;
  min-height: 865px;
  flex: 1;
}
.toggle{
 color:#fff;
 cursor: pointer;
 position:absolute;
 bottom:0px;
 height:28px;
 width: 100%;
 display: flex;
 line-height: 28px;
 background:#fff;
 color:#ccc;
}
.man_con{
position:absolute;
 bottom:28px;
 min-width: 130px;
 /* padding-left:6px; */
 height:52px;
 background: #fff;
 border: 1px solid #eee;
 border-radius: 2px;
}
.man_con li span{
  font-size: 12px;
  display: block;
}
.man_con ul, .man_con li{
  margin: 0;
  padding: 0;
}
.man_con li{
  padding: 5px 0 5px 6px;
}
.man_con li:hover{
  background: #eee;
}
.toggle_content{
  width:50%;
  padding: 0 5px;
}
.space_man{
  text-align: left;
}
.space_man span{
  font-size: 12px;
}
.toggle_sca{
  text-align: right;
}
.toggle i{
  font-style: normal;
}
.detail_his{
  float: right;
  margin-right: 4%;
  background: #129f77;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  font-size: 12px;
  color: #fff;
}
.creat_dia >>> .el-dialog__body{
  padding-left: 70px;
  padding-top: 0;
}
.history_des >>> .el-col{
  border: 1px solid #eee;
  padding-left: 8px;
}
.ceeate_pay >>> .el-dialog__body{
  padding-right: 0!important;
  padding-left:40px!important;
}
</style>

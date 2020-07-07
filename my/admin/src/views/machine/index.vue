<template>
    <div>
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
                      <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;"  @click="isScroll = 'display:block;'">时段查询</el-button>
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
          :data="tableList"
          ref="multipleTable"
          @selection-change="selectBox()"
          class="show_table"
          style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="70"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showMachineDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="cname"
            label="名称"
            width="130"
            >
          </el-table-column>
          <el-table-column
            prop="sn"
            label="序列号"
            width="150"
            >
          </el-table-column>
          <el-table-column
            label="二维码"
            width="80"
            >
             <template slot-scope="slotProps">
              <el-image
              v-show="slotProps.row.qr_code_image_url_logo"
                class="er_wei"
                :src="slotProps.row.qr_code_image_url_logo"
                :preview-src-list="[slotProps.row.qr_code_image_url]">
              </el-image>
            </template>
          </el-table-column>
           <el-table-column
            prop="address"
            label="地址"
            width="100"
            >
            <template slot-scope="slotProps">
              <el-popover
                placement="top-start"
                width="10"
                trigger="hover"
              >
                <div style="padding:5px;">
                  {{slotProps.row.address}}
                </div>
                <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column
            width="100"
            prop="status"
            label="业务状态"
            >
            <template slot-scope="slotProps">
             <el-switch v-model="slotProps.row.status"
                :active-value="1"
                :inactive-value="2"
                @change="PersonalPower(slotProps.row.id, slotProps.row.status,  slotProps.row.org.id, 'status')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="verify"
            label="是否开启验证"
            width="120"
            >
            <template slot-scope="slotProps">
             <el-switch v-model="slotProps.row.verify"
                :active-value="1"
                :inactive-value="2"
                @change="PersonalPower(slotProps.row.id, slotProps.row.verify, slotProps.row.org.id, 'verify')"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            prop="ctime"
            label="创建时间"
            width="180"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            prop="mtime"
            label="修改时间"
            width="160"
            >
             <template slot-scope="slotProps">
            {{slotProps.row.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}
            </template>
          </el-table-column>
           <el-table-column
            label="组织归属"
            width="110"
            >
             <template slot-scope="slotProps">
                <span style="color:#129f77;">{{slotProps.row.org.cname}}</span>
              </template>
          </el-table-column>
           <el-table-column
            label="操作"
            width="320"
            >
            <template slot-scope="slotProps">
            <div class="top">
                <el-button type="text" size="mini" @click="editMachineDetail(slotProps.row.id)">编辑</el-button>
                <el-button type="text" size="mini" @click="deleteMachineInfo(slotProps.row.id, slotProps.row.name)" :disabled="JSON.stringify(slotProps.row.channels_config) === '{}' ? false : true">删除</el-button>
                <el-button type="text" size="mini" @click="showMachineDetail(slotProps.row.id)">查看</el-button>
                <el-button type="text" size="mini" @click="showDetail(slotProps.row.id, slotProps.row.sn, slotProps.row.name,slotProps.row.status)">货道配置</el-button>
                <el-button type="text" size="mini" @click="uploadMachinePicture(slotProps.row.id, slotProps.row.name)">上传二维码</el-button>
                <el-button type="text" size="mini" @click="SupplyHistory(slotProps.row.id, slotProps.row.name)">补货历史</el-button>
            </div>
        </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="this.searchJson.page.page_num"
          :page-sizes="[10,15,25,50,100,200]"
          :page-size="this.searchJson.page.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination> -->
        <page-model :total="total" @sizeChange="handleSizeChange" @numChange="handleCurrentChange"></page-model>
        <!-- 弹框 -->
      <el-dialog title="搜索条件" :visible="dialogFormVisible" width="70%" @close='closeDialog'>
        <h2>搜索</h2>
        <el-form :model="modelList" :inline="true" class="select_form" ref="modelListRef" label-width="90px">
          <el-row>
            <el-col :span="8" :key="index" v-for="(item, index) in modelList">
              <el-form-item style="margin-right:34px;">
                <div style="display:flex;" class="search_add">
                  <span style="width:163px;text-align:center;">
                    <!-- {{item.comment}} -->
                    <span v-if="item.comment !== null && item.comment.length < 7">{{item.comment}}</span>
                    <el-popover
                      placement="top-start"
                      width="10"
                      trigger="hover"
                      v-else
                    >
                      <div class="name_column">
                        {{item.comment}}
                      </div>
                      <el-button slot="reference" class="el-icon-view" style="border:0"></el-button>
                    </el-popover>
                  </span>
                  <el-input placeholder="请输入内容" v-model="input[index]" clearable></el-input>
                  <el-popover
                      placement="bottom"
                      width="400"
                      style="margin-left:5px;"
                      trigger="click">
                      <el-button slot="reference">高级设置</el-button>
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="顺序">
                          <el-radio-group v-model="order[item.comment]" :value="item.id" :id="index">
                            <el-radio label="无"></el-radio>
                            <el-radio label="升序"></el-radio>
                            <el-radio label="降序"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="查询" v-show="item.type.substring(0, 3) == 'VAR'">
                          <el-radio-group  v-model="selectCondition[index]">
                            <el-radio label="模糊"></el-radio>
                            <el-radio label="精确"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-form>
                    </el-popover>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="sure()" style="background:#129f77;border:0;">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 货道详情页 -->
      <el-dialog
        title="货道配置"
        :visible="detailDialogVisible"
        width="60%"
        class="ma_detail"
        :before-close="handleaddClose">
            <h3 style=" margin:0  0 20px 40%;">机器序列号：{{machineSn}}</h3>
            <div style="display:flex;margin-right:50px;justify-content: flex-end;">
              <h4 style="cursor: pointer;" @click="isShowALLDetail()">{{isShowAll?'全部收起':'全部展开'}}</h4>
            </div>
            <div style="margin-left:80px;">
               <el-row :gutter="20" class="machine" v-for="(item, index) in 10" :key="index" :style="rowstyle" :class="{active:index === numShow}">
                  <el-col v-for="(item, num) in 10" :key="num" style="height:40px;position:relative; width:8%;padding:0;background:#129F77">
                    <div style="border-bottom:2px solid #53a54de0;text-align:center;">
                      <span style="font-size:12px;color:#fff;">货道：{{index*10 +num}}</span>
                    </div>
                    <!-- start -->
                    <el-collapse accordion v-model="activeNames">
                      <el-collapse-item :name = "index*10 +num">
                            <template slot="title">
                              <span style="color:#fff;font-size:12px;margin-left:15px;" v-show="detailArr.indexOf(index*10 +num) === -1">空货道</span>
                              <div v-for="(name, ind) in detailNameArr" :key="ind" style="white-space:nowrap;text-overflow:ellipsis;overflow:hidden;text-align:center;">
                                <span style="color:#efff00;font-size:12px;" v-show="detailArr.indexOf(index*10 +num) !== -1">{{name[index*10 +num]}}</span>
                              </div>
                            </template>
                          <div style="font-size:14px;color:#ccc;position: absolute; top:99%;left:10%;cursor: pointer;width:70px;" @click="addGoods(index*10 +num)">+点击添加</div>
                            <div class="grid-content bg-purple " @click="showScaleDetail(item.goods_id,index*10+num)" v-for="(item, indexId) in detailList" :key="indexId" style="position: absolute;z-index:999;background:#fff">
                            <div v-if="item.goods_channel_no === index*10 +num" style="width:80px;" class="show_list">
                              <span style="line-height:27px;font-size:12px;" v-show="showDrop === true"><el-button style="padding: 0 9px;" @click.stop="dropGoods(item.goods_channel_no)">掉货</el-button></span>
                              <div style="width:60px;height:23px;margin-left: 13px;">
                                <img :src="item.goods_img_url_logo" style="width:27%;">
                              </div>
                              <div style="line-height:16px;margin-top:10px;">
                                <span style="color:#129F77;margin-top:5px;font-size:12px;">{{item.goods_number}} 件，{{ JSON.stringify(item.confirm_share_json) == '{}' || !item.confirm_share_json || JSON.stringify(item.confirm_share_json) == '[]' ? '无分成' : '有分成'}}</span>
                                <span style="color:#129F77;font-size:12px;">单价：{{item.confirm_discount_unit_price}}￥</span>
                              </div>
                            </div>
                          </div>
                      </el-collapse-item>
                    </el-collapse>
                    <div></div>
                  </el-col>
                  <el-col style="height:50px;width:60px; border:0;padding:0;line-height: 40px;"><span style="font-size:12px;cursor: pointer;" @click="isShowCurrentDetail(index)">第{{index}}层 <i :class=" isShowCurrent && index === numShow?'el-icon-arrow-down':'el-icon-arrow-right'"></i></span></el-col>
                </el-row>
            </div>
        <span slot="footer" class="dialog-footer" style="padding:38px 20px 20px">.</span>
      </el-dialog>
      <!--查看 货道详情放大 -->
      <el-dialog
      width="69%"
      :visible="innerVisible"
      :before-close="handleDetailClose"
      >
        <div v-for="(item, index) in singleMessage" :key="index" style="border:1px solid #ccc; padding:10px;">
          <div class="more_header">
            货道：{{waynum}}
          </div>
          <img :src="item.goods_img_url_logo" alt="" style="width:237px;margin-left:34%;" v-show="shareShow == false">
          <div style="padding: 0 40px;line-height: 2; margin:0 0 15px 33%" v-show="change === false" >
            <el-row style="font-size:18px;">商品名称：{{item.goods_cname}}</el-row>
            <el-row style="font-size:18px;">商品库存：{{item.goods_number}}</el-row>
            <el-row style="font-size:18px;">供应单价：{{item.confirm_supply_unit_price}}￥</el-row>
            <el-row style="font-size:18px;">零售单价：{{item.confirm_retail_unit_price}}￥</el-row>
            <el-row style="font-size:18px;">优惠单价：{{item.confirm_discount_unit_price}}￥ <i class="el-icon-check" style="color:red;font-size:13px; border:1px solid red;border-radius:50%; font-weight:700"></i> </el-row>
          </div>
          <div v-show="change == true && shareShow == false" style="padding: 0 30px;line-height: 2; margin-bottom:15px">
            <el-form ref="form" :model="form" label-width="90px" label-position="left">
              <el-form-item label="商品名称:">
                <el-row>{{singleGoodsFrom.goods_cname}}</el-row>
              </el-form-item>
              <el-form-item label="库存数量：" prop="goods_number">
                <el-input v-model="singleGoodsFrom.goods_number" :disabled= "updataDisabled === false ? true : false"></el-input>
              </el-form-item>
              <el-form-item label="供应单价：">
                <el-input v-model="singleGoodsFrom.confirm_supply_unit_price" :disabled= "updataDisabled === false ? true : false">
                  <template slot="append">￥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="零售单价：">
                <el-input v-model="singleGoodsFrom.confirm_retail_unit_price" :disabled= "updataDisabled === false ? true : false">
                  <template slot="append">￥</template>
                </el-input>
              </el-form-item>
              <el-form-item label="优惠单价：">
                <el-input v-model="singleGoodsFrom.confirm_discount_unit_price" :disabled= "updataDisabled === false ? true : false">
                  <template slot="append">￥</template>
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <div v-show="shareShow === true">
            <h3>分账配置</h3>
            <div style="margin-left:7%;">
              <el-select v-model="selectPolicy" placeholder="请选择" @change="changeStatic()">
                <el-option
                  v-for="(item, index) in policyList"
                  :key="index"
                  :label="item.cname"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" icon="el-icon-plus" circle style="margin-left:30px;border:0; outline:0;" @click="addDetailPolicy()" :disabled="buttonDisable"></el-button>
            </div>
            <div style="margin-top:30px;border:1px solid #ccc;padding:10px;" v-for="(item, index) in default_share_json" :key="index">
              <el-form ref="addPolicyFormRef" :model="addPolicyForm" label-width="110px" :rules="rules" :inline="true" label-position="left">
                 <el-row>
                  <el-col :span="10">
                    <el-form-item style="padding-left:16px;">
                      <span style="margin-right:30px;">时间</span>
                    <el-time-picker
                      placeholder="起始时间"
                      v-model="item.start_time"
                      value-format="HH:mm:ss"
                      format='HH:mm:ss'
                      style="width:73%;"
                      >
                    </el-time-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item>
                    <el-time-picker
                      placeholder="结束时间"
                      v-model="item.end_time"
                      value-format="HH:mm:ss"
                      format='HH:mm:ss'
                      style="margin-left:10px;width:135%;">
                    </el-time-picker>
                  </el-form-item>
                  </el-col>
                  <el-col :span="1">
                    <el-button type="danger" icon="el-icon-delete" circle  @click="deletePolicy(index)"></el-button>
                  </el-col>
                </el-row>
                <el-row style="padding-left:11px;">
                  <el-col :span="10">
                    <div>
                    <span style="width:80px;margin-top:12px;margin-right:20px;">运营方</span>
                    <el-select v-model="item.object_json.operator.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入内容" v-model="item.object_json.operator.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-left:11px;margin:15px 0;">
                  <el-col :span="10">
                    <div>
                    <span style="width:80px;margin-top:12px;margin-right:20px;">平台方</span>
                    <el-select v-model="item.object_json.platform.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入" v-model="item.object_json.platform.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-left:11px;">
                  <el-col :span="10">
                    <div>
                      <span style="width:80px;margin-right:20px;">门店方</span>
                      <el-select v-model="item.object_json.store.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入内容" v-model="item.object_json.store.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
          <el-row style="padding-left:30px; margin-top:20px;">
              <el-button type="danger" size="medium " @click="deleteSingleGoods(waynum)" style="margin-left:33%;" v-if="change === false">删除</el-button>
              <el-button type="danger" size="medium " @click="cancleAction()" style="margin-left:33%;" v-else-if="change === true">取消</el-button>
              <el-button type="warning" size="medium " @click="supplyGoods()" v-if="change === false">补货</el-button>
              <el-button type="success" size="medium " @click="share()" v-if="change === false">分成</el-button>
              <el-button type="primary" size="medium " @click="submitSingleGoods(waynum)" v-if="change === true">确定</el-button>
          </el-row>
        </div>
    </el-dialog>
    <!-- 添加货道详情框 -->
    <el-dialog :visible="addVisible" width="55%" :before-close="handleClose">
       <div style="line-height: 2; margin-bottom:15px">
            <div class="more_header">
            货道：{{waynum}}
          </div>
            <div class="add_detail">
              <el-form ref="addForm" :model="form" label-width="150px" :rules="rules">
                <el-form-item>
                  <img :src="addSingleGoodsFrom.img_url_logo" alt="" style="width:237px;margin-left:34%;">
                </el-form-item>
                <el-form-item label="货道商品名称：">
                  <el-select v-model="addSingleGoodsFrom.cname" placeholder="请选择" @change="lose()">
                    <el-option
                      v-for="(item) in selectList"
                      :key="item.id"
                      :label="item.cname"
                      :value="item.cname"
                      >
                    </el-option>
                  </el-select>
                </el-form-item>
                <h3>基础配置</h3>
                <el-form-item label="确认库存数量：" prop="goods_number">
                  <el-input v-model="addSingleGoodsFrom.goods_number"></el-input>
                </el-form-item>
                <el-form-item label="确认供应单价：" prop="default_supply_unit_price">
                  <el-input v-model="addSingleGoodsFrom.default_supply_unit_price">
                    <template slot="append">￥</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="确认零售单价：" prop="default_retail_unit_price">
                  <el-input v-model="addSingleGoodsFrom.default_retail_unit_price">
                    <template slot="append">￥</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="确认优惠单价：" prop="default_discount_unit_price">
                  <el-input v-model="addSingleGoodsFrom.default_discount_unit_price">
                    <template slot="append">￥</template>
                  </el-input>
                </el-form-item>
              </el-form>
            </div>
            <div>
              <h3>分账配置</h3>
              <div style="margin-left:15%;">
                <el-select v-model="selectPolicy" placeholder="请选择" @change="changeStatic()">
                  <el-option
                    v-for="(item, index) in policyList"
                    :key="index"
                    :label="item.cname"
                    :value="item.id">
                  </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" circle style="margin-left:30px;border:0; outline:0;" @click="addDetailPolicy()" :disabled="buttonDisable"></el-button>
              </div>
              <div style="margin-top:30px;margin-left:8%;border:1px solid #eee; padding:5px;" v-for="(item, index) in default_share_json" :key="index">
                <el-form ref="addPolicyFormRef" :model="addPolicyForm" label-width="74px" :rules="rules" :inline="true" label-position="left">
                  <el-row>
                    <el-col :span="8">
                      <el-form-item style="padding-left:15px;">
                        <span style="margin-right:30px;">时间</span>
                      <el-time-picker
                        placeholder="起始时间"
                        v-model="item.start_time"
                        value-format="HH:mm:ss"
                        format='HH:mm:ss'
                        style="width:73%;"
                        >
                      </el-time-picker>
                      </el-form-item>
                      </el-col>
                      <el-col :span="9"  style="margin-left:13px;">
                      <el-form-item label="结束时间">
                      <el-time-picker
                        placeholder="结束时间"
                        v-model="item.end_time"
                        value-format="HH:mm:ss"
                        format='HH:mm:ss'
                        >
                      </el-time-picker>
                    </el-form-item>
                    </el-col>
                    <el-col :span="1">
                      <el-button type="danger" icon="el-icon-delete" circle  @click="deletePolicy(index)"></el-button>
                    </el-col>
                  </el-row>
                <el-row style="padding-left:11px;">
                  <el-col :span="10">
                    <div>
                    <span style="width:80px;margin-top:12px;margin-right:20px;">运营方</span>
                    <el-select v-model="item.object_json.operator.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入内容" v-model="item.object_json.operator.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-left:11px;margin:15px 0;">
                  <el-col :span="10">
                    <div>
                    <span style="width:80px;margin-top:12px;margin-right:20px;">平台方</span>
                    <el-select v-model="item.object_json.platform.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入" v-model="item.object_json.platform.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-left:11px;">
                  <el-col :span="10">
                    <div>
                      <span style="width:80px;margin-right:20px;">门店方</span>
                      <el-select v-model="item.object_json.store.share_type" placeholder="请选择分账策略">
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
                      <el-input placeholder="请输入内容" v-model="item.object_json.store.share_value">
                        <template slot="append">%</template>
                      </el-input>
                    </div>
                  </el-col>
                </el-row>
                </el-form>
              </div>
            </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="sendAdd()" style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 展示机器详情 -->
    <el-dialog
      title="详情展示"
      :visible="machineDetailDialogVisible"
      width="50%"
      :before-close="handleClose">
      <div v-for="(item, index) in singleMachineList" :key="index">
        <div>
          <h3 class="all_title">基础信息</h3>
          <div style="margin-left:20px;">
            <el-row style="margin-bottom:20px;">
              <el-col :span="8">中文名称：{{item.cname}}</el-col>
              <el-col :span="8">业务状态：
                <el-tag type="success"  v-show="item.status === 1">启用</el-tag>
                <el-tag type="info" v-show="item.status === 2">关闭</el-tag>
                <el-tag v-show="item.status === 3">维护中</el-tag>
              </el-col>
              <el-col :span="8">创建者：{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
              <el-col :span="8">更新者：{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</el-col>
              <el-col :span="8">地址：{{item.address}}</el-col>
              <el-col :span="8">创建时间：{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</el-col>
            </el-row>
            <el-row>
              <el-col :span="8">修改时间：{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</el-col>
              <el-col :span="12">备注：{{item.description}}</el-col>
            </el-row>
          </div>
        </div>
        <div>
          <h3 class="all_title">其他信息</h3>
          <div style="margin-left:20px;">
            <el-row style="margin-bottom:20px;">
              <el-col :span="8">类型：
                <el-tag v-show="item.type === 2">有屏</el-tag>
                <el-tag type="success" v-show="item.type === 1">无屏</el-tag>
              </el-col>
              <el-col :span="8">控制类型：
                <el-tag v-show="item.control_type === 2">弹簧</el-tag>
                <el-tag type="success" v-show="item.control_type === 1">继电器</el-tag>
              </el-col>
              <el-col :span="8">验证模式：
                <el-tag v-show="item.verify === 2">关闭</el-tag>
                <el-tag type="success" v-show="item.verify === 1">开启</el-tag>
              </el-col>
            </el-row>
            <el-row style="margin-bottom:20px;">
              <el-col :span="8">机器SN：{{item.sn}}</el-col>
            </el-row>
          </div>
        </div>
        <div>
          <h3 class="all_title">相关图片</h3>
          <el-row style="margin-left:20px;">
            <img :src="item.qr_code_image_url" alt="" style="width:200px;height:200px;">
          </el-row>
        </div>
      </div>
    </el-dialog>
    <!-- 添加认领框 -->
    <el-dialog
      :title="showTitle"
      :visible="createdDialogVisible"
      class="machine_cre"
      width="50%"
      :before-close="handleClose">
        <h3>组织认领
          <el-tooltip class="item" effect="light" content="选择商户时可点击顶层箭头符号进行确认" placement="right">
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
                <el-submenu :index="subItem.id+''" :key="subItem.id" v-for="subItem in item.merchants" @click.native.stop="write(subItem.id, subItem.cname)">
                  <template slot="title">
                    <span>{{subItem.cname}}</span>
                  </template>
                  <!-- 子商户 -->
                   <el-submenu :index="subItems.id+''" :key="subItems.id" v-for="subItems in subItem.merchants" @click.native.stop="write(subItems.id, subItems.cname)" v-show="subItem.merchants !== undefined">
                    <template slot="title">
                      <span>{{subItems.cname}}</span>
                    </template>
                       <!-- 二级 -->
                    <el-submenu :index="subsons.id+''" :key="index" v-for="(subsons, index) in subItems.merchants" @click.native.stop="write(subsons.id, subsons.cname)" v-show="subItems.merchants !== undefined">
                      <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span @contextmenu.prevent="$refs.menu.open($event, {level: subsons.entity, orgid:subsons.id, parentId:subsons.parent_id, son: subsons})">{{subsons.cname}}</span>
                      </template>
                        <!-- 三级 -->
                        <el-submenu :index="subgrandson.id+''" :key="index" v-for="(subgrandson, index) in subsons.merchants" @click.native.stop="write(subgrandson.id, subgrandson.cname)" v-show="subsons.merchants !== undefined">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span @contextmenu.prevent="$refs.menu.open($event, {level: subgrandson.entity, orgid:subgrandson.id, parentId:subgrandson.parent_id, son: subgrandson})">{{subgrandson.cname}}</span>
                        </template>
                          <!-- 四级 -->
                          <el-submenu :index="subgrandsons.id+''" :key="index" v-for="(subgrandsons, index) in subgrandson.merchants" @click.native.stop="write(subgrandsons.id, subgrandsons.cname)" v-show="subgrandson.merchants !== undefined">
                            <template slot="title">
                              <i class="el-icon-menu"></i>
                              <span @contextmenu.prevent="$refs.menu.open($event, {level: subgrandsons.entity, orgid:subgrandsons.id, parentId:subgrandsons.parent_id, son: subgrandsons})">{{subgrandsons.cname}}</span>
                            </template>
                            <!-- 五级 -->
                              <el-submenu :index="grandsons.id+''" :key="index" v-for="(grandsons, index) in subgrandsons.merchants" @click.native.stop="write(grandsons.id, grandsons.cname)" v-show="subgrandsons.merchants !== undefined">
                                <template slot="title">
                                  <i class="el-icon-menu"></i>
                                  <span @contextmenu.prevent="$refs.menu.open($event, {level: grandsons.entity, orgid:grandsons.id, parentId:grandsons.parent_id, son: grandsons})">{{grandsons.cname}}</span>
                                </template>
                                <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in grandsons.stores" @click.native.stop="write(deepItems.id, deepItems.cname)">
                                  <template slot="title">
                                    <i class="el-icon-menu"></i>
                                    <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                                  </template>
                                </el-menu-item>
                              </el-submenu>
                            <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subgrandsons.stores" @click.native.stop="write(deepItems.id, deepItems.cname)">
                              <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                              </template>
                            </el-menu-item>
                          </el-submenu>
                        <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subgrandson.stores" @click.native.stop="write(deepItems.id, deepItems.cname)">
                          <template slot="title">
                            <i class="el-icon-menu"></i>
                            <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                          </template>
                        </el-menu-item>
                      </el-submenu>
                      <el-menu-item :index="deepItems.id+''" :key="index" v-for="(deepItems, index) in subsons.stores" @click.native.stop="write(deepItems.id, deepItems.cname)">
                        <template slot="title">
                          <i class="el-icon-menu"></i>
                          <span  @contextmenu.prevent="$refs.menu.open($event, {level: deepItems.entity, orgid:deepItems.id, parentId:deepItems.parent_id, son: deepItems})">{{deepItems.cname}}</span>
                        </template>
                      </el-menu-item>
                    </el-submenu>
                    <!-- 门店 -->
                    <el-menu-item :index="deepItems.id+''" :key="deepItems.id" v-for="deepItems in subItems.stores" @click.native.stop="write(deepItems.id, deepItems.cname)">
                      <template slot="title">
                        <span>{{deepItems.cname}}</span>
                      </template>
                    </el-menu-item>
                  </el-submenu>
                  <!-- 商户下直接门店 -->
                  <el-menu-item :index="deepItems.id+''" :key="deepItems.id" v-for="deepItems in subItem.stores" @click.native.stop="write(deepItems.id, deepItems.cname)" v-show="subItem.merchants === undefined">
                    <template slot="title">
                      <span>{{deepItems.cname}}</span>
                    </template>
                  </el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
          <div style="margin-bottom:40px; margin-right:184px;">
            <h4>您当前选择的是：<span style="color:#129F77">{{selectName}}</span></h4>
          </div>
        </div>
        <div  v-show="showCreated">
            <h3>基本配置 </h3>
          <el-form ref="addMachinesFormRef" :model="addMachinesForm" label-width="110px" :rules="rules" :inline="true">
            <el-row>
              <el-col :span="12">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="addMachinesForm.name" placeholder="请输入英文名称"></el-input>
                </el-form-item>
              </el-col>
               <el-col :span="12">
                 <el-form-item label="中文名称" prop="cname">
                  <el-input v-model="addMachinesForm.cname" placeholder="请输入中文名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
             <el-row>
               <el-col :span="12">
                  <el-form-item label="序列号" prop="sn">
                    <el-input v-model="addMachinesForm.sn" placeholder="请输入机器序列号"></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="地址" prop="address">
                    <el-input v-model="addMachinesForm.address" placeholder="请输入详细地址"></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型" >
                  <el-select v-model="addMachinesForm.type" placeholder="请选择" disabled style="width:94%;">
                  <el-option
                    v-for="(item, index) in machineType"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="控制类型">
                  <el-select v-model="addMachinesForm.type" placeholder="请选择" disabled style="width:94%;">
                  <el-option
                    v-for="(item, index) in machineControlType"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注">
                  <el-input v-model="addMachinesForm.description" placeholder="请输入其他描述"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div>
           <h3 style="color:#129f77;">温馨提示</h3>
           <ul style="padding:0 15px;">
              <li><p style="color:#129f77;">温馨提示：当前红色星号标记的为必填项</p></li>
            </ul>
        </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createdDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSubmit()" style="background:#129f77;border:0;">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 上传 -->
    <el-dialog
      title="更新图片"
      :visible="uploadDialogVisible"
      width="30%"
      :before-close="handleUploadClose">
        <div style="display:flex;justify-content: space-between;">
          <!-- <div class="current_pic">
            <h3 style="margin-bottom:5px;">当前图片</h3>
            <img :src="imgSrc" alt="" style="width:150px;margin-top:50px;">
          </div> -->
          <div>
            <h3 style="margin-bottom:55px;">上传图片</h3>
            <el-upload
                :action="uploadURL"
                ref="newupload"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :before-upload="beforeAvatarUpload"
                :on-change="changeUpload"
                :auto-upload="false"
                :with-credentials="true"
                :limit="1"
                list-type="picture">
              <el-button size="small" type="primary" style="background:#129f77;border:0;">选取文件</el-button>
              <div slot="tip" class="el-upload__tip">提示：只能上传jpg/png/jpeg文件，且不超过512KB</div>
            </el-upload>
          </div>
        </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadPIcture" style="background:#129f77;border:0;">确定上传</el-button>
      </span>
    </el-dialog>
    <!-- 编辑机器详情框 -->
    <el-dialog
        title="更新"
        :visible="editDialogVisible"
        class="machine_cre"
        width="50%"
        :before-close="handleClose"
      >
        <h3>基本配置</h3>
        <el-form ref="editMachineFormRef" :model="editMachineForm" label-width="110px" :rules="rules" :inline="true">
          <el-row>
            <el-col :span="12">
              <el-form-item label="名称">
                <el-input v-model="editMachineForm.name" disabled></el-input>
              </el-form-item>
            </el-col>
             <el-col :span="12">
              <el-form-item label="中文名称" prop="cname">
                <el-input v-model="editMachineForm.cname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
             <el-col :span="12">
               <el-form-item label="机器序列号" prop="sn">
                  <el-input v-model="editMachineForm.sn" disabled></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="12">
               <el-form-item label="地址" prop="address">
                  <el-input v-model="editMachineForm.address"></el-input>
                </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
               <el-form-item label="类型">
                <el-select v-model="editMachineForm.type" placeholder="请选择" disabled style="width:94%;">
                  <el-option
                    v-for="item in machineType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
          </el-form-item>
            </el-col>
            <el-col :span="12">
               <el-form-item label="控制类型">
                <el-select v-model="editMachineForm.type" placeholder="请选择" disabled style="width:94%;">
                  <el-option
                    v-for="item in machineControlType"
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
              <el-form-item label="备注">
                <el-input v-model="editMachineForm.description"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <div>
           <h3 style="color:#129f77;">温馨提示</h3>
           <ul style="padding:0 15px;">
              <li><p style="color:#129f77;">温馨提示：当前红色星号标记的为必填项</p></li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 补货历史界面 -->
    <el-dialog
      v-loading="loading"
      :visible.sync="supplyDialogVisible" element-loading-text="正在加载中"
      element-loading-background="rgba(0,0,0,.3)"
      width="80%"
      :before-close="handleClose">
      <h3 style="color:#129F77">补货历史界面</h3>
       <el-table
          :data="supplytableList"
          style="width: 100%">
          <el-table-column
            prop="id"
            label="编号"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showSupplyDetail(slotProps.row.id)" style="cursor: pointer;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="operator"
            label="操作人">
          </el-table-column>
          <el-table-column
            prop="machine_cname"
            label="机器名称"
            >
          </el-table-column>
           <el-table-column
            prop="channel_num"
            label="货道号"
            >
          </el-table-column>
           <el-table-column
            prop="machine_id"
            label="机器编号"
            >
          </el-table-column>
          <el-table-column
            prop="goods_cname"
            label="商品名"
            >
          </el-table-column>
          <el-table-column
            prop="diff_goods_num"
            label="补货量（个）">
            <template slot-scope="slotProps">
              <span style="color:red" v-show="slotProps.row.diff_goods_num < 0">{{slotProps.row.diff_goods_num}}</span>
              <span style="color:#129f77" v-show="slotProps.row.diff_goods_num >= 0">{{slotProps.row.diff_goods_num}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="merchant"
            label="商户">
          </el-table-column>
          <el-table-column
            prop="store"
            label="门店"
            width ="160"
          >
          </el-table-column>
          <el-table-column
            prop="mtime"
            label="创建时间"
            width ="160"
            >
            <template slot-scope="slotProps">
            {{slotProps.row.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}
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
            >
            <template slot-scope="slotProps">
            <div class="top">
            <el-button type="text" size="mini" @click="showSupplyDetail(slotProps.row.id)">详情</el-button>
            </div>
          </template>
          </el-table-column>
      </el-table>
      <el-pagination
          @size-change="handleSizeChangeSupply"
          @current-change="handleCurrentChangeSupply"
          :current-page="this.searchJson.page.page_num"
          :page-sizes="[10,15,25,50,100,200, 500, 1000]"
          :page-size="this.searchJson.page.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="supplyTotal">
      </el-pagination>
        <el-dialog
        title="详细信息"
        :visible="detailSupplyDialogVisible"
        append-to-body
        width="54%"
        :before-close="handleInnerClose">
          <div v-for="(item, index) in detailSupplyList" :key="index">
             <el-row :gutter="20">
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>编号:</p>
                  <p style="margin-left:15px">{{item.id}}</p>
                </div>
              </el-col>
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>机器名称:</p>
                  <p style="margin-left:15px">{{item.machine_cname}}</p>
                </div>
              </el-col>
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>商品名称:</p>
                  <p style="margin-left:15px">{{item.goods_cname}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>平台:</p>
                  <p style="margin-left:15px">{{item.platform}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>商户:</p>
                  <p style="margin-left:15px">{{item.merchant}}</p>
                </div>
              </el-col>
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>门店:</p>
                  <p style="margin-left:15px">{{item.store}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>货道号:</p>
                  <p style="margin-left:15px">{{item.channel_num}}</p>
                </div>
              </el-col>
              <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>操作人:</p>
                  <p style="margin-left:15px">{{ item.operator }}</p>
                </div>
              </el-col>
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>补货数量:</p>
                  <p style="margin-left:15px;color:green;" v-show="item.diff_goods_num >= 0">{{ item.diff_goods_num }}</p>
                  <p style="margin-left:15px;color:red;" v-show="item.diff_goods_num < 0">{{ item.diff_goods_num }}</p>
                </div>
              </el-col>
            </el-row>
            <el-row style="border-bottom:1px solid #ccc;margin-bottom:10px;">
               <el-col :span="8">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>创建时间:</p>
                  <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                </div>
              </el-col>
              <el-col :span="10">
                <div class="grid-content bg-purple" style="display: flex;">
                  <p>备注:</p>
                  <p style="margin-left:15px">{{item.description}}</p>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="4">补货前后对比</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">补货前</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">补货后</div></el-col>
            </el-row>
            <el-row style="margin: 20px 0;">
              <el-col :span="4">确认供应单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_supply_unit_price.pre === null? '--': item.confirm_supply_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_supply_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row>
              <el-col :span="4">确认活动单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_discount_unit_price.pre === null? '--': item.confirm_discount_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_discount_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row style="margin: 20px 0;">
              <el-col :span="4">确认零售单价</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">{{ item.confirm_retail_unit_price.pre === null? '--': item.confirm_retail_unit_price.pre + '￥'}}</div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">{{item.confirm_retail_unit_price.new}}￥</div></el-col>
            </el-row>
             <el-row>
              <el-col :span="4">确认分成策略</el-col>
              <el-col :span="10"><div class="grid-content bg-purple">
                  <div style="background:#1E1E1E;color:#C48A72;width:80%;overflow:auto;">
                    <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{item.confirm_share_json.pre}}</pre>
                  </div>
                </div></el-col>
              <el-col :span="10"><div class="grid-content bg-purple-light">
                  <div style="background:#1E1E1E;color:#C48A72;width:80%;overflow:auto;">
                  <pre style="font-size:14px; margin-left:40%;transform: translateX(-50%)">{{item.confirm_share_json.new}}</pre>
                </div>
                </div></el-col>
            </el-row>
          </div>
      </el-dialog>
    </el-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import headNotice from './../../components/notice.vue'
import dataTime from '@/components/dataTime'
// import supplyPart from '@/components/machineModel/supplyModel'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id

export default {
  components: { pageModel, headNotice, dataTime },
  data () {
    return {
      loading: false,
      isScroll: 'display:block;',
      detailSupplyDialogVisible: false,
      detailSupplyList: [],
      supplyId: '',
      supplytableList: [],
      supplyDialogVisible: false,
      showPersonal: [],
      personStart: '',
      personEnd: '',
      showDrop: false,
      machineName: '',
      uploadId: '',
      uploadURL: 'https://jsonplaceholder.typicode.com/posts/',
      uploadDialogVisible: false,
      policyTypeOptions: [{
        value: 'ratio',
        label: '比例'
      }],
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
      detailNameArr: [],
      detailArr: [],
      numShow: -1,
      rowstyle: '',
      isShowAll: false,
      isShowCurrent: false,
      activeNames: [],
      shareShow: false,
      default_share_json: [],
      addPolicyForm: {},
      buttonDisable: false,
      policyNum: [],
      selectPolicy: '',
      policyList: [],
      switchValue: true,
      machineType: [{
        value: 1,
        label: '无屏'
      }, {
        value: 2,
        label: '有屏'
      }
      ],
      beneficiaryOption: [{
        value: 1,
        label: '默比'
      }, {
        value: 2,
        label: '福物'
      },
      {
        value: 2,
        label: '前金院'
      }
      ],
      machineControlType: [{
        value: 1,
        label: '继电器'
      }, {
        value: 2,
        label: '弹簧'
      }
      ],
      isDisabled: '',
      updataDisabled: '',
      editDialogVisible: false,
      editMachineForm: {},
      singleMachineList: [],
      selectOrgId: '',
      selectName: '',
      addMachinesForm: {
        name: '',
        cname: '',
        address: '',
        control_type: 1,
        type: 1,
        description: '',
        beneficiary: 1,
        sn: ''
      },
      treeList: [],
      createdDialogVisible: false,
      claimDisabled: true,
      orgId: '',
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ],
        sn: [
          { required: true, message: '请输入地址', trigger: 'blur' }
        ]
      },
      selectId: '',
      addSingleGoodsFrom: {
        goods_number: ''
      },
      addVisible: false,
      selectList: [],
      singleGoodsFrom: {},
      waynum: '', // 货道号
      change: false, // 控制添加和更新状态
      name: '', // 输入机器编号名称
      machineId: '',
      singleMessage: [], // 点击放大药品信息
      innerVisible: false, // 内层弹框显示
      detailList: [], // 外层弹框数据
      detailDialogVisible: false, // 外层弹框显示
      machineDetailDialogVisible: false,
      // 输入框集合
      input: {
        id: '',
        name: '',
        cname: '',
        ctime: '',
        default_discount_unit_price: '',
        default_retail_unit_price: '',
        default_share_ratio: '',
        default_supply_unit_price: '',
        deleted: '',
        norms: '',
        status: '',
        type: ''
      },
      // 顺序
      order: {},
      // 查询条件
      selectCondition: {
        'op': 'like'
      },
      value1: true,
      dialogFormVisible: false,
      modelList: { }, // 高级搜索条件
      tableList: [], // table数据
      total: 0,
      meId: '', // 搜索id
      form: {
        resource: ''
      },
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      },
      showCreated: '',
      showTitle: '',
      updataId: '',
      selectIdArr: [],
      selectGoodsId: '',
      machineSn: '',
      supplyTotal: 0
    }
  },
  created () {
    this.getAllDataMachines()
    this.selectName = window.localStorage.getItem('cname')
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    getScroll () {
      this.isScroll = 'display:none;'
    },
    handleInnerClose () {
      this.detailSupplyDialogVisible = false
    },
    showSupplyDetail (id) {
      this.detailSupplyDialogVisible = true
      this.getSingleSupplyDetail(id)
    },
    // 补货历史
    SupplyHistory (id, name) {
      this.supplyDialogVisible = true
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
      this.supplyId = id
      this.getAllSupplyHistory(id)
    },
    async getSingleSupplyDetail (id) {
      // this.detailDialogVisible = true
      const url = genRequestGetUrl(apiUrl, 'supplements', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailSupplyList = res.ret_data.rows
      }
    },
    async getAllSupplyHistory (id) {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'query_supplements_by_id', { 'search_str': searchStr, id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.supplytableList = res.ret_data.rows
        this.supplyTotal = res.ret_total
      }
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
      this.getAllDataMachines()
    },
    async dropGoods (id) {
      const params = {
        machine_sn: this.machineSn,
        channel_num: id
      }
      const url = genRequestGetUrl(apiUrl, 'iots', accessKeyId, 'drop_goods', params, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('调货成功')
      }
    },
    handleUploadClose () {
      this.uploadDialogVisible = false
      this.$refs.newupload.clearFiles()
    },
    changeUpload (file) {
    },
    uploadPIcture (context) {
      this.$refs.newupload.submit()
      this.uploadDialogVisible = false
    },
    // 上传图片前的判断
    beforeAvatarUpload (file) {
      const _this = this
      const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png')
      const isImage = file.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      if (isImage && isJPG) {
        let formData = new FormData()
        let machineImageName = 'machines_' + this.uploadId + '_' + this.machineName + '.jpg'
        formData.append(machineImageName, file, machineImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_qr_code_image_url', { id: this.uploadId, resources: 'machines' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.getAllDataMachines()
        }).catch(() => {
        })
      }
    },
    handleRemove (file, fileList) {
    },
    beforeRemove (file, fileList) {
    },
    uploadMachinePicture (id, name) {
      this.machineName = name
      this.uploadId = id
      this.uploadDialogVisible = true
    },
    // goods detail show all
    isShowALLDetail () {
      this.activeNames = []
      var _this = this
      if (this.isShowAll) {
        _this.rowstyle = ''
        _this.activeNames = []
        _this.isShowAll = false
      } else {
        for (let index = 0; index < 100; index++) {
          _this.activeNames.push(index)
        }
        this.rowstyle = 'height:140px;'
        _this.isShowAll = true
      }
    },
    // goods detail show current
    isShowCurrentDetail (num) {
      this.activeNames = []
      var _this = this
      if (this.isShowCurrent && num === this.numShow) {
        _this.activeNames = []
        this.numShow = -1
        _this.isShowCurrent = false
      } else {
        this.numShow = num
        for (let index = num * 10; index < num * 10 + 10; index++) {
          _this.activeNames.push(index)
        }
        this.isShowCurrent = true
      }
    },
    cancleAction () {
      this.change = false
      this.shareShow = false
    },
    // 创建下拉框发生变化
    changeStatic () {
      this.buttonDisable = false
    },
    // 创建页面添加按钮
    addDetailPolicy () {
      if (this.selectPolicy === '') return this.$message.error('请先选择要操作的选项')
      let id = parseInt(this.selectPolicy)
      this.selectPolicybyId(id)
      this.selectTitle = this.selectPolicy
      this.buttonDisable = true
    },
    // 创建页面删除按钮
    deletePolicy (index) {
      this.policyNum.splice(index, 1)
      this.default_share_json.splice(index, 1)
    },
    // 创建和认领机器
    async addSubmit () {
      if (this.showCreated === true) {
        this.addMachinesForm['org_id'] = this.orgId
        if (this.addMachinesForm.org_id === '') return this.$message.error('请选择认领的组织')
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'create_one', this.addMachinesForm, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('创建成功')
          this.getAllDataMachines()
          this.createdDialogVisible = false
        }
      } else {
        this.selectIdArr.forEach(async item => {
          var params = {
            machine_id: parseInt(item.id),
            org_id: this.selectOrgId,
            name: item.name
          }
          const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'bind_org', params, accessKeySecret)
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
        this.getAllDataMachines()
      }
    },
    share () {
      this.change = true
      this.shareShow = true
      this.updataDisabled = false
    },
    // 业务状态开关1
    async statusChange (id, status) {
      if (status === 1) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_status_enable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getAllDataMachines()
        } else {
          this.$message.success('开启成功')
        }
      } else if (status === 2) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_status_disable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getAllDataMachines()
        } else {
          this.$message.success('关闭成功')
        }
      }
    },
    // 验证开关1
    async checkChange (id, verify) {
      if (verify === 1) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_verify_enable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getAllDataMachines()
        } else {
          this.$message.success('开启成功')
        }
      } else if (verify === 2) {
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'biz_verify_disable', { machine_id: id }, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          this.getAllDataMachines()
        } else {
          this.$message.success('关闭成功')
        }
      }
    },
    // 下拉药品
    lose () {
      this.selectList.forEach(item => {
        if (item.cname === this.addSingleGoodsFrom.cname) {
          this.selectId = item.id
        }
      })
      this.selectMedicineById(this.selectId)
    },
    supplyGoods () {
      this.change = true
      this.shareShow = false
      this.updataDisabled = true
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllDataMachines()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllDataMachines()
    },
    handleSizeChangeSupply (val) {
      this.searchJson.page.page_size = val
      this.getAllSupplyHistory(this.supplyId)
    },
    handleCurrentChangeSupply (val) {
      this.searchJson.page.page_num = val
      this.getAllSupplyHistory(this.supplyId)
    },
    handleClose () {
      this.createdDialogVisible = false
      this.editDialogVisible = false
      this.machineDetailDialogVisible = false
      this.supplyDialogVisible = false
      this.addVisible = false
      this.default_share_json = []
      this.selectPolicy = ''
      this.addSingleGoodsFrom = {}
      this.supplytableList = []
      this.detailNameArr = []
      this.detailArr = []
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 10
        }
      }
    },
    handleaddClose () {
      this.detailDialogVisible = false
      this.default_share_json = []
    },
    handleDetailClose () {
      this.innerVisible = false
      this.change = false
      this.singleMessage = []
      this.singleGoodsFrom = {}
      this.default_share_json = []
      this.addSingleGoodsFrom = {}
      this.selectPolicy = ''
      this.shareShow = false
    },
    // 提交高级搜索
    sure () {
      this.dialogFormVisible = true
      var arr = []
      var arr1 = []
      for (let key in this.input) {
        if (this.input[key] !== '') {
          if (key === 'default_discount_unit_price' || key === 'default_retail_unit_price' || key === 'default_share_ratio' || key === 'default_supply_unit_price' || key === 'id') {
            var obj1 = {
              'key': key,
              'op': 'eq',
              'value': parseFloat(this.input[key])
            }
            arr.push(obj1)
          } else {
            var obj = {
              'key': key,
              'op': 'like',
              'value': this.input[key]
            }
            arr.push(obj)
          }
          this.searchJson.filter = [...arr, ...arr1]
        }
      }
      this.getAllDataMachines()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    // dialog关闭
    closeDialog () {
      this.dialogFormVisible = false
    },
    // 放大详情
    async showScaleDetail (id, waynum) {
      this.selectGoodsId = id
      this.getAllPolicy()
      this.waynum = waynum
      this.updataId = id
      this.singleMessage = []
      this.innerVisible = true
      this.showDetail(this.machineId, this.machineSn, this.name)
      this.detailList.forEach(item => {
        if (item.goods_channel_no === waynum) {
          if (item.confirm_share_json && item.confirm_share_json !== undefined && JSON.stringify(item.confirm_share_json) !== '{}' && JSON.stringify(item.confirm_share_json) !== '[]') {
            this.default_share_json = item.confirm_share_json.slice(0)
            this.default_share_json.forEach(items => {
              items.object_json.operator.share_value = (items.object_json.operator.share_value * 100).toFixed(0)
              items.object_json.platform.share_value = (items.object_json.platform.share_value * 100).toFixed(0)
              items.object_json.store.share_value = (items.object_json.store.share_value * 100).toFixed(0)
            })
          }
          this.singleGoodsFrom = item
          this.singleMessage.push(item)
        }
      })
    },
    // 添加药品
    async sendAdd () {
      var json = []
      if (this.default_share_json) {
        this.default_share_json.forEach(item => {
          var objson = {}
          objson['operator'] = {
            share_type: item.object_json.operator.share_type,
            share_value: (item.object_json.operator.share_value / 100).toFixed(2)
          }
          objson['platform'] = {
            share_type: item.object_json.platform.share_type,
            share_value: (item.object_json.platform.share_value / 100).toFixed(2)
          }
          objson['store'] = {
            share_type: item.object_json.store.share_type,
            share_value: (item.object_json.store.share_value / 100).toFixed(2)
          }
          json.push({
            start_time: item.start_time,
            end_time: item.end_time,
            object_json: objson
          })
        })
      }
      const confrmJson = JSON.stringify(json)
      const addParams = {
        machine_id: this.machineId,
        channel_number: this.waynum,
        goods_id: this.selectId,
        confirm_supply_unit_price: parseFloat(this.addSingleGoodsFrom.default_supply_unit_price),
        confirm_retail_unit_price: parseFloat(this.addSingleGoodsFrom.default_retail_unit_price),
        confirm_discount_unit_price: parseFloat(this.addSingleGoodsFrom.default_discount_unit_price),
        goods_number: this.addSingleGoodsFrom.goods_number,
        confirm_share_json: confrmJson
      }
      if (addParams.goods_number < 0 || addParams.goods_number % 1 !== 0) return this.$message.error('请输入正整数')
      if (addParams.confirm_share_ratio < 0 || addParams.confirm_share_ratio > 100) return this.$message.error('请输入[0,100]之间的数字')
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'bind_goods', addParams, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('添加成功')
        this.default_share_json = []
        this.addVisible = false
        this.showDetail(this.machineId, this.machineSn, this.name)
        this.selectPolicy = ''
        this.addSingleGoodsFrom = []
      }
    },
    // 添加商品时根据id完全展示该商品1
    async selectMedicineById (Medicineid) {
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'query_by_id', { id: Medicineid }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_data[0].default_share_json) {
        res.ret_data[0].default_share_json.forEach(item => {
          item.object_json.operator['share_value'] = (item.object_json.operator.share_value * 100).toFixed(0)
          item.object_json.platform['share_value'] = (item.object_json.platform.share_value * 100).toFixed(0)
          item.object_json.store['share_value'] = (item.object_json.store.share_value * 100).toFixed(0)
          this.default_share_json.push(item)
        })
      }
      this.addSingleGoodsFrom = res.ret_data[0]
    },
    // 展示机器下所属商品详情
    async showDetail (id, sn, name) {
      this.showDrop = false
      this.detailArr = []
      this.detailNameArr = []
      this.name = name
      this.machineSn = sn
      this.machineId = id
      this.detailDialogVisible = true
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'list_goods', { machine_sn: sn }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data.goods_list
        res.ret_data.goods_list.forEach(item => {
          var obj = {}
          obj[item.goods_channel_no] = item.goods_cname
          this.detailArr.push(item.goods_channel_no)
          this.detailNameArr.push(obj)
        })
        if (res.ret_data.device_info.verify === 1 && res.ret_data.device_info.status === 2) {
          this.showDrop = true
        }
      }
    },
    // 展示机器详情
    showMachineDetail (id) {
      this.searchMachine(id)
      this.machineDetailDialogVisible = true
    },
    // 更新商品
    async submitSingleGoods (id) {
      if (this.updataDisabled) {
        // 补货
        const params = {
          machine_id: this.machineId,
          channel_number: id,
          goods_id: this.updataId,
          goods_number: this.singleGoodsFrom.goods_number,
          confirm_supply_unit_price: this.singleGoodsFrom.confirm_supply_unit_price,
          confirm_retail_unit_price: this.singleGoodsFrom.confirm_retail_unit_price,
          confirm_discount_unit_price: this.singleGoodsFrom.confirm_discount_unit_price
        }
        const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'update_goods_supply', params, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) {
          if (res.ret_code === 4444) {
            this.$message.error('登录已超时，请退出重新登录')
          } else {
            this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
          }
        } else {
          this.$message.success('补货更新成功')
        }
      } else {
        var json = []
        if (this.default_share_json) {
          this.default_share_json.forEach(item => {
            var objson = {}
            objson['operator'] = {
              share_type: item.object_json.operator.share_type,
              share_value: (item.object_json.operator.share_value / 100).toFixed(2)
            }
            objson['platform'] = {
              share_type: item.object_json.platform.share_type,
              share_value: (item.object_json.platform.share_value / 100).toFixed(2)
            }
            objson['store'] = {
              share_type: item.object_json.store.share_type,
              share_value: (item.object_json.store.share_value / 100).toFixed(2)
            }
            json.push({
              start_time: item.start_time,
              end_time: item.end_time,
              object_json: objson
            })
          })
          const confrmJson = JSON.stringify(json)
          const shareParams = {
            machine_id: this.machineId,
            channel_number: id,
            goods_id: this.updataId,
            confirm_share_json: confrmJson
          }
          const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'update_goods_share', shareParams, accessKeySecret)
          const { data: res } = await this.$http.get(url)
          if (res.ret_code !== 0) {
            if (res.ret_code === 4444) {
              this.$message.error('登录已超时，请退出重新登录')
            } else {
              this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
            }
          } else {
            this.$message.success('分成更新成功')
          }
        }
      }
      this.innerVisible = false
      this.change = false
      this.shareShow = false
      this.singleGoodsFrom['confirm_share_ratio'] = this.singleGoodsFrom.confirm_share_ratio / 100
      this.showDetail(this.machineId, this.machineSn, this.name)
    },
    // 删除当前机器物品
    async deleteSingleGoods (wayId) {
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'unbind_goods', { machine_id: this.machineId, channel_number: wayId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('删除成功')
        this.innerVisible = false
        if (res.ret_code === 0) {
          this.showDetail(this.machineId, this.machineSn, this.name)
        }
      }
    },
    // 根据名称查找机器
    async selectByName () {
      if (this.meId === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.meId
      }
      this.searchJson.filter.push(obj)
      this.getAllDataMachines()
      this.searchJson.filter = []
    },
    // 根据id查找机器
    async searchMachine (id) {
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.editMachineForm = res.ret_data[0]
        this.singleMachineList = res.ret_data
        this.machineSn = res.ret_data[0].sn
      }
    },
    // 删除按钮删除机器
    async deleteMachineInfo (id, name) {
      const confirmResult = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'delete_by_id', { id: id, name: name }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('删除成功')
        this.getAllDataMachines()
      }
    },
    // 根据id查找分账策略
    async selectPolicybyId (id) {
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
          this.default_share_json.push(item)
        })
      }
    },
    // 提交编辑信息
    async editSubmit () {
      const name = this.editMachineForm.name
      const id = this.editMachineForm.id
      const updataform = {
        name: this.editMachineForm.name,
        cname: this.editMachineForm.cname,
        control_type: parseInt(this.editMachineForm.control_type),
        type: parseInt(this.editMachineForm.type),
        address: this.editMachineForm.address,
        description: this.editMachineForm.description,
        sn: this.editMachineForm.sn
      }
      const editStr = JSON.stringify(updataform)
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'update_by_id', { 'update_str': editStr, id: id, name: name }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
        this.getAllDataMachines()
        this.editDialogVisible = false
      }
    },
    // 获取编辑机器的信息
    editMachineDetail (id) {
      this.editDialogVisible = true
      this.searchMachine(id)
    },
    // 获取分账策略列表
    async getAllPolicy () {
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'policys', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.policyList = res.ret_data
      }
    },
    // 查询所有机器
    async getAllDataMachines () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active')) === 'NAN' ? 1 : parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
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
        this.loading = false
      }
    },
    // 搜索条件
    async detailSearch () {
      this.dialogFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'machines', accessKeyId, 'list_schema', { }, accessKeySecret)
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
    // 获取全部药品
    async getAllMedicineList () {
      this.orgId = parseInt(window.localStorage.getItem('active'))
      const url = await genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'list_items', { 'search_str': '{ }', org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(item => {
          this.selectList.push(item)
        })
      }
    },
    addGoods (id) {
      this.waynum = id
      this.addVisible = true
      this.getAllPolicy(id)
    },
    // 一键重置
    reset () {
      this.searchJson.filter = []
      this.getAllDataMachines()
    },
    // 监听表格change事件
    selectBox () {
      if (this.$refs.multipleTable.selection.length !== 0) {
        this.selectIdArr = []
        this.$refs.multipleTable.selection.forEach(item => {
          var obj = {
            id: item.id,
            name: item.name
          }
          this.selectIdArr.push(obj)
        })
        this.claimDisabled = false
      } else {
        this.claimDisabled = true
      }
    },
    // 认领按钮的显隐
    claim (str) {
      this.createdDialogVisible = true
      this.getNavList()
      if (str === 'created') {
        this.showCreated = true
        this.showTitle = '创建'
      } else {
        this.showCreated = false
        this.showTitle = '认领'
      }
    },
    async getNavList () {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_org_alltree', {}, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.treeList = res.ret_data[0].platforms
      }
    },
    // 获取组织org-id
    write (oid, name) {
      this.selectOrgId = oid
      this.selectName = name
    },
    // 取消创建
    cancleAdd () {
      this.createdDialogVisible = false
      this.addGoodsForm = {}
    },
    // 获取该用户所有权限
    async PersonalPower (id, status, powerId, divide) {
      const url = genRequestGetUrl(apiUrl, 'users', accessKeyId, 'get_user_all_org', '', accessKeySecret)
      const { data: reslut } = await this.$http.get(url)
      if (reslut.ret_code !== 0) {
        if (reslut.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + reslut.ret_msg)
        }
      } else {
        reslut.ret_data.forEach(item => {
          this.showPersonal.push(item.org.id)
        })
        if (divide === 'status') {
          if (this.showPersonal.indexOf(powerId) !== -1) {
            this.statusChange(id, status)
          } else {
            this.$message.warning('仅当前用户有该组织的管理权限才可操作')
            this.getAllDataMachines()
          }
        } else if (divide === 'verify') {
          if (this.showPersonal.indexOf(1) !== -1) {
            this.checkChange(id, status)
          } else {
            this.$message.warning('仅当前用户有平台的管理权限才可操作')
            this.getAllDataMachines()
          }
        }
      }
    }
  },
  computed: {
  },
  watch: {
    $route () {
      this.orgId = this.$route.query.org_id
      this.selectName = this.$route.query.cname
    },
    orgId () {
      this.getAllDataMachines()
    }
    // selectName () {
    //   this.getAllDataMachines()
    // }
  }
}
</script>
<style scoped>
.box-card >>> .el-button{
  background-color:#129F77;
  border-color: transparent;
}
.name_column{
  padding: 5px;
}
.machine_cre >>> .el-dialog__body{
  padding-left: 60px;
}
.er_wei >>> .el-image__inner{
  width: 25px;
}
.active{
  height:120px!important;
}
.search_add{
  display: flex;
}
.person_style{
  padding: 3px;
  margin-top: -35px;
  background: #129f77;
}
.person_style >>> .el-button{
  padding:6px 2px;
}
.search_add >>> .el-switch{
  width: 200px;
}
.direct_select{
  margin-left: 10px;
}
.add_detail >>> .el-form-item__label{
  text-align: left;
}
.select_form >>>.el-form-item{
  margin-bottom: 5px;
}
.select_form >>>.el-form-item:nth-child(even){
  margin-right: 50px;
  float: right;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
.machine >>> .el-col{
  border: 1px solid #ccc;
  padding: 5px;
  margin: 5px 5px;
  /* border: 3px solid #53a54de0; */
}
.machine  span{
  display: block;
  font-size: 14px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow: hidden;
}
.show_list{
  line-height: 53px;
  text-align: center;
  /* margin-top: 5px; */
  border: 1px solid #129F77;
  border-top: 0;
}
.ma_detail >>> .el-dialog__body{
  padding-top: 0;
}
.ma_detail >>> .el-dialog{
  width: 1484px;
}
.ma_detail  >>> .el-row:nth-child(1){
  margin-top:0!important;
}
.more_header{
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding: 0  0 10px 0;
}
.more_header >>> .el-form-item{
  margin-bottom: 32px;
}
.box-card >>> .el-button.is-disabled, .box-card >>>  .el-button.is-disabled:focus, .box-card >>>  .el-button.is-disabled:hover{
  color: #fff;
  cursor: not-allowed;
  background-image: none;
  background-color: #ccc;
  border-color: #EBEEF5;
}
.ma_detail >>> .el-collapse-item__header{
  background: #129F77;
  height: 20px;
  color:#fff;
  border-bottom: 0;
}
.ma_detail >>> .el-collapse-item__wrap{
  border-bottom: 0;
}
.ma_detail >>> .el-collapse-item__content{
  padding-bottom:0;
}
.box-card >>> .el-button{
  padding: 7px 17px;
}
</style>

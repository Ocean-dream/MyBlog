<template>
    <div class="goods_content">
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
              <el-button type="primary" style="margin-right:20px;" class="free_search"><el-dropdown trigger="click">
                <span class="el-dropdown-link" style="color:#fff;">
                  自定义查询
                </span>
                 <el-dropdown-menu slot="dropdown">
                  <div style="margin-top:-15px;">
                    <el-dropdown-item>
                      <el-popover
                        placement="bottom"
                        trigger="click">
                        <data-time ref="dataTimeRef" @todayCurrent ='getCurrentData' :style="isScroll"></data-time>
                        <el-button slot="reference" size="mini" style=" background: transparent;border:0;padding:0;font-size:14px;"  @click="isScroll = 'display:block;'">时段查询</el-button>
                      </el-popover>
                    </el-dropdown-item>
                  </div>
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
           v-loading="loading"
          element-loading-text="正在  加载中"
          element-loading-background="rgba(0,0,0,.3)"
          :data="tableList"
          ref="multipleTable"
          class="goods_table"
          @row-click="clickTableRow"
          @row-contextmenu="rightClick"
          @selection-change="selectBox()"
          style="width: 100%">
           <el-table-column
            type="selection"
            width="50">
          </el-table-column>
          <el-table-column
            prop="id"
            label="编号"
            width="50"
            @click="this.dialogFormVisible = true"
            >
             <template slot-scope="slotProps">
                <el-tag type="info" @click="showDetail(slotProps.row.id)" style="cursor: pointer;padding:0px;">{{slotProps.row.id}}</el-tag>
              </template>
          </el-table-column>
          <el-table-column
            prop="cname"
            label="名称"
            >
          </el-table-column>
           <el-table-column
            prop="norms"
            label="规格"
            width="90"
            >
          </el-table-column>
          <el-table-column
            prop="default_supply_unit_price"
            label="供应单价（元）"
            >
          </el-table-column>
          <el-table-column
            prop="default_retail_unit_price"
            label="零售单价（元）"
            >
          </el-table-column>
          <el-table-column
            prop="default_discount_unit_price"
            label="优惠单价（元）">
          </el-table-column>
          <el-table-column
            prop="json_length"
            label="策略数量（个）"
            >
              <template slot-scope="slotProps">
                <span v-show="!slotProps.row.json_length">0</span>
                <span v-show="slotProps.row.json_length">{{slotProps.row.json_length}}</span>
              </template>
          </el-table-column>
          <el-table-column
            prop="img_url_logo"
            label="图片"
            width="50"
            >
            <template slot-scope="slotProps">
              <div style="height:20px;">
                <img :src="slotProps.row.img_url_logo" alt="" style="width:20px">
              </div>
            </template>
          </el-table-column>
          <el-table-column
            label="说明书"
            width="75"
            >
            <template slot-scope="slotProps">
              <span v-if="slotProps.row.instruction_file_url === null">无</span>
              <span v-else>有</span>
            </template>
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
            width="330"
            >
            <template slot-scope="slotProps">
            <div class="top">
                <el-button type="text" size="mini" @click="editUserInfo(slotProps.row.id)">编辑</el-button>
                <el-button type="text" size="mini" @click="deleteGoodsInfo(slotProps.row.id)" disabled>删除</el-button>
                <el-button type="text" size="mini" @click="showDetail(slotProps.row.id)">查看</el-button>
                <el-button type="text" size="mini" @click="readGoodsPdf(slotProps.row.id)">查看说明书</el-button>
                <el-button type="text" size="mini" @click="uploadGoodsPicture(slotProps.row.id, slotProps.row.name)">上传图片</el-button>
                <el-button type="text" size="mini" @click="uploadExplainPdf(slotProps.row.id, slotProps.row.name)">上传说明书</el-button>
            </div>
        </template>
          </el-table-column>
        </el-table>
        <div id="menu">
            <div class="menu" v-for="(item,index) in menus" :key="index" @click.stop="infoClick(index)">{{item}}</div>
        </div>
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
                    <span v-if="item.comment.length < 7">{{item.comment}}</span>
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
      <!-- 认领和创建 -->
      <el-dialog
        :title="showTitle"
        :visible="createdDialogVisible"
        width="65%"
        class="creat_dia"
        :before-close="handleClose">
        <h3 class="main_style">组织认领
          <el-tooltip class="item" effect="light" content="温馨提示：选择商户时可点击顶层箭头符号进行确认" placement="right">
            <span class="el-icon-question" style="color:green;margin-left:5px;"></span>
          </el-tooltip>
        </h3>
        <div style="display:flex; justify-content: space-between;align-items: center;" class="main_style">
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#fff"
            text-color="#333"
            mode="horizontal"
            default-active="2"
            menu-trigger="click"
            :unique-opened= "true"
            style="height:100%;width:20%; margin-bottom:40px; margin-left:20px;"
            >
            <!-- 默比优斯 -->
              <el-submenu :index="item.id + ''" :key="index" v-for="(item, index) in treeList" id="meunList" disabled>
                <template slot="title">
                  <span @click="write(item.id, item.cname)">{{item.cname}}</span>
                </template>
                <!-- 商户 -->
                <el-submenu :index="subItem.id+''" :key="index" v-for="(subItem, index) in item.merchants" @click.native.stop="write(subItem.id, subItem.cname)">
                  <template slot="title">
                    <span>{{subItem.cname}}</span>
                  </template>
                  <!-- 子商户 -->
                   <el-submenu :index="subItems.id+''" :key="index" v-for="(subItems, index) in subItem.merchants" @click.native.stop="write(subItems.id, subItems.cname)" v-show="subItem.merchants !== undefined">
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
                              <el-submenu :index="grandsons.id+''" :key="index" v-for="(grandsons, index) in subgrandsons.merchants" @click.native.stop="write(grandsons.id, grandsons.id)" v-show="subgrandsons.merchants !== undefined">
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
          <div style="margin-bottom:40px; margin-right:250px;">
            <h4>您当前选择的是：<span style="color:#129F77">{{selectName}}</span></h4>
          </div>
        </div>
        <div  v-show="showCreated" >
          <div class="main_style">
             <h3>基本配置</h3>
              <el-form ref="addGoodsFormRef" :model="addGoodsForm" label-width="120px" :rules="rules" :inline="true">
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="名称" prop="name">
                        <el-input v-model="addGoodsForm.name" placeholder="请使用英文名称" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="中文名称" prop="cname">
                        <el-input v-model="addGoodsForm.cname" placeholder="请输入中文名称" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="类型">
                        <el-select v-model="addGoodsForm.type" placeholder="请选择" style="width:122%">
                          <el-option
                            v-for="item in editTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" >
                      <el-form-item label="规格" style="display:flex;">
                        <el-input v-model="addGoodsForm.width" placeholder="请输入长度" style="width:32%">
                        </el-input>
                        *
                        <el-input v-model="addGoodsForm.height" placeholder="请输入宽度" style="width:30%">
                        </el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="默认供应单价" prop="default_supply_unit_price">
                        <el-input v-model="addGoodsForm.default_supply_unit_price" placeholder="请输入默认供应单价">
                          <template slot="append">￥</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="默认零售单价" prop="default_retail_unit_price">
                        <el-input v-model="addGoodsForm.default_retail_unit_price" placeholder="请输入默认零售单价">
                          <template slot="append">￥</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                      <el-form-item label="默认活动单价" prop="default_discount_unit_price">
                        <el-input v-model="addGoodsForm.default_discount_unit_price" placeholder="请输入默认活动单价">
                          <template slot="append">￥</template>
                        </el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="备注">
                        <el-input v-model="addGoodsForm.description" placeholder="请输入其他备注" style="width:132%"></el-input>
                      </el-form-item>
                    </el-col>
                </el-row>
              </el-form>
            </div>
          <div class="main_style">
            <h3>分账配置</h3>
            <div style="padding-left:118px;">
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
            <div style="margin-top:30px;margin-left:35px;border:1px solid #eee;padding:10px;" v-for="(item, index) in default_share_json" :key="index">
              <el-form ref="addPolicyFormRef" :model="addPolicyForm" label-width="73px" :rules="rules" :inline="true" label-position="left">
                <el-row :gutter="20">
                    <el-col :span="12">
                      <el-form-item label="起始时间">
                      <el-time-picker
                        style="width:91%;"
                        placeholder="起始时间"
                        v-model="item.start_time"
                        value-format="HH:mm:ss"
                        format='HH:mm:ss'
                        >
                      </el-time-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="结束时间" style="margin-left:15px;">
                        <el-time-picker
                          style="width:113%;"
                          placeholder="结束时间"
                          v-model="item.end_time"
                          value-format="HH:mm:ss"
                          format='HH:mm:ss'
                          >
                        </el-time-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="1" style="margin-left:43px;">
                      <el-button type="danger" icon="el-icon-delete" circle  @click="deletePolicy(index)"></el-button>
                    </el-col>
                </el-row>
                <el-row style="padding-left:11px;">
                  <el-col style="width:59%;">
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
                <el-row style="padding-left:11px;margin:30px 0;">
                  <el-col style="width:59%;">
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
                  <el-col style="width:59%;">
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
          <div class="main_style">
            <h3 style="color:#129f77;">温馨提示</h3>
            <ul style="padding: 0 15px;">
              <li><p style="color:#129f77;">当前红色星号标记的为必填项</p></li>
              <li><p style="color:#129f77;">填写单价时请按照 默认供应单价 &lt;= 默认活动单价&lt;= 默认零售价的顺序填写</p></li>
              <li><p style="color:#129f77;">平台占比+门店占比+运营占比的和应为100</p></li>
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
        title="详情展示"
        :visible="detailDialogVisible"
        width="60%"
        :before-close="handleClose">
          <div v-for="(item, index) in detailList" :key="index">
            <div>
              <h3 class="all_title">基础信息</h3>
              <div style="margin-left:20px;">
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>编号:</p>
                      <p style="margin-left:15px">{{item.id}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>名称:</p>
                      <p style="margin-left:15px">{{item.cname}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>创建者:</p>
                      <p style="margin-left:15px">{{item.create_user_json ? item.create_user_json.user_cname : '未知'}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>更新者:</p>
                      <p style="margin-left:15px">{{item.update_user_json ? item.update_user_json.user_cname : '未知'}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>创建时间:</p>
                      <p style="margin-left:15px">{{item.ctime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>修改时间:</p>
                      <p style="margin-left:15px">{{item.mtime | dateformat('YYYY-MM-DD HH:mm:ss')}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>描述:</p>
                      <p style="margin-left:15px">{{item.description}}</p>
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
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>供应单价:</p>
                      <p style="margin-left:15px">{{item.default_supply_unit_price}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>零售单价:</p>
                      <p style="margin-left:15px">{{item.default_retail_unit_price}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>优惠单价:</p>
                      <p style="margin-left:15px">{{item.default_discount_unit_price}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>规格:</p>
                      <p style="margin-left:15px">{{item.norms}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <h3 class="all_title">分账策略</h3>
              <div v-for="(items, index) in item.default_share_json" :key="index" style="margin-left:20px;">
                 <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>开始时间:</p>
                      <p style="margin-left:15px">{{items.start_time}}</p>
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>结束时间:</p>
                      <p style="margin-left:15px">{{items.end_time}}</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分账对象</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分账类型</p>
                    </div>
                  </el-col>
                    <el-col :span="8">
                    <div class="grid-content bg-purple" style="display: flex;">
                      <p>分帐占比</p>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>平台方</p>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <el-tag>{{items.object_json.platform.share_type === 'ratio'?'比例':'其他'}}</el-tag>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>{{(items.object_json.platform.share_value * 100).toFixed(0)}}</p>
                      </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>门店方</p>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <el-tag>{{items.object_json.store.share_type=== 'ratio'?'比例':'其他'}}</el-tag>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>{{(items.object_json.store.share_value * 100).toFixed(0)}}</p>
                      </div>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>运营方</p>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <el-tag>{{items.object_json.operator.share_type=== 'ratio'?'比例':'其他'}}</el-tag>
                      </div>
                    </el-col>
                      <el-col :span="8">
                      <div class="grid-content bg-purple" style="display: flex;">
                        <p>{{(items.object_json.operator.share_value * 100).toFixed(0)}}</p>
                      </div>
                    </el-col>
                </el-row>
              </div>
            </div>
            <div>
              <h3 class="all_title">相关图片</h3>
               <el-row style="margin-left:20px;">
                <el-col :span="8">
                  <div class="grid-content bg-purple" style="display: flex;">
                    <p>商品图片:</p>
                    <img style="margin-left:15px;width:100px" :src="item.img_url_logo"/>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
      </el-dialog>
      <!-- 编辑页面 -->
      <el-dialog
        title="更新"
        :visible="editDialogVisible"
        width="65%"
        :before-close="handleClose">
          <div>
            <h3 style="margin-left:30px;">基本配置</h3>
            <el-form ref="ediotGoodsFormRef" :model="editGoodsForm" label-width="130px" :rules="rules" :inline="true" style="margin-left:103px;">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="名称" prop="name">
                    <el-input v-model="editGoodsForm.name" placeholder="请使用英文名称" disabled style="width:132%"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="中文名称" prop="cname">
                    <el-input v-model="editGoodsForm.cname" placeholder="请输入中文名称" style="width:132%"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="类型">
                      <el-select v-model="editGoodsForm.type" placeholder="请选择" disabled style="width:119%">
                        <el-option
                          v-for="(item, index) in editTypeOptions"
                          :key="index"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="规格" prop="norms">
                      <el-input v-model="editGoodsForm.norms" placeholder="请输入规格" style="width:132%"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="默认供应单价" prop="default_supply_unit_price">
                      <el-input v-model="editGoodsForm.default_supply_unit_price" placeholder="请输入默认供应单价">
                        <template slot="append">￥</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="默认零售单价" prop="default_retail_unit_price">
                      <el-input v-model="editGoodsForm.default_retail_unit_price" placeholder="请输入默认零售单价">
                        <template slot="append">￥</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                  <el-col :span="12">
                    <el-form-item label="默认活动单价" prop="default_discount_unit_price">
                      <el-input v-model="editGoodsForm.default_discount_unit_price" placeholder="请输入默认活动单价">
                        <template slot="append">￥</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注">
                      <el-input v-model="editGoodsForm.description" placeholder="请输入其他备注" style="width:132%"></el-input>
                    </el-form-item>
                  </el-col>
              </el-row>
            </el-form>
          </div>
           <div>
          <h3 style="margin-left:30px;">分账配置</h3>
          <div style="margin-left:125px;padding-left:110px;">
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
          <div style="margin-top:30px;margin-left:145px;border:1px solid #eee;padding:10px;" v-for="(item, index) in default_share_json" :key="index">
            <el-form ref="addPolicyFormRef" :model="editGoodsForm" label-width="73px" :rules="rules" :inline="true" label-position="left">
              <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="起始时间">
                    <el-time-select
                      style="width:91%;"
                      placeholder="起始时间"
                      v-model="item.start_time"
                      :picker-options="{
                        start: '00:00',
                        step: '01:00',
                        end: '23:00'
                      }">
                    </el-time-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="结束时间" style="margin-left:15px;">
                      <el-time-select
                        style="width:113%;"
                        placeholder="结束时间"
                        v-model="item.end_time"
                        :picker-options="{
                          start: '00:59',
                          step: '01:00',
                          end: '23:59',
                        }">
                      </el-time-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="1" style="margin-left:43px;">
                    <el-button type="danger" icon="el-icon-delete" circle  @click="deletePolicy(index)"></el-button>
                  </el-col>
              </el-row>
              <el-row style="padding-left:11px;">
                <el-col style="width:59%;">
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
              <el-row style="padding-left:11px;margin:30px 0;">
                <el-col style="width:59%;">
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
                <el-col style="width:59%;">
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
        <div style="margin-left:30px;">
           <h3 style="color:#129f77;">温馨提示</h3>
           <ul style="padding:0 15px;">
              <li><p style="color:#129f77;">当前红色星号标记的为必填项</p></li>
              <li><p style="color:#129f77;">填写单价时请按照 默认供应单价 &lt;= 默认活动单价&lt;= 默认零售价的顺序填写</p></li>
              <li><p style="color:#129f77;">平台占比+门店占比+运营占比的和应为100</p></li>
            </ul>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editSubmit()" style="background:#129f77;border:0;">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 上传图片 -->
      <el-dialog
        title="更新图片"
        :visible="uploadDialogVisible"
        width="30%"
        :before-close="handleUploadClose">
         <div style="display:flex;justify-content: space-between;">
           <div class="current_pic">
             <h3 style="margin-bottom:5px;">当前图片</h3>
             <img :src="imgSrc" alt="" style="width:150px;margin-top:50px;">
           </div>
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
      <!-- 上传说明书 -->
      <el-dialog
        title="上传说明书"
        :visible="uploadPdfDialogVisible"
        width="30%"
        :before-close="handleUploadPdfClose">
         <div style="display:flex;justify-content: space-between;">
           <div>
             <h3 style="margin-bottom:55px;">上传说明书</h3>
              <el-upload
                  :action="uploadURL"
                  ref="newPdf"
                  :on-remove="handleRemove"
                  :before-remove="beforeRemove"
                  :before-upload="beforeAvatarUploadPdf"
                  :on-change="changeUpload"
                  :auto-upload="false"
                  :with-credentials="true"
                  :limit="1"
                  list-type="picture">
                <el-button size="small" type="primary" style="background:#129f77;border:0;">选取文件</el-button>
                <div slot="tip" class="el-upload__tip">提示：请上传pdf格式文件</div>
              </el-upload>
           </div>
         </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="uploadPdfDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="uploadPdf" style="background:#129f77;border:0;">确定上传</el-button>
        </span>
      </el-dialog>
      <!-- 展示说明书 -->
      <el-dialog
        title="查看说明书"
        :visible.sync="readPdfDialogVisible"
        width="70%"
        :before-close="handleClose">
        <div style="height:70vh;">
          <iframe
            :src="pdfSrc"
            type="application/x-google-chrome-pdf"
            width="100%"
            style="border: none;"
            height="100%">
            This browser does not support PDFs. Please download the PDF to view it: <a :href="pdfSrc">Download PDF</a>
          </iframe>
        </div>
      </el-dialog>
    </div>
</template>
<script>
import { genRequestGetUrl } from '@/untils/cryptojs.js'
import dataTime from '@/components/dataTime'
import headNotice from './../../components/notice.vue'
import pageModel from '@/components/pageModel/pagemodel.vue'
const apiUrl = window.g.api_url
const accessKeySecret = window.g.access_key_secret
const accessKeyId = window.g.access_key_id
export default {
  components: { pageModel, headNotice, dataTime },
  data () {
    return {
      menus: ['编辑商品', '删除商品', '查看商品', '查看说明书', '上传图片', '上传说明书'],
      radio: null,
      currentRowIndex: 0,
      currentPage: 0,
      pageCount: 0,
      fileType: 'pdf',
      readPdfDialogVisible: false,
      pdfSrc: '',
      uploadPdfDialogVisible: false,
      isScroll: 'display:block;',
      uploadGoodsName: '',
      personStart: '',
      personEnd: '',
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
      editTypeOptions: [{
        value: 1,
        label: '医药品'
      }, {
        value: 2,
        label: '日用品'
      }, {
        value: 3,
        label: '成人用品'
      }, {
        value: 4,
        label: '饮料'
      }, {
        value: 5,
        label: '零食'
      }, {
        value: 6,
        label: '其他'
      }],
      policyId: '',
      buttonDisable: false,
      policyNum: [],
      addPolicyForm: {
        start_time: '',
        end_time: '',
        platform_ratio: '',
        policy_type: 1,
        once_revenue: ''
      },
      selectPolicy: '',
      policyList: [],
      uploadURL: 'https://jsonplaceholder.typicode.com/posts/',
      uploadDialogVisible: false,
      editDialogVisible: false,
      editGoodsForm: {},
      arr: [],
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        cname: [
          { required: true, message: '请输入中文名称', trigger: 'blur' }
        ],
        norms: [
          { required: true, message: '请输入规格', trigger: 'blur' }
        ],
        default_share_ratio: [
          { required: true, message: '请输入默认分成比例', trigger: 'blur' }
        ],
        default_supply_unit_price: [
          { required: true, message: '请输入默认供应单价', trigger: 'blur' }
        ],
        default_discount_unit_price: [
          { required: true, message: '请输入默认活动单价', trigger: 'blur' }
        ],
        default_retail_unit_price: [
          { required: true, message: '请输入默认零售单价', trigger: 'blur' }
        ]
      },
      selectName: '',
      selectOrgId: '',
      treeList: [],
      claimDisabled: true,
      showCreated: '',
      showTitle: '',
      orgId: '',
      addGoodsForm: {
        type: '',
        name: '',
        cname: '',
        norms: '',
        width: '',
        height: '',
        default_supply_unit_price: '',
        default_retail_unit_price: '',
        default_discount_unit_price: '',
        default_share_ratio: '',
        description: ''
      },
      createdDialogVisible: false,
      detailList: [],
      detailDialogVisible: false,
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
      modelList: { },
      loading: false,
      tableList: [],
      total: 0,
      meId: '',
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
      imgSrc: '',
      uploadId: '',
      selectId: '',
      selectIdArr: [],
      default_share_json: []
    }
  },
  created () {
    this.getAllData()
    this.selectName = window.localStorage.getItem('cname')
  },
  mounted () {
    window.addEventListener('scroll', this.getScroll)
  },
  methods: {
    infoClick (index) {
      var menu = document.querySelector('#menu')
      menu.style.display = 'none'
    },
    // table的左键点击当前行事件
    clickTableRow (row, column, event) {
      var menu = document.querySelector('#menu')
      menu.style.display = 'none'
      this.tableList.forEach((item, index) => {
        if (row.name === item.name) {
          this.radio = index
        }
      })
    },
    rightClick (row, column, event) {
      var menu = document.querySelector('#menu')
      event.preventDefault()
      menu.style.left = event.pageX + 'px'
      menu.style.top = event.pageY + 'px'
      // 改变自定义菜单的隐藏与显示
      menu.style.display = 'block'
      // 获取当前右键点击table下标
      this.tableList.forEach((item, index) => {
        if (item.name === row.name) {
          this.currentRowIndex = item.id
          return false
        }
      })
    },
    // pdf加载时
    async readGoodsPdf (id) {
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.pdfSrc = 'https:' + res.ret_data[0].instruction_file_url.split(':')[1]
        this.readPdfDialogVisible = true
      }
    },
    getScroll () {
      this.isScroll = 'display:none;'
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
      this.getAllData()
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
      this.buttonDisable = true
    },
    // 创建页面删除按钮
    deletePolicy (index) {
      this.policyNum.splice(index, 1)
      this.default_share_json.splice(index, 1)
    },
    uploadPIcture (context) {
      this.$refs.newupload.submit()
      this.uploadDialogVisible = false
    },
    changeUpload (file) {
    },
    // 上传图片前的判断
    beforeAvatarUpload (file) {
      const _this = this
      const isJPG = (file.type === 'image/jpg' || file.type === 'image/jpeg' || file.type === 'image/png')
      const isImage = file.type.includes('image')
      if (!isImage) {
        this.$message.error('上传文件类型必须是图片!')
      }
      const isLt1M = file.size / 512 / 512 < 1
      if (!isLt1M) {
        this.$message.error('上传图片大小不能超过 512kB!')
      }
      if (isLt1M && isImage && isJPG) {
        let formData = new FormData()
        let goodsImageName = 'goods_' + this.uploadId + '_' + this.uploadGoodsName + '.jpg'
        formData.append(goodsImageName, file, goodsImageName)
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data; charset=UTF-8 '
          }
        }
        const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_image', { id: this.uploadId, org_id: this.orgId, resources: 'goods' }, accessKeySecret)
        this.$http.post(url, formData, config).then(function (res) {
          _this.getAllData()
        }).catch(() => {
        })
      }
    },
    // 上传说明书判断
    beforeAvatarUploadPdf (file) {
      let _this = this
      let formData = new FormData()
      let goodsPdfName = 'goods_' + this.uploadId + '_' + 'instruction.pdf'
      formData.append(goodsPdfName, file, goodsPdfName)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data; charset=UTF-8 '
        }
      }
      const url = genRequestGetUrl(apiUrl, 'uploads', accessKeyId, 'update_instruction_file', { id: this.uploadId, org_id: this.orgId, resources: 'goods' }, accessKeySecret)
      this.$http.post(url, formData, config).then(function (res) {
        _this.getAllData()
      }).catch(() => {
      })
    },
    uploadPdf (context) {
      this.$refs.newPdf.submit()
      this.uploadPdfDialogVisible = false
    },
    // 删除上传图片
    handleRemove (file, fileList) {
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件`)
    },
    beforeRemove (file, fileList) {
    },
    handleSizeChange (val) {
      this.searchJson.page.page_size = val
      this.getAllData()
    },
    // 一键重置
    reset () {
      this.searchJson = {
        filter: [],
        page: {
          page_num: 1,
          page_size: 10
        }
      }
      this.getAllData()
    },
    handleCurrentChange (val) {
      this.searchJson.page.page_num = val
      this.getAllData()
    },
    handleClose () {
      this.readPdfDialogVisible = false
      this.createdDialogVisible = false
      this.editDialogVisible = false
      this.detailDialogVisible = false
      this.selectPolicy = ''
      this.addGoodsForm = {}
      this.policyNum = []
      this.default_share_json = []
    },
    handleUploadClose () {
      this.uploadDialogVisible = false
      this.$refs.newupload.clearFiles()
    },
    handleUploadPdfClose () {
      this.uploadPdfDialogVisible = false
      this.$refs.newPdf.clearFiles()
    },
    // 提交高级查询
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
      this.getAllData()
      this.searchJson.filter = []
      this.dialogFormVisible = false
    },
    // 关闭高级查询框
    closeDialog () {
      this.dialogFormVisible = false
    },
    // 查看详情
    async showDetail (id) {
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.detailList = res.ret_data
        this.detailDialogVisible = true
      }
    },
    // 根据名称搜索
    async selectByName () {
      if (this.meId === '') return this.$message.error('请先输入将要搜索的名称')
      const obj = {
        'key': 'cname',
        'op': 'like',
        'value': this.meId
      }
      this.searchJson.filter.push(obj)
      this.getAllData()
      this.searchJson.filter = []
    },
    // 获取所有商品
    async getAllData () {
      this.tableList = []
      this.loading = true
      this.orgId = parseInt(window.localStorage.getItem('active')) === 'NAN' ? 1 : parseInt(window.localStorage.getItem('active'))
      var searchStr = JSON.stringify(this.searchJson)
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'list_items', { 'search_str': searchStr, org_id: this.orgId }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        res.ret_data.forEach(item => {
          item['default_share_ratio'] = (item.default_share_ratio * 100).toFixed(0)
          if (item.default_share_json) {
            item['json_length'] = item.default_share_json.length
          }
        })
        this.tableList = res.ret_data
        this.total = res.ret_total
        this.loading = false
      }
    },
    // 高级搜索条件
    async detailSearch () {
      this.dialogFormVisible = true
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'list_schema', { }, accessKeySecret)
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
    // 创建认领弹框
    claim (str) {
      this.createdDialogVisible = true
      this.getNavList()
      this.policyNum = []
      if (str === 'created') {
        this.showCreated = true
        this.showTitle = '创建'
        this.getAllPolicy()
      } else {
        this.showCreated = false
        this.showTitle = '认领'
      }
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
    // /提交创建和认领
    async addSubmit () {
      if (this.showCreated === true) {
        var json = []
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
        const defaultJson = JSON.stringify(json)
        const params = {
          type: parseInt(this.addGoodsForm.type),
          name: this.addGoodsForm.name,
          cname: this.addGoodsForm.cname,
          norms: this.addGoodsForm.width + '*' + this.addGoodsForm.height,
          default_supply_unit_price: this.addGoodsForm.default_supply_unit_price,
          default_retail_unit_price: this.addGoodsForm.default_retail_unit_price,
          default_discount_unit_price: this.addGoodsForm.default_discount_unit_price,
          default_share_ratio: this.addGoodsForm.default_share_ratio / 100,
          description: this.addGoodsForm.description,
          org_id: this.orgId,
          default_share_json: defaultJson
        }
        if (this.addGoodsForm.org_id === '') return this.$message.error('请选择认领的组织')
        const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'create_one', params, accessKeySecret)
        const { data: res } = await this.$http.get(url)
        if (res.ret_code !== 0) return this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        this.$message.success('添加成功')
        this.getAllData()
        this.createdDialogVisible = false
      } else {
        this.selectIdArr.forEach(async item => {
          var params = {
            goods_id: parseInt(item),
            org_id: this.selectOrgId
          }
          const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'bind_org', params, accessKeySecret)
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
        this.getAllData()
      }
    },
    // 提交编辑
    async editSubmit () {
      const id = this.editGoodsForm.id
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
      const params = {
        cname: this.editGoodsForm.cname,
        default_discount_unit_price: this.editGoodsForm.default_discount_unit_price,
        default_retail_unit_price: this.editGoodsForm.default_retail_unit_price,
        default_share_ratio: this.editGoodsForm.default_share_ratio / 100,
        default_supply_unit_price: this.editGoodsForm.default_supply_unit_price,
        description: this.editGoodsForm.description,
        name: this.editGoodsForm.name,
        norms: this.editGoodsForm.norms,
        type: parseInt(this.editGoodsForm.type),
        default_share_json: json
      }
      const editStr = JSON.stringify(params)
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'update_by_id', { 'update_str': editStr, id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('更新成功')
        this.getAllData()
        this.editDialogVisible = false
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
    // 获取组织树
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
    // 编辑获取数据
    editUserInfo (id) {
      this.editDialogVisible = true
      this.selectPolicy = ''
      this.policyNum = []
      this.getAllPolicy()
      this.selectbyId(id)
    },
    // 获取组织org-id
    write (oid, name) {
      this.selectOrgId = oid
      this.selectName = name
    },
    // 根据id查找商品
    async selectbyId (id) {
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'query_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.editGoodsForm = res.ret_data[0]
        this.editGoodsForm['default_share_ratio'] = (this.editGoodsForm.default_share_ratio * 100).toFixed(0)
        res.ret_data.forEach(item => {
          if (item.default_share_json) {
            this.default_share_json = item.default_share_json
          }
        })
        this.default_share_json.forEach(item => {
          item.object_json.operator['share_value'] = (item.object_json.operator.share_value * 100).toFixed(0)
          item.object_json.platform['share_value'] = (item.object_json.platform.share_value * 100).toFixed(0)
          item.object_json.store['share_value'] = (item.object_json.store.share_value * 100).toFixed(0)
        })
        if (res.ret_data[0].img_url_logo) {
          this.imgSrc = res.ret_data[0].img_url_logo
        }
      }
    },
    // 取消创建
    cancleAdd () {
      this.createdDialogVisible = false
      this.addGoodsForm = {}
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
    // 根据id删除
    async deleteGoodsInfo (id) {
      const confirmResult = await this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      const url = genRequestGetUrl(apiUrl, 'goods', accessKeyId, 'delete_by_id', { id: id }, accessKeySecret)
      const { data: res } = await this.$http.get(url)
      if (res.ret_code !== 0) {
        if (res.ret_code === 4444) {
          this.$message.error('登录已超时，请退出重新登录')
        } else {
          this.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      } else {
        this.$message.success('删除成功')
        this.getAllData()
      }
    },
    // 上传图片
    uploadGoodsPicture (id, name) {
      this.uploadGoodsName = name
      this.uploadId = id
      this.selectbyId(id)
      this.uploadDialogVisible = true
    },
    // 上传说明书
    uploadExplainPdf (id, name) {
      this.uploadPdfDialogVisible = true
      this.uploadGoodsName = name
      this.uploadId = id
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
      this.getAllData()
    }
    // selectName () {
    //   this.getAllData()
    // }
  }
}
</script>
<style>

</style>
<style scoped>
.box-card >>> .el-button{
  background-color: #129F77;
  border-color: transparent;
}
.name_column{
  padding: 5px;
}
.current_pic{
  width: 200px;
  height: 300px;
}
.current_pic img{
  width: 100%;
}
.search_add{
  display: flex;
}
.search_add >>> .el-switch{
  width: 200px;
}
.person_style{
  padding: 3px;
  margin-top: -35px;
  background: #129f77;
}
.person_style >>> .el-button{
  padding:6px 2px;
}
.direct_select{
  margin-left: 10px;
}
.select_form >>>.el-form-item{
  margin-bottom: 5px;
}
.share_sty >>> .el-date-editor.el-input, .share_sty >>> .el-date-editor.el-input__inner{
  width:130px;
}
.select_form >>> .el-form-item__label{
  line-height: 30px;
}
.creat_dia >>> .el-dialog__body{
  padding: 0 20px 30px;
}
.goods_table >>> .el-table td{
  padding: 6px 0!important;
  /*  */
}
.creat_dia .el-form-item:nth-child(even){
  float:right;
}
.box-card >>> .el-button.is-disabled, .box-card >>>  .el-button.is-disabled:focus, .box-card >>>  .el-button.is-disabled:hover{
  color: #fff;
  cursor: not-allowed;
  background-image: none;
  background-color: #ccc;
  border-color: #EBEEF5;
}
.box-card >>> .el-button{
  padding: 7px 17px;
}
.share_sty{
  padding-left: 115px;
}
.main_style{
  margin-left:137px;
  margin-bottom: 0px;
}
#menu {
  width: 120px;
  min-height:100px;
  overflow: hidden; /*隐藏溢出的元素*/
  box-shadow: 0 1px 1px #888, 1px 0 1px #ccc;
  position: absolute;
  display: none;
  background: #ffffff;
  z-index: 10;
}
.menu {
  width: 125px;
  height: 25px;
  line-height: 25px;
  text-indent: 10px;
  cursor: pointer;
}
.menu:hover {
  color: rgb(18, 159, 119);
  text-decoration: underline;
}
</style>

<template>
  <div class="tree_style">
    <div style="padding-right:30px;">
      <el-input placeholder="请输入搜索名称" v-model="filterText" class="input-with-select" clearable>
      <el-select v-model="select" slot="append" placeholder="" class="tree_content">
        <el-option label="全部" value="1"></el-option>
        <el-option label="商户" value="2"></el-option>
        <el-option label="门店" value="3"></el-option>
      </el-select>
      </el-input>
    </div>
     <el-tree
        :data="newMenuTree"
        :props="defaultProps"
        :highlight-current="true"
        auto-expand-parent
        accordion
        :current-node-key="expandKey[0]"
        :default-expanded-keys="expandKey"
        :default-checked-keys="expandKey"
        empty-text = "加载中"
        :default-expand-all ="defaultExpand"
        node-key="id"
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="handleNodeClick"
        @node-contextmenu ="handleRightClick"
      >
      <span class="custom-tree-node"  slot-scope="{ node, data }">
        <span style="font-size:14px;position: relative;"  @dblclick ="doubleClick()"  id="selectCurrebt">
          <i class="el-icon-check" style="color:129f77;font-size:16px;position: absolute;top:0;left:-25px;" v-show="clickData.id === data.id || expandKey[0] === data.id"></i>
          <i class="el-icon-s-shop" v-show="data.entity === 'store'"></i>
          <i class="el-icon-s-platform"  v-show="data.entity === 'platform'" ></i>
          <i class="el-icon-s-home" v-show="data.entity === 'merchant'"></i>
          {{ data.cname }}
          <span v-show="isShowMark">
            <el-button type="warning" style="padding: 0;font-size:12px;" v-if="treePower[data.name]">{{treePower[data.name]['elpower']}}</el-button>
            <el-button type="warning" style="padding: 0;font-size:12px;" v-if="treePower[data.name]">{{treePower[data.name]['power']}}</el-button>
          </span>
        </span>
      </span>
      </el-tree>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    newMenuTree: {
      type: Array,
      default: () => []
    },
    model: {
      type: String,
      default: '1'
    },
    defaultExpand: {
      type: Boolean,
      default: false
    },
    expandKey: {
      type: Array,
      default: () => []
    },
    treePower: {
      type: Object,
      default: () => {}
    },
    isShowMark: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      select: '1',
      options: [
        {
          value: '1',
          label: '全部'
        }, {
          value: '2',
          label: '商户'
        }, {
          value: '3',
          label: '门店'
        }
      ],
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'cname'
      },
      clickData: {}
    }
  },
  methods: {
    doubleClick () {
      if (this.model === '1') {
        this.expandKey = []
        this.filterText = ''
        if (this.clickData.children) {
          this.clickData.children.forEach(item => {
            this.expandKey.push(item.id)
          })
        }
      } else {
        this.$emit('handleDouble', this.clickData.id, this.clickData.parent_id)
      }
    },
    handleNodeClick (data) {
      this.clickData = data
      this.$emit('receiveData', data)
    },
    handleRightClick (event, data) {
      this.$emit('rightClick', event, data)
    },
    filterNode (value, data) {
      if (this.select === '2') {
        if (data.entity === 'store' || data.entity === 'platform') return false
        if (!value) return true
        return data.cname.indexOf(value) !== -1
      } else if (this.select === '1') {
        if (!value) return true
        return data.cname.indexOf(value) !== -1
      } else {
        if (data.entity === 'merchant' || data.entity === 'platform') return false
        if (!value) return true
        return data.cname.indexOf(value) !== -1
      }
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>
<style>
.el-tree-node__content{
  height:37px!important;
}
.el-select-dropdown__item{
  height: 20px!important;
  line-height: 20px!important;
  font-size: 12px!important;
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
  background: #fff!important;
  color: #129f77;
}
.el-tree__empty-text{
  color:yellow!important;
}
.el-tree__empty-block{
  width: 54%!important;
}
.el-tree-node__content:hover{
  background: #129f98!important;
}
.el-tree-node__expand-icon{
  /* display: none; */
  color: transparent!important;
  padding: 0!important;
}
</style>
<style scoped>
.tree_style{
  width: 100%;
}
.tree_style >>> .el-tree{
  background: #129f77;
  /* width:146.5%; */
  color: #fff;
}
.tree_style >>> .el-input{
  margin: 10px 0 5px 10px;
}
.tree_style >>> .el-input__inner{
  /* padding: 0 0 0 8px; */
}
.tree_style >>> .el-input-group__append{
  padding: 0 30px 0 8px;
  border: 0;
  width: 26px;
}
.tree_content >>> .el-input__suffix{
  top: 3px;
}
.tree_content >>> .el-input__inner {
  padding: 0 9px;
}
</style>

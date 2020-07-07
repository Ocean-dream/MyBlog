<template>
  <div>
    <el-row style="margin-bottom:10px">
      <el-col :span="10">组织</el-col>
      <!-- <el-col :span="8">类型</el-col> -->
      <el-col :span="10">角色</el-col>
    </el-row>
    <el-row v-for="(item, index) in showPersonal" :key="index" style="margin-bottom:10px">
      <el-col :span="10">{{item.org.cname}}
        <el-tag size="mini" v-if="item.org.entity === 'merchant'" type="warning">商户</el-tag>
        <el-tag size="mini" v-if="item.org.entity === 'store'">门店</el-tag>
        <el-tag size="mini" v-if="item.org.entity === 'platform'" type="info">平台</el-tag>
      </el-col>
      <!-- <el-col :span="8">
        <el-tag size="mini" v-if="item.org.entity === 'merchant'">商户</el-tag>
        <el-tag size="mini" v-if="item.org.entity === 'store'">门店</el-tag>
        <el-tag size="mini" v-if="item.org.entity === 'platform'">平台</el-tag>
      </el-col> -->
      <el-col :span="10">
        <el-tag type="success">{{item.role.cname}}</el-tag>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  props: {
    showPersonal: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<template>
  <div>
     <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="this.searchJson.page.page_num"
        :page-sizes="[10,15,25,50,100,200,500, 1000]"
        :page-size="this.searchJson.page.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchJson: {
        filter: [],
        page: {
          page_num: 1,
          page_size: 15
        }
      }
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSize (val) {
      this.searchJson.page.page_size = val
      this.$emit('sizeChange', this.searchJson.page.page_size)
    },
    handleCurrent (val) {
      this.searchJson.page.page_num = val
      this.$emit('numChange', this.searchJson.page.page_num)
    }
  }
}
</script>
<style scoped>
</style>

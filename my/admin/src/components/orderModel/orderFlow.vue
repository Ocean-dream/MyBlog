<template>
  <div class="time_show">
    <el-timeline>
    <el-timeline-item :timestamp="orderTime + ' 用户下单'" placement="top" v-if="tableData.length !== 0" :class="isSuccess === '1' ? 'order_sty' : (isSuccess === '2' ? 'order_close' : '')">
      <el-card>
        <order-table :isInner="false" :isSearch="false" :pageChange="false" :supplyTable="tableData" :isExpand="true" :isCheck="false"></order-table>
      </el-card>
    </el-timeline-item>
    <el-timeline-item :timestamp="shareTime + ' 进行分账'" placement="top" v-if="shareData.length !== 0" :class="isShareSuccess === '1' ? 'order_sty' : (isShareSuccess === '2' ? 'order_close' : '')">
      <el-card>
        <share-table :isInner="false" :isSearch="false" :pageChange="false" :supplyTable="shareData" :isCheck="false"></share-table>
      </el-card>
    </el-timeline-item>
    <el-timeline-item :timestamp="saleTime + ' 执行出货'" placement="top" v-if="saleData.length !== 0" :class="isSaleSuccess === true ? '' : 'order_sty'">
      <el-card>
        <sales-show :isOperate="false" :tableList="saleData" :isCheck="false"></sales-show>
      </el-card>
    </el-timeline-item>
    <el-timeline-item :timestamp="ticketTime + ' 用户反馈'" placement="top" v-if="JSON.stringify(ticketData) !== '[{}]'" class="tacket_sty">
      <el-card>
        <ticket-table :isSearch="false" :isOperate="false" :pageChange="false" :supplyTable="ticketData" :isCheck="false"></ticket-table>
      </el-card>
    </el-timeline-item>
    <el-timeline-item :timestamp="refundTime + ' 运营退款'" placement="top" v-if="refundData.length !== 0">
      <el-card>
        <refund-show :isInner="false" :isSearch="false" :isClass="false" :isShowPage="false" :supplyTable="refundData" :isExpand="true" :isCheck="false"></refund-show>
      </el-card>
    </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import orderTable from '@/components/orderModel/orderTable'
import shareTable from '@/components/sharesModel/shareTable'
import salesShow from '@/components/salesModel/salesTable'
import ticketTable from '@/components/ticketsModel/tacketTable'
import refundShow from '@/components/refundModel/refundTable'
export default {
  components: {
    orderTable,
    shareTable,
    salesShow,
    ticketTable,
    refundShow
  },
  created () {
  },
  props: {
    isSaleSuccess: {
      default: ''
    },
    isSuccess: {
      default: ''
    },
    isShareSuccess: {
      default: ''
    },
    orderTime: {
      default: ''
    },
    ticketTime: {
      default: ''
    },
    refundTime: {
      default: ''
    },
    shareTime: {
      default: ''
    },
    saleTime: {
      default: ''
    },
    tableData: {
      type: Array,
      default: () => []
    },
    shareData: {
      type: Array,
      default: () => []
    },
    saleData: {
      type: Array,
      default: () => []
    },
    ticketData: {
      type: Array,
      default: () => []
    },
    refundData: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
h4{
  color: #129F77;
  margin: 8px;
}
.time_show >>> .el-card__body{
  padding: 0!important;
}
.time_show >>> .el-timeline-item__timestamp.is-top{
  color:#129F77;
}
.order_sty >>> .el-timeline-item__timestamp.is-top{
  color:red;
}
.order_close >>> .el-timeline-item__timestamp.is-top{
  color:#aaa;
}
.tacket_sty >>> .el-timeline-item__timestamp.is-top{
  color: orange;
}
.time_show >>> .el-timeline-item__tail{
  border-left: 2px solid #129F77;
}
.time_show >>> .el-timeline-item__node{
  background: #129F77;
}
</style>

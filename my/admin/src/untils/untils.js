/**
 * 选中导出
 */
export function exportSelect (exdata) {
  if (exdata.length === 0) return this.$message.warning('请先选择需要导出的内容')
  require.ensure([], () => {
    const { export_json_to_excel } = require('@/excel/export2Excel')  // eslint-disable-line
    const tHeader = ['编号', '名称', '商户', '组织归属', '支付类型', '总额', '门店收入', '运营收入', '平台收入'] // 导出的表头名信息
    const filterVal = ['id', 'name', 'merchant', 'store', 'pay_type', 'sale_unit_price', 'store_revenue', 'operator_revenue', 'platform_revenue'] // 导出的表头字段名，需要导出表格字段名
    const list = exdata
    const data = formatJson(filterVal, list)
    export_json_to_excel(tHeader, data, '历史销售表格名字')  // eslint-disable-line
  })
}
export function formatJson (filterVal, jsonData) {
  return jsonData.map(v => filterVal.map(j => v[j]))
}
// 设置cookie
export function setCookie (cname, cvalue, exdays) {
  var d = new Date()
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
  var expires = 'expires=' + d.toUTCString()
  document.cookie = cname + '=' + cvalue + ';' + expires + '; path=/' // path=/是根路径
}
// 清楚cookie
export function clearCookie (name) {
  setCookie(name, '', -1)
}

// 整体引用crypto-js库
import CryptoJS from 'crypto-js'
// import { getAuthKeyPair } from './config.js'

/**
 * 1. 按参数名进行升序排列
 * 对传入的json数据按照key进行排序
 * arys：需要排序的Json数据
 * */
export function keySort (arys) {
  var newkey = Object.keys(arys).sort()
  var newObj = {}
  for (var i = 0; i < newkey.length; i++) {
    // 遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]]
    // 向新创建的对象中按照排好的顺序依次增加键值对
  }

  return newObj
}

/**
 * 2. 对参数名称和参数值进行URL编码
 * 对传入的Json中的参数名称和参数值进行url编码
 * arys：需要编码的Json数据
*/
export function codingParameter (arys) {
  var newkey = Object.keys(arys)
  var newObj = {}
  for (var i = 0; i < newkey.length; i++) {
    // 遍历newkey数组
    newObj[encodeURIComponent(newkey[i])] = encodeURIComponent(arys[newkey[i]])
    // 向新创建的对象中按照排好的顺序依次增加键值对
  }

  return newObj
}

/**
 * 3. 构造URL请求
*/
export function createUrlRequest (arys) {
  var urlstr = ''
  var newkey = Object.keys(arys).sort()
  for (var i = 0; i < getJsonLength(arys); i++) {
    urlstr += newkey[i] + '=' + arys[newkey[i]]
    if (i < getJsonLength(arys) - 1) {
      urlstr += '&'
    }
  }
  // console.log('urlstr = ' + urlstr)
  return urlstr
}

/**
 * 4. 构造被签名串
*/
export function createSignedUrl (urlType, saparator, arys, res) {
  var signedstr = urlType + saparator + res + saparator + arys
  // console.log('signedstr = ' + signedstr);
  return signedstr
}

/**
 * 5. 计算签名
*/
export function signUrl (arys, accessKeySecret) {
  // 用HmacSHA256算法加密
  var hmacSign = CryptoJS.HmacSHA256(arys, accessKeySecret)
  // 对数据进行Base64编码
  var signature = hmacSign.toString(CryptoJS.enc.Base64)
  return signature
}

/**
 * 获取八位随机数
 */
export function getRandom () {
  return Math.floor(Math.random() * (99999999 - 10000000 + 1) + 10000000)
}
/**
 * @param {域名} httpAddr
 * @param {操作} resources
 * @param {密钥id} access_key_id
 * @param {指令} action
 * @param {*指令参数 action_params
 * @param {密钥内容} access_key_secret
 */
export function genRequestGetUrl (httpAddr, resources, accessKeyid, action, actionParams, accessKeySecret) {
  // step 1: 生成公共参数
  const requestParams = {
    'access_key_id': accessKeyid,
    'api_version': 'v1',
    'time_stamp': (new Date()).toISOString(),
    'signature_method': 'HmacSHA256',
    'signature_version': 'v1',
    'signature_nonce': getRandom(),
    'action': action
  }
  // step 2: 合并指令参数
  Object.assign(requestParams, actionParams)
  // console.log(requestParams)
  // step 3: 进行签名并生成最终URL
  // 1. 按参数名进行升序排列
  var urlParameterSort = keySort(requestParams)
  // 2. 对参数名称和参数值进行URL编码
  var urlParameterCoding = codingParameter(urlParameterSort)
  // 3. 构造URL请求
  var urlRequest = createUrlRequest(urlParameterCoding)
  // 4. 构造被签名串
  var signedStr = createSignedUrl('GET', ';', urlRequest, '/api/' + resources)
  // 5. 计算签名
  var signature = signUrl(signedStr, accessKeySecret)
  var url = httpAddr + '/api/' + resources + '?' + urlRequest + '&signature=' + signature
  // console.log('sign:url = ' + url)
  return url
}
/**
 * 获取当前时间戳
 */
export function timetrans (date) {
  var dateTime = new Date(date * 1000) // 如果date为13位不需要乘1000
  var Y = dateTime.getFullYear() + ''
  var M = (dateTime.getMonth() + 1 < 10 ? '0' + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1) + ''
  var D = (dateTime.getDate() < 10 ? '0' + (dateTime.getDate()) : dateTime.getDate()) + ''
  var h = (dateTime.getHours() < 10 ? '0' + dateTime.getHours() : dateTime.getHours()) + ''
  var m = (dateTime.getMinutes() < 10 ? '0' + dateTime.getMinutes() : dateTime.getMinutes()) + ''
  var s = (dateTime.getSeconds() < 10 ? '0' + dateTime.getSeconds() : dateTime.getSeconds())

  return Y + M + D + h + m + s
}

/**
 * 获取Json数据长度
 * jsonData：需要获取长度的J送数据
*/
export function getJsonLength (jsonData) {
  var jsonLength = 0
  for (var item in jsonData) {
    item = item.slice(0)
    jsonLength++
  }
  return jsonLength
}

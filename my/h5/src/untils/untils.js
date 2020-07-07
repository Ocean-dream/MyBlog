import { paysignjs } from './cryptojs'
import Vue from 'vue'
/**
 * get params from url
 * http://localhost:8080/#/order?org_id=1
 */
export function GetQueryValue (queryName) {
  var query = decodeURI(window.location.search.substring(1))
  var vars = query.split('&')
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=')
    if (pair[0] === queryName) {
      return pair[1]
    }
  }
  return null
}
/**
 * 微信签名加密
 */
export function wxPaySign (appId, nonceStr, prepayId, signType, timeStamp, mchKey) {
  var ret = {
    appId: appId,
    nonceStr: nonceStr,
    package: prepayId,
    signType: signType,
    timeStamp: timeStamp
  }
  return paysignjs(ret, mchKey)
}
/**
 * 生成随机四位数
 */
export function rand (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
/**
 * 判断用户设备 pc or phone
 */
export function isUserAgrent () {
  if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    return true
  } else {
    return false
  }
}
/**
 * 判断是否为微信
 */
export function isWeChat () {
  var ua = navigator.userAgent.toLowerCase()
  if (ua.indexOf('micromessenger') > -1) {
    return true
  } else {
    return false
  }
}
/**
 * 数组去空
 */
export function trimSpace (array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === ' ' || array[i] === null || typeof (array[i]) === 'undefined') {
      array.splice(i, 1)
      i = i - 1
    }
  }
  return array
}
/**
 * 判断当前环境
 */
export function isTest (path) {
  var current = {}
  const env = Vue.prototype['env']
  for (var key in env) {
    if (path === key) {
      current = env[path]
      break
    } else {
      current = env['test']
    }
  }
  return current
}
/**
 * 获取url中的指定参数
 */
export function getSelectParam (url) {
  var codeResult = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    var strs = str.split('&')
    for (let i = 0; i < strs.length; i++) {
      codeResult[strs[i].split('=')[0]] = unescape(strs[i].split('=')[1])
    }
  }
  return codeResult
}

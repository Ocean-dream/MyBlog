
// [接口] 获取URL
export function getUrl () {
  return 'https://api-atm.mobius.org.cn'
  // return "http://192.168.40.195:8888";
}

// [接口] 获取认证密钥对
export function getAuthKeyPair () {
  var data = {
    'type': 'HmacSHA256',
    'access_key_id': 'KXMPJL09ABWC5LXZ',
    'access_key_secret': '2p4xbx65emyeawngfycriocibyufdczu'
  }
  return data
}

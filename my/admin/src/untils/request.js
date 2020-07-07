import axios from 'axios'
const api = {
  async get (url) {
    try {
      let res = await axios.get(url)
      res = res.data
      return new Promise((resolve) => {
        if (res.code === 0) {
          resolve(res)
        } else {
          window.wm.$message.error('Error, 有接口调用错误：' + res.ret_msg)
        }
      })
    } catch (err) {
    }
  }
}
export { api }

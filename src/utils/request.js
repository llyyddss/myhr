import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    const token = store.getters.token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      // 逻辑失败(把后台返回message提示文字返回到逻辑页面)
      // 返回Promise的reject拒绝状态(await无法接受，如果有try+actah进catch里)
      Message.error(message)
      return Promise.reject(message)
    }
  },
  error => {
    // 4xx的响应状态，如果后台返回了响应数据，就用一下,如果没有，就error对象本身message的值
    Message.error((error.response && error.response.data && error.response.data.message) || error.message)
    return Promise.reject(error)
  }
)

export default service

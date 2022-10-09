import request from '@/utils/request'

/**
 * 登录接口
 * @param {*} data 手机号+密码的数据对象
 * @returns Promise对象
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data: data
    // data: {
    //     mobile: data.mobile,
    //     password: data.password
    // }
  })
}

/**
 * 用户 - 获取用户资料
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

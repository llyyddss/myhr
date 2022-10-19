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

// 获取用户基本信息
export function getProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

// 获取员工基本信息
export function getUserPhotoAPI(id) {
  return request({
    url: `/sys/user/${id}`, // 把员工id值，带在路径上传给后台
    method: 'get'
  })
}

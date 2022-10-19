import { loginAPI, getProfileAPI, getUserPhotoAPI } from '@/api'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(), // vuex的state值，使用本地持久化的
    userInfo: {}, // 用户基本资料对象
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
    setToken(token) // 在给本地也存一份
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 删除token
  REMOVE_TOKEN(state) {
    state.token = ''
    removeToken()
  },
  // 操作userInfo这个变量
  SET_USER(state, value) { // value->请求到的用户对象
    state.userInfo = value
  },
  // 删除用户信息
  REMOVE_USER(state) {
    state.userInfo = {}
  }
}

const actions = {
  // 封装-登录逻辑
  async loginActions({ commit }, data) {
    const res = await loginAPI(data)
    commit('SET_TOKEN', res.data)

    return res // 把结果返回到调用处
  },
  // 封装-获取用户基本信息
  async getUserInfoActions({ commit }) {
    const { data: userObj } = await getProfileAPI()
    const { data: photoObj } = await getUserPhotoAPI(userObj.userId)
    commit('SET_USER', { ...userObj, ...photoObj }) // 用户信息对象，交到mutations里保存到userInfo上
  },
  // 封装-退出登录(被动推出token过期 / 主动退出)
  logoutActions({ commit }) {
    commit('REMOVE_TOKEN')
    commit('REMOVE_USER')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}


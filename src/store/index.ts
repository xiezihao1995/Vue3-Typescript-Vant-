import { createStore } from 'vuex'
// 引入userinfo模块文件
import uInfo from './userinfo'
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  // 取值的时候state后面加上模块名
  // 触发方法是 模块名/方法名
  modules: {
    uInfo
  }
})

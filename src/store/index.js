import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const state = { // 要设置的全局访问的state对象
  login: false
  // 要设置的初始属性值
}
const getters = { // 实时监听state值的变化(最新状态)
  getList(state) { // 承载变化的showFooter的值
    return state.navlist
  }
}
const mutations = {
  setLogin(state, data) {
    state.login = data
    localStorage.login = true;
  }
}
const store = new Vuex.Store({
  state,
  getters,
  mutations
})

export default store

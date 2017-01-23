/**
 *消息分发后 最终设置到state中
 *getters 就可以调用数据
 */
import * as types from '../mutations'

const state = {
  num: 0,
  data: null,
  date: null
}

const getters = {
  message : state => {
    console.log('消息分发3 =' + state.num)
    return state.num
  },
  data : state => state.data,
  date : state => state.date
}

const actions = {
  getMessage ({ commit, state }, num) {
    console.log('消息分发1 =' + num)
    commit(types.APP_DETAIL, num)
  },
  getTime ({ commit, state }) {
    setInterval(function () {
      commit(types.GET_TIME, new Date())
    }, 1000)
  }

}

const mutations = {
  [types.APP_DETAIL] (state, num) {
    console.log('消息分发2 =' + num)
    state.num = num
  },
  [types.GET_TIME] (state, date) {
    console.log('消息分发date 2=' + date)
    state.date = date
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

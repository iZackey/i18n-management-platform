/**
 * 项目公共模块状态管理
 */
const $ = window.$;

const app = {
  namespaced: true,
  state: {
    aFields:[] //字段集
  },
  getters: {

  },
  mutations: {
    SET_A_FIELDS: (state, payload = []) => {
      state.aFields = $.extend(true, [], payload);
    }
  },
  actions: {

  }
}

export default app

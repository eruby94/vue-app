import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lists: [
      {
        title: 'Things To Do',
        items: []
      },
      {
        title: 'In-Progress',
        items: []
      },
      {
        title: 'Completed',
        items: []
      }
    ],
    archive: [],
    showModal: false
  },
  mutations: mutations,
  actions: actions
})

export default store

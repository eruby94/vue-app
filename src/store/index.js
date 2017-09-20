import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    lists: {
      todoItems: {
        name: 'todoItems',
        title: 'Things To Do',
        items: []
      },
      inProgress: {
        name: 'inProgress',
        title: 'In-Progress',
        items: []
      },
      completedItems: {
        name: 'completedItems',
        title: 'Completed',
        items: []
      }
    },
    archive: [],
    showModal: false
  },
  mutations: mutations,
  actions: actions
})

export default store

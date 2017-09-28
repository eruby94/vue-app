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
        items: [],
        isInEdit: false,
        newTitle: 'Things To Do'
      },
      {
        title: 'In-Progress',
        items: [],
        isInEdit: false,
        newTitle: 'In-Progress'
      },
      {
        title: 'Completed',
        items: [],
        isInEdit: false,
        newTitle: 'Completed'
      }
    ],
    archive: []
  },
  mutations: mutations,
  actions: actions
})

export default store

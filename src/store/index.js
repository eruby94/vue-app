import Vue from 'vue'
import Vuex from 'vuex'

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
  mutations: {
    addItem(state, listUpdate) {
      state.lists[listUpdate.destination].items.push(listUpdate.item)
    },
    extractItem(state, preparedItem) {
      let index = state.lists[preparedItem.name].items.indexOf(
        preparedItem.text
      )
      state.lists[preparedItem.name].items.splice(index, 1)
    },
    setListStore(state, lists) {
      state.lists = lists
    },
    setArchiveStore(state, archive) {
      state.archive = archive
    },
    toggleModal(state) {
      state.showModal = !state.showModal
    },
    archiveItem(state, item) {
      state.archive.push(item)
      state.showModal = false
    },
    deleteItem(state, item) {
      let index = state.archive.indexOf(item)
      state.archive.splice(index, 1)
      state.showModal = false
    }
  },
  actions: {
    moveItem({ commit }, payload) {
      if (payload.preparedItem.name) {
        commit('extractItem', payload.preparedItem)
      }
      let listUpdate = {
        destination: payload.destination,
        item: payload.preparedItem.text
      }
      commit('addItem', listUpdate)
      commit('toggleModal')
    }
  }
})

export default store
